/**
 * 集成示例：如何在 Dashboard 页面中使用 Token 持有者统计功能
 * 
 * 这个文件展示了如何将实时的 Solana Token 持有者数据集成到现有的 Dashboard 页面中
 * 您可以参考这些示例来修改 src/pages/Dashboard.tsx
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Mic, Zap, Users } from "lucide-react";
import { getTokenHolderCount, formatHolderCount } from "@/lib/solanaTokens";
import { TokenHolderStats } from "@/components/TokenHolderStats";

/**
 * 示例 1: 在 Dashboard 的 Stats 区域显示实时 Token 持有者数据
 */
const DashboardWithLiveStats: React.FC = () => {
  const [holderCount, setHolderCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHolderCount() {
      try {
        const count = await getTokenHolderCount();
        setHolderCount(count);
      } catch (error) {
        console.error('获取持有者数量失败:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchHolderCount();
  }, []);

  const stats = [
    { label: "Total Nodes", value: "12,456", change: "+12.5%", isLive: false },
    { 
      label: "Token Holders", 
      value: loading ? "..." : (holderCount ? formatHolderCount(holderCount) : "N/A"), 
      change: "Live",
      isLive: true 
    },
    { label: "Total Value Locked", value: "$2.4M", change: "+15.7%", isLive: false },
  ];

  const features = [
    {
      title: "AIO Platform",
      description: "Voice-activated AI orchestration for IoT devices",
      icon: <Mic className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      link: "/aio",
    },
    {
      title: "Univoice NFT",
      description: "Exclusive voice identity NFT collection",
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      link: "/univoice",
    },
    {
      title: "PMug Presale",
      description: "Smart IoT devices with AI integration",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-indigo-500 to-purple-500",
      link: "/pmug",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 p-8 sm:p-12">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              Welcome to AIO2030
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 max-w-2xl">
              The next-generation platform for AI-orchestrated IoT experiences. Connect your voice, control your world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/aio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-slate-200 hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/30 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Stats with Live Token Holder Count */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                {stat.label}
                {stat.isLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    LIVE
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold text-slate-200 mb-2 font-mono">
                {stat.value}
              </div>
              <div className={`text-sm ${stat.isLive ? 'text-green-400' : 'text-green-400'}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-6">
          Explore Our Ecosystem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-6 transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 mb-4">{feature.description}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-400 group-hover:gap-3 transition-all">
                Explore
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-indigo-600/10 to-fuchsia-600/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Ready to participate?
              </h3>
              <p className="text-slate-400">
                Connect your wallet and start earning $AIO rewards today.
              </p>
            </div>
            <Link
              to="/aio"
              className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all"
            >
              Start Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 示例 2: 使用 TokenHolderStats 组件在页面中单独显示
 */
const DashboardWithStatsCard: React.FC = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-200 mb-6">Dashboard</h1>
        
        {/* 使用预制的 TokenHolderStats 组件 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <TokenHolderStats />
          {/* 可以添加其他统计卡片 */}
        </div>
      </div>
    </div>
  );
};

/**
 * 示例 3: 简单的内联显示
 */
const SimpleTokenHolderDisplay: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getTokenHolderCount().then(setCount).catch(console.error);
  }, []);

  return (
    <div className="flex items-center gap-2 text-slate-300">
      <Users className="w-5 h-5" />
      <span>Token Holders: </span>
      <span className="font-mono font-bold">
        {count ? formatHolderCount(count) : '...'}
      </span>
    </div>
  );
};

export { DashboardWithLiveStats, DashboardWithStatsCard, SimpleTokenHolderDisplay };

