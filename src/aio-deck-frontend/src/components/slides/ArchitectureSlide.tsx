import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ArchitectureSlide: React.FC = () => {
  
  return (
    <div id="slide-5" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-6xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-12 text-white text-center tracking-tight"
        >
          One System, Three Layers
        </motion.h2>
        
        <div className="space-y-6 md:space-y-8">
          {/* Layer 1: ICP */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">ICP Layer — Compute & State</h3>
            </div>
            <p className="text-lg md:text-xl text-slate-300 ml-16">Large-scale execution & persistent memory for AI agents.</p>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-cyan-400/60" />
          </div>

          {/* Layer 2: Base + x402 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Base + x402 — Payment & Settlement</h3>
            </div>
            <p className="text-lg md:text-xl text-slate-300 ml-16">Micro-subscriptions, PoI event recording, fee routing.</p>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-cyan-400/60" />
          </div>

          {/* Layer 3: Solana / BNB */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Solana / BNB / Expression Chains</h3>
            </div>
            <p className="text-lg md:text-xl text-slate-300 ml-16">Cultural tokens, community expansion, brand identity growth.</p>
          </motion.div>
        </div>

        {/* Visual: Data + value flow arrows */}
        <div className="mt-12 flex items-center justify-center gap-4 text-cyan-400/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-sm">Data Flow</span>
          </div>
          <div className="w-px h-4 bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-sm">Value Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureSlide;
