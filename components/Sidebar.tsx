'use client'

import { useApp } from './App'
import { LogoMark, AgentIcon } from './AgentIcon'
import type { PageId } from '@/lib/types'
import { NAV_MAIN, NAV_INTEL } from '@/lib/data'

const ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="8" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="15" width="7" height="6" rx="1.5" />
    </svg>
  ),
  strategy: <AgentIcon id="navi" size={17} />,
  pr: <AgentIcon id="fluent" size={17} />,
  content: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
      <path d="m2 2 7.6 7.6" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  marketplace: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  ),
  monitor: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  health: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  settings: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 14H4.5a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 10 4.6V4.5a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 2.82 1.17l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 10h.1a2 2 0 0 1 0 4h-.1z" />
    </svg>
  ),
}

function NavButton({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '11px',
        width: '100%',
        padding: '9px 10px',
        border: 'none',
        borderRadius: '9px',
        background: active ? 'var(--accent-soft)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-2)',
        fontFamily: 'inherit',
        fontSize: '13.5px',
        fontWeight: active ? 600 : 500,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--accent-soft)' }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
    >
      <span style={{ display: 'flex', color: active ? 'var(--accent)' : 'var(--text-3)', transition: 'color 0.15s' }}>
        {ICONS[id]}
      </span>
      {label}
    </button>
  )
}

export function Sidebar() {
  const { page, setPage, deployed } = useApp()
  const activeCount = Object.values(deployed).filter(Boolean).length

  return (
    <aside style={{
      gridArea: 'side',
      background: 'var(--panel)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 14px',
      gap: '3px',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px 16px 8px', color: 'var(--ink)' }}>
        <LogoMark size={22} />
        <span style={{ fontSize: '15.5px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)' }}>Influence OS</span>
      </div>

      <div style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '8px 10px 6px' }}>
        Workspace
      </div>

      {NAV_MAIN.map(item => (
        <NavButton
          key={item.id}
          id={item.id}
          label={item.label}
          active={page === item.id}
          onClick={() => setPage(item.id as PageId)}
        />
      ))}

      <div style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '16px 10px 6px' }}>
        Intelligence
      </div>

      {NAV_INTEL.map(item => (
        <NavButton
          key={item.id}
          id={item.id}
          label={item.label}
          active={page === item.id}
          onClick={() => setPage(item.id as PageId)}
        />
      ))}

      <div style={{ flex: 1 }} />

      {/* Usage card */}
      <div style={{ margin: '0 4px 8px', padding: '13px', borderRadius: '12px', background: 'var(--panel-2)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Beta workspace</span>
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-soft)', padding: '2px 7px', borderRadius: '5px' }}>PRO</span>
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-2)', lineHeight: 1.45, marginBottom: '10px' }}>
          {activeCount} agents active · 2,140 actions left this month.
        </div>
        <div style={{ height: '5px', borderRadius: '4px', background: 'var(--border-strong)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '68%', borderRadius: '4px', background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} />
        </div>
      </div>

      <NavButton id="settings" label="Settings" active={page === 'settings'} onClick={() => setPage('settings')} />
    </aside>
  )
}
