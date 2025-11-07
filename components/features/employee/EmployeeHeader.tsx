interface EmployeeHeaderProps {
  employee: {
    full_name: string
    email: string | null
    status: string
    hired_on: string | null
    primary_role: { name: string; department: { name: string } } | null
    primary_role_level: { level_name: string } | null
  }
}

export function EmployeeHeader({ employee }: EmployeeHeaderProps) {
  const tenure = employee.hired_on
    ? Math.floor((Date.now() - new Date(employee.hired_on).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0

  return (
    <div className="bg-[#242424] border border-[#333333] rounded-lg p-6">
      <div className="flex items-start justify-between">
        {/* Left: Avatar & Info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-[#3ECF8E]/20 rounded-full flex items-center justify-center border-2 border-[#3ECF8E]/30">
            <span className="text-3xl font-bold text-[#3ECF8E]">
              {employee.full_name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{employee.full_name}</h1>
            <div className="flex items-center gap-3 text-gray-400">
              {employee.primary_role && (
                <>
                  <span className="text-[#3ECF8E]">
                    {employee.primary_role.name} {employee.primary_role_level?.level_name || ''}
                  </span>
                  <span>•</span>
                  <span>{employee.primary_role.department?.name || 'No Department'}</span>
                </>
              )}
              {employee.hired_on && (
                <>
                  <span>•</span>
                  <span>
                    {tenure} {tenure === 1 ? 'year' : 'years'}
                  </span>
                </>
              )}
            </div>
            {employee.email && (
              <a
                href={`mailto:${employee.email}`}
                className="text-sm text-gray-500 hover:text-[#3ECF8E] transition-colors"
              >
                {employee.email}
              </a>
            )}
          </div>
        </div>

        {/* Right: Status Badge */}
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            employee.status === 'active'
              ? 'bg-[#3ECF8E]/20 text-[#3ECF8E] border border-[#3ECF8E]/30'
              : 'bg-gray-700 text-gray-400 border border-gray-600'
          }`}
        >
          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
        </div>
      </div>
    </div>
  )
}
