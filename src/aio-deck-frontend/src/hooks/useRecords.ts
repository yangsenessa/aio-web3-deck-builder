import { useState, useCallback } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';

// 记录数据结构类型
export interface Record {
  id: string;
  walletAddress: string;
  timestamp: string;
  prompt: string;
  aioRewards: number;
  pmugAirdrop: number;
  status: string; // "completed" | "claimed" | "pending"
}

// 分页查询结果类型
export interface PaginatedResult {
  records: Record[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 待claim资金汇总类型
export interface PendingClaimSummary {
  totalAioRewards: number;
  totalPmugAirdrop: number;
  pendingCount: number;
}

// 设备激活数据类型（后端返回的 Nat 类型在 JavaScript 中可能是 BigInt）
export interface DeviceActivationData {
  name: string;
  devices: number | bigint; // Motoko 的 Nat 可能被转换为 BigInt
  delay: number | bigint;   // Motoko 的 Nat 可能被转换为 BigInt
}

// 后端记录服务接口
interface RecordsService {
  createRecord: (
    walletAddress: string,
    timestamp: string,
    prompt: string,
    aioRewards: number,
    pmugAirdrop: number,
    status: string
  ) => Promise<[boolean, [] | [Record]]>;
  updateRecord: (
    id: string,
    walletAddress: [] | [string],
    timestamp: [] | [string],
    prompt: [] | [string],
    aioRewards: [] | [number],
    pmugAirdrop: [] | [number],
    status: [] | [string]
  ) => Promise<[boolean, [] | [Record]]>;
  getRecord: (id: string) => Promise<[] | [Record]>;
  getRecordsPaginated: (
    page: number,
    pageSize: number
  ) => Promise<PaginatedResult>;
  getRecordsByWalletPaginated: (
    walletAddress: string,
    page: number,
    pageSize: number
  ) => Promise<PaginatedResult>;
  getPendingClaimSummary: () => Promise<PendingClaimSummary>;
  getPendingRecordByWallet: (walletAddress: string) => Promise<[] | [Record]>;
  getDeviceActivationData: () => Promise<DeviceActivationData[]>;
}

// 获取后端 canister ID
const getBackendCanisterId = (): string => {
  const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
  if (canisterId && canisterId.trim() !== '') {
    return canisterId;
  }
  
  if (typeof window !== 'undefined' && (window as any).__CANISTER_IDS__?.backend) {
    return (window as any).__CANISTER_IDS__.backend;
  }
  
  throw new Error(
    '后端 Canister ID 未配置。请确保：\n' +
    '1. 已运行 dfx deploy aio-deck-backend\n' +
    '2. 在 .dfx/local/canister_ids.json 中存在 aio-deck-backend 的 local ID\n' +
    '3. 或者设置环境变量 VITE_BACKEND_CANISTER_ID'
  );
};

// 创建后端 actor
const createRecordsActor = async (): Promise<RecordsService> => {
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

  // IDL 定义
  const idlFactory = ({ IDL }: any) => {
    const RecordType = IDL.Record({
      id: IDL.Text,
      walletAddress: IDL.Text,
      timestamp: IDL.Text,
      prompt: IDL.Text,
      aioRewards: IDL.Float64,
      pmugAirdrop: IDL.Float64,
      status: IDL.Text,
    });

    const PaginatedResultType = IDL.Record({
      records: IDL.Vec(RecordType),
      total: IDL.Nat,
      page: IDL.Nat,
      pageSize: IDL.Nat,
      totalPages: IDL.Nat,
    });

    const PendingClaimSummaryType = IDL.Record({
      totalAioRewards: IDL.Float64,
      totalPmugAirdrop: IDL.Float64,
      pendingCount: IDL.Nat,
    });

    const DeviceActivationDataType = IDL.Record({
      name: IDL.Text,
      devices: IDL.Nat,
      delay: IDL.Nat,
    });

    return IDL.Service({
      createRecord: IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Float64, IDL.Float64, IDL.Text],
        [IDL.Bool, IDL.Opt(RecordType)],
        []
      ),
      updateRecord: IDL.Func(
        [
          IDL.Text,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Float64),
          IDL.Opt(IDL.Float64),
          IDL.Opt(IDL.Text),
        ],
        [IDL.Bool, IDL.Opt(RecordType)],
        []
      ),
      getRecord: IDL.Func([IDL.Text], [IDL.Opt(RecordType)], ['query']),
      getRecordsPaginated: IDL.Func(
        [IDL.Nat, IDL.Nat],
        [PaginatedResultType],
        ['query']
      ),
      getRecordsByWalletPaginated: IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat],
        [PaginatedResultType],
        ['query']
      ),
      getPendingClaimSummary: IDL.Func(
        [],
        [PendingClaimSummaryType],
        ['query']
      ),
      getPendingRecordByWallet: IDL.Func(
        [IDL.Text],
        [IDL.Opt(RecordType)],
        ['query']
      ),
      getDeviceActivationData: IDL.Func(
        [],
        [IDL.Vec(DeviceActivationDataType)],
        ['query']
      ),
    });
  };

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  }) as unknown as RecordsService;
};

// 使用记录的 Hook
export const useRecords = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 创建记录
  const createRecord = useCallback(
    async (
      walletAddress: string,
      timestamp: string,
      prompt: string,
      aioRewards: number,
      pmugAirdrop: number,
      status: string
    ): Promise<Record | null> => {
      setLoading(true);
      setError(null);
      try {
        console.log('[useRecords] 开始创建记录:', {
          walletAddress,
          timestamp,
          prompt,
          aioRewards,
          pmugAirdrop,
          status,
        });
        
        const actor = await createRecordsActor();
        console.log('[useRecords] Actor 创建成功，调用 createRecord...');
        
        const [success, result] = await actor.createRecord(
          walletAddress,
          timestamp,
          prompt,
          aioRewards,
          pmugAirdrop,
          status
        );
        
        console.log('[useRecords] 后端返回结果:', {
          success,
          hasResult: result && result.length > 0,
          result: result?.[0],
        });
        
        if (success && result && result.length > 0) {
          console.log('[useRecords] 创建记录成功:', result[0]);
          return result[0];
        } else {
          console.warn('[useRecords] 创建记录失败:', {
            success,
            hasResult: result && result.length > 0,
            reason: success ? '返回结果为空' : '后端返回失败',
          });
          return null;
        }
      } catch (err: any) {
        const errorMessage = err?.message || '创建记录失败';
        setError(errorMessage);
        console.error('[useRecords] 创建记录异常:', {
          error: err,
          message: errorMessage,
          stack: err?.stack,
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 更新记录
  const updateRecord = useCallback(
    async (
      id: string,
      updates: {
        walletAddress?: string;
        timestamp?: string;
        prompt?: string;
        aioRewards?: number;
        pmugAirdrop?: number;
        status?: string;
      }
    ): Promise<Record | null> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createRecordsActor();
        console.log('[useRecords] 准备更新记录:', {
          id,
          updates,
          status: updates.status,
          hasStatus: !!updates.status,
          statusValue: updates.status || 'undefined'
        });
        // 确保 status 正确传递（即使是空字符串也要传递）
        const statusParam = updates.status !== undefined ? [updates.status] : [];
        console.log('[useRecords] 调用 actor.updateRecord，status 参数:', {
          statusValue: updates.status,
          statusParam: statusParam,
          statusParamLength: statusParam.length,
          statusParamFirst: statusParam[0]
        });
        
        const [success, result] = await actor.updateRecord(
          id,
          updates.walletAddress ? [updates.walletAddress] : [],
          updates.timestamp ? [updates.timestamp] : [],
          updates.prompt ? [updates.prompt] : [],
          updates.aioRewards !== undefined ? [updates.aioRewards] : [],
          updates.pmugAirdrop !== undefined ? [updates.pmugAirdrop] : [],
          statusParam
        );
        console.log('[useRecords] 更新记录结果:', {
          success,
          hasResult: result && result.length > 0,
          resultStatus: result?.[0]?.status,
          resultRecord: result?.[0]
        });
        if (success && result && result.length > 0) {
          return result[0];
        }
        return null;
      } catch (err: any) {
        const errorMessage = err?.message || '更新记录失败';
        setError(errorMessage);
        console.error('更新记录错误:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 获取单个记录
  const getRecord = useCallback(async (id: string): Promise<Record | null> => {
    setLoading(true);
    setError(null);
    try {
      const actor = await createRecordsActor();
      const result = await actor.getRecord(id);
      if (result && result.length > 0) {
        return result[0];
      }
      return null;
    } catch (err: any) {
      const errorMessage = err?.message || '获取记录失败';
      setError(errorMessage);
      console.error('获取记录错误:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 分页查询记录
  const getRecordsPaginated = useCallback(
    async (page: number, pageSize: number): Promise<PaginatedResult | null> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createRecordsActor();
        const result = await actor.getRecordsPaginated(page, pageSize);
        return result;
      } catch (err: any) {
        const errorMessage = err?.message || '查询记录失败';
        setError(errorMessage);
        console.error('查询记录错误:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 按钱包地址分页查询记录
  const getRecordsByWalletPaginated = useCallback(
    async (walletAddress: string, page: number, pageSize: number): Promise<PaginatedResult | null> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createRecordsActor();
        const result = await actor.getRecordsByWalletPaginated(walletAddress, page, pageSize);
        return result;
      } catch (err: any) {
        const errorMessage = err?.message || '查询记录失败';
        setError(errorMessage);
        console.error('按钱包地址查询记录错误:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 获取待claim资金汇总
  const getPendingClaimSummary = useCallback(
    async (): Promise<PendingClaimSummary | null> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createRecordsActor();
        const result = await actor.getPendingClaimSummary();
        return result;
      } catch (err: any) {
        const errorMessage = err?.message || '获取汇总失败';
        setError(errorMessage);
        console.error('获取汇总错误:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 按钱包地址获取pending状态的记录
  const getPendingRecordByWallet = useCallback(
    async (walletAddress: string): Promise<Record | null> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createRecordsActor();
        const result = await actor.getPendingRecordByWallet(walletAddress);
        if (result && result.length > 0) {
          return result[0];
        }
        return null;
      } catch (err: any) {
        const errorMessage = err?.message || '获取pending记录失败';
        setError(errorMessage);
        console.error('获取pending记录错误:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 获取设备激活数据
  const getDeviceActivationData = useCallback(
    async (): Promise<DeviceActivationData[] | null> => {
      setLoading(true);
      setError(null);
      try {
        const actor = await createRecordsActor();
        const result = await actor.getDeviceActivationData();
        return result;
      } catch (err: any) {
        const errorMessage = err?.message || '获取设备激活数据失败';
        setError(errorMessage);
        console.error('获取设备激活数据错误:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    createRecord,
    updateRecord,
    getRecord,
    getRecordsPaginated,
    getRecordsByWalletPaginated,
    getPendingClaimSummary,
    getPendingRecordByWallet,
    getDeviceActivationData,
  };
};

export default useRecords;

