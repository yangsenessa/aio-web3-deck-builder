# Solana Token 持有者统计功能使用说明

## 功能概述

该功能用于查询指定 SPL Token 的持有账户数量。默认查询的 Token Mint 地址为：
```
V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem
```

## 安装的依赖

```json
{
  "@solana/web3.js": "最新版本",
  "@solana/spl-token": "最新版本"
}
```

## 核心 API

### 1. `getTokenHolderCount(mintAddress?: string): Promise<number>`

获取指定 Token 的持有账户数量（仅统计余额大于 0 的账户）。

**参数：**
- `mintAddress` (可选): Token Mint 地址，默认为 `V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem`

**返回：**
- `Promise<number>`: 持有账户数量

**示例：**
```typescript
import { getTokenHolderCount } from '@/lib/solanaTokens';

// 使用默认地址
const count = await getTokenHolderCount();
console.log(`持有者数量: ${count}`);

// 使用自定义地址
const customCount = await getTokenHolderCount('YOUR_MINT_ADDRESS');
```

### 2. `getTokenInfo(mintAddress?: string): Promise<{ holders: number; mintAddress: string }>`

获取 Token 的详细信息。

**示例：**
```typescript
import { getTokenInfo } from '@/lib/solanaTokens';

const info = await getTokenInfo();
console.log(`Mint: ${info.mintAddress}`);
console.log(`持有者: ${info.holders}`);
```

### 3. `formatHolderCount(count: number): string`

格式化持有者数量，添加千位分隔符。

**示例：**
```typescript
import { formatHolderCount } from '@/lib/solanaTokens';

const formatted = formatHolderCount(1234567);
// 输出: "1,234,567"
```

## 在 React 组件中使用

### 方式一：使用提供的 TokenHolderStats 组件

```tsx
import { TokenHolderStats } from '@/components/TokenHolderStats';

function MyPage() {
  return (
    <div>
      <h1>我的页面</h1>
      <TokenHolderStats />
    </div>
  );
}
```

### 方式二：自定义实现

```tsx
import { useState, useEffect } from 'react';
import { getTokenHolderCount, formatHolderCount } from '@/lib/solanaTokens';

function CustomStats() {
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
    <div>
      <h2>持有者数量</h2>
      <p>{formatHolderCount(count)}</p>
    </div>
  );
}
```

### 方式三：使用 React Query（推荐用于需要缓存的场景）

```tsx
import { useQuery } from '@tanstack/react-query';
import { getTokenHolderCount } from '@/lib/solanaTokens';

function StatsWithQuery() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tokenHolders'],
    queryFn: () => getTokenHolderCount(),
    staleTime: 5 * 60 * 1000, // 5 分钟缓存
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;

  return (
    <div>
      <p>持有者: {data}</p>
      <button onClick={() => refetch()}>刷新</button>
    </div>
  );
}
```

## 在不同页面中集成示例

### 在 Dashboard 页面中显示

```tsx
// src/pages/Dashboard.tsx
import { TokenHolderStats } from '@/components/TokenHolderStats';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">仪表盘</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TokenHolderStats />
        {/* 其他统计卡片 */}
      </div>
    </div>
  );
}
```

### 在 Index 页面中显示

```tsx
// src/pages/Index.tsx
import { TokenHolderStats } from '@/components/TokenHolderStats';

export default function Index() {
  return (
    <div className="min-h-screen">
      <section className="py-20">
        <h1>欢迎</h1>
        <TokenHolderStats />
      </section>
    </div>
  );
}
```

## 性能优化建议

1. **使用缓存**：避免频繁请求区块链数据，建议使用 React Query 或类似的缓存机制
2. **显示加载状态**：区块链查询可能需要几秒钟，务必提供良好的加载反馈
3. **错误处理**：网络问题或 RPC 限流可能导致请求失败，需要妥善处理
4. **考虑使用付费 RPC**：免费的 RPC 端点有速率限制，生产环境建议使用 QuickNode、Alchemy 等服务

## RPC 端点配置

当前使用的是 Solana 官方免费 RPC：
```typescript
const SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';
```

如需更换为其他 RPC 服务商，可以修改 `src/lib/solanaTokens.ts` 中的 `SOLANA_RPC_ENDPOINT` 常量。

推荐的 RPC 服务商：
- [QuickNode](https://www.quicknode.com/)
- [Alchemy](https://www.alchemy.com/)
- [Helius](https://www.helius.dev/)
- [Triton](https://triton.one/)

## 常见问题

### Q: 查询速度慢怎么办？
A: 可以考虑使用付费 RPC 服务，或者在后端实现缓存机制，定期更新数据。

### Q: 如何查询其他 Token？
A: 调用函数时传入不同的 Mint 地址即可：
```typescript
const count = await getTokenHolderCount('YOUR_TOKEN_MINT_ADDRESS');
```

### Q: 显示的数量包括余额为 0 的账户吗？
A: 不包括，代码已经过滤掉余额为 0 的账户，只统计实际持有 Token 的账户。

## 注意事项

1. 查询需要网络连接到 Solana 主网
2. 查询可能需要几秒钟时间，取决于 Token 账户数量
3. RPC 服务可能有速率限制
4. 建议在生产环境中添加错误监控和日志记录

