#!/bin/bash
set -e

echo "🚀 初始化 Motoko 开发环境..."
echo ""

# 检查 dfx 是否安装
if ! command -v dfx &> /dev/null; then
    echo "❌ 错误: dfx 未安装"
    echo "请先安装 DFINITY SDK:"
    echo "  macOS: sh -ci \"\$(curl -fsSL https://internetcomputer.org/install.sh)\""
    echo "  或访问: https://internetcomputer.org/docs/current/developer-docs/setup/install/"
    exit 1
fi

echo "✅ dfx 已安装: $(dfx --version)"
echo ""

# 检查本地网络是否运行
echo "📡 检查本地 IC 网络状态..."
if dfx ping local &> /dev/null; then
    echo "✅ 本地 IC 网络正在运行"
else
    echo "⚠️  本地 IC 网络未运行，正在启动..."
    dfx start --background --clean
    echo "✅ 本地 IC 网络已启动"
fi
echo ""

# 创建 canister（如果还没有）
echo "📦 创建 canisters..."
dfx canister create --all 2>&1 | grep -v "already created" || true
echo "✅ Canisters 已准备就绪"
echo ""

# 检查前端依赖
echo "📚 检查前端依赖..."
if [ ! -d "src/aio-deck-frontend/node_modules" ]; then
    echo "⚠️  前端依赖未安装，正在安装..."
    cd src/aio-deck-frontend
    npm install
    cd ../..
    echo "✅ 前端依赖已安装"
else
    echo "✅ 前端依赖已存在"
fi
echo ""

# 显示 canister IDs
echo "📋 Canister 信息:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f ".dfx/local/canister_ids.json" ]; then
    cat .dfx/local/canister_ids.json | grep -A 1 '"aio-deck-backend"' | grep '"local"' | sed 's/.*"local": "\(.*\)".*/  Backend Canister ID: \1/' || true
    cat .dfx/local/canister_ids.json | grep -A 1 '"aio-deck-frontend"' | grep '"local"' | sed 's/.*"local": "\(.*\)".*/  Frontend Canister ID: \1/' || true
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "✨ Motoko 开发环境初始化完成！"
echo ""
echo "📝 下一步:"
echo "  1. 开发后端: 编辑 src/aio-deck-backend/main.mo"
echo "  2. 部署后端: dfx deploy aio-deck-backend"
echo "  3. 构建前端: cd src/aio-deck-frontend && npm run build"
echo "  4. 部署前端: dfx deploy aio-deck-frontend"
echo "  5. 启动开发服务器: cd src/aio-deck-frontend && npm run dev"
echo ""
echo "📖 更多信息请查看 MOTOKO_SETUP.md"

