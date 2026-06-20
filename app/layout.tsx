import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Influence OS — AI Brand Intelligence',
  description: 'The AI brand intelligence layer that turns expertise into authority.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
