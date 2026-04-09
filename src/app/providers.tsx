'use client'

import { I18nProvider } from '@/lib/i18n'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div className="grid-background min-h-screen">
        {children}
      </div>
    </I18nProvider>
  )
}