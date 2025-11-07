interface Certification {
  id: string
  issued_on: string
  expires_on: string | null
  status: string
  certification: {
    name: string
    issuer: string | null
  } | null
}

interface EmployeeCertificationsProps {
  certifications: Certification[]
}

export function EmployeeCertifications({ certifications }: EmployeeCertificationsProps) {
  const activeCerts = certifications.filter(c => c.status === 'active' || c.status === 'expired')

  // Check if cert is expiring soon (within 60 days)
  const isExpiringSoon = (expiresOn: string | null) => {
    if (!expiresOn) return false
    const daysUntilExpiry = Math.floor(
      (new Date(expiresOn).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
    return daysUntilExpiry > 0 && daysUntilExpiry <= 60
  }

  const isExpired = (expiresOn: string | null) => {
    if (!expiresOn) return false
    return new Date(expiresOn).getTime() < Date.now()
  }

  return (
    <div className="bg-[#242424] border border-[#333333] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Certifications</h2>
        <span className="text-sm text-gray-400">{activeCerts.length} certifications</span>
      </div>

      {activeCerts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No certifications recorded yet</p>
      ) : (
        <div className="space-y-3">
          {activeCerts.map(cert => {
            const expired = isExpired(cert.expires_on)
            const expiringSoon = !expired && isExpiringSoon(cert.expires_on)

            return (
              <div
                key={cert.id}
                className={`p-4 rounded-lg border ${
                  expired
                    ? 'bg-red-900/10 border-red-800/30'
                    : expiringSoon
                      ? 'bg-yellow-900/10 border-yellow-800/30'
                      : 'bg-[#1c1c1c] border-[#333333]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-medium">
                        {cert.certification?.name || 'Unknown Certification'}
                      </h3>
                      {expired && (
                        <span className="text-xs px-2 py-0.5 bg-red-900/30 text-red-400 rounded-full border border-red-800/30">
                          Expired
                        </span>
                      )}
                      {expiringSoon && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded-full border border-yellow-800/30">
                          Expiring Soon
                        </span>
                      )}
                    </div>
                    {cert.certification?.issuer && (
                      <p className="text-sm text-gray-400 mb-2">{cert.certification.issuer}</p>
                    )}
                    <div className="text-xs text-gray-500">
                      <span>Issued: {new Date(cert.issued_on).toLocaleDateString()}</span>
                      {cert.expires_on && (
                        <>
                          <span className="mx-2">•</span>
                          <span>Expires: {new Date(cert.expires_on).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
