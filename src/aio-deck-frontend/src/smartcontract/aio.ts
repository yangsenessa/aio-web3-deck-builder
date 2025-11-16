/**
 * @fileoverview AIO Integration Helper Functions
 * @description Minimal TypeScript helpers for interacting with Interaction contract
 * Supports both wagmi/viem and ethers v6
 */

// Type definitions (will work with viem and ethers when installed)
export type Address = `0x${string}` | string;
export type BytesLike = string | Uint8Array;
export type BigNumberish = string | number | bigint;

// ============================================================================
// Types
// ============================================================================

/**
 * Provider interface that works with both viem and ethers
 */
export interface ProviderLike {
  // Viem-style (wagmi)
  request?: (args: { method: string; params?: any[] }) => Promise<any>;
  chain?: any; // Chain info for viem
  
  // Ethers v6 style
  call?: (transaction: { to: string; data: string }) => Promise<string>;
  sendTransaction?: (transaction: { to: string; data: string; value?: bigint }) => Promise<{ hash: string }>;
  getSigner?: (address?: string) => Promise<any> | any; // Ethers signer
  getAddress?: () => Promise<string> | string; // For signers that have address
  
  // Common
  getCode?: (address: string) => Promise<string>;
}

export interface Config {
  feeWei: bigint;
  feeDistributor: Address;
  allowlistEnabled: boolean;
  aioToken?: Address;
  aioRewardPool?: Address;
}

export interface ClaimStatus {
  claimed: boolean;
  rewardAmount: bigint;
}

export interface InteractOptions {
  /** Interaction contract address */
  interactionAddress: Address;
  /** User's account address */
  account: Address;
  /** Action string (e.g., "send_pixelmug", "aio_rpc_call") */
  action: string;
  /** Metadata as JSON bytes (will be encoded) */
  meta: BytesLike;
  /** ETH value for interact() (must be >= feeWei) */
  value?: BigNumberish;
}

// ============================================================================
// ABI Imports (minimal ABIs)
// ============================================================================

import InteractionABI from "./abi/Interaction.json";

// ============================================================================
// Helper: Detect Provider Type
// ============================================================================

function isViemProvider(provider: any): boolean {
  // 检查是否是 viem provider (有 request 方法且不是 ethers provider)
  // ethers v6 BrowserProvider 也有 request 方法，但通常会有其他标识
  if (typeof provider.request === "function") {
    // 检查是否是 ethers provider (有 getSigner 方法)
    if (typeof provider.getSigner === "function" || provider.constructor?.name === "BrowserProvider") {
      return false;
    }
    return true;
  }
  return false;
}


// ============================================================================
// Helper: Encode Meta (JSON to bytes)
// ============================================================================

/**
 * Encodes JSON object to bytes (BytesLike)
 * @param meta JSON object or already encoded bytes
 */
export function encodeMeta(meta: object | BytesLike): BytesLike {
  if (typeof meta === "string" && meta.startsWith("0x")) {
    return meta; // Already encoded
  }
  if (typeof meta === "object") {
    return `0x${Buffer.from(JSON.stringify(meta)).toString("hex")}`;
  }
  throw new Error("Invalid meta: must be object or hex string");
}

// ============================================================================
// Global Configuration
// ============================================================================

/**
 * Global interaction contract address (can be set once)
 * @example
 * setInteractionAddress("0x...");
 */
let globalInteractionAddress: Address | null = null;

/**
 * Sets the global interaction contract address
 * @param address Interaction contract address
 */
export function setInteractionAddress(address: Address): void {
  globalInteractionAddress = address;
}

/**
 * Gets the global interaction contract address
 * @returns Interaction contract address or null
 */
export function getInteractionAddress(): Address | null {
  return globalInteractionAddress;
}

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Gets configuration from Interaction contract
 * @param provider Provider instance (viem or ethers)
 * @param interactionAddress Optional interaction contract address (uses global if not provided)
 * @returns Configuration object with feeWei and feeDistributor address
 */
export async function getConfig(
  provider: ProviderLike,
  interactionAddress?: Address
): Promise<Config> {
  const address = interactionAddress || globalInteractionAddress;
  if (!address) {
    throw new Error("Interaction contract address is required. Either pass it as parameter or set it globally using setInteractionAddress()");
  }
  try {
    if (isViemProvider(provider)) {
      // Viem/wagmi path
      const { createPublicClient, http } = await import("viem");
      const publicClient = createPublicClient({
        transport: http(),
        // @ts-ignore - provider might have chain info
        chain: provider.chain || undefined,
      });

      const result = await publicClient.readContract({
        address: address as `0x${string}`,
        abi: InteractionABI as any,
        functionName: "getConfig",
        args: [],
      }) as [bigint, `0x${string}`, boolean, `0x${string}`, `0x${string}`];

      return {
        feeWei: result[0],
        feeDistributor: result[1] as Address,
        allowlistEnabled: result[2] as boolean,
        aioToken: result[3] as Address,
        aioRewardPool: result[4] as Address,
      };
    } else {
      // Ethers v6 path
      const { Contract } = await import("ethers");
      
      // 对于 ethers v6，确保使用正确的 provider
      // BrowserProvider 需要用于只读调用
      let contractProvider = provider;
      
      // 如果 provider 有 call 方法，可以直接使用
      // 否则尝试创建 Contract 实例
      const contract = new Contract(address, InteractionABI as any, contractProvider as any);
      
      try {
        // 调用 getConfig
        // 在 ethers v6 中，view 函数返回的可能是数组或 Result 对象
        const result = await contract.getConfig();
        
        // 处理不同的返回值格式
        let values: any[];
        
        if (Array.isArray(result)) {
          // 直接是数组
          values = result;
        } else if (result && typeof result === 'object') {
          // 可能是 Result 对象（ethers v6 的返回格式）
          // 尝试访问数组索引或转换为数组
          if ('length' in result && typeof result.length === 'number') {
            // 类似数组的对象
            values = [];
            for (let i = 0; i < result.length; i++) {
              values.push(result[i]);
            }
          } else if (typeof result[Symbol.iterator] === 'function') {
            // 可迭代对象
            values = Array.from(result);
          } else {
            // 尝试作为对象访问（可能是命名返回值）
            values = [
              result.feeWei || result[0],
              result.feeDistributor || result[1],
              result.allowlistEnabled ?? result[2],
              result.aioToken || result[3],
              result.aioRewardPool || result[4],
            ];
          }
        } else {
          throw new Error(`getConfig returned unexpected type: ${typeof result}`);
        }
        
        // 确保有足够的返回值
        if (!values || values.length < 5) {
          throw new Error(`getConfig returned insufficient values: expected 5, got ${values?.length || 0}`);
        }
        
        const [feeWei, feeDistributor, allowlistEnabled, aioToken, aioRewardPool] = values;

        return {
          feeWei: BigInt(feeWei?.toString() || "0"),
          feeDistributor: (feeDistributor || "") as Address,
          allowlistEnabled: Boolean(allowlistEnabled),
          aioToken: (aioToken || "") as Address,
          aioRewardPool: (aioRewardPool || "") as Address,
        };
      } catch (callError: any) {
        // 提供更详细的错误信息以便调试
        const errorDetails = {
          message: callError.message || String(callError),
          address,
          providerType: provider.constructor?.name || typeof provider,
          resultType: typeof callError,
        };
        throw new Error(`Contract call failed: ${errorDetails.message}. Details: ${JSON.stringify(errorDetails)}`);
      }
    }
  } catch (error: any) {
    throw new Error(`Failed to get config: ${error.message || error}`);
  }
}

/**
 * Records an interaction with ETH fee payment (simplified signature)
 * @param provider Provider instance
 * @param action Action string (e.g., "send_pixelmug", "aio_rpc_call")
 * @param meta Metadata as JSON bytes or object (will be encoded)
 * @param value ETH value (must be >= feeWei)
 * @param options Optional: interactionAddress, account (if not provided, will try to infer from provider)
 * @returns Transaction hash
 */
export async function interact(
  provider: ProviderLike,
  action: string,
  meta: BytesLike,
  value: BigNumberish,
  options?: { interactionAddress?: Address; account?: Address }
): Promise<`0x${string}`>;

/**
 * Records an interaction with ETH fee payment (full options)
 * @param provider Provider instance
 * @param options Interaction options
 * @returns Transaction hash
 */
export async function interact(
  provider: ProviderLike,
  options: InteractOptions
): Promise<`0x${string}`>;

/**
 * Records an interaction with ETH fee payment
 * @param provider Provider instance
 * @param actionOrOptions Action string or full options object
 * @param meta Metadata (if using simplified signature)
 * @param value ETH value (if using simplified signature)
 * @param options Optional options (if using simplified signature)
 * @returns Transaction hash
 */
export async function interact(
  provider: ProviderLike,
  actionOrOptions: string | InteractOptions,
  meta?: BytesLike,
  value?: BigNumberish,
  options?: { interactionAddress?: Address; account?: Address }
): Promise<`0x${string}`> {
  // Handle function overload: detect if first param is options object
  let interactionAddress: Address;
  let account: Address;
  let action: string;
  let finalMeta: BytesLike;
  let finalValue: BigNumberish;

  if (typeof actionOrOptions === "object") {
    // Full options signature
    const opts = actionOrOptions as InteractOptions;
    interactionAddress = opts.interactionAddress;
    account = opts.account;
    action = opts.action;
    finalMeta = opts.meta;
    finalValue = opts.value || "0";
  } else {
    // Simplified signature
    action = actionOrOptions;
    finalMeta = meta!;
    finalValue = value!;
    interactionAddress = options?.interactionAddress || globalInteractionAddress || "";
    account = options?.account || "";

    if (!interactionAddress) {
      throw new Error("Interaction contract address is required. Either pass it in options or set it globally using setInteractionAddress()");
    }
    if (!account) {
      // Try to get account from provider (for ethers signers)
      if (typeof provider.getAddress === "function") {
        account = await provider.getAddress();
      } else {
        throw new Error("Account address is required. Please provide it in options or use a signer that has getAddress()");
      }
    }
  }

  // Encode meta if needed
  const encodedMeta = encodeMeta(finalMeta);

  // Get config to validate fee (outside try to use in catch)
  let feeWei: bigint;
  try {
    const config = await getConfig(provider, interactionAddress);
    feeWei = config.feeWei;
  } catch (error: any) {
    throw new Error(`Failed to get config: ${error.message || error}`);
  }

  const valueBigInt = typeof finalValue === "bigint" ? finalValue : BigInt(finalValue?.toString() || "0");

  // Validate fee
  if (valueBigInt < feeWei) {
    throw new Error(
      `Insufficient fee: requires at least ${feeWei.toString()} wei (approximately ${(Number(feeWei) / 1e18).toFixed(6)} ETH)`
    );
  }

  try {
    if (isViemProvider(provider)) {
      // Viem/wagmi path
      const { encodeFunctionData } = await import("viem");

      const data = encodeFunctionData({
        abi: InteractionABI as any,
        functionName: "interact",
        args: [action, encodedMeta],
      });

      const hash = await provider.request!({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: interactionAddress,
            data,
            value: `0x${valueBigInt.toString(16)}`,
          },
        ],
      });

      return hash as `0x${string}`;
    } else {
      // Ethers v6 path
      const { Contract } = await import("ethers");

      // Get signer from provider
      let signer = provider;
      if (typeof provider.getSigner === "function") {
        signer = await provider.getSigner(account);
      }

      const contract = new Contract(interactionAddress, InteractionABI as any, signer as any);
      const tx = await contract.interact(action, encodedMeta, {
        value: valueBigInt,
      });

      return tx.hash as `0x${string}`;
    }
  } catch (error: any) {
    // Provide helpful error messages
    if (error.message?.includes("insufficient fee")) {
      throw new Error(
        `Insufficient fee: requires at least ${feeWei.toString()} wei (approximately ${(Number(feeWei) / 1e18).toFixed(6)} ETH)`
      );
    }
    if (error.message?.includes("action not allowed")) {
      throw new Error(`Action "${action}" is not in the allowlist`);
    }
    throw new Error(`Interaction failed: ${error.message || error}`);
  }
}

/**
 * Claims AIO tokens for a completed interaction
 * @param provider Provider instance (viem or ethers)
 * @param action Action string identifier (must match the original interaction)
 * @param timestamp Block timestamp of the original interaction (from InteractionRecorded event)
 * @param options Optional: interactionAddress, account
 * @returns Transaction hash
 */
export async function claimAIO(
  provider: ProviderLike,
  action: string,
  timestamp: BigNumberish,
  options?: { interactionAddress?: Address; account?: Address }
): Promise<`0x${string}`> {
  const interactionAddress = options?.interactionAddress || globalInteractionAddress;
  if (!interactionAddress) {
    throw new Error("Interaction contract address is required. Either pass it in options or set it globally using setInteractionAddress()");
  }

  let account: Address = options?.account || "";
  if (!account) {
    if (typeof provider.getAddress === "function") {
      account = await provider.getAddress();
    } else {
      throw new Error("Account address is required. Please provide it in options or use a signer that has getAddress()");
    }
  }

  const timestampBigInt = typeof timestamp === "bigint" ? timestamp : BigInt(timestamp.toString());

  try {
    if (isViemProvider(provider)) {
      // Viem/wagmi path
      const { encodeFunctionData } = await import("viem");

      const data = encodeFunctionData({
        abi: InteractionABI as any,
        functionName: "claimAIO",
        args: [action, timestampBigInt],
      });

      const hash = await provider.request!({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: interactionAddress,
            data,
          },
        ],
      });

      return hash as `0x${string}`;
    } else {
      // Ethers v6 path
      const { Contract } = await import("ethers");

      let signer = provider;
      if (typeof provider.getSigner === "function") {
        signer = await provider.getSigner(account);
      }

      const contract = new Contract(interactionAddress, InteractionABI as any, signer as any);
      const tx = await contract.claimAIO(action, timestampBigInt);

      return tx.hash as `0x${string}`;
    }
  } catch (error: any) {
    // Provide helpful error messages
    if (error.message?.includes("already claimed")) {
      throw new Error("Reward for this interaction has already been claimed");
    }
    if (error.message?.includes("no reward configured")) {
      throw new Error(`No reward configured for action "${action}"`);
    }
    if (error.message?.includes("AIO token not set")) {
      throw new Error("AIO token address is not set");
    }
    if (error.message?.includes("AIO reward pool not set")) {
      throw new Error("AIO reward pool address is not set");
    }
    throw new Error(`Failed to claim reward: ${error.message || error}`);
  }
}

/**
 * Gets claim status for a specific interaction
 * @param provider Provider instance (viem or ethers)
 * @param user User address
 * @param action Action string identifier
 * @param timestamp Block timestamp of the original interaction
 * @param interactionAddress Optional interaction contract address (uses global if not provided)
 * @returns Claim status with claimed flag and reward amount
 */
export async function getClaimStatus(
  provider: ProviderLike,
  user: Address,
  action: string,
  timestamp: BigNumberish,
  interactionAddress?: Address
): Promise<ClaimStatus> {
  const address = interactionAddress || globalInteractionAddress;
  if (!address) {
    throw new Error("Interaction contract address is required. Either pass it as parameter or set it globally using setInteractionAddress()");
  }

  const timestampBigInt = typeof timestamp === "bigint" ? timestamp : BigInt(timestamp.toString());

  try {
    if (isViemProvider(provider)) {
      // Viem/wagmi path
      const { createPublicClient, http } = await import("viem");
      const publicClient = createPublicClient({
        transport: http(),
        // @ts-ignore - provider might have chain info
        chain: provider.chain || undefined,
      });

      const result = await publicClient.readContract({
        address: address as `0x${string}`,
        abi: InteractionABI as any,
        functionName: "getClaimStatus",
        args: [user, action, timestampBigInt],
      }) as [boolean, bigint];

      return {
        claimed: result[0] as boolean,
        rewardAmount: result[1] as bigint,
      };
    } else {
      // Ethers v6 path
      const { Contract } = await import("ethers");
      const contract = new Contract(address, InteractionABI as any, provider as any);
      const [claimed, rewardAmount] = await contract.getClaimStatus(user, action, timestampBigInt);

      return {
        claimed: claimed as boolean,
        rewardAmount: BigInt(rewardAmount.toString()),
      };
    }
  } catch (error: any) {
    throw new Error(`Failed to get claim status: ${error.message || error}`);
  }
}


