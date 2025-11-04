import React, { useState } from "react";
import { Coffee, Zap, Shield, TrendingUp, Clock, Check, Star } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const PMugPage: React.FC = () => {
  const { toast } = useToast();
  const [contribution, setContribution] = useState("0.1");
  const [activeTab, setActiveTab] = useState<"presale" | "about" | "tokenomics">("presale");

  const presaleData = {
    hardcap: "500 SOL",
    softcap: "250 SOL",
    raised: "347.5 SOL",
    progress: 69.5,
    minContribution: "0.1 SOL",
    maxContribution: "10 SOL",
    price: "1 SOL = 10,000 PMUG",
    startDate: "2025-11-01",
    endDate: "2025-12-01",
    participants: 1234,
  };

  const tokenMetrics = [
    { label: "Total Supply", value: "100,000,000 PMUG" },
    { label: "Presale Allocation", value: "30%" },
    { label: "Liquidity", value: "40%" },
    { label: "Team", value: "10%" },
    { label: "Marketing", value: "10%" },
    { label: "Development", value: "10%" },
  ];

  const features = [
    { icon: <Zap />, title: "IoT Integration", description: "Smart mug with LED display and temperature control" },
    { icon: <Shield />, title: "Verified Contract", description: "Audited by leading security firms" },
    { icon: <TrendingUp />, title: "Growth Potential", description: "First-mover in AI-IoT consumer products" },
    { icon: <Star />, title: "Utility Token", description: "Use PMUG tokens to unlock device features" },
  ];

  const handleContribute = () => {
    toast({
      title: "Contribution Initiated",
      description: `Please confirm the transaction for ${contribution} SOL in your wallet.`,
    });
  };

  const calculateTokens = (sol: string) => {
    const solAmount = parseFloat(sol) || 0;
    return (solAmount * 10000).toLocaleString();
  };

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
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/10 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">Presale Live</span>
          </div>
        </div>

        {/* Main Presale Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Progress Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-200">Presale Progress</h2>
                <span className="text-2xl font-bold text-indigo-400">{presaleData.progress}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-4 rounded-full bg-white/10 mb-6 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
                  style={{ width: `${presaleData.progress}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400 mb-1">Raised</div>
                  <div className="text-lg font-bold text-slate-200">{presaleData.raised}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400 mb-1">Hardcap</div>
                  <div className="text-lg font-bold text-slate-200">{presaleData.hardcap}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400 mb-1">Participants</div>
                  <div className="text-lg font-bold text-slate-200">{presaleData.participants}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400 mb-1">Your Contribution</div>
                  <div className="text-lg font-bold text-indigo-400">0 SOL</div>
                </div>
              </div>

              {/* Countdown */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/30">
                <div className="flex items-center gap-2 text-indigo-300 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Presale Ends In</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-200">12</div>
                    <div className="text-xs text-slate-400">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-200">08</div>
                    <div className="text-xs text-slate-400">Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-200">34</div>
                    <div className="text-xs text-slate-400">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-200">56</div>
                    <div className="text-xs text-slate-400">Seconds</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="flex border-b border-white/10 bg-white/5">
                {["presale", "about", "tokenomics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "text-indigo-400 border-b-2 border-indigo-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "presale" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-white/5">
                        <div className="text-xs text-slate-400 mb-1">Price</div>
                        <div className="text-sm font-bold text-slate-200">{presaleData.price}</div>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5">
                        <div className="text-xs text-slate-400 mb-1">Min - Max</div>
                        <div className="text-sm font-bold text-slate-200">
                          {presaleData.minContribution} - {presaleData.maxContribution}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-xs text-slate-400 mb-2">Presale Period</div>
                      <div className="text-sm text-slate-200">
                        {presaleData.startDate} to {presaleData.endDate}
                      </div>
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

          {/* Right: Contribution Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-xl font-bold text-slate-200 mb-4">Contribute Now</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Amount (SOL)</label>
                    <input
                      type="number"
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                      step="0.1"
                      min={presaleData.minContribution}
                      max={presaleData.maxContribution}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">You will receive</span>
                      <span className="text-lg font-bold text-indigo-400">
                        {calculateTokens(contribution)} PMUG
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleContribute}
                    className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:brightness-110 transition-all"
                  >
                    Contribute
                  </button>

                  <div className="text-xs text-slate-500 text-center">
                    By contributing, you agree to the terms and conditions
                  </div>
                </div>
              </div>

              {/* Quick Buy Buttons */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-sm text-slate-400 mb-3">Quick Amount</div>
                <div className="grid grid-cols-2 gap-2">
                  {["0.5", "1", "2", "5"].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setContribution(amount)}
                      className="px-4 py-2 rounded-lg border border-white/10 text-slate-200 hover:bg-white/5 transition-all"
                    >
                      {amount} SOL
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold text-slate-200 mb-6">Why PixelMug?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
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
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-200 mb-1">Contract Address</h3>
              <code className="text-sm text-slate-400 break-all">
                A6R3JpZsVonTgtAuDUSx8snN56GG9FxVhTHF5Xo9fLnH
              </code>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMugPage;

