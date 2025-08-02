'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, Crown } from 'lucide-react'
import { getMockUserData, mockAuth } from '@/lib/client-api'

export function StatsCards() {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    todayAnalyses: 0,
    averageScore: 0,
    competitorsTracked: 0
  })

  useEffect(() => {
    // 获取用户统计数据
    const loadStats = async () => {
      const userData = await getMockUserData()
      setStats({
        totalAnalyses: userData.totalAnalyses,
        todayAnalyses: userData.todayAnalyses,
        averageScore: userData.averageScore,
        competitorsTracked: userData.competitorsTracked
      })
    }
    loadStats()
  }, [])

  const cards = [
    {
      title: '总分析次数',
      value: stats.totalAnalyses.toString(),
      change: '+23%',
      changeType: 'positive' as const,
      icon: BarChart3,
      color: 'text-primary-500',
      bgColor: 'bg-primary-50'
    },
    {
      title: '今日分析',
      value: `${stats.todayAnalyses}${mockAuth.user.isPremium ? '' : '/3'}`,
      change: mockAuth.user.isPremium ? '无限制' : '免费额度',
      changeType: 'neutral' as const,
      icon: TrendingUp,
      color: 'text-secondary-coral',
      bgColor: 'bg-red-50'
    },
    {
      title: '平均评分',
      value: `${stats.averageScore}分`,
      change: '+5分',
      changeType: 'positive' as const,
      icon: Crown,
      color: 'text-secondary-sky',
      bgColor: 'bg-blue-50'
    },
    {
      title: '竞品监控',
      value: mockAuth.user.isPremium ? `${stats.competitorsTracked}/10` : '暂不可用',
      change: mockAuth.user.isPremium ? '活跃' : '升级解锁',
      changeType: mockAuth.user.isPremium ? 'positive' : 'neutral' as const,
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value}
                </p>
                <p className={`text-xs ${
                  card.changeType === 'positive' 
                    ? 'text-green-600' 
                    : card.changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}>
                  {card.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}