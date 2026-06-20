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
      <button
        onClick={() => openDrawer(agentId)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 14px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}
      >
        Chat with {name}
      </button>
    </div>
  )
}

export function BrandStrategy() {
  const { openDrawer } = useApp()

  const stats = [
    { label: 'Messaging Clarity', value: '86', delta: '+7' },
    { label: 'Differentiation', value: '79', delta: '+5' },
    { label: 'Internal Consistency', value: '91', delta: '+3' },
    { label: 'Narrative Overlap', value: '22%', delta: '−6' },
  ]

  const pillars = [
    { title: 'Intelligence over output', desc: 'Not an AI writer — a full brand intelligence system that thinks strategically.' },
    { title: 'Founder-led authority', desc: 'Built for leaders who turn expertise into market influence, not generic content.' },
    { title: 'One connected network', desc: 'Six agents that share context — strategy flows into PR, content and insight.' },
  ]

  const personas = [
    { initials: 'GF', name: 'Growth-stage Founder', desc: 'Series A–C. Needs visibility & narrative control without hiring an agency.', c1: '#6366f1', c2: '#a855f7' },
    { initials: 'CX', name: 'CXO / Comms Lead', desc: 'Wants executive-grade messaging delivered fast and consistently.', c1: '#0ea5e9', c2: '#6366f1' },
    { initials: 'AG', name: 'Boutique Agency', desc: 'Scales client delivery with white-label AI across many brands.', c1: '#f59e0b', c2: '#ef4444' },
  ]

  const competitors = [
    { name: 'Legacy PR agency', width: '42%', color: 'var(--border-strong)', note: 'High cost' },
    { name: 'AI writing tools', width: '30%', color: 'var(--border-strong)', note: 'Shallow' },
    { name: 'Social listening', width: '48%', color: 'var(--border-strong)', note: 'No strategy' },
    { name: 'Influence OS', width: '88%', color: 'linear-gradient(90deg,var(--accent),var(--accent-2))', note: 'White-space' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AgentBanner agentId="navi" name="NAVI" tagline="Your AI brand strategist — positioning, messaging & differentiation." />

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

      <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '10px' }}>Positioning statement</div>
          <div style={{ fontSize: '18px', fontWeight: 500, lineHeight: 1.55, letterSpacing: '-0.01em' }}>
            For <b style={{ fontWeight: 600 }}>growth-stage founders</b> who refuse to be invisible, Influence OS is the <b style={{ fontWeight: 600 }}>AI brand intelligence layer</b> that turns expertise into authority — owning the <span style={{ color: 'var(--accent)', fontWeight: 600 }}>&ldquo;founder-led intelligence&rdquo;</span> category that legacy agencies can&apos;t.
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '18px', flexWrap: 'wrap' }}>
            <button onClick={() => openDrawer('navi')} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', height: '36px', padding: '0 14px', border: 'none', borderRadius: '9px', background: 'var(--ink)', color: 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Refine with NAVI</button>
            <button style={{ height: '36px', padding: '0 14px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Export brief</button>
          </div>
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Messaging pillars</div>
          {pillars.map(p => (
            <div key={p.title} style={{ padding: '12px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '2px', background: 'var(--accent)', display: 'inline-block' }} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{p.title}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.45, paddingLeft: '14px' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Audience personas</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '6px' }}>Built with brand context, not templates</div>
          {personas.map(p => (
            <div key={p.name} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `linear-gradient(135deg, ${p.c1}, ${p.c2})`, display: 'grid', placeItems: 'center', color: '#fff', fontSize: '13px', fontWeight: 600, flex: 'none' }}>{p.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-2)', lineHeight: 1.45, marginTop: '2px' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Competitive white-space</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '10px' }}>Narrative territory ownership</div>
          {competitors.map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 0' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 500, width: '120px', flex: 'none' }}>{c.name}</span>
              <div style={{ flex: 1, height: '8px', borderRadius: '5px', background: 'var(--bg)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '5px', width: c.width, background: c.color }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-3)', width: '78px', flex: 'none', textAlign: 'right' }}>{c.note}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
