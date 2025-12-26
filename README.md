# 混合式教学平台 (Hybrid Teaching Ecosystem)

一个现代化的混合式教学平台，集成了学习管理、AI助手、案例库和学习行为分析等功能。

## ✨ 特性

- 🎓 **学生端功能**
  - 课程主页与学习进度跟踪
  - 线上资源库
  - 学习行为与积分仪表盘
  - 个人设置管理
  - AI智能助教（支持真实大模型或mock模式）

- 👨‍🏫 **教师端功能**
  - 学生行为数据分析
  - 作业管理与精准干预

- 📚 **公共功能**
  - 课程思政案例库
  - 用户认证系统（学号+密码）
  - 角色权限控制（学生/教师）

- 🤖 **AI助手**
  - 默认使用mock响应
  - 配置环境变量后可接入OpenAI或兼容API
  - 实时对话交互

## 🛠️ 技术栈

- **前端框架**: Next.js 16 (App Router)
- **开发语言**: TypeScript
- **样式**: TailwindCSS
- **数据库**: SQLite + Prisma ORM
- **认证**: JWT (JSON Web Tokens)
- **AI集成**: OpenAI API (可选)

## 📋 前置要求

- Node.js 18+ 
- npm 或 yarn

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/caixiaoshun/dm-hybrid-ecosystem.git
cd dm-hybrid-ecosystem
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并根据需要修改：

```bash
cp .env.example .env
```

环境变量说明：

```env
# 数据库（默认SQLite）
DATABASE_URL="file:./dev.db"

# JWT密钥（生产环境请修改为强密码）
JWT_SECRET="your-super-secret-jwt-key"

# AI配置（可选 - 不配置则使用mock）
# OPENAI_API_KEY="sk-..."
# AI_PROVIDER="openai"
# AI_MODEL="gpt-3.5-turbo"

# 应用配置
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. 初始化数据库

```bash
# 生成Prisma客户端并创建数据库
npm run prisma:generate
npm run prisma:push

# 填充测试数据
npm run prisma:seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 👤 测试账号

数据库初始化后，可使用以下账号登录：

**学生账号：**
- 学号: `20210001`
- 密码: `123456`

**教师账号：**
- 学号: `T001`
- 密码: `123456`

## 📁 项目结构

```
dm-hybrid-ecosystem/
├── app/                      # Next.js App Router
│   ├── api/                  # API路由
│   │   ├── auth/            # 认证相关API
│   │   └── chat/            # AI聊天API
│   ├── login/               # 登录页面
│   ├── register/            # 注册页面
│   ├── student/             # 学生端页面
│   │   ├── course/          # 课程主页
│   │   ├── resources/       # 资源库
│   │   ├── dashboard/       # 学习仪表盘
│   │   ├── settings/        # 个人设置
│   │   └── ai/              # AI助手
│   ├── teacher/             # 教师端页面
│   │   ├── behavior/        # 学生行为数据
│   │   └── intervention/    # 作业与干预
│   └── cases/               # 案例库
├── components/              # React组件
│   ├── layout/             # 布局组件
│   └── ui/                 # UI组件
├── lib/                     # 工具库
│   ├── auth/               # 认证工具
│   ├── mock/               # Mock数据
│   └── prisma/             # Prisma客户端
├── prisma/                  # 数据库相关
│   ├── schema.prisma       # 数据库模型
│   └── seed.js             # 数据填充脚本
├── assets/                  # 原始HTML原型
└── public/                  # 静态资源
```

## 🎨 路由结构

### 公共路由
- `/` - 首页（重定向到登录）
- `/login` - 登录页面
- `/register` - 注册页面
- `/cases` - 案例库列表
- `/cases/[id]` - 案例详情

### 学生端（需要学生权限）
- `/student/course` - 课程主页
- `/student/resources` - 线上资源库
- `/student/dashboard` - 学习仪表盘
- `/student/settings` - 个人设置
- `/student/ai` - AI助手

### 教师端（需要教师权限）
- `/teacher/behavior` - 学生行为数据
- `/teacher/intervention` - 作业与干预

## 🔐 权限控制

应用使用中间件（`middleware.ts`）实现路由保护：

- 未登录用户访问受保护路由会被重定向到登录页
- 学生只能访问 `/student/**` 路由
- 教师只能访问 `/teacher/**` 路由
- 已登录用户访问登录/注册页面会被重定向到对应的主页

## 🤖 AI助手配置

AI助手默认使用mock响应。要启用真实的AI模型：

1. 在 `.env` 文件中配置API密钥：

```env
OPENAI_API_KEY="sk-your-api-key"
AI_PROVIDER="openai"
AI_MODEL="gpt-3.5-turbo"
```

2. 重启开发服务器

AI助手会自动检测环境变量，如果配置了API密钥则使用真实模型，否则使用mock响应。

## 🏗️ 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 🐳 Docker部署

### 使用Docker Compose（推荐）

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

### 使用Docker

```bash
# 构建镜像
docker build -t dm-hybrid-ecosystem .

# 运行容器
docker run -p 3000:3000 -e JWT_SECRET=your-secret dm-hybrid-ecosystem
```

访问 [http://localhost:3000](http://localhost:3000)

## 📊 数据库管理

```bash
# 查看数据库
npx prisma studio

# 重置数据库
npx prisma db push --force-reset

# 重新填充数据
npm run prisma:seed
```

## 🧪 开发指南

### 添加新页面

1. 在 `app/` 目录下创建对应的路由文件夹
2. 创建 `page.tsx` 文件
3. 如需保护路由，确保使用 `getSession()` 验证用户

### 添加新API

1. 在 `app/api/` 目录下创建路由文件夹
2. 创建 `route.ts` 文件
3. 导出 GET、POST 等HTTP方法处理器

### 修改数据库模型

1. 编辑 `prisma/schema.prisma`
2. 运行 `npm run prisma:generate`
3. 运行 `npm run prisma:push`

## 🔧 常见问题

**Q: 如何修改默认端口？**

A: 在 `package.json` 中修改 dev 脚本：
```json
"dev": "next dev -p 3001"
```

**Q: 忘记测试账号密码怎么办？**

A: 重新运行 `npm run prisma:seed` 重置数据库并创建测试账号。

**Q: AI助手无法工作？**

A: 检查是否配置了 `OPENAI_API_KEY`。如果不配置，系统会使用mock响应，这是正常的。

**Q: 如何部署到服务器？**

A: 推荐使用Docker部署，或者将构建后的文件部署到支持Node.js的服务器（如Vercel、Railway等）。

## 📝 开发路线图

- [ ] 添加更多课程类型
- [ ] 实现实时通知系统
- [ ] 增强数据可视化功能
- [ ] 支持更多AI模型提供商
- [ ] 移动端适配优化
- [ ] 添加单元测试

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 👥 作者

- caixiaoshun

## 📞 联系方式

如有问题或建议，请提交 Issue 或联系项目维护者。
