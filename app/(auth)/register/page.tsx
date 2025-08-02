'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Mail, Lock, Eye, EyeOff, User, BarChart3, Check } from 'lucide-react'
import { toast } from 'react-toastify'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreeTerms) {
      toast.error('请同意服务条款')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('两次输入的密码不一致')
      return
    }

    if (formData.password.length < 6) {
      toast.error('密码至少需要6个字符')
      return
    }

    setIsLoading(true)

    try {
      // 演示模式：模拟注册成功
      await new Promise(resolve => setTimeout(resolve, 1500)) // 模拟API延迟
      
      // 简单的客户端验证
      if (formData.email && formData.password && formData.name) {
        toast.success('注册成功！正在为您跳转到登录页面...')
        setTimeout(() => {
          router.push('/login')
        }, 1000)
      } else {
        toast.error('请填写完整信息')
      }
    } catch (error) {
      toast.error('注册失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-secondary-sky/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-sky rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">VideoAnalyzer Pro</span>
          </Link>
          <p className="text-gray-600">创建您的账户，开始数据分析之旅</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                姓名
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input pl-10"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input pl-10"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input pl-10 pr-10"
                  placeholder="请输入密码（至少6个字符）"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input pl-10 pr-10"
                  placeholder="请再次输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-600">
                  我已阅读并同意
                  <Link href="/terms" className="text-primary-500 hover:text-primary-600">
                    服务条款
                  </Link>
                  和
                  <Link href="/privacy" className="text-primary-500 hover:text-primary-600">
                    隐私政策
                  </Link>
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading || !agreeTerms}
            >
              {isLoading ? '注册中...' : '注册并开始7天免费试用'}
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <h4 className="text-sm font-medium text-primary-900 mb-3">🎉 注册即享：</h4>
            <ul className="space-y-2 text-sm text-primary-700">
              <li className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-primary-500" />
                7天专业版免费试用
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-primary-500" />
                每日3次免费视频分析
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-primary-500" />
                AI优化建议体验
              </li>
            </ul>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">已有账户？</span>
            <Link href="/login" className="ml-2 text-primary-500 hover:text-primary-600 font-medium">
              立即登录
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}