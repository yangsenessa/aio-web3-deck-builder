
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
    <div id="slide-6" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Tokenomics ($AIO)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">Total Supply</h3>
              <p className="text-2xl font-bold">21 Quadrillion $AIO</p>
              <p className="text-sm text-muted-foreground">(8 decimals)</p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Use Cases</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Staking</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Invocation</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span>
                  <span>Rewards</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                  <span>Governance</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">Incentives scaled by κ (staking coefficient)</p>
            </div>
          </div>
          
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4 text-center">Token Allocation</h3>
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
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
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
