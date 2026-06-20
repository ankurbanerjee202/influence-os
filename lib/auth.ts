import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { db } from './db'
import { sendAdminNotification } from './email'

const ADMIN_EMAIL = 'ankur.banerjee202@gmail.com'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    ...(process.env.LINKEDIN_CLIENT_ID
      ? [
          LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
            authorization: {
              params: { scope: 'openid profile email' },
            },
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.accessLevel = user.accessLevel
        token.onboarded = user.onboarded
      }
      // Refresh from DB on explicit session update (e.g. after admin approves)
      if (trigger === 'update' && token.id) {
        const fresh = await db.user.findUnique({ where: { id: token.id as string } })
        if (fresh) {
          token.role = fresh.role
          token.accessLevel = fresh.accessLevel
          token.onboarded = fresh.onboarded
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          accessLevel: token.accessLevel as string,
          onboarded: token.onboarded as boolean,
        },
      }
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email === ADMIN_EMAIL) {
        await db.user.update({
          where: { email: ADMIN_EMAIL },
          data: { role: 'admin', accessLevel: 'full', onboarded: true },
        })
      } else {
        await sendAdminNotification({
          userName: user.name || 'Unknown',
          userEmail: user.email || 'Unknown',
        }).catch(console.error)
      }
    },
  },
}
