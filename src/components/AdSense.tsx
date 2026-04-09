'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

// Google AdSense 发布商 ID
const ADSENSE_CLIENT_ID = 'ca-pub-9770495539213779'

// Media.net 配置 (申请后填入)
const MEDIA_NET_CID = 'CID_PLACEHOLDER'
const MEDIA_NET_CRID = 'CRID_PLACEHOLDER'

// Google AdSense 初始化
export default function GoogleAdSense() {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  )
}

// Media.net 初始化
export function MediaNetScript() {
  return (
    <Script
      id="media-net-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window._mNHandle = window._mNHandle || {};
          window._mNHandle.queue = window._mNHandle.queue || [];
        `
      }}
    />
  )
}

// ============ Google AdSense 广告组件 ============

export function AdSenseBanner({ slot, format = 'auto' }: {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
}) {
  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <Script id={`adsense-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}

export function AdSenseInFeed({ slot }: { slot: string }) {
  return (
    <div className="ad-infeed my-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
      <Script id={`adsense-infeed-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}

// ============ Media.net 广告组件 ============

export function MediaNetBanner({ size = '728x90' }: { size?: string }) {
  return (
    <div className="ad-container my-4">
      <div id={`medianet-${size.replace('x', '')}`}>
        <Script
          src={`https://contextual.media.net/dmedianet.js?cid=${MEDIA_NET_CID}&crid=${MEDIA_NET_CRID}&size=${size}`}
          strategy="afterInteractive"
        />
      </div>
    </div>
  )
}

export function MediaNetNative() {
  return (
    <div className="ad-infeed my-6">
      <div id="medianet-native">
        <Script
          src={`https://contextual.media.net/nmedianet.js?cid=${MEDIA_NET_CID}&crid=${MEDIA_NET_CRID}`}
          strategy="afterInteractive"
        />
      </div>
    </div>
  )
}

// ============ 智能广告组件（自动选择/同时展示）============

interface SmartAdProps {
  adsenseSlot?: string
  type: 'banner' | 'infeed' | 'sidebar'
  showMediaNet?: boolean
}

export function SmartAd({ adsenseSlot, type, showMediaNet = false }: SmartAdProps) {
  const [isEnglishUser, setIsEnglishUser] = useState(true)

  useEffect(() => {
    const locale = navigator.language || ''
    setIsEnglishUser(locale.startsWith('en'))
  }, [])

  return (
    <div className="smart-ad space-y-4">
      {/* 始终展示 Google AdSense */}
      {adsenseSlot && type === 'banner' && (
        <AdSenseBanner slot={adsenseSlot} />
      )}
      {adsenseSlot && type === 'infeed' && (
        <AdSenseInFeed slot={adsenseSlot} />
      )}
      
      {/* 英文用户额外展示 Media.net（收益更高） */}
      {showMediaNet && isEnglishUser && (
        <>
          {type === 'banner' && <MediaNetBanner />}
          {type === 'infeed' && <MediaNetNative />}
        </>
      )}
    </div>
  )
}

// 便捷导出
export const AdBanner = AdSenseBanner
export const AdInFeed = AdSenseInFeed
export const AdSidebar = AdSenseBanner