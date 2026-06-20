'use client'

import { useApp } from './App'
import { AgentIcon } from './AgentIcon'
import { AGENTS, TONE_STYLES, PAGE_FOCUS_AGENT } from '@/lib/data'
import type { Agent } from '@/lib/types'

function ChatIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function AgentCard({ agent, isFocus }: { agent: Agent; isFocus: boolean }) {
  const { openDrawer, openMarketplace } = useApp() as ReturnType<typeof useApp> & { openMarketplace?: () => void }
  const tone = TONE_STYLES[agent.statusTone]
  const app = useApp()

  return (
    <div
      style={{
        border: `1px solid ${isFocus ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '14px',
        padding: '14px',
        background: isFocus ? 'var(--accent-soft)' : 'var(--panel-2)',
        transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 6px 18px var(--shadow)'
        el.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'none'
        el.style.transform = 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'var(--accent-soft)',
          color: 'var(--accent)',
          display: 'grid',
          placeItems: 'center',
          flex: 'none',
        }}>
          <AgentIcon id={agent.id} size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 700, letterSpacing: '0.01em' }}>{agent.name}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{agent.role}</span>
            {isFocus && (
              <span style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: 'var(--accent)',
                background: 'var(--panel)',
                border: '1px solid var(--accent)',
                padding: '1px 6px',
                borderRadius: '5px',
              }}>On this page</span>
            )}
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            marginTop: '5px',
            padding: '3px 8px',
            borderRadius: '6px',
            background: tone.pillBg,
            color: tone.pillText,
            fontSize: '10.5px',
            fontWeight: 600,
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: tone.dot }} />
            {agent.status}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.45, margin: '11px 0 12px' }}>
        {agent.activity}
      </div>

      <button
        onClick={() => app.openDrawer(agent.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '7px',
          width: '100%',
          height: '34px',
          border: '1px solid var(--border)',
          borderRadius: '9px',
          background: 'var(--panel)',
          color: 'var(--text)',
          fontFamily: 'inherit',
          fontSize: '12.5px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'var(--ink)'
          el.style.color = 'var(--ink-fg)'
          el.style.borderColor = 'var(--ink)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'var(--panel)'
          el.style.color = 'var(--text)'
          el.style.borderColor = 'var(--border)'
        }}
      >
        <ChatIcon />
        Chat with {agent.name}
      </button>
    </div>
  )
}

export function AgentHub() {
  const { page, deployed, setPage } = useApp()
  const focusId = PAGE_FOCUS_AGENT[page]
  const onlineCount = Object.values(deployed).filter(Boolean).length

  const hubSubtitle = focusId
    ? `Focused on ${page.charAt(0).toUpperCase() + page.slice(1)} · your full AI team stays on call.`
    : 'Your autonomous PR & brand team. Tap any agent to collaborate.'

  return (
    <aside style={{
      gridArea: 'rail',
      background: 'var(--panel)',
      borderLeft: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.015em' }}>Agent Hub</span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 9px',
            borderRadius: '7px',
            background: 'rgba(16,185,129,0.12)',
            color: '#0f9b6c',
            fontSize: '11px',
            fontWeight: 600,
          }}>
            <span className="blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            {onlineCount} online
          </div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '5px', lineHeight: 1.4 }}>{hubSubtitle}</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {AGENTS.map(agent => (
          <AgentCard key={agent.id} agent={agent} isFocus={agent.id === focusId} />
        ))}

        <button
          onClick={() => setPage('marketplace')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            height: '42px',
            border: '1px dashed var(--border-strong)',
            borderRadius: '12px',
            background: 'transparent',
            color: 'var(--text-2)',
            fontFamily: 'inherit',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--accent)'
            el.style.color = 'var(--accent)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border-strong)'
            el.style.color = 'var(--text-2)'
          }}
        >
          <PlusIcon />
          Manage all agents
        </button>
      </div>
    </aside>
  )
}
