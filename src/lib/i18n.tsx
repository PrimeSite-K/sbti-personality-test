'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

type Locale = 'en' | 'zh' | 'hi' | 'ru' | 'ja'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

// 内置翻译数据
const translations: Record<Locale, Record<string, any>> = {
  en: {
    meta: { name: "English", nativeName: "English", code: "en" },
    ui: {
      title: "SBTI Personality Test",
      subtitle: "Explore Your Inner World",
      startTest: "Start Test",
      nextQuestion: "Next",
      prevQuestion: "Previous",
      viewResult: "View Result",
      retake: "Retake Test",
      share: "Share Result",
      dimensions: "Dimension Analysis",
      yourType: "Your Personality Type",
      description: "Description",
      progress: "Progress",
      question: "Question {{current}} of {{total}}"
    },
    dimensions: {
      S: { name: "Self", description: "Self-perception and self-worth" },
      S1: { name: "Self-Worth", description: "Evaluation of self-value" },
      S2: { name: "Self-Awareness", description: "Understanding of true self" },
      S3: { name: "Self-Drive", description: "Internal drive vs external validation" },
      E: { name: "Emotion", description: "Emotional expression and attachment" },
      E1: { name: "Security", description: "Sense of security in relationships" },
      E2: { name: "Emotional Investment", description: "Depth of emotional commitment" },
      E3: { name: "Personal Space", description: "Need for personal space" },
      A: { name: "Attitude", description: "Basic attitude toward the world" },
      A1: { name: "Trust", description: "Trust in others' goodwill" },
      A2: { name: "Conformity", description: "Following rules vs breaking norms" },
      A3: { name: "Purpose", description: "Perception of life's meaning" },
      Ac: { name: "Action", description: "Execution and decision-making style" },
      Ac1: { name: "Achievement", description: "Pursuing results vs avoiding risks" },
      Ac2: { name: "Decisiveness", description: "Decision-making speed" },
      Ac3: { name: "Planning", description: "Level of planning in actions" },
      So: { name: "Social", description: "Interpersonal interaction patterns" },
      So1: { name: "Openness", description: "Attitude toward new social connections" },
      So2: { name: "Intimacy", description: "Need for close relationships" },
      So3: { name: "Authenticity", description: "Consistency across different contexts" }
    }
  },
  zh: {
    meta: { name: "中文", nativeName: "中文", code: "zh" },
    ui: {
      title: "SBTI 人格测试",
      subtitle: "探索你的内心世界",
      startTest: "开始测试",
      nextQuestion: "下一题",
      prevQuestion: "上一题",
      viewResult: "查看结果",
      retake: "重新测试",
      share: "分享结果",
      dimensions: "维度分析",
      yourType: "你的人格类型",
      description: "详细描述",
      progress: "进度",
      question: "第 {{current}} 题 / 共 {{total}} 题"
    },
    dimensions: {
      S: { name: "自我", description: "自我认知与自我价值" },
      S1: { name: "自我价值", description: "对自我价值的评估" },
      S2: { name: "自我认知", description: "对真实自我的了解" },
      S3: { name: "自我驱动", description: "内在动力与外在评价" },
      E: { name: "情感", description: "情感表达与依恋模式" },
      E1: { name: "安全感", description: "关系中的安全感程度" },
      E2: { name: "情感投入", description: "对感情的认真程度" },
      E3: { name: "独立空间", description: "对个人空间的需求" },
      A: { name: "态度", description: "对世界的基本态度" },
      A1: { name: "信任度", description: "对他人善意的信任" },
      A2: { name: "规则性", description: "遵守规则与打破常规" },
      A3: { name: "目标感", description: "人生意义的认知" },
      Ac: { name: "行动", description: "执行与决策方式" },
      Ac1: { name: "成就导向", description: "追求成果vs规避风险" },
      Ac2: { name: "果断性", description: "决策的果断程度" },
      Ac3: { name: "计划性", description: "做事的计划程度" },
      So: { name: "社交", description: "人际交往模式" },
      So1: { name: "开放性", description: "对新社交的态度" },
      So2: { name: "亲密度", description: "对亲密关系的需求" },
      So3: { name: "真实性", description: "在不同场合的表现一致性" }
    }
  },
  hi: {
    meta: { name: "Hindi", nativeName: "हिन्दी", code: "hi" },
    ui: {
      title: "SBTI व्यक्तित्व परीक्षण",
      subtitle: "अपनी आंतरिक दुनिया का अन्वेषण करें",
      startTest: "परीक्षण शुरू करें",
      nextQuestion: "अगला",
      prevQuestion: "पिछला",
      viewResult: "परिणाम देखें",
      retake: "पुनः परीक्षण",
      share: "परिणाम साझा करें",
      dimensions: "आयाम विश्लेषण",
      yourType: "आपका व्यक्तित्व प्रकार",
      description: "विवरण",
      progress: "प्रगति",
      question: "प्रश्न {{current}} / {{total}}"
    },
    dimensions: {
      S: { name: "आत्म", description: "आत्म-धारणा और आत्म-मूल्य" },
      E: { name: "भावना", description: "भावनात्मक अभिव्यक्ति और लगाव" },
      A: { name: "दृष्टिकोण", description: "दुनिया के प्रति मूल दृष्टिकोण" },
      Ac: { name: "कार्रवाई", description: "निष्पादन और निर्णय लेने की शैली" },
      So: { name: "सामाजिक", description: "पारस्परिक संपर्क पैटर्न" }
    }
  },
  ru: {
    meta: { name: "Russian", nativeName: "Русский", code: "ru" },
    ui: {
      title: "Тест личности SBTI",
      subtitle: "Исследуйте свой внутренний мир",
      startTest: "Начать тест",
      nextQuestion: "Далее",
      prevQuestion: "Назад",
      viewResult: "Результат",
      retake: "Пройти заново",
      share: "Поделиться",
      dimensions: "Анализ измерений",
      yourType: "Ваш тип личности",
      description: "Описание",
      progress: "Прогресс",
      question: "Вопрос {{current}} из {{total}}"
    },
    dimensions: {
      S: { name: "Самость", description: "Самовосприятие и самооценка" },
      E: { name: "Эмоции", description: "Эмоциональное выражение и привязанность" },
      A: { name: "Отношение", description: "Базовое отношение к миру" },
      Ac: { name: "Действие", description: "Исполнение и стиль принятия решений" },
      So: { name: "Социум", description: "Паттерны межличностного взаимодействия" }
    }
  },
  ja: {
    meta: { name: "Japanese", nativeName: "日本語", code: "ja" },
    ui: {
      title: "SBTI 性格診断",
      subtitle: "あなたの内面世界を探求",
      startTest: "診断を始める",
      nextQuestion: "次へ",
      prevQuestion: "前へ",
      viewResult: "結果を見る",
      retake: "やり直す",
      share: "結果をシェア",
      dimensions: "次元分析",
      yourType: "あなたの性格タイプ",
      description: "詳細説明",
      progress: "進捗",
      question: "第 {{current}} 問 / 全 {{total}} 問"
    },
    dimensions: {
      S: { name: "自己", description: "自己認識と自己価値" },
      E: { name: "感情", description: "感情表現と愛着スタイル" },
      A: { name: "態度", description: "世界に対する基本的態度" },
      Ac: { name: "行動", description: "実行と意思決定スタイル" },
      So: { name: "社交", description: "対人関係パターン" }
    }
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sbti-locale') as Locale | null
    if (saved && ['en', 'zh', 'hi', 'ru', 'ja'].includes(saved)) {
      setLocaleState(saved)
    } else {
      const browserLang = navigator.language.split('-')[0]
      if (['en', 'zh', 'hi', 'ru', 'ja'].includes(browserLang)) {
        setLocaleState(browserLang as Locale)
      }
    }
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('sbti-locale', newLocale)
  }

  // 在服务端渲染时使用默认翻译
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    // 使用当前 locale 或默认 'en'
    const currentLocale = mounted ? locale : 'en'
    let value: any = translations[currentLocale]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        // 如果找不到翻译，返回格式化的 key
        if (key === 'question' && params) {
          return `Question ${params.current} of ${params.total}`
        }
        return key
      }
    }
    
    if (typeof value !== 'string') return key
    
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, name) => 
        String(params[name] ?? `{{${name}}}`)
      )
    }
    
    return value
  }

  // 避免 SSR 和客户端不匹配，使用默认语言渲染
  return (
    <I18nContext.Provider value={{ locale: mounted ? locale : 'en', setLocale, t }}>
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