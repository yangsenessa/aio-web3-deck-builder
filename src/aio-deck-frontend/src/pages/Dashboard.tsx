import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Mic, Zap, Copy, ExternalLink, Check, Globe, Eye } from "lucide-react";
import { getTokenInfo, TOKEN_MINT_ADDRESS } from "../lib/solanaTokens";

const Dashboard: React.FC = () => {
  const [tokenData, setTokenData] = useState<{
    totalSupply: number;
    holders: number;
    mintAddress: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTokenInfo();
        setTokenData(data);
      } catch (err) {
        console.error("Failed to get token info:", err);
        setError("Unable to load token data");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };


  const features = [
    {
      title: "AIO Protocal",
      description: "A universal interaction protocol that lets AI agents, IoT devices, and blockchain systems communicate and collaborate.",
      icon: <Mic className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      link: "/aio",
    },
    {
      title: "Univoice",
      description: "Univoice is the voice-native AI brand powered by AIO-2030, enabling seamless, intelligent sound interaction everywhere.",
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      link: "/univoice",
    },
    {
      title: "PMug",
      description: "PMUG powers PixelMug — the AI-designed smart mug for warm and playful expression.",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-indigo-500 to-purple-500",
      link: "/pmug",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Banner Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <img 
            src="/banner.png" 
            alt="AIO Banner" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

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

      {/* $AIO Dashboard CTA Card */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link
          to="/aio-dashboard"
          className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-fuchsia-600/20 p-8 sm:p-10 hover:border-white/20 hover:from-indigo-600/30 hover:via-purple-600/30 hover:to-fuchsia-600/30 transition-all duration-300"
        >
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-1">
                      $AIO Token Dashboard
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300">
                      View real-time token metrics, price charts, and trading information
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <img 
                      src="/base.png" 
                      alt="Base Logo" 
                      className="w-5 h-5 object-contain"
                    />
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-sm text-slate-300">Base</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium group-hover:brightness-110 transition-all">
                  View Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-3xl group-hover:bg-fuchsia-500/30 transition-all"></div>
        </Link>
      </div>

      {/* Announcement Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative mb-8 mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-fuchsia-600/20 p-6 sm:p-8 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                  AIO has been linked to Smart Devices,e.g PixelMug
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-indigo-500/30 to-fuchsia-500/30 border border-white/10 flex-shrink-0">
                <img 
                  src="/pmugtoken.png" 
                  alt="PixelMug Token" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                    PixelMug joins the AIO lineup
                  </span>
                  <span className="block mt-2 text-xl sm:text-2xl lg:text-3xl text-slate-300 font-medium">
                    — lighting messages on mugs around the world
                  </span>
                </h2>
              </div>
            </div>
          </div>
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Token Data */}
      <div className="max-w-7xl mx-auto mb-8">
        {loading && (
          <div className="mb-6 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="text-slate-400">Loading...</div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-6 rounded-xl border border-red-500/20 bg-red-500/10">
            <div className="text-red-400">{error}</div>
          </div>
        )}

        {tokenData && !loading && !error && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Active Mugs Card - Image Top Right Layout */}
            <div className="relative overflow-hidden p-4 sm:p-5 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-fuchsia-600/10 hover:bg-gradient-to-br hover:from-indigo-600/15 hover:via-purple-600/15 hover:to-fuchsia-600/15 transition-all group">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                {/* Top section: Title, number, and image */}
                <div className="flex items-start justify-between mb-3">
                  {/* Left: Title and number */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0 mt-1"></div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-300">Active Mugs</div>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 font-mono leading-tight">
                        {tokenData.holders.toLocaleString('en-US')}
                      </div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent mt-1">
                        Delight the world·
                      </div>
                    </div>
                  </div>

                  {/* Right: Mug image - larger and in top right */}
                  <div className="relative flex-shrink-0 ml-3">
                    <img 
                      src="/Pmuglogo.png" 
                      alt="PixelMug Logo" 
                      className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-lg"
                    />
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                  </div>
                </div>

                {/* Bottom section: Visibility messages below image */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <div className="text-xs sm:text-sm text-slate-200 leading-tight">
                      <span className="text-indigo-200">Your creations are seen by</span>{" "}
                      <span className="text-fuchsia-300 font-bold text-sm sm:text-base">{tokenData.holders.toLocaleString('en-US')} holders</span>{" "}
                      <span className="text-indigo-200">worldwide</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <div className="text-xs sm:text-sm text-slate-300 leading-tight">
                      Light up mugs around the globe
                    </div>
                  </div>
                </div>

                {/* Decorative sparkles */}
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" />
                </div>
              </div>
            </div>
            
            {/* Token Info Card */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <div className="text-sm text-slate-400 mb-4 font-semibold">$PMUG</div>
              
              <div className="space-y-3">
                {/* Token Address */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-sm text-slate-300">Token Address</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-green-400">{formatAddress(TOKEN_MINT_ADDRESS)}</span>
                    <button
                      onClick={() => copyToClipboard(TOKEN_MINT_ADDRESS)}
                      className="p-1.5 rounded hover:bg-white/5 transition-colors"
                      title="Copy address"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Listing Dex */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-sm text-slate-300">Listing Dex</span>
                  <a
                    href="https://raydium.io/swap/?inputMint=sol&outputMint=V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span>Raydium V5</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Chart - Dextools */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-sm text-slate-300">Chart</span>
                  <a
                    href="https://www.dextools.io/app/solana/pair-explorer/V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span>Dextools</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Chart - Geckoterminal */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-sm text-slate-300">Chart</span>
                  <a
                    href="https://www.geckoterminal.com/solana/pools/V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span>Geckoterminal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Chart - Dexscreener */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Chart</span>
                  <a
                    href="https://dexscreener.com/solana/V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span>Dexscreener</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-6">
          Explore
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
                Ready to participate? Connect. Interact. Light Their PixelMug. — AIO2030
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

export default Dashboard;

