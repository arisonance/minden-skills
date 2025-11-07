-- Minden Skills Platform - Core Database Schema
-- Execute this in your Supabase SQL Editor

-- 1. DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROLES
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  department_id UUID REFERENCES departments(id),
  description TEXT,
  is_critical BOOLEAN DEFAULT false,
  min_coverage_depth INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ROLE_LEVELS (e.g., Assembly L1, L2, L3)
CREATE TABLE IF NOT EXISTS role_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  level_name TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  rubric JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, level_name)
);

-- 4. EMPLOYEES (enhanced)
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  hired_on DATE,
  status TEXT DEFAULT 'active',
  primary_role_id UUID REFERENCES roles(id),
  primary_role_level_id UUID REFERENCES role_levels(id),
  availability JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PAY_BANDS
CREATE TABLE IF NOT EXISTS pay_bands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_level_id UUID REFERENCES role_levels(id),
  min_rate DECIMAL(10,2) NOT NULL,
  mid_rate DECIMAL(10,2) NOT NULL,
  max_rate DECIMAL(10,2) NOT NULL,
  effective_from DATE NOT NULL,
  effective_to DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EMPLOYEE_COMPENSATION
CREATE TABLE IF NOT EXISTS employee_compensation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  role_level_id UUID REFERENCES role_levels(id),
  current_rate DECIMAL(10,2) NOT NULL,
  effective_from DATE NOT NULL,
  effective_to DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SKILLS
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EMPLOYEE_SKILLS
CREATE TABLE IF NOT EXISTS employee_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  role_level_id UUID REFERENCES role_levels(id),
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
  verified_on DATE,
  verified_by UUID REFERENCES employees(id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, skill_id)
);

-- 9. CERTIFICATIONS
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  skill_id UUID REFERENCES skills(id),
  validity_months INTEGER,
  issuer TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. EMPLOYEE_CERTIFICATIONS
CREATE TABLE IF NOT EXISTS employee_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  certification_id UUID REFERENCES certifications(id),
  issued_on DATE NOT NULL,
  expires_on DATE,
  file_url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_employees_role ON employees(primary_role_id);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_employee_skills_employee ON employee_skills(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_certs_employee ON employee_certifications(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_certs_expires ON employee_certifications(expires_on);

-- Enable Row Level Security (policies to be configured as needed)
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE pay_bands ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_compensation ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_certifications ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for development (adjust for production)
CREATE POLICY "Enable read access for all users" ON departments FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON roles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON role_levels FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON employees FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON pay_bands FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON employee_compensation FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON skills FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON employee_skills FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON certifications FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON employee_certifications FOR SELECT USING (true);

