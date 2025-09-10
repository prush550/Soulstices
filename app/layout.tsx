import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'

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
        {/* Wrap client-only context in a client component */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
