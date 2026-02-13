const cloud = require('wx-server-sdk')
const nodemailer = require('nodemailer')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true
})
const db = cloud.database()
const _ = db.command

// 直接配置邮箱信息（调试阶段）
const config = {
  emailUser: '2637621770@qq.com', // 替换成你的实际邮箱
  emailPass: 'rootzfvpftzdecfa'  // 替换成你的实际授权码
}

const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  },
  timeout: 5000,
  pool: true,
  maxConnections: 5
})

const generateVerifyCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

exports.main = async (event, context) => {
  const { email } = event
  const { OPENID } = cloud.getWXContext()

  try {
    if (!email) {
      return { code: -1, msg: '邮箱地址不能为空' }
    }
    const whuEmailReg = /^[a-zA-Z0-9_-]+@whu\.edu\.cn$/
    if (!whuEmailReg.test(email)) {
      return { code: -2, msg: '请输入合法的武大学邮（格式：xxx@whu.edu.cn）' }
    }

    const existingCode = await db.collection('verify_codes')
      .where({
        _openid: OPENID,
        email,
        expireAt: _.gt(Date.now())
      })
      .get()

    if (existingCode.data.length > 0) {
      return { code: -3, msg: '验证码已发送，5分钟内有效，请勿重复获取' }
    }

    const code = generateVerifyCode()
    const expireAt = Date.now() + 5 * 60 * 1000

    await db.collection('verify_codes').add({
      data: {
        _openid: OPENID,
        email,
        code,
        expireAt,
        createTime: db.serverDate()
      }
    })

    const mailOptions = {
      from: `"武大吃什么助手"<2637621770@qq.com>`,
      to: email,
      subject: '【吃什么】登录验证码（5分钟内有效）',
      html: `
        <div style="padding: 20px; background: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px;">
            <h3 style="color: #333; margin-bottom: 20px;">武大吃什么助手 - 登录验证</h3>
            <p style="font-size: 16px; color: #666;">您的登录验证码是：</p>
            <div style="font-size: 24px; font-weight: bold; color: #1677ff; margin: 20px 0;">${code}</div>
            <p style="color: #999; font-size: 14px;">该验证码5分钟内有效，请勿泄露给他人</p>
          </div>
        </div>
      `,
      text: `您的登录验证码是：${code}，5分钟内有效，请勿泄露给他人。`
    }
    console.log('正在尝试发送邮件至:', email)

    // 修改这里：接收返回的 info 信息
    const info = await transporter.sendMail(mailOptions)
    
    // 关键日志：这行会在本地调试的控制台打印出详细的服务器反馈
    console.log('邮件服务器返回详情:', info)

    return { 
      code: 0, 
      msg: '验证码已发送',
      response: info.response, // 把服务器的原始反馈传给前端
      messageId: info.messageId
    }
    await transporter.sendMail(mailOptions)
    console.log(`[验证码发送成功] OPENID:${OPENID}, 邮箱:${email}, 验证码:${code}`)
    return { code: 0, msg: '验证码已发送至您的邮箱，请查收' }

  } catch (err) {
    console.error(`[验证码发送失败] OPENID:${OPENID}, 邮箱:${email}, 错误:`, err)
    if (err.message.includes('mail')) {
      return { code: -4, msg: '邮件发送失败，请稍后重试', error: err.message }
    } else if (err.message.includes('database')) {
      return { code: -5, msg: '数据库操作失败', error: err.message }
    } else {
      return { code: -99, msg: '系统异常，请联系管理员', error: err.message }
    }
  }
}