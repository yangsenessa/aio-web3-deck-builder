// ActiveRecord 模块
// 此模块实现了记录的创建、查询和汇总功能

import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Float "mo:base/Float";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Char "mo:base/Char";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";

// 记录数据结构
type Record = {
    id : Text;
    walletAddress : Text;
    timestamp : Text;
    prompt : Text;
    aioRewards : Float;
    pmugAirdrop : Float;
    status : Text; // "completed" 或 "claimed"
    airdropWalletAddress : ?Text; // 空投钱包地址，默认为 null
    airdropNetwork : ?Text; // 空投网络，默认为 "Solana"
};

// 存储结构
type RecordStorage = {
    records : HashMap.HashMap<Text, Record>;
    nextId : Nat;
};

// 分页查询结果
type PaginatedResult = {
    records : [Record];
    total : Nat;
    page : Nat;
    pageSize : Nat;
    totalPages : Nat;
};

// 待claim资金汇总
type PendingClaimSummary = {
    totalAioRewards : Float;
    totalPmugAirdrop : Float;
    pendingCount : Nat;
};

// 初始化存储
func initStorage() : RecordStorage {
    return {
        records = HashMap.HashMap<Text, Record>(0, Text.equal, Text.hash);
        nextId = 1;
    };
};

// 生成新的ID
func generateId(storage : RecordStorage) : Text {
    let id = Nat.toText(storage.nextId);
    return id;
};

// 新增记录
func createRecord(
    storage : RecordStorage,
    walletAddress : Text,
    timestamp : Text,
    prompt : Text,
    aioRewards : Float,
    pmugAirdrop : Float,
    status : Text
) : (Bool, RecordStorage, ?Record) {
    Debug.print("[ActiveRecord.createRecord] 开始创建记录");
    Debug.print("[ActiveRecord.createRecord] 输入参数验证:");
    Debug.print("[ActiveRecord.createRecord]   walletAddress长度: " # Nat.toText(Text.size(walletAddress)));
    Debug.print("[ActiveRecord.createRecord]   timestamp长度: " # Nat.toText(Text.size(timestamp)));
    Debug.print("[ActiveRecord.createRecord]   prompt长度: " # Nat.toText(Text.size(prompt)));
    Debug.print("[ActiveRecord.createRecord]   输入 aioRewards: " # Float.toText(aioRewards));
    Debug.print("[ActiveRecord.createRecord]   输入 pmugAirdrop: " # Float.toText(pmugAirdrop));
    Debug.print("[ActiveRecord.createRecord]   status: " # status);
    Debug.print("[ActiveRecord.createRecord] 当前存储状态 - 记录数: " # Nat.toText(storage.records.size()) # ", nextId: " # Nat.toText(storage.nextId));
    
    // 生成新ID
    let id = generateId(storage);
    Debug.print("[ActiveRecord.createRecord] 生成的新ID: " # id);
    
    // 计算 rewards 和 airdrop（如果前端传入的是 0，则在后端计算）
    var calculatedAioRewards : Float = aioRewards;
    var calculatedPmugAirdrop : Float = pmugAirdrop;
    
    if (aioRewards == 0.0 and pmugAirdrop == 0.0) {
        // 使用基于记录ID和存储状态的确定性计算来生成随机值
        // 这样可以保证相同输入产生相同结果，同时又有一定的随机性
        // 使用 nextId 作为种子（因为 ID 就是基于 nextId 生成的）
        let idNat = storage.nextId;
        let recordsCount = storage.records.size();
        
        // 使用简单的哈希算法基于ID和记录数生成伪随机数
        // aioRewards: 50-250 之间（原前端逻辑：Math.floor(Math.random() * 200) + 50）
        let aioSeed = (idNat * 17 + recordsCount * 23) % 500;
        calculatedAioRewards := Float.fromInt(50 + aioSeed);
        
        // pmugAirdrop: 25-125 之间（原前端逻辑：Math.floor(Math.random() * 100) + 25）
        let pmugSeed = (idNat * 31 + recordsCount * 37) % 300;
        calculatedPmugAirdrop := Float.fromInt(25 + pmugSeed);
        
        Debug.print("[ActiveRecord.createRecord] 后端计算 rewards - aioRewards: " # Float.toText(calculatedAioRewards) # ", pmugAirdrop: " # Float.toText(calculatedPmugAirdrop));
    } else {
        Debug.print("[ActiveRecord.createRecord] 使用前端传入的值 - aioRewards: " # Float.toText(calculatedAioRewards) # ", pmugAirdrop: " # Float.toText(calculatedPmugAirdrop));
    };
    
    // 创建新记录
    let newRecord : Record = {
        id = id;
        walletAddress = walletAddress;
        timestamp = timestamp;
        prompt = prompt;
        aioRewards = calculatedAioRewards;
        pmugAirdrop = calculatedPmugAirdrop;
        status = status;
        airdropWalletAddress = null; // 默认为 null
        airdropNetwork = ?"Solana"; // 默认为 "Solana"
    };
    
    Debug.print("[ActiveRecord.createRecord] 记录对象创建成功");
    
    // 创建新的存储
    let newRecords = HashMap.clone<Text, Record>(storage.records, Text.equal, Text.hash);
    newRecords.put(id, newRecord);
    Debug.print("[ActiveRecord.createRecord] 记录已添加到HashMap");
    
    let newStorage : RecordStorage = {
        records = newRecords;
        nextId = storage.nextId + 1;
    };
    
    Debug.print("[ActiveRecord.createRecord] 新存储创建成功，记录数: " # Nat.toText(newStorage.records.size()) # ", nextId: " # Nat.toText(newStorage.nextId));
    Debug.print("[ActiveRecord.createRecord] 返回成功");
    
    return (true, newStorage, ?newRecord);
};

// 更新记录
// 注意：如果传入walletAddress，会验证是否与现有记录的walletAddress一致（不区分大小写）
// 如果不一致，更新会被拒绝，以防止重入攻击
func updateRecord(
    storage : RecordStorage,
    id : Text,
    walletAddress : ?Text,
    timestamp : ?Text,
    prompt : ?Text,
    aioRewards : ?Float,
    pmugAirdrop : ?Float,
    status : ?Text
) : (Bool, RecordStorage, ?Record) {
    switch (storage.records.get(id)) {
        case (null) {
            Debug.print("[ActiveRecord.updateRecord] 记录不存在，ID: " # id);
            return (false, storage, null);
        };
        case (?existingRecord) {
            // 如果传入了walletAddress，验证是否与现有记录的walletAddress一致（不区分大小写）
            switch (walletAddress) {
                case (null) {
                    // 未传入walletAddress，允许更新（保持原有walletAddress）
                };
                case (?newWalletAddress) {
                    // 转换为小写进行比较（不区分大小写）
                    func toLower(text : Text) : Text {
                        var result = "";
                        for (c in Text.toIter(text)) {
                            let cLower = if (Char.isUppercase(c)) {
                                Char.fromNat32(Char.toNat32(c) + 32)
                            } else {
                                c
                            };
                            result := result # Text.fromChar(cLower);
                        };
                        return result;
                    };
                    
                    let existingAddrLower = toLower(existingRecord.walletAddress);
                    let newAddrLower = toLower(newWalletAddress);
                    
                    if (existingAddrLower != newAddrLower) {
                        Debug.print("[ActiveRecord.updateRecord] walletAddress不匹配，拒绝更新");
                        Debug.print("[ActiveRecord.updateRecord] 现有记录walletAddress: " # existingRecord.walletAddress);
                        Debug.print("[ActiveRecord.updateRecord] 传入的walletAddress: " # newWalletAddress);
                        return (false, storage, null);
                    };
                };
            };
            
            // 更新记录
            // 调试：打印传入的 status 值
            switch (status) {
                case (null) {
                    Debug.print("[ActiveRecord.updateRecord] status 为 null，保持原有值: " # existingRecord.status);
                };
                case (?s) {
                    Debug.print("[ActiveRecord.updateRecord] 传入的 status: " # s);
                    Debug.print("[ActiveRecord.updateRecord] 原有 status: " # existingRecord.status);
                };
            };
            
            let updatedRecord : Record = {
                id = existingRecord.id;
                walletAddress = switch (walletAddress) {
                    case (null) { existingRecord.walletAddress };
                    case (?addr) { addr };
                };
                timestamp = switch (timestamp) {
                    case (null) { existingRecord.timestamp };
                    case (?ts) { ts };
                };
                prompt = switch (prompt) {
                    case (null) { existingRecord.prompt };
                    case (?p) { p };
                };
                aioRewards = switch (aioRewards) {
                    case (null) { existingRecord.aioRewards };
                    case (?reward) { reward };
                };
                pmugAirdrop = switch (pmugAirdrop) {
                    case (null) { existingRecord.pmugAirdrop };
                    case (?airdrop) { airdrop };
                };
                status = switch (status) {
                    case (null) { existingRecord.status };
                    case (?s) { s };
                };
                airdropWalletAddress = existingRecord.airdropWalletAddress; // 保持原有值，通过 updateAirdropWalletAddress 更新
                airdropNetwork = existingRecord.airdropNetwork; // 保持原有值，通过 updateAirdropWalletAddress 更新
            };
            
            Debug.print("[ActiveRecord.updateRecord] 更新后的 status: " # updatedRecord.status);
            
            // 创建新的存储
            let newRecords = HashMap.clone<Text, Record>(storage.records, Text.equal, Text.hash);
            newRecords.put(id, updatedRecord);
            
            let newStorage : RecordStorage = {
                records = newRecords;
                nextId = storage.nextId;
            };
            
            Debug.print("[ActiveRecord.updateRecord] 更新成功，记录ID: " # id);
            return (true, newStorage, ?updatedRecord);
        };
    };
};

// 获取记录
func getRecord(storage : RecordStorage, id : Text) : ?Record {
    return storage.records.get(id);
};

// 分页查询记录
// 注意：page 参数从1开始（前端传入的是从1开始的页码）
func getRecordsPaginated(
    storage : RecordStorage,
    page : Nat,
    pageSize : Nat
) : PaginatedResult {
    // 获取所有记录并转换为数组
    let allRecords = Iter.toArray(storage.records.vals());
    
    // 计算总数
    let total = allRecords.size();
    
    // 计算总页数
    let totalPages = if (total == 0) {
        0
    } else {
        (total + pageSize - 1) / pageSize;
    };
    
    // 计算起始索引（page从1开始，所以需要减1）
    // 如果page为0或小于1，默认为1
    let pageNum = if (page == 0) { 1 } else { page };
    let startIndex = (pageNum - 1) * pageSize;
    let endIndex = if (startIndex + pageSize > total) {
        total
    } else {
        startIndex + pageSize
    };
    
    // 获取当前页的记录
    var records : [var Record] = Array.init<Record>(0, {
        id = "";
        walletAddress = "";
        timestamp = "";
        prompt = "";
        aioRewards = 0.0;
        pmugAirdrop = 0.0;
        status = "";
        airdropWalletAddress = null;
        airdropNetwork = ?"Solana";
    });
    
    var i = startIndex;
    while (i < endIndex and i < allRecords.size()) {
        records := Array.thaw(Array.append(Array.freeze(records), [allRecords[i]]));
        i += 1;
    };
    
    return {
        records = Array.freeze(records);
        total = total;
        page = page;
        pageSize = pageSize;
        totalPages = totalPages;
    };
};

// 按钱包地址分页查询记录
// 注意：page 参数从1开始（前端传入的是从1开始的页码）
func getRecordsByWalletPaginated(
    storage : RecordStorage,
    walletAddress : Text,
    page : Nat,
    pageSize : Nat
) : PaginatedResult {
    // 获取所有记录并过滤出匹配的钱包地址
    var filteredRecords : [var Record] = Array.init<Record>(0, {
        id = "";
        walletAddress = "";
        timestamp = "";
        prompt = "";
        aioRewards = 0.0;
        pmugAirdrop = 0.0;
        status = "";
        airdropWalletAddress = null;
        airdropNetwork = ?"Solana";
    });
    
    // 遍历所有记录，找出匹配的钱包地址（不区分大小写）
    // 钱包地址通常是十六进制字符串（0x开头），为了兼容性进行不区分大小写的比较
    for (record in storage.records.vals()) {
        // 钱包地址比较：先尝试精确匹配，如果不匹配则进行不区分大小写比较
        var matches = false;
        
        // 精确匹配
        if (record.walletAddress == walletAddress) {
            matches := true;
        } else {
            // 不区分大小写比较
            // 将两个地址都转换为小写进行比较
            // 使用 Text.toIter() 遍历字符
            func toLower(text : Text) : Text {
                var result = "";
                for (c in Text.toIter(text)) {
                    let cLower = if (Char.isUppercase(c)) {
                        Char.fromNat32(Char.toNat32(c) + 32)
                    } else {
                        c
                    };
                    result := result # Text.fromChar(cLower);
                };
                return result;
            };
            
            let addr1Lower = toLower(record.walletAddress);
            let addr2Lower = toLower(walletAddress);
            matches := addr1Lower == addr2Lower;
        };
        
        if (matches) {
            filteredRecords := Array.thaw(Array.append(Array.freeze(filteredRecords), [record]));
        };
    };
    
    // 按时间倒序排序（最新的在前）
    // 使用简单的冒泡排序（对于小数据集足够）
    let allFiltered = Array.freeze(filteredRecords);
    var sortedRecords : [var Record] = Array.init<Record>(allFiltered.size(), {
        id = "";
        walletAddress = "";
        timestamp = "";
        prompt = "";
        aioRewards = 0.0;
        pmugAirdrop = 0.0;
        status = "";
        airdropWalletAddress = null;
        airdropNetwork = ?"Solana";
    });
    
    // 复制数组
    var i = 0;
    while (i < allFiltered.size()) {
        sortedRecords[i] := allFiltered[i];
        i += 1;
    };
    
    // 简单排序：按 timestamp 降序（最新的在前）
    // 注意：这里使用简单的字符串比较，假设 timestamp 格式一致
    i := 0;
    while (i < sortedRecords.size()) {
        var j = i + 1;
        while (j < sortedRecords.size()) {
            if (sortedRecords[i].timestamp < sortedRecords[j].timestamp) {
                // 交换
                let temp = sortedRecords[i];
                sortedRecords[i] := sortedRecords[j];
                sortedRecords[j] := temp;
            };
            j += 1;
        };
        i += 1;
    };
    
    // 计算总数
    let total = sortedRecords.size();
    
    // 计算总页数
    let totalPages = if (total == 0) {
        0
    } else {
        (total + pageSize - 1) / pageSize;
    };
    
    // 计算起始索引（page从1开始，所以需要减1）
    let pageNum = if (page == 0) { 1 } else { page };
    let startIndex = (pageNum - 1) * pageSize;
    let endIndex = if (startIndex + pageSize > total) {
        total
    } else {
        startIndex + pageSize
    };
    
    // 获取当前页的记录
    var records : [var Record] = Array.init<Record>(0, {
        id = "";
        walletAddress = "";
        timestamp = "";
        prompt = "";
        aioRewards = 0.0;
        pmugAirdrop = 0.0;
        status = "";
        airdropWalletAddress = null;
        airdropNetwork = ?"Solana";
    });
    
    i := startIndex;
    while (i < endIndex and i < sortedRecords.size()) {
        records := Array.thaw(Array.append(Array.freeze(records), [sortedRecords[i]]));
        i += 1;
    };
    
    return {
        records = Array.freeze(records);
        total = total;
        page = page;
        pageSize = pageSize;
        totalPages = totalPages;
    };
};

// 汇总查询所有待claim资金（status != "claimed"）
func getPendingClaimSummary(storage : RecordStorage) : PendingClaimSummary {
    var totalAioRewards : Float = 0.0;
    var totalPmugAirdrop : Float = 0.0;
    var pendingCount : Nat = 0;
    
    for (record in storage.records.vals()) {
        if (record.status != "claimed") {
            totalAioRewards += record.aioRewards;
            totalPmugAirdrop += record.pmugAirdrop;
            pendingCount += 1;
        };
    };
    
    return {
        totalAioRewards = totalAioRewards;
        totalPmugAirdrop = totalPmugAirdrop;
        pendingCount = pendingCount;
    };
};

// 按钱包地址获取pending状态的记录（返回第一个匹配的记录）
func getPendingRecordByWallet(storage : RecordStorage, walletAddress : Text) : ?Record {
    // 遍历所有记录，找出匹配的钱包地址且状态为pending的记录
    // 钱包地址比较：不区分大小写
    func toLower(text : Text) : Text {
        var result = "";
        for (c in Text.toIter(text)) {
            let cLower = if (Char.isUppercase(c)) {
                Char.fromNat32(Char.toNat32(c) + 32)
            } else {
                c
            };
            result := result # Text.fromChar(cLower);
        };
        return result;
    };
    
    let walletAddressLower = toLower(walletAddress);
    
    for (record in storage.records.vals()) {
        // 检查钱包地址是否匹配（不区分大小写）
        var matches = false;
        if (record.walletAddress == walletAddress) {
            matches := true;
        } else {
            let recordAddrLower = toLower(record.walletAddress);
            matches := recordAddrLower == walletAddressLower;
        };
        
        // 如果钱包地址匹配且状态为pending，返回该记录
        if (matches and record.status == "pending") {
            return ?record;
        };
    };
    
    return null;
};

// 更新空投钱包地址
// 根据记录ID和walletAddress（用于验证）更新指定记录的空投钱包地址
func updateAirdropWalletAddress(
    storage : RecordStorage,
    recordId : Text,
    walletAddress : Text,
    airdropWalletAddress : Text,
    network : ?Text
) : (Bool, RecordStorage, ?Record) {
    switch (storage.records.get(recordId)) {
        case (null) {
            Debug.print("[ActiveRecord.updateAirdropWalletAddress] 记录不存在，ID: " # recordId);
            return (false, storage, null);
        };
        case (?existingRecord) {
            // 验证walletAddress是否匹配（不区分大小写）
            func toLower(text : Text) : Text {
                var result = "";
                for (c in Text.toIter(text)) {
                    let cLower = if (Char.isUppercase(c)) {
                        Char.fromNat32(Char.toNat32(c) + 32)
                    } else {
                        c
                    };
                    result := result # Text.fromChar(cLower);
                };
                return result;
            };
            
            let existingAddrLower = toLower(existingRecord.walletAddress);
            let inputAddrLower = toLower(walletAddress);
            
            if (existingAddrLower != inputAddrLower) {
                Debug.print("[ActiveRecord.updateAirdropWalletAddress] walletAddress不匹配，拒绝更新");
                Debug.print("[ActiveRecord.updateAirdropWalletAddress] 现有记录walletAddress: " # existingRecord.walletAddress);
                Debug.print("[ActiveRecord.updateAirdropWalletAddress] 传入的walletAddress: " # walletAddress);
                return (false, storage, null);
            };
            
            // walletAddress匹配，更新空投钱包地址
            let networkValue = switch (network) {
                case (null) { "Solana" }; // 默认值为 "Solana"
                case (?n) { n };
            };
            
            let updatedRecord : Record = {
                id = existingRecord.id;
                walletAddress = existingRecord.walletAddress;
                timestamp = existingRecord.timestamp;
                prompt = existingRecord.prompt;
                aioRewards = existingRecord.aioRewards;
                pmugAirdrop = existingRecord.pmugAirdrop;
                status = existingRecord.status;
                airdropWalletAddress = ?airdropWalletAddress;
                airdropNetwork = ?networkValue;
            };
            
            // 创建新的存储
            let newRecords = HashMap.clone<Text, Record>(storage.records, Text.equal, Text.hash);
            newRecords.put(recordId, updatedRecord);
            
            let newStorage : RecordStorage = {
                records = newRecords;
                nextId = storage.nextId;
            };
            
            Debug.print("[ActiveRecord.updateAirdropWalletAddress] 更新成功，记录ID: " # recordId # ", airdropWalletAddress: " # airdropWalletAddress # ", network: " # networkValue);
            return (true, newStorage, ?updatedRecord);
        };
    };
};

// ========== 序列化/反序列化 ==========

// 序列化存储到字节数组
func serialize(storage : RecordStorage) : [Nat8] {
    // 序列化格式：
    // [nextId(8字节)] +
    // [记录数量(4字节)] +
    // 对于每条记录：
    //   [id长度(4字节)] + [id字节] +
    //   [walletAddress长度(4字节)] + [walletAddress字节] +
    //   [timestamp长度(4字节)] + [timestamp字节] +
    //   [prompt长度(4字节)] + [prompt字节] +
    //   [aioRewards(8字节)] +
    //   [pmugAirdrop(8字节)] +
    //   [status长度(4字节)] + [status字节] +
    //   [airdropWalletAddress标志(1字节)] + [airdropWalletAddress长度(4字节)] + [airdropWalletAddress字节]（如果存在）+
    //   [airdropNetwork标志(1字节)] + [airdropNetwork长度(4字节)] + [airdropNetwork字节]（如果存在）
    
    var result : [var Nat8] = Array.init<Nat8>(0, 0);
    
    // 将Nat转换为字节数组
    func natToBytes(n : Nat, bytesCount : Nat) : [Nat8] {
        var bytes : [var Nat8] = Array.init<Nat8>(bytesCount, 0);
        var num = n;
        var i = bytesCount - 1;
        while (num > 0 and i >= 0) {
            bytes[i] := Nat8.fromNat(num % 256);
            num := num / 256;
            i -= 1;
        };
        return Array.freeze(bytes);
    };
    
    // 将Float转换为8字节（使用文本编码）
    func floatToBytes(f : Float) : [Nat8] {
        let text = Float.toText(f);
        let textBytes = Blob.toArray(Text.encodeUtf8(text));
        var result : [var Nat8] = Array.init<Nat8>(8, 0);
        var i = 0;
        while (i < textBytes.size() and i < 8) {
            result[i] := textBytes[i];
            i += 1;
        };
        return Array.freeze(result);
    };
    
    // 写入nextId（8字节）
    let nextIdBytes = natToBytes(storage.nextId, 8);
    result := Array.thaw(Array.append(Array.freeze(result), nextIdBytes));
    
    // 写入记录数量（4字节）
    let recordsArray = Iter.toArray(storage.records.vals());
    let recordsCount = recordsArray.size();
    let countBytes = natToBytes(recordsCount, 4);
    result := Array.thaw(Array.append(Array.freeze(result), countBytes));
    
    // 写入每条记录
    for (record in recordsArray.vals()) {
        // id
        let idBytes = Blob.toArray(Text.encodeUtf8(record.id));
        let idLenBytes = natToBytes(idBytes.size(), 4);
        result := Array.thaw(Array.append(Array.freeze(result), idLenBytes));
        result := Array.thaw(Array.append(Array.freeze(result), idBytes));
        
        // walletAddress
        let walletBytes = Blob.toArray(Text.encodeUtf8(record.walletAddress));
        let walletLenBytes = natToBytes(walletBytes.size(), 4);
        result := Array.thaw(Array.append(Array.freeze(result), walletLenBytes));
        result := Array.thaw(Array.append(Array.freeze(result), walletBytes));
        
        // timestamp
        let timestampBytes = Blob.toArray(Text.encodeUtf8(record.timestamp));
        let timestampLenBytes = natToBytes(timestampBytes.size(), 4);
        result := Array.thaw(Array.append(Array.freeze(result), timestampLenBytes));
        result := Array.thaw(Array.append(Array.freeze(result), timestampBytes));
        
        // prompt
        let promptBytes = Blob.toArray(Text.encodeUtf8(record.prompt));
        let promptLenBytes = natToBytes(promptBytes.size(), 4);
        result := Array.thaw(Array.append(Array.freeze(result), promptLenBytes));
        result := Array.thaw(Array.append(Array.freeze(result), promptBytes));
        
        // aioRewards
        let aioRewardsBytes = floatToBytes(record.aioRewards);
        result := Array.thaw(Array.append(Array.freeze(result), aioRewardsBytes));
        
        // pmugAirdrop
        let pmugAirdropBytes = floatToBytes(record.pmugAirdrop);
        result := Array.thaw(Array.append(Array.freeze(result), pmugAirdropBytes));
        
        // status
        let statusBytes = Blob.toArray(Text.encodeUtf8(record.status));
        let statusLenBytes = natToBytes(statusBytes.size(), 4);
        result := Array.thaw(Array.append(Array.freeze(result), statusLenBytes));
        result := Array.thaw(Array.append(Array.freeze(result), statusBytes));
        
        // airdropWalletAddress（可选字段）
        switch (record.airdropWalletAddress) {
            case (null) {
                // 写入标志：0表示不存在
                let flagBytes : [Nat8] = [0];
                result := Array.thaw(Array.append(Array.freeze(result), flagBytes));
            };
            case (?addr) {
                // 写入标志：1表示存在
                let flagBytes : [Nat8] = [1];
                result := Array.thaw(Array.append(Array.freeze(result), flagBytes));
                let addrBytes = Blob.toArray(Text.encodeUtf8(addr));
                let addrLenBytes = natToBytes(addrBytes.size(), 4);
                result := Array.thaw(Array.append(Array.freeze(result), addrLenBytes));
                result := Array.thaw(Array.append(Array.freeze(result), addrBytes));
            };
        };
        
        // airdropNetwork（可选字段）
        switch (record.airdropNetwork) {
            case (null) {
                // 写入标志：0表示不存在
                let flagBytes : [Nat8] = [0];
                result := Array.thaw(Array.append(Array.freeze(result), flagBytes));
            };
            case (?net) {
                // 写入标志：1表示存在
                let flagBytes : [Nat8] = [1];
                result := Array.thaw(Array.append(Array.freeze(result), flagBytes));
                let netBytes = Blob.toArray(Text.encodeUtf8(net));
                let netLenBytes = natToBytes(netBytes.size(), 4);
                result := Array.thaw(Array.append(Array.freeze(result), netLenBytes));
                result := Array.thaw(Array.append(Array.freeze(result), netBytes));
            };
        };
    };
    
    return Array.freeze(result);
};

// 从字节数组反序列化存储
func deserialize(bytes : [Nat8]) : ?RecordStorage {
    if (bytes.size() < 12) {
        return null;
    };
    
    var offset = 0;
    
    // 读取字节到Nat
    func bytesToNat(bytes : [Nat8]) : Nat {
        var result : Nat = 0;
        for (byte in bytes.vals()) {
            result := result * 256 + Nat8.toNat(byte);
        };
        return result;
    };
    
    // 读取指定长度的Nat
    func readNat(bytesCount : Nat) : Nat {
        if (offset + bytesCount > bytes.size()) {
            return 0;
        };
        let slice = Array.tabulate<Nat8>(bytesCount, func(i) { bytes[offset + i] });
        offset += bytesCount;
        return bytesToNat(slice);
    };
    
    // 读取Text
    func readText() : ?Text {
        let len = readNat(4);
        if (offset + len > bytes.size()) {
            return null;
        };
        let slice = Array.tabulate<Nat8>(len, func(i) { bytes[offset + i] });
        offset += len;
        let blob = Blob.fromArray(slice);
        return Text.decodeUtf8(blob);
    };
    
    // 读取Float
    func readFloat() : ?Float {
        let slice = Array.tabulate<Nat8>(8, func(i) {
            if (offset + i < bytes.size()) {
                bytes[offset + i]
            } else {
                0
            }
        });
        offset += 8;
        
        // 找到第一个null字符的位置
        var textLen = 8;
        var i = 0;
        while (i < 8) {
            if (slice[i] == 0) {
                textLen := i;
                i := 8;
            } else {
                i += 1;
            }
        };
        
        let textSlice = Array.tabulate<Nat8>(textLen, func(j) { slice[j] });
        let blob = Blob.fromArray(textSlice);
        switch (Text.decodeUtf8(blob)) {
            case (?text) {
                // 解析Float（简化版本）
                var result : Float = 0.0;
                var parts = Iter.toArray(Text.split(text, #char('.')));
                if (parts.size() > 0) {
                    var intPart : Nat = 0;
                    for (char in Text.toIter(parts[0])) {
                        let digit = Nat32.toNat(Char.toNat32(char) - 48);
                        if (digit < 10) {
                            intPart := intPart * 10 + digit;
                        };
                    };
                    result := Float.fromInt(intPart);
                    if (parts.size() > 1) {
                        var fracPart : Nat = 0;
                        var fracLen = 0;
                        for (char in Text.toIter(parts[1])) {
                            let digit = Nat32.toNat(Char.toNat32(char) - 48);
                            if (digit < 10) {
                                fracPart := fracPart * 10 + digit;
                                fracLen += 1;
                            };
                        };
                        if (fracLen > 0) {
                            var divisor : Float = Float.fromInt(10);
                            var j = 0;
                            while (j < fracLen) {
                                divisor := divisor * 10.0;
                                j += 1;
                            };
                            result := result + Float.fromInt(fracPart) / divisor;
                        };
                    };
                };
                return ?result;
            };
            case (_) { return ?0.0 };
        };
    };
    
    // 读取nextId
    let nextId = readNat(8);
    
    // 读取记录数量
    let recordsCount = readNat(4);
    
    // 创建HashMap
    let records = HashMap.HashMap<Text, Record>(recordsCount, Text.equal, Text.hash);
    
    // 读取每条记录
    var i = 0;
    while (i < recordsCount) {
        let id = switch (readText()) {
            case (?idText) { idText };
            case (_) { return null };
        };
        
        let walletAddress = switch (readText()) {
            case (?addr) { addr };
            case (_) { return null };
        };
        
        let timestamp = switch (readText()) {
            case (?ts) { ts };
            case (_) { return null };
        };
        
        let prompt = switch (readText()) {
            case (?p) { p };
            case (_) { return null };
        };
        
        let aioRewards = switch (readFloat()) {
            case (?f) { f };
            case (_) { return null };
        };
        
        let pmugAirdrop = switch (readFloat()) {
            case (?f) { f };
            case (_) { return null };
        };
        
        let status = switch (readText()) {
            case (?s) { s };
            case (_) { return null };
        };
        
        // 读取可选字段 airdropWalletAddress（向后兼容：如果数据不足，使用默认值）
        var airdropWalletAddress : ?Text = null;
        if (offset + 1 <= bytes.size()) {
            let flag = bytes[offset];
            offset += 1;
            if (flag == 1) {
                // 字段存在，读取内容
                airdropWalletAddress := readText();
            };
        };
        
        // 读取可选字段 airdropNetwork（向后兼容：如果数据不足，使用默认值）
        var airdropNetwork : ?Text = ?"Solana"; // 默认值为 "Solana"
        if (offset + 1 <= bytes.size()) {
            let flag = bytes[offset];
            offset += 1;
            if (flag == 1) {
                // 字段存在，读取内容
                airdropNetwork := readText();
            } else {
                // 字段不存在，使用默认值
                airdropNetwork := ?"Solana";
            };
        };
        
        let record : Record = {
            id = id;
            walletAddress = walletAddress;
            timestamp = timestamp;
            prompt = prompt;
            aioRewards = aioRewards;
            pmugAirdrop = pmugAirdrop;
            status = status;
            airdropWalletAddress = airdropWalletAddress;
            airdropNetwork = airdropNetwork;
        };
        
        records.put(id, record);
        i += 1;
    };
    
    return ?{
        records = records;
        nextId = nextId;
    };
};
