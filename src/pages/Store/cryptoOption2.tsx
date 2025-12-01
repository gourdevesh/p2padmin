import { useEffect, useRef, useState } from "react";
import { realTimePrice } from "../../services/otherService";
import { showToast } from "../../utils/toast";
import { getUserDetails } from "../../services/userService";

interface CryptoOption {
  status: boolean;
  shrotName: string;
  name: string;
  asset: string;
  network: string;
  logo: string;
  blc: number;
  currentPrice: number;
  pricePerCoin: number;
  INR: string;
  table?: string;
}

interface PriceData {
  tether?: { inr: number };
  bitcoin?: { inr: number };
  ethereum?: { inr: number };
  binancecoin?: { inr: number };
}

export const useCryptoOptions = (): CryptoOption[] => {
  const [walletData, setWalletData] = useState<any>({});
  const [price, setPrice] = useState<PriceData | null>(null);

  const priceRef = useRef<PriceData | null>(null);

  // Fetch wallet data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const user_id = 113; // NUMBER
      const finalQuery = `&user_id=${user_id}`;
      const data = await getUserDetails(token, finalQuery);

      setWalletData(data.data[0]?.wallet_details || {});
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch prices
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res: PriceData = await realTimePrice();
        setPrice(res);
        priceRef.current = res;
      } catch (error) {
        console.error("Price API error:", error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, []);

  const wallet = Array.isArray(walletData)
    ? walletData
    : Array.isArray(walletData?.data)
      ? walletData.data
      : Array.isArray(walletData?.wallet)
        ? walletData.wallet
        : [];

  const ether = walletData.ethereum || [];
  const btc = wallet.find((w: any) => w.asset === "btc");
  const eth = wallet.find((w: any) => w.asset === "eth");
  const bnb = wallet.find((w: any) => w.asset === "bnb");
  const usdt = wallet.find((w: any) => w.asset === "usdt");



  return [
    {
      status: !!walletData.bitcoin,
      shrotName: "BTC",
      name: "Bitcoin",
      asset: "btc",
      network: "btc",
      pricePerCoin: price?.bitcoin?.inr ?? 0,
      blc: Number(btc?.remaining_amount ?? 0),
      currentPrice: price?.bitcoin?.inr ?? 0,
      logo: "/imagelogo/bitcoin-btc-logo.png",
      INR: "0.00",
      table: "true",
    },
    {
      status: ether.some((item: any) => item.asset === "eth"),
      shrotName: "ETH",
      name: "Ethereum",
      asset: "eth",
      pricePerCoin: price?.ethereum?.inr ?? 0,
      blc: Number(eth?.remaining_amount ?? 0),

      currentPrice: price?.ethereum?.inr ?? 0,
      network: "erc20",
      logo: "/imagelogo/ethereum-eth-logo.png",
      INR: "0.00",
      table: "true",
    },
    {
      status: !!walletData.binance,
      shrotName: "BNB",
      name: "Binance",
      asset: "bnb",
      network: "bep20",
      pricePerCoin: price?.binancecoin?.inr ?? 0,
      blc: Number(bnb?.remaining_amount ?? 0),
      currentPrice: price?.binancecoin?.inr ?? 0,
      logo: "/imagelogo/bnb-bnb-logo.png",
      INR: "0.00",
    },
    {
      status: ether.some((item: any) => item.asset === "usdt"),
      shrotName: "USDT",
      name: "Tether",
      asset: "usdt",
      network: "erc20",
      pricePerCoin: price?.tether?.inr ?? 0,
      blc: Number(usdt?.remaining_amount ?? 0),

      currentPrice: price?.tether?.inr ?? 0,
      logo: "/imagelogo/tether-usdt-logo.png",
      INR: "0.00",
    },
  ];
};
