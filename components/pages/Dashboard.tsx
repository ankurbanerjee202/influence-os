'use client'

import { useApp } from '../App'
import { AgentIcon } from '../AgentIcon'
import type { AgentId } from '@/lib/types'

function StatCard({ label, value, delta, icon, note, agent }: { label: string; value: string; delta: string; icon: React.ReactNode; note: string; agent: string }) {
  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '18px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center' }}>{icon}</div>
          <span style={{ fontSize: '12.5px', color: 'var(--text-2)', fontWeight: 500 }}>{label}</span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#0f9b6c' }}>{delta}</span>
      </div>
      <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '3px' }}>{value}</div>
      <div style={{ fontSize: '11.5px', color: 'var(--text-3)' }}>{note} · by {agent}</div>
    </div>
  )
}

function CoverageCard({ mono, outlet, time, headline, sentiment, badgeBg, badgeText }: { mono: string; outlet: string; time: string; headline: string; sentiment: string; badgeBg: string; badgeText: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--text-2)', flex: 'none' }}>{mono}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '11.5px', color: 'var(--text-2)', fontWeight: 600, marginBottom: '1px' }}>{outlet} · {time}</div>
        <div style={{ fontSize: '13px', fontWeight: 500, lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{headline}</div>
      </div>
      <span style={{ flex: 'none', padding: '4px 9px', borderRadius: '7px', fontSize: '10.5px', fontWeight: 600, background: badgeBg, color: badgeText }}>{sentiment}</span>
    </div>
  )
}

export function Dashboard() {
  const { openDrawer, setPage, setCommand, command, sendCommand } = useApp()

  const metrics = [
    { label: 'Media Mentions', value: '142', delta: '+12%', note: 'this week', agent: 'ECHO', icon: <AgentIcon id="echo" size={16} /> },
    { label: 'Net Sentiment', value: '+84%', delta: 'Positive', note: '14-day avg', agent: 'ECHO', icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg> },
    { label: 'Share of Voice', value: '23%', delta: '+3 pts', note: 'vs category', agent: 'LUMA', icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16v-5M12 16V8M17 16v-9" /></svg> },
  ]

  const replaced = [
    { value: '8', label: 'Press assets written' },
    { value: '32', label: 'Posts scheduled' },
    { value: '142', label: 'Mentions tracked' },
    { value: '$18k', label: 'Agency spend saved' },
  ]

  const breakdown = [
    { label: 'Visibility', value: '82', delta: '+5', width: '82%' },
    { label: 'Credibility', value: '76', delta: '+4', width: '76%' },
    { label: 'Engagement', value: '71', delta: '+9', width: '71%' },
    { label: 'Sentiment', value: '88', delta: '+2', width: '88%' },
  ]

  const activity = [
    { agent: 'FLUENT', text: 'drafted "Series A — $14M" press release & 4 pitches.', time: '12 min ago', id: 'fluent' as AgentId },
    { agent: 'ECHO', text: 'flagged a rising trend: "AI governance" (+38%).', time: '40 min ago', id: 'echo' as AgentId },
    { agent: 'AURA', text: 'scheduled 3 LinkedIn thought-leadership posts.', time: '1 hr ago', id: 'aura' as AgentId },
    { agent: 'IVY', text: 'repurposed 1 post → 9 multi-platform assets.', time: '3 hr ago', id: 'ivy' as AgentId },
    { agent: 'LUMA', text: 'compiled your weekly executive brief.', time: '5 hr ago', id: 'luma' as AgentId },
  ]

  const mentions = [
    { mono: 'TC', outlet: 'TechCrunch', time: '2h', headline: 'Influence OS raises $14M to redefine founder-led PR', sentiment: 'Positive', badgeBg: 'rgba(16,185,129,0.13)', badgeText: '#0f9b6c' },
    { mono: 'Fo', outlet: 'Forbes', time: '1d', headline: 'The rise of AI-native communications teams', sentiment: 'Neutral', badgeBg: 'var(--bg)', badgeText: 'var(--text-2)' },
    { mono: 'YS', outlet: 'YourStory', time: '2d', headline: 'How founders automate their thought leadership', sentiment: 'Positive', badgeBg: 'rgba(16,185,129,0.13)', badgeText: '#0f9b6c' },
  ]

  const chips = [
    { label: 'Draft a funding announcement' },
    { label: "Summarize this week's coverage" },
    { label: 'Find journalists to pitch' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.025em', margin: 0 }}>Good morning, Elena</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: '5px 0 0' }}>Your AI brand team has been working overnight. Here&apos;s where things stand.</p>
        </div>
        <button
          onClick={() => setPage('marketplace')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '38px', padding: '0 15px', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}
        >
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
          Manage agents
        </button>
      </div>

      {/* Agency replacement strip */}
      <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap', boxShadow: '0 6px 20px var(--shadow)' }}>
        <div style={{ minWidth: '170px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Replaced this week</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.78)', marginTop: '5px', lineHeight: 1.4 }}>What a full PR &amp; brand agency would have delivered — done automatically.</div>
        </div>
        <div style={{ flex: 1, display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {replaced.map(r => (
            <div key={r.label} style={{ flex: 1, minWidth: '120px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 14px' }}>
              <div style={{ fontSize: '21px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{r.value}</div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', marginTop: '2px' }}>{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero + breakdown */}
      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '18px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px', display: 'flex', gap: '20px', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '164px', height: '164px', flex: 'none' }}>
            <svg width="164" height="164" viewBox="0 0 180 180">
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent-2)" />
                </linearGradient>
              </defs>
              <circle cx="90" cy="90" r="70" fill="none" stroke="var(--border)" strokeWidth="13" />
              <circle
                cx="90" cy="90" r="70"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray="440"
                strokeDashoffset="440"
                transform="rotate(-90 90 90)"
                className="score-draw"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>84</div>
              <div style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>Brand Health</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', minWidth: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', padding: '4px 9px', borderRadius: '7px', background: 'rgba(16,185,129,0.12)', color: '#0f9b6c', fontSize: '11.5px', fontWeight: 600 }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6-6 6 6" /></svg>
              +6 this month
            </div>
            <div style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Founder Authority &amp; Brand Health</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-2)', lineHeight: 1.5 }}>Scored live by <b style={{ color: 'var(--text)', fontWeight: 600 }}>LUMA</b>. You rank in the top 8% of founders in AI &amp; SaaS — momentum is strong.</div>
            <button onClick={() => setPage('health')} style={{ alignSelf: 'flex-start', marginTop: '2px', fontSize: '12.5px', fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
              View full report →
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '18px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 600 }}>Health breakdown</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-3)' }}>vs. last 30 days</div>
          </div>
          {breakdown.map(b => (
            <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-2)', fontWeight: 500 }}>{b.label}</span>
                <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{b.value}<span style={{ color: '#0f9b6c', fontWeight: 600, fontSize: '11px', marginLeft: '6px' }}>{b.delta}</span></span>
              </div>
              <div style={{ height: '7px', borderRadius: '5px', background: 'var(--bg)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '5px', width: b.width, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
        {metrics.map(m => <StatCard key={m.label} {...m} />)}
      </section>

      {/* Command Center */}
      <section style={{ position: 'relative', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '18px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px 24px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-30px', width: '240px', height: '240px', background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '14px', position: 'relative' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', display: 'grid', placeItems: 'center', boxShadow: '0 4px 12px var(--shadow)' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.015em' }}>Command Center</div>
            <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>Tell your agents what you need — in plain language.</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '48px', padding: '0 8px 0 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', transition: 'border-color 0.15s' }}
          onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
          onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <input
            value={command}
            onChange={e => setCommand(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendCommand() }}
            placeholder="e.g. Draft a Series A press release and find 5 journalists to pitch…"
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13.5px', color: 'var(--text)', fontFamily: 'inherit' }}
          />
          <button
            onClick={sendCommand}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 15px', border: 'none', borderRadius: '9px', background: 'var(--ink)', color: 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Run
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0" /><path d="m13 6 6 6-6 6" /></svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '13px' }}>
          {chips.map(c => (
            <button
              key={c.label}
              onClick={() => setCommand(c.label)}
              style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 12px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--panel)', color: 'var(--text-2)', fontFamily: 'inherit', fontSize: '12px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--accent)'; el.style.color = 'var(--accent)'; el.style.background = 'var(--accent-soft)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-2)'; el.style.background = 'var(--panel)' }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Activity + Coverage */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '18px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Agent activity</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '6px' }}>What your team did while you were away</div>
          {activity.map(a => (
            <div key={a.agent} style={{ display: 'flex', gap: '12px', padding: '11px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <AgentIcon id={a.id} size={15} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12.5px', lineHeight: 1.4 }}><b style={{ fontWeight: 600 }}>{a.agent}</b> {a.text}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px' }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '18px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Recent coverage</div>
            <button onClick={() => setPage('monitor')} style={{ fontSize: '12px', fontWeight: 500, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View all →</button>
          </div>
          {mentions.map(m => <CoverageCard key={m.outlet} {...m} />)}
        </div>
      </section>
    </div>
  )
}
