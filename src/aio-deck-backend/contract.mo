// 合约管理模块
// 此模块实现了合约的初始化、更新和查询功能

import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Float "mo:base/Float";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Char "mo:base/Char";

// 合约数据结构
type Contract = {
    interactAddress : Text;
    nodeSeed : Nat;
    rewardPerNode : Float;
    airdropAmount : Float;
    meta : Text;
};

// 初始化合约
func initContract(
    contract : ?Contract,
    interactAddress : Text,
    nodeSeed : Nat,
    rewardPerNode : Float,
    airdropAmount : Float,
    meta : Text
) : (Bool, ?Contract) {
    switch (contract) {
        case (null) {
            let newContract : Contract = {
                interactAddress = interactAddress;
                nodeSeed = nodeSeed;
                rewardPerNode = rewardPerNode;
                airdropAmount = airdropAmount;
                meta = meta;
            };
            return (true, ?newContract);
        };
        case (_) {
            // 如果已存在合约，返回 false
            return (false, contract);
        };
    };
};

// 更新合约
func updateContract(
    contract : ?Contract,
    interactAddress : ?Text,
    nodeSeed : ?Nat,
    rewardPerNode : ?Float,
    airdropAmount : ?Float,
    meta : ?Text
) : (Bool, ?Contract) {
    switch (contract) {
        case (null) {
            // 如果合约不存在，返回 false
            return (false, null);
        };
        case (?existingContract) {
            // 更新合约，只更新提供的字段
            let updatedContract : Contract = {
                interactAddress = switch (interactAddress) {
                    case (null) { existingContract.interactAddress };
                    case (?addr) { addr };
                };
                nodeSeed = switch (nodeSeed) {
                    case (null) { existingContract.nodeSeed };
                    case (?seed) { seed };
                };
                rewardPerNode = switch (rewardPerNode) {
                    case (null) { existingContract.rewardPerNode };
                    case (?reward) { reward };
                };
                airdropAmount = switch (airdropAmount) {
                    case (null) { existingContract.airdropAmount };
                    case (?amount) { amount };
                };
                meta = switch (meta) {
                    case (null) { existingContract.meta };
                    case (?m) { m };
                };
            };
            return (true, ?updatedContract);
        };
    };
};

// 获取合约
func getContract(contract : ?Contract) : ?Contract {
    return contract;
};

// 序列化合约到字节数组
func serialize(contract : Contract) : [Nat8] {
    // 序列化格式：
    // [interactAddress长度(4字节)] + [interactAddress字节] +
    // [nodeSeed(8字节)] +
    // [rewardPerNode(8字节)] +
    // [airdropAmount(8字节)] +
    // [meta长度(4字节)] + [meta字节]
    
    let interactAddressBytes = Blob.toArray(Text.encodeUtf8(contract.interactAddress));
    let metaBytes = Blob.toArray(Text.encodeUtf8(contract.meta));
    
    // 将Nat转换为8字节
    func natToBytes(n : Nat) : [Nat8] {
        var bytes : [var Nat8] = Array.init<Nat8>(8, 0);
        var num = n;
        var i = 7;
        while (num > 0 and i >= 0) {
            bytes[i] := Nat8.fromNat(num % 256);
            num := num / 256;
            i -= 1;
        };
        return Array.freeze(bytes);
    };
    
    // 将Float转换为8字节（使用文本编码，简化版本）
    func floatToBytes(f : Float) : [Nat8] {
        // 将Float转换为Text，然后编码为UTF-8
        // 注意：这是一个简化版本，实际应该使用IEEE 754编码
        let text = Float.toText(f);
        let textBytes = Blob.toArray(Text.encodeUtf8(text));
        // 填充到8字节
        var result : [var Nat8] = Array.init<Nat8>(8, 0);
        var i = 0;
        while (i < textBytes.size() and i < 8) {
            result[i] := textBytes[i];
            i += 1;
        };
        return Array.freeze(result);
    };
    
    // 构建字节数组
    var result : [var Nat8] = Array.init<Nat8>(0, 0);
    
    // interactAddress长度（4字节）
    let addrLenBytes = natToBytes(interactAddressBytes.size());
    result := Array.thaw(Array.append(Array.freeze(result), addrLenBytes));
    
    // interactAddress内容
    result := Array.thaw(Array.append(Array.freeze(result), interactAddressBytes));
    
    // nodeSeed（8字节）
    let nodeSeedBytes = natToBytes(contract.nodeSeed);
    result := Array.thaw(Array.append(Array.freeze(result), nodeSeedBytes));
    
    // rewardPerNode（8字节，使用文本编码简化）
    let rewardBytes = floatToBytes(contract.rewardPerNode);
    result := Array.thaw(Array.append(Array.freeze(result), rewardBytes));
    
    // airdropAmount（8字节，使用文本编码简化）
    let airdropBytes = floatToBytes(contract.airdropAmount);
    result := Array.thaw(Array.append(Array.freeze(result), airdropBytes));
    
    // meta长度（4字节）
    let metaLenBytes = natToBytes(metaBytes.size());
    result := Array.thaw(Array.append(Array.freeze(result), metaLenBytes));
    
    // meta内容
    result := Array.thaw(Array.append(Array.freeze(result), metaBytes));
    
    return Array.freeze(result);
};

// 从字节数组反序列化合约
func deserialize(bytes : [Nat8]) : ?Contract {
    if (bytes.size() < 4) {
        return null;
    };
    
    var offset = 0;
    
    // 读取interactAddress长度
    func bytesToNat(bytes : [Nat8]) : Nat {
        var result : Nat = 0;
        for (byte in bytes.vals()) {
            result := result * 256 + Nat8.toNat(byte);
        };
        return result;
    };
    
    func readNat32() : Nat {
        if (offset + 4 > bytes.size()) {
            return 0;
        };
        let slice = Array.tabulate<Nat8>(4, func(i) { bytes[offset + i] });
        offset += 4;
        return bytesToNat(slice);
    };
    
    func readNat64() : Nat {
        if (offset + 8 > bytes.size()) {
            return 0;
        };
        let slice = Array.tabulate<Nat8>(8, func(i) { bytes[offset + i] });
        offset += 8;
        return bytesToNat(slice);
    };
    
    func readText(len : Nat) : ?Text {
        if (offset + len > bytes.size()) {
            return null;
        };
        let slice = Array.tabulate<Nat8>(len, func(i) { bytes[offset + i] });
        offset += len;
        let blob = Blob.fromArray(slice);
        return Text.decodeUtf8(blob);
    };
    
    func readFloat() : ?Float {
        // 简化版本：读取8字节，尝试解析为Float
        // 实际应该使用IEEE 754解码
        let slice = Array.tabulate<Nat8>(8, func(i) {
            if (offset + i < bytes.size()) {
                bytes[offset + i]
            } else {
                0
            }
        });
        offset += 8;
        // 尝试从文本解析
        // 找到第一个null字符的位置
        var textLen = 8;
        var i = 0;
        while (i < 8) {
            if (slice[i] == 0) {
                textLen := i;
                i := 8; // 退出循环
            } else {
                i += 1;
            }
        };
        let textSlice = Array.tabulate<Nat8>(textLen, func(i) { slice[i] });
        let blob = Blob.fromArray(textSlice);
        switch (Text.decodeUtf8(blob)) {
            case (?text) {
                // 尝试解析为Float
                // 注意：Motoko没有Float.fromText，我们需要手动解析
                // 这里使用一个简化的解析方法
                var result : Float = 0.0;
                var parts = Iter.toArray(Text.split(text, #char('.')));
                if (parts.size() > 0) {
                    // 解析整数部分
                    var intPart : Nat = 0;
                    for (char in Text.toIter(parts[0])) {
                        let digit = Nat32.toNat(Char.toNat32(char) - 48);
                        if (digit < 10) {
                            intPart := intPart * 10 + digit;
                        };
                    };
                    result := Float.fromInt(intPart);
                    // 解析小数部分（简化）
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
    
    // 读取interactAddress
    let addrLen = readNat32();
    let interactAddress = switch (readText(addrLen)) {
        case (?addr) { addr };
        case (_) { return null };
    };
    
    // 读取nodeSeed
    let nodeSeed = readNat64();
    
    // 读取rewardPerNode
    let rewardPerNode = switch (readFloat()) {
        case (?f) { f };
        case (_) { return null };
    };
    
    // 读取airdropAmount
    let airdropAmount = switch (readFloat()) {
        case (?f) { f };
        case (_) { return null };
    };
    
    // 读取meta
    let metaLen = readNat32();
    let meta = switch (readText(metaLen)) {
        case (?m) { m };
        case (_) { return null };
    };
    
    return ?{
        interactAddress = interactAddress;
        nodeSeed = nodeSeed;
        rewardPerNode = rewardPerNode;
        airdropAmount = airdropAmount;
        meta = meta;
    };
};
