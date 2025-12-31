from minio import Minio
from minio.error import S3Error
import hashlib
import logging
from datetime import datetime, timedelta
from typing import Optional, BinaryIO
from io import BytesIO

from app.config import settings

logger = logging.getLogger(__name__)

class EvidenceService:
    """
    Service for managing evidence files in MinIO/S3.
    Implements dual evidence system: automated + manual uploads.
    """
    
    def __init__(self):
        self.client: Optional[Minio] = None
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize MinIO client"""
        try:
            self.client = Minio(
                endpoint=settings.MINIO_ENDPOINT,
                access_key=settings.MINIO_ACCESS_KEY,
                secret_key=settings.MINIO_SECRET_KEY,
                secure=settings.MINIO_SECURE
            )
            
            # Create bucket if it doesn't exist
            if not self.client.bucket_exists(settings.MINIO_BUCKET_NAME):
                self.client.make_bucket(settings.MINIO_BUCKET_NAME)
                logger.info(f"Created MinIO bucket: {settings.MINIO_BUCKET_NAME}")
            
            logger.info(f"MinIO client initialized: {settings.MINIO_ENDPOINT}")
        except Exception as e:
            logger.error(f"Failed to initialize MinIO client: {e}")
            self.client = None
    
    def upload_file(
        self,
        file_data: bytes,
        file_name: str,
        control_id: str,
        org_id: int,
        content_type: Optional[str] = None
    ) -> tuple[str, str]:
        """
        Upload evidence file to MinIO.
        
        Returns:
            tuple: (file_path, file_hash)
        """
        if not self.client:
            raise Exception("MinIO client not initialized")
        
        # Calculate SHA256 hash
        file_hash = hashlib.sha256(file_data).hexdigest()
        
        # Generate object path
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        file_path = f"evidence/{org_id}/{control_id}/{timestamp}_{file_name}"
        
        try:
            # Upload to MinIO
            self.client.put_object(
                bucket_name=settings.MINIO_BUCKET_NAME,
                object_name=file_path,
                data=BytesIO(file_data),
                length=len(file_data),
                content_type=content_type or 'application/octet-stream',
                metadata={
                    'sha256': file_hash,
                    'control_id': control_id,
                    'org_id': str(org_id),
                    'uploaded_at': datetime.utcnow().isoformat()
                }
            )
            
            logger.info(f"File uploaded: {file_path} (hash={file_hash[:16]}...)")
            return file_path, file_hash
            
        except S3Error as e:
            logger.error(f"MinIO upload error: {e}")
            raise Exception(f"Failed to upload file: {e}")
    
    def download_file(self, file_path: str) -> bytes:
        """Download evidence file from MinIO"""
        if not self.client:
            raise Exception("MinIO client not initialized")
        
        try:
            response = self.client.get_object(
                bucket_name=settings.MINIO_BUCKET_NAME,
                object_name=file_path
            )
            file_data = response.read()
            response.close()
            response.release_conn()
            
            return file_data
            
        except S3Error as e:
            logger.error(f"MinIO download error: {e}")
            raise Exception(f"Failed to download file: {e}")
    
    def verify_file_integrity(self, file_path: str, expected_hash: str) -> bool:
        """
        Verify file integrity using SHA256 hash.
        
        Returns:
            bool: True if hash matches
        """
        try:
            file_data = self.download_file(file_path)
            actual_hash = hashlib.sha256(file_data).hexdigest()
            
            if actual_hash == expected_hash:
                logger.info(f"File integrity verified: {file_path}")
                return True
            else:
                logger.warning(f"File integrity mismatch: {file_path}")
                return False
                
        except Exception as e:
            logger.error(f"File verification failed: {e}")
            return False
    
    def get_presigned_url(self, file_path: str, expires: int = 3600) -> str:
        """
        Generate presigned URL for temporary file access.
        
        Args:
            file_path: Object path in MinIO
            expires: URL expiration in seconds (default 1 hour)
        
        Returns:
            str: Presigned URL
        """
        if not self.client:
            raise Exception("MinIO client not initialized")
        
        try:
            url = self.client.presigned_get_object(
                bucket_name=settings.MINIO_BUCKET_NAME,
                object_name=file_path,
                expires=timedelta(seconds=expires)
            )
            return url
        except S3Error as e:
            logger.error(f"Failed to generate presigned URL: {e}")
            raise Exception(f"Failed to generate download URL: {e}")
    
    def delete_file(self, file_path: str) -> bool:
        """Delete evidence file from MinIO"""
        if not self.client:
            raise Exception("MinIO client not initialized")
        
        try:
            self.client.remove_object(
                bucket_name=settings.MINIO_BUCKET_NAME,
                object_name=file_path
            )
            logger.info(f"File deleted: {file_path}")
            return True
        except S3Error as e:
            logger.error(f"MinIO delete error: {e}")
            return False

# Global instance
evidence_service = EvidenceService()
