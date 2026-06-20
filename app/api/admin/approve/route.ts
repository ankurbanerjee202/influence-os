import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendApprovalEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { userId, accessLevel } = await req.json()
  if (!userId || !['pending', 'sentiment', 'full'].includes(accessLevel)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const user = await db.user.update({
    where: { id: userId },
    data: {
      accessLevel,
      approvedAt: accessLevel !== 'pending' ? new Date() : null,
      approvedBy: accessLevel !== 'pending' ? session.user.email : null,
    },
  })

  if (accessLevel !== 'pending' && user.email) {
    await sendApprovalEmail({
      userName: user.name || 'there',
      userEmail: user.email,
      accessLevel,
    }).catch(console.error)
  }

  return NextResponse.json({ success: true, accessLevel })
}
