# VideoAnalyzer Pro

🚀 **AI驱动的视频数据分析平台** - 专为自媒体创作者打造

## 🎯 项目特色

- **🤖 AI智能分析**: 基于DeepSeek提供深度视频内容分析和优化建议
- **📊 多平台支持**: 支持抖音、B站、小红书、YouTube等主流平台
- **💰 极致性价比**: 39元/月，仅为竞品价格的1/10
- **🎨 简约设计**: 马卡龙色系，大量留白，专注用户体验
- **⚡ 高性能**: Next.js 14 + TypeScript + Prisma 现代化技术栈

## 🛠️ 技术栈

### 前端
- **Next.js 14** - 全栈React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化CSS框架
- **Framer Motion** - 动画库
- **NextAuth.js** - 身份认证

### 后端
- **Next.js API Routes** - 无服务器API
- **Prisma ORM** - 数据库操作
- **PostgreSQL** - 主数据库
- **Redis** - 缓存系统

### AI & 数据
- **DeepSeek API** - AI分析引擎
- **自研爬虫** - 多平台数据获取
- **Recharts** - 数据可视化

## 📦 快速开始

### 1. 环境要求
- Node.js 18+
- PostgreSQL 数据库
- Redis (可选)

### 2. 安装依赖
\`\`\`bash
npm install
\`\`\`

### 3. 环境变量配置
复制 \`.env.local\` 文件并填入相应配置：
\`\`\`bash
cp .env.local .env.local.example
\`\`\`

### 4. 数据库初始化
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 5. 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🚀 部署

### Vercel 部署（推荐）
1. Fork 此仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

### 环境变量清单
\`\`\`
# 数据库
DATABASE_URL="postgresql://..."
POSTGRES_URL="vercel-postgres-url"

# 认证
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"

# AI服务
DEEPSEEK_API_KEY="sk-..."

# 邮件服务
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# 支付（可选）
ALIPAY_APP_ID="your-alipay-app-id"
\`\`\`

## 📋 功能清单

### ✅ 已完成
- [x] 用户认证系统（注册/登录）
- [x] 多平台视频链接识别
- [x] 基础数据爬取（模拟数据）
- [x] DeepSeek AI分析集成
- [x] 响应式仪表盘界面
- [x] 分析历史记录
- [x] 邮件通知系统

### 🚧 开发中
- [ ] 支付系统集成
- [ ] 竞品监控功能
- [ ] 数据导出功能
- [ ] 高级图表分析
- [ ] 团队协作功能

### 📅 规划中
- [ ] 移动端应用
- [ ] API开放平台
- [ ] 直播数据分析
- [ ] 内容推荐系统

## 🎨 设计系统

### 颜色规范
- **主色调**: #4ECDC4 (薄荷绿)
- **辅助色**: #FF6B6B (珊瑚粉), #45B7D1 (天空蓝)
- **中性色**: #2C3E50 (深灰), #7F8C8D (中灰)

### 组件库
项目使用自定义组件库，基于 Radix UI 和 Tailwind CSS 构建：
- Button - 按钮组件
- Card - 卡片组件
- Input - 输入框组件
- Modal - 弹窗组件

## 🔧 开发指南

### 项目结构
\`\`\`
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # 认证相关页面
│   ├── (dashboard)/    # 仪表盘页面
│   └── api/            # API路由
├── components/         # React组件
│   ├── ui/            # 基础UI组件
│   ├── dashboard/     # 仪表盘组件
│   └── landing/       # 落地页组件
├── lib/               # 工具库
│   ├── scrapers/      # 数据爬虫
│   ├── ai.ts          # AI分析
│   └── utils.ts       # 工具函数
└── types/             # TypeScript类型
\`\`\`

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint + Prettier 规范
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名

### Git 提交规范
- feat: 新功能
- fix: 修复问题
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构

## 📊 商业模式

### 定价策略
- **免费版**: 每日3次分析，基础功能
- **专业版**: 39元/月，无限分析 + 高级功能
- **年费版**: 360元/年，节省23%

### 竞争优势
- 价格仅为竞品1/10
- AI技术领先
- 用户体验优秀
- 功能覆盖全面

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 邮箱: support@videoanalyzer.pro
- 官网: https://videoanalyzer.pro
- 文档: https://docs.videoanalyzer.pro

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！