import { useEffect, useState } from 'react';
import { getTokenHolderCount, formatHolderCount, TOKEN_MINT_ADDRESS } from '@/lib/solanaTokens';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

/**
 * Token 持有者统计组件
 * 展示指定 SPL Token 的持有账户数量
 */
export function TokenHolderStats() {
  const [holderCount, setHolderCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 获取持有者数量
  const fetchHolderCount = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const count = await getTokenHolderCount();
      setHolderCount(count);
    } catch (err) {
      console.error('获取持有者数量失败:', err);
      setError('无法获取持有者数量，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时自动获取数据
  useEffect(() => {
    fetchHolderCount();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Token 持有者统计</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchHolderCount}
            disabled={loading}
            title="刷新数据"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <CardDescription className="text-xs break-all">
          Mint: {TOKEN_MINT_ADDRESS}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading && !holderCount && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">加载中...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-4 text-red-500">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {holderCount !== null && !error && (
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-primary">
                {formatHolderCount(holderCount)}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                持有账户数
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

