import axios from 'axios'
import { VideoData } from './index'

// B站API接口
const BILIBILI_API_BASE = 'https://api.bilibili.com/x'

export async function scrapeBilibili(videoId: string, url: string): Promise<VideoData> {
  try {
    // 从URL或videoId中提取BV号或AV号
    const bvid = extractBVID(videoId, url)
    if (!bvid) {
      throw new Error('Invalid Bilibili video ID or URL')
    }

    // 获取视频基本信息
    const videoInfoResponse = await axios.get(`${BILIBILI_API_BASE}/web-interface/view`, {
      params: { bvid },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.bilibili.com/'
      }
    })

    if (videoInfoResponse.data.code !== 0) {
      throw new Error(`Bilibili API error: ${videoInfoResponse.data.message}`)
    }

    const videoData = videoInfoResponse.data.data

    // 获取UP主信息
    let uploaderInfo = null
    try {
      const uploaderResponse = await axios.get(`${BILIBILI_API_BASE}/relation/stat`, {
        params: { vmid: videoData.owner.mid },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.bilibili.com/'
        }
      })
      
      if (uploaderResponse.data.code === 0) {
        uploaderInfo = uploaderResponse.data.data
      }
    } catch (error) {
      console.warn('Failed to get uploader info:', error)
    }

    return {
      platform: 'bilibili',
      videoId,
      url,
      title: videoData.title,
      description: videoData.desc || '',
      thumbnail: videoData.pic,
      views: videoData.stat.view,
      likes: videoData.stat.like,
      comments: videoData.stat.reply,
      shares: videoData.stat.share,
      duration: videoData.duration,
      publishedAt: new Date(videoData.pubdate * 1000),
      author: {
        name: videoData.owner.name,
        avatar: videoData.owner.face,
        followers: uploaderInfo?.follower || 0
      },
      tags: videoData.tag?.map((tag: any) => tag.tag_name) || [],
      success: true
    }
  } catch (error) {
    console.error('Bilibili scraping error:', error)
    return {
      platform: 'bilibili',
      videoId,
      url,
      success: false,
      error: 'B站数据获取失败'
    }
  }
}

function extractBVID(videoId: string, url: string): string | null {
  // 从URL中提取BVID
  const bvidMatch = url.match(/(?:BV|bv)([a-zA-Z0-9]+)/i)
  if (bvidMatch) {
    return 'BV' + bvidMatch[1]
  }
  
  // 从videoId中提取BVID
  if (videoId.startsWith('BV') || videoId.startsWith('bv')) {
    return videoId.toUpperCase()
  }
  
  // 处理AV号转换为BV号的情况（这里需要额外的转换逻辑）
  const avMatch = videoId.match(/av(\d+)/i) || url.match(/av(\d+)/i)
  if (avMatch) {
    // 简化处理：直接使用AV号查询（B站API支持）
    // 实际项目中可能需要AV号到BV号的转换
    return null // 返回null使用其他方法
  }
  
  return null
}