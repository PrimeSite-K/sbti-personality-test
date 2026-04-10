'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import questionsI18n from '@/data/questions-i18n.json'

interface TestPageProps {
  onComplete: (answers: Record<string, number>) => void
  onBack: () => void
}

const dimensionLabels: Record<string, Record<string, string>> = {
  'S1': { en: 'Self-Worth', zh: '自我价值', hi: 'आत्म-मूल्य', ru: 'Самоценность', ja: '自己価値' },
  'S2': { en: 'Self-Awareness', zh: '自我认知', hi: 'आत्म-जागरूकता', ru: 'Самосознание', ja: '自己認識' },
  'S3': { en: 'Self-Drive', zh: '自我驱动', hi: 'आत्म-प्रेरणा', ru: 'Самомотивация', ja: '自己駆動' },
  'E1': { en: 'Security', zh: '安全感', hi: 'सुरक्षा', ru: 'Безопасность', ja: '安心感' },
  'E2': { en: 'Emotional Investment', zh: '情感投入', hi: 'भावनात्मक निवेश', ru: 'Эмоции', ja: '感情投資' },
  'E3': { en: 'Personal Space', zh: '个人空间', hi: 'व्यक्तिगत स्थान', ru: 'Личное пространство', ja: '個人の空間' },
  'A1': { en: 'Trust', zh: '信任度', hi: 'विश्वास', ru: 'Доверие', ja: '信頼' },
  'A2': { en: 'Conformity', zh: '规则性', hi: 'अनुपालन', ru: 'Конформизм', ja: '規範性' },
  'A3': { en: 'Purpose', zh: '目标感', hi: 'उद्देश्य', ru: 'Цель', ja: '目的意識' },
  'Ac1': { en: 'Achievement', zh: '成就导向', hi: 'उपलब्धि', ru: 'Достижение', ja: '達成志向' },
  'Ac2': { en: 'Decisiveness', zh: '果断性', hi: 'निर्णायकता', ru: 'Решительность', ja: '決断力' },
  'Ac3': { en: 'Planning', zh: '计划性', hi: 'योजना', ru: 'Планирование', ja: '計画性' },
  'So1': { en: 'Openness', zh: '开放性', hi: 'खुलापन', ru: 'Открытость', ja: '開放性' },
  'So2': { en: 'Intimacy', zh: '亲密度', zh: 'घनिष्ठता', ru: 'Близость', ja: '親密さ' },
  'So3': { en: 'Authenticity', zh: '真实性', hi: 'प्रामाणिकता', ru: 'Аутентичность', ja: '真実性' },
}

export default function TestPage({ onComplete, onBack }: TestPageProps) {
  const { locale } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const questions = questionsI18n.questions
  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  // 获取对应语言的文本
  const getText = (textObj: Record<string, string>) => {
    return textObj[locale] || textObj['en'] || textObj['zh'] || ''
  }

  const handleSelect = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const isSelected = (value: number) => answers[currentQuestion?.id] === value

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  const dimLabel = dimensionLabels[currentQuestion.dim]?.[locale] || 
                   dimensionLabels[currentQuestion.dim]?.['en'] || 
                   currentQuestion.dim

  return (
    <div className="relative z-20 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-primary-800/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="glass-card p-6 mb-6 relative z-30">
        <div className="text-xs text-primary-400 mb-3 font-mono">
          {currentQuestion.dim} | {dimLabel}
        </div>
        <p className="text-lg leading-relaxed text-white">
          {getText(currentQuestion.text)}
        </p>
      </div>

      {/* Option buttons */}
      <div className="space-y-3 relative z-30">
        {currentQuestion.options.map((option, i) => (
          <button
            key={option.value}
            type="button"
            onTouchStart={(e) => {
              e.preventDefault()
              handleSelect(option.value)
            }}
            onClick={(e) => {
              e.preventDefault()
              handleSelect(option.value)
            }}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 border touch-manipulation
              ${isSelected(option.value) 
                ? 'bg-primary-600/40 border-primary-400 ring-2 ring-primary-500' 
                : 'bg-primary-900/30 border-primary-700/30 hover:bg-primary-800/40 hover:border-primary-500/50 active:bg-primary-700/50'
              }`}
            style={{ minHeight: '60px', WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="flex items-center gap-3">
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0
                ${isSelected(option.value) 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-primary-800/50 text-gray-400'
                }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-white text-base">{getText(option.label)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4 mt-8 relative z-30">
        <button
          type="button"
          onTouchStart={(e) => {
            e.preventDefault()
            currentIndex === 0 ? onBack() : handlePrev()
          }}
          onClick={(e) => {
            e.preventDefault()
            currentIndex === 0 ? onBack() : handlePrev()
          }}
          className="px-6 py-4 rounded-xl bg-primary-900/30 border border-primary-700/30 hover:bg-primary-800/40 active:bg-primary-700/50 transition-all touch-manipulation"
          style={{ minHeight: '56px', WebkitTapHighlightColor: 'transparent' }}
        >
          {currentIndex === 0 ? '← Back' : '← Previous'}
        </button>

        <button
          type="button"
          onTouchStart={(e) => {
            e.preventDefault()
            if (answers[currentQuestion.id]) handleNext()
          }}
          onClick={(e) => {
            e.preventDefault()
            handleNext()
          }}
          disabled={!answers[currentQuestion.id]}
          className={`px-8 py-4 rounded-xl font-semibold transition-all touch-manipulation
            ${answers[currentQuestion.id]
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 active:from-primary-700 active:to-primary-800 cursor-pointer'
              : 'bg-primary-900/30 text-gray-500 cursor-not-allowed'
            }`}
          style={{ minHeight: '56px', WebkitTapHighlightColor: 'transparent' }}
        >
          {currentIndex === questions.length - 1 ? 'View Result →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}