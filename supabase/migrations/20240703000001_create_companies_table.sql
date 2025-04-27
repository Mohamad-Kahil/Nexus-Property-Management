-- Create companies table if it doesn't exist
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default company if it doesn't exist
INSERT INTO companies (id, name, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'Default Company', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
