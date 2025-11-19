#!/bin/bash

# ElevenLabs 环境变量初始化脚本

echo "============================================"
echo "ElevenLabs 环境变量配置"
echo "============================================"
echo ""

# 检查 .env 文件是否已存在
if [ -f .env ]; then
    echo "⚠️  .env 文件已存在"
    read -p "是否要覆盖现有配置? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "已取消操作"
        exit 0
    fi
fi

# 从 .env.example 复制
if [ -f .env.example ]; then
    cp .env.example .env
    echo "✅ 已从 .env.example 创建 .env 文件"
else
    echo "❌ .env.example 文件不存在，创建基础 .env 文件..."
    cat > .env << 'ENVEOF'
# ElevenLabs Configuration
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ENVEOF
fi

echo ""
echo "============================================"
echo "请按以下步骤配置："
echo "============================================"
echo ""
echo "1. 获取 ElevenLabs API Key:"
echo "   https://elevenlabs.io/app/settings/api-keys"
echo ""
echo "2. 编辑 .env 文件，将 'your_elevenlabs_api_key_here' 替换为你的实际 API Key"
echo ""
echo "3. 重启开发服务器以使配置生效"
echo ""
echo "============================================"
