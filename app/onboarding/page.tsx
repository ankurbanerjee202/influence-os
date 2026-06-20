'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(0) // 0=welcome, 1=social, 2=researching
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login')
    if (status === 'authenticated') {
      if (session?.user?.onboarded) router.replace('/')
      if (session?.user?.role === 'admin') router.replace('/')
    }
  }, [status, session, router])

  const handleSubmit = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin, twitter, instagram }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setStep(2)
      setTimeout(() => router.replace('/pending'), 3000)
    } catch {
      setError('Something went wrong. Please try again.')
      setSaving(false)
    }
  }

  if (status === 'loading' || !session) {
    return <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}><Spinner /></div>
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .ob-card { background:#fff; border:1px solid #e5e7eb; border-radius:20px; padding:40px 36px; width:100%; max-width:460px; box-shadow:0 4px 24px rgba(0,0,0,0.06); animation:fadeIn 0.3s ease; }
        .ob-input { width:100%; height:42px; padding:0 12px; border:1px solid #e5e7eb; border-radius:10px; font-size:13.5px; font-family:inherit; outline:none; transition:border-color 0.15s; box-sizing:border-box; }
        .ob-input:focus { border-color:#111; }
        .ob-btn { height:46px; width:100%; border:none; border-radius:12px; background:#111; color:#fff; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; transition:opacity 0.15s; }
        .ob-btn:hover { opacity:0.88; }
        .ob-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .ob-skip { font-size:13px; color:#9ca3af; cursor:pointer; text-align:center; margin-top:14px; text-decoration:underline; background:none; border:none; font-family:inherit; }
        .ob-skip:hover { color:#374151; }
        @media(max-width:480px) { .ob-card { padding:28px 20px; } }
      `}</style>

      <div className="ob-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <div style={{ width: 34, height: 34, borderRadius: '9px', background: '#111', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em' }}>Influence OS</span>
        </div>

        {step === 2 ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0fdf4', border: '2px solid #86efac', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
              <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>Profile submitted!</div>
            <div style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: 1.6 }}>
              Our AI is researching your brand. You&apos;ll be redirected shortly...
            </div>
            <div style={{ marginTop: '20px' }}><Spinner /></div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>
                Hi {session.user?.name?.split(' ')[0]} 👋
              </div>
              <div style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: 1.55 }}>
                Connect your social profiles so our AI can research your brand and build your intelligence dashboard.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  LinkedIn Profile URL
                </label>
                <input className="ob-input" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="linkedin.com/in/yourname" />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  X (Twitter) Handle
                </label>
                <input className="ob-input" value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="@yourhandle" />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Instagram Handle
                </label>
                <input className="ob-input" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@yourhandle" />
              </div>
            </div>

            {error && (
              <div style={{ marginTop: '12px', padding: '10px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', color: '#dc2626' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
              <button className="ob-btn" onClick={handleSubmit} disabled={saving || (!linkedin && !twitter && !instagram)}>
                {saving ? 'Saving...' : 'Start AI Research →'}
              </button>
              <button className="ob-skip" onClick={handleSubmit}>
                Skip for now
              </button>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
              <div style={{ fontSize: '11.5px', color: '#6b7280', lineHeight: 1.6 }}>
                <strong>What happens next:</strong> Our AI researches your public brand presence and builds your personalized dashboard. Full access to agents requires admin approval.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Spinner() {
  return <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #e5e7eb', borderTopColor: '#111', animation: 'spin 0.7s linear infinite', margin: '0 auto' }} />
}
