// 静态导出模式下不需要身份验证中间件
// 所有页面都可以直接访问

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 静态导出模式下允许所有请求
  return NextResponse.next()
}

export const config = {
  matcher: [
    // 匹配所有路径但排除静态文件
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}