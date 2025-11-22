import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  Users,
  Coins,
  DollarSign,
  Activity,
  BarChart3,
  Globe,
  Zap
} from "lucide-react";
import { getTokenInfo, get24hVolume, getPriceChange, formatTokenAmount, formatHolderCount } from "../lib/baseTokens";
import { useToast } from "../hooks/use-toast";

const AIODashboardPage: React.FC = () => {
  const { toast } = useToast();
  const [tokenData, setTokenData] = useState<{
    totalSupply: number;
    holders: number;
    address: string;
    price: number;
    marketCap: number;
  } | null>(null);
  const [volume24h, setVolume24h] = useState<number | null>(null);
  const [priceChange24h, setPriceChange24h] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [info, volume, priceChange] = await Promise.all([
          getTokenInfo(),
          get24hVolume(),
          getPriceChange(undefined, timeframe), // 使用默认地址（根据 MODE 自动选择）
        ]);
        setTokenData(info);
        setVolume24h(volume);
        setPriceChange24h(priceChange);
      } catch (err) {
        console.error("Failed to get token data:", err);
        setError("Unable to load token data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // 每30秒刷新一次数据
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [timeframe]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatAddress = (address: string) => {
    if (!address || address === '0x0000000000000000000000000000000000000000') {
      return 'Not Deployed';
    }
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 0.01 ? 4 : 2,
      maximumFractionDigits: price < 0.01 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}K`;
    }
    return `$${marketCap.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };

  const stats = [
    {
      label: "Price",
      value: tokenData ? formatPrice(tokenData.price) : "--",
      change: priceChange24h !== null ? `${priceChange24h >= 0 ? '+' : ''}${priceChange24h.toFixed(2)}%` : "--",
      isPositive: priceChange24h !== null ? priceChange24h >= 0 : true,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      label: "Market Cap",
      value: tokenData ? formatMarketCap(tokenData.marketCap) : "--",
      change: null,
      isPositive: true,
      icon: <Coins className="w-5 h-5" />,
    },
    {
      label: "24h Volume",
      value: volume24h ? formatMarketCap(volume24h) : "--",
      change: null,
      isPositive: true,
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: "Holders",
      value: tokenData ? formatHolderCount(tokenData.holders) : "--",
      change: null,
      isPositive: true,
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const tokenInfo = [
    {
      label: "Total Supply",
      value: tokenData ? formatTokenAmount(tokenData.totalSupply) : "--",
    },
    {
      label: "Circulating Supply",
      value: tokenData ? formatTokenAmount(tokenData.totalSupply * 0.8) : "--", // 假设80%流通
    },
    {
      label: "Contract Address",
      value: tokenData ? formatAddress(tokenData.address) : "--",
      isAddress: true,
    },
    {
      label: "Chain",
      value: "Base",
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-slate-300 hover:text-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                  $AIO Token Dashboard
                </h1>
                <p className="text-sm text-slate-400 mt-1">Base Chain ERC20 Token</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="text-slate-400">Loading token data...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/10">
            <div className="text-red-400">{error}</div>
          </div>
        )}

        {/* Main Content */}
        {tokenData && !loading && !error && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-400">{stat.label}</div>
                    <div className="text-indigo-400">{stat.icon}</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-200 mb-2 font-mono">
                    {stat.value}
                  </div>
                  {stat.change && (
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Price Chart */}
              <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-200">Price Chart</h2>
                  <div className="flex gap-2">
                    {(['1h', '24h', '7d', '30d'] as const).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          timeframe === tf
                            ? 'bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-400 text-sm">Chart coming soon</p>
                    <p className="text-slate-500 text-xs mt-1">Price: {formatPrice(tokenData.price)}</p>
                  </div>
                </div>
              </div>

              {/* Token Info */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-xl font-bold text-slate-200 mb-6">Token Information</h2>
                <div className="space-y-4">
                  {tokenInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-slate-400">{info.label}</span>
                      <div className="flex items-center gap-2">
                        {info.icon}
                        {info.isAddress ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-green-400">
                              {formatAddress(info.value as string)}
                            </span>
                            {tokenData.address !== '0x0000000000000000000000000000000000000000' && (
                              <button
                                onClick={() => copyToClipboard(tokenData.address)}
                                className="p-1.5 rounded hover:bg-white/5 transition-colors"
                                title="Copy address"
                              >
                                {copied ? (
                                  <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                                )}
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-slate-200">{info.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trading Links */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-xl font-bold text-slate-200 mb-6">Trade $AIO</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Uniswap V3", url: "https://app.uniswap.org/", description: "Base Network" },
                  { name: "BaseSwap", url: "https://baseswap.fi/", description: "Native DEX" },
                  { name: "DexScreener", url: "https://dexscreener.com/", description: "Chart & Analytics" },
                  { name: "BaseScan", url: "https://basescan.org/", description: "Block Explorer" },
                ].map((dex, index) => (
                  <a
                    key={index}
                    href={dex.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-200">{dex.name}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400">{dex.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Distribution */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-xl font-bold text-slate-200 mb-6">Token Distribution</h2>
                <div className="space-y-4">
                  {[
                    { label: "Public Sale", value: 40, color: "from-indigo-500 to-indigo-600" },
                    { label: "Liquidity", value: 30, color: "from-purple-500 to-purple-600" },
                    { label: "Team", value: 15, color: "from-fuchsia-500 to-fuchsia-600" },
                    { label: "Ecosystem", value: 15, color: "from-pink-500 to-pink-600" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300">{item.label}</span>
                        <span className="text-sm font-semibold text-slate-200">{item.value}%</span>
                      </div>
                      <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-xl font-bold text-slate-200 mb-6">Key Metrics</h2>
                <div className="space-y-4">
                  {[
                    { label: "Fully Diluted Valuation", value: formatMarketCap(tokenData.marketCap) },
                    { label: "Price Change (7d)", value: "+12.5%", isPositive: true },
                    { label: "Price Change (30d)", value: "+28.3%", isPositive: true },
                    { label: "Holders Growth", value: "+8.3%", isPositive: true },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-slate-400">{metric.label}</span>
                      <span className={`text-sm font-semibold ${
                        metric.isPositive ? 'text-green-400' : 'text-slate-200'
                      }`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIODashboardPage;

