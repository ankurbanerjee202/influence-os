'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserRecord {
  id: string
  name: string | null
  email: string
  image: string | null
  accessLevel: string
  onboarded: boolean
  createdAt: string
  approvedAt: string | null
  accounts: { provider: string }[]
  socialHandles: { platform: string; handle: string | null }[]
  brandProfile: {
    companyName: string | null
    industry: string | null
    sentimentScore: number | null
    healthScore: number | null
    researchedAt: string | null
  } | null
}

const ACCESS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  pending: { label: 'Pending', bg: '#fffbeb', color: '#d97706' },
  sentiment: { label: 'Sentiment Only', bg: '#eff6ff', color: '#2563eb' },
  full: { label: 'Full Access', bg: '#f0fdf4', color: '#16a34a' },
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login')
    if (status === 'authenticated' && session?.user?.role !== 'admin') router.replace('/')
  }, [status, session, router])

  const fetchUsers = () => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => { setUsers(d.users || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'admin') fetchUsers()
  }, [status, session])

  const updateAccess = async (userId: string, accessLevel: string) => {
    setUpdating(userId)
    try {
      await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, accessLevel }),
      })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, accessLevel } : u))
    } catch (e) {
      console.error(e)
    } finally {
      setUpdating(null)
    }
  }

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}><Spinner /></div>
  }

  const pending = users.filter(u => u.accessLevel === 'pending').length

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .admin-card { background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; }
        .user-row { border-top:1px solid #f3f4f6; padding:16px 20px; display:grid; grid-template-columns:1fr auto; gap:16px; align-items:center; }
        .user-row:hover { background:#fafafa; }
        .access-select { height:32px; padding:0 10px; border:1px solid #e5e7eb; border-radius:8px; font-size:12.5px; font-family:inherit; background:#fff; cursor:pointer; outline:none; }
        .approve-btn { height:32px; padding:0 14px; border:none; border-radius:8px; background:#111; color:#fff; font-size:12.5px; font-weight:600; cursor:pointer; font-family:inherit; }
        .approve-btn:disabled { opacity:0.5; cursor:not-allowed; }
        @media(max-width:640px) { .user-row { grid-template-columns:1fr; } .top-row { flex-direction:column; align-items:flex-start !important; gap:12px !important; } }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div className="top-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#111', display: 'grid', placeItems: 'center' }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>Influence OS Admin</span>
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Manage user access and approvals</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {pending > 0 && (
              <div style={{ padding: '6px 12px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, color: '#d97706' }}>
                {pending} pending review
              </div>
            )}
            <button onClick={() => router.push('/')} style={{ height: '36px', padding: '0 14px', border: '1px solid #e5e7eb', borderRadius: '9px', background: '#fff', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: '#374151' }}>
              ← Back to app
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total users', value: users.length, color: '#111' },
            { label: 'Pending review', value: users.filter(u => u.accessLevel === 'pending').length, color: '#d97706' },
            { label: 'Full access', value: users.filter(u => u.accessLevel === 'full').length, color: '#16a34a' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="admin-card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Users</div>
            <button onClick={fetchUsers} style={{ fontSize: '12px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div style={{ display: 'grid', placeItems: 'center', height: '120px' }}><Spinner /></div>
          ) : users.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '13.5px' }}>
              No users yet. Share your app URL to get signups.
            </div>
          ) : (
            users.map(user => {
              const access = ACCESS_LABELS[user.accessLevel] || ACCESS_LABELS.pending
              return (
                <div className="user-row" key={user.id}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {/* Avatar */}
                    <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#f3f4f6', display: 'grid', placeItems: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      {user.image ? (
                        <img src={user.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#374151' }}>{(user.name || user.email)[0].toUpperCase()}</span>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{user.name || 'No name'}</span>
                        <span style={{ fontSize: '10.5px', fontWeight: 600, color: access.color, background: access.bg, padding: '2px 8px', borderRadius: '20px' }}>
                          {access.label}
                        </span>
                        {user.accounts.map(a => (
                          <span key={a.provider} style={{ fontSize: '10.5px', color: '#9ca3af', background: '#f3f4f6', padding: '2px 7px', borderRadius: '20px', textTransform: 'capitalize' }}>
                            {a.provider}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{user.email}</div>

                      {/* Brand profile data */}
                      {user.brandProfile && (
                        <div style={{ marginTop: '6px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {user.brandProfile.companyName && <span style={{ fontSize: '11.5px', color: '#374151' }}>🏢 {user.brandProfile.companyName}</span>}
                          {user.brandProfile.industry && <span style={{ fontSize: '11.5px', color: '#374151' }}>• {user.brandProfile.industry}</span>}
                          {user.brandProfile.sentimentScore && <span style={{ fontSize: '11.5px', color: '#16a34a' }}>• Sentiment {user.brandProfile.sentimentScore}%</span>}
                        </div>
                      )}

                      {/* Social handles */}
                      {user.socialHandles.length > 0 && (
                        <div style={{ marginTop: '4px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {user.socialHandles.map(h => h.handle && (
                            <span key={h.platform} style={{ fontSize: '11px', color: '#6b7280' }}>
                              {h.platform === 'linkedin' ? '💼' : h.platform === 'twitter' ? '🐦' : '📸'} @{h.handle}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ fontSize: '11px', color: '#d1d5db', marginTop: '4px' }}>
                        Joined {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {!user.brandProfile?.researchedAt && user.onboarded && ' · Research pending'}
                        {user.brandProfile?.researchedAt && ' · Researched ✓'}
                      </div>
                    </div>
                  </div>

                  {/* Access control */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                    <select
                      className="access-select"
                      value={user.accessLevel}
                      onChange={e => updateAccess(user.id, e.target.value)}
                      disabled={updating === user.id}
                    >
                      <option value="pending">Pending</option>
                      <option value="sentiment">Sentiment Only</option>
                      <option value="full">Full Access</option>
                    </select>
                    {updating === user.id && <Spinner size={18} />}
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div style={{ marginTop: '16px', fontSize: '12px', color: '#d1d5db', textAlign: 'center' }}>
          Logged in as {session.user.email} · Admin
        </div>
      </div>
    </div>
  )
}

function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', border: `${size > 20 ? 2.5 : 2}px solid #e5e7eb`, borderTopColor: '#111', animation: 'spin 0.7s linear infinite' }} />
  )
}
