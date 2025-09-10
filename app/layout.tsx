// app/layout.tsx
import './globals.css'
import { SessionProvider } from "next-auth/react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soulstices',
  description: 'Created by People for People',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.jpeg" />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
