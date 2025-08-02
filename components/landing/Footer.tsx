import Link from 'next/link'
import { BarChart3, Mail, Github, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-sky rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">VideoAnalyzer Pro</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              专为自媒体创作者打造的AI视频数据分析平台，让数据为你的创作赋能，助力打造爆款内容。
            </p>
            <div className="flex space-x-4">
              <a href="mailto:support@videoanalyzer.pro" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://github.com/videoanalyzer-pro" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/videoanalyzer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">产品</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">功能特性</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">价格方案</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white transition-colors">产品演示</Link></li>
              <li><Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors">API文档</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">支持</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">帮助中心</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">联系我们</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">创作技巧</Link></li>
              <li><Link href="/community" className="text-gray-400 hover:text-white transition-colors">用户社区</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 VideoAnalyzer Pro. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              隐私政策
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              服务条款
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}