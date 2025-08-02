import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { scrapeVideoData } from '@/lib/scrapers'
import { analyzeWithDeepSeek } from '@/lib/ai'

const analyzeSchema = z.object({
  url: z.string().url('请输入有效的视频链接'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = analyzeSchema.parse(body)

    console.log('🎯 开始分析视频:', url)

    // 1. 爬取视频数据
    const videoData = await scrapeVideoData(url)
    
    if (!videoData.success) {
      console.error('❌ 视频数据获取失败:', videoData.error)
      return NextResponse.json(
        { error: videoData.error || '视频数据获取失败' },
        { status: 400 }
      )
    }

    console.log('✅ 视频数据获取成功:', {
      platform: videoData.platform,
      title: videoData.title?.substring(0, 50) + '...',
      views: videoData.views,
      duration: videoData.duration
    })

    // 2. AI分析
    let aiAnalysis = null
    let suggestions = null
    let score = null

    try {
      console.log('🤖 开始AI分析...')
      const analysisResult = await analyzeWithDeepSeek(videoData)
      aiAnalysis = analysisResult.analysis
      suggestions = analysisResult.suggestions
      score = analysisResult.score
      console.log('✅ AI分析完成，评分:', score)
    } catch (aiError) {
      console.error('⚠️ AI分析失败:', aiError)
      // AI分析失败不阻断整个流程
      aiAnalysis = '暂时无法获取AI分析，请稍后重试'
      suggestions = ['检查网络连接', '确认API密钥配置正确']
      score = 0
    }

    // 3. 构建响应数据
    const responseData = {
      id: 'analysis-' + Date.now(),
      videoData,
      aiAnalysis,
      suggestions,
      score,
      createdAt: new Date(),
      // 展开视频数据到顶层，方便前端访问
      ...videoData,
      views: videoData.views?.toString(),
      likes: videoData.likes?.toString(),
      comments: videoData.comments?.toString(),
      shares: videoData.shares?.toString(),
    }

    console.log('🎉 分析完成')

    return NextResponse.json({
      message: '分析完成',
      data: responseData
    })

  } catch (error) {
    console.error('💥 分析过程发生错误:', error)
    return NextResponse.json(
      { error: '分析失败，请稍后重试' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Video Analysis API' })
}