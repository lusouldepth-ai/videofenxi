import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Play, TrendingUp, Zap, Users } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            AI驱动的视频分析平台
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            让数据为你的
            <span className="bg-gradient-to-r from-primary-500 via-secondary-sky to-secondary-coral bg-clip-text text-transparent">
              视频创作
            </span>
            <br />赋能
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            专为自媒体创作者打造的AI视频分析工具。深度解析抖音、B站、小红书、YouTube数据，
            提供个性化优化建议，助你打造爆款内容，提升转化率。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild className="px-8 py-3">
              <Link href="/register">
                <Play className="w-5 h-5 mr-2" />
                免费开始分析
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8 py-3">
              <Link href="#demo">
                观看演示
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>已服务 10,000+ 创作者</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span>平均提升转化率 30%</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-500">videoanalyzer.pro</div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 数据卡片预览 */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                  <div className="text-primary-600 text-sm font-medium mb-2">总播放量</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">2.5M</div>
                  <div className="text-green-600 text-sm">↗ +23.5%</div>
                </div>
                <div className="bg-gradient-to-br from-secondary-coral/10 to-secondary-coral/20 rounded-xl p-6">
                  <div className="text-secondary-coral text-sm font-medium mb-2">互动率</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">8.2%</div>
                  <div className="text-green-600 text-sm">↗ +12.3%</div>
                </div>
                <div className="bg-gradient-to-br from-secondary-sky/10 to-secondary-sky/20 rounded-xl p-6">
                  <div className="text-secondary-sky text-sm font-medium mb-2">AI评分</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">92分</div>
                  <div className="text-green-600 text-sm">↗ +8分</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 装饰元素 */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary-200 rounded-full opacity-50 animate-float"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary-coral/30 rounded-full opacity-50 animate-float" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  )
}