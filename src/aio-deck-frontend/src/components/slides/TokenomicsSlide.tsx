import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const TokenomicsSlide: React.FC = () => {
  const data = [
    { name: 'Community & Dev', value: 40, color: '#8884d8' },
    { name: 'Core Team & DAO', value: 20, color: '#82ca9d' },
    { name: 'Strategic Partners', value: 15, color: '#ffc658' },
    { name: 'Treasury / Reserve', value: 15, color: '#ff8042' },
    { name: 'Liquidity & Market', value: 10, color: '#0088fe' },
  ];

  return (
    <div
      id="slide-6"
      className="slide flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 40%, #f472b6 80%, #facc15 100%)',
        animation: 'gradientBG 18s ease infinite',
        backgroundSize: '800% 800%'
      }}
    >
      {/* Animated gradient keyframes */}
      <style>{`
        @keyframes gradientBG {
          0% {background-position:0% 50%}
          50% {background-position:100% 50%}
          100% {background-position:0% 50%}
        }
      `}</style>
      {/* Abstract shapes for ad style */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-400/30 rounded-full blur-2xl z-0 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-300/20 rounded-full blur-2xl z-0 animate-pulse" style={{transform: 'translate(-50%, -50%)'}}></div>
      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900 drop-shadow-lg">
          Tokenomics ($AIO)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#181c2f]/80 backdrop-blur-xl border border-blue-400/30 rounded-2xl shadow-2xl p-8 flex flex-col justify-between transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Total Supply</h3>
              <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">21 Quadrillion $AIO</p>
              <p className="text-sm text-gray-100/80">(8 decimals)</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-200">Use Cases</h3>
              <ul className="space-y-2">
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-blue-300 rounded-full mr-2"></span>
                  <span className="text-white">Staking</span>
                </li>
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-green-300 rounded-full mr-2"></span>
                  <span className="text-white">Invocation</span>
                </li>
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-yellow-200 rounded-full mr-2"></span>
                  <span className="text-white">Rewards</span>
                </li>
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-pink-300 rounded-full mr-2"></span>
                  <span className="text-white">Governance</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <p className="text-xs text-white/70">Incentives scaled by κ (staking coefficient)</p>
            </div>
          </div>
          <div className="bg-[#181c2f]/80 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col items-center transition-all duration-300 min-h-[370px]">
            <h3 className="text-lg font-semibold mb-3 text-purple-200 text-center">Token Allocation</h3>
            <div className="h-56 w-full flex items-center justify-center md:h-60">
              <ResponsiveContainer width="98%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="hover:opacity-80 transition-opacity duration-300"
                      />
                    ))}
                  </Pie>
                  <Legend 
                    wrapperStyle={{
                      color: '#fff',
                      fontSize: '13px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* --- REVISED: Token Incentives & Economic Model Section --- */}
      <div className="max-w-4xl w-full mt-12 relative z-10">
        <div className="rounded-2xl bg-[#181c2f]/90 backdrop-blur-xl border border-pink-400/30 shadow-2xl p-6 md:p-10 flex flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 mb-2 drop-shadow-lg">
            Token Incentives & Economic Model
          </h3>
          {/* Visual Summary Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-2 mb-4">
            {/* Issuance */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="bg-blue-400/30 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <span className="material-icons text-3xl text-blue-200">token</span>
              </div>
              <div className="font-bold text-blue-200 mb-1">Issuance</div>
              <div className="text-xs text-white/80">21Q $AIO<br/>Staking required<br/>Governance-controlled release</div>
            </div>
            {/* Incentives */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="bg-yellow-300/30 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <span className="material-icons text-3xl text-yellow-300">stars</span>
              </div>
              <div className="font-bold text-yellow-200 mb-1">Incentives</div>
              <div className="text-xs text-white/80">Earn by contributing<br/>Auto-stake & long-term rewards<br/>Categories: Submission, Usage, Bonus</div>
            </div>
            {/* Economic Model */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="bg-pink-400/30 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <span className="material-icons text-3xl text-pink-200">sync_alt</span>
              </div>
              <div className="font-bold text-pink-200 mb-1">Economic Model</div>
              <div className="text-xs text-white/80">$AIO for calls, storage, compute<br/>Burn for fees<br/>Staking = more rewards & voting</div>
            </div>
            {/* Key Metrics */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="bg-purple-400/30 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <span className="material-icons text-3xl text-purple-200">functions</span>
              </div>
              <div className="font-bold text-purple-200 mb-1">Key Metrics</div>
              <div className="text-xs text-white/80">Market Value = Price × Supply<br/>Liquidity = Volume / Value<br/>Staking boosts rewards</div>
            </div>
          </div>
          {/* Simple Flow Diagram */}
          <div className="flex flex-col items-center mt-2">
            <div className="w-full max-w-xl flex flex-row items-center justify-center gap-2">
              <span className="rounded-full bg-blue-400/60 w-8 h-8 flex items-center justify-center text-white font-bold text-lg shadow">U</span>
              <span className="rounded-full bg-yellow-300/60 w-8 h-8 flex items-center justify-center text-white font-bold text-lg shadow">C</span>
              <span className="rounded-full bg-purple-400/60 w-8 h-8 flex items-center justify-center text-white font-bold text-lg shadow">G</span>
              <span className="text-white font-bold text-xl mx-2">→</span>
              <span className="rounded-full bg-pink-400/80 w-10 h-10 flex items-center justify-center text-white font-bold text-xl shadow">M</span>
              <span className="text-white font-bold text-xl mx-2">/</span>
              <span className="rounded-full bg-green-400/80 w-10 h-10 flex items-center justify-center text-white font-bold text-xl shadow">CS</span>
              <span className="text-white font-bold text-xl mx-2">×</span>
              <span className="rounded-full bg-orange-400/80 w-10 h-10 flex items-center justify-center text-white font-bold text-xl shadow">κ</span>
            </div>
            <div className="text-xs text-white/70 mt-2 text-center">U: Usage Value, C: Compute Value, G: Governance Value, M: Market Value, CS: Circulating Supply, κ: Staking Coefficient</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsSlide;
