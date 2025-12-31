-- BlackRoses GRC Platform - PostgreSQL Initialization Script
-- This script creates the initial database schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone to UTC
SET timezone = 'UTC';

-- Create organizations table (multi-tenant)
CREATE TABLE IF NOT EXISTS organizations (
    org_id SERIAL PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,
    org_code VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_organizations_code ON organizations(org_code);
CREATE INDEX idx_organizations_active ON organizations(is_active);

-- Insert default organization
INSERT INTO organizations (org_name, org_code) 
VALUES ('Main Organization', 'ORG-001')
ON CONFLICT (org_code) DO NOTHING;

-- Create audit log function for tracking changes
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    -- Log changes to a separate audit table (optional)
    -- Can be extended for comprehensive audit trail
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions (adjust as needed for production)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO blackroses;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO blackroses;

-- Performance optimization settings
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;
ALTER SYSTEM SET work_mem = '4MB';
ALTER SYSTEM SET min_wal_size = '1GB';
ALTER SYSTEM SET max_wal_size = '4GB';

-- Note: Reload PostgreSQL configuration to apply settings
-- SELECT pg_reload_conf();

COMMENT ON DATABASE blackroses IS 'BlackRoses GRC Platform - Enterprise Governance, Risk & Compliance';
