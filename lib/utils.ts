import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function extractVideoId(url: string): { platform: string; videoId: string } | null {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return { platform: 'youtube', videoId: youtubeMatch[1] }
  }

  // 抖音
  const douyinRegex = /(?:douyin\.com\/video\/|v\.douyin\.com\/[A-Za-z0-9]+)/
  if (douyinRegex.test(url)) {
    const videoId = url.split('/').pop()?.split('?')[0] || ''
    return { platform: 'douyin', videoId }
  }

  // B站
  const biliRegex = /bilibili\.com\/video\/(av\d+|BV[A-Za-z0-9]+)/
  const biliMatch = url.match(biliRegex)
  if (biliMatch) {
    return { platform: 'bilibili', videoId: biliMatch[1] }
  }

  // 小红书
  const xiaohongshuRegex = /xiaohongshu\.com\/(?:explore\/|discovery\/item\/)([A-Za-z0-9]+)/
  const xiaohongshuMatch = url.match(xiaohongshuRegex)
  if (xiaohongshuMatch) {
    return { platform: 'xiaohongshu', videoId: xiaohongshuMatch[1] }
  }

  return null
}

export function isPremiumFeature(userPlan: string, feature: string): boolean {
  if (userPlan === 'premium') return true
  
  const freeFeatures = ['basic-analysis', 'trending-videos']
  return freeFeatures.includes(feature)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}