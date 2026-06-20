'use client'

import { useApp } from '../App'
import { AgentIcon } from '../AgentIcon'

function AgentBanner({ agentId, name, tagline }: { agentId: 'fluent' | 'navi' | 'echo' | 'aura' | 'ivy' | 'luma'; name: string; tagline: string }) {
  const { openDrawer } = useApp()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '13px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '14px', boxShadow: '0 1px 2px var(--shadow)', padding: '14px 18px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <AgentIcon id={agentId} size={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>Powered by {name}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '1px' }}>{tagline}</div>
      </div>
      <button onClick={() => openDrawer(agentId)} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 14px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}
      >Chat with {name}</button>
    </div>
  )
}

export function ContentStudio() {
  const { openDrawer } = useApp()

  const stats = [
    { label: 'Authority Score', value: '78', delta: '+6' },
    { label: 'Content Velocity', value: '5.2×', delta: '+40%' },
    { label: 'Visibility Momentum', value: '+34%', delta: 'Up' },
    { label: 'Posts Scheduled', value: '24', delta: '+8' },
  ]

  const calPlatformColors: Record<string, string> = { LinkedIn: '#0a66c2', X: '#111827', Newsletter: '#7c3aed', Reel: '#ef4444' }
  const calendar = [
    { day: 'Mon', posts: [{ platform: 'LinkedIn', title: 'Why founders must own their narrative', status: 'Scheduled', statusColor: '#0f9b6c' }] },
    { day: 'Tue', posts: [{ platform: 'X', title: 'Thread: 5 PR myths every founder believes', status: 'Drafting', statusColor: '#c47d12' }] },
    { day: 'Wed', posts: [{ platform: 'LinkedIn', title: 'The agency model is breaking', status: 'Scheduled', statusColor: '#0f9b6c' }, { platform: 'Newsletter', title: 'Weekly brand insight', status: 'Drafting', statusColor: '#c47d12' }] },
    { day: 'Thu', posts: [{ platform: 'Reel', title: '60s: build authority in public', status: 'Idea', statusColor: 'var(--text-3)' }] },
    { day: 'Fri', posts: [{ platform: 'LinkedIn', title: 'Behind our Series A: what nobody talks about', status: 'Scheduled', statusColor: '#0f9b6c' }] },
  ]

  const tlPillars = [
    { pct: '38%', title: 'Founder-led growth', note: 'Your core authority theme' },
    { pct: '27%', title: 'Future of PR & AI', note: 'Category POV' },
    { pct: '20%', title: 'Building in public', note: 'Trust & transparency' },
    { pct: '15%', title: 'Leadership & hiring', note: 'Human angle' },
  ]

  const repurpose = [
    { fmt: 'LinkedIn post', count: 'Ready' },
    { fmt: 'X thread', count: '8 tweets' },
    { fmt: 'Newsletter', count: '1 section' },
    { fmt: 'Carousel', count: '6 slides' },
    { fmt: 'Reel script', count: '45s' },
    { fmt: 'Blog section', count: '600 words' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AgentBanner agentId="aura" name="AURA + IVY" tagline="Thought leadership in your voice, repurposed & scheduled automatically." />

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

      {/* Content Calendar */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>This week&apos;s content calendar</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginTop: '2px' }}>AURA drafts in your voice · IVY schedules across platforms</div>
          </div>
          <button onClick={() => openDrawer('aura')} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', height: '36px', padding: '0 14px', border: 'none', borderRadius: '9px', background: 'var(--ink)', color: 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Generate week with AURA</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {calendar.map(d => (
            <div key={d.day} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '2px' }}>{d.day}</div>
              {d.posts.map((p, i) => (
                <div key={i} style={{ background: 'var(--panel-2)', border: '1px solid var(--border)', borderLeft: `3px solid ${calPlatformColors[p.platform] || 'var(--accent)'}`, borderRadius: '9px', padding: '10px 11px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-2)' }}>{p.platform}</span>
                  </div>
                  <div style={{ fontSize: '11.5px', fontWeight: 500, lineHeight: 1.4, color: 'var(--text)' }}>{p.title}</div>
                  <div style={{ fontSize: '10px', color: p.statusColor, fontWeight: 600, marginTop: '6px' }}>{p.status}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Thought leadership pillars</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '12px' }}>Your authority is built on these themes — by AURA</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tlPillars.map(p => (
              <div key={p.title} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 13px', background: 'var(--panel-2)', border: '1px solid var(--border)', borderRadius: '11px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 700, flex: 'none' }}>{p.pct}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-2)' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>1 → 10 Repurpose engine</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '10px' }}>IVY turns one asset into a full multi-platform set</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--ink)', borderRadius: '11px', margin: '0 0 14px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#fff' }}>&ldquo;Why founders must own their narrative&rdquo;</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Source · long-form LinkedIn essay</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px' }}>
            {repurpose.map(r => (
              <div key={r.fmt} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 11px', background: 'var(--panel-2)', border: '1px solid var(--border)', borderRadius: '9px' }}>
                <AgentIcon id="ivy" size={15} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600 }}>{r.fmt}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>{r.count}</div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => openDrawer('ivy')} style={{ width: '100%', marginTop: '14px', height: '38px', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}
          >Schedule all with IVY</button>
        </div>
      </section>
    </div>
  )
}
