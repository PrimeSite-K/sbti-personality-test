import Script from 'next/script'

// 替换为你的 AdSense 发布商 ID
const ADSENSE_CLIENT_ID = 'ca-pub-XXXXXXXXXXXXXXXX'

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

// 广告组件 - 横幅广告
export function AdBanner({ slot, format = 'auto', responsive = true }: {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
}) {
  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      <Script id={`ad-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}

// 广告组件 - 信息流广告
export function AdInFeed({ slot }: { slot: string }) {
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
      <Script id={`ad-infeed-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}

// 广告组件 - 侧边栏广告
export function AdSidebar({ slot }: { slot: string }) {
  return (
    <div className="ad-sidebar sticky top-24">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="vertical"
        data-full-width-responsive="true"
      />
      <Script id={`ad-sidebar-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}