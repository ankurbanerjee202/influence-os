'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface BrandProfile {
  companyName?: string
  industry?: string
  description?: string
  sentimentScore?: number
  healthScore?: number
  mentionVolume?: number
}

export default function PendingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<BrandProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login')
    if (status === 'authenticated') {
      if (!session?.user?.onboarded && session?.user?.role !== 'admin') {
        router.replace('/onboarding')
      }
      if (session?.user?.accessLevel === 'full' || session?.user?.role === 'admin') {
        router.replace('/')
      }
    }
  }, [status, session, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(data => {
        setProfile(data.user?.brandProfile || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [status])

  if (status === 'loading' || !session) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#f8f9fb' }}>
        <Spinner />
      </div>
    )
  }

  const isSentiment = session.user.accessLevel === 'sentiment'

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .stat-card { background:#fff; border:1px solid #e5e7eb; border-radius:14px; padding:16px 20px; }
        @media(max-width:600px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 34, height: 34, borderRadius: '9px', background: '#111', display: 'grid', placeItems: 'center' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em' }}>Influence OS</span>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} style={{ height: '34px', padding: '0 14px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: '#374151' }}>
            Sign out
          </button>
        </div>

        {/* Status card */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '28px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: isSentiment ? '#f0fdf4' : '#fffbeb', border: `1px solid ${isSentiment ? '#86efac' : '#fde68a'}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              {isSentiment ? (
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                {isSentiment ? 'Brand data is ready' : 'Pending admin review'}
              </div>
              <div style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: 1.6 }}>
                {isSentiment
                  ? 'Your sentiment and brand health data is available below. Full agent access is pending admin approval — you\'ll receive an email when approved.'
                  : 'Your brand research is running. The admin has been notified and will review your account. You\'ll receive an email once approved.'}
              </div>
            </div>
          </div>
        </div>

        {/* Brand data preview */}
        {loading ? (
          <div style={{ display: 'grid', placeItems: 'center', height: '120px' }}><Spinner /></div>
        ) : profile ? (
          <>
            {/* Profile header */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px 22px', marginBottom: '14px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Brand Profile</div>
              <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>{profile.companyName || session.user.name}</div>
              {profile.industry && <div style={{ fontSize: '12.5px', color: '#6b7280' }}>{profile.industry} · {profile.description}</div>}
            </div>

            {/* Sentiment stats */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
              <div className="stat-card">
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>BRAND SENTIMENT</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#16a34a' }}>{profile.sentimentScore ?? '—'}%</div>
                <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>Positive online tone</div>
              </div>
              <div className="stat-card">
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>HEALTH SCORE</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#2563eb' }}>{profile.healthScore ?? '—'}<span style={{ fontSize: '16px' }}>/100</span></div>
                <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>Brand health index</div>
              </div>
              <div className="stat-card">
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>MENTIONS / MO</div>
                <div style={{ fontSize: '28px', fontWeight: 700 }}>{profile.mentionVolume ?? '—'}</div>
                <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>Estimated reach</div>
              </div>
            </div>

            {/* Locked features notice */}
            <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '14px', padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>🔒 Full access coming soon</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                6 AI agents, content studio, PR center, strategy tools — unlocked after admin approval.
              </div>
            </div>
          </>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite', fontSize: '32px' }}>🔍</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>AI research in progress</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Your brand intelligence dashboard is being built. This usually takes under a minute.</div>
          </div>
        )}

        {/* Footer note */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12.5px', color: '#9ca3af' }}>
          Questions? Email <a href="mailto:ankur.banerjee202@gmail.com" style={{ color: '#6b7280' }}>ankur.banerjee202@gmail.com</a>
        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #e5e7eb', borderTopColor: '#111', animation: 'spin 0.7s linear infinite' }} />
}
