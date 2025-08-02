# VideoAnalyzer Pro 部署指南

## 🚀 Vercel 部署步骤

### 1. 准备工作
- 确保所有代码已推送到 GitHub 仓库
- 准备好 PostgreSQL 数据库（推荐使用 Vercel Postgres）
- 获取 DeepSeek API Key

### 2. Vercel 项目设置
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 导入您的 GitHub 仓库
4. 选择 Next.js 模板

### 3. 环境变量配置
在 Vercel 项目设置中添加以下环境变量：

#### 必需环境变量
\`\`\`
# 数据库配置
POSTGRES_URL="vercel-postgres-url"
POSTGRES_PRISMA_URL="vercel-postgres-prisma-url"  
POSTGRES_URL_NON_POOLING="vercel-postgres-non-pooling-url"
POSTGRES_USER="username"
POSTGRES_HOST="hostname"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="videoanalyzer"

# 认证配置
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-super-secret-32-character-key"

# AI 服务
DEEPSEEK_API_KEY="sk-4e6752edae83455bb34de40169d459b8"

# 邮件服务
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-gmail-app-password"
FROM_EMAIL="noreply@videoanalyzer.pro"

# 应用设置
APP_NAME="VideoAnalyzer Pro"
APP_URL="https://your-domain.vercel.app"
\`\`\`

#### 可选环境变量
\`\`\`
# 支付配置（后续添加）
ALIPAY_APP_ID="your-alipay-app-id"
ALIPAY_PRIVATE_KEY="your-private-key"

# Redis 缓存（可选）
REDIS_URL="your-upstash-redis-url"
REDIS_TOKEN="your-upstash-redis-token"
\`\`\`

### 4. 数据库初始化
部署前需要初始化数据库：

\`\`\`bash
# 本地推送数据库结构到 Vercel Postgres
npx prisma db push --preview-feature
\`\`\`

### 5. 部署
1. 配置完环境变量后，点击 "Deploy"
2. 等待构建完成（约2-3分钟）
3. 访问生成的域名测试应用

## 🔧 本地开发环境

### 环境要求
- Node.js 18+
- PostgreSQL 14+
- Redis (可选)

### 安装步骤
\`\`\`bash
# 1. 克隆仓库
git clone https://github.com/your-username/videoanalyzer-pro.git
cd videoanalyzer-pro

# 2. 安装依赖
npm install

# 3. 环境变量配置
cp .env.local .env.local.example
# 编辑 .env.local 填入配置

# 4. 数据库初始化
npx prisma generate
npx prisma db push

# 5. 启动开发服务器
npm run dev
\`\`\`

## 📊 性能优化

### 1. 图片优化
- 使用 Next.js Image 组件自动优化
- 配置 CDN 加速图片加载
- 实施懒加载策略

### 2. 数据库优化
- 使用 Prisma 连接池
- 添加必要的数据库索引
- 实施查询缓存策略

### 3. API 优化
- 实施请求速率限制
- 使用 Redis 缓存频繁查询
- 优化数据库查询语句

## 🔐 安全配置

### 1. 认证安全
- 使用强密码策略
- 实施会话超时机制
- 添加异常登录检测

### 2. API 安全
- 实施 CORS 策略
- 添加请求验证中间件
- 使用 HTTPS 加密传输

### 3. 数据安全
- 加密敏感用户数据
- 实施数据备份策略
- 遵循 GDPR 合规要求

## 🚨 故障排除

### 常见问题

#### 1. 数据库连接失败
\`\`\`
Error: P1001: Can't reach database server
\`\`\`
**解决方案**: 检查数据库环境变量配置是否正确

#### 2. DeepSeek API 调用失败
\`\`\`
Error: API key invalid
\`\`\`
**解决方案**: 确认 DEEPSEEK_API_KEY 环境变量正确设置

#### 3. 邮件发送失败
\`\`\`
Error: Invalid login
\`\`\`
**解决方案**: 
- 确认 Gmail 开启了"应用专用密码"
- 检查 SMTP 配置信息

#### 4. 视频分析失败
\`\`\`
Error: Video data scraping failed
\`\`\`
**解决方案**: 
- 检查网络连接
- 确认视频链接有效
- 查看爬虫服务状态

### 监控和日志

#### 1. Vercel Analytics
- 启用 Vercel Analytics 监控性能
- 配置错误报告和警报
- 监控 API 响应时间

#### 2. 日志配置
\`\`\`javascript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log('[INFO]', message, data)
  },
  error: (message: string, error?: any) => {
    console.error('[ERROR]', message, error)
  }
}
\`\`\`

## 📈 扩展计划

### 1. 短期目标（1-3个月）
- [ ] 支付系统集成
- [ ] 竞品监控功能
- [ ] 高级数据导出
- [ ] 移动端优化

### 2. 中期目标（3-6个月）
- [ ] API 开放平台
- [ ] 团队协作功能
- [ ] 直播数据分析
- [ ] 多语言支持

### 3. 长期目标（6-12个月）
- [ ] 移动端应用
- [ ] 企业版功能
- [ ] 白标解决方案
- [ ] 国际化扩展

## 📞 技术支持

如遇到部署问题，请联系：
- 邮箱: tech@videoanalyzer.pro
- 文档: https://docs.videoanalyzer.pro
- GitHub Issues: https://github.com/your-repo/issues

---

🎉 部署完成后，您的 VideoAnalyzer Pro 就可以为用户提供专业的视频分析服务了！