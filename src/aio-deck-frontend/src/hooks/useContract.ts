import { useState, useCallback, useEffect, useRef } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';

// 合约数据结构类型
export interface Contract {
  interactAddress: string;
  nodeSeed: number;
  rewardPerNode: number;
  airdropAmount: number;
  meta: string;
}

// 后端 canister 接口类型
interface BackendService {
  initContract: (
    interactAddress: string,
    nodeSeed: number,
    rewardPerNode: number,
    airdropAmount: number,
    meta: string
  ) => Promise<boolean>;
  updateContract: (
    interactAddress: [] | [string],
    nodeSeed: [] | [number],
    rewardPerNode: [] | [number],
    airdropAmount: [] | [number],
    meta: [] | [string]
  ) => Promise<boolean>;
  getContract: () => Promise<[] | [Contract]>;
}

// 获取后端 canister ID
const getBackendCanisterId = (): string => {
  // 从环境变量中获取 canister ID（在 vite.config.ts 中从 canister_ids.json 注入）
  const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
  if (canisterId && canisterId.trim() !== '') {
    return canisterId;
  }
  
  // 如果环境变量未设置，尝试从 window 对象获取（用于生产环境）
  if (typeof window !== 'undefined' && (window as any).__CANISTER_IDS__?.backend) {
    return (window as any).__CANISTER_IDS__.backend;
  }
  
  // 如果都没有，抛出错误提示用户配置
  throw new Error(
    '后端 Canister ID 未配置。请确保：\n' +
    '1. 已运行 dfx deploy aio-deck-backend\n' +
    '2. 在 .dfx/local/canister_ids.json 中存在 aio-deck-backend 的 local ID\n' +
    '3. 或者设置环境变量 VITE_BACKEND_CANISTER_ID'
  );
};

// 创建后端 actor
const createBackendActor = async (): Promise<BackendService> => {
  const canisterId = getBackendCanisterId();
  const agent = new HttpAgent({
    host: import.meta.env.DFX_NETWORK === 'ic' 
      ? 'https://ic0.app' 
      : 'http://localhost:4943',
  });

  // 在本地开发环境中获取根密钥
  if (import.meta.env.DFX_NETWORK !== 'ic') {
    await agent.fetchRootKey();
  }

  // 注意：这里需要后端的 IDL 定义
  // 实际使用时需要通过 dfx generate 生成类型定义
  // 这里使用简化的方式，实际应该导入生成的 IDL
  const idlFactory = ({ IDL }: any) => {
    const ContractType = IDL.Record({
      interactAddress: IDL.Text,
      nodeSeed: IDL.Nat,
      rewardPerNode: IDL.Float64,
      airdropAmount: IDL.Float64,
      meta: IDL.Text,
    });

    return IDL.Service({
      initContract: IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Float64, IDL.Float64, IDL.Text],
        [IDL.Bool],
        []
      ),
      updateContract: IDL.Func(
        [
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Nat),
          IDL.Opt(IDL.Float64),
          IDL.Opt(IDL.Float64),
          IDL.Opt(IDL.Text),
        ],
        [IDL.Bool],
        []
      ),
      getContract: IDL.Func([], [IDL.Opt(ContractType)], ['query']),
    });
  };

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  }) as unknown as BackendService;
};

// 使用合约的 Hook
export const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const hasInitialized = useRef(false);

  // 获取合约（内部方法，用于刷新状态）
  const fetchContract = useCallback(async (): Promise<Contract | null> => {
    try {
      const actor = await createBackendActor();
      const result = await actor.getContract();
      if (result && result.length > 0) {
        const contractData = result[0];
        if (contractData) {
          setContract(contractData);
          return contractData;
        }
      }
      setContract(null);
      return null;
    } catch (err: any) {
      console.error('获取合约错误:', err);
      setContract(null);
      return null;
    }
  }, []);

  // 在 hook 初始化时自动获取合约（仅一次）
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchContract().catch((err) => {
        console.error('Failed to fetch contract on initialization:', err);
      });
    }
  }, [fetchContract]);

  // 初始化合约
  const initContract = useCallback(
    async (
      interactAddress: string,
      nodeSeed: number,
      rewardPerNode: number,
      airdropAmount: number,
      meta: string
    ): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createBackendActor();
        const result = await actor.initContract(
          interactAddress,
          nodeSeed,
          rewardPerNode,
          airdropAmount,
          meta
        );
        if (result) {
          // 初始化成功后获取合约信息
          await fetchContract();
        }
        return result;
      } catch (err: any) {
        const errorMessage = err?.message || '初始化合约失败';
        setError(errorMessage);
        console.error('初始化合约错误:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchContract]
  );

  // 更新合约
  const updateContract = useCallback(
    async (updates: {
      interactAddress?: string;
      nodeSeed?: number;
      rewardPerNode?: number;
      airdropAmount?: number;
      meta?: string;
    }): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createBackendActor();
        const result = await actor.updateContract(
          updates.interactAddress ? [updates.interactAddress] : [],
          updates.nodeSeed !== undefined ? [updates.nodeSeed] : [],
          updates.rewardPerNode !== undefined ? [updates.rewardPerNode] : [],
          updates.airdropAmount !== undefined ? [updates.airdropAmount] : [],
          updates.meta ? [updates.meta] : []
        );
        if (result) {
          // 更新成功后获取最新合约信息
          await fetchContract();
        }
        return result;
      } catch (err: any) {
        const errorMessage = err?.message || '更新合约失败';
        setError(errorMessage);
        console.error('更新合约错误:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchContract]
  );

  // 获取合约（公开方法）
  const getContract = useCallback(async (): Promise<Contract | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchContract();
      return result;
    } catch (err: any) {
      const errorMessage = err?.message || '获取合约失败';
      setError(errorMessage);
      console.error('获取合约错误:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchContract]);

  return {
    contract,
    loading,
    error,
    initContract,
    updateContract,
    getContract,
  };
};

export default useContract;

