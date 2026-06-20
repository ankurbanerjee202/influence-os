import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { AGENTS } from '@/lib/data'

export async function POST(req: NextRequest) {
  const { agentId, messages } = await req.json()

  const agent = AGENTS.find(a => a.id === agentId)
  if (!agent) return NextResponse.json({ error: 'Unknown agent' }, { status: 400 })

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const systemPrompt = `You are ${agent.name}, an AI specialist agent inside Influence OS — an AI brand intelligence platform for growth-stage founders and communication leaders.

Your role: ${agent.role}
Your specialty: ${agent.tagline}
What you replace: ${agent.replaces}
Your capabilities: ${agent.caps.join(', ')}
Current activity: ${agent.activity}

Respond as ${agent.name} — stay in character, be concise (2–4 sentences), specific, and actionable. You have deep expertise in ${agent.role.toLowerCase()}. Refer to other agents (FLUENT, NAVI, ECHO, AURA, IVY, LUMA) when relevant to show the connected system. Never break character or mention that you're an AI language model.`

  // Build conversation history for Gemini (all messages except the last user one)
  const history = messages.slice(0, -1).map((m: { role: string; text: string }) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }))

  const lastMessage = messages[messages.length - 1]

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: { systemInstruction: systemPrompt },
      history,
    })

    const result = await chat.sendMessage({ message: lastMessage.text })
    const reply = result.text ?? 'Something went wrong — try again.'
    return NextResponse.json({ reply })
  } catch (err: unknown) {
    const status = (err as { status?: number }).status ?? 500
    const message = (err as { message?: string }).message ?? 'Gemini error'
    const friendly =
      status === 429 ? 'Rate limit hit — please try again in a moment.' :
      status === 401 || status === 403 ? 'Invalid Gemini API key — check your Vercel environment variables.' :
      message
    return NextResponse.json({ error: friendly }, { status })
  }
}
