-- Create projects table if it doesn't exist
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT,
  description_ar TEXT,
  property_id UUID,
  start_date DATE NOT NULL,
  end_date DATE,
  budget NUMERIC,
  actual_cost NUMERIC,
  status TEXT NOT NULL,
  manager_id UUID,
  documents JSONB,
  location JSONB,
  has_garden BOOLEAN DEFAULT FALSE,
  has_roof BOOLEAN DEFAULT FALSE,
  has_private_pool BOOLEAN DEFAULT FALSE,
  has_parking_space BOOLEAN DEFAULT FALSE,
  total_rooms INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  balconies INTEGER,
  living_rooms INTEGER,
  kitchens INTEGER,
  unit_area NUMERIC,
  display_order INTEGER,
  unit_type_id UUID,
  unit_usage_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
DROP POLICY IF EXISTS "Allow all operations on projects" ON projects;
CREATE POLICY "Allow all operations on projects"
  ON projects
  USING (true)
  WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
