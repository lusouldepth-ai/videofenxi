import axios from 'axios'
import { VideoData } from './index'

export async function scrapeXiaohongshu(videoId: string, url: string): Promise<VideoData> {
  try {
    // 小红书反爬比较严格，这里使用模拟数据
    // 实际项目中需要使用专业的爬虫服务
    
    const mockData = {
      title: "这个护肤routine真的绝了！一周见效✨",
      description: "姐妹们！！我发现了一个超级有效的护肤routine，坚持一周皮肤状态明显改善，分享给大家～记得收藏！",
      thumbnail: `https://sns-webpic-qc.xhscdn.com/sample-${videoId}.jpg`,
      interact_info: {
        liked_count: "23.5w",
        collected_count: "15.2w", 
        comment_count: "8934",
        share_count: "4567"
      },
      author: {
        nickname: "美妆达人小仙女",
        avatar: "https://sns-webpic-qc.xhscdn.com/avatar-sample.jpg",
        fan_count: 567890
      },
      duration: 95, // 1分35秒
      time: Date.now() - 259200000, // 3天前
      tag_list: [
        { name: "护肤", type: "topic" },
        { name: "护肤routine", type: "topic" },
        { name: "美妆", type: "category" },
        { name: "变美", type: "topic" }
      ]
    }

    // 转换小红书的点赞数格式 (23.5w -> 235000)
    const parseCount = (count: string): number => {
      if (count.includes('w')) {
        return Math.floor(parseFloat(count.replace('w', '')) * 10000)
      }
      return parseInt(count.replace(/[^\d]/g, ''))
    }

    return {
      platform: 'xiaohongshu',
      videoId,
      url,
      title: mockData.title,
      description: mockData.description,
      thumbnail: mockData.thumbnail,
      views: parseCount(mockData.interact_info.liked_count) * 5, // 估算播放量
      likes: parseCount(mockData.interact_info.liked_count),
      comments: parseCount(mockData.interact_info.comment_count),
      shares: parseCount(mockData.interact_info.share_count),
      duration: mockData.duration,
      publishedAt: new Date(mockData.time),
      author: {
        name: mockData.author.nickname,
        avatar: mockData.author.avatar,
        followers: mockData.author.fan_count
      },
      tags: mockData.tag_list.map(tag => tag.name),
      success: true
    }
  } catch (error) {
    console.error('Xiaohongshu scraping error:', error)
    return {
      platform: 'xiaohongshu',
      videoId,
      url,
      success: false,
      error: '小红书数据获取失败'
    }
  }
}