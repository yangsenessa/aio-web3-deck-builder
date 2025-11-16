/**
 * @fileoverview Wagmi 类型声明
 * @description 临时类型声明，用于在没有安装 wagmi 时避免 TypeScript 错误
 * 
 * 注意：要使用 InteractionButton.wagmi.tsx，需要安装 wagmi 依赖：
 * npm install wagmi viem @tanstack/react-query
 */

declare module 'wagmi' {
  export interface UseAccountReturnType {
    address: `0x${string}` | undefined;
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnected: boolean;
  }

  export function useAccount(): UseAccountReturnType;

  export interface UseWalletClientReturnType {
    data: any | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
  }

  export function useWalletClient(): UseWalletClientReturnType;

  export interface UsePublicClientReturnType {
    data: any | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
  }

  export function usePublicClient(): {
    data: any | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
  };

  export interface UseWaitForTransactionReceiptParameters {
    hash?: `0x${string}` | undefined;
    query?: any;
  }

  export interface UseWaitForTransactionReceiptReturnType {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: any;
  }

  export function useWaitForTransactionReceipt(
    parameters: UseWaitForTransactionReceiptParameters
  ): UseWaitForTransactionReceiptReturnType;
}

