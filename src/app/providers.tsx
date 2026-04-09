'use client'

import { I18nProvider } from '@/lib/i18n'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <I18nProvider>
      <html lang="en">
        <body className="min-h-screen bg-dark-500 text-white">
          <div className="grid-background min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </I18nProvider>
  )
}