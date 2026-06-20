'use client'

import { useRef, useEffect } from 'react'
import { useApp } from './App'
import { AgentIcon } from './AgentIcon'
import { AGENTS, TONE_STYLES } from '@/lib/data'

function XIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}

export function ChatDrawer() {
  const { drawerAgentId, closeDrawer, chats, chatInput, setChatInput, sendChat, openDrawer } = useApp()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  if (!drawerAgentId) return null

  const agent = AGENTS.find(a => a.id === drawerAgentId)!
  const tone = TONE_STYLES[agent.statusTone]
  const messages = chats[drawerAgentId] || []

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    scrollToBottom()
  }, [messages.length])

  const quickSend = (text: string) => {
    openDrawer(drawerAgentId)
    setTimeout(() => {
      const { sendChat: sc } = useApp() // Can't call hooks in callback, handled differently
    }, 0)
    // Directly manipulate via app context
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className="overlay-in"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8,10,16,0.5)',
          backdropFilter: 'blur(3px)',
        }}
      />

      {/* Drawer */}
      <div
        className="drawer-in chat-drawer"
        style={{
          position: 'relative',
          width: '440px',
          maxWidth: '92vw',
          height: '100%',
          background: 'var(--panel)',
          borderLeft: '1px solid var(--border)',
          boxShadow: '-12px 0 40px var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '11px',
            background: 'var(--accent-soft)',
            color: 'var(--accent)',
            display: 'grid',
            placeItems: 'center',
            flex: 'none',
          }}>
            <AgentIcon id={agent.id} size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.01em' }}>{agent.name}</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '2px 8px',
                borderRadius: '6px',
                background: tone.pillBg,
                color: tone.pillText,
                fontSize: '10.5px',
                fontWeight: 600,
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: tone.dot }} />
                {agent.status}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '2px' }}>
              {agent.role} · {agent.tagline}
            </div>
          </div>
          <button
            onClick={closeDrawer}
            style={{
              width: '34px',
              height: '34px',
              display: 'grid',
              placeItems: 'center',
              border: '1px solid var(--border)',
              borderRadius: '9px',
              background: 'var(--panel)',
              color: 'var(--text-2)',
              cursor: 'pointer',
              flex: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}
          >
            <XIcon />
          </button>
        </div>

        {/* Quick actions */}
        <div style={{
          padding: '12px 18px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          background: 'var(--panel-2)',
        }}>
          {agent.quickActions.map(action => (
            <QuickActionBtn key={action} label={action} agentId={drawerAgentId} />
          ))}
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'var(--bg)',
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className="float-up"
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <div style={{
                maxWidth: '80%',
                padding: '11px 14px',
                borderRadius: '14px',
                fontSize: '13px',
                lineHeight: 1.5,
                background: msg.role === 'user' ? 'var(--ink)' : 'var(--panel)',
                color: msg.role === 'user' ? 'var(--ink-fg)' : 'var(--text)',
                border: `1px solid ${msg.role === 'user' ? 'var(--ink)' : 'var(--border)'}`,
                boxShadow: '0 1px 2px var(--shadow)',
              }}>
                {msg.typing ? (
                  <span style={{ display: 'inline-flex', gap: '3px', alignItems: 'center', padding: '2px 0' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--text-3)', display: 'inline-block', animation: 'blink 1.2s infinite', animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </span>
                ) : msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              height: '46px',
              padding: '0 7px 0 14px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              transition: 'border-color 0.15s',
            }}
            onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendChat() }}
              placeholder={`Message ${agent.name}…`}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13px',
                color: 'var(--text)',
                fontFamily: 'inherit',
              }}
              autoFocus
            />
            <button
              onClick={sendChat}
              style={{
                width: '34px',
                height: '34px',
                display: 'grid',
                placeItems: 'center',
                border: 'none',
                borderRadius: '9px',
                background: 'var(--ink)',
                color: 'var(--ink-fg)',
                cursor: 'pointer',
                flex: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActionBtn({ label, agentId }: { label: string; agentId: ReturnType<typeof useApp>['drawerAgentId'] }) {
  const app = useApp()

  const handleClick = () => {
    if (!agentId) return
    const agent = AGENTS.find(a => a.id === agentId)!
    const cur = app.chats[agentId] || []
    // Add user message and trigger reply via setChatInput + sendChat pattern
    app.setChatInput(label)
    setTimeout(() => {
      app.sendChat()
    }, 10)
  }

  return (
    <button
      onClick={() => {
        if (!agentId) return
        app.setChatInput(label)
        setTimeout(() => app.sendChat(), 10)
      }}
      style={{
        fontSize: '11.5px',
        fontWeight: 500,
        color: 'var(--text-2)',
        background: 'var(--panel)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '6px 11px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--accent)'
        el.style.color = 'var(--accent)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.color = 'var(--text-2)'
      }}
    >
      {label}
    </button>
  )
}
