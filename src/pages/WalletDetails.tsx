import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, Check, Copy } from "lucide-react";
import { getTradeHistory } from "../services/TradeHistory";
import { decryptData } from "../services/decryptService";
import { Table } from '../components/Table';
import { showToast } from "../utils/toast";
import { getWalletDetails } from "../services/WalletDetails";

interface TradeType {
    trade_id: number;
    user_id: string;
    trade_type: string | null;
    asset: string;
    amount: string;
    price: string;
    trade_status: string;
    created_at: string;
    role: string;
    [key: string]: any;
    payment?: {
        payment_method?: {
            payment_details?: {
                user_id?: number;
            }
        }
    };
}

const WalletDetails: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [tradeData, setTradeData] = useState<TradeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [copiedRow, setCopiedRow] = useState<number | null>(null);

    const [queryString, setQueryString] = useState("");
    const [filters, setFilters] = useState({
        user_id: "",
        blockchain: "",
        network: "",
        asset: "",
        trade_status: "",
        wallet_address: "",
        status: "",
    });

    const fetchData = async (query: string = "", page: number = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const finalQuery = `page=${page}${query ? `&${query}` : ""}`;
            const data = await getWalletDetails(token, finalQuery);

            if (data?.data) {
                const decrypted = await decryptData(data.data, token);
                setTradeData(decrypted?.data || []);
            }
            setCurrentPage(data?.pagination?.current_page || 1);
            setTotalPages(data?.pagination?.last_page || 1);
        } catch (err: any) {
            showToast("error", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(queryString, currentPage);
    }, [currentPage, queryString]);


    const handleFilter = () => {
        const queryParams = new URLSearchParams();
        if (filters.user_id) queryParams.append("user_id", filters.user_id);
        if (filters.blockchain) queryParams.append("blockchain", filters.blockchain);
        if (filters.network) queryParams.append("network", filters.network);
        if (filters.asset) queryParams.append("asset", filters.asset);
        if (filters.status) queryParams.append("status", filters.status);
        if (filters.wallet_address) queryParams.append("wallet_address", filters.wallet_address);
        const query = queryParams.toString();
        setQueryString(query);
        setCurrentPage(1);
    };


    const handleCopy = (textToCopy: string, rowIndex: number) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopiedRow(rowIndex);
                setTimeout(() => setCopiedRow(null), 1500);
            })
            .catch(err => console.error("Failed to copy: ", err));
    };

    const columns = [
        { key: "wallet_id", label: "Wallet Id", sortable: true },
        {
            key: "user_id",
            label: "User ID",
            sortable: true,
        },
        { key: "blockchain", label: "blockchain", sortable: true, render: (value: string | null) => value || "-" },
        { key: "asset", label: "assets", sortable: true },
        { key: "network", label: "network", sortable: true },
        {
            key: "wallet_address",
            label: "Wallet Address",
            sortable: true,
            render: (value: string, row: any) => {
                if (!value) return "-";

                const rowIndex = row.index;
                const isCopied = copiedRow === rowIndex;

                return (
                    <span className="flex items-center">
                        {`${value.slice(0, 6)}...${value.slice(-5)}`}
                        <span
                            className="ml-2 cursor-pointer hover:text-blue-800"
                            onClick={() => handleCopy(value, rowIndex)}
                        >
                            {isCopied ? (
                                <Check className="text-green-500" size={18} />
                            ) : (
                                <Copy size={18} />
                            )}
                        </span>
                    </span>
                );
            },
        },


        { key: "remaining_amount", label: "Remaining Amount", sortable: true },

        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (value: string) => (
                <span
                    className={`px-2 py-1 rounded-full text-white ${value === "pending"
                        ? "bg-yellow-500"
                        : value === "hold"
                            ? "bg-red-500"
                            : value === "active"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                >
                    {value}
                </span>
            ),
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
            render: (value: string) => new Date(value).toLocaleString(),
        },

    ];

    return (
        <div className="space-y-6">

            <div className="flex flex-row items-center justify-between  flex-wrap">
                {/* Left side */}
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Wallet Details
                </h1>

                {/* Right side */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 
                   text-gray-800 dark:text-gray-200 font-medium 
                   rounded-md shadow-sm border border-gray-300 dark:border-gray-600
                   hover:bg-gray-200 dark:hover:bg-gray-600 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-1 justify-center text-sm"
                >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                </button>
            </div>


            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Filter  Wallet Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={filters.user_id}
                        onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <input
                        type="text"
                        placeholder="wallet address"
                        value={filters.wallet_address}
                        onChange={(e) => setFilters({ ...filters, wallet_address: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <select
                        value={filters.blockchain}
                        onChange={(e) => setFilters({ ...filters, blockchain: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">blockchain</option>
                        <option value="ethereum">ethereum</option>
                        <option value="binance">binance</option>
                        <option value="bitcoin" > bitcoin</option>
                        <option value="tron" > tron</option>

                    </select>
                    <select
                        value={filters.asset}
                        onChange={(e) => setFilters({ ...filters, asset: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">assets</option>
                        <option value="eth">eth</option>
                        <option value="bnb">bnb</option>
                        <option value="usdt">usdt</option>
                        <option value="btc">btc</option>
                    </select>

                    <select
                        value={filters.network}
                        onChange={(e) => setFilters({ ...filters, network: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">network</option>
                        <option value="erc20">erc20</option>
                        <option value="trc20">trc20</option>
                        <option value="bep20">bep20</option>
                        <option value="btc">btc</option>
                    </select>

                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Status</option>
                        <option value="active">Active</option>
                        <option value="hold">hold</option>

                    </select>
                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 w-full bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => {
                            setFilters({
                                user_id: "",
                                blockchain: "",
                                network: "",
                                asset: "",
                                trade_status: "",
                                wallet_address: "",
                                status: "",
                            });
                            fetchData("", 1);
                        }}
                        className="px-4 py-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Trade Table */}
            <Table
                columns={columns}
                data={tradeData.map((item, index) => ({ ...item, index }))}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                loading={loading}
                totalItems={tradeData.length}
            />


        </div>
    );
};

export default WalletDetails;
