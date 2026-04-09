import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import GoogleAdSense, { MediaNetScript } from '@/components/AdSense'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SBTI Personality Test - Explore Your Inner World',
  description: 'Discover your unique personality type with our comprehensive 30-question assessment. 27 personality types, 5 language support.',
  keywords: 'SBTI, personality test, psychology, self-discovery, MBTI alternative',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      {/* Google AdSense */}
      <GoogleAdSense />
      {/* Media.net */}
      <MediaNetScript />
      {children}
    </Providers>
  )
}