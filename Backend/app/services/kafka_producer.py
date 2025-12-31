from kafka import KafkaProducer
from kafka.errors import KafkaError
import json
import logging
from datetime import datetime
from typing import Dict, Any, Optional

from app.config import settings

logger = logging.getLogger(__name__)

class KafkaProducerService:
    """
    Kafka producer service for immutable audit trail and event sourcing.
    """
    
    def __init__(self):
        self.producer: Optional[KafkaProducer] = None
        self._initialize_producer()
    
    def _initialize_producer(self):
        """Initialize Kafka producer with retry logic"""
        try:
            self.producer = KafkaProducer(
                bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS.split(','),
                value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8'),
                key_serializer=lambda k: k.encode('utf-8') if k else None,
                acks='all',  # Wait for all replicas
                retries=3,
                max_in_flight_requests_per_connection=1,
                compression_type='gzip'
            )
            logger.info(f"Kafka producer initialized: {settings.KAFKA_BOOTSTRAP_SERVERS}")
        except Exception as e:
            logger.error(f"Failed to initialize Kafka producer: {e}")
            self.producer = None
    
    def send_audit_event(
        self,
        event_type: str,
        resource_type: str,
        resource_id: str,
        action: str,
        user_id: int,
        org_id: int,
        metadata: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        Send audit trail event to Kafka.
        
        Args:
            event_type: Type of event (control_update, policy_create, etc.)
            resource_type: Type of resource (control, policy, framework, etc.)
            resource_id: ID of the resource
            action: Action performed (create, update, delete, approve, etc.)
            user_id: User who performed the action
            org_id: Organization ID
            metadata: Additional event data
        
        Returns:
            bool: True if sent successfully
        """
        if not self.producer:
            logger.warning("Kafka producer not available, skipping audit event")
            return False
        
        event = {
            "event_type": event_type,
            "resource_type": resource_type,
            "resource_id": resource_id,
            "action": action,
            "user_id": user_id,
            "org_id": org_id,
            "timestamp": datetime.utcnow().isoformat(),
            "metadata": metadata or {}
        }
        
        try:
            future = self.producer.send(
                topic=settings.KAFKA_TOPIC_AUDIT,
                key=f"{org_id}:{resource_type}:{resource_id}",
                value=event
            )
            
            # Block until sent (with timeout)
            record_metadata = future.get(timeout=10)
            
            logger.info(
                f"Audit event sent: {event_type} | "
                f"partition={record_metadata.partition} offset={record_metadata.offset}"
            )
            return True
            
        except KafkaError as e:
            logger.error(f"Failed to send audit event: {e}")
            return False
    
    def send_control_scan_result(
        self,
        control_id: str,
        scan_result: Dict[str, Any],
        org_id: int
    ) -> bool:
        """
        Send control scan result to Kafka for KSQL processing.
        
        Topic: controls.scans
        """
        if not self.producer:
            return False
        
        event = {
            "control_id": control_id,
            "org_id": org_id,
            "scan_timestamp": datetime.utcnow().isoformat(),
            "result": scan_result
        }
        
        try:
            self.producer.send(
                topic=settings.KAFKA_TOPIC_CONTROLS_SCANS,
                key=control_id,
                value=event
            )
            logger.info(f"Control scan result sent for {control_id}")
            return True
        except KafkaError as e:
            logger.error(f"Failed to send control scan: {e}")
            return False
    
    def send_notification(
        self,
        notification_type: str,
        severity: str,
        title: str,
        message: str,
        recipients: list,
        metadata: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        Send notification event for ElastAlert processing.
        
        Topic: notifications.alerts
        """
        if not self.producer:
            return False
        
        event = {
            "notification_type": notification_type,
            "severity": severity,
            "title": title,
            "message": message,
            "recipients": recipients,
            "timestamp": datetime.utcnow().isoformat(),
            "metadata": metadata or {}
        }
        
        try:
            self.producer.send(
                topic=settings.KAFKA_TOPIC_NOTIFICATIONS,
                value=event
            )
            logger.info(f"Notification sent: {title}")
            return True
        except KafkaError as e:
            logger.error(f"Failed to send notification: {e}")
            return False
    
    def close(self):
        """Close Kafka producer connection"""
        if self.producer:
            self.producer.flush()
            self.producer.close()
            logger.info("Kafka producer closed")

# Global instance
kafka_producer = KafkaProducerService()
