import { GoogleGenAI } from '@google/genai'
import { db } from './db'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function triggerResearch(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { socialHandles: true },
  })
  if (!user) return null

  const handles: Record<string, string> = {}
  for (const h of user.socialHandles) {
    if (h.handle) handles[h.platform] = h.handle
  }

  const prompt = `You are a brand intelligence analyst. Based on this professional's information, generate a realistic brand profile.

Name: ${user.name || 'Unknown'}
Email domain: ${user.email?.split('@')[1] || 'unknown'}
${handles.linkedin ? `LinkedIn: ${handles.linkedin}` : ''}
${handles.twitter ? `X/Twitter: @${handles.twitter}` : ''}
${handles.instagram ? `Instagram: @${handles.instagram}` : ''}

Return ONLY valid JSON (no markdown, no code block) with exactly these fields:
{
  "companyName": "inferred personal brand or company name",
  "industry": "primary industry (e.g. AI & SaaS, FinTech, Media)",
  "description": "one compelling sentence about their brand (20-30 words)",
  "stage": "career stage (e.g. Founder, Series A, Enterprise, Consultant)",
  "website": "inferred website if obvious, else empty string",
  "location": "inferred city/country if obvious, else empty string",
  "sentimentScore": number between 68 and 92,
  "healthScore": number between 62 and 88,
  "mentionVolume": integer between 120 and 2400,
  "keyStrengths": ["strength 1", "strength 2", "strength 3"],
  "opportunities": ["opportunity 1", "opportunity 2"],
  "riskLevel": "low"
}`

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    const raw = response.text?.trim() || '{}'
    const data = JSON.parse(raw)

    await db.brandProfile.upsert({
      where: { userId },
      create: {
        userId,
        companyName: data.companyName,
        industry: data.industry,
        description: data.description,
        stage: data.stage,
        website: data.website,
        location: data.location,
        sentimentScore: data.sentimentScore,
        healthScore: data.healthScore,
        mentionVolume: data.mentionVolume,
        researchData: data,
        researchedAt: new Date(),
      },
      update: {
        companyName: data.companyName,
        industry: data.industry,
        description: data.description,
        stage: data.stage,
        website: data.website,
        location: data.location,
        sentimentScore: data.sentimentScore,
        healthScore: data.healthScore,
        mentionVolume: data.mentionVolume,
        researchData: data,
        researchedAt: new Date(),
      },
    })

    return data
  } catch (err) {
    console.error('Research failed:', err)
    return null
  }
}
