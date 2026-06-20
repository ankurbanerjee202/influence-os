import { Resend } from 'resend'

const ADMIN_EMAIL = 'ankur.banerjee202@gmail.com'
const APP_URL = process.env.NEXTAUTH_URL || 'https://influence-os.vercel.app'
const FROM = 'Influence OS <onboarding@resend.dev>'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendAdminNotification({
  userName,
  userEmail,
}: {
  userName: string
  userEmail: string
}) {
  if (!process.env.RESEND_API_KEY) return

  await getResend().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New signup: ${userName} wants access to Influence OS`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #111;">New Influence OS Signup</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:8px 0; color:#666;">Name</td><td style="padding:8px 0; font-weight:600;">${userName}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Email</td><td style="padding:8px 0; font-weight:600;">${userEmail}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Time</td><td style="padding:8px 0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Dubai' })} GST</td></tr>
        </table>
        <br/>
        <a href="${APP_URL}/admin" style="display:inline-block;padding:12px 24px;background:#111;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
          Review in Admin Panel →
        </a>
        <p style="color:#999;font-size:12px;margin-top:24px;">This is an automated notification from Influence OS.</p>
      </div>
    `,
  })
}

export async function sendApprovalEmail({
  userName,
  userEmail,
  accessLevel,
}: {
  userName: string
  userEmail: string
  accessLevel: string
}) {
  if (!process.env.RESEND_API_KEY) return

  const isFull = accessLevel === 'full'

  await getResend().emails.send({
    from: FROM,
    to: userEmail,
    subject: `Your Influence OS access is ${isFull ? 'fully activated' : 'ready'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #111;">Welcome to Influence OS${isFull ? ' — Full Access' : ''}</h2>
        <p>Hi ${userName},</p>
        ${
          isFull
            ? `<p>Your account has been approved for <strong>full access</strong>. You can now use all 6 AI agents to build and manage your brand intelligence.</p>`
            : `<p>Your account is now active. You can view your brand sentiment and health data. Full agent access is pending admin approval.</p>`
        }
        <br/>
        <a href="${APP_URL}" style="display:inline-block;padding:12px 24px;background:#111;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
          Open Influence OS →
        </a>
        <p style="color:#999;font-size:12px;margin-top:24px;">Influence OS — AI Brand Intelligence</p>
      </div>
    `,
  })
}
