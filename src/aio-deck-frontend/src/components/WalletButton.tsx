import React, { useState } from "react";
import { Wallet, Check, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string | null;
  provider: "metamask" | "phantom" | null;
}

const WalletButton: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: null,
    provider: null,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const connectMetaMask = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        });
        
        const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
        
        setWallet({
          connected: true,
          address: accounts[0],
          balance: ethBalance,
          provider: "metamask",
        });
        setDialogOpen(false);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const connectPhantom = async () => {
    try {
      if (typeof window.solana !== "undefined" && window.solana.isPhantom) {
        const response = await window.solana.connect();
        const publicKey = response.publicKey.toString();
        
        setWallet({
          connected: true,
          address: publicKey,
          balance: "0.0000",
          provider: "phantom",
        });
        setDialogOpen(false);
      } else {
        alert("Please install Phantom Wallet!");
      }
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
    }
  };

  const disconnect = () => {
    setWallet({
      connected: false,
      address: null,
      balance: null,
      provider: null,
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallet.connected && wallet.address) {
    return (
      <div className="flex items-center gap-2">
        {/* Balance Display (hidden on mobile) */}
        <div className="hidden sm:block px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
          <span className="text-slate-400">
            {wallet.balance} {wallet.provider === "metamask" ? "ETH" : "SOL"}
          </span>
        </div>

        {/* Connected Address */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="hidden sm:inline">{formatAddress(wallet.address)}</span>
              <Wallet size={16} className="sm:hidden" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#0E1117] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-slate-200">Wallet Connected</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Address</div>
                <div className="text-sm font-mono text-slate-200 break-all">
                  {wallet.address}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Balance</div>
                <div className="text-lg font-semibold text-slate-200">
                  {wallet.balance} {wallet.provider === "metamask" ? "ETH" : "SOL"}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Provider</div>
                <div className="text-sm text-slate-200 capitalize">
                  {wallet.provider}
                </div>
              </div>
              <button
                onClick={disconnect}
                className="w-full px-4 py-2 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all"
              >
                Disconnect
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-slate-200 hover:border-white/30 hover:bg-white/5 transition-all font-medium">
          <Wallet size={16} />
          <span className="hidden sm:inline">Connect Wallet</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#0E1117] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-slate-200">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <button
            onClick={connectMetaMask}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-xl">🦊</span>
              </div>
              <div className="text-left">
                <div className="text-slate-200 font-medium">MetaMask</div>
                <div className="text-xs text-slate-400">Connect to Ethereum</div>
              </div>
            </div>
            <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-200" />
          </button>

          <button
            onClick={connectPhantom}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-xl">👻</span>
              </div>
              <div className="text-left">
                <div className="text-slate-200 font-medium">Phantom</div>
                <div className="text-xs text-slate-400">Connect to Solana</div>
              </div>
            </div>
            <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-200" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Extend Window interface for wallet providers
declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

export default WalletButton;

