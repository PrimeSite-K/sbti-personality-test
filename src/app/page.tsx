'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import TestPage from '@/components/TestPage'
import ResultPage from '@/components/ResultPage'
import { AdBanner, AdInFeed, SmartAd } from '@/components/AdSense'
import { useTranslation } from '@/lib/i18n'
import questions from '@/data/questions.json'
import personalityTypes from '@/data/personality-types.json'

export default function Home() {
  const { t, locale } = useTranslation()
  const [stage, setStage] = useState<'home' | 'test' | 'result'>('home')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<string | null>(null)

  // 计算维度得分
  const calculateResult = (answers: Record<string, number>) => {
    const dimensions: Record<string, number> = {}
    
    // 初始化维度
    const dimList = ['S1', 'S2', 'S3', 'E1', 'E2', 'E3', 'A1', 'A2', 'A3', 'Ac1', 'Ac2', 'Ac3', 'So1', 'So2', 'So3']
    dimList.forEach(d => dimensions[d] = 0)
    
    // 计算每个维度的平均分
    questions.forEach(q => {
      if (answers[q.id]) {
        dimensions[q.dim] = (dimensions[q.dim] || 0) + answers[q.id]
      }
    })
    
    // 这里简化逻辑，实际应根据原网站的算法
    // 根据得分判断人格类型
    const scores = Object.entries(dimensions).map(([k, v]) => ({ dim: k, score: v }))
    
    // 简化的类型判定逻辑
    const avgScore = scores.reduce((a, b) => a + b.score, 0) / scores.length
    
    // 基于特征的简单映射
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

  return (
    <main className="relative min-h-screen">
      {/* 背景粒子效果 */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-t-0 border-x-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-xl font-bold glow-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setStage('home')}
          >
            SBTI
          </motion.h1>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* 主内容区 */}
      <div className="pt-20 pb-10 px-6">
        <AnimatePresence mode="wait">
          {stage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* 主视觉区 */}
              <div className="flex flex-col lg:flex-row gap-8 items-center min-h-[70vh]">
                {/* 左侧：标题和开始按钮 */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.h2 
                    className="text-5xl lg:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="glow-text">{t('title')}</span>
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-gray-400 mb-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {t('subtitle')}
                  </motion.p>
                  <motion.button
                    onClick={() => setStage('test')}
                    className="glow-button px-8 py-4 rounded-xl text-lg font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('startTest')} →
                  </motion.button>
                </div>

                {/* 右侧：数据面板 */}
                <motion.div 
                  className="flex-1 max-w-md w-full"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="data-panel">
                    <h3 className="text-lg font-semibold mb-4 text-primary-300">测试维度</h3>
                    <div className="space-y-3">
                      {['S', 'E', 'A', 'Ac', 'So'].map((dim, i) => (
                        <div key={dim} className="flex items-center justify-between">
                          <span className="text-gray-300">{t(`dimensions.${dim}.name`)}</span>
                          <div className="flex gap-1">
                            {[1,2,3].map(n => (
                              <div key={n} className="w-8 h-2 rounded bg-primary-700/50" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-primary-700/30">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">总题目数</span>
                        <span className="text-accent-cyan font-bold">30</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-400">人格类型</span>
                        <span className="text-accent-purple font-bold">27种</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 底部功能卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                
                {/* 广告位 - 信息流广告 (Google + Media.net) */}
                <div className="col-span-full">
                  <SmartAd type="infeed" showMediaNet={false} />
                </div>
                {[
                  { title: '科学评估', desc: '基于心理学的多维度分析', icon: '🔬' },
                  { title: '深度洞察', desc: '发现隐藏的人格特质', icon: '💡' },
                  { title: '社交分享', desc: '与朋友分享你的类型', icon: '🔗' },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    className="glass-card p-6 hover:border-primary-500/50 transition-all cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-3xl mb-3">{card.icon}</div>
                    <h4 className="font-semibold text-lg mb-2">{card.title}</h4>
                    <p className="text-gray-400 text-sm">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === 'test' && (
            <TestPage
              key="test"
              questions={questions}
              onComplete={handleComplete}
              onBack={() => setStage('home')}
            />
          )}

          {stage === 'result' && result && (
            <ResultPage
              key="result"
              typeCode={result}
              personalityTypes={personalityTypes}
              answers={answers}
              questions={questions}
              onRetake={handleRetake}
            />
          )}
        </AnimatePresence>

        {/* 底部广告横幅 */}
        <div className="max-w-4xl mx-auto mt-12">
          <AdBanner format="horizontal" />
        </div>
      </div>
    </main>
  )
}