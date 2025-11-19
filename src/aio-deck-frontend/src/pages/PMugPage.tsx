import React, { useState } from "react";
import { Coffee, Zap, Shield, TrendingUp, Check, Star, ExternalLink, BarChart3 } from "lucide-react";

const PMugPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"trading" | "about" | "tokenomics">("trading");

  // Real data from DexScreener
  const tradingData = {
    priceUSD: "$0.1452",
    priceSOL: "0.001040 SOL",
    liquidity: "$15,000",
    fdv: "$3,000,000",
    marketCap: "$3,000,000",
    pooledPMUG: "52,970 PMUG",
    pooledSOL: "55.090 SOL",
    holders: 318,
    liquidityProviders: 3,
    pairCreated: "1 month 20 days ago",
    pairAddress: "V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem",
    contractAddress: "V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem",
    dexscreenerUrl: "https://dexscreener.com/solana/V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem",
    launchTokenUrl: "https://dexscreener.com/launch",
  };

  const tokenMetrics = [
    { label: "Current Price (USD)", value: tradingData.priceUSD },
    { label: "Current Price (SOL)", value: tradingData.priceSOL },
    { label: "Liquidity", value: tradingData.liquidity },
    { label: "Fully Diluted Valuation (FDV)", value: tradingData.fdv },
    { label: "Market Cap", value: tradingData.marketCap },
    { label: "Holders", value: tradingData.holders.toLocaleString() },
    { label: "Liquidity Providers", value: tradingData.liquidityProviders },
  ];

  const features = [
    { icon: <Zap />, title: "IoT Integration", description: "Smart mug with LED display and temperature control" },
    { icon: <Shield />, title: "Verified Contract", description: "Audited by leading security firms" },
    { icon: <TrendingUp />, title: "Growth Potential", description: "First-mover in AI-IoT consumer products" },
    { icon: <Star />, title: "Utility Token", description: "Use PMUG tokens to unlock device features" },
  ];


  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            <Coffee className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            PixelMug (PMUG)
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-6">
            The world's first AI-powered smart mug with blockchain integration
          </p>
          
          {/* Trading Entrance Button */}
          <a
            href={tradingData.dexscreenerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-6 group relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Pulse indicator */}
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            {/* Button text */}
            <span className="relative z-10">Trade $PMUG Now</span>
            
            {/* Icon */}
            <BarChart3 className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </a>
        </div>

        {/* Token Purpose & Utility Section */}
        <section className="py-12 sm:py-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  💠 The Purpose, Utility & Flow of $PMUG
                </span>
              </h2>

              {/* Top Block Copy */}
              <div className="max-w-5xl mx-auto">
                <div className="rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-10 shadow-2xl mb-8">
                  <p className="text-xl sm:text-2xl md:text-3xl text-slate-200 leading-relaxed mb-6">
                    <span className="text-indigo-400 font-bold">$PMUG</span> is the native utility token that powers the entire Univoice ecosystem—from voice data to device interaction, from developer innovation to market expansion.
                  </p>
                  <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                    <span className="text-purple-400 font-semibold">It's not just a token. It's an engine for participation, alignment, and value realization.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Token Info Subsection */}
            <div className="mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Token Overview
                </span>
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {/* First row - 3 cards */}
                <div className="rounded-xl sm:rounded-2xl border border-purple-500/20 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl sm:text-3xl mb-3">🪙</div>
                  <h4 className="text-indigo-400 font-semibold mb-3 text-base sm:text-lg">Token Name</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">PixelMug</p>
                </div>

                <div className="rounded-xl sm:rounded-2xl border border-purple-500/20 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl sm:text-3xl mb-3">💎</div>
                  <h4 className="text-indigo-400 font-semibold mb-3 text-base sm:text-lg">Symbol</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">$PMUG</p>
                </div>

                <div className="rounded-xl sm:rounded-2xl border border-purple-500/20 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl sm:text-3xl mb-3">📊</div>
                  <h4 className="text-indigo-400 font-semibold mb-3 text-base sm:text-lg">Total Supply</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">21,000,000 (Fixed Cap)</p>
                </div>

                {/* Second row - 3 cards */}
                <div className="rounded-xl sm:rounded-2xl border border-purple-500/20 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl sm:text-3xl mb-3">🚀</div>
                  <h4 className="text-indigo-400 font-semibold mb-3 text-base sm:text-lg">Launch Type</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">Presale at Gempad</p>
                </div>

                {/* Center card - Buyback Reserve Allocation */}
                <div className="rounded-xl sm:rounded-2xl border-2 border-yellow-500/40 bg-gradient-to-br from-slate-800/40 to-purple-800/30 backdrop-blur-sm p-4 sm:p-6 hover:border-yellow-400/60 transition-all duration-300 hover:scale-110 shadow-lg">
                  <div className="text-2xl sm:text-3xl mb-3">💰</div>
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Buyback Reserve Allocation</h4>
                  <p className="text-slate-200 leading-relaxed text-sm font-medium">20%–50% (non-custodial, performance-based)</p>
                </div>

                <div className="rounded-xl sm:rounded-2xl border border-purple-500/20 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl sm:text-3xl mb-3">👥</div>
                  <h4 className="text-indigo-400 font-semibold mb-3 text-base sm:text-lg">Team Allocation</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">15%</p>
                </div>

                {/* Third row - 1 card centered */}
                <div className="md:col-span-2 lg:col-span-3 flex justify-center">
                  <div className="rounded-xl sm:rounded-2xl border border-purple-500/20 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105 max-w-sm w-full">
                    <div className="text-2xl sm:text-3xl mb-3">🔄</div>
                    <h4 className="text-indigo-400 font-semibold mb-3 text-base sm:text-lg">Initial Circulating Supply</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      30% allocated to early supporters through GemPad presale (Q3 2025)
                      <br/><br/>
                      No VC round, no private sale, no whitelist — open and transparent launch
                      <br/><br/>
                      50% of presale USDT + additional 5,000 USDT injected into initial liquidity pool
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Flow Table */}
            <div className="mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                <span className="bg-gradient-to-r from-indigo-400 to-green-400 bg-clip-text text-transparent">
                  🔄 Token Flow: Demand and Distribution
                </span>
              </h3>

              <div className="rounded-2xl sm:rounded-3xl border border-indigo-500/20 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 shadow-2xl overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Sources of Demand */}
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-green-400 mb-4 sm:mb-6 text-center">📈 Source of Demand</h4>
                      <div className="space-y-3 sm:space-y-4">
                        {[
                          "Buybacks initiated by manufacturer partners",
                          "Developer onboarding & MCP integration",
                          "AI compute, storage, and access usage",
                          "Partner ecosystem collaboration"
                        ].map((source, index) => (
                          <div key={index} className="rounded-xl border border-green-500/30 bg-green-900/20 p-3 sm:p-4">
                            <p className="text-slate-200 text-sm sm:text-base">{source}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Destinations */}
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-purple-400 mb-4 sm:mb-6 text-center">🎯 Destination of Tokens</h4>
                      <div className="space-y-3 sm:space-y-4">
                        {[
                          "Token redistributed to users & developers",
                          "Grants and incentives",
                          "Paid in $PMUG as platform credits for AI generation",
                          "$PMUG used for co-integration, growth incentives, joint rewards"
                        ].map((destination, index) => (
                          <div key={index} className="rounded-xl border border-purple-500/30 bg-purple-900/20 p-3 sm:p-4">
                            <p className="text-slate-200 text-sm sm:text-base">{destination}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sustainable Value Loop */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="rounded-2xl sm:rounded-3xl border border-purple-500/30 bg-gradient-to-r from-slate-800/40 to-purple-900/40 backdrop-blur-sm p-8 sm:p-12 sm:p-16 shadow-2xl">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Sustainable Value Loop
                  </span>
                </h3>

                <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed mb-6 sm:mb-8">
                  Univoice's unique economic flywheel is built on three pillars:
                </p>

                {/* Three Pillars */}
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="rounded-xl sm:rounded-2xl border border-indigo-500/20 bg-slate-900/30 backdrop-blur-sm p-6 sm:p-8">
                    <h4 className="text-xl sm:text-2xl font-bold text-indigo-400 mb-3 sm:mb-4">1. Voice → AI → Product</h4>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      Univoice Agents listen and learn from users to guide product design
                    </p>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl border border-purple-500/20 bg-slate-900/30 backdrop-blur-sm p-6 sm:p-8">
                    <h4 className="text-xl sm:text-2xl font-bold text-purple-400 mb-3 sm:mb-4">2. Product → Revenue → Token</h4>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      Manufacturers share revenue via $PMUG buybacks and token-based incentives
                    </p>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl border border-pink-500/20 bg-slate-900/30 backdrop-blur-sm p-6 sm:p-8">
                    <h4 className="text-xl sm:text-2xl font-bold text-pink-400 mb-3 sm:mb-4">3. Token → Community → Intelligence</h4>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      $PMUG fuels access, rewards participation, and strengthens the Agent economy
                    </p>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed">
                    This loop continuously reinforces itself—driving organic growth in token demand, AI usage, and co-created value.
                  </p>
                  <p className="text-2xl sm:text-3xl text-slate-200 leading-relaxed font-medium">
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
                      $PMUG is not just a utility token. It's the bridge between intelligent presence and economic expression—on-chain, composable, and community-owned.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="flex border-b border-white/10 bg-white/5">
                {["trading", "about", "tokenomics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "text-indigo-400 border-b-2 border-indigo-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab === "trading" ? "Trading Info" : tab === "about" ? "About" : "Tokenomics"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "trading" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/30">
                      <div className="text-sm text-slate-400 mb-2">Pair Address</div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-slate-200 break-all flex-1">
                          {tradingData.pairAddress}
                        </code>
                        <a
                          href={tradingData.dexscreenerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-white/5">
                        <div className="text-xs text-slate-400 mb-1">FDV</div>
                        <div className="text-lg font-bold text-slate-200">{tradingData.fdv}</div>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5">
                        <div className="text-xs text-slate-400 mb-1">Liquidity Providers</div>
                        <div className="text-lg font-bold text-slate-200">
                          {tradingData.liquidityProviders}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-xs text-slate-400 mb-2">View full data on DexScreener</div>
                      <a
                        href={tradingData.dexscreenerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300"
                      >
                        <span>Open DexScreener Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === "about" && (
                  <div className="space-y-4 text-slate-300">
                    <p>
                      PixelMug is a revolutionary smart IoT device that combines the functionality of a traditional mug with cutting-edge AI and blockchain technology.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>LED display shows custom animations and notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Temperature control and monitoring via mobile app</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Voice control through AIO2030 network</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>NFT-based customization and upgrades</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "tokenomics" && (
                  <div className="space-y-3">
                    {tokenMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-slate-400">{metric.label}</span>
                        <span className="font-bold text-slate-200">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-200 mb-6 text-center">Why PixelMug?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 flex items-center justify-center text-indigo-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contract Info */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-200 mb-2">Contract Address</h3>
                <code className="text-sm text-slate-400 break-all font-mono">
                  {tradingData.contractAddress}
                </code>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-400">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
                <a
                  href={tradingData.dexscreenerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/30 transition-all"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Trade Entrance</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AI-Driven Product Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden mt-16">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="space-y-16 sm:space-y-24">
              {/* Section Header */}
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-5xl sm:text-6xl mr-4 animate-spin-slow">🌀</div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI-Driven Product
                  </h2>
                </div>
                <div className="flex justify-center space-x-2 mb-8">
                  <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg"></div>
                  <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                  <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full shadow-lg"></div>
                </div>
              </div>

              {/* Univoice Product */}
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg animate-pulse">
                      <span className="text-2xl sm:text-3xl">🤖</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                      Powered By AIO-2030
                    </h3>
                  </div>
                  <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 mx-auto rounded-full shadow-lg"></div>
                </div>

                <div className="grid md:grid-cols-1 gap-8">
                  {/* Univoice Agents */}
                  <div className="rounded-2xl sm:rounded-3xl border border-purple-500/50 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-lg sm:text-xl">●</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Univoice Agents – Voice meets Emotion meets Chain
                        </h4>
                      </div>
                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 sm:p-6 rounded-xl">
                        Univoice Agents aren't just AI—they're your voice twin on-chain. Designed to understand nuance, tone, and emotional context across languages and cultures, these agents enable seamless, human-like interaction and community-centric conversations.
                      </p>
                    </div>
                  </div>

                  {/* Voice-AI Powered Smart Devices */}
                  <div className="rounded-2xl sm:rounded-3xl border border-green-500/50 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-lg sm:text-xl">●</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                          Voice-AI Powered Smart Devices
                        </h4>
                      </div>
                      <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6 bg-gradient-to-r from-emerald-800/40 to-teal-800/40 p-4 sm:p-6 rounded-xl border border-emerald-400/20">
                        Univoice collaborates with hardware innovators to integrate voice-AI into real-world products, e.g:
                      </p>
                      <ul className="space-y-4 text-slate-200 text-base sm:text-lg">
                        <li className="flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-blue-600/40 to-cyan-600/40 rounded-2xl border-2 border-blue-300/30 hover:border-blue-200/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <span className="text-xl sm:text-2xl">🎤</span>
                          </div>
                          <span className="font-semibold text-lg sm:text-xl">Smart voice pins (e.g. Plaud-style devices)</span>
                        </li>
                        <li className="flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-2xl border-2 border-purple-300/30 hover:border-purple-200/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <span className="text-xl sm:text-2xl">📓</span>
                          </div>
                          <span className="font-semibold text-lg sm:text-xl">Real-time translation notebooks</span>
                        </li>
                        <li className="flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-orange-600/40 to-yellow-600/40 rounded-2xl border-2 border-orange-300/30 hover:border-orange-200/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <span className="text-xl sm:text-2xl">🕶️</span>
                          </div>
                          <span className="font-semibold text-lg sm:text-xl">AI-enhanced smart glasses</span>
                        </li>
                      </ul>

                      {/* Pixel Mug Image */}
                      <div className="my-8 flex justify-center">
                        <img
                          src="/lovable-uploads/pmugproduct.png"
                          alt="World's First AI-Enhanced Mug with pixel Display"
                          className="rounded-xl shadow-lg max-w-full h-auto"
                        />
                      </div>

                      <p className="text-emerald-100 text-base sm:text-lg leading-relaxed mt-6 font-bold bg-gradient-to-r from-emerald-700/50 to-teal-700/50 p-4 sm:p-6 rounded-xl border-l-4 border-emerald-300">
                        The first voice-integrated device will launch in South Korea this season—delivering ambient AI in your pocket.
                      </p>
                    </div>
                  </div>

                  {/* KOLs Section */}
                  <div className="rounded-2xl sm:rounded-3xl border border-indigo-500/50 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-lg sm:text-xl">🌟</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          Millions of KOLs Power the Global Rise of Univoice AI Devices
                        </h4>
                      </div>

                      {/* KOL Image */}
                      <div className="mb-8 flex justify-center">
                        <img
                          src="/lovable-uploads/kol.png"
                          alt="KOLs supporting Univoice AI Devices"
                          className="rounded-2xl shadow-lg max-w-full h-auto border-4 border-indigo-300/30"
                        />
                      </div>

                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-4 sm:p-6 rounded-xl border-l-4 border-indigo-400">
                        Key Opinion Leaders (KOLs) and influencers worldwide are embracing Univoice AI devices, driving adoption and showcasing the revolutionary potential of voice-powered AI technology. Their authentic experiences and testimonials fuel the global expansion of our ecosystem.
                      </p>
                    </div>
                  </div>

                  {/* For Token Holders */}
                  <div className="rounded-2xl sm:rounded-3xl border border-yellow-500/50 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-lg sm:text-xl">●</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                          For Token Holders
                        </h4>
                      </div>
                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-4 sm:p-6 rounded-xl">
                        Holding and trading $PMUG gives users direct exposure to ecosystem value. As product adoption grows, so does the economic feedback loop powering $PMUG.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-Driven Product Innovation Loop */}
              <div className="flex justify-center mt-16">
                <div className="relative group max-w-4xl w-full">
                  <div className="rounded-2xl sm:rounded-3xl border border-purple-500/50 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden hover:scale-[1.02]">
                    <img
                      src="/lovable-uploads/pmugeconomic.png"
                      alt="AI-Driven Product Innovation Loop - Univoice AI connects Customer, Manufacturer, and generates insights"
                      className="w-full h-auto rounded-xl shadow-2xl"
                    />
                    <div className="absolute inset-4 sm:inset-6 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-pink-500/5 rounded-xl blur-xl"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-indigo-400/10 to-pink-400/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 -z-10 scale-110"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Launch Roadmap Section */}
        <section className="relative overflow-hidden w-full py-16 sm:py-24 mt-16">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-slate-900/95 to-black/95"></div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Launch Roadmap
                </h2>
              </div>
              <div className="flex justify-center space-x-2 mb-8">
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg"></div>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full shadow-lg"></div>
              </div>
            </div>

            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full mb-4"></div>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-4xl mx-auto">
                  Alongside our <span className="font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">$PMUG</span> token launch roadmap, we follow this <span className="font-semibold text-white">Univoice 2022‑26 development timeline</span>—ensuring alignment of economic model and technology rollout.
                </p>
              </div>

              {/* AIO Phases Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Phase 1 */}
                <div className="group rounded-xl sm:rounded-2xl border border-white/20 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">1</div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Infrastructure Initiation
                    </h4>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mb-3 font-medium">(2022–2023)</div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Laying the foundation with a distributed computing network and the launch of the AI Hub developer platform.
                  </p>
                </div>

                {/* Phase 2 */}
                <div className="group rounded-xl sm:rounded-2xl border border-white/20 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">2</div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Protocol Integration
                    </h4>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mb-3 font-medium">(2024–Early 2025)</div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Completion of core site infrastructure, development of the voice data network, and the first generation of AI Agent consensus logic.
                  </p>
                </div>

                {/* Phase 3 */}
                <div className="group rounded-xl sm:rounded-2xl border border-white/20 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">3</div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Agent Technology & Network Expansion
                    </h4>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mb-3 font-medium">(2025)</div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    From voice replication and generative speech to hardware integration—this stage marks the real-world deployment of the Univoice AI Agent framework.
                  </p>
                </div>

                {/* Phase 4 */}
                <div className="group rounded-xl sm:rounded-2xl border border-white/20 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">4</div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Ecosystem Scaling & Commercialization
                    </h4>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mb-3 font-medium">(Late 2025–2026)</div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Global product rollout, launch of the Univoice smart hardware innovation platform, and full integration into the agent economy.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <p className="text-lg sm:text-xl text-slate-200 font-light italic">
                All actions are automated, on-chain, and verifiable—designed for integrity at scale.
              </p>
              <div className="flex justify-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PMugPage;

