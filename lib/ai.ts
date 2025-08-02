import axios from 'axios'
import { VideoData } from '@/lib/scrapers'

interface AIAnalysisResult {
  analysis: any
  suggestions: any
  score: number
}

export async function analyzeWithDeepSeek(videoData: VideoData): Promise<AIAnalysisResult> {
  try {
    const prompt = `
作为专业的视频内容分析师，请分析以下视频数据并提供优化建议：

视频信息：
- 平台: ${videoData.platform}
- 标题: ${videoData.title}
- 描述: ${videoData.description}
- 时长: ${videoData.duration}秒
- 播放量: ${videoData.views}
- 点赞数: ${videoData.likes}
- 评论数: ${videoData.comments}
- 分享数: ${videoData.shares}
- 标签: ${videoData.tags?.join(', ')}
- 作者: ${videoData.author?.name}
- 粉丝数: ${videoData.author?.followers}

请从以下几个维度进行分析：

1. 内容质量评估 (1-100分)
2. 标题优化建议
3. 封面优化建议
4. 发布时机建议
5. 标签优化建议
6. 互动率分析
7. 传播潜力预测
8. 具体改进建议

请以JSON格式返回分析结果，包含：
{
  "score": 数字评分,
  "analysis": {
    "content_quality": "内容质量分析",
    "engagement_rate": "互动率分析",
    "viral_potential": "传播潜力",
    "strengths": ["优势点1", "优势点2"],
    "weaknesses": ["待改进点1", "待改进点2"]
  },
  "suggestions": {
    "title": "标题优化建议",
    "thumbnail": "封面优化建议", 
    "timing": "发布时机建议",
    "tags": ["推荐标签1", "推荐标签2"],
    "content": "内容优化建议"
  }
}
`

    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的短视频内容分析师，擅长分析视频数据并提供精准的优化建议。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const aiResponse = response.data.choices[0].message.content
    
    try {
      // 尝试解析JSON响应
      const parsed = JSON.parse(aiResponse)
      return {
        analysis: parsed.analysis,
        suggestions: parsed.suggestions,
        score: parsed.score
      }
    } catch (parseError) {
      // 如果JSON解析失败，返回基础分析
      return generateBasicAnalysis(videoData)
    }

  } catch (error) {
    console.error('DeepSeek API调用失败:', error)
    // 返回基础分析作为备选
    return generateBasicAnalysis(videoData)
  }
}

// 基础分析功能（当AI API失败时使用）
function generateBasicAnalysis(videoData: VideoData): AIAnalysisResult {
  const views = videoData.views || 0
  const likes = videoData.likes || 0
  const comments = videoData.comments || 0
  const shares = videoData.shares || 0
  
  // 计算互动率
  const engagementRate = views > 0 ? ((likes + comments + shares) / views * 100) : 0
  
  // 基础评分逻辑
  let score = 60 // 基础分
  
  // 根据互动率调整分数
  if (engagementRate > 5) score += 20
  else if (engagementRate > 3) score += 15
  else if (engagementRate > 1) score += 10
  
  // 根据播放量调整分数
  if (views > 100000) score += 10
  else if (views > 10000) score += 5
  
  // 根据标题长度调整分数
  const titleLength = videoData.title?.length || 0
  if (titleLength >= 10 && titleLength <= 30) score += 5
  
  score = Math.min(100, Math.max(0, score))

  return {
    analysis: {
      content_quality: generateContentQualityAnalysis(videoData, engagementRate),
      engagement_rate: `互动率为 ${engagementRate.toFixed(2)}%`,
      viral_potential: generateViralPotential(views, engagementRate),
      strengths: generateStrengths(videoData, engagementRate),
      weaknesses: generateWeaknesses(videoData, engagementRate)
    },
    suggestions: {
      title: generateTitleSuggestion(videoData.title),
      thumbnail: "建议使用对比度高的封面图，突出主题，添加文字说明",
      timing: generateTimingSuggestion(videoData.platform),
      tags: generateTagSuggestions(videoData.platform),
      content: "建议在开头3秒内抓住观众注意力，保持内容节奏紧凑"
    },
    score
  }
}

function generateContentQualityAnalysis(videoData: VideoData, engagementRate: number): string {
  if (engagementRate > 5) {
    return "内容质量优秀，观众互动积极，说明内容具有很强的吸引力和价值"
  } else if (engagementRate > 2) {
    return "内容质量良好，有一定的观众基础，可进一步优化提升互动"
  } else {
    return "内容需要优化，建议从标题、开头、节奏等方面改进以提升观众兴趣"
  }
}

function generateViralPotential(views: number, engagementRate: number): string {
  if (views > 50000 && engagementRate > 3) {
    return "具有很高的传播潜力，建议持续产出类似高质量内容"
  } else if (views > 10000 || engagementRate > 2) {
    return "具有中等传播潜力，优化内容和发布策略可进一步提升"
  } else {
    return "传播潜力有限，需要从内容创作和推广策略两方面改进"
  }
}

function generateStrengths(videoData: VideoData, engagementRate: number): string[] {
  const strengths = []
  
  if (engagementRate > 3) strengths.push("互动率表现优秀")
  if (videoData.title && videoData.title.length > 10) strengths.push("标题描述充分")
  if (videoData.tags && videoData.tags.length > 3) strengths.push("标签使用丰富")
  if (videoData.duration && videoData.duration < 180) strengths.push("视频时长适中")
  
  return strengths.length > 0 ? strengths : ["内容具有基础传播价值"]
}

function generateWeaknesses(videoData: VideoData, engagementRate: number): string[] {
  const weaknesses = []
  
  if (engagementRate < 2) weaknesses.push("互动率偏低，需提升内容吸引力")
  if (!videoData.title || videoData.title.length < 10) weaknesses.push("标题过于简短")
  if (!videoData.tags || videoData.tags.length < 3) weaknesses.push("标签使用不足")
  if (videoData.duration && videoData.duration > 300) weaknesses.push("视频时长过长")
  
  return weaknesses.length > 0 ? weaknesses : ["暂无明显不足"]
}

function generateTitleSuggestion(title?: string): string {
  if (!title) return "建议添加吸引人的标题，包含关键词和情感元素"
  
  if (title.length < 10) {
    return "标题偏短，建议扩展到15-25字，增加描述性词汇和情感词汇"
  } else if (title.length > 35) {
    return "标题过长，建议精简到25字以内，突出核心卖点"
  } else {
    return "标题长度合适，可考虑添加数字、问号或感叹号增强吸引力"
  }
}

function generateTimingSuggestion(platform: string): string {
  const timingMap: { [key: string]: string } = {
    'douyin': '建议在19:00-22:00发布，这是抖音用户活跃度最高的时段',
    'bilibili': '建议在20:00-23:00发布，B站用户晚间观看习惯较强',
    'xiaohongshu': '建议在11:00-13:00或19:00-21:00发布，符合小红书用户作息',
    'youtube': '建议在20:00-22:00发布（北京时间），考虑全球用户分布'
  }
  
  return timingMap[platform] || '建议在用户活跃度高的时段发布，通常为晚间19:00-22:00'
}

function generateTagSuggestions(platform: string): string[] {
  const tagMap: { [key: string]: string[] } = {
    'douyin': ['热门', '推荐', '干货分享', '实用技巧'],
    'bilibili': ['知识分享', '学习', '干货', '教程'],
    'xiaohongshu': ['种草', '分享', '好物推荐', '生活方式'],
    'youtube': ['tutorial', 'howto', 'tips', 'guide']
  }
  
  return tagMap[platform] || ['教程', '分享', '干货', '实用']
}