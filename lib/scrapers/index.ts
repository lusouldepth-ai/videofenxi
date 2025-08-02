import { extractVideoId } from '@/lib/utils'
import { scrapeYouTube } from './youtube'
import { scrapeDouyin } from './douyin'
import { scrapeBilibili } from './bilibili'
import { scrapeXiaohongshu } from './xiaohongshu'

export interface VideoData {
  platform: string
  videoId: string
  url: string
  title?: string
  description?: string
  thumbnail?: string
  views?: number
  likes?: number
  comments?: number
  shares?: number
  duration?: number
  publishedAt?: Date
  author?: {
    name: string
    avatar?: string
    followers?: number
  }
  tags?: string[]
  success: boolean
  error?: string
}

export async function scrapeVideoData(url: string): Promise<VideoData> {
  const videoInfo = extractVideoId(url)
  
  if (!videoInfo) {
    return {
      platform: 'unknown',
      videoId: '',
      url,
      success: false,
      error: '不支持的视频链接格式'
    }
  }

  const { platform, videoId } = videoInfo

  try {
    switch (platform) {
      case 'youtube':
        return await scrapeYouTube(videoId, url)
      case 'douyin':
        return await scrapeDouyin(videoId, url)
      case 'bilibili':
        return await scrapeBilibili(videoId, url)
      case 'xiaohongshu':
        return await scrapeXiaohongshu(videoId, url)
      default:
        return {
          platform,
          videoId,
          url,
          success: false,
          error: '暂不支持该平台'
        }
    }
  } catch (error) {
    console.error(`爬取 ${platform} 数据失败:`, error)
    return {
      platform,
      videoId,
      url,
      success: false,
      error: '数据爬取失败，请稍后重试'
    }
  }
}