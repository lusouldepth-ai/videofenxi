// Email functionality - requires nodemailer dependency
// Currently using stub implementation for build compatibility

interface MailOptions {
  from?: string
  to: string
  subject: string
  html: string
}

const transporter = {
  sendMail: async (options: MailOptions) => {
    console.log('Email would be sent:', options.subject, 'to', options.to)
    return { messageId: 'demo-message-id' }
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: '欢迎加入 VideoAnalyzer Pro！🎉',
    html: `
      <div style="font-family: 'PingFang SC', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #4ECDC4, #45B7D1); border-radius: 16px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0;">
              VideoAnalyzer Pro
            </h1>
          </div>
          
          <!-- Welcome Message -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 10px;">
              欢迎，${name}！🎉
            </h2>
            <p style="color: #6b7280; line-height: 1.6; margin: 0;">
              感谢您加入VideoAnalyzer Pro！我们很高兴为您提供专业的视频数据分析服务。
            </p>
          </div>
          
          <!-- Features -->
          <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
            <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 16px;">🚀 您现在可以：</h3>
            <ul style="color: #6b7280; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>每日免费分析3个视频</li>
              <li>查看基础数据和趋势</li>
              <li>浏览热门榜单</li>
              <li>体验AI优化建议</li>
            </ul>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.APP_URL}/dashboard" 
               style="display: inline-block; background: linear-gradient(135deg, #4ECDC4, #45B7D1); color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 500;">
              立即开始分析
            </a>
          </div>
          
          <!-- Tips -->
          <div style="border-left: 4px solid #4ECDC4; padding-left: 16px; margin-bottom: 30px;">
            <h4 style="color: #1f2937; font-size: 14px; margin-bottom: 8px;">💡 快速上手提示：</h4>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
              复制任意抖音、B站、小红书或YouTube视频链接，粘贴到分析框中，即可获得详细的数据分析报告！
            </p>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              如有任何问题，请联系我们：
              <a href="mailto:support@videoanalyzer.pro" style="color: #4ECDC4;">support@videoanalyzer.pro</a>
            </p>
          </div>
        </div>
      </div>
    `
  }

  return transporter.sendMail(mailOptions)
}

export async function sendSubscriptionEmail(email: string, name: string, plan: string) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: '订阅成功 - VideoAnalyzer Pro 专业版',
    html: `
      <div style="font-family: 'PingFang SC', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; font-size: 24px; font-weight: bold;">
              🎉 订阅成功！
            </h1>
            <p style="color: #6b7280; margin: 16px 0;">
              ${name}，欢迎升级到VideoAnalyzer Pro专业版！
            </p>
          </div>
          
          <div style="background: linear-gradient(135deg, #4ECDC4, #45B7D1); color: white; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <h2 style="margin: 0 0 8px 0; font-size: 18px;">现在您可以享受：</h2>
            <ul style="text-align: left; margin: 16px 0; padding-left: 20px;">
              <li>无限视频分析</li>
              <li>AI深度优化建议</li>
              <li>竞品监控功能</li>
              <li>高级数据导出</li>
              <li>优先客服支持</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.APP_URL}/dashboard" 
               style="display: inline-block; background: #4ECDC4; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 500;">
              体验专业功能
            </a>
          </div>
        </div>
      </div>
    `
  }

  return transporter.sendMail(mailOptions)
}