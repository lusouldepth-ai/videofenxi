'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { formatNumber, formatDate } from '@/lib/utils'
import { Clock, ExternalLink, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { getMockUserData } from '@/lib/client-api'

interface Analysis {
  id: string
  title: string
  platform: string
  thumbnail?: string
  views: string
  score?: number
  createdAt: string
}

export function RecentAnalyses() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 获取最近的分析数据
    const loadAnalyses = async () => {
      try {
        const userData = await getMockUserData()
        setAnalyses(userData.recentAnalyses)
      } catch (error) {
        console.error('Failed to load analyses:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    setTimeout(() => loadAnalyses(), 500) // 模拟加载时间
  }, [])

  const getPlatformColor = (platform: string) => {
    const colors = {
      'YOUTUBE': 'bg-red-100 text-red-800',
      'DOUYIN': 'bg-black text-white',
      'BILIBILI': 'bg-blue-100 text-blue-800',
      'XIAOHONGSHU': 'bg-pink-100 text-pink-800'
    }
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPlatformName = (platform: string) => {
    const names = {
      'YOUTUBE': 'YouTube',
      'DOUYIN': '抖音',
      'BILIBILI': 'B站',
      'XIAOHONGSHU': '小红书'
    }
    return names[platform as keyof typeof names] || platform
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          📝 最近分析
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          📝 最近分析
        </h2>
        <Link href="/history">
          <Button variant="outline" size="sm">
            查看全部
          </Button>
        </Link>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            暂无分析记录
          </h3>
          <p className="text-gray-600">
            开始您的第一次视频分析吧！
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {analysis.thumbnail ? (
                  <img
                    src={analysis.thumbnail}
                    alt={analysis.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    {getPlatformName(analysis.platform)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                  {analysis.title}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className={`px-2 py-1 rounded-full ${getPlatformColor(analysis.platform)}`}>
                    {getPlatformName(analysis.platform)}
                  </span>
                  <span>{formatNumber(parseInt(analysis.views))} 播放</span>
                  {analysis.score && (
                    <span className="text-primary-500 font-medium">
                      {analysis.score}分
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(new Date(analysis.createdAt))}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}