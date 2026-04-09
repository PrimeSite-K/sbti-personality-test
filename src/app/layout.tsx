import Providers from './providers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SBTI Personality Test - Explore Your Inner World',
  description: 'Discover your unique personality type with our comprehensive 30-question assessment. 27 personality types, 5 language support.',
  keywords: 'SBTI, personality test, psychology, self-discovery, MBTI alternative',
  other: {
    'google-adsense-account': 'ca-pub-9770495539213779',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9770495539213779"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-dark-500 text-white antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}