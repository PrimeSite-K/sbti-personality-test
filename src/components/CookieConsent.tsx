'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // 检查用户是否已同意Cookie
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-700/95 backdrop-blur-xl border-t border-primary-700/30 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* 左侧文字 */}
          <div className="flex-1 text-sm text-gray-300">
            <p>
              🍪 We use cookies to enhance your experience and display personalized ads via Google AdSense. 
              By continuing to use this site, you agree to our{' '}
              <Link href="/privacy" className="text-cyan-400 hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-cyan-400 hover:underline">
                Terms of Service
              </Link>.
            </p>
          </div>

          {/* 右侧按钮 */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white transition-colors"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}