import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { AGENTS } from '@/lib/data'

export async function POST(req: NextRequest) {
  const { agentId, messages } = await req.json()

  const agent = AGENTS.find(a => a.id === agentId)
  if (!agent) return NextResponse.json({ error: 'Unknown agent' }, { status: 400 })

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 })
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const systemPrompt = `You are ${agent.name}, an AI specialist agent inside Influence OS — an AI brand intelligence platform for growth-stage founders and communication leaders.

Your role: ${agent.role}
Your specialty: ${agent.tagline}
What you replace: ${agent.replaces}
Your capabilities: ${agent.caps.join(', ')}
Current activity: ${agent.activity}

Respond as ${agent.name} — stay in character, be concise (2–4 sentences), specific, and actionable. You have deep expertise in ${agent.role.toLowerCase()}. Refer to other agents (FLUENT, NAVI, ECHO, AURA, IVY, LUMA) when relevant to show the connected system. Never break character or mention that you're an AI language model.`

  const openaiMessages = messages.map((m: { role: string; text: string }) => ({
    role: m.role === 'agent' ? 'assistant' : 'user',
    content: m.text,
  }))

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      ...openaiMessages,
    ],
    max_tokens: 200,
    temperature: 0.7,
  })

  const reply = completion.choices[0]?.message?.content ?? 'Something went wrong — try again.'
  return NextResponse.json({ reply })
}
