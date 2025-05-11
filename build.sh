#!/bin/bash
set -e

# 停止现有的 dfx 进程
dfx stop

# 启动 dfx
dfx start --background --clean

# 安装依赖
npm install

# 构建前端
npm run build

# 部署前端
npm run deploy