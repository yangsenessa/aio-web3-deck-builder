import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getMint, Mint } from '@solana/spl-token';

// Solana RPC endpoint configuration - using mainnet
// Using Helius as primary RPC provider (supports CORS for browser environments)
const HELIUS_API_KEY = '22e64403-eb95-4b21-bedc-5d0f360e9037';
const HELIUS_RPC_ENDPOINT = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

// RPC endpoints - Only include endpoints that support CORS
// Note: Public endpoints like api.mainnet-beta.solana.com and rpc.ankr.com 
// don't support CORS in browser environments, so they are removed
const SOLANA_RPC_ENDPOINTS = [
  HELIUS_RPC_ENDPOINT, // ✅ Helius RPC (primary, supports CORS)
];

// Token Mint address
export const TOKEN_MINT_ADDRESS = 'V8tLkyqHdtzzYCGdsVf5CZ55BsLuvu7F4TchiDhJgem';

// Current RPC endpoint index in use
let currentRpcIndex = 0;

// Cache for reducing RPC calls
const cache = {
  holderCount: { data: null as number | null, timestamp: 0 },
  totalSupply: { data: null as number | null, timestamp: 0 },
  tokenInfo: { data: null as { totalSupply: number; holders: number; mintAddress: string } | null, timestamp: 0 },
};

// Cache duration: 5 minutes (300000 ms)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Create Solana connection (using currently available RPC endpoint)
 */
function getConnection(): Connection {
  const endpoint = SOLANA_RPC_ENDPOINTS[currentRpcIndex];
  return new Connection(endpoint, 'confirmed');
}

/**
 * Attempt to switch to the next available RPC endpoint
 */
function switchToNextRpc(): void {
  currentRpcIndex = (currentRpcIndex + 1) % SOLANA_RPC_ENDPOINTS.length;
  console.log(`Switching to RPC endpoint: ${SOLANA_RPC_ENDPOINTS[currentRpcIndex]}`);
}

/**
 * Execute RPC operation with retry mechanism
 * @param operation The operation function to execute
 * @param maxRetries Maximum number of retries
 */
async function executeWithRpcRetry<T>(
  operation: (connection: Connection) => Promise<T>,
  maxRetries: number = SOLANA_RPC_ENDPOINTS.length
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const connection = getConnection();
      return await operation(connection);
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a 403, 429 or other RPC error
      const errorMessage = error?.message || '';
      const isRpcError = 
        errorMessage.includes('403') ||
        errorMessage.includes('Access forbidden') ||
        errorMessage.includes('429') ||
        errorMessage.includes('rate limit') ||
        errorMessage.includes('Too Many Requests') ||
        errorMessage.includes('exceeded') ||
        errorMessage.includes('SOLANA_MAINNET is not enabled') ||
        errorMessage.includes('not enabled for this app');
      
      if (isRpcError && attempt < maxRetries - 1) {
        console.warn(`RPC endpoint failed, attempting to switch: ${errorMessage}`);
        switchToNextRpc();
        
        // For 429 errors, wait longer before retrying
        const isRateLimit = errorMessage.includes('429') || errorMessage.includes('rate limit') || errorMessage.includes('Too Many Requests');
        const waitTime = isRateLimit ? 2000 : 1000; // Wait 2 seconds for rate limits, 1 second for other errors
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError || new Error('All RPC endpoints failed');
}

/**
 * Get the number of holder accounts for the specified SPL Token
 * Uses cache to reduce RPC calls
 * @param mintAddress Token Mint address
 * @returns Number of holder accounts
 */
export async function getTokenHolderCount(mintAddress: string = TOKEN_MINT_ADDRESS): Promise<number> {
  // Check cache first
  const now = Date.now();
  if (cache.holderCount.data !== null && (now - cache.holderCount.timestamp) < CACHE_DURATION) {
    return cache.holderCount.data;
  }

  try {
    const mintPublicKey = new PublicKey(mintAddress);

    // Use retry mechanism to get token accounts
    // Note: getProgramAccounts is expensive, so we use caching
    const tokenAccounts = await executeWithRpcRetry(async (connection) => {
      return await connection.getProgramAccounts(
        TOKEN_PROGRAM_ID,
        {
          filters: [
            {
              dataSize: 165, // Token account data size
            },
            {
              memcmp: {
                offset: 0, // Mint address offset in token account data
                bytes: mintPublicKey.toBase58(),
              },
            },
          ],
        }
      );
    });

    // Filter out accounts with balance greater than 0
    let holderCount = 0;
    for (const account of tokenAccounts) {
      // Token account data structure:
      // - 0-32: mint (32 bytes)
      // - 32-64: owner (32 bytes)
      // - 64-72: amount (8 bytes, little-endian u64)
      const data = account.account.data;
      
      // Read amount (balance)
      const amount = data.readBigUInt64LE(64);
      
      // Only count accounts with balance greater than 0
      if (amount > 0n) {
        holderCount++;
      }
    }

    // Update cache
    cache.holderCount = { data: holderCount, timestamp: now };
    return holderCount;
  } catch (error) {
    console.error('Failed to get token holder count:', error);
    throw error;
  }
}


/**
 * Format holder count (add thousand separators)
 * @param count Holder count
 * @returns Formatted string
 */
export function formatHolderCount(count: number): string {
  return count.toLocaleString('en-US');
}

/**
 * Get the total supply of the token
 * Uses cache to reduce RPC calls
 * @param mintAddress Token Mint address
 * @returns Total supply (considering decimal places)
 */
async function getTokenTotalSupply(mintAddress: string): Promise<number> {
  // Check cache first
  const now = Date.now();
  if (cache.totalSupply.data !== null && (now - cache.totalSupply.timestamp) < CACHE_DURATION) {
    return cache.totalSupply.data;
  }

  try {
    const mintPublicKey = new PublicKey(mintAddress);
    
    // Use retry mechanism to get mint information
    const mintInfo: Mint = await executeWithRpcRetry(async (connection) => {
      return await getMint(connection, mintPublicKey);
    });
    
    // Total supply = supply / 10^decimals
    const supply = Number(mintInfo.supply);
    const decimals = mintInfo.decimals;
    const totalSupply = supply / Math.pow(10, decimals);
    
    // Update cache
    cache.totalSupply = { data: totalSupply, timestamp: now };
    return totalSupply;
  } catch (error) {
    console.error('Failed to get token total supply:', error);
    throw error;
  }
}

/**
 * Get token information including holder count and total supply
 * Uses cache and optimized request sequencing to reduce RPC load
 * @param mintAddress Token Mint address, defaults to configured address
 * @returns Token information with holder count and total supply
 */
export async function getTokenInfo(
  mintAddress: string = TOKEN_MINT_ADDRESS
): Promise<{
  totalSupply: number;
  holders: number;
  mintAddress: string;
}> {
  // Check cache first
  const now = Date.now();
  if (cache.tokenInfo.data !== null && (now - cache.tokenInfo.timestamp) < CACHE_DURATION) {
    return cache.tokenInfo.data;
  }

  try {
    // Fetch total supply first (lightweight request)
    const totalSupply = await getTokenTotalSupply(mintAddress);
    
    // Add delay before expensive holder count request
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Fetch holder count (expensive request, do it last)
    const holders = await getTokenHolderCount(mintAddress);

    const result = {
      totalSupply,
      holders,
      mintAddress,
    };

    // Update cache
    cache.tokenInfo = { data: result, timestamp: now };
    return result;
  } catch (error) {
    console.error('Failed to get token info:', error);
    throw error;
  }
}


