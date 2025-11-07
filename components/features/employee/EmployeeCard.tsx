import { createClient } from '@/lib/supabase/server'
import { EmployeeHeader } from './EmployeeHeader'
import { EmployeeSkillsPanel } from './EmployeeSkillsPanel'
import { EmployeeCompPanel } from './EmployeeCompPanel'
import { EmployeeCertifications } from './EmployeeCertifications'

interface EmployeeCardProps {
  employeeId: string
}

export async function EmployeeCard({ employeeId }: EmployeeCardProps) {
  const supabase = await createClient()

  // Fetch employee with related data
  const { data: employee, error } = await supabase
    .from('employees')
    .select(
      `
      *,
      primary_role:roles(
        id,
        name,
        department:departments(name)
      ),
      primary_role_level:role_levels(
        id,
        level_name,
        rubric
      ),
      employee_skills(
        id,
        proficiency,
        verified_on,
        status,
        skill:skills(name, category),
        role_level:role_levels(level_name)
      ),
      employee_certifications(
        id,
        issued_on,
        expires_on,
        status,
        certification:certifications(name, issuer)
      )
    `
    )
    .eq('id', employeeId)
    .single()

  if (error) {
    console.error('Error fetching employee:', error)
    return (
      <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
        <p className="font-semibold">Error loading employee</p>
        <p className="text-sm">{error.message}</p>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="text-gray-400 text-center py-12">
        <p>Employee not found</p>
      </div>
    )
  }

  // Fetch current compensation separately
  const { data: compensationData } = await supabase
    .from('employee_compensation')
    .select(
      `
      current_rate,
      effective_from,
      role_level:role_levels(
        level_name,
        pay_band:pay_bands(min_rate, mid_rate, max_rate)
      )
    `
    )
    .eq('employee_id', employeeId)
    .order('effective_from', { ascending: false })
    .limit(1)
    .single()

  // Transform compensation data to match expected type
  const compensation = compensationData
    ? {
        current_rate: compensationData.current_rate,
        effective_from: compensationData.effective_from,
        role_level: Array.isArray(compensationData.role_level)
          ? compensationData.role_level[0]
          : compensationData.role_level,
      }
    : null

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <EmployeeHeader employee={employee} />

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Skills & Certifications */}
        <div className="lg:col-span-2 space-y-6">
          <EmployeeSkillsPanel
            skills={employee.employee_skills || []}
            primaryRole={employee.primary_role}
          />
          <EmployeeCertifications certifications={employee.employee_certifications || []} />
        </div>

        {/* Right: Compensation & Performance */}
        <div className="space-y-6">
          <EmployeeCompPanel compensation={compensation} roleLevel={employee.primary_role_level} />
        </div>
      </div>
    </div>
  )
}
