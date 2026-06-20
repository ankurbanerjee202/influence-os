'use client'

import { useState } from 'react'
import { useApp } from '../App'

export function Settings() {
  const { theme, toggleTheme } = useApp()
  const [voiceTags, setVoiceTags] = useState(['Direct', 'Confident', 'Strategic', 'Founder-led', 'No-fluff'])
  const [newTag, setNewTag] = useState('')

  const platforms = [
    { name: 'LinkedIn', handle: '@elena-marsh', connected: true, color: '#0a66c2' },
    { name: 'X (Twitter)', handle: '@elenamarsh', connected: true, color: '#111827' },
    { name: 'Newsletter', handle: 'elenamarsh.substack.com', connected: true, color: '#7c3aed' },
    { name: 'Instagram', handle: 'Not connected', connected: false, color: '#e11d48' },
  ]

  const addTag = () => {
    const t = newTag.trim()
    if (t && !voiceTags.includes(t)) setVoiceTags(prev => [...prev, t])
    setNewTag('')
  }

  const removeTag = (tag: string) => setVoiceTags(prev => prev.filter(t => t !== tag))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>Settings</div>
        <div style={{ fontSize: '13px', color: 'var(--text-2)', marginTop: '4px' }}>Manage your brand profile, voice & platform connections.</div>
      </div>

      {/* Brand Profile */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Brand profile</div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '18px' }}>Used by all 6 agents to stay consistent with your brand voice and context.</div>
        <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            { label: 'Company name', value: 'Influence OS', placeholder: 'Your company name' },
            { label: 'Founder / CEO name', value: 'Elena Marsh', placeholder: 'Your name' },
            { label: 'Industry', value: 'AI & SaaS', placeholder: 'e.g. FinTech, Health, SaaS' },
            { label: 'Stage', value: 'Series A', placeholder: 'e.g. Seed, Series A, Growth' },
            { label: 'Website', value: 'influenceos.ai', placeholder: 'yourdomain.com' },
            { label: 'HQ / Region', value: 'Dubai, UAE', placeholder: 'City, Country' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: '6px' }}>{f.label}</label>
              <input
                defaultValue={f.value}
                placeholder={f.placeholder}
                style={{ width: '100%', height: '38px', padding: '0 12px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel-2)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '13px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: '6px' }}>One-line brand description</label>
            <input
              defaultValue="AI brand intelligence platform for growth-stage founders."
              style={{ width: '100%', height: '38px', padding: '0 12px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel-2)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '13px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button style={{ height: '36px', padding: '0 18px', border: 'none', borderRadius: '9px', background: 'var(--ink)', color: 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Save profile</button>
        </div>
      </div>

      <section className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        {/* Voice & Tone */}
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Voice & tone</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px' }}>Tag words that describe how you communicate. AURA and FLUENT use these to match your style.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '14px' }}>
            {voiceTags.map(tag => (
              <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--accent)', background: 'var(--accent-soft)', padding: '5px 10px', borderRadius: '7px', cursor: 'default' }}>
                {tag}
                <button onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', padding: 0, lineHeight: 1, fontSize: '14px', opacity: 0.7 }}>×</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTag()}
              placeholder="Add a tone word…"
              style={{ flex: 1, height: '36px', padding: '0 12px', border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--panel-2)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '12.5px', outline: 'none', transition: 'border-color 0.15s' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <button onClick={addTag} style={{ height: '36px', padding: '0 14px', border: 'none', borderRadius: '9px', background: 'var(--ink)', color: 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Add</button>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Tone presets</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['Executive', 'Thought leader', 'Startup energy', 'Technical expert'].map(preset => (
                <button key={preset} onClick={() => { if (!voiceTags.includes(preset)) setVoiceTags(prev => [...prev, preset]) }} style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-2)', background: 'var(--panel-2)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  + {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Connected Platforms */}
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Connected platforms</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px' }}>IVY publishes to connected channels. Manage access here.</div>
          {platforms.map(p => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: p.connected ? p.color : 'var(--panel-2)', border: p.connected ? 'none' : '1px solid var(--border)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: p.connected ? '#fff' : 'var(--text-3)' }}>{p.name[0]}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: '11.5px', color: p.connected ? 'var(--text-2)' : 'var(--text-3)', marginTop: '1px' }}>{p.handle}</div>
              </div>
              <button style={{ height: '30px', padding: '0 12px', border: '1px solid var(--border)', borderRadius: '7px', background: p.connected ? 'var(--panel-2)' : 'var(--ink)', color: p.connected ? 'var(--text-2)' : 'var(--ink-fg)', fontFamily: 'inherit', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>
                {p.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Appearance + Notifications */}
      <section className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '14px' }}>Appearance</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Dark mode</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-2)', marginTop: '2px' }}>Switch between light and dark interface</div>
            </div>
            <button onClick={toggleTheme} style={{ width: '44px', height: '26px', borderRadius: '13px', border: 'none', background: theme === 'dark' ? 'var(--accent)' : 'var(--border-strong)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: '3px', left: theme === 'dark' ? '21px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', display: 'block' }} />
            </button>
          </div>
          {[
            { label: 'Compact sidebar', desc: 'Collapse sidebar labels to icons only' },
            { label: 'Show agent activity', desc: 'Display real-time status in the agent rail' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-2)', marginTop: '2px' }}>{item.desc}</div>
              </div>
              <div style={{ width: '44px', height: '26px', borderRadius: '13px', background: 'var(--accent)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                <span style={{ position: 'absolute', top: '3px', left: '21px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', display: 'block' }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '14px' }}>Notifications</div>
          {[
            { label: 'Brand health alerts', desc: 'Notify when risk level changes', on: true },
            { label: 'Mention spikes', desc: 'Alert when mentions surge 20%+', on: true },
            { label: 'Weekly executive brief', desc: 'LUMA sends a brief every Monday', on: true },
            { label: 'Agent task completions', desc: 'Notify when an agent finishes a task', on: false },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-2)', marginTop: '2px' }}>{item.desc}</div>
              </div>
              <div style={{ width: '44px', height: '26px', borderRadius: '13px', background: item.on ? 'var(--accent)' : 'var(--border-strong)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                <span style={{ position: 'absolute', top: '3px', left: item.on ? '21px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', display: 'block' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 1px 2px var(--shadow)', padding: '22px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#e11d48', marginBottom: '12px' }}>Account</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Elena Marsh</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-2)', marginTop: '2px' }}>Founder & CEO · PRO plan · ankur.banerjee202@gmail.com</div>
          </div>
          <button style={{ height: '34px', padding: '0 14px', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '9px', background: 'transparent', color: '#e11d48', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Sign out</button>
        </div>
      </div>
    </div>
  )
}
