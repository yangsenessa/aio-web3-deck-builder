import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const EcosystemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  const comparisonData = [
    {
      dimension: 'Core Positioning',
      aio: 'Distributed AI Interaction Protocol Layer',
      coze: 'Centralized bot/agent SaaS',
      eliza: 'Open-source personality agent runtime',
      caffeine: 'Decentralized AI compute and state layer'
    },
    {
      dimension: 'On-chain Proof',
      aio: 'Yes (Proof of Interaction)',
      coze: 'No',
      eliza: 'Optional',
      caffeine: 'Yes (Subnet-level)'
    },
    {
      dimension: 'Economy Model',
      aio: '$AIO fixed supply + Voice-to-N seasonal release + dual flywheel',
      coze: 'SaaS monetization',
      eliza: 'No native protocol token',
      caffeine: 'Compute-driven token economics'
    },
    {
      dimension: 'IoT Integration',
      aio: 'Strong native device interaction (PixelMug, others)',
      coze: 'Weak',
      eliza: 'Medium (extensible plugin-based)',
      caffeine: 'Medium'
    }
  ];
  
  return (
    <div id="slide-4" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-7xl w-full rounded-2xl p-6 md:p-10 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-white text-center tracking-tight">
          AIO-2030 vs Coze vs Eliza vs Caffeine (ICP)
        </h2>
        
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-cyan-500/30">
                <th className="py-4 px-4 text-left text-sm md:text-base font-semibold text-slate-300">Dimension</th>
                <th className="py-4 px-4 text-center text-sm md:text-base font-semibold text-cyan-400">AIO-2030</th>
                <th className="py-4 px-4 text-center text-sm md:text-base font-semibold text-slate-400">Coze</th>
                <th className="py-4 px-4 text-center text-sm md:text-base font-semibold text-slate-400">Eliza (ElizaOS)</th>
                <th className="py-4 px-4 text-center text-sm md:text-base font-semibold text-slate-400">Caffeine (ICP)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={`border-b border-slate-700/50 ${idx % 2 === 0 ? 'bg-slate-800/30' : ''}`}>
                  <td className="py-4 px-4 text-sm md:text-base font-medium text-slate-300">{row.dimension}</td>
                  <td className="py-4 px-4 text-sm md:text-base text-center text-cyan-300">{row.aio}</td>
                  <td className="py-4 px-4 text-sm md:text-base text-center text-slate-400">{row.coze}</td>
                  <td className="py-4 px-4 text-sm md:text-base text-center text-slate-400">{row.eliza}</td>
                  <td className="py-4 px-4 text-sm md:text-base text-center text-slate-400">{row.caffeine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EcosystemSlide;
