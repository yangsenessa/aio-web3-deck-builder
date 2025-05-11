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
    <div id="slide-6" className="slide flex flex-col items-center justify-center bg-dark p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Tokenomics ($AIO)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-muted/30 backdrop-blur-lg border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4 text-blue-400">Total Supply</h3>
              <p className="text-2xl font-bold text-white">21 Quadrillion $AIO</p>
              <p className="text-sm text-gray-400">(8 decimals)</p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4 text-purple-400">Use Cases</h3>
              <ul className="space-y-2">
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                  <span className="text-gray-300">Staking</span>
                </li>
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  <span className="text-gray-300">Invocation</span>
                </li>
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.8)]"></span>
                  <span className="text-gray-300">Rewards</span>
                </li>
                <li className="flex items-center group">
                  <span className="h-2 w-2 bg-red-500 rounded-full mr-2 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  <span className="text-gray-300">Governance</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-400">Incentives scaled by κ (staking coefficient)</p>
            </div>
          </div>
          
          <div className="bg-dark-muted/30 backdrop-blur-lg border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <h3 className="text-xl font-medium mb-4 text-center text-purple-400">Token Allocation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
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
                      color: '#9ca3af',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsSlide;
