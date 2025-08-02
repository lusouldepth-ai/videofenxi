'use client'

import { Button } from '@/components/ui/Button'
import { 
  TrendingUp, 
  Users, 
  Download, 
  Settings, 
  Crown,
  HelpCircle 
} from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    {
      title: '查看热门榜单',
      description: '发现当前热门视频和趋势',
      icon: TrendingUp,
      href: '/trending',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50'
    },
    {
      title: '竞品监控',
      description: '添加竞争对手进行监控',
      icon: Users,
      href: '/competitors',
      color: 'text-secondary-coral',
      bgColor: 'bg-red-50'
    },
    {
      title: '导出报告',
      description: '生成专业的分析报告',
      icon: Download,
      href: '/reports',
      color: 'text-secondary-sky',
      bgColor: 'bg-blue-50'
    },
    {
      title: '账户设置',
      description: '管理个人信息和偏好',
      icon: Settings,
      href: '/settings',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        ⚡ 快捷操作
      </h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link
              key={index}
              href={action.href}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-500">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {action.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Upgrade Prompt */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-500 to-secondary-sky rounded-lg text-white">
        <div className="flex items-center mb-2">
          <Crown className="w-5 h-5 mr-2" />
          <span className="font-medium">升级专业版</span>
        </div>
        <p className="text-sm opacity-90 mb-3">
          解锁更多功能，提升分析效率
        </p>
        <Button 
          size="sm" 
          variant="secondary"
          className="w-full bg-white text-primary-500 hover:bg-gray-50"
        >
          立即升级
        </Button>
      </div>

      {/* Help */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link 
          href="/help"
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          需要帮助？查看使用指南
        </Link>
      </div>
    </div>
  )
}