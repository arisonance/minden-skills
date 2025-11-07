-- Minden Skills Platform - Sample Seed Data
-- Run this AFTER schema.sql to populate sample data

-- Insert Departments
INSERT INTO departments (id, name, description) VALUES
  ('d1111111-1111-1111-1111-111111111111', 'Production', 'Manufacturing and assembly operations'),
  ('d2222222-2222-2222-2222-222222222222', 'Quality', 'Quality control and assurance'),
  ('d3333333-3333-3333-3333-333333333333', 'Maintenance', 'Equipment maintenance and repair')
ON CONFLICT (id) DO NOTHING;

-- Insert Roles
INSERT INTO roles (id, name, department_id, is_critical, min_coverage_depth, description) VALUES
  ('r1111111-1111-1111-1111-111111111111', 'Assembly Technician', 'd1111111-1111-1111-1111-111111111111', true, 3, 'General assembly operations'),
  ('r2222222-2222-2222-2222-222222222222', 'TIG Welder', 'd1111111-1111-1111-1111-111111111111', true, 2, 'Precision TIG welding'),
  ('r3333333-3333-3333-3333-333333333333', 'CNC Operator', 'd1111111-1111-1111-1111-111111111111', true, 2, 'CNC machine operation'),
  ('r4444444-4444-4444-4444-444444444444', 'Quality Inspector', 'd2222222-2222-2222-2222-222222222222', false, 2, 'Quality inspection and testing')
ON CONFLICT (id) DO NOTHING;

-- Insert Role Levels
INSERT INTO role_levels (id, role_id, level_name, sort_order, rubric) VALUES
  ('rl111111-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111', 'L1', 1, '{"speed_threshold": 85, "quality_threshold": 95, "knowledge": "Basic assembly", "safety": "Core safety training"}'),
  ('rl111112-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111', 'L2', 2, '{"speed_threshold": 95, "quality_threshold": 98, "knowledge": "Complex assembly", "safety": "Advanced safety certified"}'),
  ('rl111113-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111', 'L3', 3, '{"speed_threshold": 105, "quality_threshold": 99, "knowledge": "Lead technician", "safety": "Trainer certified"}'),
  ('rl222221-2222-2222-2222-222222222222', 'r2222222-2222-2222-2222-222222222222', 'L1', 1, '{"speed_threshold": 80, "quality_threshold": 97, "knowledge": "Basic TIG", "safety": "Welding safety certified"}'),
  ('rl222222-2222-2222-2222-222222222222', 'r2222222-2222-2222-2222-222222222222', 'L2', 2, '{"speed_threshold": 90, "quality_threshold": 99, "knowledge": "Advanced TIG", "safety": "Arc flash certified"}'),
  ('rl333331-3333-3333-3333-333333333333', 'r3333333-3333-3333-3333-333333333333', 'L1', 1, '{"speed_threshold": 90, "quality_threshold": 96, "knowledge": "Basic CNC", "safety": "Machine safety"}'),
  ('rl333332-3333-3333-3333-333333333333', 'r3333333-3333-3333-3333-333333333333', 'L2', 2, '{"speed_threshold": 100, "quality_threshold": 98, "knowledge": "Advanced CNC programming", "safety": "Tool safety certified"}')
ON CONFLICT (id) DO NOTHING;

-- Insert Pay Bands
INSERT INTO pay_bands (role_level_id, min_rate, mid_rate, max_rate, effective_from) VALUES
  ('rl111111-1111-1111-1111-111111111111', 18.00, 21.00, 24.00, '2024-01-01'),
  ('rl111112-1111-1111-1111-111111111111', 22.00, 26.00, 30.00, '2024-01-01'),
  ('rl111113-1111-1111-1111-111111111111', 28.00, 32.00, 36.00, '2024-01-01'),
  ('rl222221-2222-2222-2222-222222222222', 22.00, 26.00, 30.00, '2024-01-01'),
  ('rl222222-2222-2222-2222-222222222222', 28.00, 33.00, 38.00, '2024-01-01'),
  ('rl333331-3333-3333-3333-333333333333', 20.00, 24.00, 28.00, '2024-01-01'),
  ('rl333332-3333-3333-3333-333333333333', 26.00, 30.00, 34.00, '2024-01-01');

-- Insert Skills
INSERT INTO skills (id, name, category, description) VALUES
  ('s1111111-1111-1111-1111-111111111111', 'Manual Assembly', 'assembly', 'Hand tools and manual assembly techniques'),
  ('s2222222-2222-2222-2222-222222222222', 'Power Tools', 'assembly', 'Electric and pneumatic tool operation'),
  ('s3333333-3333-3333-3333-333333333333', 'TIG Welding', 'welding', 'Tungsten inert gas welding'),
  ('s4444444-4444-4444-4444-444444444444', 'Blueprint Reading', 'technical', 'Technical drawing interpretation'),
  ('s5555555-5555-5555-5555-555555555555', 'CNC Programming', 'machining', 'G-code and CNC setup'),
  ('s6666666-6666-6666-6666-666666666666', 'Quality Inspection', 'quality', 'Measurement and inspection techniques'),
  ('s7777777-7777-7777-7777-777777777777', 'Safety Compliance', 'safety', 'OSHA and workplace safety standards')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Employees
INSERT INTO employees (id, full_name, email, hired_on, status, primary_role_id, primary_role_level_id) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'Sarah Mitchell', 'sarah.mitchell@minden.local', '2021-03-15', 'active', 'r1111111-1111-1111-1111-111111111111', 'rl111113-1111-1111-1111-111111111111'),
  ('e2222222-2222-2222-2222-222222222222', 'Marcus Rodriguez', 'marcus.rodriguez@minden.local', '2022-06-01', 'active', 'r2222222-2222-2222-2222-222222222222', 'rl222222-2222-2222-2222-222222222222'),
  ('e3333333-3333-3333-3333-333333333333', 'Jennifer Chen', 'jennifer.chen@minden.local', '2023-01-10', 'active', 'r1111111-1111-1111-1111-111111111111', 'rl111112-1111-1111-1111-111111111111'),
  ('e4444444-4444-4444-4444-444444444444', 'David Thompson', 'david.thompson@minden.local', '2020-09-20', 'active', 'r3333333-3333-3333-3333-333333333333', 'rl333332-3333-3333-3333-333333333333'),
  ('e5555555-5555-5555-5555-555555555555', 'Amanda Foster', 'amanda.foster@minden.local', '2023-08-05', 'active', 'r1111111-1111-1111-1111-111111111111', 'rl111111-1111-1111-1111-111111111111')
ON CONFLICT (id) DO NOTHING;

-- Insert Employee Compensation
INSERT INTO employee_compensation (employee_id, role_level_id, current_rate, effective_from) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'rl111113-1111-1111-1111-111111111111', 34.50, '2024-01-01'),
  ('e2222222-2222-2222-2222-222222222222', 'rl222222-2222-2222-2222-222222222222', 35.00, '2024-01-01'),
  ('e3333333-3333-3333-3333-333333333333', 'rl111112-1111-1111-1111-111111111111', 24.50, '2024-01-01'),
  ('e4444444-4444-4444-4444-444444444444', 'rl333332-3333-3333-3333-333333333333', 31.00, '2024-01-01'),
  ('e5555555-5555-5555-5555-555555555555', 'rl111111-1111-1111-1111-111111111111', 20.00, '2024-01-01');

-- Insert Employee Skills
INSERT INTO employee_skills (employee_id, skill_id, role_level_id, proficiency, verified_on, status) VALUES
  ('e1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'rl111113-1111-1111-1111-111111111111', 5, '2024-01-15', 'active'),
  ('e1111111-1111-1111-1111-111111111111', 's2222222-2222-2222-2222-222222222222', 'rl111113-1111-1111-1111-111111111111', 5, '2024-01-15', 'active'),
  ('e1111111-1111-1111-1111-111111111111', 's4444444-4444-4444-4444-444444444444', 'rl111112-1111-1111-1111-111111111111', 4, '2024-02-01', 'active'),
  ('e2222222-2222-2222-2222-222222222222', 's3333333-3333-3333-3333-333333333333', 'rl222222-2222-2222-2222-222222222222', 5, '2024-01-10', 'active'),
  ('e2222222-2222-2222-2222-222222222222', 's4444444-4444-4444-4444-444444444444', 'rl222221-2222-2222-2222-222222222222', 4, '2024-01-10', 'active'),
  ('e3333333-3333-3333-3333-333333333333', 's1111111-1111-1111-1111-111111111111', 'rl111112-1111-1111-1111-111111111111', 4, '2024-03-01', 'active'),
  ('e3333333-3333-3333-3333-333333333333', 's2222222-2222-2222-2222-222222222222', 'rl111111-1111-1111-1111-111111111111', 3, '2024-03-01', 'active'),
  ('e4444444-4444-4444-4444-444444444444', 's5555555-5555-5555-5555-555555555555', 'rl333332-3333-3333-3333-333333333333', 5, '2023-06-15', 'active'),
  ('e4444444-4444-4444-4444-444444444444', 's4444444-4444-4444-4444-444444444444', 'rl333332-3333-3333-3333-333333333333', 5, '2023-06-15', 'active'),
  ('e5555555-5555-5555-5555-555555555555', 's1111111-1111-1111-1111-111111111111', 'rl111111-1111-1111-1111-111111111111', 3, '2024-09-01', 'active'),
  ('e5555555-5555-5555-5555-555555555555', 's7777777-7777-7777-7777-777777777777', NULL, 4, '2024-08-15', 'active');

-- Insert Certifications
INSERT INTO certifications (id, name, skill_id, validity_months, issuer, description) VALUES
  ('c1111111-1111-1111-1111-111111111111', 'OSHA 10-Hour Safety', 's7777777-7777-7777-7777-777777777777', 60, 'OSHA', 'Basic workplace safety certification'),
  ('c2222222-2222-2222-2222-222222222222', 'AWS D17.1 Welding', 's3333333-3333-3333-3333-333333333333', 24, 'American Welding Society', 'TIG welding certification for aerospace'),
  ('c3333333-3333-3333-3333-333333333333', 'Forklift Operator', NULL, 36, 'Minden Safety', 'Powered industrial truck operation'),
  ('c4444444-4444-4444-4444-444444444444', 'First Aid/CPR', NULL, 24, 'American Red Cross', 'Emergency medical response')
ON CONFLICT (id) DO NOTHING;

-- Insert Employee Certifications
INSERT INTO employee_certifications (employee_id, certification_id, issued_on, expires_on, status) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '2023-01-10', '2028-01-10', 'active'),
  ('e1111111-1111-1111-1111-111111111111', 'c4444444-4444-4444-4444-444444444444', '2024-03-15', '2026-03-15', 'active'),
  ('e2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', '2023-06-01', '2025-06-01', 'active'),
  ('e2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', '2022-08-10', '2027-08-10', 'active'),
  ('e3333333-3333-3333-3333-333333333333', 'c1111111-1111-1111-1111-111111111111', '2023-02-05', '2028-02-05', 'active'),
  ('e4444444-4444-4444-4444-444444444444', 'c3333333-3333-3333-3333-333333333333', '2021-11-20', '2024-11-20', 'expired'),
  ('e5555555-5555-5555-5555-555555555555', 'c1111111-1111-1111-1111-111111111111', '2024-08-10', '2029-08-10', 'active');

