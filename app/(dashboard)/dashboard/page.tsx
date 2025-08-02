'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { VideoAnalyzer } from '@/components/dashboard/VideoAnalyzer'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecentAnalyses } from '@/components/dashboard/RecentAnalyses'
import { BarChart3, Plus, TrendingUp, Users, Crown } from 'lucide-react'
import Link from 'next/link'
import { mockAuth } from '@/lib/client-api'

export default function DashboardPage() {
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  const session = { user: mockAuth.user } // 使用模拟session

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-sky rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">VideoAnalyzer Pro</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {!session?.user?.isPremium && (
                <Button size="sm" className="flex items-center">
                  <Crown className="w-4 h-4 mr-2" />
                  升级专业版
                </Button>
              )}
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {session?.user?.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {session?.user?.isPremium ? '专业版用户' : '免费用户'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            欢迎回来，{session?.user?.name}！👋
          </h1>
          <p className="text-gray-600">
            开始分析您的视频数据，获得AI驱动的优化建议
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Video Analyzer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  📹 视频分析
                </h2>
                <Button
                  onClick={() => setShowAnalyzer(!showAnalyzer)}
                  size="sm"
                  variant={showAnalyzer ? "secondary" : "default"}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {showAnalyzer ? '收起' : '开始分析'}
                </Button>
              </div>
              
              {showAnalyzer ? (
                <VideoAnalyzer onAnalysisComplete={setAnalysisData} />
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    开始您的第一次分析
                  </h3>
                  <p className="text-gray-600 mb-4">
                    支持抖音、B站、小红书、YouTube等平台
                  </p>
                  <Button onClick={() => setShowAnalyzer(true)}>
                    立即开始
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentAnalyses />
          
          {/* Usage Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              📊 使用统计
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="text-gray-700">今日分析次数</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {session?.user?.isPremium ? '无限制' : '2/3'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-secondary-coral mr-3" />
                  <span className="text-gray-700">竞品监控</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {session?.user?.isPremium ? '3/10' : '暂不可用'}
                </span>
              </div>
            </div>

            {!session?.user?.isPremium && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-sky/20 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  🚀 升级专业版
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  解锁无限分析、AI深度建议、竞品监控等功能
                </p>
                <Button size="sm" className="w-full">
                  立即升级 - 仅¥39/月
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}