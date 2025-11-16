import React, { useState, useCallback, useEffect } from "react";
import { Wallet, ExternalLink } from "lucide-react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  useWallet,
} from "@solana/wallet-adapter-react";
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
  chainId?: string | null;
}

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

// Base network configuration
const BASE_MAINNET = {
  chainId: "0x2105", // 8453 in hex
  chainName: "Base",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.base.org"],
  blockExplorerUrls: ["https://basescan.org"],
};

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

const WalletButton: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: null,
    provider: null,
    chainId: null,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [discoveredProviders, setDiscoveredProviders] = useState<Map<string, EIP6963ProviderDetail>>(new Map());

  // Use Solana wallet-adapter hooks (official recommended approach)
  const {
    publicKey: solanaPublicKey,
    wallet: solanaWallet,
    connect: connectSolanaWallet,
    disconnect: disconnectSolanaWallet,
    connected: isSolanaConnected,
    select,
    wallets,
  } = useWallet();

  // Note: We use wallet-adapter for all Solana wallet operations (official recommended approach)

  // Helper function to get SOL balance
  const getSolBalance = async (address: string): Promise<string> => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const publicKeyObj = new PublicKey(address);
      const balance = await connection.getBalance(publicKeyObj);
      return (balance / 1e9).toFixed(4);
    } catch (error) {
      console.warn("[WalletButton] getSolBalance: Unable to get balance:", error);
      return "0.0000";
    }
  };

  // Sync Solana wallet-adapter connection state with local wallet state
  useEffect(() => {
    if (isSolanaConnected && solanaPublicKey) {
      const address = solanaPublicKey.toString();
      if (wallet.address !== address || wallet.provider !== "phantom") {
        console.log("[WalletButton] useEffect: Solana wallet connected via wallet-adapter", {
          address,
          walletName: solanaWallet?.adapter.name,
        });
        
        // Get balance
        getSolBalance(address).then((balance) => {
          setWallet({
                connected: true,
            address,
            balance,
              provider: "phantom",
            chainId: null,
          });
        }).catch((err) => {
          console.error("[WalletButton] Failed to get Solana balance:", err);
          setWallet({
            connected: true,
            address,
            balance: null,
            provider: "phantom",
            chainId: null,
          });
        });
      }
    } else if (wallet.provider === "phantom" && !isSolanaConnected) {
      console.log("[WalletButton] useEffect: Solana wallet disconnected");
        setWallet(prev => ({
          ...prev,
          connected: false,
          address: null,
          balance: null,
        provider: null,
        }));
      }
  }, [isSolanaConnected, solanaPublicKey, solanaWallet, wallet.address, wallet.provider]);

  // EIP-6963: Discover wallets using the standard
  React.useEffect(() => {
    console.log("[WalletButton] EIP-6963: Setting up wallet discovery");
    const providers = new Map<string, EIP6963ProviderDetail>();

    // Listen for wallet announcements
    const handleAnnounceProvider = (event: EIP6963AnnounceProviderEvent) => {
      console.log("[WalletButton] EIP-6963: Wallet announced", {
        name: event.detail.info.name,
        uuid: event.detail.info.uuid,
        rdns: event.detail.info.rdns,
        isMetaMask: event.detail.provider?.isMetaMask,
      });
      providers.set(event.detail.info.uuid, event.detail);
      setDiscoveredProviders(new Map(providers));
    };

    // Request existing wallets to announce themselves
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // Listen for announcements
    window.addEventListener("eip6963:announceProvider", handleAnnounceProvider as EventListener);

    // Also check for legacy window.ethereum
    if (typeof window.ethereum !== "undefined") {
      console.log("[WalletButton] EIP-6963: Legacy window.ethereum found", {
        isMetaMask: window.ethereum.isMetaMask,
        hasProviders: !!window.ethereum.providers,
      });
    }

    return () => {
      window.removeEventListener("eip6963:announceProvider", handleAnnounceProvider as EventListener);
    };
  }, []);

  // Find MetaMask provider using EIP-6963 or fallback to legacy method
  const findMetaMaskProvider = (): any | null => {
    console.log("[WalletButton] findMetaMaskProvider: Starting search", {
      discoveredProvidersCount: discoveredProviders.size,
    });
    
    // First, try EIP-6963 discovered providers
    for (const [uuid, detail] of discoveredProviders.entries()) {
      const provider = detail.provider;
      const isMetaMask = 
        detail.info.name.toLowerCase().includes("metamask") ||
        detail.info.rdns === "io.metamask" ||
        provider?.isMetaMask === true;
      
      console.log("[WalletButton] findMetaMaskProvider: Checking provider", {
        uuid,
        name: detail.info.name,
        rdns: detail.info.rdns,
        isMetaMask,
      });
      
      if (isMetaMask) {
        console.log("[WalletButton] findMetaMaskProvider: Found MetaMask via EIP-6963", {
          uuid,
          name: detail.info.name,
          rdns: detail.info.rdns,
        });
        return provider;
      }
    }

    // Fallback to legacy method - but be careful with multiple providers
    console.log("[WalletButton] findMetaMaskProvider: Trying legacy method", {
      hasEthereum: typeof window.ethereum !== "undefined",
      hasProviders: !!window.ethereum?.providers,
      providersIsArray: Array.isArray(window.ethereum?.providers),
      providersLength: window.ethereum?.providers?.length,
      ethereumIsMetaMask: window.ethereum?.isMetaMask,
      ethereumIsOKX: window.ethereum?.isOKExWallet,
    });
    
    // ALWAYS check providers array first (most reliable when multiple wallets exist)
    // Even if it has only one element, it might be the correct one
    if (window.ethereum?.providers && Array.isArray(window.ethereum.providers) && window.ethereum.providers.length > 0) {
      console.log("[WalletButton] findMetaMaskProvider: Checking providers array", {
        count: window.ethereum.providers.length,
      });
      
      for (let i = 0; i < window.ethereum.providers.length; i++) {
        const p = window.ethereum.providers[i];
        const isOKX = p.isOKExWallet === true || p.isOKEx === true;
        const isMetaMask = p.isMetaMask === true && !isOKX;
        
        console.log("[WalletButton] findMetaMaskProvider: Provider", i, {
          isMetaMask: p.isMetaMask,
          isOKX: isOKX,
          isOKExWallet: p.isOKExWallet,
          isOKEx: p.isOKEx,
          selectedAddress: p.selectedAddress,
          willUse: isMetaMask,
        });
        
        if (isMetaMask) {
          console.log("[WalletButton] findMetaMaskProvider: Found MetaMask in providers array at index", i, {
            address: p.selectedAddress,
          });
          return p;
        }
      }
      
      console.warn("[WalletButton] findMetaMaskProvider: No MetaMask found in providers array");
    } else {
      console.log("[WalletButton] findMetaMaskProvider: No providers array or empty array");
    }
    
    // Only check window.ethereum if providers array doesn't exist or is empty
    // AND verify it's not OKX (OKX might set isMetaMask to true or not set isOKExWallet)
    if (window.ethereum?.isMetaMask === true) {
      // Check multiple ways to identify OKX
      const isOKX = 
        window.ethereum.isOKExWallet === true || 
        window.ethereum.isOKEx === true ||
        window.ethereum.isOkxWallet === true ||
        (window.ethereum as any).isOKX === true ||
        // Check constructor name or other identifiers
        (window.ethereum as any).constructor?.name?.includes("OKX") ||
        (window.ethereum as any).constructor?.name?.includes("Okx");
      
      // Additional check: if providers array exists but we're here, it means no MetaMask was found in array
      // So window.ethereum might be OKX even if isMetaMask is true
      const hasProvidersArray = window.ethereum?.providers && Array.isArray(window.ethereum.providers) && window.ethereum.providers.length > 0;
      const suspiciousIfProvidersExist = hasProvidersArray; // If providers exist but no MetaMask found, window.ethereum is likely OKX
      
      console.log("[WalletButton] findMetaMaskProvider: Checking window.ethereum", {
        isMetaMask: window.ethereum.isMetaMask,
        isOKX: isOKX,
        isOKExWallet: window.ethereum.isOKExWallet,
        isOKEx: window.ethereum.isOKEx,
        isOkxWallet: (window.ethereum as any).isOkxWallet,
        constructorName: (window.ethereum as any).constructor?.name,
        selectedAddress: window.ethereum.selectedAddress,
        hasProvidersArray: hasProvidersArray,
        suspiciousIfProvidersExist: suspiciousIfProvidersExist,
      });
      
      if (!isOKX && !suspiciousIfProvidersExist) {
        console.log("[WalletButton] findMetaMaskProvider: Found MetaMask via window.ethereum (verified not OKX)");
        return window.ethereum;
      } else {
        if (isOKX) {
          console.warn("[WalletButton] findMetaMaskProvider: window.ethereum is OKX (even though isMetaMask=true), rejecting");
        } else if (suspiciousIfProvidersExist) {
          console.warn("[WalletButton] findMetaMaskProvider: window.ethereum might be OKX (providers array exists but no MetaMask found), rejecting");
        }
      }
    } else {
      console.log("[WalletButton] findMetaMaskProvider: window.ethereum is not MetaMask or doesn't exist");
    }

    console.warn("[WalletButton] findMetaMaskProvider: MetaMask not found");
    return null;
  };

  // Switch to Base network (currently using testnet for debugging)
  const switchToBase = async (provider: any): Promise<boolean> => {
    try {
      console.log("[WalletButton] switchToBase: Starting network switch to Base Sepolia (testnet)");
      const currentChainId = await provider.request({
        method: "eth_chainId",
      });
      console.log("[WalletButton] switchToBase: Current chainId:", currentChainId);

      // If already on Base testnet, return directly
      if (currentChainId === BASE_TESTNET.chainId) {
        console.log("[WalletButton] switchToBase: Already on Base Sepolia testnet");
        return true;
      }

      // If on Base mainnet, we'll switch to testnet for debugging
      if (currentChainId === BASE_MAINNET.chainId) {
        console.log("[WalletButton] switchToBase: Currently on Base mainnet, switching to testnet");
      }

      // Try to switch to Base Sepolia testnet
      try {
        console.log("[WalletButton] switchToBase: Attempting to switch to Base Sepolia testnet");
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BASE_TESTNET.chainId }],
        });
        console.log("[WalletButton] switchToBase: Successfully switched to Base Sepolia testnet");
        return true;
      } catch (switchError: any) {
        console.log("[WalletButton] switchToBase: Switch error:", {
          code: switchError.code,
          message: switchError.message,
        });
        // If network doesn't exist, add network
        if (switchError.code === 4902) {
          console.log("[WalletButton] switchToBase: Network not found, adding Base Sepolia testnet");
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [BASE_TESTNET],
          });
          console.log("[WalletButton] switchToBase: Base Sepolia testnet added successfully");
          return true;
        }
        throw switchError;
      }
    } catch (error) {
      console.error("[WalletButton] switchToBase: Error switching to Base Sepolia testnet:", error);
      return false;
    }
  };

  const connectMetaMask = async () => {
    console.log("[WalletButton] connectMetaMask: Starting connection");
    try {
      // Find MetaMask provider using EIP-6963
      const provider = findMetaMaskProvider();
      
      if (!provider) {
        console.warn("[WalletButton] connectMetaMask: MetaMask not found");
        alert("Please install MetaMask! If already installed, make sure no other wallets (like OKX) are enabled at the same time.");
        return;
      }
      
      console.log("[WalletButton] connectMetaMask: Provider details:", {
        isMetaMask: provider.isMetaMask,
        selectedAddress: provider.selectedAddress,
        chainId: provider.chainId,
        providerType: provider.constructor?.name,
        hasRequest: typeof provider.request === "function",
        providerInfo: provider.info || "legacy",
      });

      // Switch to Base Sepolia testnet
      console.log("[WalletButton] connectMetaMask: Switching to Base Sepolia testnet");
      const switched = await switchToBase(provider);
      if (!switched) {
        console.error("[WalletButton] connectMetaMask: Failed to switch to Base Sepolia testnet");
        alert("Failed to switch to Base Sepolia testnet, please switch manually in your wallet");
        return;
      }
      console.log("[WalletButton] connectMetaMask: Successfully switched to Base Sepolia testnet");

      // 先检查是否有已授权的账户，如果有则先撤销权限，确保每次连接都会弹出确认框
      try {
        const existingAccounts = await provider.request({
          method: "eth_accounts",
        });
        if (existingAccounts && existingAccounts.length > 0) {
          console.log("[WalletButton] connectMetaMask: Found existing authorized accounts, revoking permissions to force confirmation");
          try {
            await provider.request({
              method: "wallet_revokePermissions",
              params: [{ eth_accounts: {} }],
            });
            console.log("[WalletButton] connectMetaMask: Permissions revoked successfully");
          } catch (revokeError: any) {
            // 如果撤销权限失败（可能是不支持该方法），继续尝试连接
            console.warn("[WalletButton] connectMetaMask: Failed to revoke permissions (may not be supported):", revokeError);
          }
        }
      } catch (checkError: any) {
        // 如果检查失败，继续尝试连接
        console.warn("[WalletButton] connectMetaMask: Failed to check existing accounts:", checkError);
      }

      // Request account connection - this will use the specific provider we found
      // 现在应该会弹出确认框，因为我们已经撤销了之前的权限
      console.log("[WalletButton] connectMetaMask: Requesting accounts from provider");
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      console.log("[WalletButton] connectMetaMask: Accounts received:", {
        count: accounts?.length,
        accounts: accounts,
        firstAccount: accounts?.[0],
        providerSelectedAddress: provider.selectedAddress,
        providerIsMetaMask: provider.isMetaMask,
        providerIsOKX: provider.isOKExWallet,
      });

      if (!accounts || accounts.length === 0) {
        console.error("[WalletButton] connectMetaMask: No accounts retrieved");
        alert("No accounts retrieved, please authorize connection");
        return;
      }

      // Always use the first account from the request - this comes from the provider we selected
      // Don't trust provider.selectedAddress as it might be from a different wallet
      const selectedAccount = accounts[0];
      console.log("[WalletButton] connectMetaMask: Account selection:", {
        providerSelectedAddress: provider.selectedAddress,
        firstAccountFromRequest: accounts[0],
        selectedAccount: selectedAccount,
        accountsMatch: provider.selectedAddress === accounts[0],
        usingRequestAccount: true,
      });
      
      // Verify the account is valid
      if (!selectedAccount || typeof selectedAccount !== "string") {
        console.error("[WalletButton] connectMetaMask: Invalid account address:", selectedAccount);
        alert("Invalid account address received");
        return;
      }
      
      // Double-check: verify the provider is actually MetaMask by checking the address format
      // MetaMask addresses should be valid Ethereum addresses
      if (!selectedAccount.startsWith("0x") || selectedAccount.length !== 42) {
        console.error("[WalletButton] connectMetaMask: Invalid address format:", selectedAccount);
        alert("Invalid address format received");
        return;
      }
      
      console.log("[WalletButton] connectMetaMask: Account validated:", {
        address: selectedAccount,
        format: `${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`,
        length: selectedAccount.length,
      });

      // Get current network information
      console.log("[WalletButton] connectMetaMask: Getting chain ID");
      const chainId = await provider.request({
        method: "eth_chainId",
      });
      console.log("[WalletButton] connectMetaMask: Chain ID:", chainId);

      // Get balance
      console.log("[WalletButton] connectMetaMask: Getting balance for account:", selectedAccount);
      const balance = await provider.request({
        method: "eth_getBalance",
        params: [selectedAccount, "latest"],
      });
      console.log("[WalletButton] connectMetaMask: Balance (hex):", balance);

      const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
      console.log("[WalletButton] connectMetaMask: Balance (ETH):", ethBalance);

      const walletState = {
        connected: true,
        address: selectedAccount,
        balance: ethBalance,
        provider: "metamask" as const,
        chainId: chainId,
      };
      console.log("[WalletButton] connectMetaMask: Setting wallet state:", {
        ...walletState,
        addressLength: selectedAccount.length,
        addressFormat: `${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`,
      });
      setWallet(walletState);
      setDialogOpen(false);
      console.log("[WalletButton] connectMetaMask: Connection successful, wallet state updated");
    } catch (error: any) {
      console.error("[WalletButton] connectMetaMask: Error:", {
        error,
        code: error?.code,
        message: error?.message,
        stack: error?.stack,
      });
      // Error is logged to console, no need to show error message
      if (error.code !== 4001) {
        console.error("[WalletButton] connectMetaMask: Connection error:", error.message || "Unknown error");
      }
    }
  };

  // Connect Phantom using wallet-adapter (official recommended approach)
  // wallet-adapter handles timeouts and errors automatically, no need for manual timeout handling
  const connectPhantom = useCallback(async () => {
    console.log("[WalletButton] connectPhantom: Starting connection");
    try {
      // Check if already connected
      if (isSolanaConnected && solanaPublicKey) {
        console.log("[WalletButton] connectPhantom: Already connected via wallet-adapter");
        setDialogOpen(false);
        return;
      }

      // Find Phantom wallet adapter from available wallets
      const phantomWallet = wallets.find(
        (w) => w.adapter.name === "Phantom" || w.adapter.name.toLowerCase().includes("phantom")
      );

      // 如果 wallet-adapter 中没有找到 Phantom，但检测到 window.solana，则直接使用 window.solana
      if (!phantomWallet) {
        if (window.solana?.isPhantom) {
          console.log("[WalletButton] connectPhantom: Phantom adapter not in wallets, but window.solana detected, using direct connection");
          try {
            const response = await window.solana.connect();
            const address = response.publicKey.toString();
            const balance = await getSolBalance(address);
            setWallet({
              connected: true,
              address,
              balance,
              provider: "phantom",
              chainId: null,
            });
            setDialogOpen(false);
            console.log("[WalletButton] connectPhantom: Connected via window.solana");
            return;
          } catch (error: any) {
            if (error.code !== 4001) {
              console.error("[WalletButton] connectPhantom: Direct connection error:", error);
              alert("Failed to connect to Phantom wallet. Please try again.");
            }
            return;
          }
        } else {
          console.warn("[WalletButton] connectPhantom: Phantom wallet adapter not found and window.solana not available");
          alert("Phantom wallet not detected. Please install Phantom extension.");
          return;
        }
      }

      // Check if wallet is ready
      if (phantomWallet.readyState === "Installed" || phantomWallet.readyState === "Loadable") {
        // Select Phantom wallet if not already selected
        if (!solanaWallet || solanaWallet.adapter.name !== phantomWallet.adapter.name) {
          console.log("[WalletButton] connectPhantom: Selecting Phantom wallet adapter");
          select(phantomWallet.adapter.name);
          // Wait a bit for wallet selection to complete
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        console.log("[WalletButton] connectPhantom: Connecting via wallet-adapter", {
          walletName: phantomWallet.adapter.name,
          readyState: phantomWallet.readyState,
        });

        // Use wallet-adapter to connect - it handles timeouts and errors automatically
        // No need for manual timeout handling as wallet-adapter does this internally
        await connectSolanaWallet();
        
        console.log("[WalletButton] connectPhantom: Connection successful via wallet-adapter");
        setDialogOpen(false);
            } else {
        console.warn("[WalletButton] connectPhantom: Phantom wallet not ready", {
          readyState: phantomWallet.readyState,
        });
        alert("Phantom wallet is not ready. Please ensure it is installed and unlocked.");
      }
    } catch (error: any) {
      console.error("[WalletButton] connectPhantom: Connection failed:", {
        error,
        code: error?.code,
        message: error?.message,
      });

      // Handle connection errors - wallet-adapter handles most errors gracefully
      if (error.code === 4001 || 
          error.message?.includes("User rejected") ||
          error.message?.includes("user rejected") ||
          error.message?.includes("User cancelled")) {
        // User rejected - no need to show error
        console.log("[WalletButton] connectPhantom: User rejected connection");
        } else {
        console.error("[WalletButton] connectPhantom: Connection error:", error.message || error);
        // wallet-adapter handles timeout errors automatically, so we don't need to show them
      }
    }
  }, [isSolanaConnected, solanaPublicKey, solanaWallet, connectSolanaWallet, select, wallets]);

  const disconnect = useCallback(async () => {
    // If currently connected to Phantom, disconnect using wallet-adapter
    if (wallet.provider === "phantom") {
      // Use wallet-adapter to disconnect (official recommended approach)
      if (isSolanaConnected) {
        try {
          await disconnectSolanaWallet();
          console.log("[WalletButton] disconnect: Phantom disconnected via wallet-adapter");
        } catch (error) {
          console.warn("[WalletButton] disconnect: Error disconnecting via wallet-adapter:", error);
        }
      }
    }
    
    // Update local state
    setWallet({
      connected: false,
      address: null,
      balance: null,
      provider: null,
      chainId: null,
    });
  }, [wallet.provider, isSolanaConnected, disconnectSolanaWallet]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Listen for network changes
  React.useEffect(() => {
    console.log("[WalletButton] useEffect: Setting up event listeners", {
      connected: wallet.connected,
      provider: wallet.provider,
      hasEthereum: !!window.ethereum,
    });
    
    if (wallet.connected && wallet.provider === "metamask" && window.ethereum) {
      const handleChainChanged = (chainId: string) => {
        console.log("[WalletButton] handleChainChanged: Chain changed to", chainId);
        setWallet((prev) => {
          console.log("[WalletButton] handleChainChanged: Updating wallet state", { ...prev, chainId });
          return { ...prev, chainId };
        });
        // If switched to non-Base testnet, notify user
        if (chainId !== BASE_TESTNET.chainId) {
          if (chainId === BASE_MAINNET.chainId) {
            console.warn("[WalletButton] handleChainChanged: On Base mainnet, but testnet is required for debugging");
          } else {
            console.warn("[WalletButton] handleChainChanged: Not on Base Sepolia testnet");
          }
        }
      };

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("[WalletButton] handleAccountsChanged: Accounts changed", accounts);
        if (accounts.length === 0) {
          console.log("[WalletButton] handleAccountsChanged: No accounts, disconnecting");
          disconnect();
        } else {
          console.log("[WalletButton] handleAccountsChanged: Updating address to", accounts[0]);
          setWallet((prev) => ({ ...prev, address: accounts[0] }));
        }
      };

      console.log("[WalletButton] useEffect: Adding event listeners");
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        console.log("[WalletButton] useEffect: Cleaning up event listeners");
        window.ethereum?.removeListener("chainChanged", handleChainChanged);
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, [wallet.connected, wallet.provider]);

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
              {wallet.provider === "metamask" && wallet.chainId && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Network</div>
                  <div className="text-sm text-slate-200">
                    {wallet.chainId === BASE_MAINNET.chainId
                      ? "Base Mainnet"
                      : wallet.chainId === BASE_TESTNET.chainId
                      ? "Base Sepolia"
                      : `Chain ID: ${parseInt(wallet.chainId, 16)}`}
                  </div>
                </div>
              )}
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
            onClick={(e) => {
              console.log("[WalletButton] MetaMask button clicked", {
                event: e,
                timestamp: new Date().toISOString(),
                target: e.target,
                currentTarget: e.currentTarget,
              });
              e.preventDefault();
              e.stopPropagation();
              connectMetaMask().catch((err) => {
                console.error("[WalletButton] MetaMask button onClick error:", err);
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
              console.log("[WalletButton] Phantom button clicked", {
                event: e,
                timestamp: new Date().toISOString(),
                target: e.target,
                currentTarget: e.currentTarget,
              });
              e.preventDefault();
              e.stopPropagation();
              connectPhantom().catch((err) => {
                console.error("[WalletButton] Phantom button onClick error:", err);
              });
            }}
            onMouseDown={(e) => {
              console.log("[WalletButton] Phantom button mouseDown", e);
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

export default WalletButton;

