# Supabase Database Setup

This directory contains the SQL files needed to initialize your Minden Skills Platform database.

## Setup Instructions

### 1. Create Tables (First Time Setup)

1. Open your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of `schema.sql`
5. Paste into the SQL editor
6. Click **Run** to execute

This will create all 10 core tables:

- `departments`
- `roles`
- `role_levels`
- `employees`
- `pay_bands`
- `employee_compensation`
- `skills`
- `employee_skills`
- `certifications`
- `employee_certifications`

### 2. Load Sample Data (Optional)

1. In the **SQL Editor**, click **New Query**
2. Copy the contents of `seed.sql`
3. Paste into the SQL editor
4. Click **Run** to execute

This will populate your database with:

- 3 departments (Production, Quality, Maintenance)
- 4 roles (Assembly Technician, TIG Welder, CNC Operator, Quality Inspector)
- 7 role levels (L1, L2, L3 for each role)
- 7 pay bands
- 7 skills
- 5 sample employees with complete profiles
- Employee skills, certifications, and compensation data

### 3. Verify Tables Were Created

Run this query to confirm all tables exist:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

You should see all 10 tables listed.

### 4. Update TypeScript Types (Already Done!)

The TypeScript types in `/types/database.types.ts` have already been updated to match the schema.

## Sample Employees

After running `seed.sql`, you'll have these employees:

1. **Sarah Mitchell** - Assembly Technician L3
   - Email: sarah.mitchell@minden.local
   - Skills: Manual Assembly (5/5), Power Tools (5/5), Blueprint Reading (4/5)
   - Certifications: OSHA 10-Hour, First Aid/CPR

2. **Marcus Rodriguez** - TIG Welder L2
   - Email: marcus.rodriguez@minden.local
   - Skills: TIG Welding (5/5), Blueprint Reading (4/5)
   - Certifications: AWS D17.1 Welding, OSHA 10-Hour

3. **Jennifer Chen** - Assembly Technician L2
   - Email: jennifer.chen@minden.local
   - Skills: Manual Assembly (4/5), Power Tools (3/5)
   - Certifications: OSHA 10-Hour

4. **David Thompson** - CNC Operator L2
   - Email: david.thompson@minden.local
   - Skills: CNC Programming (5/5), Blueprint Reading (5/5)
   - Certifications: Forklift Operator (expired)

5. **Amanda Foster** - Assembly Technician L1
   - Email: amanda.foster@minden.local
   - Skills: Manual Assembly (3/5), Safety Compliance (4/5)
   - Certifications: OSHA 10-Hour

## Row Level Security (RLS)

The schema enables RLS on all tables and creates permissive policies for development.

**For production**, you should update these policies to enforce proper access control based on your authentication setup.

## Next Steps

After running the SQL files:

1. Start your development server: `npm run dev`
2. Navigate to http://localhost:3000
3. You should see the Employee Directory with 5 sample employees
4. Click on any employee to view their detailed profile card

## Troubleshooting

**Error: "relation already exists"**

- The tables are already created. You can skip `schema.sql` or drop the tables first.

**Error: "duplicate key value"**

- The seed data is already loaded. You can skip `seed.sql` or delete existing data first.

**No employees showing in the app**

- Verify RLS policies are created: Check the bottom of `schema.sql`
- Verify data was inserted: Run `SELECT COUNT(*) FROM employees;`
- Check browser console for errors

**Permission denied errors**

- Check that RLS policies allow access
- Verify your Supabase environment variables are correct in `.env.local`
