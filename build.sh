#!/bin/bash
set -e

# 停止现有的 dfx 进程
dfx stop

# 启动 dfx
dfx start --background --clean

# 部署后端
echo "📦 部署后端 canister..."
dfx deploy aio-deck-backend

# 初始化合约（如果尚未初始化）
echo "🔧 初始化合约..."
# 使用环境变量，如果未设置则使用默认值（${VAR:-default} 是 bash 语法，不是负值）
INTERACT_ADDRESS="${INTERACT_ADDRESS:-0x0000000000000000000000000000000000000000}"
NODE_SEED="${NODE_SEED:-2000}"
REWARD_PER_NODE="${REWARD_PER_NODE:-0.333}"
AIRDROP_AMOUNT="${AIRDROP_AMOUNT:-333.0}"
META="${META:-{}}"

# 检查合约是否已存在
CONTRACT_EXISTS=$(dfx canister call aio-deck-backend getContract --query 2>/dev/null || echo "null")

if [ "$CONTRACT_EXISTS" = "null" ] || [ "$CONTRACT_EXISTS" = "(null)" ]; then
    echo "  初始化新合约..."
    # Candid 会自动推断浮点数类型，不需要显式声明类型
    dfx canister call aio-deck-backend initContract "(
        \"$INTERACT_ADDRESS\",
        $NODE_SEED : nat,
        $REWARD_PER_NODE,
        $AIRDROP_AMOUNT,
        \"$META\"
    )" || echo "  ⚠️  合约初始化失败（可能已存在）"
else
    echo "  ✅ 合约已存在，跳过初始化"
fi

# 构建前端
echo "🏗️  构建前端..."
cd src/aio-deck-frontend
npm run build
cd ../..

# 部署前端
echo "🚀 部署前端 canister..."
dfx deploy aio-deck-frontend

# 设置 controller（如果需要）
echo "🔐 检查并设置 controller..."
CURRENT_CONTROLLERS=$(dfx canister call aio-deck-backend getControllers --query 2>/dev/null || echo "[]")
if [ "$CURRENT_CONTROLLERS" = "[]" ] || [ "$CURRENT_CONTROLLERS" = "(vec {})" ]; then
    echo "  未检测到 controller，设置当前用户为 controller..."
    CURRENT_PRINCIPAL=$(dfx identity get-principal 2>/dev/null || echo "")
    if [ -n "$CURRENT_PRINCIPAL" ]; then
        echo "  当前用户 Principal: $CURRENT_PRINCIPAL"
        dfx canister call aio-deck-backend setControllers "(vec { principal \"$CURRENT_PRINCIPAL\" })" || echo "  ⚠️  设置 controller 失败"
        
        # 验证设置
        VERIFIED_CONTROLLERS=$(dfx canister call aio-deck-backend getControllers --query 2>/dev/null || echo "[]")
        if [ "$VERIFIED_CONTROLLERS" != "[]" ] && [ "$VERIFIED_CONTROLLERS" != "(vec {})" ]; then
            echo "  ✅ Controller 设置成功"
        else
            echo "  ⚠️  Controller 可能未设置成功"
        fi
    else
        echo "  ⚠️  无法获取当前用户 Principal"
    fi
else
    echo "  ✅ Controller 已存在，跳过设置"
fi

# 设置前端 canister 权限
echo "🔐 设置前端 canister 权限..."
FRONTEND_CANISTER_ID=$(dfx canister id aio-deck-frontend)
if [ -n "$FRONTEND_CANISTER_ID" ]; then
    echo "  前端 canister ID: $FRONTEND_CANISTER_ID"
    dfx canister call aio-deck-backend setFrontendCanister "(principal \"$FRONTEND_CANISTER_ID\")" || echo "  ⚠️  设置前端 canister 权限失败"
    
    # 验证设置
    CURRENT_FRONTEND=$(dfx canister call aio-deck-backend getFrontendCanister --query 2>/dev/null || echo "null")
    if [ "$CURRENT_FRONTEND" != "null" ] && [ "$CURRENT_FRONTEND" != "(null)" ]; then
        echo "  ✅ 前端 canister 权限设置成功"
    else
        echo "  ⚠️  前端 canister 权限可能未设置，请手动调用 setFrontendCanister"
    fi
else
    echo "  ⚠️  无法获取前端 canister ID"
fi

echo "✅ 构建和部署完成！"