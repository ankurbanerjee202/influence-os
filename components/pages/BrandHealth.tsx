'use client'

import { useApp } from '../App'
import { AgentIcon } from '../AgentIcon'

function AgentBanner() {
  const { openDrawer } = useApp()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '13px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '14px', boxShadow: '0 1px 2px var(--shadow)', padding: '14px 18px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <AgentIcon id="luma" size={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>Powered by LUMA</div>
        <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '1px' }}>Brand health, risk detection & opportunity forecasting.</div>
      </div>
      <button onClick={() => openDrawer('luma')} style={{ display: 'inline-flex', alignItems: 'center', height: '34px', padding: '0 14px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Chat with LUMA</button>
    </div>
  )
}

export function BrandHealth() {
  const { openDrawer } = useApp()

  const stats = [
    { label: 'Reputation Risk', value: '12', delta: 'Low', deltaColor: '#0f9b6c', deltaBg: 'rgba(16,185,129,0.12)' },
    { label: 'Trend Prediction', value: 'High', delta: 'Accurate', deltaColor: '#0f9b6c', deltaBg: 'rgba(16,185,129,0.12)' },
    { label: 'Authority Growth', value: '+6/mo', delta: 'Rising', deltaColor: '#0f9b6c', deltaBg: 'rgba(16,185,129,0.12)' },
    { label: 'Market Momentum', value: '1.4×', delta: 'Strong', deltaColor: '#0f9b6c', deltaBg: 'rgba(16,185,129,0.12)' },
  ]

  const risks = [
    { title: 'Skeptical op-ed gaining traction', desc: '"Is AI coming for the PR agency?" — shared 40+ times. FLUENT can prep a measured response.', level: 'Watch', dot: '#f59e0b', lvlColor: '#c47d12', lvlBg: 'rgba(245,158,11,0.14)' },
    { title: 'Competitor narrative overlap', desc: 'A rival adopted "AI brand intelligence" language. NAVI suggests sharpening differentiation.', level: 'Low', dot: '#3b82f6', lvlColor: '#2f72e0', lvlBg: 'rgba(59,130,246,0.12)' },
    { title: 'Sentiment stable & positive', desc: 'No negative spikes detected across monitored platforms in 14 days.', level: 'Clear', dot: '#10b981', lvlColor: '#0f9b6c', lvlBg: 'rgba(16,185,129,0.12)' },
  ]

  const momentum = [
    { name: 'Influence OS', width: '88%', color: 'linear-gradient(90deg,var(--accent),var(--accent-2))', trend: '+14%', trendColor: '#0f9b6c' },
    { name: 'NarrativeAI', width: '62%', color: 'var(--border-strong)', trend: '+6%', trendColor: '#0f9b6c' },
    { name: 'PR Genie', width: '54%', color: 'var(--border-strong)', trend: '−3%', trendColor: '#e11d48' },
    { name: 'BrandPulse', width: '41%', color: 'var(--border-strong)', trend: '+2%', trendColor: '#0f9b6c' },
  ]

  const forecast = [
    { window: '~9 days', title: 'AI governance news cycle peaks', note: 'Prep a founder POV now' },
    { window: '~2 weeks', title: 'India SaaS funding season', note: 'Time your Series A push' },
    { window: 'Ongoing', title: 'Podcast guest demand rising', note: 'AURA found 5 relevant shows' },
    { window: '~3 weeks', title: 'Competitor narrative fatigue', note: 'Window to own the category' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AgentBanner />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '14px', boxShadow: '0 1px 2px var(--shadow)', padding: '15px 17px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--text-2)', fontWeight: 500 }}>{s.label}</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: s.deltaColor, background: s.deltaBg, padding: '2px 6px', borderRadius: '5px' }}>{s.delta}</span>
            </div>
            <div style={{ fontSize: '23px', fontWeight: 700, letterSpacing: '-0.02em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Reputation risk radar</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '8px' }}>Early-warning signals, ranked</div>
          {risks.map(r => (
            <div key={r.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: r.dot, marginTop: '4px', flex: 'none', display: 'inline-block' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600 }}>{r.title}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-2)', lineHeight: 1.45, marginTop: '2px' }}>{r.desc}</div>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 600, color: r.lvlColor, background: r.lvlBg, padding: '3px 8px', borderRadius: '6px', flex: 'none' }}>{r.level}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Competitive momentum</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '12px' }}>Who&apos;s gaining ground in your category</div>
          {momentum.map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 0' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 500, width: '130px', flex: 'none' }}>{m.name}</span>
              <div style={{ flex: 1, height: '8px', borderRadius: '5px', background: 'var(--bg)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '5px', width: m.width, background: m.color }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: m.trendColor, width: '46px', flex: 'none', textAlign: 'right' }}>{m.trend}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Opportunity forecast</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '12px' }}>Timing windows LUMA predicts will peak</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {forecast.map(f => (
              <div key={f.title} style={{ background: 'var(--panel-2)', border: '1px solid var(--border)', borderRadius: '11px', padding: '13px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.window}</div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, lineHeight: 1.4, marginTop: '5px' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-2)', marginTop: '4px' }}>{f.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', color: '#fff' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', marginBottom: '14px' }}>
            <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6" /><path d="M9 17h4" /></svg>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>Weekly executive brief</div>
          <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: '6px 0 16px', flex: 1 }}>
            LUMA compiles brand health, risks, competitor moves and your next 3 PR opportunities into a 2-minute read — every Monday.
          </div>
          <button onClick={() => openDrawer('luma')} style={{ height: '40px', border: 'none', borderRadius: '10px', background: '#fff', color: 'var(--ink)', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Generate this week&apos;s brief
          </button>
        </div>
      </section>
    </div>
  )
}
