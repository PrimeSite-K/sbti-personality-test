'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

type Locale = 'en' | 'zh' | 'hi' | 'ru' | 'ja'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

// 翻译数据缓存
const translations: Record<Locale, Record<string, any>> = {
  en: {},
  zh: {},
  hi: {},
  ru: {},
  ja: {}
}

// 加载翻译文件
async function loadTranslations(locale: Locale) {
  if (Object.keys(translations[locale]).length === 0) {
    try {
      const res = await fetch(`/locales/${locale}.json`)
      translations[locale] = await res.json()
    } catch (e) {
      console.error('Failed to load translations:', e)
    }
  }
  return translations[locale]
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [data, setData] = useState<Record<string, any>>({})

  useEffect(() => {
    // 从 localStorage 或浏览器语言初始化
    const saved = localStorage.getItem('sbti-locale') as Locale | null
    if (saved && ['en', 'zh', 'hi', 'ru', 'ja'].includes(saved)) {
      setLocaleState(saved)
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.split('-')[0]
      if (['en', 'zh', 'hi', 'ru', 'ja'].includes(browserLang)) {
        setLocaleState(browserLang as Locale)
      }
    }
  }, [])

  useEffect(() => {
    loadTranslations(locale).then(setData)
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('sbti-locale', newLocale)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: any = data
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // 返回 key 本身作为 fallback
      }
    }
    
    if (typeof value !== 'string') return key
    
    // 替换参数
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, name) => 
        String(params[name] ?? `{{${name}}}`)
      )
    }
    
    return value
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return context
}