import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Mic, Zap, Check, Clock, Sparkles, Globe, Wifi, Home, Lightbulb } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useContract } from "../hooks/useContract";
import { useRecords } from "../hooks/useRecords";
import { interact, getConfig, setInteractionAddress, encodeMeta, claimAIO } from "../smartcontract/aio";
import type { Address } from "../smartcontract/aio";
import { BrowserProvider } from "ethers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import WalletConnectionDialog from "../components/WalletConnectionDialog";

interface Activity {
  id: string;
  timestamp: string;
  prompt: string;
  aioRewards: number; // $AIO rewards
  pmugAirdrop: number; // $PMUG airdrop
  status: "pending" | "completed" | "claimed" | "failed";
  walletAddress?: string; // 钱包地址，不展示
  airdropWalletAddress?: string | null; // 空投钱包地址
  airdropNetwork?: string | null; // 空投网络
}

const AIOPage: React.FC = () => {
  const { toast } = useToast();
  const { contract } = useContract(); // useContract 会自动在初始化时获取合约
  const { createRecord, updateRecord, getRecordsPaginated, getRecordsByWalletPaginated, getDeviceActivationData, getPendingRecordByWallet, updateAirdropWalletAddress } = useRecords();
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [feeWei, setFeeWei] = useState<bigint | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 每页显示10条记录
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [showProgress, setShowProgress] = useState(false); // 是否显示进度
  const [progress, setProgress] = useState(0); // 进度百分比
  const [activatedDevices, setActivatedDevices] = useState(0); // 已激活设备数量
  const [currentRegion, setCurrentRegion] = useState<string | null>(null); // 当前激活的区域
  const [pendingRecord, setPendingRecord] = useState<Activity | null>(null); // 当前持有的pending记录
  const [hasPendingRecord, setHasPendingRecord] = useState(false); // 是否有pending记录（用于控制voice command显示）
  const [pendingClaimSummary, setPendingClaimSummary] = useState<{ totalAioRewards: number; totalPmugAirdrop: number; pendingCount: number } | null>(null); // 待claim资金汇总
  const [isClaiming, setIsClaiming] = useState(false); // 是否正在claim
  const [claimTxHash, setClaimTxHash] = useState<`0x${string}` | null>(null); // Claim 交易哈希
  const [airdropDialogOpen, setAirdropDialogOpen] = useState(false); // 空投钱包地址对话框是否打开
  const [currentActivityForAirdrop, setCurrentActivityForAirdrop] = useState<Activity | null>(null); // 当前要设置空投地址的活动记录
  const [airdropWalletAddressInput, setAirdropWalletAddressInput] = useState(""); // 输入的空投钱包地址
  const [coffeeCupDialogOpen, setCoffeeCupDialogOpen] = useState(false); // 咖啡杯弹窗是否打开
  const [displayPrompt, setDisplayPrompt] = useState(""); // 要显示的prompt文本
  const canvasRef = useRef<HTMLCanvasElement>(null); // Canvas 引用
  
  // 全局开关：'local' 模式跳过链上合约检查，直接 mock 结果
  // 手动修改此值来切换模式：'local' 或 'production'
  const MODE = 'local';
  
  // 使用 useMemo 缓存环境变量，避免每次渲染都重新读取
  const envInteractionAddress = useMemo(() => {
    return (process.env.NEXT_PUBLIC_INTERACTION_ADDRESS || process.env.VITE_INTERACTION_ADDRESS) as Address | null;
  }, []); // 环境变量在构建时确定，不需要依赖
  
  // 使用 useMemo 缓存 INTERACTION_ADDRESS，只在 contract 或环境变量变化时更新
  const INTERACTION_ADDRESS = useMemo(() => {
    return (contract?.interactAddress || envInteractionAddress) as Address | null;
  }, [contract?.interactAddress, envInteractionAddress]);
  
  const [activities, setActivities] = useState<Activity[]>([]);

  const bannerImages = [
    "/aiopagelogo.png",
    "/AIO-Canister-Layer-Architecture.png",
    "/aiopagelogo.png",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 将后端 Record 转换为前端 Activity
  const convertRecordToActivity = (record: any): Activity => {
    // 保留原始 status，包括 "claimed" 状态
    let status: "pending" | "completed" | "claimed" | "failed" = "pending";
    if (record.status === "completed") {
      status = "completed";
    } else if (record.status === "claimed") {
      status = "claimed";
    } else if (record.status === "failed") {
      status = "failed";
    } else {
      status = "pending";
    }
    
    console.log('[AIOPage] convertRecordToActivity:', {
      recordId: record.id,
      recordStatus: record.status,
      convertedStatus: status
    });
    
    // 处理可选字段（Motoko 的 Opt 类型在 JavaScript 中可能是数组或 null）
    let airdropWalletAddress: string | null = null;
    if (record.airdropWalletAddress) {
      if (Array.isArray(record.airdropWalletAddress) && record.airdropWalletAddress.length > 0) {
        airdropWalletAddress = record.airdropWalletAddress[0];
      } else if (typeof record.airdropWalletAddress === 'string') {
        airdropWalletAddress = record.airdropWalletAddress;
      }
    }
    
    let airdropNetwork: string | null = null;
    if (record.airdropNetwork) {
      if (Array.isArray(record.airdropNetwork) && record.airdropNetwork.length > 0) {
        airdropNetwork = record.airdropNetwork[0];
      } else if (typeof record.airdropNetwork === 'string') {
        airdropNetwork = record.airdropNetwork;
      }
    }
    
    return {
      id: record.id,
      timestamp: record.timestamp,
      prompt: record.prompt,
      aioRewards: record.aioRewards,
      pmugAirdrop: record.pmugAirdrop,
      status: status,
      walletAddress: record.walletAddress,
      airdropWalletAddress: airdropWalletAddress,
      airdropNetwork: airdropNetwork,
    };
  };

  // 存储后端返回的分页信息
  const [paginationInfo, setPaginationInfo] = useState<{
    total: number;
    totalPages: number;
  }>({ total: 0, totalPages: 0 });

  // 从后端加载活动记录
  const loadActivities = useCallback(async () => {
    setIsLoadingActivities(true);
    try {
      console.log('[AIOPage] loadActivities: 开始加载，当前页:', currentPage, '钱包地址:', walletAddress);
      
      // 根据是否有钱包地址选择不同的查询接口
      let result;
      if (walletAddress) {
        // 连接了钱包：使用按钱包地址分页查询
        result = await getRecordsByWalletPaginated(walletAddress, currentPage, itemsPerPage);
      } else {
        // 未连接钱包：使用普通分页查询
        result = await getRecordsPaginated(currentPage, itemsPerPage);
      }
      
      console.log('[AIOPage] loadActivities: 后端返回结果:', {
        hasResult: !!result,
        recordsCount: result?.records?.length || 0,
        total: result?.total || 0,
        page: result?.page || 0,
        totalPages: result?.totalPages || 0,
      });
      
      if (result) {
        // 保存分页信息
        setPaginationInfo({
          total: result.total || 0,
          totalPages: result.totalPages || 0,
        });
        
        if (result.records && result.records.length > 0) {
          // 转换后端记录为前端活动格式
          const convertedActivities = result.records.map(convertRecordToActivity);
          console.log('[AIOPage] loadActivities: 转换后的活动:', convertedActivities.length, '条');
          setActivities(convertedActivities);
        } else {
          // 如果查询不到数据，设置为空数组
          console.log('[AIOPage] loadActivities: 没有查询到数据');
          setActivities([]);
        }
      } else {
        // 如果查询失败，设置为空数组
        console.log('[AIOPage] loadActivities: 查询失败');
        setActivities([]);
        setPaginationInfo({ total: 0, totalPages: 0 });
      }
    } catch (error) {
      console.error("[AIOPage] loadActivities: 加载活动记录失败:", error);
      // 出错时设置为空数组
      setActivities([]);
      setPaginationInfo({ total: 0, totalPages: 0 });
    } finally {
      setIsLoadingActivities(false);
    }
  }, [currentPage, itemsPerPage, getRecordsPaginated, getRecordsByWalletPaginated, walletAddress]);

  // 当页面变化时重新加载数据
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // 当钱包地址变化时，重置到第一页并重新加载数据
  useEffect(() => {
    setCurrentPage(1); // 重置到第一页
    loadActivities();
  }, [walletAddress, loadActivities]);

  // 检查是否有pending记录，控制voice command显示
  // 同时验证pending记录的walletAddress是否与当前walletAddress一致
  const checkPendingRecord = useCallback(async () => {
    if (!walletAddress) {
      setHasPendingRecord(false);
      setPendingRecord(null);
      return;
    }

    try {
      const pending = await getPendingRecordByWallet(walletAddress);
      if (pending) {
        // 验证pending记录的walletAddress是否与当前walletAddress一致（不区分大小写）
        const pendingWalletAddress = pending.walletAddress?.toLowerCase() || "";
        const currentWalletAddress = walletAddress.toLowerCase();
        
        if (pendingWalletAddress === currentWalletAddress) {
          console.log('[AIOPage] 检测到pending记录且walletAddress匹配:', pending);
          setPendingRecord(convertRecordToActivity(pending));
          setHasPendingRecord(true);
        } else {
          console.warn('[AIOPage] pending记录的walletAddress不匹配:', {
            pendingWallet: pending.walletAddress,
            currentWallet: walletAddress
          });
          // walletAddress不匹配，清除pending状态
          setHasPendingRecord(false);
          setPendingRecord(null);
          toast({
            title: "Wallet Address Mismatch",
            description: "Pending record belongs to a different wallet. Please reconnect with the correct wallet.",
            variant: "destructive",
          });
        }
      } else {
        console.log('[AIOPage] 没有pending记录');
        setHasPendingRecord(false);
        setPendingRecord(null);
      }
    } catch (error) {
      console.error('[AIOPage] 检查pending记录异常:', error);
      setHasPendingRecord(false);
      setPendingRecord(null);
    }
  }, [walletAddress, getPendingRecordByWallet, toast]);

  useEffect(() => {
    checkPendingRecord();
    // 定期检查pending记录（每5秒检查一次）
    const intervalId = setInterval(checkPendingRecord, 5000);
    return () => clearInterval(intervalId);
  }, [checkPendingRecord]);

  // 检查待claim资金汇总（按钱包地址过滤）
  const checkPendingClaimSummary = useCallback(async () => {
    if (!walletAddress) {
      setPendingClaimSummary(null);
      return;
    }

    try {
      // 获取所有记录，找出当前钱包地址下 status 为 "completed" 的记录
      // 由于后端 getPendingClaimSummary 返回的是所有待 claim 的汇总，我们需要按钱包地址过滤
      let allCompletedRecords: Activity[] = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore) {
        const result = await getRecordsByWalletPaginated(walletAddress, page, itemsPerPage);
        if (result && result.records && result.records.length > 0) {
          const converted = result.records
            .map(convertRecordToActivity)
            .filter(activity => activity.status === "completed");
          allCompletedRecords = allCompletedRecords.concat(converted);
          
          if (page >= result.totalPages) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      }
      
      // 计算汇总
      if (allCompletedRecords.length > 0) {
        const totalAioRewards = allCompletedRecords.reduce((sum, record) => sum + record.aioRewards, 0);
        const totalPmugAirdrop = allCompletedRecords.reduce((sum, record) => sum + record.pmugAirdrop, 0);
        setPendingClaimSummary({
          totalAioRewards,
          totalPmugAirdrop,
          pendingCount: allCompletedRecords.length,
        });
      } else {
        setPendingClaimSummary(null);
      }
    } catch (error) {
      console.error('[AIOPage] 检查待claim资金汇总异常:', error);
      setPendingClaimSummary(null);
    }
  }, [walletAddress, getRecordsByWalletPaginated, itemsPerPage]);

  useEffect(() => {
    checkPendingClaimSummary();
    // 定期检查待claim资金汇总（每5秒检查一次）
    const intervalId = setInterval(checkPendingClaimSummary, 5000);
    return () => clearInterval(intervalId);
  }, [checkPendingClaimSummary]);

  // 绘制 Canvas 真实马克杯
  useEffect(() => {
    if (!coffeeCupDialogOpen) return;
    
    // 使用 setTimeout 确保 DOM 已渲染
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 设置 canvas 内部尺寸（高分辨率）
          const scale = 3;
          const baseWidth = 240;
          const baseHeight = 280;
          canvas.width = baseWidth * scale;
          canvas.height = baseHeight * scale;
          
          // 设置 canvas 显示尺寸
          canvas.style.width = `${baseWidth * 2}px`;
          canvas.style.height = `${baseHeight * 2}px`;
          
          // 缩放上下文以匹配内部尺寸
          ctx.scale(scale, scale);
          
          // 启用平滑渲染（真实线条）
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // 清除画布
          ctx.clearRect(0, 0, baseWidth, baseHeight);
          
          // 绘制杯身主体 - 平滑锥形，上宽下窄，匹配图片形态
          const cupX = 40;
          const cupY = 30;
          const cupTopWidth = 120;  // 顶部宽度
          const cupBottomWidth = 90;  // 底部宽度（更窄，锥形更明显）
          const cupHeight = 160;
          const cupRadius = 15;  // 适中的圆角，更自然
          
          // 计算梯形四个角的坐标
          const topLeftX = cupX;
          const topRightX = cupX + cupTopWidth;
          const bottomLeftX = cupX + (cupTopWidth - cupBottomWidth) / 2;
          const bottomRightX = bottomLeftX + cupBottomWidth;
          
          // 杯身路径（平滑锥形，使用贝塞尔曲线让边缘更自然）
          ctx.beginPath();
          // 顶部（左上角到右上角）- 平滑曲线
          ctx.moveTo(topLeftX + cupRadius, cupY);
          ctx.lineTo(topRightX - cupRadius, cupY);
          ctx.quadraticCurveTo(topRightX, cupY, topRightX, cupY + cupRadius);
          // 右侧边（上到下）- 使用贝塞尔曲线创建平滑的锥形
          ctx.bezierCurveTo(
            topRightX, cupY + cupHeight * 0.3,
            bottomRightX + 5, cupY + cupHeight * 0.7,
            bottomRightX, cupY + cupHeight - cupRadius
          );
          ctx.quadraticCurveTo(bottomRightX, cupY + cupHeight, bottomRightX - cupRadius, cupY + cupHeight);
          // 底部（右下角到左下角）
          ctx.lineTo(bottomLeftX + cupRadius, cupY + cupHeight);
          ctx.quadraticCurveTo(bottomLeftX, cupY + cupHeight, bottomLeftX, cupY + cupHeight - cupRadius);
          // 左侧边（下到上）- 使用贝塞尔曲线创建平滑的锥形
          ctx.bezierCurveTo(
            bottomLeftX, cupY + cupHeight * 0.7,
            topLeftX - 5, cupY + cupHeight * 0.3,
            topLeftX, cupY + cupRadius
          );
          ctx.quadraticCurveTo(topLeftX, cupY, topLeftX + cupRadius, cupY);
          ctx.closePath();
          
          // 填充杯身 - 左侧亮（光源），右侧暗（阴影），匹配图片
          const gradient = ctx.createLinearGradient(cupX, cupY, cupX + cupTopWidth, cupY);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');  // 左侧最亮
          gradient.addColorStop(0.3, 'rgba(250, 250, 250, 0.98)');
          gradient.addColorStop(0.7, 'rgba(240, 240, 240, 0.95)');
          gradient.addColorStop(1, 'rgba(235, 235, 235, 0.92)');  // 右侧较暗
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // 绘制杯身边框 - 黑色边框
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
          ctx.lineWidth = 3;
          ctx.stroke();
          
          // 绘制杯口边缘 - 较厚的顶部边缘，匹配图片
          ctx.beginPath();
          ctx.moveTo(topLeftX + cupRadius, cupY);
          ctx.lineTo(topRightX - cupRadius, cupY);
          ctx.quadraticCurveTo(topRightX, cupY, topRightX, cupY + cupRadius);
          ctx.lineTo(topLeftX, cupY + cupRadius);
          ctx.quadraticCurveTo(topLeftX, cupY, topLeftX + cupRadius, cupY);
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
          ctx.lineWidth = 4;  // 顶部边缘更厚
          ctx.stroke();
          
          // 绘制杯口内部阴影线（形成立体感）
          ctx.beginPath();
          ctx.moveTo(topLeftX + cupRadius + 3, cupY + 3);
          ctx.lineTo(topRightX - cupRadius - 3, cupY + 3);
          ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // 绘制杯底 - 椭圆形，深棕色，匹配图片
          const baseY = cupY + cupHeight;
          const baseEllipseWidth = cupBottomWidth + 15;  // 稍微更宽
          const baseEllipseHeight = 20;  // 适中的高度
          
          ctx.beginPath();
          ctx.ellipse(cupX + cupTopWidth / 2, baseY + baseEllipseHeight / 2, baseEllipseWidth / 2, baseEllipseHeight / 2, 0, 0, 2 * Math.PI);
          // 添加渐变让底座更立体
          const baseGradient = ctx.createRadialGradient(
            cupX + cupTopWidth / 2, baseY + baseEllipseHeight / 2, 0,
            cupX + cupTopWidth / 2, baseY + baseEllipseHeight / 2, baseEllipseWidth / 2
          );
          baseGradient.addColorStop(0, 'rgba(120, 80, 40, 0.95)');
          baseGradient.addColorStop(1, 'rgba(101, 67, 33, 0.95)');
          ctx.fillStyle = baseGradient;
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
          ctx.lineWidth = 5;  // 更粗的边框
          ctx.stroke();
          
          // 绘制把手 - C形，白色，从杯体边缘自然延伸
          // 把手连接点：从杯体右侧边缘延伸出来
          const handleTopY = cupY + 50;  // 把手上部连接点
          const handleBottomY = cupY + 110;  // 把手下部连接点
          const handleOuterX = cupX + cupTopWidth + 28;  // 把手最外侧位置
          const handleInnerX = cupX + cupTopWidth - 3;  // 把手内凹位置（接近杯体）
          
          ctx.beginPath();
          // 从杯体右侧开始（上部连接点）
          ctx.moveTo(topRightX, handleTopY);
          // 把手外弧（上部）- 平滑向外弯曲
          ctx.quadraticCurveTo(
            topRightX + 12, handleTopY - 6,
            handleOuterX, handleTopY
          );
          // 把手右侧（向下）- 平滑曲线
          ctx.bezierCurveTo(
            handleOuterX + 2, handleTopY + (handleBottomY - handleTopY) * 0.2,
            handleOuterX + 2, handleTopY + (handleBottomY - handleTopY) * 0.8,
            handleOuterX, handleBottomY
          );
          // 把手外弧（下部）- 平滑向内弯曲回到杯体
          ctx.quadraticCurveTo(
            topRightX + 12, handleBottomY + 6,
            topRightX, handleBottomY
          );
          // 把手内凹（左侧，回到杯体）- 平滑内凹曲线
          ctx.bezierCurveTo(
            handleInnerX, handleBottomY - (handleBottomY - handleTopY) * 0.15,
            handleInnerX, handleTopY + (handleBottomY - handleTopY) * 0.15,
            topRightX, handleTopY
          );
          ctx.closePath();
          
          // 把手填充 - 白色，内部有阴影（匹配图片）
          const handleGradient = ctx.createLinearGradient(topRightX, handleTopY, handleOuterX, handleTopY);
          handleGradient.addColorStop(0, 'rgba(240, 240, 240, 0.95)');  // 内部（靠近杯体）较暗
          handleGradient.addColorStop(0.5, 'rgba(250, 250, 250, 0.98)');
          handleGradient.addColorStop(1, 'rgba(255, 255, 255, 1)');  // 外部较亮
          ctx.fillStyle = handleGradient;
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [coffeeCupDialogOpen]);

  // Set global Interaction address - 只在地址变化时更新
  // 注意：useContract hook 会在初始化时自动获取合约，无需手动调用
  useEffect(() => {
    if (INTERACTION_ADDRESS) {
      setInteractionAddress(INTERACTION_ADDRESS);
    }
  }, [INTERACTION_ADDRESS]);

  // Listen for account changes (user disconnects or switches accounts)
  useEffect(() => {
    if (window.ethereum) {
      // 检查当前是否已有连接的账户（可能是通过 WalletButton 连接的）
      const checkCurrentAccounts = async () => {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts && accounts.length > 0) {
            // 如果检测到有账户，同步状态（无论之前是否有 walletAddress）
            // 这样可以响应通过 WalletButton 或其他方式连接的钱包
            if (accounts[0] !== walletAddress) {
              console.log("[AIOPage] 检测到钱包连接（可能通过 WalletButton）:", accounts[0].slice(0, 6) + "...");
              setWalletAddress(accounts[0]);
            }
          } else if (walletAddress) {
            // 如果之前有账户但现在没有了，清除状态
            console.log("[AIOPage] 检测到钱包断开连接");
            setWalletAddress(null);
          }
        } catch (error) {
          // 静默处理错误，避免频繁输出警告
        }
      };

      // 初始检查
      checkCurrentAccounts();

      // 定期检查账户状态（每2秒检查一次，确保能检测到通过 WalletButton 的连接）
      const intervalId = setInterval(checkCurrentAccounts, 2000);

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected - clear connection state
          setWalletAddress(null);
        } else {
          // 无论之前是否有 walletAddress，都更新为新账户
          // 这样可以响应通过 WalletButton 或其他方式连接的钱包
          setWalletAddress(accounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        clearInterval(intervalId);
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, [walletAddress]);

  // Load fee configuration - 只在 INTERACTION_ADDRESS 或 walletAddress 变化时加载
  // 在 local 模式下，使用 mock fee
  useEffect(() => {
    const loadFee = async () => {
      // In local mode, use mock fee
      if (MODE === 'local') {
        setFeeWei(BigInt(1000000000000000)); // 0.001 ETH in wei (mock)
        return;
      }

      // 检查地址是否有效（不是零地址或空）
      const isValidAddress = INTERACTION_ADDRESS && 
        INTERACTION_ADDRESS !== "0x0000000000000000000000000000000000000000" &&
        INTERACTION_ADDRESS.trim() !== "";
      
      if (!isValidAddress || typeof window.ethereum === "undefined") {
        setFeeWei(null);
        return;
      }

      try {
        const provider = new BrowserProvider(window.ethereum);
        const config = await getConfig(provider, INTERACTION_ADDRESS);
        setFeeWei(config.feeWei);
      } catch (error) {
        console.error("Failed to load fee configuration:", error);
        setFeeWei(null);
      }
    };

    loadFee();
  }, [INTERACTION_ADDRESS, walletAddress, MODE]);

  // Handle wallet connection - open dialog instead of directly connecting
  const handleConnectWallet = () => {
    setWalletDialogOpen(true);
  };

  // Handle wallet connection success callback
  const handleWalletConnected = useCallback((address: string, provider: "metamask" | "phantom") => {
    console.log("[AIOPage] Wallet connected:", { address, provider });
    
    // Only handle MetaMask for now (since AIOPage is for Ethereum/Base network)
    if (provider === "metamask") {
      setWalletAddress(address);
      toast({
        title: "Wallet Connected",
        description: `Connected to: ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      // 连接钱包后重置到第一页并重新加载活动记录
      setCurrentPage(1);
      // 使用 setTimeout 确保状态更新后再加载
      setTimeout(async () => {
        await loadActivities();
      }, 100);
    } else {
      // Phantom wallet is for Solana, not supported in AIOPage
      toast({
        title: "Unsupported Wallet",
        description: "This page requires an Ethereum wallet (MetaMask). Please connect MetaMask.",
        variant: "destructive",
      });
    }
  }, [toast, loadActivities]);

  const handlePayment = async () => {
    // Check if wallet is connected (always required, even in local mode)
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "Wallet Not Installed",
        description: "Please install MetaMask or another Ethereum wallet",
        variant: "destructive",
      });
      return;
    }

    // Check if account is connected
    let accounts: string[];
    try {
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error: any) {
      toast({
        title: "Wallet Connection Failed",
        description: error.message || "Please authorize wallet connection",
        variant: "destructive",
      });
      return;
    }

    if (!accounts || accounts.length === 0) {
      toast({
        title: "No Account Connected",
        description: "Please connect your wallet account",
        variant: "destructive",
      });
      return;
    }

    const account = accounts[0];
    
    // 验证：如果有 pendingRecord，检查 walletAddress 是否匹配
    if (pendingRecord) {
      const pendingWalletAddress = pendingRecord.walletAddress?.toLowerCase() || "";
      const currentAccount = account.toLowerCase();
      
      if (pendingWalletAddress !== currentAccount) {
        toast({
          title: "Wallet Address Mismatch",
          description: `Payment cannot proceed: pending record belongs to a different wallet (${pendingRecord.walletAddress?.slice(0, 6)}...${pendingRecord.walletAddress?.slice(-4)}). Please reconnect with the correct wallet or clear the pending record.`,
          variant: "destructive",
        });
        return;
      }
    }
    
    setWalletAddress(account);

    // In local mode, skip contract check and mock the result
    if (MODE === 'local') {
      setPaymentStatus("processing");
      setTxHash(null);

      toast({
        title: "Processing Payment (Local Mode)",
        description: "Mocking transaction...",
      });

      // Simulate payment processing
      setTimeout(async () => {
        const mockTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}` as `0x${string}`;
        setTxHash(mockTxHash);
        setPaymentStatus("success");
        toast({
          title: "Payment Successful! (Mock)",
          description: `Mock transaction hash: ${mockTxHash.slice(0, 10)}...`,
        });
        
        // 支付成功后创建pending状态的记录
        try {
          const timestamp = new Date().toLocaleString();
          const pendingRecord = await createRecord(
            account,
            timestamp,
            "", // prompt为空，等待用户输入
            0, // rewards由后端计算
            0, // airdrop由后端计算
            "pending" // 创建为pending状态
          );
          
          if (pendingRecord) {
            console.log('[AIOPage] 支付成功后创建pending记录:', pendingRecord);
            setPendingRecord(convertRecordToActivity(pendingRecord));
            setHasPendingRecord(true);
            // 重置到第一页并刷新活动列表以显示新创建的pending记录
            setCurrentPage(1);
            setTimeout(async () => {
              await loadActivities();
            }, 500);
          } else {
            console.warn('[AIOPage] 创建pending记录失败');
          }
        } catch (error) {
          console.error('[AIOPage] 创建pending记录异常:', error);
        }
      }, 1000);
      return;
    }

    // Production mode: check contract address configuration
    if (!INTERACTION_ADDRESS) {
      toast({
        title: "Configuration Error",
        description: "Interaction contract address is not configured",
        variant: "destructive",
      });
      return;
    }

    setPaymentStatus("processing");
    setTxHash(null);

    toast({
      title: "Processing Payment",
      description: "Please confirm the transaction in your wallet...",
    });

    try {
      // Create ethers provider and signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Get latest fee configuration
      const config = await getConfig(provider, INTERACTION_ADDRESS);
      const requiredFee = config.feeWei;

      // Execute interaction contract call
      const hash = await interact(
        signer,
        "participate_voice_ai", // action
        encodeMeta({
          timestamp: Date.now(),
          feature: "voice_ai",
        }),
        requiredFee,
        {
          interactionAddress: INTERACTION_ADDRESS,
          account: account as Address,
        }
      );

      setTxHash(hash);
      setPaymentStatus("success");
      toast({
        title: "Payment Successful!",
        description: `Transaction hash: ${hash.slice(0, 10)}...`,
      });
      
      // 支付成功后创建pending状态的记录
      try {
        const timestamp = new Date().toLocaleString();
        const pendingRecord = await createRecord(
          account,
          timestamp,
          "", // prompt为空，等待用户输入
          0, // rewards由后端计算
          0, // airdrop由后端计算
          "pending" // 创建为pending状态
        );
        
        if (pendingRecord) {
          console.log('[AIOPage] 支付成功后创建pending记录:', pendingRecord);
          setPendingRecord(convertRecordToActivity(pendingRecord));
          setHasPendingRecord(true);
          // 重置到第一页并刷新活动列表以显示新创建的pending记录
          setCurrentPage(1);
          setTimeout(async () => {
            await loadActivities();
          }, 500);
        } else {
          console.warn('[AIOPage] 创建pending记录失败');
        }
      } catch (error) {
        console.error('[AIOPage] 创建pending记录异常:', error);
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      setPaymentStatus("idle");
      
      let errorMessage = "Payment failed";
      if (error.message) {
        if (error.message.includes("insufficient") || error.message.includes("insufficient fee")) {
          errorMessage = "Insufficient fee: Please ensure you have enough ETH";
        } else if (error.message.includes("user rejected") || error.message.includes("User denied")) {
          errorMessage = "User cancelled the transaction";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleVoiceRecord = async () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Speak your command...",
    });

    // Simulate voice recording and transcription
    setTimeout(() => {
      setIsRecording(false);
      setPrompt("Turn on the bedroom light");
      toast({
        title: "Voice Recognized",
        description: "Your command has been transcribed!",
      });
    }, 3000);
  };

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    // 检查是否有pending记录
    if (!pendingRecord) {
      toast({
        title: "No Pending Record",
        description: "Please complete payment first to create a pending record",
        variant: "destructive",
      });
      return;
    }

    // 检查pending记录的walletAddress是否与当前walletAddress一致（不区分大小写）
    const pendingWalletAddress = pendingRecord.walletAddress?.toLowerCase() || "";
    const currentWalletAddress = walletAddress.toLowerCase();
    
    if (pendingWalletAddress !== currentWalletAddress) {
      toast({
        title: "Wallet Address Mismatch",
        description: `Pending record belongs to a different wallet. Please reconnect with the correct wallet (${pendingRecord.walletAddress?.slice(0, 6)}...${pendingRecord.walletAddress?.slice(-4)})`,
        variant: "destructive",
      });
      // 清除不匹配的pending记录状态
      setPendingRecord(null);
      setHasPendingRecord(false);
      return;
    }

    const timestamp = new Date().toLocaleString();
    
    // 隐藏 Voice Command，显示进度
    setShowProgress(true);
    setProgress(0);
    setActivatedDevices(0);
    setCurrentRegion(null);
    
    toast({
      title: "Command Sent!",
      description: "Activating devices worldwide...",
    });

    // 从后端获取设备激活数据（每次调用都会生成新的随机数）
    let regions: Array<{ name: string; devices: number; delay: number }> = [];
    let totalDevices = 0;
    
    try {
      const activationData = await getDeviceActivationData();
      if (activationData && activationData.length > 0) {
        // 将后端返回的数据转换为前端格式（处理 BigInt 类型）
        regions = activationData.map(region => ({
          name: region.name,
          devices: typeof region.devices === 'bigint' ? Number(region.devices) : region.devices,
          delay: typeof region.delay === 'bigint' ? Number(region.delay) : region.delay,
        }));
        totalDevices = regions.reduce((sum, region) => sum + region.devices, 0);
      } else {
        // 如果后端调用失败，使用默认值
        console.warn('[AIOPage] 获取设备激活数据失败，使用默认值');
        regions = [
          { name: "North America", devices: 800, delay: 0 },
          { name: "Europe", devices: 600, delay: 1000 },
          { name: "Asia Pacific", devices: 1500, delay: 2000 },
          { name: "South America", devices: 400, delay: 3000 },
          { name: "Africa", devices: 250, delay: 4000 },
          { name: "Middle East", devices: 200, delay: 5000 },
        ];
        totalDevices = regions.reduce((sum, region) => sum + region.devices, 0);
      }
    } catch (error) {
      console.error('[AIOPage] 获取设备激活数据异常:', error);
      // 使用默认值
      regions = [
        { name: "North America", devices: 800, delay: 0 },
        { name: "Europe", devices: 600, delay: 1000 },
        { name: "Asia Pacific", devices: 1500, delay: 2000 },
        { name: "South America", devices: 400, delay: 3000 },
        { name: "Africa", devices: 250, delay: 4000 },
        { name: "Middle East", devices: 200, delay: 5000 },
      ];
      totalDevices = regions.reduce((sum, region) => sum + region.devices, 0);
    }

    // 逐步激活各个区域
    regions.forEach((region, index) => {
      setTimeout(() => {
        setCurrentRegion(region.name);
        setActivatedDevices(prev => prev + region.devices);
        const newProgress = ((index + 1) / regions.length) * 100;
        setProgress(newProgress);
      }, region.delay);
    });

    // 进度完成后，重置状态并打开咖啡杯弹窗
    setTimeout(() => {
      setShowProgress(false);
      setProgress(0);
      setActivatedDevices(0);
      setCurrentRegion(null);
      // 保存prompt文本并打开咖啡杯弹窗
      setDisplayPrompt(prompt);
      setCoffeeCupDialogOpen(true);
      // 重置支付状态，允许再次支付
      setPaymentStatus("idle");
      setTxHash(null);
      toast({
        title: "Devices Activated!",
        description: `Successfully activated ${totalDevices.toLocaleString()} devices worldwide!`,
      });
    }, regions[regions.length - 1].delay + 2000);

    // 更新pending记录为completed状态（在后台进行，不影响进度展示）
    try {
      // 再次验证：在更新前核对 walletAddress
      const pendingWalletAddress = pendingRecord.walletAddress?.toLowerCase() || "";
      const currentWalletAddress = walletAddress.toLowerCase();
      
      if (pendingWalletAddress !== currentWalletAddress) {
        console.error('[AIOPage] 更新记录前 walletAddress 不匹配:', {
          pendingWallet: pendingRecord.walletAddress,
          currentWallet: walletAddress
        });
        toast({
          title: "Wallet Address Mismatch",
          description: "Cannot update record: wallet address mismatch. Please reconnect with the correct wallet.",
          variant: "destructive",
        });
        setPendingRecord(null);
        setHasPendingRecord(false);
        return;
      }
      
      console.log('[AIOPage] 准备更新pending记录为completed:', {
        recordId: pendingRecord.id,
        walletAddress,
        timestamp,
        prompt,
      });
      
      // 更新pending记录：添加prompt，更新timestamp，状态改为completed
      // 同时传入walletAddress用于后端验证，防止重入攻击
      const updatedRecord = await updateRecord(
        pendingRecord.id,
        {
          walletAddress: walletAddress, // 传入walletAddress用于后端验证
          prompt: prompt,
          timestamp: timestamp,
          status: "completed"
        }
      );

      if (updatedRecord) {
        console.log('[AIOPage] 记录更新成功:', updatedRecord);
        // 清除pending记录状态
        setPendingRecord(null);
        setHasPendingRecord(false);
        // 成功后重置到第一页并重新加载数据
        setCurrentPage(1);
        // 等待一秒钟确保后端数据已保存，然后重新加载
        setTimeout(async () => {
          await loadActivities();
        }, 500);
      } else {
        console.warn("[AIOPage] 后端更新记录失败。可能原因：1) 权限不足 2) 数据验证失败 3) 后端服务不可用 4) 记录不存在或已被修改");
        toast({
          title: "Update Failed",
          description: "Failed to update record. Please try again or reconnect your wallet.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("[AIOPage] 更新记录异常:", {
        error,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      toast({
        title: "Update Error",
        description: error instanceof Error ? error.message : "Failed to update record",
        variant: "destructive",
      });
    }

    setPrompt("");
  };

  // 处理 Claim AIO
  const handleClaim = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!pendingClaimSummary || pendingClaimSummary.totalAioRewards <= 0) {
      toast({
        title: "No Rewards to Claim",
        description: "There are no rewards available to claim",
        variant: "destructive",
      });
      return;
    }

    // Check if wallet is connected (always required, even in local mode)
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "Wallet Not Installed",
        description: "Please install MetaMask or another Ethereum wallet",
        variant: "destructive",
      });
      return;
    }

    // Check if account is connected
    let accounts: string[];
    try {
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error: any) {
      toast({
        title: "Wallet Connection Failed",
        description: error.message || "Please authorize wallet connection",
        variant: "destructive",
      });
      return;
    }

    if (!accounts || accounts.length === 0) {
      toast({
        title: "No Account Connected",
        description: "Please connect your wallet account",
        variant: "destructive",
      });
      return;
    }

    const account = accounts[0];
    
    // 验证账户地址是否匹配
    if (account.toLowerCase() !== walletAddress.toLowerCase()) {
      toast({
        title: "Wallet Address Mismatch",
        description: "Please use the correct wallet address",
        variant: "destructive",
      });
      return;
    }

    setIsClaiming(true);
    setClaimTxHash(null);

    // In local mode, skip contract check and mock the result
    if (MODE === 'local') {
      toast({
        title: "Processing Claim (Local Mode)",
        description: "Mocking claim transaction...",
      });

      // Simulate claim processing
      setTimeout(async () => {
        const mockTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}` as `0x${string}`;
        setClaimTxHash(mockTxHash);
        
        toast({
          title: "Claim Successful! (Mock)",
          description: `Mock transaction hash: ${mockTxHash.slice(0, 10)}...`,
        });
        
        // Claim 成功后，将所有 completed 状态的记录更新为 claimed 状态
        try {
          // 获取所有待 claim 的记录
          let allCompletedRecords: Activity[] = [];
          let page = 1;
          let hasMore = true;
          
          while (hasMore) {
            const result = await getRecordsByWalletPaginated(walletAddress, page, itemsPerPage);
            if (result && result.records && result.records.length > 0) {
              const converted = result.records
                .map(convertRecordToActivity)
                .filter(activity => activity.status === "completed");
              allCompletedRecords = allCompletedRecords.concat(converted);
              
              if (page >= result.totalPages) {
                hasMore = false;
              } else {
                page++;
              }
            } else {
              hasMore = false;
            }
          }
          
          // 批量更新所有 completed 记录为 claimed 状态
          let successCount = 0;
          for (const record of allCompletedRecords) {
            // 在更新前验证 walletAddress
            const recordWalletAddress = record.walletAddress?.toLowerCase() || "";
            const currentWalletAddress = walletAddress.toLowerCase();
            
            if (recordWalletAddress !== currentWalletAddress) {
              console.warn(`[AIOPage] 跳过更新记录 ${record.id}: walletAddress 不匹配`, {
                recordWallet: record.walletAddress,
                currentWallet: walletAddress
              });
              continue; // 跳过不匹配的记录
            }
            
            console.log(`[AIOPage] 准备更新记录 ${record.id} 为 claimed 状态`, {
              recordId: record.id,
              currentStatus: record.status,
              walletAddress: walletAddress,
              recordWalletAddress: record.walletAddress
            });
            
            const updatedRecord = await updateRecord(
              record.id,
              {
                walletAddress: walletAddress, // 传入walletAddress用于后端验证，防止重入攻击
                status: "claimed"
              }
            );
            
            if (updatedRecord) {
              console.log(`[AIOPage] 记录 ${record.id} 更新成功，新状态:`, updatedRecord.status);
              successCount++;
            } else {
              console.error(`[AIOPage] 记录 ${record.id} 更新失败`);
            }
          }
          
          console.log(`[AIOPage] Claim 成功，更新了 ${successCount}/${allCompletedRecords.length} 条记录`);
          
          // 刷新数据
          setPendingClaimSummary(null);
          setCurrentPage(1);
          setTimeout(async () => {
            await loadActivities();
            await checkPendingClaimSummary();
          }, 500);
        } catch (error) {
          console.error('[AIOPage] 更新记录状态异常:', error);
        }
        
        setIsClaiming(false);
      }, 1000);
      return;
    }

    // Production mode: check contract address configuration
    if (!INTERACTION_ADDRESS) {
      toast({
        title: "Configuration Error",
        description: "Interaction contract address is not configured",
        variant: "destructive",
      });
      setIsClaiming(false);
      return;
    }

    toast({
      title: "Processing Claim",
      description: "Please confirm the transaction in your wallet...",
    });

    try {
      // 获取所有待 claim 的记录
      let allCompletedRecords: Activity[] = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore) {
        const result = await getRecordsByWalletPaginated(walletAddress, page, itemsPerPage);
        if (result && result.records && result.records.length > 0) {
          const converted = result.records
            .map(convertRecordToActivity)
            .filter(activity => activity.status === "completed");
          allCompletedRecords = allCompletedRecords.concat(converted);
          
          if (page >= result.totalPages) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      }
      
      if (allCompletedRecords.length === 0) {
        toast({
          title: "No Records to Claim",
          description: "No completed records found to claim",
          variant: "destructive",
        });
        setIsClaiming(false);
        return;
      }

      // Create ethers provider and signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 批量 claim 所有记录
      // 注意：claimAIO 需要 action 和 timestamp，我们使用固定的 action 和从记录时间戳转换的 timestamp
      const action = "participate_voice_ai";
      let successCount = 0;
      let lastTxHash: `0x${string}` | null = null;

      for (const record of allCompletedRecords) {
        try {
          // 在执行 claim 前，验证 record 的 walletAddress 是否与当前 walletAddress 匹配
          const recordWalletAddress = record.walletAddress?.toLowerCase() || "";
          const currentWalletAddress = walletAddress.toLowerCase();
          
          if (recordWalletAddress !== currentWalletAddress) {
            console.warn(`[AIOPage] 跳过记录 ${record.id}: walletAddress 不匹配`, {
              recordWallet: record.walletAddress,
              currentWallet: walletAddress
            });
            continue; // 跳过不匹配的记录
          }
          
          // 将时间戳字符串转换为 block timestamp (秒)
          // 记录的时间戳格式: "2025/11/16 23:34:01"
          // 转换为标准格式: "2025-11-16 23:34:01" 然后解析
          const timestampStr = record.timestamp.replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3');
          const date = new Date(timestampStr);
          
          // 如果日期无效，使用当前时间作为后备
          let timestampSeconds: number;
          if (isNaN(date.getTime())) {
            console.warn(`[AIOPage] 无法解析时间戳 ${record.timestamp}，使用当前时间`);
            timestampSeconds = Math.floor(Date.now() / 1000);
          } else {
            timestampSeconds = Math.floor(date.getTime() / 1000);
          }
          
          // 调用 claimAIO
          const hash = await claimAIO(
            signer,
            action,
            BigInt(timestampSeconds),
            {
              interactionAddress: INTERACTION_ADDRESS,
              account: account as Address,
            }
          );
          
          lastTxHash = hash;
          successCount++;
          
          // 更新记录状态为 claimed（使用防重入策略）
          // 在更新前再次验证 walletAddress
          const recordWalletAddressForUpdate = record.walletAddress?.toLowerCase() || "";
          const currentWalletAddressForUpdate = walletAddress.toLowerCase();
          
          if (recordWalletAddressForUpdate !== currentWalletAddressForUpdate) {
            console.error(`[AIOPage] 记录 ${record.id} claim 成功但 walletAddress 不匹配，跳过更新`, {
              recordWallet: record.walletAddress,
              currentWallet: walletAddress
            });
            continue; // 跳过不匹配的记录
          }
          
          console.log(`[AIOPage] 准备更新记录 ${record.id} 为 claimed 状态`, {
            recordId: record.id,
            currentStatus: record.status,
            walletAddress: walletAddress,
            recordWalletAddress: record.walletAddress
          });
          
          const updatedRecord = await updateRecord(
            record.id,
            {
              walletAddress: walletAddress, // 传入walletAddress用于后端验证，防止重入攻击
              status: "claimed"
            }
          );
          
          if (updatedRecord) {
            console.log(`[AIOPage] 记录 ${record.id} 更新成功，新状态:`, updatedRecord.status);
          } else {
            console.error(`[AIOPage] 记录 ${record.id} claim 成功但更新状态失败`);
          }
        } catch (error: any) {
          console.error(`[AIOPage] Claim 记录 ${record.id} 失败:`, error);
          // 继续处理下一个记录
        }
      }

      if (successCount > 0) {
        setClaimTxHash(lastTxHash);
        toast({
          title: "Claim Successful!",
          description: `Successfully claimed ${successCount} record(s). Transaction hash: ${lastTxHash?.slice(0, 10)}...`,
        });
        
        // 刷新数据
        setPendingClaimSummary(null);
        setCurrentPage(1);
        setTimeout(async () => {
          await loadActivities();
          await checkPendingClaimSummary();
        }, 500);
      } else {
        toast({
          title: "Claim Failed",
          description: "Failed to claim any records. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Claim failed:", error);
      
      let errorMessage = "Claim failed";
      if (error.message) {
        if (error.message.includes("already claimed")) {
          errorMessage = "Reward has already been claimed";
        } else if (error.message.includes("user rejected") || error.message.includes("User denied")) {
          errorMessage = "User cancelled the transaction";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Claim Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsClaiming(false);
    }
  };

  // 处理添加空投钱包地址
  const handleAddAirdropWallet = (activity: Activity) => {
    setCurrentActivityForAirdrop(activity);
    // 如果已有地址，预填充输入框
    setAirdropWalletAddressInput(activity.airdropWalletAddress || "");
    setAirdropDialogOpen(true);
  };

  // 确认添加空投钱包地址
  const handleConfirmAirdropWallet = async () => {
    if (!currentActivityForAirdrop || !walletAddress) {
      toast({
        title: "Error",
        description: "Missing required information",
        variant: "destructive",
      });
      return;
    }

    if (!airdropWalletAddressInput.trim()) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid airdrop wallet address",
        variant: "destructive",
      });
      return;
    }

    try {
      const network = "Solana"; // 当前页面 network = 'Solana'
      const updatedRecord = await updateAirdropWalletAddress(
        currentActivityForAirdrop.id,
        walletAddress,
        airdropWalletAddressInput.trim(),
        network
      );

      if (updatedRecord) {
        toast({
          title: "Success",
          description: "Airdrop wallet address updated successfully",
        });
        setAirdropDialogOpen(false);
        setCurrentActivityForAirdrop(null);
        setAirdropWalletAddressInput("");
        // 刷新活动列表
        await loadActivities();
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update airdrop wallet address. Please check if the wallet address matches.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("[AIOPage] 更新空投钱包地址异常:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update airdrop wallet address",
        variant: "destructive",
      });
    }
  };

  // 注意：钱包地址过滤现在在后端完成，loadActivities 已经返回了过滤后的数据
  // 直接使用后端返回的数据，不需要再次过滤或分页
  const filteredActivities = useMemo(() => {
    return activities;
  }, [activities]);

  // 使用后端返回的分页信息
  const totalPages = paginationInfo.totalPages;
  const paginatedActivities = filteredActivities; // 后端已经返回了当前页的数据

  // 当过滤后的活动数量变化时，如果当前页超出范围，重置到第一页
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Scrolling Banner */}
        <div className="relative overflow-hidden rounded-2xl h-96 sm:h-128 lg:h-256">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] to-transparent" />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">
            Voice AI → IoT Device Control
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Mic className="w-8 h-8 text-indigo-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">1. Speak Command</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">2. AI Processes</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Zap className="w-8 h-8 text-cyan-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">3. AIO Network</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Check className="w-8 h-8 text-green-400 mb-2" />
              <div className="text-sm text-slate-300 text-center">4. Device Lights Up</div>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-200">Participate in Voice AI</h3>
              <p className="text-sm text-slate-400">Pay 0.001 ETH to unlock features</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/30">
              <div className="flex items-center gap-2 text-indigo-300">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {feeWei
                    ? `Fee: ${(Number(feeWei) / 1e18).toFixed(6)} ETH`
                    : "Loading fee..."}
                </span>
              </div>
            </div>

            {!walletAddress && (
              <>
                <div className="p-3 rounded-xl bg-yellow-600/10 border border-yellow-500/30">
                  <p className="text-sm text-yellow-300">
                    ⚠️ Please connect your wallet to continue
                  </p>
                </div>
                <button
                  onClick={handleConnectWallet}
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Link Wallet</span>
                </button>
              </>
            )}

            {walletAddress && (
              <>
                <div className="p-3 rounded-xl bg-green-600/10 border border-green-500/30">
                  <p className="text-sm text-green-300">
                    ✓ Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                </div>
                {paymentStatus === "idle" && !showProgress && (
                  <button
                    onClick={handlePayment}
                    className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all"
                  >
                    Pay & Unlock
                  </button>
                )}
              </>
            )}

            {paymentStatus === "processing" && (
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-yellow-600/10 border border-yellow-500/30">
                <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                <span className="text-yellow-300 font-medium">Processing payment...</span>
              </div>
            )}

            {paymentStatus === "success" && !showProgress && (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-600/10 border border-green-500/30">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-medium">Payment successful!</span>
                </div>
                {txHash && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-slate-400 mb-1">Transaction Hash:</p>
                    <p className="text-sm text-slate-300 font-mono break-all">{txHash}</p>
                    <a
                      href={`https://sepolia.basescan.org/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 inline-block"
                    >
                      View on BaseScan →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Prompt Input Card (shown when has pending record, hidden during progress) */}
        {hasPendingRecord && !showProgress && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-200 mb-4">Voice Command</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmitPrompt()}
                placeholder="Type your command or use voice..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleVoiceRecord}
                disabled={isRecording}
                className={`p-3 rounded-xl border transition-all ${
                  isRecording
                    ? "bg-red-500/20 border-red-500 animate-pulse"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Mic className={`w-5 h-5 ${isRecording ? "text-red-400" : "text-slate-400"}`} />
              </button>
              <button
                onClick={handleSubmitPrompt}
                disabled={!prompt.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Click the mic button to use ElevenLabs voice recognition
            </p>
          </div>
        )}

        {/* Progress Display (shown when command is sent) */}
        {showProgress && (
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 flex items-center justify-center animate-pulse">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-200">Activating Devices Worldwide</h3>
                <p className="text-sm text-slate-400">Spreading AI control across the globe...</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Global Activation Progress</span>
                <span className="text-sm font-bold text-indigo-400">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 transition-all duration-500 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Current Region */}
            {currentRegion && (
              <div className="mb-6 p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/30 animate-pulse">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-indigo-400 animate-spin" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Activating region</p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 tracking-wider uppercase font-mono drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
                      {currentRegion}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Device Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs text-slate-400">Devices Activated</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  {activatedDevices.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs text-slate-400">Network Status</span>
                </div>
                <p className="text-2xl font-bold text-cyan-400">Online</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-slate-400">Regions Covered</span>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {Math.floor((progress / 100) * 6)}
                </p>
              </div>
            </div>

            {/* World Map Visualization */}
            <div className="relative h-64 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 overflow-hidden">
              {/* Simplified world map representation with animated dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Animated dots representing devices being activated */}
                  {Array.from({ length: Math.min(Math.floor(activatedDevices / 50), 100) }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-indigo-400 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                  {/* Glowing effect using multiple gradients */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm text-slate-300 font-medium">
                  {currentRegion ? `Activating ${currentRegion}...` : "Preparing global network..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Claim Success Message */}
        {claimTxHash && (
          <div className="rounded-xl border border-green-500/30 bg-green-600/10 p-4">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <p className="text-green-300 font-medium">Claim Successful!</p>
                <p className="text-xs text-green-400 mt-1">Transaction Hash: {claimTxHash}</p>
                {MODE !== 'local' && (
                  <a
                    href={`https://sepolia.basescan.org/tx/${claimTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 inline-block"
                  >
                    View on BaseScan →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Activity Table */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-200">Confirmed Activity & Claim</h3>
            <div className="flex items-center gap-4">
              {/* Claim Button - 显示在红框位置 */}
              {pendingClaimSummary && pendingClaimSummary.totalAioRewards > 0 && walletAddress && (
                <button
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    isClaiming
                      ? "bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:brightness-110"
                  }`}
                >
                  {isClaiming ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Claiming...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Claim $AIO</span>
                    </>
                  )}
                </button>
              )}
              <div className="text-sm text-slate-400 flex items-center gap-2">
                {isLoadingActivities && (
                  <Clock className="w-4 h-4 animate-spin" />
                )}
                {walletAddress ? (
                  <span>Your Records ({paginationInfo.total} items)</span>
                ) : (
                  <span>All Records ({paginationInfo.total} items)</span>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left text-slate-400">
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Command</th>
                  <th className="px-6 py-3 font-medium text-right">$AIO Rewards</th>
                  <th className="px-6 py-3 font-medium text-right">$PMUG Airdrop</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Airdrop Wallet</th>
                  <th className="px-6 py-3 font-medium">Network</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedActivities.length > 0 ? (
                  paginatedActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                        {activity.timestamp}
                      </td>
                      <td className="px-6 py-4 text-slate-200">{activity.prompt}</td>
                      <td className="px-6 py-4 text-right font-mono text-indigo-400">
                        {activity.aioRewards} $AIO
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-purple-400">
                        {activity.pmugAirdrop} $PMUG
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
                            activity.status === "completed"
                              ? "bg-green-600/10 border-green-500/30 text-green-400"
                              : activity.status === "claimed"
                              ? "bg-blue-600/10 border-blue-500/30 text-blue-400"
                              : activity.status === "pending"
                              ? "bg-yellow-600/10 border-yellow-500/30 text-yellow-400"
                              : "bg-red-600/10 border-red-500/30 text-red-400"
                          }`}
                        >
                          {activity.status === "completed" && <Check className="w-3 h-3" />}
                          {activity.status === "claimed" && <Check className="w-3 h-3" />}
                          {activity.status === "pending" && <Clock className="w-3 h-3" />}
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {activity.airdropWalletAddress ? (
                          <span className="font-mono text-xs break-all">
                            {activity.airdropWalletAddress.slice(0, 8)}...{activity.airdropWalletAddress.slice(-6)}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {activity.airdropNetwork ? (
                          <span className="text-xs">{activity.airdropNetwork}</span>
                        ) : (
                          <span className="text-slate-500 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {walletAddress && (
                          <button
                            onClick={() => handleAddAirdropWallet(activity)}
                            className="px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:brightness-110 transition-all"
                          >
                            {activity.airdropWalletAddress ? "Update" : "Add"} Airdrop Wallet
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                      {walletAddress ? "You have no activity records" : "No activity records"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-white/10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {(() => {
                    const pages: (number | string)[] = [];
                    const showEllipsis = totalPages > 7;

                    if (!showEllipsis) {
                      // 如果总页数少于等于7，显示所有页码
                      for (let i = 1; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      // 显示第一页
                      pages.push(1);

                      if (currentPage <= 4) {
                        // 当前页在前4页，显示前5页
                        for (let i = 2; i <= 5; i++) {
                          pages.push(i);
                        }
                        pages.push("ellipsis-end");
                        pages.push(totalPages);
                      } else if (currentPage >= totalPages - 3) {
                        // 当前页在后4页，显示后5页
                        pages.push("ellipsis-start");
                        for (let i = totalPages - 4; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // 当前页在中间，显示当前页前后各2页
                        pages.push("ellipsis-start");
                        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                          pages.push(i);
                        }
                        pages.push("ellipsis-end");
                        pages.push(totalPages);
                      }
                    }

                    return pages.map((page, index) => {
                      if (typeof page === "string") {
                        return (
                          <PaginationItem key={`${page}-${index}`}>
                            <span className="px-2 text-slate-400">...</span>
                          </PaginationItem>
                        );
                      }
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    });
                  })()}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="mt-4 text-center text-sm text-slate-400">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>

        {/* Wallet Connection Dialog */}
        <WalletConnectionDialog
          open={walletDialogOpen}
          onOpenChange={setWalletDialogOpen}
          onConnected={handleWalletConnected}
        />

        {/* Coffee Cup Dialog */}
        <Dialog open={coffeeCupDialogOpen} onOpenChange={setCoffeeCupDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/10 text-slate-200 max-w-2xl p-0 overflow-hidden">
            <div className="relative w-full h-full">
              {/* PixelMug 标题 - 左上角 */}
              <div className="absolute top-4 left-4 z-50 pointer-events-none">
              <div 
                className="font-bold"
                style={{
                  fontSize: 'clamp(20px, 3vw, 32px)',
                  fontWeight: '900',
                  fontFamily: '"Courier New", monospace',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 25%, #1d4ed8 50%, #1e40af 75%, #1e3a8a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '2px',
                  lineHeight: '1.2',
                  animation: 'blink 1.5s ease-in-out infinite',
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
                }}
              >
                PixelMug
              </div>
            </div>
            <style>{`
              @keyframes scrollText {
                0% {
                  transform: translateX(calc(-50% + 100% + 50px));
                }
                100% {
                  transform: translateX(calc(-50% - 100% - 50px));
                }
              }
              @keyframes pulse {
                0%, 100% {
                  opacity: 0.3;
                }
                50% {
                  opacity: 0.6;
                }
              }
              @keyframes changeColor {
                0% {
                  filter: hue-rotate(0deg);
                }
                25% {
                  filter: hue-rotate(90deg);
                }
                50% {
                  filter: hue-rotate(180deg);
                }
                75% {
                  filter: hue-rotate(270deg);
                }
                100% {
                  filter: hue-rotate(360deg);
                }
              }
              @keyframes blink {
                0%, 50%, 100% {
                  opacity: 1;
                  filter: brightness(1) drop-shadow(0 0 10px rgba(59, 130, 246, 0.8));
                }
                25% {
                  opacity: 0.6;
                  filter: brightness(1.5) drop-shadow(0 0 20px rgba(59, 130, 246, 1));
                }
                75% {
                  opacity: 0.8;
                  filter: brightness(1.2) drop-shadow(0 0 15px rgba(59, 130, 246, 0.9));
                }
              }
            `}</style>
            <div className="relative w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-pink-900 via-purple-900 to-fuchsia-900">
              {/* Canvas 绘制的经典马克杯 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <canvas
                  ref={canvasRef}
                  className="relative"
                  style={{
                    imageRendering: 'pixelated',
                    display: 'block',
                  }}
                />
              </div>

              {/* 网格化显示区域（杯身） - 精确匹配Canvas杯身位置，梯形形状，卡通风格大圆角，严格限制在杯身内 */}
              <div className="absolute top-[30px] left-1/2 w-[240px] h-[320px] overflow-hidden" style={{ 
                transform: 'translateX(-50%) scale(2)',
                transformOrigin: 'center center',
                clipPath: 'polygon(0% 0%, 100% 0%, 87.5% 100%, 12.5% 100%)',  // 梯形：上宽下窄，匹配新的杯体比例（顶部120，底部90）
                borderRadius: '20px',  // 匹配Canvas的大圆角，更卡通
              }}>
                {/* 透明网格背景 */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.08) 20px, rgba(255,255,255,0.08) 21px),
                      repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.08) 20px, rgba(255,255,255,0.08) 21px)
                    `,
                    backgroundSize: '20px 20px, 20px 20px',
                  }}
                />
                
                {/* 文本滚动区域 - 像素化多色字体，带边缘弯折消失效果，严格限制在杯身内 */}
                <div className="absolute inset-0 flex items-center justify-center z-10" style={{
                  overflow: 'hidden',
                  clipPath: 'polygon(0% 0%, 100% 0%, 87.5% 100%, 12.5% 100%)',  // 梯形裁剪，严格限制，匹配新的杯体比例
                  borderRadius: '20px',  // 匹配Canvas的大圆角，更卡通
                  // 使用更严格的渐变创建边缘立即消失效果，确保文字不超出杯体
                  maskImage: `
                    linear-gradient(to right, 
                      transparent 0%, 
                      transparent 1%, 
                      rgba(0,0,0,0.7) 2%, 
                      black 4%, 
                      black 96%, 
                      rgba(0,0,0,0.7) 98%, 
                      transparent 99%, 
                      transparent 100%
                    ),
                    linear-gradient(to bottom, 
                      transparent 0%, 
                      transparent 0.5%, 
                      rgba(0,0,0,0.7) 1.5%, 
                      black 2.5%, 
                      black 97.5%, 
                      rgba(0,0,0,0.7) 98.5%, 
                      transparent 99.5%, 
                      transparent 100%
                    )
                  `,
                  WebkitMaskImage: `
                    linear-gradient(to right, 
                      transparent 0%, 
                      transparent 1%, 
                      rgba(0,0,0,0.7) 2%, 
                      black 4%, 
                      black 96%, 
                      rgba(0,0,0,0.7) 98%, 
                      transparent 99%, 
                      transparent 100%
                    ),
                    linear-gradient(to bottom, 
                      transparent 0%, 
                      transparent 0.5%, 
                      rgba(0,0,0,0.7) 1.5%, 
                      black 2.5%, 
                      black 97.5%, 
                      rgba(0,0,0,0.7) 98.5%, 
                      transparent 99.5%, 
                      transparent 100%
                    )
                  `,
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}>
                  <div className="relative w-full h-full overflow-hidden" style={{
                    borderRadius: '20px',  // 匹配卡通风格的大圆角
                    clipPath: 'polygon(0% 0%, 100% 0%, 87.5% 100%, 12.5% 100%)',  // 双重保险：再次应用梯形裁剪，匹配新的杯体比例
                  }}>
                    <div
                      className="absolute top-[55%] left-1/2 text-center whitespace-nowrap"
                      style={{
                        fontSize: 'clamp(32px, 5vw, 64px)',
                        animation: 'scrollText 8s linear infinite, changeColor 8s linear infinite',
                        fontWeight: '900',
                        letterSpacing: '1px',  // 更紧凑的字体间距
                        fontFamily: '"Courier New", monospace',
                        lineHeight: '1.1',
                        WebkitTextStroke: '2.5px rgba(255,255,255,0.9)',
                        textShadow: `
                          2px 2px 0px #ff006e,
                          -2px -2px 0px #3a86ff,
                          2px -2px 0px #06ffa5,
                          -2px 2px 0px #ffbe0b,
                          0 0 20px rgba(255,255,255,0.6)
                        `,
                        filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.9))',
                        background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ffbe0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        imageRendering: 'crisp-edges',
                        textRendering: 'optimizeSpeed',
                        willChange: 'transform',
                        maxWidth: '85%',  // 更严格限制最大宽度，确保不超出杯身
                      }}
                    >
                      {displayPrompt || "Your command is being processed..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* 关闭按钮 */}
            <DialogFooter className="p-4 border-t border-white/10 bg-slate-900 relative z-50">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCoffeeCupDialogOpen(false);
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:brightness-110 relative z-50"
                type="button"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Airdrop Wallet Address Dialog */}
        <Dialog open={airdropDialogOpen} onOpenChange={setAirdropDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/10 text-slate-200">
            <DialogHeader>
              <DialogTitle className="text-slate-200">
                {currentActivityForAirdrop?.airdropWalletAddress ? "Update" : "Add"} Airdrop Wallet Address
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {currentActivityForAirdrop?.airdropWalletAddress 
                  ? "Update your Solana wallet address to receive airdrops for this record."
                  : "Enter your Solana wallet address to receive airdrops for this record."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">
                  Solana Wallet Address
                </label>
                <Input
                  type="text"
                  value={airdropWalletAddressInput}
                  onChange={(e) => setAirdropWalletAddressInput(e.target.value)}
                  placeholder="Enter Solana wallet address..."
                  className="bg-white/5 border-white/10 text-slate-200 placeholder-slate-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Network: Solana
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setAirdropDialogOpen(false);
                  setAirdropWalletAddressInput("");
                  setCurrentActivityForAirdrop(null);
                }}
                className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAirdropWallet}
                disabled={!airdropWalletAddressInput.trim()}
                className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:brightness-110"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AIOPage;

