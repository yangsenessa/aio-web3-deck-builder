import React, { useState } from "react";
import { Sparkles, Check, Shield, Zap, Users, Globe, ExternalLink, FileText, Mic, Lock, Cpu, Database, Code, Coins } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";

const UnivoicePage: React.FC = () => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const nftDetails = {
    name: "Univoice NFT",
    price: "???.?? ETH",
    supply: "??,???",
    remaining: "?,???",
    description: "Exclusive voice identity NFT that grants access to premium AI voice features and enhanced IoT control capabilities.",
  };

  const benefits = [
    { icon: <Sparkles />, title: "Premium Voice Features", description: "Access advanced voice recognition and synthesis" },
    { icon: <Zap />, title: "Priority Processing", description: "Your commands get priority in the AIO network" },
    { icon: <Shield />, title: "Lifetime Access", description: "Permanent access to all Univoice features" },
    { icon: <Users />, title: "Community Rewards", description: "Earn bonus $AIO tokens as a holder" },
  ];

  const features = [
    {
      icon: Cpu,
      title: "Fully on-chain smart contract infrastructure",
      description: "Built entirely on Internet Computer Protocol (ICP)",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      icon: Lock,
      title: "Personal data lives in encrypted ICP canisters",
      description: "Your data is stored in secure, tamper-proof containers",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Database,
      title: "Modular and composable AI architecture",
      description: "Flexible design that grows with your needs",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Immutable & privacy-first agent memory",
      description: "Your interactions are permanent and private",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  const handlePurchase = () => {
    toast({
      title: "Purchase Initiated",
      description: `Please confirm the transaction for ${quantity} NFT(s) in your wallet.`,
    });
  };

  const handleExploreWhitepaper = () => {
    window.location.href = '/whitepaper';
  };

  const handleJoinLaunch = () => {
    window.open('https://solscan.io/token/V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem', '_blank');
  };

  const handleToUnivoiceAgent = () => {
    console.log('Talk to Agent button clicked');
    const agentUrl = 'https://aio2030.fun/agentchat';
    console.log('Opening URL:', agentUrl);
    window.open(agentUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>
        
        {/* Ambient Particle Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Animated Voice Waveform */}
        <div className="absolute top-20 right-20 opacity-20">
          <div className="flex items-center space-x-1">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 40 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Brand Slogan Banner */}
        <div className="w-full bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-cyan-900/20 backdrop-blur-md border-b border-white/10 py-8 mt-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center relative">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-wider font-playfair">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Decentralized.
              </span>
              <span className="mx-3 bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Soulful.
              </span>
              <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-white bg-clip-text text-transparent">
                Co-creative.
              </span>
            </h2>
            <p className="text-lg text-gray-300 font-light italic">
              <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent">
                The world's first fully on-chain voice-AI network
              </span>
            </p>
          </div>
        </div>
        
        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content - Text */}
              <div className="space-y-8 animate-fade-in">
                {/* Main Headlines */}
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight text-center lg:text-left">
                    <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default gradient-animate">
                      Your Voice.
                    </span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default gradient-animate">
                      Your Agent.
                    </span>
                    <span className="block bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default gradient-animate">
                      On-Chain.
                    </span>
                  </h1>
                  
                  {/* Decorative underline */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Subheading */}
                <div className="space-y-4 text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
                  <p className="text-center lg:text-left">
                    Univoice is the world's first fully on-chain voice-AI network—built to create 
                    <span className="text-cyan-300 font-medium"> emotionally intelligent agents </span>
                    that speak, listen, and evolve with you.
                  </p>
                </div>

                {/* CTA Buttons - Swapped order */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6 relative z-30">
                  <Button 
                    onClick={handleJoinLaunch}
                    variant="outline"
                    size="lg"
                    className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-sm"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get $PMUG
                  </Button>
                  <Button 
                    onClick={handleExploreWhitepaper}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Explore Whitepaper
                  </Button>
                  
                  {/* Enhanced "Talk to Univoice Agent" Button - Fixed layering */}
                  <Button 
                    onClick={handleToUnivoiceAgent}
                    size="lg"
                    className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer z-50"
                    type="button"
                  >
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="relative">
                        <Mic className="w-6 h-6 animate-bounce" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-lg font-bold">Talk to Agent</span>
                        <span className="text-xs opacity-90 font-normal">Click & Speak Now!</span>
                      </div>
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    
                    {/* Pulsing Ring Effect - Behind button content */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 animate-ping -z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-10 animate-ping delay-200 -z-10"></div>
                  </Button>
                  
                  {/* Voice Wave Animation - Positioned separately to avoid interference */}
                  <div className="absolute -right-16 top-[180px] opacity-60 hover:opacity-100 transition-opacity pointer-events-none z-40">
                    <div className="flex items-center space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-gradient-to-t from-green-400 to-teal-400 rounded-full animate-pulse"
                          style={{
                            height: `${12 + i * 4}px`,
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: '1s'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Agent Illustration */}
              <div className="flex justify-center lg:justify-end animate-fade-in">
                <div className="relative group">
                  {/* Agent Container with Enhanced Effects - Expanded Scale */}
                  <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 hover:scale-105 transition-all duration-500 relative overflow-visible min-w-[400px] min-h-[500px]">
                    {/* Inner glow effect */}
                    <div className="absolute inset-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
                    
                    {/* Agent Image - Larger scale */}
                    <div className="relative z-10 flex justify-center items-center">
                      <img 
                        src="/lovable-uploads/univoicelogo.png" 
                        alt="Univoice AI Agent" 
                        className="w-96 h-96 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Token Symbol Badge - Repositioned for better visibility */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500/80 to-cyan-500/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 z-20">
                      <span className="text-white font-bold text-base">$PMUG</span>
                    </div>
                    
                    {/* Listening Indicator - Repositioned and enlarged */}
                    <div className="absolute bottom-6 left-6 flex items-center space-x-3 bg-black/40 backdrop-blur-sm px-4 py-3 rounded-full z-20">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">Listening...</span>
                    </div>
                  </div>
                  
                  {/* Outer Glow Ring - Expanded */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 -z-10 scale-110"></div>
                  
                  {/* Ambient Particles around Agent */}
                  <div className="absolute -top-4 -left-4 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-6 -right-6 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 -left-8 w-1 h-1 bg-pink-400/60 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400/60 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* NFT Section */}
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
              <div className="aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-50 animate-pulse" />
                <img 
                  src="/lovable-uploads/univoicelogo.png" 
                  alt="Univoice Logo" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
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
                disabled
                onClick={handlePurchase}
                className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg opacity-50 cursor-not-allowed transition-all"
              >
                Coming soon
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

      {/* Decentralized Voice AI Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        {/* Ambient grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h60v1H0zM0 0v60h1V0z'/%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-8 tracking-tight">
              Decentralized Voice AI, Secured by Design
            </h2>
          </div>

          {/* Main Content Layout */}
          <div className="max-w-4xl mx-auto mb-16">
            {/* Main Headline */}
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Your Agent.
                </span>
                <span className="block text-white">
                  Your Identity.
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                  On-Chain.
                </span>
              </h3>
            </div>
            
            {/* Body Content */}
            <div className="space-y-8">
              {/* Body Text */}
              <div className="text-center">
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  Univoice is built entirely on the Internet Computer Protocol (ICP), where your identity, memory, and voice data are stored in secure, tamper-proof smart contracts called canisters.
                </p>
              </div>
              
              {/* Agent Features Card */}
              <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 max-w-2xl mx-auto">
                <h4 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-6 text-center">Each Agent holds:</h4>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4 mt-1.5 flex-shrink-0"></div>
                    <span className="text-lg">Your voice alias</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 mt-1.5 flex-shrink-0"></div>
                    <span className="text-lg">Your personality traits & emotional memory</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 bg-pink-400 rounded-full mr-4 mt-1.5 flex-shrink-0"></div>
                    <span className="text-lg">Your interaction history & identity metadata</span>
                  </li>
                </ul>
              </div>
              
              {/* Concluding Statement */}
              <div className="text-center">
                <p className="text-xl md:text-2xl text-slate-400 italic max-w-2xl mx-auto">
                  And only you control what's shared, when, and with whom.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2 leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Quote */}
          <div className="text-center mt-16">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <p className="text-2xl md:text-3xl font-light text-white mb-6 leading-relaxed">
                Your voice. Your data. Your control.
              </p>
              <p className="text-xl md:text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                Built for a decentralized future where privacy is paramount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Builder Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-cyan-500/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        {/* Ambient grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h60v1H0zM0 0v60h1V0z'/%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Univoice as a Brand Builder
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
              Univoice isn't just tech—it's a co-created intelligence brand.
            </p>
            <p className="text-lg text-slate-400 max-w-5xl mx-auto leading-relaxed">
              Through its Super AI, Univoice unites developers, manufacturers, and $PMUG holders into a living, composable ecosystem. Together, they build emotionally intelligent products that speak with purpose—and scale with the market.
            </p>
            
            {/* Decorative lines */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full shadow-lg"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full shadow-lg"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {/* For Manufacturers */}
            <div className="space-y-6 bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  For Manufacturers
                </h3>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                Hardware manufacturers are core brand builders in the Univoice ecosystem. By embedding Univoice Agents into devices, they unlock:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Natural, human-first voice interaction</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Emotionally aligned storytelling via AI</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">$PMUG-powered incentive mechanisms for users</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Access to co-branded Agent marketplace & developer tools</span>
                </div>
              </div>
              
              <p className="text-orange-300 font-medium italic mt-6">
                These devices don't just respond—they resonate—with human intent and evolving demand.
              </p>
            </div>

            {/* For Developers */}
            <div className="space-y-6 bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  For Developers
                </h3>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                Univoice's AIO-MCP protocol empowers builders to:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Register & deploy on-chain AI modules</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Earn $PMUG for contributions and integrations</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Use tokens to access compute, license tools, or reward partners</span>
                </div>
              </div>
              
              <p className="text-cyan-300 font-medium italic mt-6">
                Developers don't just code—they co-author intelligence in a modular, composable way.
              </p>
            </div>

            {/* For Token Holders */}
            <div className="space-y-6 bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  For Token Holders
                </h3>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                $PMUG holders shape the economic loop:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">No team allocation or locked airdrops—only free-market circulation</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Manufacturers buy back $PMUG via product revenue</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">Tokens are used across compute, interaction, and licensing layers</span>
                </div>
              </div>
              
              <p className="text-teal-300 font-medium italic mt-6">
                To hold $PMUG is to own a stake in the world's first AI-native brand—powered by real usage, real emotion, and decentralized economic return.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UnivoicePage;

