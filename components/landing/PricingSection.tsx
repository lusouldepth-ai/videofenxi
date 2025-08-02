import { Check, X, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const plans = [
  {
    name: '免费体验',
    price: '¥0',
    period: '/永久',
    description: '适合新手创作者体验产品功能',
    features: [
      { text: '每日分析3个视频', included: true },
      { text: '基础数据展示', included: true },
      { text: '热门榜单查看', included: true },
      { text: '社区支持', included: true },
      { text: 'AI深度分析', included: false },
      { text: '竞品监控', included: false },
      { text: '数据导出', included: false },
      { text: '优先客服', included: false },
    ],
    cta: '免费开始',
    href: '/register',
    popular: false
  },
  {
    name: '专业版',
    price: '¥39',
    period: '/月',
    yearlyPrice: '¥360',
    yearlyPeriod: '/年',
    description: '专业创作者的最佳选择，功能全面',
    features: [
      { text: '无限视频分析', included: true },
      { text: 'AI深度优化建议', included: true },
      { text: '竞品监控(最多10个)', included: true },
      { text: '高级数据导出', included: true },
      { text: '趋势洞察预测', included: true },
      { text: '多账号管理', included: true },
      { text: '团队协作(3人)', included: true },
      { text: '优先客服支持', included: true },
    ],
    cta: '立即升级',
    href: '/register?plan=monthly',
    popular: true
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            简单透明的价格
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            仅需竞品1/10的价格，获得同样强大的功能。7天免费试用，随时可取消
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary-500 shadow-lg' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-coral text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    最受欢迎
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 ml-1">
                    {plan.period}
                  </span>
                </div>
                {plan.yearlyPrice && (
                  <div className="text-sm text-gray-500">
                    年付 {plan.yearlyPrice}{plan.yearlyPeriod} 
                    <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      省23%
                    </span>
                  </div>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                    )}
                    <span className={`${
                      feature.included ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                asChild 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-sky hover:from-primary-600 hover:to-secondary-sky/90' 
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                size="lg"
              >
                <Link href={plan.href}>
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              💡 为什么选择我们？
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <div className="font-medium text-gray-900 mb-2">极致性价比</div>
                <div>同等功能价格仅为竞品1/10，让每个创作者都用得起专业工具</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-2">AI技术领先</div>
                <div>基于DeepSeek最新AI技术，分析精度和建议质量行业领先</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-2">数据安全保障</div>
                <div>企业级安全防护，用户隐私和数据绝对安全，合规可靠</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}