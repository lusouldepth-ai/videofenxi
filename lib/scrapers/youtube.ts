import axios from 'axios'
import { VideoData } from './index'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'

export async function scrapeYouTube(videoId: string, url: string): Promise<VideoData> {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API Key not configured')
    }

    // Get video details
    const videoResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY
      }
    })

    if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
      throw new Error('Video not found')
    }

    const video = videoResponse.data.items[0]

    // Get channel details for subscriber count
    let subscriberCount = 0
    try {
      const channelResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/channels`, {
        params: {
          part: 'statistics',
          id: video.snippet.channelId,
          key: YOUTUBE_API_KEY
        }
      })
      
      if (channelResponse.data.items && channelResponse.data.items.length > 0) {
        subscriberCount = parseInt(channelResponse.data.items[0].statistics.subscriberCount || '0')
      }
    } catch (error) {
      console.warn('Failed to get channel subscriber count:', error)
    }
    
    // 解析时长 (PT12M34S -> 754秒)
    const duration = parseDuration(video.contentDetails.duration)
    
    return {
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
  } catch (error) {
    console.error('YouTube scraping error:', error)
    return {
      platform: 'youtube',
      videoId,
      url,
      success: false,
      error: 'YouTube数据获取失败'
    }
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