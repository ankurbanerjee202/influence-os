'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      if (!session?.user?.onboarded && session?.user?.role !== 'admin') {
        router.replace('/onboarding')
      } else {
        router.replace('/')
      }
    }
  }, [status, session, router])

  const handleSignIn = async (provider: string) => {
    setLoading(provider)
    setError('')
    try {
      await signIn(provider, { callbackUrl: '/onboarding' })
    } catch {
      setError('Sign in failed. Please try again.')
      setLoading(null)
    }
  }

  if (status === 'loading') {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#f8f9fb' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#111', animation: 'spin 0.7s linear infinite' }} />
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 20px; padding: 40px 36px; width: 100%; max-width: 400px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .sign-btn { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; height: 48px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .sign-btn:hover { border-color: #111; background: #f9fafb; }
        .sign-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .sign-btn.google { color: #374151; }
        .sign-btn.linkedin { background: #0077b5; border-color: #0077b5; color: #fff; }
        .sign-btn.linkedin:hover { background: #005f91; border-color: #005f91; }
        @media (max-width: 480px) { .login-card { margin: 16px; border-radius: 16px; padding: 28px 22px; } }
      `}</style>

      <div className="login-card">
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <div style={{ width: 38, height: 38, borderRadius: '10px', background: '#111', display: 'grid', placeItems: 'center' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em' }}>Influence OS</span>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>Welcome</div>
          <div style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: 1.5 }}>Sign in to access your AI brand intelligence platform.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="sign-btn google" disabled={!!loading} onClick={() => handleSignIn('google')}>
            {loading === 'google' ? (
              <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #d1d5db', borderTopColor: '#374151', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
            ) : (
              <svg width={18} height={18} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {process.env.NEXT_PUBLIC_LINKEDIN_ENABLED === 'true' && (
            <button className="sign-btn linkedin" disabled={!!loading} onClick={() => handleSignIn('linkedin')}>
              {loading === 'linkedin' ? (
                <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
              ) : (
                <svg width={18} height={18} viewBox="0 0 24 24" fill="#fff">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              )}
              Continue with LinkedIn
            </button>
          )}
        </div>

        {error && (
          <div style={{ marginTop: '14px', padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', color: '#dc2626' }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: '24px', padding: '14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
          <div style={{ fontSize: '11.5px', color: '#6b7280', lineHeight: 1.6 }}>
            By signing in, you agree that your profile information will be used to personalize your brand intelligence dashboard. New accounts require admin approval to access full features.
          </div>
        </div>
      </div>
    </div>
  )
}
