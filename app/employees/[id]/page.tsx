import { EmployeeCard } from '@/components/features/employee/EmployeeCard'
import Link from 'next/link'

interface EmployeePageProps {
  params: {
    id: string
  }
}

export default async function EmployeePage({ params }: EmployeePageProps) {
  const { id } = params

  return (
    <div className="h-full flex flex-col p-6 md:p-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-[#3ECF8E] transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Employee Directory
        </Link>
      </div>

      {/* Employee Card */}
      <div className="w-full max-w-7xl mx-auto">
        <EmployeeCard employeeId={id} />
      </div>
    </div>
  )
}
