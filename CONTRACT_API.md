# 合约 API 文档

## 概述

本项目的后端 canister 实现了合约管理功能，支持初始化、更新和查询合约信息。

## 合约数据结构

```motoko
type Contract = {
    interactAddress : Text;  // 交互合约地址（以太坊地址格式）
    nodeSeed : Nat;         // 节点种子数量
    rewardPerNode : Float;  // 每个节点的奖励
    meta : Text;            // 元数据（JSON 字符串格式）
};
```

## 后端 API

### 1. initContract

初始化合约（仅能初始化一次）。

**参数：**
- `interactAddress`: Text - 交互合约地址
- `nodeSeed`: Nat - 节点种子数量
- `rewardPerNode`: Float - 每个节点的奖励
- `meta`: Text - 元数据（JSON 字符串）

**返回：**
- `Bool` - true 表示成功，false 表示合约已存在

**示例：**
```bash
dfx canister call aio-deck-backend initContract '("0x1234...", 2000, 0.333, "{}")'
```

### 2. updateContract

更新合约信息（可以部分更新）。

**参数：**
- `interactAddress`: ?Text - 可选的交互合约地址
- `nodeSeed`: ?Nat - 可选的节点种子数量
- `rewardPerNode`: ?Float - 可选的每个节点奖励
- `meta`: ?Text - 可选的元数据

**返回：**
- `Bool` - true 表示成功，false 表示合约不存在

**示例：**
```bash
# 只更新 nodeSeed
dfx canister call aio-deck-backend updateContract '(null, opt 3000, null, null)'

# 更新多个字段
dfx canister call aio-deck-backend updateContract '(opt "0x5678...", opt 3000, opt 0.5, opt "{\"key\":\"value\"}")'
```

### 3. getContract

查询合约信息（query 方法，不消耗 cycles）。

**参数：**
- 无

**返回：**
- `?Contract` - 合约信息，如果不存在则返回 null

**示例：**
```bash
dfx canister call aio-deck-backend getContract --query
```

## 前端使用

### 使用 useContract Hook

```typescript
import { useContract } from '@/hooks/useContract';

function MyComponent() {
  const { 
    contract, 
    loading, 
    error, 
    initContract, 
    updateContract, 
    getContract 
  } = useContract();

  // 初始化合约
  const handleInit = async () => {
    const success = await initContract(
      '0x1234...',
      2000,
      0.333,
      '{}'
    );
    if (success) {
      console.log('合约初始化成功');
    }
  };

  // 更新合约
  const handleUpdate = async () => {
    const success = await updateContract({
      nodeSeed: 3000,
      rewardPerNode: 0.5,
    });
    if (success) {
      console.log('合约更新成功');
    }
  };

  // 获取合约
  const handleGet = async () => {
    const contractData = await getContract();
    if (contractData) {
      console.log('合约信息:', contractData);
    }
  };

  return (
    <div>
      {loading && <p>加载中...</p>}
      {error && <p>错误: {error}</p>}
      {contract && (
        <div>
          <p>地址: {contract.interactAddress}</p>
          <p>节点种子: {contract.nodeSeed}</p>
          <p>每个节点奖励: {contract.rewardPerNode}</p>
        </div>
      )}
    </div>
  );
}
```

## 环境配置

### 前端环境变量

在 `src/aio-deck-frontend/.env` 或 `src/aio-deck-frontend/.env.local` 中配置：

```env
VITE_BACKEND_CANISTER_ID=rrkah-fqaaa-aaaaa-aaaaq-cai
DFX_NETWORK=local
```

或者从 `.dfx/local/canister_ids.json` 自动读取。

## 部署说明

1. **启动本地网络：**
   ```bash
   dfx start --background
   ```

2. **部署后端：**
   ```bash
   dfx deploy aio-deck-backend
   ```

3. **获取 canister ID：**
   ```bash
   dfx canister id aio-deck-backend
   ```

4. **更新前端环境变量：**
   将获取到的 canister ID 添加到前端环境变量中。

5. **部署前端：**
   ```bash
   cd src/aio-deck-frontend
   npm run build
   cd ../..
   dfx deploy aio-deck-frontend
   ```

## 注意事项

1. 合约只能初始化一次，后续需要使用 `updateContract` 进行更新。
2. `getContract` 是 query 方法，不会修改状态，可以频繁调用。
3. `initContract` 和 `updateContract` 是 update 方法，会消耗 cycles。
4. 在本地开发环境中，需要确保 dfx 网络正在运行。

