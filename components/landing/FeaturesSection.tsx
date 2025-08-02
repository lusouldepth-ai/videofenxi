import { BarChart3, Brain, Users, TrendingUp, Download, Shield } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: '多平台数据分析',
    description: '支持抖音、B站、小红书、YouTube等主流平台，一站式监控视频数据表现',
    color: 'text-primary-500'
  },
  {
    icon: Brain,
    title: 'AI智能优化',
    description: '基于DeepSeek AI分析视频内容，提供个性化的标题、封面、发布时机优化建议',
    color: 'text-secondary-coral'
  },
  {
    icon: Users,
    title: '竞品监控分析',
    description: '实时追踪竞争对手动态，分析爆款内容策略，发现差异化机会',
    color: 'text-secondary-sky'
  },
  {
    icon: TrendingUp,
    title: '趋势洞察预测',
    description: '捕捉热门话题和标签趋势，预测内容传播潜力，抓住流量红利',
    color: 'text-secondary-lavender'
  },
  {
    icon: Download,
    title: '数据导出报告',
    description: '生成专业的Excel/PDF分析报告，支持团队协作和汇报展示',
    color: 'text-secondary-peach'
  },
  {
    icon: Shield,
    title: '安全可靠保障',
    description: '企业级数据安全保护，符合隐私法规要求，用户数据绝对安全',
    color: 'text-green-500'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            强大功能，助力创作
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们深度调研了1000+创作者的真实需求，打造最实用的视频分析工具
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-500 to-secondary-sky rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-primary-100">创作者信赖</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">30%</div>
              <div className="text-primary-100">平均提升转化率</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-primary-100">视频分析次数</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}