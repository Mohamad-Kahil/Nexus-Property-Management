-- Insert more sample projects
-- Using a default company_id value for all projects
INSERT INTO projects (project_name_en, project_name_ar, description, start_date, status, company_id, name, budget)
VALUES 
('Marina Heights', 'مارينا هايتس', 'Luxury waterfront residential development', '2023-05-15', 'in_progress', '00000000-0000-0000-0000-000000000001', 'Marina Heights', 5000000),
('Tech Park Plaza', 'تك بارك بلازا', 'Modern office complex for tech companies', '2023-02-10', 'planning', '00000000-0000-0000-0000-000000000001', 'Tech Park Plaza', 3500000),
('Green Valley Villas', 'فلل جرين فالي', 'Eco-friendly residential villas', '2022-11-20', 'completed', '00000000-0000-0000-0000-000000000001', 'Green Valley Villas', 7200000);
