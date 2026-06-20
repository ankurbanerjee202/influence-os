'use client'

import { useState, useCallback, useEffect, createContext, useContext } from 'react'
import { useSession } from 'next-auth/react'
import type { AppState, AgentId, PageId, Message } from '@/lib/types'
import { AGENTS } from '@/lib/data'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { AgentHub } from './AgentHub'
import { ChatDrawer } from './ChatDrawer'
import { MobileNav } from './MobileNav'
import { Dashboard } from './pages/Dashboard'
import { BrandStrategy } from './pages/BrandStrategy'
import { PRCenter } from './pages/PRCenter'
import { ContentStudio } from './pages/ContentStudio'
import { MediaMonitor } from './pages/MediaMonitor'
import { BrandHealth } from './pages/BrandHealth'
import { AgentMarketplace } from './pages/AgentMarketplace'
import { Settings } from './pages/Settings'

interface AppCtx extends AppState {
  setPage: (p: PageId) => void
  setTheme: (t: 'light' | 'dark') => void
  toggleTheme: () => void
  openDrawer: (id: AgentId) => void
  closeDrawer: () => void
  setCommand: (v: string) => void
  sendCommand: () => void
  sendChat: () => void
  setChatInput: (v: string) => void
  toggleCrisis: () => void
  toggleDeploy: (id: AgentId) => void
  dismissToast: () => void
  // Auth
  accessLevel: string
  isAdmin: boolean
  currentUser: { name?: string | null; email?: string | null; image?: string | null } | null
}

export const AppContext = createContext<AppCtx | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}

function LockedPage({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '12px', textAlign: 'center', padding: '24px' }}>
      <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'var(--panel)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', marginBottom: '4px' }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em' }}>{title} is locked</div>
      <div style={{ fontSize: '13px', color: 'var(--text-2)', maxWidth: '320px', lineHeight: 1.55 }}>
        Full access to this feature requires admin approval. You&apos;ll receive an email at <strong>{''}</strong> once approved.
      </div>
      <div style={{ marginTop: '4px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ fontSize: '11.5px', color: 'var(--text-3)', background: 'var(--panel)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px' }}>
          ✓ Brand health &amp; sentiment — available now
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-3)', background: 'var(--panel)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px' }}>
          🔒 Agents, PR &amp; content — after approval
        </div>
      </div>
    </div>
  )
}

const INITIAL_STATE: AppState = {
  theme: 'light',
  page: 'dashboard',
  drawerAgentId: null,
  command: '',
  chatInput: '',
  chats: {},
  crisis: false,
  deployed: { fluent: true, navi: true, echo: true, aura: true, ivy: true, luma: false },
  toast: null,
}

const LOCKED_PAGES: PageId[] = ['strategy', 'pr', 'content', 'marketplace']

export function App() {
  const { data: session } = useSession()
  const accessLevel = session?.user?.accessLevel || 'pending'
  const isAdmin = session?.user?.role === 'admin'
  const currentUser = session?.user || null
  const [state, setState] = useState<AppState>(INITIAL_STATE)

  const patch = useCallback((up: Partial<AppState> | ((s: AppState) => Partial<AppState>)) => {
    setState(s => ({ ...s, ...(typeof up === 'function' ? up(s) : up) }))
  }, [])

  const setPage = useCallback((p: PageId) => patch({ page: p }), [patch])
  const setTheme = useCallback((t: 'light' | 'dark') => patch({ theme: t }), [patch])
  const toggleTheme = useCallback(() => patch(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })), [patch])

  const openDrawer = useCallback((id: AgentId) => {
    // Block agent access for non-approved, non-admin users
    if (accessLevel !== 'full' && !isAdmin) {
      patch({ toast: 'Agent access requires admin approval. Check your email.' })
      setTimeout(() => patch({ toast: null }), 3500)
      return
    }
    patch(s => {
      const agent = AGENTS.find(a => a.id === id)!
      const chats = { ...s.chats }
      if (!chats[id]) chats[id] = [{ role: 'agent', text: agent.seed }]
      return { drawerAgentId: id, chats }
    })
  }, [patch, accessLevel, isAdmin])

  const closeDrawer = useCallback(() => patch({ drawerAgentId: null }), [patch])

  const setCommand = useCallback((v: string) => patch({ command: v }), [patch])
  const setChatInput = useCallback((v: string) => patch({ chatInput: v }), [patch])

  const addAgentReply = useCallback((id: AgentId) => {
    // Add typing indicator
    patch(s => ({
      chats: { ...s.chats, [id]: [...(s.chats[id] || []), { role: 'agent', text: '…', typing: true }] }
    }))

    // Get current messages snapshot to send to API
    setState(s => {
      const messages = (s.chats[id] || []).filter((m: Message) => !('typing' in m))

      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: id, messages }),
      })
        .then(r => r.json())
        .then(({ reply, error }) => {
          patch(s2 => {
            const cur = (s2.chats[id] || []).filter((m: Message) => !('typing' in m))
            return { chats: { ...s2.chats, [id]: [...cur, { role: 'agent', text: reply ?? error ?? 'Something went wrong.' }] } }
          })
        })
        .catch(() => {
          patch(s2 => {
            const cur = (s2.chats[id] || []).filter((m: Message) => !('typing' in m))
            return { chats: { ...s2.chats, [id]: [...cur, { role: 'agent', text: 'Connection error — please try again.' }] } }
          })
        })

      return s
    })
  }, [patch])

  const sendCommand = useCallback(() => {
    const t = state.command.trim()
    if (!t) return
    patch(s => {
      const id: AgentId = 'fluent'
      const agent = AGENTS.find(a => a.id === id)!
      const chats = { ...s.chats }
      if (!chats[id]) chats[id] = [{ role: 'agent', text: agent.seed }]
      chats[id] = [...(chats[id] || []), { role: 'user', text: t }]
      return { chats, drawerAgentId: id, command: '', toast: 'Command sent to FLUENT' }
    })
    addAgentReply('fluent')
    setTimeout(() => patch({ toast: null }), 3000)
  }, [state.command, patch, addAgentReply])

  const sendChat = useCallback(() => {
    const t = state.chatInput.trim()
    const id = state.drawerAgentId
    if (!t || !id) return
    patch(s => {
      const cur = s.chats[id] || []
      return {
        chats: { ...s.chats, [id]: [...cur, { role: 'user', text: t }] },
        chatInput: '',
      }
    })
    addAgentReply(id)
  }, [state.chatInput, state.drawerAgentId, patch, addAgentReply])

  const toggleCrisis = useCallback(() => patch(s => ({ crisis: !s.crisis })), [patch])
  const toggleDeploy = useCallback((id: AgentId) => patch(s => ({ deployed: { ...s.deployed, [id]: !s.deployed[id] } })), [patch])
  const dismissToast = useCallback(() => patch({ toast: null }), [patch])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('[data-search]')?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeDrawer])

  const ctx: AppCtx = {
    ...state,
    setPage,
    setTheme,
    toggleTheme,
    openDrawer,
    closeDrawer,
    setCommand,
    sendCommand,
    sendChat,
    setChatInput,
    toggleCrisis,
    toggleDeploy,
    dismissToast,
    accessLevel,
    isAdmin,
    currentUser,
  }

  const canAccess = (page: PageId) => isAdmin || accessLevel === 'full' || !LOCKED_PAGES.includes(page)

  const PAGE_MAP: Record<PageId, React.ReactNode> = {
    dashboard: <Dashboard />,
    strategy: canAccess('strategy') ? <BrandStrategy /> : <LockedPage title="Brand Strategy" />,
    pr: canAccess('pr') ? <PRCenter /> : <LockedPage title="PR Center" />,
    content: canAccess('content') ? <ContentStudio /> : <LockedPage title="Content Studio" />,
    monitor: <MediaMonitor />,
    health: <BrandHealth />,
    marketplace: canAccess('marketplace') ? <AgentMarketplace /> : <LockedPage title="Agent Marketplace" />,
    settings: <Settings />,
  }

  return (
    <AppContext.Provider value={ctx}>
      <div
        className="app-wrapper"
        data-theme={state.theme}
        style={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr 360px',
          gridTemplateRows: '64px 1fr',
          gridTemplateAreas: '"side top top" "side main rail"',
          height: '100vh',
          width: '100%',
          background: 'var(--bg)',
          color: 'var(--text)',
          overflow: 'hidden',
        }}
      >
        <Sidebar />
        <TopBar />
        <main
          className="app-main"
          style={{
            gridArea: 'main',
            overflowY: 'auto',
            padding: '24px 26px 44px',
          }}
        >
          <div key={state.page} className="page-in">
            {PAGE_MAP[state.page]}
          </div>
        </main>
        <AgentHub />
        <MobileNav />
        {state.drawerAgentId && <ChatDrawer />}
        {state.toast && (
          <div
            className="toast-in"
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              background: 'var(--ink)',
              color: 'var(--ink-fg)',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 8px 24px var(--shadow-lg)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            {state.toast}
          </div>
        )}
      </div>
    </AppContext.Provider>
  )
}
