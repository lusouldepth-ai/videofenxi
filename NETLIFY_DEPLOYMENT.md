# VideoFenxi Netlify 部署指南

## 🚀 Netlify 部署步骤

### 1. 数据库设置 (Supabase)

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目，命名为 `videofenxi`
3. 在项目设置中获取以下信息：
   - Project URL: `https://your-project.supabase.co`
   - API Keys (anon/public key)
   - Service Role Key
   - Database Password

### 2. GitHub 仓库准备

确保代码已推送到 GitHub：
```bash
git add .
git commit -m "Configure for Netlify deployment"
git push origin main
```

### 3. Netlify 部署

1. 访问 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 GitHub 并授权
4. 选择 `videofenxi` 仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

### 4. 环境变量配置

在 Netlify Site Settings > Environment Variables 中添加：

```bash
# Database (Supabase)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
SUPABASE_URL=https://[PROJECT-ID].supabase.co
SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]

# NextAuth
NEXTAUTH_URL=https://videofenxi.netlify.app
NEXTAUTH_SECRET=videofenxi-super-secret-key-2024-deepseek-ai-analysis-platform

# APIs
DEEPSEEK_API_KEY=sk-09406f84dc5d49ed9d876b6e7c13205f
YOUTUBE_API_KEY=AIzaSyBOQ9tkx0SMcOYFocZeuTQ2t2n69oUnVUk

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=lusouldepth@gmail.com
SMTP_PASS=[YOUR-GMAIL-APP-PASSWORD]
FROM_EMAIL=noreply@videofenxi.com

# Application Settings
APP_NAME=VideoFenxi - 视频分析平台
APP_URL=https://videofenxi.com
```

### 5. 自定义域名配置

1. 在 Netlify Site Settings > Domain Management
2. 添加自定义域名: `videofenxi.com`
3. 配置 DNS 记录：
   - A record: `@` → `75.2.60.5`
   - CNAME: `www` → `your-site.netlify.app`

### 6. 数据库初始化

部署后，在本地运行数据库迁移：
```bash
# 使用 Supabase DATABASE_URL
npx prisma db push
```

### 7. SSL 证书

Netlify 会自动配置 Let's Encrypt SSL 证书。

## 🔧 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本 (需要 18+)
   - 确认所有依赖已安装

2. **数据库连接失败**
   - 验证 Supabase DATABASE_URL 格式正确
   - 确认 Supabase 项目状态正常

3. **API 调用失败**
   - 检查环境变量配置
   - 确认 API 密钥有效

### 监控和日志

- Netlify Functions Logs: Site Settings > Functions
- Build Logs: Deploys > [Deployment] > Deploy log
- Real-time logs: `netlify logs`

## 📈 性能优化

1. **启用 Netlify Analytics**
2. **配置 CDN 缓存**
3. **图片优化**: 使用 Netlify Image Transformation
4. **分支预览**: 自动为 PR 创建预览部署

## 🚦 部署状态

部署完成后，网站将在以下地址可用：
- 临时域名: `https://videofenxi.netlify.app`
- 自定义域名: `https://videofenxi.com`

## 🔄 自动部署

配置完成后，每次推送到 `main` 分支都会自动触发部署。