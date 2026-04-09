'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

export default function TestPage({ questions, onComplete, onBack }: TestPageProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [direction, setDirection] = useState(0)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleSelect = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    }
  }

  const isSelected = (value: number) => answers[currentQuestion?.id] === value

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* 进度条 */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{t('question', { current: currentIndex + 1, total: questions.length })}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 题目区域 */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQuestion?.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="glass-card p-6 mb-6">
            <div className="text-xs text-primary-400 mb-3 font-mono">
              {currentQuestion?.dim}
            </div>
            <p className="text-lg leading-relaxed">
              {currentQuestion?.text}
            </p>
          </div>

          {/* 选项 */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option, i) => (
              <motion.button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`option-card w-full text-left ${isSelected(option.value) ? 'selected' : ''}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                    ${isSelected(option.value) 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-primary-800/50 text-gray-400'
                    }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 pt-1">{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 导航按钮 */}
      <div className="flex justify-between gap-4">
        <motion.button
          onClick={currentIndex === 0 ? onBack : handlePrev}
          className="px-6 py-3 rounded-xl glass-card hover:border-primary-500/50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentIndex === 0 ? '← 返回' : t('prevQuestion')}
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={!answers[currentQuestion?.id]}
          className={`px-8 py-3 rounded-xl font-semibold transition-all
            ${answers[currentQuestion?.id]
              ? 'glow-button'
              : 'bg-primary-800/30 text-gray-500 cursor-not-allowed'
            }`}
          whileHover={answers[currentQuestion?.id] ? { scale: 1.02 } : {}}
          whileTap={answers[currentQuestion?.id] ? { scale: 0.98 } : {}}
        >
          {currentIndex === questions.length - 1 ? t('viewResult') : t('nextQuestion')}
        </motion.button>
      </div>
    </div>
  )
}