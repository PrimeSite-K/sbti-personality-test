'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { AdBanner } from './AdSense'
import { useTranslation } from '@/lib/i18n'

interface ResultPageProps {
  typeCode: string
  personalityTypes: Record<string, { code: string; cn: string; intro: string; desc: string }>
  answers: Record<string, number>
  questions: { id: string; dim: string }[]
  onRetake: () => void
}

export default function ResultPage({ typeCode, personalityTypes, answers, questions, onRetake }: ResultPageProps) {
  const { t } = useTranslation()
  const [shareStatus, setShareStatus] = useState('')
  const personality = personalityTypes[typeCode]

  // 计算维度得分
  const dimensionScores: Record<string, number[]> = {}
  questions.forEach(q => {
    if (!dimensionScores[q.dim]) dimensionScores[q.dim] = []
    if (answers[q.id]) dimensionScores[q.dim].push(answers[q.id])
  })

  const radarData = Object.entries(dimensionScores).map(([dim, scores]) => ({
    dimension: dim,
    score: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 33.33),
    fullMark: 100,
  }))

  // 社交分享
  const handleShare = async () => {
    const shareText = `我的人格类型是 ${personality?.cn || typeCode}！${personality?.intro || ''} 来测测你是什么类型？`
    const shareUrl = 'https://www.sbtinews.com'
    
    // 尝试使用 Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SBTI 人格测试',
          text: shareText,
          url: shareUrl,
        })
        setShareStatus('分享成功！')
      } catch (e) {
        console.log('分享取消或失败', e)
        // 如果分享失败，复制链接
        copyToClipboard(shareUrl)
      }
    } else {
      // 不支持 Web Share API，复制链接
      copyToClipboard(shareUrl)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShareStatus('链接已复制！')
      setTimeout(() => setShareStatus(''), 3000)
    } catch (e) {
      // 备用方案
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setShareStatus('链接已复制！')
      setTimeout(() => setShareStatus(''), 3000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* 结果卡片 */}
      <div className="glass-card p-8 mb-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">{typeCode}</span>
        </div>
        
        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary-400 to-purple-400">
          {personality?.cn || typeCode}
        </h2>
        
        <p className="text-xl text-primary-300 mb-6">
          "{personality?.intro || ''}"
        </p>
        
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {personality?.desc || ''}
        </p>
      </div>

      {/* 维度雷达图 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary-300">{t('ui.dimensions')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(99, 102, 241, 0.2)" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#a5b4fc', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6366f1', fontSize: 10 }} />
              <Radar name="Score" dataKey="score" stroke="#818cf8" fill="#6366f1" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 维度详情 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary-300">Detail Analysis</h3>
          <div className="space-y-4">
            {radarData.slice(0, 6).map((item, i) => (
              <div key={item.dimension}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.dimension}</span>
                  <span className="text-cyan-400">{item.score}%</span>
                </div>
                <div className="h-2 bg-primary-800/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-primary-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
        <button
          type="button"
          onTouchStart={(e) => {
            e.preventDefault()
            onRetake()
          }}
          onClick={onRetake}
          className="px-6 py-4 rounded-xl glass-card hover:border-primary-500/50 active:bg-primary-700/30 transition-all touch-manipulation"
          style={{ minHeight: '56px', WebkitTapHighlightColor: 'transparent' }}
        >
          {t('ui.retake')}
        </button>

        <button
          type="button"
          onTouchStart={(e) => {
            e.preventDefault()
            handleShare()
          }}
          onClick={handleShare}
          className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 active:from-primary-700 active:to-primary-800 transition-all touch-manipulation"
          style={{ minHeight: '56px', WebkitTapHighlightColor: 'transparent' }}
        >
          {shareStatus || `${t('ui.share')} 📤`}
        </button>
      </div>

      {/* 分享提示 */}
      {shareStatus && (
        <div className="text-center text-green-400 mb-4">{shareStatus}</div>
      )}

      {/* 广告位 */}
      <div className="mt-8 mb-4">
        <AdBanner format="horizontal" />
      </div>

      {/* 所有人格类型 */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6 text-center">All Personality Types</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {Object.values(personalityTypes).map((type) => (
            <div
              key={type.code}
              className={`p-3 text-center rounded-xl transition-all cursor-pointer
                ${type.code === typeCode 
                  ? 'ring-2 ring-primary-500 bg-primary-800/40' 
                  : 'bg-primary-900/30 hover:bg-primary-800/40'
                }`}
            >
              <div className="text-sm font-bold text-primary-300">{type.code}</div>
              <div className="text-xs text-gray-400 mt-1 truncate">{type.cn}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 导出免责声明组件（用于页面底部）
export function DisclaimerFooter() {
  return (
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
  )
}