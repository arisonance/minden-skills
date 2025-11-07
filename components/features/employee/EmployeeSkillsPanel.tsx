interface Skill {
  id: string
  proficiency: number | null
  verified_on: string | null
  status: string
  skill: { name: string; category: string | null } | null
  role_level: { level_name: string } | null
}

interface EmployeeSkillsPanelProps {
  skills: Skill[]
  primaryRole: { name: string } | null
}

export function EmployeeSkillsPanel({ skills, primaryRole }: EmployeeSkillsPanelProps) {
  const activeSkills = skills.filter(s => s.status === 'active')

  const groupedByCategory = activeSkills.reduce(
    (acc, skill) => {
      const cat = skill.skill?.category || 'Other'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <div className="bg-[#242424] border border-[#333333] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Skills & Certifications</h2>
        <span className="text-sm text-gray-400">{activeSkills.length} skills</span>
      </div>

      {activeSkills.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No skills recorded yet</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {category}
              </h3>
              <div className="space-y-3">
                {categorySkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">
                          {skill.skill?.name || 'Unknown Skill'}
                        </span>
                        {skill.role_level && (
                          <span className="text-xs px-2 py-0.5 bg-[#3ECF8E]/20 text-[#3ECF8E] rounded-full border border-[#3ECF8E]/30">
                            {skill.role_level.level_name}
                          </span>
                        )}
                        {skill.verified_on && (
                          <span className="text-xs text-gray-500">
                            ✓ Verified {new Date(skill.verified_on).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {/* Proficiency Bar */}
                      <div className="w-full bg-[#1c1c1c] rounded-full h-2">
                        <div
                          className="bg-[#3ECF8E] h-2 rounded-full transition-all"
                          style={{ width: `${((skill.proficiency || 0) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-4 text-sm text-gray-400 font-mono">
                      {skill.proficiency || 0}/5
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
