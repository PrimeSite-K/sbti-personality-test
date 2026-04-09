'use client'

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
  const personality = personalityTypes[typeCode]

  // 计算维度得分
  const dimensionScores: Record<string, number[]> = {}
  questions.forEach(q => {
    if (!dimensionScores[q.dim]) dimensionScores[q.dim] = []
    if (answers[q.id]) dimensionScores[q.dim].push(answers[q.id])
  })

  const radarData = Object.entries(dimensionScores).map(([dim, scores]) => ({
    dimension: dim,
    score: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 33.33), // 转换为百分制
    fullMark: 100,
  }))

  // 社交分享
  const handleShare = async () => {
    const shareData = {
      title: 'SBTI 人格测试',
      text: `我的人格类型是 ${personality?.cn || typeCode}！${personality?.intro || ''}`,
      url: window.location.href,
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (e) {
        console.log('分享取消')
      }
    } else {
      // 复制链接
      navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板！')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 结果卡片 */}
        <div className="glass-card p-8 mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{typeCode}</span>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4 glow-text"
          >
            {personality?.cn || typeCode}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-primary-300 mb-6"
          >
            "{personality?.intro || ''}"
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            {personality?.desc || ''}
          </motion.p>
        </div>

        {/* 维度雷达图 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-primary-300">{t('dimensions')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(99, 102, 241, 0.2)" />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ fill: '#a5b4fc', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#6366f1', fontSize: 10 }}
                />
                <Radar
                  name="得分"
                  dataKey="score"
                  stroke="#818cf8"
                  fill="#6366f1"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 维度详情 */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-primary-300">详细分析</h3>
            <div className="space-y-4">
              {radarData.slice(0, 6).map((item, i) => (
                <motion.div
                  key={item.dimension}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{t(`dimensions.${item.dimension}.name`)}</span>
                    <span className="text-accent-cyan">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-primary-800/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-cyan to-primary-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={onRetake}
            className="px-6 py-3 rounded-xl glass-card hover:border-primary-500/50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('retake')}
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="glow-button px-8 py-3 rounded-xl font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('share')} 📤
          </motion.button>
        </div>

        {/* 广告位 */}
        <div className="mt-8 mb-4">
          <AdBanner format="horizontal" />
        </div>

        {/* 所有人格类型 */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6 text-center">所有人格类型</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {Object.values(personalityTypes).map((type, i) => (
              <motion.div
                key={type.code}
                className={`glass-card p-3 text-center cursor-pointer transition-all
                  ${type.code === typeCode 
                    ? 'ring-2 ring-primary-500 bg-primary-800/40' 
                    : 'hover:border-primary-500/50'
                  }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.03 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm font-bold text-primary-300">{type.code}</div>
                <div className="text-xs text-gray-400 mt-1 truncate">{type.cn}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}