#!/bin/bash
set -e

# 停止现有的 dfx 进程
dfx stop

# 启动 dfx
dfx start --background --clean

# 安装依赖
cd src/aio-deck-frontend
npm install
cd ../..

# 构建前端
npm run build

# 部署前端
dfx deploy aio-deck-frontend