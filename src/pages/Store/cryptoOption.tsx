import { useEffect, useRef, useState } from "react";
import { useWalletStore } from "./useWalletStore";
import { realTimePrice } from "../../services/otherService";

// ✅ Type for crypto option
interface CryptoOption {
  status: boolean;
  shrotName: string;
  name: string;
  asset: string;
  network: string;
  logo: string;
  blc?: number | null;          // 👈 allow null
  INR: string;
  table?: string;
  currentPrice?: number | null; // 👈 allow null
  pricePerCoin?: string;
}

// ✅ Fixed PriceData interface
interface PriceData {
  tether?: { inr: number };
  bitcoin?: { inr: number };
  ethereum?: { inr: number };
  binancecoin?: { inr: number };
}

export const useCryptoOption = (): CryptoOption[] => {
  const wallet = useWalletStore((state) => state.web3wallet);
  const ether = wallet?.data?.ethereum || [];

  const [price, setPrice] = useState<PriceData | null>(null);
  const priceRef = useRef<PriceData | null>(null); // ✅ fixed type

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response: PriceData = await realTimePrice(); // ✅ properly typed
        priceRef.current = response;
        setPrice(response);
        console.log("Fetched Price:", response);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice(); // initial call

    // Optional: auto refresh every 10 seconds
    const interval = setInterval(fetchPrice, 10000);

    return () => clearInterval(interval); // cleanup
  }, []);

  console.log("ether",ether)

  return [
    {
      status: !!wallet?.data?.bitcoin,
      shrotName: "BTC",
      name: "Bitcoin",
      asset: "btc",
      network: "btc",
      pricePerCoin: price?.bitcoin?.inr
        ? `1 BTC = ${price.bitcoin.inr} INR`
        : "Loading...",
      blc: wallet?.data?.bitcoin?.[0]?.remaining_amount,
      currentPrice: price?.bitcoin?.inr,
      logo: "/imagelogo/bitcoin-btc-logo.png",
      INR: "0.00",
      table: "true",
    },
    {
      status: ether.some((item: any) => item.asset === "eth"),
      shrotName: "ETH",
      name: "Ethereum",
      asset: "eth",
      pricePerCoin: price?.ethereum?.inr
        ? `1 ETH = ${price.ethereum.inr} INR`
        : "Loading...",
      blc: ether.find((item: any) => item.asset === "eth")?.remaining_amount,
      currentPrice: price?.ethereum?.inr,
      network: "erc20",
      logo: "/imagelogo/ethereum-eth-logo.png",
      INR: "0.00",
      table: "true",
    },
    {
      status: !!wallet?.data?.binance,
      shrotName: "BNB",
      name: "Binance",
      asset: "bnb",
      network: "bep20",
      currentPrice: price?.binancecoin?.inr,
      pricePerCoin: price?.binancecoin?.inr
        ? `1 BNB = ${price.binancecoin.inr} INR`
        : "Loading...",
      blc: wallet?.data?.binance?.[0]?.remaining_amount,
      logo: "/imagelogo/bnb-bnb-logo.png",
      INR: "0.00",
    },
    {
      status: ether.some((item: any) => item.asset === "usdt"),
      shrotName: "USDT",
      name: "Tether",
      asset: "usdt",
      pricePerCoin: price?.tether?.inr
        ? `1 USDT = ${price.tether.inr} INR`
        : "Loading...",
      network: "erc20",
      logo: "/imagelogo/tether-usdt-logo.png",
      currentPrice: price?.tether?.inr,
      blc: ether.find((item: any) => item.asset === "usdt")?.remaining_amount,
      INR: "0.00",
    },
  ];
};
