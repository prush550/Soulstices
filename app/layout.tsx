import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import SharedHeader from '@/components/SharedHeader'

export const metadata: Metadata = {
  title: 'Soulstices',
  description: 'A peer support community helping people navigate their Soulstices with connection and compassion.',
  generator: 'v0.dev',
  keywords: ['mental health', 'peer support', 'community', 'wellness', 'personal growth'],
  authors: [{ name: 'Soulstices Team' }],
  openGraph: {
    title: 'Soulstices',
    description: 'A peer support community helping people navigate their Soulstices with connection and compassion.',
    type: 'website',
    url: 'https://soulstices.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soulstices',
    description: 'A peer support community helping people navigate their Soulstices with connection and compassion.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
     <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <SharedHeader />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}