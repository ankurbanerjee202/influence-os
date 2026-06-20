import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
      role: string
      accessLevel: string
      onboarded: boolean
    }
  }
  interface User {
    role: string
    accessLevel: string
    onboarded: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    accessLevel: string
    onboarded: boolean
  }
}
