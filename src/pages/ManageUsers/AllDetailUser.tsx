import React, { useState, useMemo } from "react";
import { Edit, Repeat, Slash } from "lucide-react";
import { useCryptoOption } from "../Store/cryptoOption";

export default function AllDetailUser() {
    const cryptoOption = useCryptoOption(113);

    const [user, setUser] = useState({
        id: "u_001",
        name: "Rahul Mehta",
        email: "rahul@example.com",
        status: "Active",
        joinedAt: "2024-02-15",
        currency: "INR",
        balance: 245000,
    });

    const [holdings, setHoldings] = useState([
        { id: "h_btc", name: "Bitcoin", symbol: "BTC", qty: 0.15, currentPrice: 4333333 },
        { id: "h_eth", name: "Ethereum", symbol: "ETH", qty: 1.2, currentPrice: 183333 },
        { id: "h_usdt", name: "Tether", symbol: "USDT", qty: 5000, currentPrice: 83 },
    ]);

    const [transactions, setTransactions] = useState([
        { id: "t001", type: "Buy", coin: "BTC", qty: 0.05, price: 1800000, date: "2025-10-28", status: "Completed", by: "user" },
        { id: "t002", type: "Sell", coin: "ETH", qty: 0.2, price: 34000, date: "2025-10-27", status: "Pending", by: "user" },
        { id: "t003", type: "Buy", coin: "USDT", qty: 2000, price: 166000, date: "2025-10-25", status: "Completed", by: "other" },
    ]);

    const totals = useMemo(() => {
        const totalHoldingsValue = holdings.reduce((acc, h) => acc + h.qty * h.currentPrice, 0);
        const buyTx = transactions.filter((t) => t.type === "Buy");
        const sellTx = transactions.filter((t) => t.type === "Sell");
        const buyVolume = buyTx.reduce((a, t) => a + t.qty * t.price, 0);
        const sellVolume = sellTx.reduce((a, t) => a + t.qty * t.price, 0);
        return {
            totalHoldingsValue,
            buyCount: buyTx.length,
            sellCount: sellTx.length,
            buyVolume,
            sellVolume,
        };
    }, [holdings, transactions]);

    const [newBalance, setNewBalance] = useState(user.balance);
    const [editMode, setEditMode] = useState(false);

    const handleBlockToggle = () => {
        setUser((prev) => ({
            ...prev,
            status: prev.status === "Active" ? "Blocked" : "Active",
        }));
    };

    const handleBalanceSave = () => {
        setUser((prev) => ({ ...prev, balance: Number(newBalance) }));
        setEditMode(false);
    };

    const refreshPrices = () => {
        setHoldings((prev) =>
            prev.map((h) => ({
                ...h,
                currentPrice: Math.round(h.currentPrice * (0.98 + Math.random() * 0.04)),
            }))
        );
    };
    const handleWarning = () => {
        alert(`Warning sent to user }`);
        // or open a modal / call API here
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-indigo-600 text-white p-4 rounded-lg shadow">
                <h1 className="text-lg font-semibold"> User</h1>
                <button
                    onClick={refreshPrices}
                    className="flex items-center gap-2 bg-white text-indigo-600 px-3 py-1 rounded-lg hover:bg-gray-100"
                >
                    <Repeat size={16} />
                    Refresh Prices
                </button>
            </div>

            {/* User summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-5 rounded-xl shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                            <p className="text-xs text-gray-400">Joined: {user.joinedAt}</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Total Balance ({user.currency})</p>
                        {editMode ? (
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="number"
                                    value={newBalance}
                                    onChange={(e) => setNewBalance(Number(e.target.value))}
                                    className="border px-2 py-1 rounded w-28"
                                />
                                <button
                                    onClick={handleBalanceSave}
                                    className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <p className="text-2xl font-bold mt-1">₹ {user.balance.toLocaleString()}</p>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">

                        <button
                            onClick={handleBlockToggle}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${user.status === "Active"
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-green-100 text-green-600 hover:bg-green-200"
                                }`}
                        >
                            <Slash size={16} />
                                <button
                                    onClick={() => handleWarning()}
                                    className="text-yellow-600 hover:text-yellow-800 font-medium underline"
                                >
                                    Warning User
                                </button>
                                                  </button>
                    </div>

                    <div className="mt-4 text-sm text-gray-700">
                        <p>Holdings Value: ₹ {totals.totalHoldingsValue.toLocaleString()}</p>
                        <p>
                            Buys: {totals.buyCount} | Sells: {totals.sellCount}
                        </p>
                        <p>
                            Buy Volume: ₹ {totals.buyVolume.toLocaleString()} | Sell Volume: ₹{" "}
                            {totals.sellVolume.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Holdings */}
                <div className="col-span-2 bg-white p-5 rounded-xl shadow-md overflow-x-auto">
                    <h2 className="font-semibold text-lg mb-3">Crypto Holdings</h2>
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Coin</th>
                                <th className="p-2 text-left">Symbol</th>
                                <th className="p-2 text-left">Quantity</th>
                                <th className="p-2 text-left">Price</th>
                                <th className="p-2 text-left">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoOption.map((h) => (
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="p-2">{h.shrotName}</td>
                                    <td className="p-2">{h.shrotName}</td>
                                    <td className="p-2">{h.pricePerCoin}</td>
                                    <td className="p-2">₹   {`₹${(
                                        ((h.currentPrice ?? 0) * (h.blc ?? 0)).toFixed(2)
                                    )} INR`}</td>
                                    <td className="p-2">₹ {Number(h.blc ?? 0).toFixed(8)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-white mt-6 p-5 rounded-xl shadow-md overflow-x-auto">
                <h2 className="font-semibold text-lg mb-3">Recent Transactions</h2>
                <table className="w-full text-sm border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">ID</th>
                            <th className="p-2 text-left">Type</th>
                            <th className="p-2 text-left">Coin</th>
                            <th className="p-2 text-left">Qty</th>
                            <th className="p-2 text-left">Price</th>
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.id} className="border-t hover:bg-gray-50">
                                <td className="p-2">{t.id}</td>
                                <td className={`p-2 font-semibold ${t.type === "Buy" ? "text-green-600" : "text-red-600"}`}>
                                    {t.type}
                                </td>
                                <td className="p-2">{t.coin}</td>
                                <td className="p-2">{t.qty}</td>
                                <td className="p-2">₹ {t.price.toLocaleString()}</td>
                                <td className="p-2">{t.date}</td>
                                <td className="p-2">{t.status}</td>
                                <td className="p-2">{t.by}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
