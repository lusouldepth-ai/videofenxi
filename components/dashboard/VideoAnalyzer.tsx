'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Link2, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { formatNumber } from '@/lib/utils'
import { analyzeVideoClient } from '@/lib/client-api'

interface VideoAnalyzerProps {
  onAnalysisComplete?: (data: any) => void
}

export function VideoAnalyzer({ onAnalysisComplete }: VideoAnalyzerProps) {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error('请输入视频链接')
      return
    }

    setIsAnalyzing(true)
    
    try {
      const result = await analyzeVideoClient(url.trim())

      if (result.success) {
        setAnalysisResult(result.data)
        onAnalysisComplete?.(result.data)
        toast.success('分析完成！')
      } else {
        toast.error(result.error || '分析失败')
      }
    } catch (error) {
      toast.error('分析失败，请稍后重试')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNewAnalysis = () => {
    setUrl('')
    setAnalysisResult(null)
  }

  if (analysisResult) {
    return (
      <div className="space-y-6">
        {/* Analysis Result Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium text-gray-900">分析完成</span>
          </div>
          <Button onClick={handleNewAnalysis} variant="outline" size="sm">
            新的分析
          </Button>
        </div>

        {/* Video Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            {analysisResult.thumbnail && (
              <img
                src={analysisResult.thumbnail}
                alt="视频缩略图"
                className="w-24 h-16 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">
                {analysisResult.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                平台：{analysisResult.platform} | 
                时长：{Math.floor((analysisResult.duration || 0) / 60)}分{(analysisResult.duration || 0) % 60}秒
              </p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>播放：{formatNumber(parseInt(analysisResult.views || '0'))}</span>
                <span>点赞：{formatNumber(parseInt(analysisResult.likes || '0'))}</span>
                <span>评论：{formatNumber(parseInt(analysisResult.comments || '0'))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Score */}
        {analysisResult.score && (
          <div className="bg-gradient-to-r from-primary-50 to-secondary-sky/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">AI评分</span>
              <span className="text-2xl font-bold text-primary-500">
                {analysisResult.score}分
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-sky h-2 rounded-full"
                style={{ width: `${analysisResult.score}%` }}
              />
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        {analysisResult.suggestions && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">🤖 AI优化建议</h4>
            <div className="space-y-3">
              {analysisResult.suggestions.title && (
                <div>
                  <span className="text-sm font-medium text-gray-700">标题优化：</span>
                  <p className="text-sm text-gray-600 mt-1">{analysisResult.suggestions.title}</p>
                </div>
              )}
              {analysisResult.suggestions.thumbnail && (
                <div>
                  <span className="text-sm font-medium text-gray-700">封面建议：</span>
                  <p className="text-sm text-gray-600 mt-1">{analysisResult.suggestions.thumbnail}</p>
                </div>
              )}
              {analysisResult.suggestions.timing && (
                <div>
                  <span className="text-sm font-medium text-gray-700">发布时机：</span>
                  <p className="text-sm text-gray-600 mt-1">{analysisResult.suggestions.timing}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button size="sm" variant="outline">
            导出报告
          </Button>
          <Button size="sm" variant="outline">
            分享结果
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          视频链接
        </label>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input pl-10"
            placeholder="粘贴抖音、B站、小红书或YouTube视频链接..."
            disabled={isAnalyzing}
          />
        </div>
      </div>

      {/* Platform Support */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          抖音
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          B站
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
          小红书
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          YouTube
        </span>
      </div>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !url.trim()}
        className="w-full"
        size="lg"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            AI分析中...
          </>
        ) : (
          '开始分析'
        )}
      </Button>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">💡 分析提示</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 确保视频链接完整且可访问</li>
              <li>• AI分析需要30-60秒，请耐心等待</li>
              <li>• 分析结果包含数据洞察和优化建议</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}