import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { triggerResearch } from '@/lib/research'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { linkedin, twitter, instagram } = await req.json()
  const userId = session.user.id

  // Save social handles
  const platforms = [
    { platform: 'linkedin', handle: linkedin },
    { platform: 'twitter', handle: twitter },
    { platform: 'instagram', handle: instagram },
  ]

  for (const { platform, handle } of platforms) {
    if (handle?.trim()) {
      await db.socialHandle.upsert({
        where: { userId_platform: { userId, platform } },
        create: { userId, platform, handle: handle.trim().replace('@', '') },
        update: { handle: handle.trim().replace('@', '') },
      })
    }
  }

  // Mark user as onboarded
  await db.user.update({ where: { id: userId }, data: { onboarded: true } })

  // Trigger research in background (fire and forget)
  triggerResearch(userId).catch(console.error)

  return NextResponse.json({ success: true })
}
