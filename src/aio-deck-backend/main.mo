import Contract "contract";
import ActiveRecord "activerecord";
import Principal "mo:base/Principal";
import ExperimentalStableMemory "mo:base/ExperimentalStableMemory";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Nat64 "mo:base/Nat64";
import Float "mo:base/Float";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";

persistent actor {
    // 使用 stable 变量保存合约数据
    stable var contractState : ?Contract.Contract = null;
    // 缓存canister的controllers（用于权限检查）
    stable var cachedControllers : [Principal] = [];
    // 允许的 frontend canister Principal（用于权限检查）
    stable var allowedFrontendCanister : ?Principal = null;
    // 注意：recordStorage 不能是 stable（因为包含 HashMap），
    // 所以每次从 stable memory 加载（在函数内部缓存）

    // 检查调用者是否是canister的controller
    func isController(caller : Principal) : Bool {
        // 如果缓存为空，尝试从IC获取controllers
        if (cachedControllers.size() == 0) {
            Debug.print("[isController] controllers缓存为空，尝试更新");
            updateControllersCache();
        };
        // 检查调用者是否在controllers列表中
        Debug.print("[isController] 检查调用者是否是controller，缓存中有 " # Nat.toText(cachedControllers.size()) # " 个controllers");
        for (controller in cachedControllers.vals()) {
            if (Principal.equal(caller, controller)) {
                Debug.print("[isController] 调用者是controller: " # Principal.toText(controller));
                return true;
            };
        };
        Debug.print("[isController] 调用者不是controller: " # Principal.toText(caller));
        return false;
    };
    
    // 检查调用者是否有权限（controller 或 frontend canister）
    func hasPermission(caller : Principal) : Bool {
        // 检查是否是 controller
        if (isController(caller)) {
            Debug.print("[hasPermission] 调用者是controller");
            return true;
        };
        // 检查是否是允许的前端 canister
        switch (allowedFrontendCanister) {
            case (?frontendPrincipal) {
                let isEqual = Principal.equal(caller, frontendPrincipal);
                if (isEqual) {
                    Debug.print("[hasPermission] 调用者是允许的frontend canister");
                } else {
                    Debug.print("[hasPermission] 调用者不是允许的frontend canister");
                    Debug.print("[hasPermission] 调用者: " # Principal.toText(caller));
                    Debug.print("[hasPermission] 允许的frontend: " # Principal.toText(frontendPrincipal));
                };
                return isEqual;
            };
            case (null) {
                Debug.print("[hasPermission] 未设置允许的frontend canister，且调用者不是controller");
                return false;
            };
        };
    };

    // 更新controllers缓存（通过Management Canister获取）
    func updateControllersCache() {
        // 注意：在Motoko中，canister无法直接查询自己的controllers
        // 需要通过Management Canister异步调用，这里简化处理
        // 实际使用时，controllers应该通过setControllers手动设置
    };
    
    // 手动设置controllers（用于初始化或更新）
    // 只有当前的controller可以调用此函数
    public shared(msg) func setControllers(controllers : [Principal]) : async Bool {
        // 如果缓存为空，允许任何人设置（首次初始化）
        // 如果缓存不为空，只有当前controller可以更新
        if (cachedControllers.size() > 0) {
            if (not isController(msg.caller)) {
                return false;
            };
        };
        cachedControllers := controllers;
        // 保存到stable memory
        saveToStableMemory();
        return true;
    };
    
    // 设置允许的 frontend canister Principal
    // 只有controller可以调用此函数
    public shared(msg) func setAllowedFrontendCanister(frontendPrincipal : Principal) : async Bool {
        // 检查权限：只有controller可以设置
        if (not isController(msg.caller)) {
            return false;
        };
        allowedFrontendCanister := ?frontendPrincipal;
        // 保存到stable memory
        saveToStableMemory();
        return true;
    };
    
    // 获取允许的 frontend canister Principal
    public query func getAllowedFrontendCanister() : async ?Principal {
        return allowedFrontendCanister;
    };

    // 初始化合约
    public shared(msg) func initContract(
        interactAddress : Text,
        nodeSeed : Nat,
        rewardPerNode : Float,
        airdropAmount : Float,
        meta : Text
    ) : async Bool {
        // 检查权限：只有canister的controller可以初始化
        if (not isController(msg.caller)) {
            return false; // 权限不足
        };
        
        let (success, newContract) = Contract.initContract(
            contractState,
            interactAddress,
            nodeSeed,
            rewardPerNode,
            airdropAmount,
            meta
        );
        if (success) {
            contractState := newContract;
            // 保存到stable memory
            saveToStableMemory();
        };
        return success;
    };

    // 更新合约
    public shared(msg) func updateContract(
        interactAddress : ?Text,
        nodeSeed : ?Nat,
        rewardPerNode : ?Float,
        airdropAmount : ?Float,
        meta : ?Text
    ) : async Bool {
        // 检查权限：只有canister的controller可以更新
        if (not isController(msg.caller)) {
            return false; // 权限不足
        };
        
        let (success, updatedContract) = Contract.updateContract(
            contractState,
            interactAddress,
            nodeSeed,
            rewardPerNode,
            airdropAmount,
            meta
        );
        if (success) {
            contractState := updatedContract;
            // 保存到stable memory
            saveToStableMemory();
        };
        return success;
    };

    // 获取合约
    public query func getContract() : async ?Contract.Contract {
        return Contract.getContract(contractState);
    };

    // 获取canister的controllers
    public query func getControllers() : async [Principal] {
        return cachedControllers;
    };
    
    // 设置允许的前端 canister Principal（只有controller可以调用）
    public shared(msg) func setFrontendCanister(frontendPrincipal : Principal) : async Bool {
        // 检查权限：只有controller可以设置
        if (not isController(msg.caller)) {
            return false; // 权限不足
        };
        allowedFrontendCanister := ?frontendPrincipal;
        // 保存到stable memory
        saveToStableMemory();
        return true;
    };
    
    // 获取允许的前端 canister Principal
    public query func getFrontendCanister() : async ?Principal {
        return allowedFrontendCanister;
    };

    // 保存数据到stable memory
    func saveToStableMemory() {
        switch (contractState) {
            case (null) {
                // 如果没有数据，不需要清除stable memory
                // ExperimentalStableMemory没有clear方法，数据会在下次写入时覆盖
            };
            case (?contract) {
                // 序列化合约数据到stable memory
                let serialized = Contract.serialize(contract);
                let blob = Blob.fromArray(serialized);
                let size = blob.size();
                
                // 确保有足够的stable memory空间
                let requiredPages = (size + 65535) / 65536; // 每页64KB
                let currentPages = ExperimentalStableMemory.size();
                let currentPagesNat = Nat64.toNat(currentPages);
                
                // 如果需要更多空间，先增长stable memory
                if (requiredPages > currentPagesNat) {
                    let pagesToGrow = requiredPages - currentPagesNat;
                    ignore ExperimentalStableMemory.grow(Nat64.fromNat(pagesToGrow));
                };
                
                // 清除旧数据（从偏移0开始）
                // 注意：clear()会清除所有数据，所以我们先写入新数据
                // 写入新的数据（从偏移0开始）
                ExperimentalStableMemory.storeBlob(0, blob);
                
                // 保存数据大小到偏移位置（用于恢复时知道数据大小）
                // 使用偏移65536（第二页开始）存储元数据：数据大小和controllers
                let metadataBlob = serializeMetadata(size, cachedControllers);
                ExperimentalStableMemory.storeBlob(65536, metadataBlob);
            };
        };
    };
    
    // 序列化元数据（数据大小和controllers）
    func serializeMetadata(dataSize : Nat, controllers : [Principal]) : Blob {
        var bytes : [var Nat8] = Array.init<Nat8>(0, 0);
        
        // 写入数据大小（8字节）
        func natToBytes(n : Nat) : [Nat8] {
            var result : [var Nat8] = Array.init<Nat8>(8, 0);
            var num = n;
            var i = 7;
            while (num > 0 and i >= 0) {
                result[i] := Nat8.fromNat(num % 256);
                num := num / 256;
                i -= 1;
            };
            return Array.freeze(result);
        };
        
        let sizeBytes = natToBytes(dataSize);
        bytes := Array.thaw(Array.append(Array.freeze(bytes), sizeBytes));
        
        // 写入controllers数量（4字节）
        let controllersCount = controllers.size();
        let countBytes = natToBytes(controllersCount);
        let countBytes4 = Array.tabulate<Nat8>(4, func(i) {
            if (i < countBytes.size()) { countBytes[i] } else { 0 }
        });
        bytes := Array.thaw(Array.append(Array.freeze(bytes), countBytes4));
        
        // 写入每个controller（每个principal编码为字节）
        for (controller in controllers.vals()) {
            let principalBytes = Blob.toArray(Principal.toBlob(controller));
            let principalSizeBytes = natToBytes(principalBytes.size());
            let principalSizeBytes4 = Array.tabulate<Nat8>(4, func(i) {
                if (i < principalSizeBytes.size()) { principalSizeBytes[i] } else { 0 }
            });
            bytes := Array.thaw(Array.append(Array.freeze(bytes), principalSizeBytes4));
            bytes := Array.thaw(Array.append(Array.freeze(bytes), principalBytes));
        };
        
        return Blob.fromArray(Array.freeze(bytes));
    };

    // 从stable memory恢复数据
    func loadFromStableMemory() {
        let totalSize = ExperimentalStableMemory.size();
        let totalSizeNat = Nat64.toNat(totalSize);
        if (totalSizeNat > 0) {
            // 首先尝试从元数据中读取数据大小
            var dataSize : Nat = 0;
            var metadataOffset : Nat = 65536; // 第二页开始
            
            if (totalSizeNat * 65536 > metadataOffset) {
                // 读取元数据
                let metadataBlob = ExperimentalStableMemory.loadBlob(Nat64.fromNat(metadataOffset), 12); // 至少读取12字节（8字节大小+4字节controllers数量）
                let metadataBytes = Blob.toArray(metadataBlob);
                
                if (metadataBytes.size() >= 8) {
                    // 读取数据大小
                    func bytesToNat(bytes : [Nat8]) : Nat {
                        var result : Nat = 0;
                        for (byte in bytes.vals()) {
                            result := result * 256 + Nat8.toNat(byte);
                        };
                        return result;
                    };
                    
                    let sizeBytes = Array.tabulate<Nat8>(8, func(i) { metadataBytes[i] });
                    dataSize := bytesToNat(sizeBytes);
                };
            };
            
            // 如果无法从元数据读取，使用默认大小（第一页）
            if (dataSize == 0) {
                dataSize := 65536; // 默认一页
            };
            
            // 确保不超过实际大小
            let maxSize = totalSizeNat * 65536;
            if (dataSize > maxSize) {
                dataSize := maxSize;
            };
            
            // 读取合约数据
            // loadBlob: offset是Nat64，size是Nat
            let blob = ExperimentalStableMemory.loadBlob(0 : Nat64, dataSize);
            let bytes = Blob.toArray(blob);
            contractState := Contract.deserialize(bytes);
            
            // 尝试恢复controllers缓存
            if (totalSizeNat * 65536 > metadataOffset) {
                let metadataBlob = ExperimentalStableMemory.loadBlob(Nat64.fromNat(metadataOffset), 65536);
                let restoredControllers = deserializeMetadata(metadataBlob);
                if (restoredControllers.size() > 0) {
                    cachedControllers := restoredControllers;
                };
            };
        };
    };
    
    // 反序列化元数据
    func deserializeMetadata(blob : Blob) : [Principal] {
        let bytes = Blob.toArray(blob);
        if (bytes.size() < 12) {
            return [];
        };
        
        func bytesToNat(bytes : [Nat8]) : Nat {
            var result : Nat = 0;
            for (byte in bytes.vals()) {
                result := result * 256 + Nat8.toNat(byte);
            };
            return result;
        };
        
        var offset = 8; // 跳过数据大小（8字节）
        
        // 读取controllers数量（4字节）
        let countBytes = Array.tabulate<Nat8>(4, func(i) {
            if (offset + i < bytes.size()) { bytes[offset + i] } else { 0 }
        });
        offset += 4;
        let controllersCount = bytesToNat(countBytes);
        
        var controllers : [var Principal] = Array.init<Principal>(controllersCount, Principal.fromText("aaaaa-aa"));
        var i = 0;
        
        while (i < controllersCount and offset + 4 < bytes.size()) {
            // 读取principal大小（4字节）
            let principalSizeBytes = Array.tabulate<Nat8>(4, func(j) {
                if (offset + j < bytes.size()) { bytes[offset + j] } else { 0 }
            });
            offset += 4;
            let principalSize = bytesToNat(principalSizeBytes);
            
            // 读取principal字节
            if (offset + principalSize <= bytes.size()) {
                let principalBytes = Array.tabulate<Nat8>(principalSize, func(j) {
                    bytes[offset + j]
                });
                offset += principalSize;
                
                let principalBlob = Blob.fromArray(principalBytes);
                let principal = Principal.fromBlob(principalBlob);
                controllers[i] := principal;
            };
            i += 1;
        };
        
        return Array.freeze(controllers);
    };

    // ========== ActiveRecord 相关方法 ==========
    
    // 获取或初始化 recordStorage（从 stable memory 加载）
    // 注意：由于 persistent actor 的限制，不能使用顶级变量缓存
    // 每次调用都从 stable memory 加载（性能考虑：可以优化为使用对象缓存）
    func getRecordStorage() : ActiveRecord.RecordStorage {
        let loadedStorage = loadRecordsFromStableMemoryInternal();
        switch (loadedStorage) {
            case (?storage) {
                Debug.print("[getRecordStorage] 从stable memory成功加载存储，记录数: " # Nat.toText(storage.records.size()));
                return storage;
            };
            case (null) {
                // 如果加载失败，初始化空存储
                Debug.print("[getRecordStorage] 从stable memory加载失败，初始化空存储");
                return ActiveRecord.initStorage();
            };
        };
    };
    
    // 设置 recordStorage（保存到 stable memory）
    func setRecordStorage(storage : ActiveRecord.RecordStorage) {
        Debug.print("[setRecordStorage] 开始保存存储到stable memory，记录数: " # Nat.toText(storage.records.size()));
        // 直接保存到 stable memory，不缓存
        let serialized = ActiveRecord.serialize(storage);
        let blob = Blob.fromArray(serialized);
        let size = blob.size();
        Debug.print("[setRecordStorage] 序列化后大小: " # Nat.toText(size) # " 字节");
        
        // 记录数据偏移和元数据偏移
        let recordsOffset : Nat = 131072; // 第三页开始
        let recordsMetadataOffset : Nat = 196608; // 第四页开始
        let metadataSize : Nat = 8; // 元数据大小（8字节）
        
        // 计算需要的最小页数：确保能覆盖数据结束位置和元数据结束位置
        // 数据结束位置：recordsOffset + size
        // 元数据结束位置：recordsMetadataOffset + metadataSize
        let dataEndOffset = recordsOffset + size;
        let metadataEndOffset = recordsMetadataOffset + metadataSize;
        let maxEndOffset = if (dataEndOffset > metadataEndOffset) { dataEndOffset } else { metadataEndOffset };
        let requiredPages = (maxEndOffset + 65535) / 65536; // 向上取整
        
        let currentPages = ExperimentalStableMemory.size();
        let currentPagesNat = Nat64.toNat(currentPages);
        Debug.print("[setRecordStorage] 需要页数: " # Nat.toText(requiredPages) # ", 当前页数: " # Nat.toText(currentPagesNat));
        Debug.print("[setRecordStorage] 数据结束偏移: " # Nat.toText(dataEndOffset) # ", 元数据结束偏移: " # Nat.toText(metadataEndOffset));
        
        // 如果需要更多空间，先增长stable memory
        if (requiredPages > currentPagesNat) {
            let pagesToGrow = requiredPages - currentPagesNat;
            Debug.print("[setRecordStorage] 需要增长 " # Nat.toText(pagesToGrow) # " 页");
            ignore ExperimentalStableMemory.grow(Nat64.fromNat(pagesToGrow));
        };
        
        // 写入记录数据（从偏移131072开始，即第三页）
        ExperimentalStableMemory.storeBlob(Nat64.fromNat(recordsOffset), blob);
        Debug.print("[setRecordStorage] 数据已写入stable memory，偏移: 131072");
        
        // 保存记录数据大小到元数据区域（使用偏移196608，即第四页开始）
        let metadataBlob = serializeRecordsMetadata(size);
        ExperimentalStableMemory.storeBlob(Nat64.fromNat(recordsMetadataOffset), metadataBlob);
        Debug.print("[setRecordStorage] 元数据已保存，偏移: 196608");
    };
    
    // 从 stable memory 加载记录数据（内部方法，返回可选类型）
    func loadRecordsFromStableMemoryInternal() : ?ActiveRecord.RecordStorage {
        let totalSize = ExperimentalStableMemory.size();
        let totalSizeNat = Nat64.toNat(totalSize);
        let recordsOffset : Nat = 131072; // 第三页开始
        let recordsMetadataOffset : Nat = 196608; // 第四页开始
        
        if (totalSizeNat * 65536 > recordsMetadataOffset) {
            // 读取元数据获取数据大小
            let metadataBlob = ExperimentalStableMemory.loadBlob(Nat64.fromNat(recordsMetadataOffset), 8);
            let metadataBytes = Blob.toArray(metadataBlob);
            
            if (metadataBytes.size() >= 8) {
                func bytesToNat(bytes : [Nat8]) : Nat {
                    var result : Nat = 0;
                    for (byte in bytes.vals()) {
                        result := result * 256 + Nat8.toNat(byte);
                    };
                    return result;
                };
                
                let sizeBytes = Array.tabulate<Nat8>(8, func(i) { metadataBytes[i] });
                let dataSize = bytesToNat(sizeBytes);
                
                if (dataSize > 0 and totalSizeNat * 65536 >= recordsOffset + dataSize) {
                    // 读取记录数据
                    let blob = ExperimentalStableMemory.loadBlob(Nat64.fromNat(recordsOffset), dataSize);
                    let bytes = Blob.toArray(blob);
                    return ActiveRecord.deserialize(bytes);
                };
            };
        };
        return null;
    };
    
    // 新增记录（允许所有用户调用，因为前端是静态网站无法作为代理）
    // 注意：由于前端是静态网站（assets类型），用户通过浏览器直接调用后端时，
    // msg.caller 是用户的 Principal，而不是前端 canister 的 Principal。
    // 因此，我们需要允许所有用户调用此方法。
    public shared(msg) func createRecord(
        walletAddress : Text,
        timestamp : Text,
        prompt : Text,
        aioRewards : Float,
        pmugAirdrop : Float,
        status : Text
    ) : async (Bool, ?ActiveRecord.Record) {
        Debug.print("[createRecord] 开始创建记录，调用者: " # Principal.toText(msg.caller));
        Debug.print("[createRecord] 参数 - walletAddress: " # walletAddress # ", timestamp: " # timestamp);
        Debug.print("[createRecord] 参数 - aioRewards: " # Float.toText(aioRewards) # ", pmugAirdrop: " # Float.toText(pmugAirdrop) # ", status: " # status);
        
        // 注意：由于前端是静态网站，用户通过浏览器直接调用时 msg.caller 是用户的 Principal
        // 因此允许所有用户调用 createRecord（公开的创建记录功能）
        // 如果需要限制权限，可以取消下面的注释并启用权限检查
        /*
        // 检查权限：只有controller或frontend canister可以创建记录
        if (not hasPermission(msg.caller)) {
            Debug.print("[createRecord] 权限检查失败 - 调用者不是controller或允许的frontend canister");
            Debug.print("[createRecord] 调用者Principal: " # Principal.toText(msg.caller));
            Debug.print("[createRecord] 缓存的controllers数量: " # Nat.toText(cachedControllers.size()));
            switch (allowedFrontendCanister) {
                case (?frontendPrincipal) {
                    Debug.print("[createRecord] 允许的frontend canister: " # Principal.toText(frontendPrincipal));
                };
                case (null) {
                    Debug.print("[createRecord] 未设置允许的frontend canister");
                };
            };
            return (false, null); // 权限不足
        };
        */
        
        Debug.print("[createRecord] 开始处理记录（允许所有用户调用）");
        
        let currentStorage = getRecordStorage();
        Debug.print("[createRecord] 已加载存储，当前记录数: " # Nat.toText(currentStorage.records.size()) # ", nextId: " # Nat.toText(currentStorage.nextId));
        
        let (success, newStorage, record) = ActiveRecord.createRecord(
            currentStorage,
            walletAddress,
            timestamp,
            prompt,
            aioRewards,
            pmugAirdrop,
            status
        );
        
        if (success) {
            Debug.print("[createRecord] ActiveRecord.createRecord 成功");
            switch (record) {
                case (?r) {
                    Debug.print("[createRecord] 创建的记录ID: " # r.id);
                };
                case (null) {
                    Debug.print("[createRecord] 警告：success=true但record为null");
                };
            };
            // 保存到stable memory
            Debug.print("[createRecord] 开始保存到stable memory");
            setRecordStorage(newStorage);
            Debug.print("[createRecord] 保存到stable memory成功");
        } else {
            Debug.print("[createRecord] ActiveRecord.createRecord 失败 - 可能原因：数据验证失败");
            Debug.print("[createRecord] 存储状态 - records: " # Nat.toText(currentStorage.records.size()) # ", nextId: " # Nat.toText(currentStorage.nextId));
        };
        
        Debug.print("[createRecord] 返回结果 - success: " # (if (success) "true" else "false"));
        return (success, record);
    };
    
    // 更新记录（允许所有用户调用，因为前端是静态网站无法作为代理）
    public shared(msg) func updateRecord(
        id : Text,
        walletAddress : ?Text,
        timestamp : ?Text,
        prompt : ?Text,
        aioRewards : ?Float,
        pmugAirdrop : ?Float,
        status : ?Text
    ) : async (Bool, ?ActiveRecord.Record) {
        Debug.print("[updateRecord] 开始更新记录，调用者: " # Principal.toText(msg.caller) # ", ID: " # id);
        
        // 注意：由于前端是静态网站，用户通过浏览器直接调用时 msg.caller 是用户的 Principal
        // 因此允许所有用户调用 updateRecord
        // 如果需要限制权限，可以取消下面的注释并启用权限检查
        /*
        // 检查权限：只有controller或frontend canister可以更新
        if (not hasPermission(msg.caller)) {
            Debug.print("[updateRecord] 权限检查失败 - 调用者不是controller或允许的frontend canister");
            return (false, null); // 权限不足
        };
        */
        
        // 调试：打印传入的参数
        Debug.print("[updateRecord] 传入参数:");
        Debug.print("[updateRecord]   id: " # id);
        switch (walletAddress) {
            case (?addr) { Debug.print("[updateRecord]   walletAddress: " # addr); };
            case (null) { Debug.print("[updateRecord]   walletAddress: null"); };
        };
        switch (status) {
            case (?s) { Debug.print("[updateRecord]   status: " # s); };
            case (null) { Debug.print("[updateRecord]   status: null"); };
        };
        
        let currentStorage = getRecordStorage();
        let (success, newStorage, record) = ActiveRecord.updateRecord(
            currentStorage,
            id,
            walletAddress,
            timestamp,
            prompt,
            aioRewards,
            pmugAirdrop,
            status
        );
        
        if (success) {
            Debug.print("[updateRecord] 更新成功，记录ID: " # id);
            switch (record) {
                case (?r) {
                    Debug.print("[updateRecord] 更新后的记录 status: " # r.status);
                };
                case (null) {};
            };
            // 保存到stable memory
            setRecordStorage(newStorage);
        } else {
            Debug.print("[updateRecord] 更新失败，记录ID: " # id # " - 可能原因：记录不存在或walletAddress不匹配");
            // 如果传入了walletAddress，记录详细信息用于调试
            switch (walletAddress) {
                case (?addr) {
                    Debug.print("[updateRecord] 传入的walletAddress: " # addr);
                };
                case (null) {};
            };
        };
        
        return (success, record);
    };
    
    // 获取记录（查询方法，无需权限）
    public query func getRecord(id : Text) : async ?ActiveRecord.Record {
        let storage = getRecordStorage();
        return ActiveRecord.getRecord(storage, id);
    };
    
    // 分页查询记录（查询方法，无需权限）
    public query func getRecordsPaginated(
        page : Nat,
        pageSize : Nat
    ) : async ActiveRecord.PaginatedResult {
        let storage = getRecordStorage();
        return ActiveRecord.getRecordsPaginated(storage, page, pageSize);
    };
    
    // 按钱包地址分页查询记录（查询方法，无需权限）
    public query func getRecordsByWalletPaginated(
        walletAddress : Text,
        page : Nat,
        pageSize : Nat
    ) : async ActiveRecord.PaginatedResult {
        let storage = getRecordStorage();
        return ActiveRecord.getRecordsByWalletPaginated(storage, walletAddress, page, pageSize);
    };
    
    // 汇总查询所有待claim资金（查询方法，无需权限）
    public query func getPendingClaimSummary() : async ActiveRecord.PendingClaimSummary {
        let storage = getRecordStorage();
        return ActiveRecord.getPendingClaimSummary(storage);
    };
    
    // 按钱包地址获取pending状态的记录（查询方法，无需权限）
    public query func getPendingRecordByWallet(walletAddress : Text) : async ?ActiveRecord.Record {
        let storage = getRecordStorage();
        return ActiveRecord.getPendingRecordByWallet(storage, walletAddress);
    };
    
    // 生成设备激活数据（每次调用都随机生成，不存储）
    // 总设备数控制在2663以内，最小点亮133
    public query func getDeviceActivationData() : async [{
        name : Text;
        devices : Nat;
        delay : Nat;
    }] {
        // 定义区域名称
        let regionNames = [
            "North America",
            "Europe",
            "Asia Pacific",
            "South America",
            "Africa",
            "Middle East"
        ];
        
        // 总设备数控制在2663以内，最小133
        let maxTotalDevices : Nat = 2663;
        let minTotalDevices : Nat = 133;
        
        // 生成随机总设备数（在最小和最大之间）
        // 使用stable memory大小作为随机种子
        let timeSeed = Nat64.toNat(ExperimentalStableMemory.size());
        var randomSeed = timeSeed * 1103515245 + 12345;
        randomSeed := randomSeed * 1103515245 + 12345;
        let randomValue = randomSeed % 2147483648;
        // 使用简单的模运算来生成随机数
        let range = maxTotalDevices - minTotalDevices;
        let randomOffset = randomValue % (range + 1);
        var finalTotalDevices = minTotalDevices + randomOffset;
        
        // 确保总设备数在范围内
        if (finalTotalDevices > maxTotalDevices) {
            finalTotalDevices := maxTotalDevices;
        };
        if (finalTotalDevices < minTotalDevices) {
            finalTotalDevices := minTotalDevices;
        };
        
        // 为每个区域分配设备数量（使用加权随机分配）
        var remainingDevices = finalTotalDevices;
        var regions : [var { name : Text; devices : Nat; delay : Nat }] = Array.init<{ name : Text; devices : Nat; delay : Nat }>(regionNames.size(), { name = ""; devices = 0; delay = 0 });
        
        // 定义每个区域的权重（用于分配设备）
        let regionWeights = [30, 25, 35, 15, 10, 10]; // 百分比权重
        
        for (i in regionNames.keys()) {
            let regionName = regionNames[i];
            let weight = regionWeights[i];
            
            // 计算该区域应该分配的设备数量
            var regionDevices : Nat = 0;
            if (i == regionNames.size() - 1) {
                // 最后一个区域，分配剩余的所有设备（至少为1）
                regionDevices := if (remainingDevices > 0) { remainingDevices } else { 1 };
            } else {
                // 根据权重计算设备数量，加上一些随机性
                let baseDevices = (finalTotalDevices * weight) / 100;
                
                // 生成该区域的随机偏移（±15% 范围）
                randomSeed := randomSeed * 1103515245 + 12345;
                let regionRandom = randomSeed % 2147483648;
                // 计算偏移范围（15%）
                var offsetRange = baseDevices / 6; // 约15%的范围
                if (offsetRange == 0) {
                    offsetRange := 1;
                };
                // 生成随机偏移值（0 到 offsetRange*2）
                // 使用模运算来生成 -offsetRange 到 +offsetRange 的范围
                let randomOffset = regionRandom % (offsetRange * 2 + 1);
                // 将 randomOffset 映射到 -offsetRange 到 +offsetRange 的范围
                // 如果 randomOffset >= offsetRange，则为正偏移；否则为负偏移
                if (randomOffset >= offsetRange and randomOffset > offsetRange) {
                    // 正偏移：计算差值（randomOffset - offsetRange）
                    // 由于 randomOffset > offsetRange，差值至少为1
                    var positiveOffset : Nat = 0;
                    var current = offsetRange;
                    while (current < randomOffset) {
                        positiveOffset += 1;
                        current += 1;
                    };
                    regionDevices := baseDevices + positiveOffset;
                } else if (randomOffset < offsetRange) {
                    // 负偏移：计算差值（offsetRange - randomOffset）
                    // 由于 randomOffset < offsetRange，差值至少为1
                    var negativeOffset : Nat = 0;
                    var current = randomOffset;
                    while (current < offsetRange) {
                        negativeOffset += 1;
                        current += 1;
                    };
                    if (baseDevices >= negativeOffset) {
                        regionDevices := baseDevices - negativeOffset;
                    } else {
                        regionDevices := 1;
                    };
                } else {
                    // randomOffset == offsetRange，无偏移
                    regionDevices := baseDevices;
                };
                
                // 确保不超过剩余设备数，且至少为1
                if (regionDevices > remainingDevices) {
                    regionDevices := remainingDevices;
                };
                if (regionDevices == 0) {
                    regionDevices := 1;
                };
            };
            
            // 安全地减少剩余设备数（防止下溢）
            if (remainingDevices >= regionDevices) {
                remainingDevices -= regionDevices;
            } else {
                // 如果剩余设备数不足，将剩余的全部分配
                regionDevices := remainingDevices;
                remainingDevices := 0;
            };
            regions[i] := {
                name = regionName;
                devices = regionDevices;
                delay = i * 1000; // 每个区域延迟1秒
            };
        };
        
        return Array.freeze(regions);
    };
    
    // 保存记录数据到stable memory（使用偏移量 131072，即第三页开始）
    // 注意：此函数已被 setRecordStorage 替代，保留用于兼容性
    func saveRecordsToStableMemory() {
        let currentStorage = getRecordStorage();
        setRecordStorage(currentStorage);
    };
    
    // 序列化记录元数据（数据大小）
    func serializeRecordsMetadata(dataSize : Nat) : Blob {
        var bytes : [var Nat8] = Array.init<Nat8>(0, 0);
        
        // 写入数据大小（8字节）
        func natToBytes(n : Nat) : [Nat8] {
            var result : [var Nat8] = Array.init<Nat8>(8, 0);
            var num = n;
            var i = 7;
            while (num > 0 and i >= 0) {
                result[i] := Nat8.fromNat(num % 256);
                num := num / 256;
                i -= 1;
            };
            return Array.freeze(result);
        };
        
        let sizeBytes = natToBytes(dataSize);
        bytes := Array.thaw(Array.append(Array.freeze(bytes), sizeBytes));
        
        return Blob.fromArray(Array.freeze(bytes));
    };
    
    // 从stable memory恢复记录数据
    // 注意：此函数在 postupgrade 中调用，但不需要更新缓存（因为不使用缓存）
    func loadRecordsFromStableMemory() {
        // 数据会在 getRecordStorage 时自动加载
        // 这里只是占位符，确保 postupgrade 可以正常调用
    };
    
    // 更新 preupgrade 钩子，同时保存记录数据
    system func preupgrade() {
        // 更新controllers缓存
        updateControllersCache();
        // stable变量会自动保存，但我们显式保存到stable memory以确保数据安全
        saveToStableMemory();
        saveRecordsToStableMemory();
    };

    // 更新 postupgrade 钩子，同时恢复记录数据
    system func postupgrade() {
        // 首先尝试从stable memory恢复
        loadFromStableMemory();
        loadRecordsFromStableMemory();
        // 如果stable memory为空，loadRecordsFromStableMemory 会初始化空存储
        // 如果stable memory为空，stable变量会自动恢复
        // 更新controllers缓存（升级后可能需要重新获取）
        updateControllersCache();
    };

    // 保留原有的 greet 方法
    public query func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
};
