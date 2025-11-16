import React, { useState, useCallback, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

// Base network configuration
const BASE_TESTNET = {
  chainId: "0x14a34", // 84532 in hex
  chainName: "Base Sepolia",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
};

// EIP-6963 types
interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: any;
}

interface EIP6963AnnounceProviderEvent extends CustomEvent {
  detail: EIP6963ProviderDetail;
}

interface WalletConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnected?: (address: string, provider: "metamask" | "phantom") => void;
}

const WalletConnectionDialog: React.FC<WalletConnectionDialogProps> = ({
  open,
  onOpenChange,
  onConnected,
}) => {
  const [discoveredProviders, setDiscoveredProviders] = useState<Map<string, EIP6963ProviderDetail>>(new Map());

  // Use Solana wallet-adapter hooks
  const {
    publicKey: solanaPublicKey,
    wallet: solanaWallet,
    connect: connectSolanaWallet,
    connected: isSolanaConnected,
    select,
    wallets,
  } = useWallet();

  // Helper function to get SOL balance
  const getSolBalance = async (address: string): Promise<string> => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const publicKeyObj = new PublicKey(address);
      const balance = await connection.getBalance(publicKeyObj);
      return (balance / 1e9).toFixed(4);
    } catch (error) {
      console.warn("[WalletConnectionDialog] getSolBalance: Unable to get balance:", error);
      return "0.0000";
    }
  };

  // EIP-6963: Discover wallets using the standard
  useEffect(() => {
    const providers = new Map<string, EIP6963ProviderDetail>();

    const handleAnnounceProvider = (event: EIP6963AnnounceProviderEvent) => {
      providers.set(event.detail.info.uuid, event.detail);
      setDiscoveredProviders(new Map(providers));
    };

    window.dispatchEvent(new Event("eip6963:requestProvider"));
    window.addEventListener("eip6963:announceProvider", handleAnnounceProvider as EventListener);

    return () => {
      window.removeEventListener("eip6963:announceProvider", handleAnnounceProvider as EventListener);
    };
  }, []);

  // Find MetaMask provider using EIP-6963 or fallback to legacy method
  const findMetaMaskProvider = (): any | null => {
    // First, try EIP-6963 discovered providers
    for (const [uuid, detail] of discoveredProviders.entries()) {
      const provider = detail.provider;
      const isMetaMask = 
        detail.info.name.toLowerCase().includes("metamask") ||
        detail.info.rdns === "io.metamask" ||
        provider?.isMetaMask === true;
      
      if (isMetaMask) {
        return provider;
      }
    }

    // Fallback to legacy method
    if (window.ethereum?.providers && Array.isArray(window.ethereum.providers) && window.ethereum.providers.length > 0) {
      for (let i = 0; i < window.ethereum.providers.length; i++) {
        const p = window.ethereum.providers[i];
        const isOKX = p.isOKExWallet === true || p.isOKEx === true;
        const isMetaMask = p.isMetaMask === true && !isOKX;
        
        if (isMetaMask) {
          return p;
        }
      }
    }
    
    if (window.ethereum?.isMetaMask === true) {
      const isOKX = 
        window.ethereum.isOKExWallet === true || 
        window.ethereum.isOKEx === true ||
        window.ethereum.isOkxWallet === true ||
        (window.ethereum as any).isOKX === true ||
        (window.ethereum as any).constructor?.name?.includes("OKX") ||
        (window.ethereum as any).constructor?.name?.includes("Okx");
      
      const hasProvidersArray = window.ethereum?.providers && Array.isArray(window.ethereum.providers) && window.ethereum.providers.length > 0;
      const suspiciousIfProvidersExist = hasProvidersArray;
      
      if (!isOKX && !suspiciousIfProvidersExist) {
        return window.ethereum;
      }
    }

    return null;
  };

  // Switch to Base Sepolia network
  const switchToBase = async (provider: any): Promise<boolean> => {
    try {
      const currentChainId = await provider.request({
        method: "eth_chainId",
      });

      if (currentChainId === BASE_TESTNET.chainId) {
        return true;
      }

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BASE_TESTNET.chainId }],
        });
        return true;
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [BASE_TESTNET],
          });
          return true;
        }
        throw switchError;
      }
    } catch (error) {
      console.error("[WalletConnectionDialog] switchToBase: Error switching network:", error);
      return false;
    }
  };

  const connectMetaMask = async () => {
    try {
      const provider = findMetaMaskProvider();
      
      if (!provider) {
        alert("Please install MetaMask! If already installed, make sure no other wallets (like OKX) are enabled at the same time.");
        return;
      }

      // Switch to Base Sepolia testnet
      const switched = await switchToBase(provider);
      if (!switched) {
        alert("Failed to switch to Base Sepolia testnet, please switch manually in your wallet");
        return;
      }

      // Check and revoke existing permissions if needed
      try {
        const existingAccounts = await provider.request({
          method: "eth_accounts",
        });
        if (existingAccounts && existingAccounts.length > 0) {
          try {
            await provider.request({
              method: "wallet_revokePermissions",
              params: [{ eth_accounts: {} }],
            });
          } catch (revokeError: any) {
            console.warn("[WalletConnectionDialog] Failed to revoke permissions:", revokeError);
          }
        }
      } catch (checkError: any) {
        console.warn("[WalletConnectionDialog] Failed to check existing accounts:", checkError);
      }

      // Request account connection
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        alert("No accounts retrieved, please authorize connection");
        return;
      }

      const selectedAccount = accounts[0];
      
      if (!selectedAccount || typeof selectedAccount !== "string") {
        alert("Invalid account address received");
        return;
      }
      
      if (!selectedAccount.startsWith("0x") || selectedAccount.length !== 42) {
        alert("Invalid address format received");
        return;
      }

      // Get balance
      const balance = await provider.request({
        method: "eth_getBalance",
        params: [selectedAccount, "latest"],
      });
      const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);

      // Notify parent component
      if (onConnected) {
        onConnected(selectedAccount, "metamask");
      }

      onOpenChange(false);
    } catch (error: any) {
      if (error.code !== 4001) {
        console.error("[WalletConnectionDialog] connectMetaMask: Connection error:", error.message || "Unknown error");
      }
    }
  };

  // Connect Phantom using wallet-adapter
  const connectPhantom = useCallback(async () => {
    try {
      if (isSolanaConnected && solanaPublicKey) {
        if (onConnected) {
          onConnected(solanaPublicKey.toString(), "phantom");
        }
        onOpenChange(false);
        return;
      }

      // Find Phantom wallet adapter
      const phantomWallet = wallets.find(
        (w) => w.adapter.name === "Phantom" || w.adapter.name.toLowerCase().includes("phantom")
      );

      if (!phantomWallet) {
        if (window.solana?.isPhantom) {
          try {
            const response = await window.solana.connect();
            const address = response.publicKey.toString();
            if (onConnected) {
              onConnected(address, "phantom");
            }
            onOpenChange(false);
            return;
          } catch (error: any) {
            if (error.code !== 4001) {
              console.error("[WalletConnectionDialog] connectPhantom: Direct connection error:", error);
              alert("Failed to connect to Phantom wallet. Please try again.");
            }
            return;
          }
        } else {
          alert("Phantom wallet not detected. Please install Phantom extension.");
          return;
        }
      }

      if (phantomWallet.readyState === "Installed" || phantomWallet.readyState === "Loadable") {
        if (!solanaWallet || solanaWallet.adapter.name !== phantomWallet.adapter.name) {
          select(phantomWallet.adapter.name);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        await connectSolanaWallet();
        
        if (solanaPublicKey && onConnected) {
          onConnected(solanaPublicKey.toString(), "phantom");
        }
        onOpenChange(false);
      } else {
        alert("Phantom wallet is not ready. Please ensure it is installed and unlocked.");
      }
    } catch (error: any) {
      if (error.code !== 4001 && 
          !error.message?.includes("User rejected") &&
          !error.message?.includes("user rejected") &&
          !error.message?.includes("User cancelled")) {
        console.error("[WalletConnectionDialog] connectPhantom: Connection error:", error.message || error);
      }
    }
  }, [isSolanaConnected, solanaPublicKey, solanaWallet, connectSolanaWallet, select, wallets, onConnected, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0E1117] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-slate-200">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              connectMetaMask().catch((err) => {
                console.error("[WalletConnectionDialog] MetaMask button onClick error:", err);
              });
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-xl">🦊</span>
              </div>
              <div className="text-left">
                <div className="text-slate-200 font-medium">MetaMask</div>
                <div className="text-xs text-slate-400">Base Sepolia Testnet (ETH)</div>
              </div>
            </div>
            <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-200" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              connectPhantom().catch((err) => {
                console.error("[WalletConnectionDialog] Phantom button onClick error:", err);
              });
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-xl">👻</span>
              </div>
              <div className="text-left">
                <div className="text-slate-200 font-medium">Phantom</div>
                <div className="text-xs text-slate-400">Solana (SOL/PMUG)</div>
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

export default WalletConnectionDialog;

