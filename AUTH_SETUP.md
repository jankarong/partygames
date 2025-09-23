# Supabase 认证系统设置指南

## 🚀 第一步：创建Supabase项目

1. 访问 [Supabase官网](https://supabase.com/) 并注册账户
2. 点击 "New Project" 创建新项目
3. 填写项目信息：
   - Name: `partygames` (或你喜欢的名字)
   - Database Password: 创建一个强密码
   - Region: 选择离你最近的区域
4. 等待项目创建完成（大约2分钟）

## 🔧 第二步：获取API密钥

1. 在Supabase控制台，进入项目设置
2. 点击左侧菜单 "Settings" → "API"
3. 复制以下信息：
   - **Project URL** (形如：https://xxxxx.supabase.co)
   - **anon public** key (公开密钥)

## ⚙️ 第三步：配置认证系统

打开 `js/auth.js` 文件，替换以下配置：

```javascript
// 替换这两行
const SUPABASE_URL = 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

// 改为你的实际值
const SUPABASE_URL = 'https://xxxxx.supabase.co'  // 你的Project URL
const SUPABASE_ANON_KEY = 'eyJhbGc...'            // 你的anon public key
```

## 🗄️ 第四步：设置数据库

在Supabase控制台的SQL Editor中执行以下SQL命令：

```sql
-- 创建用户配置表
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    premium_purchased_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    PRIMARY KEY (id)
);

-- 启用行级安全性
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看和更新自己的数据
CREATE POLICY "Users can view own data" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- 创建函数：当用户注册时自动创建用户记录
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, is_premium)
    VALUES (NEW.id, NEW.email, FALSE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 📧 第五步：配置邮件服务

1. 在Supabase控制台，进入 "Authentication" → "Settings"
2. 找到 "SMTP Settings" 部分
3. 配置邮件服务提供商（推荐使用SendGrid、Mailgun或Resend）

### 使用Gmail SMTP（测试用）：
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP Username: your-email@gmail.com
SMTP Password: your-app-password  // 需要开启两步验证并生成应用密码
```

### 自定义邮件模板：
在 "Email Templates" 中可以自定义：
- 确认注册邮件
- 密码重置邮件
- 邀请邮件

## 🔐 第六步：配置认证设置

在 "Authentication" → "Settings" → "Auth" 中：

1. **Site URL**: 设置为你的网站域名
   - 本地开发：`http://localhost:3000` 或 `http://127.0.0.1:5500`
   - 生产环境：`https://www.bestpartygames.net`

2. **Redirect URLs**: 添加允许的重定向URL
   ```
   http://localhost:3000/**
   https://www.bestpartygames.net/**
   ```

3. 启用需要的认证提供商：
   - ✅ Email

## ✅ 第七步：测试认证系统

1. 打开网站首页
2. 点击 "Sign Up" 注册新用户
3. 检查邮箱收到的确认邮件
4. 确认邮箱后尝试登录
5. 检查用户信息是否正确显示

## 🎯 第八步：下一步 - 添加付费功能

认证系统完成后，你可以继续添加：

1. **Stripe集成** - 处理付费
2. **Webhook处理** - 自动更新用户付费状态
3. **会员专享内容** - 根据用户状态显示/隐藏功能

## 🚨 常见问题解决

### 问题1：认证系统未初始化
**解决方案**: 检查浏览器控制台，确保API密钥正确配置

### 问题2：邮件未收到
**解决方案**:
- 检查垃圾邮箱
- 确认SMTP配置正确
- 检查Supabase邮件发送日志

### 问题3：CORS错误
**解决方案**: 确保在Supabase设置中添加了正确的Site URL和Redirect URLs

### 问题4：数据库权限错误
**解决方案**: 确保运行了所有SQL命令，特别是RLS策略

## 📝 文件清单

确保以下文件已正确创建：

- ✅ `js/auth.js` - 认证逻辑
- ✅ `css/auth.css` - 认证页面样式
- ✅ `register.html` - 注册页面
- ✅ `login.html` - 登录页面
- ✅ `forgot-password.html` - 忘记密码页面
- ✅ `reset-password.html` - 重置密码页面
- ✅ `index.html` - 主页面（已集成认证）

## 🎉 完成！

配置完成后，你的网站就有了完整的认证系统！用户可以：

- 注册新账户
- 登录/登出
- 重置密码
- 查看会员状态
- （即将支持）购买会员去除广告

接下来你可以开始集成Stripe支付系统了！