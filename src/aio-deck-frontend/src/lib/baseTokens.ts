// Base链ERC20代币交互脚本
import { ethers } from 'ethers';

// 运行模式：'local' | 'test' | 'production'
// 从环境变量读取，如果没有设置，默认为 'local'
const MODE: 'local' | 'test' | 'production' = (import.meta.env.VITE_MODE as 'local' | 'test' | 'production' | undefined) || 'local';

// 测试网配置
const TESTNET_CONFIG = {
  rpc: import.meta.env.VITE_BASE_SEPOLIA_RPC || "https://base-sepolia.g.alchemy.com/v2/Br9B6PkCm4u7NhukuwdGihx6SZnhrLWI",
  aioTokenAddress: import.meta.env.VITE_TESTNET_AIO_TOKEN_ADDRESS || "0x7a1d1F7Cb42997E3cCc32E69BD26BEbe33ef8F57",
};

// 生产环境配置
const PRODUCTION_CONFIG = {
  rpc: import.meta.env.VITE_BASE_MAINNET_RPC || import.meta.env.VITE_BASE_RPC || "",
  aioTokenAddress: import.meta.env.VITE_AIO_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000",
};

// 根据模式获取 AIO Token 地址
function getAioTokenAddress(): string {
  if (MODE === 'test') {
    return TESTNET_CONFIG.aioTokenAddress;
  } else if (MODE === 'production') {
    return PRODUCTION_CONFIG.aioTokenAddress;
  }
  // local 模式：返回零地址（使用 mock 数据）
  return '0x0000000000000000000000000000000000000000';
}

// 导出 AIO Token 地址（根据模式动态获取）
export const AIO_TOKEN_ADDRESS = getAioTokenAddress();

// 根据模式获取 RPC 端点
function getRpcEndpoint(): string {
  if (MODE === 'test') {
    return TESTNET_CONFIG.rpc;
  } else if (MODE === 'production') {
    if (PRODUCTION_CONFIG.rpc) {
      return PRODUCTION_CONFIG.rpc;
    }
    // 如果没有配置生产环境 RPC，使用默认的 Base 主网 RPC
    return "https://mainnet.base.org";
  }
  // local 模式：使用测试网 RPC（用于开发）
  return TESTNET_CONFIG.rpc;
}

// ERC20 标准 ABI（仅包含需要的函数）
const ERC20_ABI = [
  'function totalSupply() external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function name() external view returns (string)',
  'function balanceOf(address account) external view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

// 缓存配置
const cache = {
  holderCount: { data: null as number | null, timestamp: 0 },
  totalSupply: { data: null as number | null, timestamp: 0 },
  tokenInfo: { data: null as { totalSupply: number; holders: number; address: string; price?: number; marketCap?: number } | null, timestamp: 0 },
};

// 缓存时长：5分钟
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * 获取Base链Provider
 * 根据 MODE 选择对应的 RPC 端点
 */
function getProvider(): ethers.JsonRpcProvider {
  const rpc = getRpcEndpoint();
  return new ethers.JsonRpcProvider(rpc);
}

/**
 * 检查合约地址是否有效
 */
function isValidAddress(address: string): boolean {
  return address !== '0x0000000000000000000000000000000000000000' && ethers.isAddress(address);
}

/**
 * 获取代币持有者数量
 * @param tokenAddress 代币合约地址，如果不提供则使用配置的地址
 * @returns 持有者数量
 */
export async function getTokenHolderCount(tokenAddress?: string): Promise<number> {
  // 如果没有提供地址，使用配置的地址
  const address = tokenAddress || AIO_TOKEN_ADDRESS;
  // 检查缓存
  const now = Date.now();
  if (cache.holderCount.data !== null && (now - cache.holderCount.timestamp) < CACHE_DURATION) {
    return cache.holderCount.data;
  }

  // 如果合约地址无效，返回mock数据
  if (!isValidAddress(address)) {
    const mockHolderCount = 15234 + Math.floor(Math.random() * 1000);
    cache.holderCount = { data: mockHolderCount, timestamp: now };
    return mockHolderCount;
  }

  try {
    const provider = getProvider();
    const tokenContract = new ethers.Contract(address, ERC20_ABI, provider);
    
    // 查询Transfer事件来统计持有者
    // 注意：这是一个简化的实现，实际项目中可能需要使用The Graph等索引服务
    // 或者使用链上事件索引API（如Alchemy的getAssetTransfers）
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 10000); // 查询最近10000个区块
    
    // 查询Transfer事件
    const transferFilter = tokenContract.filters.Transfer();
    const events = await tokenContract.queryFilter(transferFilter, fromBlock, currentBlock);
    
    // 收集所有涉及转账的地址
    const addresses = new Set<string>();
    for (const event of events) {
      // 检查是否为 EventLog 类型（ethers v6）
      if (event instanceof ethers.EventLog && event.args) {
        const from = event.args[0]; // from 是第一个参数
        const to = event.args[1];   // to 是第二个参数
        // 排除零地址（mint/burn）
        if (from && from !== ethers.ZeroAddress) {
          addresses.add(from);
        }
        if (to && to !== ethers.ZeroAddress) {
          addresses.add(to);
        }
      }
    }
    
    // 检查每个地址的余额，只统计余额大于0的地址
    let holderCount = 0;
    for (const address of addresses) {
      try {
        const balance = await tokenContract.balanceOf(address);
        if (balance > 0n) {
          holderCount++;
        }
      } catch (err) {
        // 忽略单个地址查询错误
        console.warn(`Failed to check balance for ${address}:`, err);
      }
    }
    
    // 更新缓存
    cache.holderCount = { data: holderCount, timestamp: now };
    return holderCount;
  } catch (error) {
    console.error('Failed to get token holder count:', error);
    // 返回fallback mock数据
    const mockHolderCount = 15234 + Math.floor(Math.random() * 1000);
    cache.holderCount = { data: mockHolderCount, timestamp: now };
    return mockHolderCount;
  }
}

/**
 * 获取代币总供应量
 * @param tokenAddress 代币合约地址，如果不提供则使用配置的地址
 * @returns 总供应量
 */
async function getTokenTotalSupply(tokenAddress?: string): Promise<number> {
  // 如果没有提供地址，使用配置的地址
  const address = tokenAddress || AIO_TOKEN_ADDRESS;
  
  // 检查缓存
  const now = Date.now();
  if (cache.totalSupply.data !== null && (now - cache.totalSupply.timestamp) < CACHE_DURATION) {
    return cache.totalSupply.data;
  }

  // 如果合约地址无效，返回mock数据
  if (!isValidAddress(address)) {
    const mockTotalSupply = 1000000000;
    cache.totalSupply = { data: mockTotalSupply, timestamp: now };
    return mockTotalSupply;
  }

  try {
    const provider = getProvider();
    const tokenContract = new ethers.Contract(address, ERC20_ABI, provider);
    
    // 获取总供应量和小数位数
    const [totalSupply, decimals] = await Promise.all([
      tokenContract.totalSupply(),
      tokenContract.decimals(),
    ]);
    
    // 转换为可读格式
    const supply = Number(ethers.formatUnits(totalSupply, decimals));
    
    // 更新缓存
    cache.totalSupply = { data: supply, timestamp: now };
    return supply;
  } catch (error) {
    console.error('Failed to get token total supply:', error);
    // 返回fallback mock数据
    const mockTotalSupply = 1000000000;
    cache.totalSupply = { data: mockTotalSupply, timestamp: now };
    return mockTotalSupply;
  }
}

/**
 * 获取代币价格（mock数据，待接入价格API）
 * @param _tokenAddress 代币合约地址（当前未使用，待接入价格API后启用）
 * @returns 代币价格（USD）
 */
async function getTokenPrice(_tokenAddress?: string): Promise<number> {
  try {
    // TODO: 实现真实的价格查询
    // 可以从DEX（如Uniswap V3 on Base）或价格聚合器（如CoinGecko）获取
    // 示例：
    // const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/base?id=${tokenAddress}`);
    // const data = await response.json();
    // return data[tokenAddress]?.usd || 0;
    
    // Mock数据：模拟价格（$0.05）
    return 0.05;
  } catch (error) {
    console.error('Failed to get token price:', error);
    return 0.05;
  }
}

/**
 * 格式化持有者数量（添加千位分隔符）
 * @param count 持有者数量
 * @returns 格式化后的字符串
 */
export function formatHolderCount(count: number): string {
  return count.toLocaleString('en-US');
}

/**
 * 格式化代币数量
 * @param amount 代币数量
 * @param decimals 小数位数，默认18（用于未来扩展）
 * @returns 格式化后的字符串
 */
export function formatTokenAmount(amount: number, decimals: number = 18): string {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(2)}B`;
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(2)}K`;
  }
  return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/**
 * 获取代币完整信息（包括持有者数量、总供应量、价格等）
 * 使用缓存和优化的请求序列来减少RPC负载
 * @param tokenAddress 代币合约地址，如果不提供则使用配置的地址
 * @returns 代币信息
 */
export async function getTokenInfo(
  tokenAddress?: string
): Promise<{
  totalSupply: number;
  holders: number;
  address: string;
  price: number;
  marketCap: number;
}> {
  // 如果没有提供地址，使用配置的地址
  const address = tokenAddress || AIO_TOKEN_ADDRESS;
  // 检查缓存
  const now = Date.now();
  if (cache.tokenInfo.data !== null && (now - cache.tokenInfo.timestamp) < CACHE_DURATION) {
    return {
      ...cache.tokenInfo.data,
      price: cache.tokenInfo.data.price || 0.05,
      marketCap: (cache.tokenInfo.data.totalSupply * (cache.tokenInfo.data.price || 0.05)),
    };
  }

  try {
    // 并行获取总供应量和价格（轻量级请求）
    const [totalSupply, price] = await Promise.all([
      getTokenTotalSupply(address),
      getTokenPrice(address),
    ]);
    
    // 添加延迟后再获取持有者数量（重量级请求）
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 获取持有者数量
    const holders = await getTokenHolderCount(address);

    const marketCap = totalSupply * price;

    const result = {
      totalSupply,
      holders,
      address: address,
      price,
      marketCap,
    };

    // 更新缓存
    cache.tokenInfo = { data: result, timestamp: now };
    return result;
  } catch (error) {
    console.error('Failed to get token info:', error);
    // 返回fallback mock数据
    return {
      totalSupply: 1000000000,
      holders: 15234,
      address: address,
      price: 0.05,
      marketCap: 50000000, // 50M
    };
  }
}

/**
 * 获取24小时交易量（mock数据）
 * @param _tokenAddress 代币合约地址（当前未使用，待合约部署后启用）
 * @returns 24小时交易量（USD）
 */
export async function get24hVolume(_tokenAddress?: string): Promise<number> {
  try {
    // TODO: 实现真实的交易量查询
    // 可以从DEX或链上数据聚合器获取
    
    // Mock数据：模拟24小时交易量（$500,000）
    return 500000;
  } catch (error) {
    console.error('Failed to get 24h volume:', error);
    return 500000;
  }
}

/**
 * 获取价格变化百分比（mock数据）
 * @param _tokenAddress 代币合约地址（当前未使用，待合约部署后启用）
 * @param timeframe 时间范围，默认24h
 * @returns 价格变化百分比
 */
export async function getPriceChange(
  _tokenAddress?: string,
  timeframe: '1h' | '24h' | '7d' | '30d' = '24h'
): Promise<number> {
  try {
    // TODO: 实现真实的价格变化查询
    
    // Mock数据：模拟24小时价格变化（+5.2%）
    const mockChanges = {
      '1h': 0.8,
      '24h': 5.2,
      '7d': 12.5,
      '30d': 28.3,
    };
    return mockChanges[timeframe] || 5.2;
  } catch (error) {
    console.error('Failed to get price change:', error);
    return 5.2;
  }
}

