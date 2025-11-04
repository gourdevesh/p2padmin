import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TradeData {
  amount: string;
  assetValue: string;
  cryptocurrency: string;
}

interface NewTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onTrade?: (data: TradeData) => void; // ✅ send trade data to parent
}

const AssetNameMap: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  tether: "USDT",
  binance: "BNB",
};

const NewTradeModal: React.FC<NewTradeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onTrade,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [assetValue, setAssetValue] = useState<string>("");
  const [cryptocurrency, setCryptocurrency] = useState<string>("bitcoin");
  const [loading, setLoading] = useState<boolean>(true);

  const priceRef = useRef<any>(null);
  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setAssetValue("");
      setCryptocurrency("bitcoin");
    }
  }, [isOpen]);

  // ✅ Fetch crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=inr"
        );
        const response = await res.json();
        priceRef.current = response;
      } catch (error) {
        console.error("Failed to fetch crypto prices", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  // ✅ Convert INR → Crypto
  const convertINRToAsset = (amount: string, assetPriceInINR: number) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setAssetValue("");
      return;
    }
    const converted = Number(amount) / assetPriceInINR;
    setAssetValue(converted.toFixed(8));
  };

  // ✅ Recalculate whenever amount or crypto changes
  useEffect(() => {
    if (priceRef.current && cryptocurrency) {
      const coinKey =
        cryptocurrency === "binance" ? "binancecoin" : cryptocurrency;
      const assetPriceInINR = priceRef.current?.[coinKey]?.inr;
      convertINRToAsset(amount, assetPriceInINR);
    }
  }, [cryptocurrency, amount]);

  // ✅ Send data to parent
  const handleBuy = () => {
    const tradeData: TradeData = { amount, assetValue, cryptocurrency };
    onTrade?.(tradeData);
    onSuccess?.();
    onClose();
  };

  if (!isOpen) return null;

  const currentRate = priceRef.current
    ? priceRef.current[
      cryptocurrency === "binance" ? "binancecoin" : cryptocurrency
    ]?.inr
    : 0;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          New Trade
        </h2>

        {/* Coin Selector */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Select Cryptocurrency
          </label>
          <select
            value={cryptocurrency}
            onChange={(e) => setCryptocurrency(e.target.value)}
            className="w-full border rounded-md px-3 py-2 bg-transparent text-gray-800 dark:text-white"
          >
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="tether">Tether (USDT)</option>
            <option value="binance">Binance Coin (BNB)</option>
          </select>
        </div>

        {/* Current Rate */}
        <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium p-3 rounded-md mb-4">
          {loading ? (
            <span>Fetching current rate...</span>
          ) : (
            <>
              💱 1 {AssetNameMap[cryptocurrency]} = ₹
              {currentRate?.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </>
          )}
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* INR */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              I will pay
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-800 dark:text-white"
              />
              <span className="text-orange-600 font-semibold ml-2">INR</span>
            </div>
          </div>

          {/* Crypto */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              and receive
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="0.00000000"
                value={assetValue ?? ""}
                readOnly
                className="w-full outline-none bg-transparent text-gray-800 dark:text-white"
              />
              <span className="text-orange-600 font-semibold ml-2">
                {AssetNameMap[cryptocurrency]}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        {amount && assetValue && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            💡 You get <strong>{assetValue}</strong>{" "}
            {AssetNameMap[cryptocurrency]} for ₹{amount}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleBuy}
          disabled={!amount || !assetValue}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition"
        >
          New Trade
        </button>
      </div>
    </div>
  );
};

export default NewTradeModal;
