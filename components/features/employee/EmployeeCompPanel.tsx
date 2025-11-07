interface PayBand {
  min_rate: number
  mid_rate: number
  max_rate: number
}

interface CompensationData {
  current_rate: number
  effective_from: string
  role_level: {
    level_name: string
    pay_band: PayBand[] | PayBand | null
  } | null
}

interface EmployeeCompPanelProps {
  compensation: CompensationData | null
  roleLevel: { level_name: string } | null
}

export function EmployeeCompPanel({ compensation, roleLevel }: EmployeeCompPanelProps) {
  if (!compensation) {
    return (
      <div className="bg-[#242424] border border-[#333333] rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Compensation</h2>
        <p className="text-gray-500">No compensation data available</p>
      </div>
    )
  }

  // Handle pay_band being either an array or a single object
  const bandData = compensation.role_level?.pay_band
  const band = bandData ? (Array.isArray(bandData) ? bandData[0] : bandData) : null

  const progressPct = band
    ? ((compensation.current_rate - band.min_rate) / (band.max_rate - band.min_rate)) * 100
    : 0

  // Extract next level number
  const currentLevelNum = roleLevel?.level_name
    ? parseInt(roleLevel.level_name.replace(/\D/g, ''))
    : null
  const nextLevelNum = currentLevelNum ? currentLevelNum + 1 : null

  return (
    <div className="bg-[#242424] border border-[#333333] rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Compensation</h2>

      {/* Current Rate */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-1">Current Rate</div>
        <div className="text-3xl font-bold text-[#3ECF8E]">
          ${compensation.current_rate.toFixed(2)}
          <span className="text-lg text-gray-400">/hr</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Effective {new Date(compensation.effective_from).toLocaleDateString()}
        </div>
      </div>

      {/* Pay Band Progress */}
      {band && roleLevel && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">{roleLevel.level_name} Band Progress</span>
            <span className="text-sm text-[#3ECF8E] font-medium">{Math.round(progressPct)}%</span>
          </div>
          <div className="relative w-full bg-[#1c1c1c] rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-[#3ECF8E]/50 to-[#3ECF8E] h-3 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Min ${band.min_rate.toFixed(2)}</span>
            <span>Mid ${band.mid_rate.toFixed(2)}</span>
            <span>Max ${band.max_rate.toFixed(2)}</span>
          </div>

          {/* Next Level Indicator */}
          {nextLevelNum && (
            <div className="mt-4 p-3 bg-[#1c1c1c] rounded-lg border border-[#333333]">
              <div className="text-xs text-gray-400 mb-1">Path to Next Level</div>
              <div className="text-sm text-white">
                Complete training requirements for{' '}
                <span className="text-[#3ECF8E] font-medium">
                  {roleLevel.level_name.replace(/\d+$/, String(nextLevelNum))}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
