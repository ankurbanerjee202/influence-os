import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const users = await db.user.findMany({
    where: { role: { not: 'admin' } },
    include: {
      socialHandles: true,
      brandProfile: { select: { companyName: true, industry: true, sentimentScore: true, healthScore: true, researchedAt: true } },
      accounts: { select: { provider: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ users })
}
