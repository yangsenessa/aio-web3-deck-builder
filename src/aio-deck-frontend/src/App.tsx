import { Routes, Route } from "react-router-dom";
import React, { Component, ErrorInfo, ReactNode, useMemo } from "react";
import { PhantomProvider, AddressType } from "@phantom/react-sdk";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import AIOPage from "./pages/AIOPage";
import AIODashboardPage from "./pages/AIODashboardPage";
import UnivoicePage from "./pages/UnivoicePage";
import PMugPage from "./pages/PMugPage";
import AboutAIO from "./pages/AboutAIO";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

// 错误边界组件，用于捕获 SDK 初始化错误
class PhantomSDKErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // 检查是否是 SDK 初始化错误
    if (error.message?.includes("Invalid providerType") || 
        error.message?.includes("providerType: undefined")) {
      console.warn("[App] Phantom SDK initialization error caught, will use direct window.solana:", error);
      return { hasError: true, error };
    }
    // 其他错误继续抛出
    return { hasError: false, error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[App] Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // SDK 初始化失败，但仍然渲染应用（WalletButton 会使用 window.solana 作为后备）
      console.log("[App] Rendering app without SDK, WalletButton will use direct connection");
    }
    
    // 即使有错误也渲染子组件，因为 WalletButton 有回退机制
    return this.props.children;
  }
}

// Solana Wallet Provider Component
const SolanaWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use mainnet-beta for production, devnet for development
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Configure wallets - 始终初始化 PhantomWalletAdapter 以支持 Phantom 钱包
  // 虽然这会在控制台显示 "Phantom was registered as a Standard Wallet" 警告，
  // 但这是正常的，因为 PhantomWalletAdapter 会自动注册为 EIP-6963 标准钱包
  // 这个警告不影响功能，只是信息提示
  const wallets = useMemo(() => {
    // 始终初始化 PhantomWalletAdapter，确保 Phantom 钱包功能可用
    // 即使当前只使用 MetaMask，用户也可能稍后需要连接 Phantom
    // WalletButton 中的 connectPhantom 函数会处理钱包检测和连接
    return [new PhantomWalletAdapter()];
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={(error) => {
          // Wallet-adapter handles errors gracefully
          console.error("[SolanaWalletProvider] Wallet error:", error);
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const App = () => (
  <PhantomSDKErrorBoundary>
    <PhantomProvider
      config={{
        // Use "injected" provider to directly connect to browser extension
        // No appId needed as this is direct extension connection, not embedded wallet
        providerType: "injected",
        addressTypes: [AddressType.solana, AddressType.ethereum],
      }}
    >
      <SolanaWalletProvider>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/aio" element={<MainLayout><AIOPage /></MainLayout>} />
          <Route path="/aio-dashboard" element={<MainLayout><AIODashboardPage /></MainLayout>} />
          <Route path="/univoice" element={<MainLayout><UnivoicePage /></MainLayout>} />
          <Route path="/pmug" element={<MainLayout><PMugPage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><AboutAIO /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </SolanaWalletProvider>
    </PhantomProvider>
  </PhantomSDKErrorBoundary>
);

export default App;
