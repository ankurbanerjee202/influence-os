'use client'

import { useApp } from './App'
import { PAGE_META } from '@/lib/data'

function SunIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2m-8.5-8.5h2M20.5 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function TopBar() {
  const { page, theme, toggleTheme, currentUser, isAdmin } = useApp()
  const meta = PAGE_META[page] || { crumb: 'Workspace', title: 'Dashboard' }

  const userName = currentUser?.name || 'User'
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <header style={{
      gridArea: 'top',
      background: 'var(--panel)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      padding: '0 22px',
      zIndex: 5,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '170px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>
          {meta.crumb}{' '}
          <span style={{ color: 'var(--border-strong)' }}>/</span>{' '}
          <span style={{ color: 'var(--text-2)' }}>{meta.title}</span>
        </div>
        <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.015em' }}>{meta.title}</div>
      </div>

      {/* Search */}
      <div className="topbar-search" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          height: '38px',
          padding: '0 12px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
        }}>
          <SearchIcon />
          <input
            data-search
            placeholder="Search mentions, agents, assets… (⌘K)"
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              flex: 1,
              fontSize: '13px',
              color: 'var(--text)',
              fontFamily: 'inherit',
            }}
          />
          <span style={{ fontSize: '10.5px', fontWeight: 500, border: '1px solid var(--border-strong)', borderRadius: '5px', padding: '1px 5px', color: 'var(--text-3)' }}>⌘K</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            width: '38px',
            height: '38px',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            background: 'var(--panel)',
            color: 'var(--text-2)',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            background: 'var(--panel)',
            color: 'var(--text-2)',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}
        >
          <BellIcon />
          <span style={{ position: 'absolute', top: '9px', right: '10px', width: '7px', height: '7px', borderRadius: '50%', background: '#f43f5e', border: '2px solid var(--panel)' }} />
        </button>

        <div style={{ width: '1px', height: '26px', background: 'var(--border)', margin: '0 2px' }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          cursor: 'pointer',
          padding: '3px 4px 3px 3px',
          borderRadius: '10px',
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: currentUser?.image ? 'transparent' : 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontSize: '12.5px',
            fontWeight: 600,
            overflow: 'hidden',
          }}>
            {currentUser?.image ? (
              <img src={currentUser.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : userInitials}
          </div>
          <div className="topbar-user-name" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, paddingRight: '4px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{userName}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{isAdmin ? 'Admin' : 'Member'}</span>
          </div>
          <ChevronIcon />
        </div>
      </div>
    </header>
  )
}
