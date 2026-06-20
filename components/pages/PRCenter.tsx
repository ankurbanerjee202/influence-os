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

export function PRCenter() {
  const { openDrawer, crisis, toggleCrisis } = useApp()

  const stats = [
    { label: 'PR Output Velocity', value: '8.4×', delta: '+40%' },
    { label: 'Consistency Score', value: '94', delta: '+8' },
    { label: 'Tone Accuracy', value: '91%', delta: '+3' },
    { label: 'Response Time', value: '−87%', delta: 'Faster' },
  ]

  const TAG = {
    Drafting: { tagBg: 'rgba(245,158,11,0.14)', tagColor: '#c47d12' },
    Review: { tagBg: 'rgba(59,130,246,0.13)', tagColor: '#2f72e0' },
    Ready: { tagBg: 'rgba(16,185,129,0.13)', tagColor: '#0f9b6c' },
    Live: { tagBg: 'var(--accent-soft)', tagColor: 'var(--accent)' },
  } as Record<string, { tagBg: string; tagColor: string }>

  const pipeline = [
    { stage: 'Drafting', items: [{ title: 'Product launch — v2 platform', tag: 'Drafting' }, { title: 'Partnership: regional media', tag: 'Drafting' }] },
    { stage: 'In Review', items: [{ title: 'Series A — $14M announcement', tag: 'Review' }, { title: 'Founder op-ed: AI & PR', tag: 'Review' }] },
    { stage: 'Ready', items: [{ title: 'Hiring: VP Engineering', tag: 'Ready' }] },
    { stage: 'Published', items: [{ title: 'UAE market expansion', tag: 'Live' }, { title: 'Award: Top 10 SaaS', tag: 'Live' }] },
  ]

  const tools = [
    { title: 'Press Release Composer', desc: 'Launches, funding, partnerships — any format.' },
    { title: 'PR Pitch Engine', desc: 'Personalized, journalist-specific outreach.' },
    { title: 'Messaging Library', desc: 'Talking points, FAQs & approved quotes.' },
    { title: 'Stakeholder Notes', desc: 'Investor, customer & internal updates.' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AgentBanner agentId="fluent" name="FLUENT" tagline="Your AI communication strategist — press, pitches & crisis." />

      {crisis && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '14px', padding: '14px 18px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(244,63,94,0.15)', color: '#e11d48', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#e11d48' }}>Crisis Mode active</div>
            <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '1px' }}>FLUENT is generating risk-sensitive holding statements and stakeholder messaging. ECHO is watching sentiment in real time.</div>
          </div>
          <button onClick={toggleCrisis} style={{ height: '34px', padding: '0 14px', border: '1px solid rgba(244,63,94,0.4)', borderRadius: '9px', background: 'transparent', color: '#e11d48', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Stand down</button>
        </div>
      )}

      <div className="r-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
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

      {/* PR Pipeline */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>PR pipeline</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginTop: '2px' }}>Every asset drafted by FLUENT, ready for your review</div>
          </div>
          <button onClick={() => openDrawer('fluent')} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', height: '36px', padding: '0 14px', border: 'none', borderRadius: '9px', background: 'var(--ink)', color: 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            New press asset
          </button>
        </div>
        <div className="r-pipeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {pipeline.map(col => (
            <div key={col.stage} style={{ background: 'var(--panel-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-2)' }}>{col.stage}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-3)', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '20px', minWidth: '20px', textAlign: 'center', padding: '1px 6px' }}>{col.items.length}</span>
              </div>
              {col.items.map(it => (
                <div key={it.title} style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '9px', padding: '10px 11px', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.35, marginBottom: '6px' }}>{it.title}</div>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: TAG[it.tag].tagColor, background: TAG[it.tag].tagBg, padding: '2px 7px', borderRadius: '5px' }}>{it.tag}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tools + Crisis */}
      <section className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Communication tools</div>
          <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {tools.map(t => (
              <button key={t.title} onClick={() => openDrawer('fluent')} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px', textAlign: 'left', padding: '14px', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--panel-2)', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <AgentIcon id="fluent" size={17} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{t.title}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-2)', lineHeight: 1.4, marginTop: '2px' }}>{t.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(160deg, rgba(244,63,94,0.06), var(--panel) 60%)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(244,63,94,0.13)', color: '#e11d48', display: 'grid', placeItems: 'center', marginBottom: '12px' }}>
            <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 11 2 2 4-4" /></svg>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Crisis Mode</div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-2)', lineHeight: 1.5, margin: '6px 0 16px', flex: 1 }}>
            Activate to instantly generate holding statements, leadership notes and risk-minimized language — with ECHO monitoring sentiment live.
          </div>
          <button
            onClick={toggleCrisis}
            style={{ height: '40px', border: crisis ? '1px solid var(--border)' : 'none', borderRadius: '10px', background: crisis ? 'var(--panel)' : '#e11d48', color: crisis ? 'var(--text)' : '#fff', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' } as React.CSSProperties}
          >
            {crisis ? 'Deactivate Crisis Mode' : 'Activate Crisis Mode'}
          </button>
        </div>
      </section>
    </div>
  )
}
