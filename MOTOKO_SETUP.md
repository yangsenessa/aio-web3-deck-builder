# Motoko 开发环境设置指南

本指南将帮助您设置和初始化 Motoko 开发环境。

## 📋 前置要求

### 1. 安装 DFINITY SDK (dfx)

DFINITY SDK 是开发 Internet Computer 应用的核心工具，包含 Motoko 编译器。

#### macOS 安装

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

或者使用 Homebrew:

```bash
brew install dfinity
```

#### 验证安装

```bash
dfx --version
```

应该显示类似 `dfx 0.28.0` 的版本信息。

### 2. 系统要求

- macOS, Linux, 或 Windows (WSL2)
- 至少 8GB RAM
- 至少 10GB 可用磁盘空间

## 🚀 快速初始化

运行初始化脚本：

```bash
chmod +x init-motoko.sh
./init-motoko.sh
```

这个脚本会自动：
- ✅ 检查 dfx 是否安装
- ✅ 启动本地 IC 网络
- ✅ 创建必要的 canisters
- ✅ 安装前端依赖

## 📁 项目结构

```
aio-web3-deck-builder/
├── dfx.json                    # DFINITY 项目配置
├── src/
│   ├── aio-deck-backend/       # Motoko 后端
│   │   └── main.mo            # 主 Motoko 文件
│   └── aio-deck-frontend/      # React 前端
│       └── dist/              # 构建后的前端文件
└── .dfx/                       # DFINITY 本地环境（自动生成）
    └── local/                  # 本地网络配置
```

## 🔧 手动设置步骤

### 1. 启动本地 IC 网络

```bash
dfx start --background --clean
```

`--background` 标志让网络在后台运行，`--clean` 清除之前的状态。

### 2. 创建 Canisters

```bash
dfx canister create --all
```

这会为 `dfx.json` 中定义的所有 canisters 创建实例。

### 3. 部署后端 (Motoko)

```bash
dfx deploy aio-deck-backend
```

### 4. 构建和部署前端

```bash
# 构建前端
cd src/aio-deck-frontend
npm install
npm run build
cd ../..

# 部署前端
dfx deploy aio-deck-frontend
```

## 🛠️ 常用命令

### 开发命令

```bash
# 启动本地网络
dfx start --background

# 停止本地网络
dfx stop

# 查看网络状态
dfx ping local

# 查看 canister 信息
dfx canister status aio-deck-backend
dfx canister status aio-deck-frontend

# 查看 canister IDs
cat .dfx/local/canister_ids.json
```

### 部署命令

```bash
# 部署所有 canisters
dfx deploy

# 部署特定 canister
dfx deploy aio-deck-backend
dfx deploy aio-deck-frontend

# 重新部署（清除状态）
dfx deploy --upgrade-unchanged aio-deck-backend
```

### 测试命令

```bash
# 调用后端方法
dfx canister call aio-deck-backend greet "World"

# 查看 canister 日志
dfx canister call aio-deck-backend --query
```

## 📝 开发工作流

### 1. 开发 Motoko 后端

编辑 `src/aio-deck-backend/main.mo`:

```motoko
actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
```

### 2. 部署并测试

```bash
# 部署后端
dfx deploy aio-deck-backend

# 测试调用
dfx canister call aio-deck-backend greet "Motoko"
```

### 3. 开发前端

```bash
cd src/aio-deck-frontend
npm run dev
```

前端开发服务器会在 `http://localhost:5173` 启动。

### 4. 构建和部署前端

```bash
# 构建
npm run build

# 返回项目根目录并部署
cd ../..
dfx deploy aio-deck-frontend
```

## 🌐 访问部署的应用

部署后，您可以通过以下方式访问：

### 本地网络

```bash
# 获取前端 URL
dfx canister id aio-deck-frontend
```

然后访问: `http://<canister-id>.localhost:8000`

或者使用 dfx 提供的 URL:

```bash
dfx canister --network local id aio-deck-frontend
```

### IC 主网

```bash
# 部署到主网（需要 cycles）
dfx deploy --network ic aio-deck-frontend
```

## 🔍 故障排除

### 问题: dfx 命令未找到

**解决方案**: 确保 dfx 已正确安装并在 PATH 中。

```bash
# 检查安装位置
which dfx

# 如果未找到，重新安装
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### 问题: 本地网络无法启动

**解决方案**: 

```bash
# 停止所有 dfx 进程
dfx stop

# 清理并重新启动
dfx start --background --clean
```

### 问题: Canister 创建失败

**解决方案**: 确保本地网络正在运行：

```bash
dfx ping local
```

如果失败，启动网络：

```bash
dfx start --background
```

### 问题: 前端构建失败

**解决方案**: 确保依赖已安装：

```bash
cd src/aio-deck-frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 学习资源

- [Motoko 语言文档](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [DFINITY SDK 文档](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
- [Internet Computer 开发指南](https://internetcomputer.org/docs/current/developer-docs/)
- [Motoko 基础教程](https://internetcomputer.org/docs/current/motoko/main/introduction)

## 🎯 下一步

1. ✅ 完成环境初始化
2. 📝 阅读 `src/aio-deck-backend/main.mo` 了解 Motoko 语法
3. 🔨 开始开发您的第一个 Motoko canister
4. 🌐 部署到本地网络进行测试
5. 🚀 准备就绪后部署到 IC 主网

---

**提示**: 使用 `./init-motoko.sh` 脚本可以快速初始化所有必要的组件！

