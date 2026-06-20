import type { Agent } from './types'

export const AGENTS: Agent[] = [
  {
    id: 'fluent',
    name: 'FLUENT',
    role: 'PR & Comms',
    tagline: 'AI communication strategist for press, pitches & crisis.',
    status: 'Ready',
    statusTone: 'emerald',
    activity: '1 press release drafted · 4 pitches queued for review',
    replaces: 'Slow agency turnaround',
    caps: ['Press releases', 'Media pitches', 'Crisis comms', 'Messaging frameworks'],
    seed: "FLUENT here — your communication strategist. I have a Series A press release drafted and 4 journalist pitches queued. Want me to personalize each pitch before they go out?",
    replies: [
      "On it — I'll tailor each pitch to the outlet's beat and queue them for your approval.",
      "Drafting now in PR-ready format. I'll keep the tone executive-grade and embargo until Tuesday.",
      "Done. I've aligned the messaging with NAVI's narrative so it stays consistent everywhere.",
    ],
    quickActions: ['Draft a press release', 'Write 3 journalist pitches', 'Activate crisis mode'],
  },
  {
    id: 'navi',
    name: 'NAVI',
    role: 'Brand Strategy',
    tagline: 'AI brand strategist for positioning & differentiation.',
    status: 'Ready',
    statusTone: 'emerald',
    activity: 'Messaging system v3 aligned across all teams',
    replaces: 'Weeks of strategy workshops',
    caps: ['Positioning', 'Messaging', 'Personas', 'White-space'],
    seed: "NAVI online — your brand strategist. Your positioning and messaging system v3 is aligned across teams. I can map a competitor's narrative or refine a pillar whenever you're ready.",
    replies: [
      "Here's the move: own the 'founder-led intelligence' white-space — no competitor holds it yet.",
      "I've mapped their narrative. They lean on 'automation'; you should counter with 'authority'.",
      "Updated the messaging pillar. I'll push the change to FLUENT so all comms stay aligned.",
    ],
    quickActions: ["Map a competitor", "Refine my positioning", "Build a persona"],
  },
  {
    id: 'echo',
    name: 'ECHO',
    role: 'Media & Reach',
    tagline: 'Real-time media monitoring & amplification engine.',
    status: 'Active',
    statusTone: 'violet',
    activity: 'Tracking 142 mentions across 38 keywords in real time',
    replaces: 'Manual media monitoring',
    caps: ['Mention monitoring', 'Sentiment', 'Trend detection', 'Benchmarking'],
    seed: "ECHO active — your media radar. 142 mentions this week, sentiment trending up. I've spotted a rising trend you could own. Want the briefing?",
    replies: [
      "Trending around you: 'AI governance' and 'founder-led growth'. I'd amplify within 48 hours.",
      "Mentions are up 12% — mostly positive. I'll flag the moment anything turns negative.",
      "I found a journalist actively covering your category. Want me to hand this to FLUENT to pitch?",
    ],
    quickActions: ["Show rising trends", "Find PR opportunities", "Check my sentiment"],
  },
  {
    id: 'aura',
    name: 'AURA',
    role: 'Leadership Brand',
    tagline: 'Leadership authority engine for LinkedIn & thought-leadership content.',
    status: 'Drafting',
    statusTone: 'amber',
    activity: '5 thought-leadership posts drafted in your voice',
    replaces: 'Ghostwriters & inconsistency',
    caps: ['Leadership narrative', 'LinkedIn engine', 'Tone calibration', 'Speaking radar'],
    seed: "AURA here — your leadership branding engine. I've drafted 5 thought-leadership posts in your voice for this week. Want to review the strongest angle first?",
    replies: [
      "The strongest angle is a contrarian take on hiring. Want the full draft in your voice?",
      "I'll keep it to your rhythm — short sentences, a strong POV, no AI fluff.",
      "Scheduled. IVY will repurpose it into a thread and a newsletter section automatically.",
    ],
    quickActions: ["Draft this week's posts", "Find speaking slots", "Calibrate my tone"],
  },
  {
    id: 'ivy',
    name: 'IVY',
    role: 'Automation',
    tagline: 'Automation engine for repurposing & distribution.',
    status: 'Active',
    statusTone: 'violet',
    activity: 'Repurposing 1→10 · 24 posts scheduled this week',
    replaces: 'Manual repurposing ops',
    caps: ['1→10 repurposing', 'Scheduling', 'Campaign automation', 'Asset library'],
    seed: "IVY ready — your automation engine. I can turn any single post into 10 platform-ready assets and schedule the whole week. What should I repurpose first?",
    replies: [
      "Repurposing into LinkedIn, X thread, newsletter, carousel and a reel script — 10 assets total.",
      "I'll stagger posting across time zones for maximum reach. Want me to apply the weekly cycle?",
      "Done. Everything's in the asset library, tagged and scheduled across platforms.",
    ],
    quickActions: ["Repurpose my last post", "Schedule the week", "Build a campaign"],
  },
  {
    id: 'luma',
    name: 'LUMA',
    role: 'Intelligence',
    tagline: 'Insight & forecasting for brand health & risk.',
    status: 'Monitoring',
    statusTone: 'blue',
    activity: 'Brand health 84 · 1 low-level risk flagged',
    replaces: 'Manual reports & guesswork',
    caps: ['Health dashboards', 'Risk alerts', 'Forecasting', 'Exec briefs'],
    seed: "LUMA online — your intelligence layer. Brand health is 84 and climbing, with 1 low-level risk flagged. I can generate your executive brief or forecast the next PR window.",
    replies: [
      "Your executive brief is ready: health 84 (+6), 1 risk, 3 opportunities. Want the highlights?",
      "I'm forecasting a visibility window in ~9 days around your category — prep content now.",
      "Competitor momentum shifted: one rival is losing ground. Good moment to push your narrative.",
    ],
    quickActions: ["Generate exec brief", "Forecast next window", "Run a risk scan"],
  },
]

export const TONE_STYLES = {
  emerald: { dot: '#10b981', pillBg: 'rgba(16,185,129,0.13)', pillText: '#0f9b6c' },
  blue: { dot: '#3b82f6', pillBg: 'rgba(59,130,246,0.13)', pillText: '#2f72e0' },
  violet: { dot: '#7c5cff', pillBg: 'rgba(124,92,255,0.15)', pillText: '#7c5cff' },
  amber: { dot: '#f59e0b', pillBg: 'rgba(245,158,11,0.15)', pillText: '#c47d12' },
}

export const NAV_MAIN = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'strategy', label: 'Brand Strategy' },
  { id: 'pr', label: 'PR Center' },
  { id: 'content', label: 'Content Studio' },
  { id: 'marketplace', label: 'Agent Marketplace' },
] as const

export const NAV_INTEL = [
  { id: 'monitor', label: 'Media Monitor' },
  { id: 'health', label: 'Brand Health' },
] as const

export const PAGE_META: Record<string, { crumb: string; title: string }> = {
  dashboard: { crumb: 'Workspace', title: 'Dashboard' },
  strategy: { crumb: 'Workspace', title: 'Brand Strategy' },
  pr: { crumb: 'Workspace', title: 'PR Center' },
  content: { crumb: 'Workspace', title: 'Content Studio' },
  marketplace: { crumb: 'Workspace', title: 'Agent Marketplace' },
  monitor: { crumb: 'Intelligence', title: 'Media Monitor' },
  health: { crumb: 'Intelligence', title: 'Brand Health' },
  settings: { crumb: 'Account', title: 'Settings' },
}

export const PAGE_FOCUS_AGENT: Record<string, string> = {
  strategy: 'navi',
  pr: 'fluent',
  content: 'aura',
  monitor: 'echo',
  health: 'luma',
}
