export type PageId =
  | 'dashboard'
  | 'strategy'
  | 'pr'
  | 'content'
  | 'monitor'
  | 'health'
  | 'marketplace'
  | 'settings'

export type Theme = 'light' | 'dark'

export type AgentId = 'fluent' | 'navi' | 'echo' | 'aura' | 'ivy' | 'luma'

export interface Message {
  role: 'user' | 'agent'
  text: string
}

export interface AppState {
  theme: Theme
  page: PageId
  drawerAgentId: AgentId | null
  command: string
  chatInput: string
  chats: Partial<Record<AgentId, Message[]>>
  crisis: boolean
  deployed: Record<AgentId, boolean>
  toast: string | null
}

export interface Agent {
  id: AgentId
  name: string
  role: string
  tagline: string
  status: string
  statusTone: 'emerald' | 'violet' | 'amber' | 'blue'
  activity: string
  replaces: string
  caps: string[]
  seed: string
  replies: string[]
  quickActions: string[]
}
