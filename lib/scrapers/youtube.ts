import axios from 'axios'
import { VideoData } from './index'

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'

export async function scrapeYouTube(videoId: string, url: string): Promise<VideoData> {
  try {
    console.log('🎬 开始获取YouTube视频数据:', { videoId, url })
    
    if (!YOUTUBE_API_KEY) {
      console.warn('⚠️ YouTube API Key未配置')
      throw new Error('YouTube API Key未配置')
    }

    console.log('🔑 使用API Key获取视频详情...')
    
    // 获取视频详情
    const videoResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY
      },
      timeout: 10000
    })

    if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
      throw new Error('视频未找到或已被删除')
    }

    const video = videoResponse.data.items[0]
    console.log('✅ YouTube视频信息获取成功')

    // 获取频道订阅者数量
    let subscriberCount = 0
    try {
      console.log('👤 获取频道信息...')
      const channelResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/channels`, {
        params: {
          part: 'statistics',
          id: video.snippet.channelId,
          key: YOUTUBE_API_KEY
        },
        timeout: 5000
      })
      
      if (channelResponse.data.items && channelResponse.data.items.length > 0) {
        subscriberCount = parseInt(channelResponse.data.items[0].statistics.subscriberCount || '0')
        console.log('✅ 频道信息获取成功，订阅者:', subscriberCount)
      }
    } catch (error) {
      console.warn('⚠️ 频道信息获取失败:', error instanceof Error ? error.message : String(error))
    }
    
    // 解析时长 (PT12M34S -> 754秒)
    const duration = parseDuration(video.contentDetails.duration)
    
    const result = {
      platform: 'youtube',
      videoId,
      url,
      title: video.snippet.title,
      description: video.snippet.description || '',
      thumbnail: video.snippet.thumbnails?.maxresdefault?.url || 
                 video.snippet.thumbnails?.high?.url || 
                 video.snippet.thumbnails?.medium?.url ||
                 video.snippet.thumbnails?.default?.url,
      views: parseInt(video.statistics.viewCount || '0'),
      likes: parseInt(video.statistics.likeCount || '0'),
      comments: parseInt(video.statistics.commentCount || '0'),
      shares: 0, // YouTube API不提供分享数
      duration,
      publishedAt: new Date(video.snippet.publishedAt),
      author: {
        name: video.snippet.channelTitle,
        followers: subscriberCount
      },
      tags: video.snippet.tags || [],
      success: true
    }

    console.log('🎉 YouTube数据获取完成:', {
      title: result.title,
      views: result.views,
      likes: result.likes,
      duration: result.duration,
      author: result.author.name
    })

    return result
  } catch (error) {
    console.warn('YouTube API unavailable, using demo data:', error)
    // API不可用或CORS错误时，返回演示数据
    return getYouTubeDemoData(videoId, url)
  }
}

// 获取YouTube演示数据
function getYouTubeDemoData(videoId: string, url: string): VideoData {
  // 生成基于URL的随机但一致的数据
  const urlHash = url.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const baseViews = 100000 + (urlHash % 1000000)
  const baseLikes = Math.floor(baseViews * (0.02 + (urlHash % 80) / 1000))
  const baseComments = Math.floor(baseLikes * (0.05 + (urlHash % 30) / 1000))
  const baseDuration = 120 + (urlHash % 800) // 2-15分钟
  
  return {
    platform: 'youtube',
    videoId,
    url,
    title: `【演示数据】YouTube视频ID: ${videoId} 的分析结果`,
    description: '这是演示数据。在实际部署中，我们会尝试获取真实的YouTube视频数据。如果API可用，您将看到真实的视频标题、描述、播放量等信息。当前显示的数据是基于视频URL生成的演示数据。',
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    views: baseViews,
    likes: baseLikes,
    comments: baseComments,
    shares: 0, // YouTube API不提供分享数
    duration: baseDuration,
    publishedAt: new Date(Date.now() - (urlHash % 10) * 86400000), // 0-10天前
    author: {
      name: '演示频道',
      followers: 50000 + (urlHash % 200000)
    },
    tags: ['演示数据', 'YouTube', '视频分析', 'AI分析'],
    success: true
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  
  const hours = parseInt(match[1]) || 0
  const minutes = parseInt(match[2]) || 0
  const seconds = parseInt(match[3]) || 0
  
  return hours * 3600 + minutes * 60 + seconds
}