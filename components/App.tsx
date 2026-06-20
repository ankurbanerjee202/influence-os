'use client'

import { useState, useCallback, useEffect, createContext, useContext } from 'react'
import type { AppState, AgentId, PageId, Message } from '@/lib/types'
import { AGENTS } from '@/lib/data'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { AgentHub } from './AgentHub'
import { ChatDrawer } from './ChatDrawer'
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
}

export const AppContext = createContext<AppCtx | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
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

export function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE)

  const patch = useCallback((up: Partial<AppState> | ((s: AppState) => Partial<AppState>)) => {
    setState(s => ({ ...s, ...(typeof up === 'function' ? up(s) : up) }))
  }, [])

  const setPage = useCallback((p: PageId) => patch({ page: p }), [patch])
  const setTheme = useCallback((t: 'light' | 'dark') => patch({ theme: t }), [patch])
  const toggleTheme = useCallback(() => patch(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })), [patch])

  const openDrawer = useCallback((id: AgentId) => {
    patch(s => {
      const agent = AGENTS.find(a => a.id === id)!
      const chats = { ...s.chats }
      if (!chats[id]) chats[id] = [{ role: 'agent', text: agent.seed }]
      return { drawerAgentId: id, chats }
    })
  }, [patch])

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
  }

  const PAGE_MAP: Record<PageId, React.ReactNode> = {
    dashboard: <Dashboard />,
    strategy: <BrandStrategy />,
    pr: <PRCenter />,
    content: <ContentStudio />,
    monitor: <MediaMonitor />,
    health: <BrandHealth />,
    marketplace: <AgentMarketplace />,
    settings: <Settings />,
  }

  return (
    <AppContext.Provider value={ctx}>
      <div
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
