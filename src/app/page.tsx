'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import TestPage from '@/components/TestPage'
import ResultPage from '@/components/ResultPage'
import { AdBanner } from '@/components/AdSense'
import { useTranslation } from '@/lib/i18n'
import questionsI18n from '@/data/questions-i18n.json'
import questions60 from '@/data/questions-60.json'
import personalityTypes from '@/data/personality-types.json'
import personalityTypesEnhanced from '@/data/personality-types-enhanced.json'

export default function Home() {
  const { t, locale } = useTranslation()
  const [stage, setStage] = useState<'home' | 'test' | 'result'>('home')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<string | null>(null)

  // 使用60题版本
  const questions = questions60

  const calculateResult = (answers: Record<string, number>) => {
    const dimensions: Record<string, number> = {}
    const dimList = ['S1', 'S2', 'S3', 'E1', 'E2', 'E3', 'A1', 'A2', 'A3', 'Ac1', 'Ac2', 'Ac3', 'So1', 'So2', 'So3']
    dimList.forEach(d => dimensions[d] = 0)
    
    questions.forEach(q => {
      if (answers[q.id]) {
        dimensions[q.dim] = (dimensions[q.dim] || 0) + answers[q.id]
      }
    })
    
    if (dimensions.S1 < 4) {
      if (dimensions.E1 < 4) return 'SOLO'
      return 'IMSB'
    }
    if (dimensions.S3 >= 5 && dimensions.Ac3 >= 5) return 'CTRL'
    if (dimensions.E2 >= 5) return 'LOVE-R'
    if (dimensions.A1 >= 5) return 'THAN-K'
    if (dimensions.Ac1 >= 5) return 'GOGO'
    if (dimensions.So2 < 4) return 'MONK'
    
    return 'OJBK'
  }

  const handleComplete = (finalAnswers: Record<string, number>) => {
    setAnswers(finalAnswers)
    const calculatedResult = calculateResult(finalAnswers)
    setResult(calculatedResult)
    setStage('result')
  }

  const handleRetake = () => {
    setAnswers({})
    setResult(null)
    setStage('home')
  }

  // 首页
  if (stage === 'home') {
    return (
      <main className="relative min-h-screen">
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-600/80 backdrop-blur-xl border-b border-primary-700/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
              SBTI
            </h1>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* 主内容 */}
        <div className="pt-24 pb-10 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary-400 to-purple-400">
                  {t('ui.title')}
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {t('ui.subtitle')}
              </p>
              <button
                type="button"
                onTouchStart={(e) => {
                  e.preventDefault()
                  setStage('test')
                }}
                onClick={() => setStage('test')}
                className="px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 active:from-primary-700 active:to-primary-800 transition-all cursor-pointer touch-manipulation"
                style={{ minHeight: '60px', WebkitTapHighlightColor: 'transparent' }}
              >
                {t('ui.startTest')} →
              </button>
            </div>

            {/* 数据面板 */}
            <div className="glass-card p-6 mb-12 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-primary-300">{t('ui.dimensions')}</h3>
              <div className="space-y-3">
                {['S', 'E', 'A', 'Ac', 'So'].map(dim => (
                  <div key={dim} className="flex items-center justify-between">
                    <span className="text-gray-300">{t(`dimensions.${dim}.name`)}</span>
                    <div className="flex gap-1">
                      {[1,2,3].map(n => <div key={n} className="w-8 h-2 rounded bg-primary-700/50" />)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-primary-700/30">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Questions</span>
                  <span className="text-cyan-400 font-bold">30</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-400">Personality Types</span>
                  <span className="text-purple-400 font-bold">27</span>
                </div>
              </div>
            </div>

            {/* 功能卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Scientific Assessment', desc: 'Multi-dimensional analysis based on psychology', icon: '🔬' },
                { title: 'Deep Insights', desc: 'Discover hidden personality traits', icon: '💡' },
                { title: 'Social Sharing', desc: 'Share your type with friends', icon: '🔗' },
              ].map((card) => (
                <div key={card.title} className="glass-card p-6 hover:border-primary-500/50 transition-all">
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <h4 className="font-semibold text-lg mb-2">{card.title}</h4>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* 广告 */}
            <div className="mt-12">
              <AdBanner format="horizontal" />
            </div>

            {/* 免责声明和合规链接 */}
            <div className="mt-12 pt-8 border-t border-primary-700/20">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <p className="text-sm text-gray-500">
                  ⚠️ <strong>Disclaimer:</strong> This test is for entertainment purposes only. 
                  It is not a scientific or clinical psychological assessment.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
                  <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                  <span>•</span>
                  <a href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                  <span>•</span>
                  <a href="/disclaimer" className="hover:text-gray-400 transition-colors">Disclaimer</a>
                </div>
                <p className="text-xs text-gray-600">
                  Original content by 蛆肉儿串儿 (Bilibili UID: 417038183)
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // 测试页
  if (stage === 'test') {
    return (
      <main className="relative min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-600/80 backdrop-blur-xl border-b border-primary-700/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400 cursor-pointer"
              onClick={() => setStage('home')}
            >
              SBTI
            </h1>
            <LanguageSwitcher />
          </div>
        </nav>
        <div className="pt-24 pb-10 px-6">
          <TestPage questions={questions} onComplete={handleComplete} onBack={() => setStage('home')} />
        </div>
      </main>
    )
  }

  // 结果页
  if (stage === 'result' && result) {
    return (
      <main className="relative min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-600/80 backdrop-blur-xl border-b border-primary-700/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400 cursor-pointer"
              onClick={() => setStage('home')}
            >
              SBTI
            </h1>
            <LanguageSwitcher />
          </div>
        </nav>
        <div className="pt-24 pb-10 px-6">
          <ResultPage 
            typeCode={result} 
            personalityTypes={personalityTypes} 
            answers={answers} 
            questions={questions} 
            onRetake={handleRetake} 
          />
        </div>
      </main>
    )
  }

  return null
}