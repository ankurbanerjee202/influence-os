'use client'

import { useApp } from '../App'
import { AgentIcon } from '../AgentIcon'
import { AGENTS, TONE_STYLES } from '@/lib/data'

export function AgentMarketplace() {
  const { openDrawer, deployed, toggleDeploy } = useApp()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>Your AI brand team</div>
          <div style={{ fontSize: '13px', color: 'var(--text-2)', marginTop: '4px' }}>Six specialists. One connected intelligence layer. All working for you.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--text-2)' }}>{Object.values(deployed).filter(Boolean).length} of {AGENTS.length} active</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '9px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f9b6c' }}>Team online</span>
          </div>
        </div>
      </div>

      <div className="r-agents" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {AGENTS.map(agent => {
          const tone = TONE_STYLES[agent.statusTone]
          const isDeployed = deployed[agent.id]
          return (
            <div key={agent.id} style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '18px', boxShadow: '0 1px 3px var(--shadow)', padding: '22px', display: 'flex', flexDirection: 'column', gap: '0', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px var(--shadow)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px var(--shadow)')}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <AgentIcon id={agent.id} size={24} />
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: tone.pillText, background: tone.pillBg, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tone.dot, display: 'inline-block' }} />
                  {agent.status}
                </span>
              </div>

              <div style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em' }}>{agent.name}</div>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--accent)', marginTop: '1px', marginBottom: '6px' }}>{agent.role}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-2)', lineHeight: 1.5, marginBottom: '14px' }}>{agent.tagline}</div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {agent.caps.map(cap => (
                  <span key={cap} style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--text-2)', background: 'var(--panel-2)', border: '1px solid var(--border)', padding: '3px 9px', borderRadius: '6px' }}>{cap}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 12px', background: 'var(--panel-2)', border: '1px solid var(--border)', borderRadius: '9px', marginBottom: '14px' }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 7 7 17M7 7h10v10" /></svg>
                <span style={{ fontSize: '11.5px', color: 'var(--text-2)' }}>Replaces: <span style={{ fontWeight: 600, color: 'var(--text)' }}>{agent.replaces}</span></span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button
                  onClick={() => openDrawer(agent.id)}
                  style={{ flex: 1, height: '36px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
                >
                  Chat with {agent.name}
                </button>
                <button
                  onClick={() => toggleDeploy(agent.id)}
                  style={{ flex: 1, height: '36px', border: 'none', borderRadius: '9px', background: isDeployed ? 'var(--accent-soft)' : 'var(--ink)', color: isDeployed ? 'var(--accent)' : 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  {isDeployed ? 'Deployed ✓' : 'Deploy'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '4px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>How agents collaborate</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px' }}>Every agent shares brand context — strategy flows into PR, content and insight.</div>
          {[
            { from: 'NAVI', to: 'FLUENT', desc: 'Positioning feeds into every press release' },
            { from: 'ECHO', to: 'LUMA', desc: 'Live mentions fuel risk and health scores' },
            { from: 'AURA', to: 'IVY', desc: 'Drafts trigger automated repurposing' },
            { from: 'LUMA', to: 'FLUENT', desc: 'Risk alerts activate crisis messaging' },
          ].map(flow => (
            <div key={flow.from + flow.to} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--accent)', width: '48px', flex: 'none' }}>{flow.from}</span>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--accent)', width: '48px', flex: 'none' }}>{flow.to}</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-2)' }}>{flow.desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', color: '#fff' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', marginBottom: '14px' }}>
            <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>Deploy your full team</div>
          <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: '6px 0 16px', flex: 1 }}>
            All 6 agents are ready. Deploy them together and they immediately share context — strategy, PR, content and intelligence working as one system.
          </div>
          <button
            onClick={() => AGENTS.forEach(a => { if (!deployed[a.id]) toggleDeploy(a.id) })}
            style={{ height: '40px', border: 'none', borderRadius: '10px', background: '#fff', color: 'var(--ink)', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            Deploy all agents
          </button>
        </div>
      </div>
    </div>
  )
}
