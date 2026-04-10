'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

interface Question {
  id: string
  dim: string
  text: string
  options: { label: string; value: number }[]
}

interface TestPageProps {
  questions: Question[]
  onComplete: (answers: Record<string, number>) => void
  onBack: () => void
}

const dimensionLabels: Record<string, string> = {
  'S1': 'Self-Worth',
  'S2': 'Self-Awareness',
  'S3': 'Self-Drive',
  'E1': 'Security',
  'E2': 'Emotional Investment',
  'E3': 'Personal Space',
  'A1': 'Trust',
  'A2': 'Conformity',
  'A3': 'Purpose',
  'Ac1': 'Achievement',
  'Ac2': 'Decisiveness',
  'Ac3': 'Planning',
  'So1': 'Openness',
  'So2': 'Intimacy',
  'So3': 'Authenticity',
}

export default function TestPage({ questions, onComplete, onBack }: TestPageProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleSelect = (value: number) => {
    console.log('Selected:', value, 'for question:', currentQuestion?.id)
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

  return (
    <div className="relative z-20 max-w-2xl mx-auto">
      {/* 进度条 */}
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

      {/* 题目卡片 */}
      <div className="glass-card p-6 mb-6 relative z-30">
        <div className="text-xs text-primary-400 mb-3 font-mono">
          {currentQuestion.dim} | {dimensionLabels[currentQuestion.dim] || currentQuestion.dim}
        </div>
        <p className="text-lg leading-relaxed text-white">
          {currentQuestion.text}
        </p>
      </div>

      {/* 选项按钮 */}
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
              <span className="text-white text-base">{option.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 导航按钮 */}
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