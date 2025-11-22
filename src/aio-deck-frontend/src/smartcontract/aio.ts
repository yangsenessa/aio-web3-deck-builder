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

import InteractionABIJson from "./abi/Interaction.json";
import AIOERC20ABIJson from "./abi/AIOERC20.json";
import FeeDistributorABIJson from "./abi/FeeDistributor.json";

// Extract the actual ABI array from the JSON files
// These JSON files contain full compilation output with 'abi', 'bytecode', etc.
// We need to extract just the 'abi' array for ethers.js/viem to work correctly
const InteractionABI = (InteractionABIJson as any).abi || InteractionABIJson;
const AIOERC20ABI = (AIOERC20ABIJson as any).abi || AIOERC20ABIJson;
const FeeDistributorABI = (FeeDistributorABIJson as any).abi || FeeDistributorABIJson;

// Export ABIs for use in other parts of the application
export { InteractionABI, AIOERC20ABI, FeeDistributorABI };

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
  // 确保 address 是字符串格式
  const addressStr = typeof address === 'string' ? address : (address as any)?.address || String(address);
  
  console.log('[BaseContract] getConfig: 开始调用', {
    address: addressStr,
    addressType: typeof addressStr,
    providerType: isViemProvider(provider) ? 'viem' : 'ethers',
    hasInteractionAddress: !!interactionAddress,
    hasGlobalAddress: !!globalInteractionAddress
  });

  if (!addressStr || addressStr === 'undefined' || addressStr === 'null') {
    console.error('[BaseContract] getConfig: 错误 - 缺少合约地址');
    throw new Error("Interaction contract address is required. Either pass it as parameter or set it globally using setInteractionAddress()");
  }
  try {
    if (isViemProvider(provider)) {
      console.log('[BaseContract] getConfig: 使用 Viem 路径');
      // Viem/wagmi path
      const { createPublicClient, http } = await import("viem");
      const publicClient = createPublicClient({
        transport: http(),
        // @ts-ignore - provider might have chain info
        chain: provider.chain || undefined,
      });

      console.log('[BaseContract] getConfig: 调用 Viem readContract', {
        address: addressStr,
        functionName: 'getConfig',
        args: []
      });

      const result = await publicClient.readContract({
        address: addressStr as `0x${string}`,
        abi: InteractionABI as any,
        functionName: "getConfig",
        args: [],
      }) as [bigint, `0x${string}`, `0x${string}`, `0x${string}`];

      console.log('[BaseContract] getConfig: Viem 调用成功', {
        feeWei: result[0].toString(),
        feeDistributor: result[1],
        aioToken: result[2],
        aioRewardPool: result[3]
      });

      return {
        feeWei: result[0],
        feeDistributor: result[1] as Address,
        aioToken: result[2] as Address,
        aioRewardPool: result[3] as Address,
      };
    } else {
      // Ethers v6 path
      console.log('[BaseContract] getConfig: 使用 Ethers v6 路径');
      const { Contract } = await import("ethers");
      
      // 对于 ethers v6，确保使用正确的 provider
      // BrowserProvider 需要用于只读调用
      let contractProvider = provider;
      
      console.log('[BaseContract] getConfig: 创建 Contract 实例', {
        address: addressStr,
        providerType: contractProvider.constructor?.name || typeof contractProvider
      });
      
      // 直接使用 encode/decode 方式，完全绕过 Contract 方法调用
      // 这样可以避免 ethers.js Result 对象的迭代问题
      console.log('[BaseContract] getConfig: 使用 encode/decode 方式调用合约');
      console.log('[BaseContract] getConfig: InteractionABI 类型:', typeof InteractionABI, '是否为数组:', Array.isArray(InteractionABI), '长度:', (InteractionABI as any)?.length);
      
      try {
        const { Interface } = await import("ethers");
        
        // 调试：检查 ABI 和函数定义
        console.log('[BaseContract] getConfig: 检查 ABI', {
          isArray: Array.isArray(InteractionABI),
          length: Array.isArray(InteractionABI) ? InteractionABI.length : 'N/A',
          hasGetConfig: Array.isArray(InteractionABI) ? InteractionABI.some((item: any) => item.name === 'getConfig') : false
        });
        
        // 查找 getConfig 函数定义
        const getConfigAbi = Array.isArray(InteractionABI) 
          ? InteractionABI.find((item: any) => item.type === 'function' && item.name === 'getConfig')
          : null;
        console.log('[BaseContract] getConfig: getConfig ABI 定义', getConfigAbi);
        
        const iface = new Interface(InteractionABI as any);
        
        // 编码函数调用
        console.log('[BaseContract] getConfig: 编码函数调用数据');
        const data = iface.encodeFunctionData("getConfig", []);
        console.log('[BaseContract] getConfig: 编码完成，数据长度:', data.length);
        
        // 调用合约
        console.log('[BaseContract] getConfig: 调用合约', { address: addressStr, data });
        const resultData = await contractProvider.call({ to: addressStr, data });
        console.log('[BaseContract] getConfig: 合约调用完成，结果数据长度:', resultData?.length);
        
        // 解码结果
        console.log('[BaseContract] getConfig: 解码返回结果');
        console.log('[BaseContract] getConfig: 原始返回数据:', resultData);
        console.log('[BaseContract] getConfig: 返回数据格式检查', {
          isString: typeof resultData === 'string',
          startsWith0x: typeof resultData === 'string' && resultData.startsWith('0x'),
          length: typeof resultData === 'string' ? resultData.length : 'N/A',
          expectedLength: 2 + 32 * 4 * 2, // 0x + 4 * 32 bytes * 2 (hex chars)
          actualLength: typeof resultData === 'string' ? resultData.length : 'N/A'
        });
        
        let decoded: any;
        try {
          // 尝试获取函数片段
          const getConfigFragment = iface.getFunction("getConfig");
          console.log('[BaseContract] getConfig: 函数片段', {
            name: getConfigFragment.name,
            inputs: getConfigFragment.inputs.length,
            outputs: getConfigFragment.outputs.length,
            outputsTypes: getConfigFragment.outputs.map((o: any) => o.type)
          });
          
          // 检查返回数据长度，判断实际返回值的数量
          // 如果返回数据是 4 * 32 字节（128 字节 = 256 十六进制字符 + 0x = 258 字符）
          // 但 ABI 定义有 5 个返回值，说明 ABI 定义可能不正确
          const dataLength = typeof resultData === 'string' ? resultData.length - 2 : 0; // 减去 0x
          const expectedLengthFor4 = 32 * 4 * 2; // 4 个 32 字节值
          const expectedLengthFor5 = 32 * 5 * 2; // 5 个 32 字节值
          
          console.log('[BaseContract] getConfig: 返回数据长度分析', {
            actualLength: dataLength,
            expectedFor4Values: expectedLengthFor4,
            expectedFor5Values: expectedLengthFor5,
            abiDefines: getConfigFragment.outputs.length,
            matches4: dataLength === expectedLengthFor4,
            matches5: dataLength === expectedLengthFor5
          });
          
          // 如果 ABI 定义有 5 个返回值，但实际数据只有 4 个值，说明 ABI 定义不正确
          // 这种情况下会解码失败，然后使用手动解析作为备用方案
          if (getConfigFragment.outputs.length === 5 && dataLength === expectedLengthFor4) {
            console.warn('[BaseContract] getConfig: ABI 定义与实际返回值不匹配（ABI 定义 5 个，实际 4 个），将使用手动解析');
            throw new Error('ABI definition mismatch: expected 5 values but got 4');
          }
          
          // 使用原始 ABI 解码
          decoded = iface.decodeFunctionResult("getConfig", resultData);
          console.log('[BaseContract] getConfig: 解码完成，返回值数量:', decoded.length);
        } catch (decodeError: any) {
          console.warn('[BaseContract] getConfig: Interface 解码失败，尝试手动解析', {
            error: decodeError.message,
            errorName: decodeError.name,
            errorCode: decodeError.code,
            errorInfo: decodeError.info,
            resultDataLength: resultData?.length,
            resultDataPreview: typeof resultData === 'string' ? resultData.slice(0, 100) + '...' : resultData
          });
          
          // 详细分析错误原因
          if (decodeError.code === 'BAD_DATA' || decodeError.message?.includes('ABI definition mismatch')) {
            console.error('[BaseContract] getConfig: 解码失败分析', {
              message: 'ethers.js 无法解码返回数据',
              rootCause: 'ABI 定义中的返回值数量与实际合约返回值不匹配',
              abiDefines: getConfigAbi?.outputs?.length || 'unknown',
              actualReturns: typeof resultData === 'string' ? (resultData.length - 2) / (32 * 2) : 'unknown',
              solution: '请在合约项目中修复 Interaction.json ABI 文件，确保 getConfig() 的输出定义与实际返回值一致',
              abiGetConfig: getConfigAbi,
              resultDataLength: typeof resultData === 'string' ? resultData.length : 'N/A',
              expectedLength: '258 (0x + 4 * 32 bytes * 2 hex chars) for 4 values, 322 for 5 values'
            });
          }
          
          // 手动解析返回数据
          // getConfig() 返回: (uint256, address, address, address)
          // 每个值都是 32 字节（64 个十六进制字符）
          if (resultData && resultData.startsWith('0x') && resultData.length >= 2 + 32 * 4 * 2) {
            const data = resultData.slice(2); // 移除 0x 前缀
            
            // 解析每个 32 字节的值
            const feeWeiHex = '0x' + data.slice(0, 64);
            const feeDistributorHex = '0x' + data.slice(64, 128);
            const aioTokenHex = '0x' + data.slice(128, 192);
            const aioRewardPoolHex = '0x' + data.slice(192, 256);
            
            // 转换地址（移除前导零，保留最后 40 个字符）
            const formatAddress = (hex: string): Address => {
              // 地址是 20 字节，在 32 字节中右对齐
              const addressPart = hex.slice(-40); // 取最后 40 个字符（20 字节）
              return `0x${addressPart}` as Address;
            };
            
            decoded = [
              BigInt(feeWeiHex),
              formatAddress(feeDistributorHex),
              formatAddress(aioTokenHex),
              formatAddress(aioRewardPoolHex)
            ];
            
            console.log('[BaseContract] getConfig: 手动解析成功', {
              feeWei: decoded[0].toString(),
              feeDistributor: decoded[1],
              aioToken: decoded[2],
              aioRewardPool: decoded[3]
            });
          } else {
            throw decodeError; // 如果数据格式不对，抛出原始错误
          }
        }
        
        // decoded 是一个数组，直接解构
        const [feeWei, feeDistributor, aioToken, aioRewardPool] = decoded;
        
        console.log('[BaseContract] getConfig: 解析成功', {
          feeWei: feeWei?.toString(),
          feeDistributor,
          aioToken,
          aioRewardPool
        });

        return {
          feeWei: BigInt(feeWei?.toString() || "0"),
          feeDistributor: (feeDistributor || "") as Address,
          aioToken: (aioToken || "") as Address,
          aioRewardPool: (aioRewardPool || "") as Address,
        };
      } catch (encodeErr: any) {
        console.error('[BaseContract] getConfig: encode/decode 方式失败', {
          error: encodeErr.message || String(encodeErr),
          stack: encodeErr.stack,
          errorName: encodeErr.name
        });
        
        // 如果 encode/decode 失败，尝试使用 Contract 方法（作为备用）
        console.log('[BaseContract] getConfig: encode/decode 失败，尝试 Contract 方法作为备用');
        try {
          const contract = new Contract(addressStr, InteractionABI as any, contractProvider as any);
          const result = await contract.getConfig();
          
          // 尝试直接解构
          const [feeWei, feeDistributor, aioToken, aioRewardPool] = result;
          
          return {
            feeWei: BigInt(feeWei?.toString() || "0"),
            feeDistributor: (feeDistributor || "") as Address,
            aioToken: (aioToken || "") as Address,
            aioRewardPool: (aioRewardPool || "") as Address,
          };
        } catch (contractErr: any) {
          console.error('[BaseContract] getConfig: Contract 方法也失败', {
            error: contractErr.message || String(contractErr),
            stack: contractErr.stack
          });
          throw encodeErr; // 抛出原始错误
        }
      }
    }
  } catch (error: any) {
    console.error('[BaseContract] getConfig: 函数执行失败', {
      error: error.message || String(error),
      stack: error.stack
    });
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
  console.log('[BaseContract] interact: 开始调用', {
    providerType: isViemProvider(provider) ? 'viem' : 'ethers',
    isOptionsObject: typeof actionOrOptions === 'object'
  });

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
    console.log('[BaseContract] interact: 使用完整选项签名', {
      interactionAddress,
      account,
      action,
      value: finalValue
    });
  } else {
    // Simplified signature
    action = actionOrOptions;
    finalMeta = meta!;
    finalValue = value!;
    interactionAddress = options?.interactionAddress || globalInteractionAddress || "";
    account = options?.account || "";

    if (!interactionAddress) {
      console.error('[BaseContract] interact: 错误 - 缺少合约地址');
      throw new Error("Interaction contract address is required. Either pass it in options or set it globally using setInteractionAddress()");
    }
    if (!account) {
      // Try to get account from provider (for ethers signers)
      if (typeof provider.getAddress === "function") {
        account = await provider.getAddress();
        console.log('[BaseContract] interact: 从 provider 获取账户地址', { account });
      } else {
        console.error('[BaseContract] interact: 错误 - 缺少账户地址');
        throw new Error("Account address is required. Please provide it in options or use a signer that has getAddress()");
      }
    }
    console.log('[BaseContract] interact: 使用简化签名', {
      interactionAddress,
      account,
      action,
      value: finalValue
    });
  }

  // Encode meta if needed
  const encodedMeta = encodeMeta(finalMeta);
  console.log('[BaseContract] interact: Meta 编码完成', {
    metaLength: encodedMeta.length,
    metaPreview: encodedMeta.substring(0, 100) + '...'
  });

  // Get config to validate fee (outside try to use in catch)
  let feeWei: bigint;
  try {
    console.log('[BaseContract] interact: 获取配置以验证费用');
    const config = await getConfig(provider, interactionAddress);
    feeWei = config.feeWei;
    console.log('[BaseContract] interact: 配置获取成功', {
      feeWei: feeWei.toString(),
      requiredFee: feeWei.toString()
    });
  } catch (error: any) {
    console.error('[BaseContract] interact: 获取配置失败', {
      error: error.message || String(error)
    });
    throw new Error(`Failed to get config: ${error.message || error}`);
  }

  const valueBigInt = typeof finalValue === "bigint" ? finalValue : BigInt(finalValue?.toString() || "0");

  // Validate fee
  if (valueBigInt < feeWei) {
    console.error('[BaseContract] interact: 费用不足', {
      provided: valueBigInt.toString(),
      required: feeWei.toString()
    });
    throw new Error(
      `Insufficient fee: requires at least ${feeWei.toString()} wei (approximately ${(Number(feeWei) / 1e18).toFixed(6)} ETH)`
    );
  }

  console.log('[BaseContract] interact: 费用验证通过', {
    provided: valueBigInt.toString(),
    required: feeWei.toString()
  });

  try {
    if (isViemProvider(provider)) {
      console.log('[BaseContract] interact: 使用 Viem 路径');
      // Viem/wagmi path
      const { encodeFunctionData } = await import("viem");

      const data = encodeFunctionData({
        abi: InteractionABI as any,
        functionName: "interact",
        args: [action, encodedMeta],
      });

      console.log('[BaseContract] interact: 发送 Viem 交易', {
        from: account,
        to: interactionAddress,
        value: `0x${valueBigInt.toString(16)}`,
        dataLength: data.length
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

      console.log('[BaseContract] interact: Viem 交易成功', { hash });
      return hash as `0x${string}`;
    } else {
      // Ethers v6 path
      console.log('[BaseContract] interact: 使用 Ethers v6 路径');
      const { Contract } = await import("ethers");

      // Get signer from provider
      let signer = provider;
      if (typeof provider.getSigner === "function") {
        console.log('[BaseContract] interact: 获取 signer', { account });
        signer = await provider.getSigner(account);
      }

      console.log('[BaseContract] interact: 创建 Contract 实例', {
        address: interactionAddress,
        action,
        value: valueBigInt.toString()
      });

      const contract = new Contract(interactionAddress, InteractionABI as any, signer as any);
      const tx = await contract.interact(action, encodedMeta, {
        value: valueBigInt,
      });

      console.log('[BaseContract] interact: Ethers 交易成功', {
        hash: tx.hash,
        action,
        value: valueBigInt.toString()
      });

      return tx.hash as `0x${string}`;
    }
  } catch (error: any) {
    console.error('[BaseContract] interact: 交易失败', {
      error: error.message || String(error),
      action,
      interactionAddress,
      account,
      value: valueBigInt.toString(),
      stack: error.stack
    });
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
 * @param amount Amount of AIO tokens to claim (in wei, 8 decimals - AIO Token uses 8 decimals)
 * @param options Optional: interactionAddress, account
 * @returns Transaction hash
 */
export async function claimAIO(
  provider: ProviderLike,
  amount: BigNumberish,
  options?: { interactionAddress?: Address; account?: Address }
): Promise<`0x${string}`> {
  console.log('[BaseContract] claimAIO: 开始调用', {
    amount: amount.toString(),
    providerType: isViemProvider(provider) ? 'viem' : 'ethers'
  });

  const interactionAddress = options?.interactionAddress || globalInteractionAddress;
  if (!interactionAddress) {
    console.error('[BaseContract] claimAIO: 错误 - 缺少合约地址');
    throw new Error("Interaction contract address is required. Either pass it in options or set it globally using setInteractionAddress()");
  }

  let account: Address = options?.account || "";
  if (!account) {
    if (typeof provider.getAddress === "function") {
      account = await provider.getAddress();
      console.log('[BaseContract] claimAIO: 从 provider 获取账户地址', { account });
    } else {
      console.error('[BaseContract] claimAIO: 错误 - 缺少账户地址');
      throw new Error("Account address is required. Please provide it in options or use a signer that has getAddress()");
    }
  }

  const amountBigInt = typeof amount === "bigint" ? amount : BigInt(amount.toString());
  console.log('[BaseContract] claimAIO: 参数准备完成', {
    interactionAddress,
    account,
    amount: amountBigInt.toString()
  });

  // 在调用前检查合约状态
  try {
    console.log('[BaseContract] claimAIO: 检查合约配置状态');
    const config = await getConfig(provider, interactionAddress);
    console.log('[BaseContract] claimAIO: 合约配置', {
      aioToken: config.aioToken,
      aioRewardPool: config.aioRewardPool,
      hasAioToken: !!config.aioToken && config.aioToken !== '0x0000000000000000000000000000000000000000',
      hasAioRewardPool: !!config.aioRewardPool && config.aioRewardPool !== '0x0000000000000000000000000000000000000000'
    });
    
    if (!config.aioToken || config.aioToken === '0x0000000000000000000000000000000000000000') {
      throw new Error("AIO token is not set in the contract. Please configure it first.");
    }
    if (!config.aioRewardPool || config.aioRewardPool === '0x0000000000000000000000000000000000000000') {
      throw new Error("AIO reward pool is not set in the contract. Please configure it first.");
    }
    console.log('[BaseContract] claimAIO: 合约配置检查通过');
  } catch (configErr: any) {
    console.error('[BaseContract] claimAIO: 合约配置检查失败', {
      error: configErr.message || String(configErr)
    });
    // 如果配置检查失败，仍然尝试调用，让合约返回更详细的错误
    console.log('[BaseContract] claimAIO: 继续尝试调用，合约可能会返回更详细的错误');
  }

  try {
    if (isViemProvider(provider)) {
      console.log('[BaseContract] claimAIO: 使用 Viem 路径');
      // Viem/wagmi path
      const { encodeFunctionData } = await import("viem");

      const data = encodeFunctionData({
        abi: InteractionABI as any,
        functionName: "claimAIO",
        args: [amountBigInt],
      });

      console.log('[BaseContract] claimAIO: 发送 Viem 交易', {
        from: account,
        to: interactionAddress,
        amount: amountBigInt.toString(),
        dataLength: data.length
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

      console.log('[BaseContract] claimAIO: Viem 交易成功', { hash });
      return hash as `0x${string}`;
    } else {
      // Ethers v6 path
      console.log('[BaseContract] claimAIO: 使用 Ethers v6 路径');
      const { Interface } = await import("ethers");

      let signer = provider;
      if (typeof provider.getSigner === "function") {
        console.log('[BaseContract] claimAIO: 获取 signer', { account });
        signer = await provider.getSigner(account);
      }

      console.log('[BaseContract] claimAIO: 使用 encode/decode 方式调用合约', {
        address: interactionAddress,
        amount: amountBigInt.toString()
      });
      console.log('[BaseContract] claimAIO: InteractionABI 类型:', typeof InteractionABI, '是否为数组:', Array.isArray(InteractionABI), '长度:', (InteractionABI as any)?.length);

      try {
        // 使用 Interface 编码函数调用数据
        const iface = new Interface(InteractionABI as any);
        
        // 编码函数调用
        console.log('[BaseContract] claimAIO: 编码函数调用数据');
        const data = iface.encodeFunctionData("claimAIO", [amountBigInt]);
        console.log('[BaseContract] claimAIO: 编码完成，数据长度:', data.length);

        // 先使用 call 检查交易是否会成功
        console.log('[BaseContract] claimAIO: 使用 call 预检查交易');
        try {
          // 检查合约代码是否存在
          const code = await signer.provider?.getCode(interactionAddress);
          console.log('[BaseContract] claimAIO: 合约代码检查', {
            hasCode: !!code && code !== '0x',
            codeLength: code?.length || 0
          });
          
          if (!code || code === '0x') {
            throw new Error(`No contract code found at address ${interactionAddress}. The contract may not be deployed.`);
          }
          
          await signer.call({
            to: interactionAddress,
            data,
          });
          console.log('[BaseContract] claimAIO: call 检查通过');
        } catch (staticErr: any) {
          console.error('[BaseContract] claimAIO: call 检查失败', {
            error: staticErr.message || String(staticErr),
            code: staticErr.code,
            data: staticErr.data,
            reason: staticErr.reason,
            errorName: staticErr.name,
            transaction: staticErr.transaction
          });
          
          // 尝试从错误中提取 revert 原因
          if (staticErr.data && staticErr.data !== '0x') {
            let decoded: any = null;
            let decodedErrorName = '';
            
            // 尝试从 Interaction ABI 解码
            try {
              decoded = iface.parseError(staticErr.data);
              decodedErrorName = decoded?.name || 'Unknown';
              console.error('[BaseContract] claimAIO: 从 Interaction ABI 解码的 revert 原因', decoded);
            } catch (decodeErr) {
              // 尝试从 FeeDistributor ABI 解码
              try {
                const feeDistributorIface = new Interface(FeeDistributorABI as any);
                decoded = feeDistributorIface.parseError(staticErr.data);
                decodedErrorName = decoded?.name || 'Unknown';
                console.error('[BaseContract] claimAIO: 从 FeeDistributor ABI 解码的 revert 原因', decoded);
              } catch (feeErr) {
                // 尝试从 AIOERC20 ABI 解码
                try {
                  const aioTokenIface = new Interface(AIOERC20ABI as any);
                  decoded = aioTokenIface.parseError(staticErr.data);
                  decodedErrorName = decoded?.name || 'Unknown';
                  console.error('[BaseContract] claimAIO: 从 AIOERC20 ABI 解码的 revert 原因', decoded);
                } catch (aioErr) {
                  // 如果所有 ABI 都无法解码，显示错误选择器
                  const errorSelector = staticErr.data.slice(0, 10); // 前4字节（8个十六进制字符 + 0x）
                  console.error('[BaseContract] claimAIO: 无法从任何 ABI 解码 revert 数据', {
                    errorSelector,
                    dataLength: staticErr.data.length,
                    dataPreview: staticErr.data.slice(0, 200),
                    suggestion: '这个错误可能来自合约内部调用的其他合约，或者是一个未在 ABI 中定义的自定义错误'
                  });
                }
              }
            }
            
            // 如果成功解码，提供更友好的错误信息
            if (decoded && decodedErrorName) {
              console.error('[BaseContract] claimAIO: 解码的错误详情', {
                errorName: decodedErrorName,
                args: decoded.args,
                signature: decoded.signature
              });
            }
          } else {
            console.error('[BaseContract] claimAIO: 没有 revert 数据，可能是合约状态问题或 RPC 节点问题');
            console.error('[BaseContract] claimAIO: 建议检查：1) 合约是否已部署 2) aioToken 和 aioRewardPool 是否已设置 3) 用户是否有可领取的奖励');
          }
          throw staticErr; // 抛出预检查错误
        }

        // 发送交易
        console.log('[BaseContract] claimAIO: 发送交易', {
          to: interactionAddress,
          data,
          amount: amountBigInt.toString()
        });
        
        const tx = await signer.sendTransaction({
          to: interactionAddress,
          data,
        });

        console.log('[BaseContract] claimAIO: Ethers 交易成功', {
          hash: tx.hash,
          amount: amountBigInt.toString()
        });

        return tx.hash as `0x${string}`;
      } catch (encodeErr: any) {
        console.error('[BaseContract] claimAIO: encode/decode 方式失败', {
          error: encodeErr.message || String(encodeErr),
          code: encodeErr.code,
          data: encodeErr.data,
          reason: encodeErr.reason,
          stack: encodeErr.stack,
          errorName: encodeErr.name
        });
        
        // 如果 encode/decode 失败，尝试使用 Contract 方法（作为备用）
        console.log('[BaseContract] claimAIO: encode/decode 失败，尝试 Contract 方法作为备用');
        try {
          const { Contract } = await import("ethers");
      const contract = new Contract(interactionAddress, InteractionABI as any, signer as any);
          
          // 先使用 staticCall 检查（ethers v6 语法）
          console.log('[BaseContract] claimAIO: Contract 方法 - 使用 staticCall 预检查');
          try {
            // 在 ethers v6 中，使用 staticCall 方法
            await contract.claimAIO.staticCall(amountBigInt);
            console.log('[BaseContract] claimAIO: Contract staticCall 检查通过');
          } catch (staticErr: any) {
            console.error('[BaseContract] claimAIO: Contract staticCall 检查失败', {
              error: staticErr.message || String(staticErr),
              code: staticErr.code,
              data: staticErr.data,
              reason: staticErr.reason
            });
            // 尝试解码 revert 原因（从所有相关 ABI）
            if (staticErr.data && staticErr.data !== '0x') {
              const { Interface } = await import("ethers");
              let decoded: any = null;
              
              // 尝试从 Interaction ABI 解码
              try {
                const iface = new Interface(InteractionABI as any);
                decoded = iface.parseError(staticErr.data);
                console.error('[BaseContract] claimAIO: 从 Interaction ABI 解码的 revert 原因', decoded);
              } catch (decodeErr) {
                // 尝试从 FeeDistributor ABI 解码
                try {
                  const feeDistributorIface = new Interface(FeeDistributorABI as any);
                  decoded = feeDistributorIface.parseError(staticErr.data);
                  console.error('[BaseContract] claimAIO: 从 FeeDistributor ABI 解码的 revert 原因', decoded);
                } catch (feeErr) {
                  // 尝试从 AIOERC20 ABI 解码
                  try {
                    const aioTokenIface = new Interface(AIOERC20ABI as any);
                    decoded = aioTokenIface.parseError(staticErr.data);
                    console.error('[BaseContract] claimAIO: 从 AIOERC20 ABI 解码的 revert 原因', decoded);
                  } catch (aioErr) {
                    const errorSelector = staticErr.data.slice(0, 10);
                    console.error('[BaseContract] claimAIO: 无法从任何 ABI 解码 revert 数据', {
                      errorSelector,
                      dataLength: staticErr.data.length
                    });
                  }
                }
              }
            }
            throw staticErr;
          }
          
          const tx = await contract.claimAIO(amountBigInt);
          
          console.log('[BaseContract] claimAIO: Contract 方法成功', {
            hash: tx.hash,
            amount: amountBigInt.toString()
          });

      return tx.hash as `0x${string}`;
        } catch (contractErr: any) {
          console.error('[BaseContract] claimAIO: Contract 方法也失败', {
            error: contractErr.message || String(contractErr),
            code: contractErr.code,
            reason: contractErr.reason,
            stack: contractErr.stack
          });
          throw encodeErr; // 抛出原始错误
        }
      }
    }
  } catch (error: any) {
    console.error('[BaseContract] claimAIO: 交易失败', {
      error: error.message || String(error),
      amount: amountBigInt.toString(),
      interactionAddress,
      account,
      stack: error.stack
    });
    // Provide helpful error messages
    if (error.message?.includes("already claimed")) {
      throw new Error("Reward for this interaction has already been claimed");
    }
    if (error.message?.includes("no reward configured")) {
      throw new Error("No reward configured for this interaction");
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
  console.log('[BaseContract] getClaimStatus: 开始调用', {
    user,
    action,
    timestamp: timestamp.toString(),
    providerType: isViemProvider(provider) ? 'viem' : 'ethers'
  });

  const address = interactionAddress || globalInteractionAddress;
  if (!address) {
    console.error('[BaseContract] getClaimStatus: 错误 - 缺少合约地址');
    throw new Error("Interaction contract address is required. Either pass it as parameter or set it globally using setInteractionAddress()");
  }

  const timestampBigInt = typeof timestamp === "bigint" ? timestamp : BigInt(timestamp.toString());
  console.log('[BaseContract] getClaimStatus: 参数准备完成', {
    address,
    user,
    action,
    timestamp: timestampBigInt.toString()
  });

  try {
    if (isViemProvider(provider)) {
      console.log('[BaseContract] getClaimStatus: 使用 Viem 路径');
      // Viem/wagmi path
      const { createPublicClient, http } = await import("viem");
      const publicClient = createPublicClient({
        transport: http(),
        // @ts-ignore - provider might have chain info
        chain: provider.chain || undefined,
      });

      console.log('[BaseContract] getClaimStatus: 调用 Viem readContract', {
        address,
        functionName: 'getClaimStatus',
        args: [user, action, timestampBigInt.toString()]
      });

      const result = await publicClient.readContract({
        address: address as `0x${string}`,
        abi: InteractionABI as any,
        functionName: "getClaimStatus",
        args: [user, action, timestampBigInt],
      }) as [boolean, bigint];

      console.log('[BaseContract] getClaimStatus: Viem 调用成功', {
        claimed: result[0],
        rewardAmount: result[1].toString()
      });

      return {
        claimed: result[0] as boolean,
        rewardAmount: result[1] as bigint,
      };
    } else {
      // Ethers v6 path
      console.log('[BaseContract] getClaimStatus: 使用 Ethers v6 路径');
      const { Contract } = await import("ethers");
      const contract = new Contract(address, InteractionABI as any, provider as any);
      
      console.log('[BaseContract] getClaimStatus: 调用合约方法 getClaimStatus()', {
        address,
        user,
        action,
        timestamp: timestampBigInt.toString()
      });

      const result = await contract.getClaimStatus(user, action, timestampBigInt);

      console.log('[BaseContract] getClaimStatus: 合约调用结果', {
        type: typeof result,
        isArray: Array.isArray(result),
        hasLength: 'length' in result,
        length: 'length' in result ? result.length : undefined,
        raw: result
      });

      // 处理不同的返回值格式（与 getConfig 类似）
      let claimed: boolean;
      let rewardAmount: bigint;

      if (result === null || result === undefined) {
        throw new Error(`getClaimStatus returned null or undefined`);
      }

      if (Array.isArray(result)) {
        // 直接是数组
        claimed = result[0] as boolean;
        rewardAmount = BigInt(result[1]?.toString() || "0");
        console.log('[BaseContract] getClaimStatus: 结果直接是数组', {
          claimed,
          rewardAmount: rewardAmount.toString()
        });
      } else if (result && typeof result === 'object') {
        // 可能是 Result 对象（ethers v6 的返回格式）
        // 合约返回命名值：claimed, rewardAmount
        
        // 方法1: 尝试索引访问
        if (result[0] !== undefined && result[1] !== undefined) {
          claimed = result[0] as boolean;
          rewardAmount = BigInt(result[1]?.toString() || "0");
          console.log('[BaseContract] getClaimStatus: 通过索引访问成功', {
            claimed,
            rewardAmount: rewardAmount.toString()
          });
        } else if (result.claimed !== undefined || result.rewardAmount !== undefined) {
          // 方法2: 尝试命名属性访问
          claimed = result.claimed as boolean;
          rewardAmount = BigInt((result.rewardAmount || result[1] || "0").toString());
          console.log('[BaseContract] getClaimStatus: 通过命名属性访问成功', {
            claimed,
            rewardAmount: rewardAmount.toString(),
            claimedProp: result.claimed,
            rewardAmountProp: result.rewardAmount
          });
        } else if ('length' in result && typeof result.length === 'number') {
          // 方法3: 使用 length 属性
          claimed = result[0] as boolean;
          rewardAmount = BigInt(result[1]?.toString() || "0");
          console.log('[BaseContract] getClaimStatus: 通过 length 属性访问成功', {
            claimed,
            rewardAmount: rewardAmount.toString()
          });
        } else {
          console.error('[BaseContract] getClaimStatus: 无法解析返回值格式', { result });
          throw new Error(`getClaimStatus returned unexpected format: ${JSON.stringify(result)}`);
        }
      } else {
        console.error('[BaseContract] getClaimStatus: 返回值类型错误', {
          type: typeof result,
          value: String(result)
        });
        throw new Error(`getClaimStatus returned unexpected type: ${typeof result}, value: ${String(result)}`);
      }

      const status = {
        claimed: claimed,
        rewardAmount: rewardAmount,
      };

      console.log('[BaseContract] getClaimStatus: 解析成功', status);
      return status;
    }
  } catch (error: any) {
    console.error('[BaseContract] getClaimStatus: 函数执行失败', {
      error: error.message || String(error),
      user,
      action,
      timestamp: timestampBigInt.toString(),
      stack: error.stack
    });
    throw new Error(`Failed to get claim status: ${error.message || error}`);
  }
}


