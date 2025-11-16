# 🚀 Solana Token 持有者统计 - 快速开始

## 一分钟快速使用

### 步骤 1: 导入组件

在你想要显示 Token 持有者统计的页面中导入预制组件：

```tsx
import { TokenHolderStats } from '@/components/TokenHolderStats';
```

### 步骤 2: 使用组件

直接在你的页面中使用：

```tsx
function MyPage() {
  return (
    <div className="container mx-auto p-6">
      <h1>我的页面</h1>
      
      {/* 显示 Token 持有者统计 */}
      <TokenHolderStats />
    </div>
  );
}
```

就这么简单！组件会自动：
- ✅ 连接到 Solana 主网
- ✅ 查询 Token 持有者数量
- ✅ 显示加载状态
- ✅ 处理错误情况
- ✅ 提供刷新功能

## 🎯 Token 信息

**Mint 地址**: `V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem`

这个地址已经预配置在代码中，无需手动设置。

## 📦 已包含的功能

### 1. 预制 UI 组件
- `TokenHolderStats` - 开箱即用的统计卡片

### 2. 核心 API 函数
```tsx
import { getTokenHolderCount, formatHolderCount } from '@/lib/solanaTokens';

// 获取持有者数量
const count = await getTokenHolderCount();

// 格式化数字（添加千位分隔符）
const formatted = formatHolderCount(count); // "1,234,567"
```

### 3. 完整文档
- 📚 `SOLANA_TOKEN_USAGE.md` - 详细使用文档
- 💡 `INTEGRATION_EXAMPLE.tsx` - 集成示例代码
- 📋 `SOLANA_TOKEN_IMPLEMENTATION.md` - 实现总结

## 🔧 自定义使用

如果你想自己实现 UI，可以直接调用 API：

```tsx
import { useState, useEffect } from 'react';
import { getTokenHolderCount, formatHolderCount } from '@/lib/solanaTokens';

function MyCustomDisplay() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const holderCount = await getTokenHolderCount();
        setCount(holderCount);
      } catch (error) {
        console.error('获取失败:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (count === null) return <div>加载失败</div>;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Token 持有者</h2>
      <p className="text-4xl text-blue-500">{formatHolderCount(count)}</p>
    </div>
  );
}
```

## 💡 在哪些页面使用？

建议在以下页面中展示 Token 持有者统计：

1. **Dashboard** (`src/pages/Dashboard.tsx`) - 在统计区域显示
2. **AIO Page** (`src/pages/AIOPage.tsx`) - 展示社区规模
3. **About** (`src/pages/AboutAIO.tsx`) - 项目介绍页面
4. **任何需要展示 Token 数据的页面**

## 📖 更多资源

### 文档链接
- [详细使用文档](./SOLANA_TOKEN_USAGE.md) - 完整的 API 文档和最佳实践
- [集成示例](./INTEGRATION_EXAMPLE.tsx) - 3个实际的集成示例
- [实现总结](../SOLANA_TOKEN_IMPLEMENTATION.md) - 技术实现细节

### 示例代码位置
- 核心实现: `src/lib/solanaTokens.ts`
- UI 组件: `src/components/TokenHolderStats.tsx`
- 集成示例: `src/lib/INTEGRATION_EXAMPLE.tsx`

## ⚡ 性能提示

1. **使用缓存**: 项目已经安装了 `@tanstack/react-query`，建议使用它来缓存数据
2. **避免频繁调用**: 区块链查询需要时间，建议设置 5-10 分钟的刷新间隔
3. **显示加载状态**: 首次查询可能需要几秒钟，务必显示加载状态

## ❓ 遇到问题？

### 查询太慢？
- 这是正常的，首次查询需要几秒钟
- 建议实现缓存机制

### 想查询其他 Token？
```tsx
const count = await getTokenHolderCount('你的_MINT_地址');
```

### 需要更多功能？
查看 [详细文档](./SOLANA_TOKEN_USAGE.md) 了解更多 API 和用法。

## 🎉 开始使用

1. ✅ 依赖已安装（`@solana/web3.js`, `@solana/spl-token`）
2. ✅ 代码已编写并测试
3. ✅ 项目构建成功
4. 🚀 现在就可以在任何页面中使用！

**下一步**: 选择一个页面，导入 `TokenHolderStats` 组件，开始使用吧！

