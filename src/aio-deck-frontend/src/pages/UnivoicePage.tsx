import React, { useState } from "react";
import { Sparkles, Check, Shield, Zap, Users, Globe } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const UnivoicePage: React.FC = () => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const nftDetails = {
    name: "Univoice NFT",
    price: "0.05 ETH",
    supply: "10,000",
    remaining: "7,234",
    description: "Exclusive voice identity NFT that grants access to premium AI voice features and enhanced IoT control capabilities.",
  };

  const benefits = [
    { icon: <Sparkles />, title: "Premium Voice Features", description: "Access advanced voice recognition and synthesis" },
    { icon: <Zap />, title: "Priority Processing", description: "Your commands get priority in the AIO network" },
    { icon: <Shield />, title: "Lifetime Access", description: "Permanent access to all Univoice features" },
    { icon: <Users />, title: "Community Rewards", description: "Earn bonus $AIO tokens as a holder" },
  ];

  const handlePurchase = () => {
    toast({
      title: "Purchase Initiated",
      description: `Please confirm the transaction for ${quantity} NFT(s) in your wallet.`,
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Univoice NFT
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Own your voice identity in the AI-powered future
          </p>
        </div>

        {/* NFT Sale Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: NFT Preview */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-50 animate-pulse" />
                    <Sparkles className="relative w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="text-sm text-slate-400 mb-1">Total Supply</div>
                  <div className="text-2xl font-bold text-slate-200">{nftDetails.supply}</div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="text-sm text-slate-400 mb-1">Remaining</div>
                  <div className="text-2xl font-bold text-purple-400">{nftDetails.remaining}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Purchase Card */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                {nftDetails.name}
              </h2>
              <p className="text-slate-400 mb-6">{nftDetails.description}</p>

              {/* Price */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Price</span>
                  <span className="text-2xl font-bold text-slate-200">{nftDetails.price}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-white/10 hover:bg-white/5 text-slate-200 transition-all"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-white/10 hover:bg-white/5 text-slate-200 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total</span>
                  <span className="text-xl font-bold text-slate-200">
                    {(parseFloat(nftDetails.price) * quantity).toFixed(3)} ETH
                  </span>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:brightness-110 transition-all"
              >
                Purchase NFT
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold text-slate-200 mb-6">NFT Holder Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center text-purple-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Information */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-200 mb-6">About Univoice</h2>
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              <strong className="text-slate-200">Univoice</strong> is a revolutionary NFT collection that represents your unique voice identity in the AIO2030 ecosystem. Each NFT is more than just a digital collectible—it's your key to enhanced AI-powered voice interactions and IoT control.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-slate-200">Global AI Network</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Connect to a worldwide network of AI-powered IoT devices with your unique voice signature.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-slate-200">Secure Identity</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Your voice profile is encrypted and secured on the blockchain, ensuring privacy and authenticity.
                </p>
              </div>
            </div>

            <p>
              As a Univoice NFT holder, you'll receive priority access to new features, exclusive airdrops, and enhanced rewards in the $AIO token ecosystem. The NFT also serves as governance token, allowing you to vote on protocol upgrades and new feature implementations.
            </p>

            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-2">
                <Check className="w-5 h-5 text-green-400" />
                <span className="font-bold text-slate-200">Limited Edition</span>
              </div>
              <p className="text-sm text-slate-400">
                Only 10,000 Univoice NFTs will ever be minted, making each one a rare and valuable asset in the growing AIO2030 ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnivoicePage;

