-- Insert sample projects if none exist
INSERT INTO projects (name, description, start_date, status)
SELECT 'Skyline Tower Renovation', 'Complete renovation of the Skyline Tower commercial building', '2023-01-15', 'in_progress'
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

INSERT INTO projects (name, description, start_date, end_date, budget, status)
SELECT 'Green Valley Residential Complex', 'New residential complex with 50 units', '2023-03-10', '2024-06-30', 8500000, 'planning'
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

INSERT INTO projects (name, description, start_date, end_date, budget, actual_cost, status)
SELECT 'Downtown Office Retrofit', 'Energy efficiency retrofit for downtown office building', '2022-11-01', '2023-04-30', 750000, 720000, 'completed'
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);
