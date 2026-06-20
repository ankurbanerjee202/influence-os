'use client'

import { useState } from 'react'
import { useApp } from './App'
import type { PageId } from '@/lib/types'

const TABS = [
  {
    id: 'dashboard', label: 'Home',
    icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="8" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="15" width="7" height="6" rx="1.5" /></svg>,
  },
  {
    id: 'pr', label: 'PR',
    icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>,
  },
  {
    id: 'content', label: 'Content',
    icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" /><circle cx="11" cy="11" r="2" /></svg>,
  },
  {
    id: 'monitor', label: 'Monitor',
    icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>,
  },
] as const

const MORE = [
  { id: 'strategy', label: 'Brand Strategy' },
  { id: 'health', label: 'Brand Health' },
  { id: 'marketplace', label: 'Agent Marketplace' },
  { id: 'settings', label: 'Settings' },
] as const

export function MobileNav() {
  const { page, setPage } = useApp()
  const [showMore, setShowMore] = useState(false)
  const moreActive = MORE.some(m => m.id === page)

  const navigate = (id: PageId) => {
    setPage(id)
    setShowMore(false)
  }

  return (
    <>
      {showMore && (
        <>
          <div
            onClick={() => setShowMore(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 48, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
          />
          <div style={{ position: 'fixed', bottom: 64, left: 0, right: 0, zIndex: 49, background: 'var(--panel)', borderTop: '1px solid var(--border)', borderRadius: '16px 16px 0 0', padding: '8px 0 4px', boxShadow: '0 -8px 32px rgba(0,0,0,0.12)' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border-strong)', margin: '0 auto 12px' }} />
            {MORE.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as PageId)}
                style={{ display: 'block', width: '100%', padding: '14px 22px', textAlign: 'left', border: 'none', background: page === item.id ? 'var(--accent-soft)' : 'transparent', color: page === item.id ? 'var(--accent)' : 'var(--text)', fontFamily: 'inherit', fontSize: '15px', fontWeight: page === item.id ? 600 : 500, cursor: 'pointer' }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ height: 8 }} />
          </div>
        </>
      )}

      <nav className="mobile-nav-bar">
        {TABS.map(tab => {
          const active = page === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id as PageId)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, border: 'none', background: 'none', color: active ? 'var(--accent)' : 'var(--text-3)', fontFamily: 'inherit', fontSize: 10, fontWeight: active ? 600 : 500, cursor: 'pointer', padding: '8px 0' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          )
        })}

        <button
          onClick={() => setShowMore(s => !s)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, border: 'none', background: 'none', color: moreActive ? 'var(--accent)' : 'var(--text-3)', fontFamily: 'inherit', fontSize: 10, fontWeight: moreActive ? 600 : 500, cursor: 'pointer', padding: '8px 0' }}
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
          More
        </button>
      </nav>
    </>
  )
}
