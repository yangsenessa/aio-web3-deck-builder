/**
 * 🎯 快速使用演示
 * 这个文件展示了 3 种最常用的方式来展示 Token 持有者数量
 */

import { useState, useEffect } from 'react';
import { getTokenHolderCount, formatHolderCount, TOKEN_MINT_ADDRESS } from '@/lib/solanaTokens';
import { TokenHolderStats } from '@/components/TokenHolderStats';
import { Users } from 'lucide-react';

// ============================================
// 方式 1: 使用预制的 TokenHolderStats 组件（最简单）
// ============================================
export function Demo1_UsePrebuiltComponent() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">方式 1: 使用预制组件</h2>
      
      {/* 只需一行代码！ */}
      <TokenHolderStats />
    </div>
  );
}

// ============================================
// 方式 2: 简单的内联显示（适合嵌入到其他内容中）
// ============================================
export function Demo2_InlineDisplay() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTokenHolderCount()
      .then(setCount)
      .catch(err => console.error('获取失败:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-400">加载中...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <Users className="w-5 h-5 text-blue-500" />
      <span className="text-gray-700">Token 持有者:</span>
      <span className="text-2xl font-bold text-blue-600 font-mono">
        {count ? formatHolderCount(count) : 'N/A'}
      </span>
    </div>
  );
}

// ============================================
// 方式 3: 自定义卡片样式（完全控制 UI）
// ============================================
export function Demo3_CustomCard() {
  const [holderCount, setHolderCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const count = await getTokenHolderCount();
      setHolderCount(count);
    } catch (err) {
      console.error('获取失败:', err);
      setError('获取失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 标题 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          🪙 Token 持有者统计
        </h3>
        <p className="text-xs text-gray-500 font-mono break-all">
          {TOKEN_MINT_ADDRESS}
        </p>
      </div>

      {/* 内容 */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-500">正在查询区块链...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-6">
          <p className="text-red-500 text-sm">{error}</p>
          <button 
            onClick={fetchData}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            重试
          </button>
        </div>
      )}

      {holderCount !== null && !error && (
        <div className="text-center py-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {formatHolderCount(holderCount)}
          </div>
          <p className="mt-2 text-sm text-gray-600">持有账户数</p>
          
          {/* 刷新按钮 */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="mt-4 px-4 py-2 text-sm border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            🔄 刷新数据
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// 方式 4: 在 Dashboard 统计区域显示（实际应用示例）
// ============================================
export function Demo4_InDashboardStats() {
  const [holderCount, setHolderCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTokenHolderCount()
      .then(setCount)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 模拟 Dashboard 的 stats 数据
  const stats = [
    { label: "Total Users", value: "12,456", change: "+12.5%" },
    { 
      label: "Token Holders", 
      value: loading ? "..." : (holderCount ? formatHolderCount(holderCount) : "N/A"),
      change: "🟢 LIVE",
      isLive: true
    },
    { label: "Total Value", value: "$2.4M", change: "+15.7%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
        >
          <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            {stat.label}
            {stat.isLive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                LIVE
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2 font-mono">
            {stat.value}
          </div>
          <div className="text-sm text-green-600">{stat.change}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 使用示例：在实际页面中的完整示例
// ============================================
export function FullPageExample() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 页面标题 */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Token 持有者统计演示
          </h1>
          <p className="text-gray-600">
            以下展示了 4 种不同的使用方式
          </p>
        </div>

        {/* 方式 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            方式 1: 使用预制组件（推荐）
          </h2>
          <Demo1_UsePrebuiltComponent />
        </section>

        {/* 方式 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            方式 2: 简单内联显示
          </h2>
          <div className="p-6 bg-white rounded-xl border border-gray-200">
            <Demo2_InlineDisplay />
          </div>
        </section>

        {/* 方式 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            方式 3: 自定义卡片样式
          </h2>
          <Demo3_CustomCard />
        </section>

        {/* 方式 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            方式 4: Dashboard 统计区域
          </h2>
          <Demo4_InDashboardStats />
        </section>
      </div>
    </div>
  );
}

// ============================================
// 📝 使用说明
// ============================================
/*

## 如何在你的页面中使用？

### 最简单的方式（推荐）：

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

### 如果需要自定义，直接调用 API：

```tsx
import { getTokenHolderCount, formatHolderCount } from '@/lib/solanaTokens';

// 在 useEffect 或事件处理函数中
const count = await getTokenHolderCount();
console.log(formatHolderCount(count)); // "1,234,567"
```

### Token 信息：
- Mint 地址: V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem
- 网络: Solana 主网 (mainnet-beta)
- 只统计余额 > 0 的账户

### 建议使用的页面：
- ✅ Dashboard (src/pages/Dashboard.tsx)
- ✅ AIO Page (src/pages/AIOPage.tsx)
- ✅ About Page (src/pages/AboutAIO.tsx)
- ✅ Index (src/pages/Index.tsx)

### 更多文档：
- 📚 详细文档: src/lib/SOLANA_TOKEN_USAGE.md
- 💡 集成示例: src/lib/INTEGRATION_EXAMPLE.tsx
- 🚀 快速开始: src/lib/README_SOLANA_TOKEN.md

*/

