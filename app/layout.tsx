import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VideoAnalyzer Pro - AI视频数据分析平台',
  description: '专为自媒体创作者打造的AI驱动视频数据分析工具，提供深度洞察和优化建议，助力内容创作者提升视频质量和转化率。',
  keywords: '视频分析,自媒体,数据分析,AI优化,抖音分析,B站分析,YouTube分析,小红书分析',
  authors: [{ name: 'VideoAnalyzer Pro Team' }],
  creator: 'VideoAnalyzer Pro',
  publisher: 'VideoAnalyzer Pro',
  metadataBase: new URL('https://videoanalyzer.pro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VideoAnalyzer Pro - AI视频数据分析平台',
    description: '专为自媒体创作者打造的AI驱动视频数据分析工具',
    url: 'https://videoanalyzer.pro',
    siteName: 'VideoAnalyzer Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VideoAnalyzer Pro',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VideoAnalyzer Pro - AI视频数据分析平台',
    description: '专为自媒体创作者打造的AI驱动视频数据分析工具',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    other: {
      baidu: 'your-baidu-site-verification',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="!mt-16"
          />
        </Providers>
      </body>
    </html>
  )
}