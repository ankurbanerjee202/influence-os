'use client'

import { useState } from 'react'
import { useApp } from '../App'
import { AgentIcon } from '../AgentIcon'

function AgentBanner() {
  const { openDrawer } = useApp()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '13px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '14px', boxShadow: '0 1px 2px var(--shadow)', padding: '14px 18px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <AgentIcon id="echo" size={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>Powered by ECHO</div>
        <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '1px' }}>Real-time media monitoring, sentiment & amplification.</div>
      </div>
      <button onClick={() => openDrawer('echo')} style={{ display: 'inline-flex', alignItems: 'center', height: '34px', padding: '0 14px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Chat with ECHO</button>
    </div>
  )
}

export function MediaMonitor() {
  const { openDrawer } = useApp()
  const [filter, setFilter] = useState<'All' | 'Positive' | 'Risk'>('All')

  const stats = [
    { label: 'Brand Mentions', value: '142', delta: '+12%' },
    { label: 'Sentiment Score', value: '84', delta: '+4' },
    { label: 'Share of Voice', value: '23%', delta: '+3' },
    { label: 'Reputation Risk', value: 'Low', delta: 'Stable' },
  ]

  const trends = [
    { tag: 'AI governance', width: '92%', delta: '+38%' },
    { tag: 'Founder-led growth', width: '74%', delta: '+21%' },
    { tag: 'PR automation', width: '61%', delta: '+17%' },
    { tag: 'India SaaS funding', width: '48%', delta: '+9%' },
  ]

  const feed = [
    { mono: 'TC', outlet: 'TechCrunch', time: '2h', headline: 'Influence OS raises $14M to redefine founder-led PR', sentiment: 'Positive', badgeBg: 'rgba(16,185,129,0.13)', badgeText: '#0f9b6c', action: 'Amplify' },
    { mono: 'Re', outlet: 'Reddit · r/startups', time: '5h', headline: 'Anyone tried Influence OS? Curious about the agent model', sentiment: 'Neutral', badgeBg: 'var(--bg)', badgeText: 'var(--text-2)', action: 'Respond' },
    { mono: 'X', outlet: 'X · @saas_daily', time: '8h', headline: 'The 6-agent approach is smart — most AI PR tools are shallow', sentiment: 'Positive', badgeBg: 'rgba(16,185,129,0.13)', badgeText: '#0f9b6c', action: 'Amplify' },
    { mono: 'Bl', outlet: 'Blog · MediaWatch', time: '1d', headline: 'Is AI coming for the PR agency? A skeptical take', sentiment: 'Risk', badgeBg: 'rgba(244,63,94,0.12)', badgeText: '#e11d48', action: 'Pitch' },
  ]

  const filteredFeed = feed.filter(f => filter === 'All' || f.sentiment === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AgentBanner />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '14px', boxShadow: '0 1px 2px var(--shadow)', padding: '15px 17px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--text-2)', fontWeight: 500 }}>{s.label}</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#0f9b6c', background: 'rgba(16,185,129,0.12)', padding: '2px 6px', borderRadius: '5px' }}>{s.delta}</span>
            </div>
            <div style={{ fontSize: '23px', fontWeight: 700, letterSpacing: '-0.02em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Sentiment, last 14 days</div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: 'var(--text-2)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10b981', display: 'inline-block' }} />Positive</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--border-strong)', display: 'inline-block' }} />Neutral</span>
            </div>
          </div>
          <svg width="100%" height="160" viewBox="0 0 600 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sentArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,120 L46,110 L92,118 L138,96 L184,104 L230,82 L276,90 L322,66 L368,74 L414,52 L460,60 L506,40 L552,46 L600,30 L600,160 L0,160 Z" fill="url(#sentArea)" />
            <path d="M0,120 L46,110 L92,118 L138,96 L184,104 L230,82 L276,90 L322,66 L368,74 L414,52 L460,60 L506,40 L552,46 L600,30" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: 'var(--text-3)', marginTop: '4px' }}>
            <span>Jun 6</span><span>Jun 13</span><span>Jun 20</span>
          </div>
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Trend radar</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '12px' }}>Conversations rising around you</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {trends.map(t => (
              <div key={t.tag} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 500, flex: 1 }}>{t.tag}</span>
                <div style={{ width: '90px', height: '6px', borderRadius: '4px', background: 'var(--bg)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '4px', width: t.width, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#0f9b6c', width: '40px', textAlign: 'right' }}>{t.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live mention feed */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Live mention feed</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['All', 'Positive', 'Risk'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ fontSize: '11px', fontWeight: filter === f ? 600 : 500, color: filter === f ? 'var(--accent)' : 'var(--text-2)', background: filter === f ? 'var(--accent-soft)' : 'transparent', padding: '4px 10px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{f}</button>
            ))}
          </div>
        </div>
        {filteredFeed.map(f => (
          <div key={f.headline} style={{ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 0', borderTop: '1px solid var(--border)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--text-2)', flex: 'none' }}>{f.mono}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11.5px', color: 'var(--text-2)', fontWeight: 600, marginBottom: '1px' }}>{f.outlet} · {f.time}</div>
              <div style={{ fontSize: '13px', fontWeight: 500, lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.headline}</div>
            </div>
            <span style={{ flex: 'none', padding: '4px 9px', borderRadius: '7px', fontSize: '10.5px', fontWeight: 600, background: f.badgeBg, color: f.badgeText }}>{f.sentiment}</span>
            <button onClick={() => openDrawer('echo')} style={{ flex: 'none', height: '30px', padding: '0 12px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--accent)'; el.style.color = 'var(--accent)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text)' }}
            >{f.action}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
