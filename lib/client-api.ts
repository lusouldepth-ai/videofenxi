// 客户端API调用函数 - 用于静态导出
import { scrapeVideoData } from './scrapers'
import { analyzeWithDeepSeek } from './ai'

export async function analyzeVideoClient(url: string) {
  try {
    // 直接在客户端调用爬虫和AI分析
    const videoData = await scrapeVideoData(url)
    
    if (!videoData.success) {
      throw new Error(videoData.error || '视频数据获取失败')
    }

    // AI分析
    let aiAnalysis = null
    let suggestions = null
    let score = null

    try {
      const analysisResult = await analyzeWithDeepSeek(videoData)
      aiAnalysis = analysisResult.analysis
      suggestions = analysisResult.suggestions
      score = analysisResult.score
    } catch (aiError) {
      console.warn('AI分析失败:', aiError)
      // AI分析失败不阻断整个流程
      aiAnalysis = '暂时无法获取AI分析，请稍后重试'
      suggestions = ['检查网络连接', '确认API密钥配置正确']
      score = 0
    }

    return {
      success: true,
      data: {
        id: 'client-' + Date.now(),
        videoData,
        aiAnalysis,
        suggestions,
        score,
        createdAt: new Date(),
        views: videoData.views?.toString(),
        likes: videoData.likes?.toString(),
        comments: videoData.comments?.toString(),
        shares: videoData.shares?.toString(),
      }
    }
  } catch (error) {
    console.error('视频分析错误:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '分析失败，请稍后重试'
    }
  }
}

// 模拟用户登录状态管理
export const mockAuth = {
  user: {
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@videofenxi.com',
    isPremium: true,
    avatar: null
  },
  isAuthenticated: true
}

// 模拟数据获取函数
export async function getMockUserData() {
  return {
    totalAnalyses: 42,
    todayAnalyses: 8,
    averageScore: 87,
    competitorsTracked: 5,
    recentAnalyses: [
      {
        id: '1',
        title: '如何使用AI工具提升工作效率',
        platform: 'YOUTUBE',
        thumbnail: 'https://i.ytimg.com/vi/sample/maxresdefault.jpg',
        views: '156789',
        score: 87,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2', 
        title: '3分钟学会制作爆款短视频',
        platform: 'DOUYIN',
        views: '2845673',
        score: 92,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: '3',
        title: '2024年B站UP主必备技巧',
        platform: 'BILIBILI',
        views: '234567',
        score: 85,
        createdAt: new Date(Date.now() - 259200000).toISOString()
      }
    ]
  }
}