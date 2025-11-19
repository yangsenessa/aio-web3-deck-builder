# 环境变量配置指南

本文档说明如何配置项目所需的环境变量。

## 📋 必需的环境变量

### 1. ElevenLabs API Key

用于语音识别和语音转文字功能。

**获取方式：**
1. 访问 [ElevenLabs 官网](https://elevenlabs.io)
2. 注册/登录账号
3. 进入 [API Keys 设置页面](https://elevenlabs.io/app/settings/api-keys)
4. 创建新的 API Key
5. 复制 API Key

**配置方法：**

在项目根目录（`aio-web3-deck-builder/src/aio-deck-frontend/`）创建 `.env` 文件：

```bash
# ElevenLabs Configuration
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

**使用位置：**
- `src/hooks/useElevenLabsStable.ts` - 语音转文字功能
- `src/pages/AIOPage.tsx` - 语音命令输入

## 🔧 可选的环境变量

### 2. Interaction Contract Address

用于 Ethereum/Base 网络的智能合约交互。

```bash
# Ethereum/Base Network Configuration
VITE_INTERACTION_ADDRESS=0x...
```

如果不设置，系统会尝试从后端获取合约地址。

### 3. Internet Computer Canister IDs

这些通常会自动从 `.dfx/local/canister_ids.json` 加载，但也可以手动设置：

```bash
# Internet Computer (DFX) Configuration
VITE_BACKEND_CANISTER_ID=...
VITE_FRONTEND_CANISTER_ID=...
```

## 📝 配置步骤

### 方法 1: 创建 .env 文件

1. 在项目根目录创建 `.env` 文件：
   ```bash
   cd aio-web3-deck-builder/src/aio-deck-frontend
   touch .env
   ```

2. 复制 `.env.example` 的内容（如果存在）或手动添加：
   ```bash
   # ElevenLabs Configuration
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   
   # Ethereum/Base Network Configuration
   VITE_INTERACTION_ADDRESS=
   ```

3. 替换 `your_elevenlabs_api_key_here` 为你的实际 API Key

### 方法 2: 使用环境变量模板

项目根目录应该有一个 `.env.example` 文件作为模板：

```bash
cp .env.example .env
# 然后编辑 .env 文件，填入实际的 API Key
```

## ⚠️ 重要提示

1. **不要提交 .env 文件到 Git**
   - `.env` 文件已经在 `.gitignore` 中
   - 只提交 `.env.example` 作为模板

2. **环境变量前缀**
   - Vite 项目要求环境变量必须以 `VITE_` 开头
   - 只有 `VITE_` 开头的变量才会暴露给前端代码

3. **重启开发服务器**
   - 修改 `.env` 文件后，需要重启开发服务器才能生效
   ```bash
   # 停止当前服务器 (Ctrl+C)
   # 然后重新启动
   npm run dev
   ```

4. **生产环境配置**
   - 部署到生产环境时，需要在部署平台配置环境变量
   - GitHub Pages: 在 GitHub Actions 或部署设置中配置
   - Vercel/Netlify: 在项目设置中配置环境变量

## 🔍 验证配置

配置完成后，可以通过以下方式验证：

1. **检查环境变量是否加载**
   - 打开浏览器开发者工具
   - 在控制台输入：`console.log(import.meta.env.VITE_ELEVENLABS_API_KEY)`
   - 应该能看到你的 API Key（注意：不要在生产环境这样做）

2. **测试语音功能**
   - 访问 `/aio` 页面
   - 完成支付后，点击麦克风按钮
   - 如果配置正确，应该能够正常录音和识别

## 🐛 常见问题

### Q: 环境变量不生效？
A: 
- 确保变量名以 `VITE_` 开头
- 重启开发服务器
- 检查 `.env` 文件是否在正确的目录（项目根目录）

### Q: API Key 无效？
A:
- 检查 API Key 是否正确复制（没有多余空格）
- 确认 API Key 在 ElevenLabs 账户中仍然有效
- 检查 API Key 是否有足够的配额

### Q: 语音识别失败？
A:
- 检查网络连接
- 确认 API Key 配置正确
- 检查浏览器是否允许麦克风权限
- 查看浏览器控制台的错误信息

## 📚 相关文档

- [ElevenLabs API 文档](https://elevenlabs.io/docs)
- [Vite 环境变量文档](https://vitejs.dev/guide/env-and-mode.html)
- [项目 README](./README.md)

