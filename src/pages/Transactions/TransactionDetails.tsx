import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table"; // your Table component
import { showToast } from "../../utils/toast";
import { decryptData } from "../../services/decryptService";
import { getTradeHistory } from "../../services/TradeHistory";
import PaymentUpdateStatusModel from "../../Models/PayemtUpdateStatusModel"; // If needed for update
import UpdateUPIStatusModel from "../../Models/UpdateUPIStatusModel"; // Optional
import { getTransactionDetails } from "../../services/TransactionService";
import { ArrowLeft } from "lucide-react";
import { Copy, Check } from "lucide-react";


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

const TransactionsDetails: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [tradeData, setTradeData] = useState<TradeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [queryString, setQueryString] = useState("");
    const [copiedRows, setCopiedRows] = useState<{ [key: string]: boolean }>({});


    const [filters, setFilters] = useState({
        user_id: "",
        txn_hash: "",
        txn_type: "",
        asset: "",
        network: "",
        method: "",
        status: "",
        start_date: "",
        end_date: "",
    });


    const fetchData = async (query: string = "", page: number = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const finalQuery = `page=${page}${query ? `&${query}` : ""}`;
            const data = await getTransactionDetails(token, finalQuery);
            setTradeData(data?.data || []);

            // if (data?.data) {
            //     const decrypted = await decryptData(data.data, token);
            //     setTradeData(decrypted?.data || []);
            // }
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
        if (filters.txn_type) queryParams.append("transaction_type", filters.txn_type);
        if (filters.asset) queryParams.append("asset", filters.asset);
        if (filters.network) queryParams.append("network", filters.network);
        if (filters.method) queryParams.append("method", filters.method);
        if (filters.status) queryParams.append("status", filters.status);
        if (filters.txn_hash) queryParams.append("txn_hash", filters.txn_hash);
        if (filters.start_date) {
            const [year, month, day] = filters.start_date.split("-");
            queryParams.append("start_date", `${day}-${month}-${year}`);
        }
        if (filters.end_date) {
            const [year, month, day] = filters.end_date.split("-");
            queryParams.append("end_date", `${day}-${month}-${year}`);
        }


        setQueryString(queryParams.toString());
        setCurrentPage(1);
    };



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<TradeType | null>(null);

    const handleUpdateClick = (row: TradeType) => {
        setSelectedData(row);
        setIsModalOpen(true);
    };
    const handleCopy = (textToCopy: string, rowKey: string) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopiedRows(prev => ({ ...prev, [rowKey]: true }));
                setTimeout(() => {
                    setCopiedRows(prev => ({ ...prev, [rowKey]: false }));
                }, 1500);
            })
            .catch(err => console.error("Failed to copy: ", err));
    };
    const columns = [
        { key: "txn_id", label: "Txn ID", sortable: true },
        { key: "user_id", label: "User ID", sortable: true },
        { key: "txn_type", label: "Txn Type", sortable: true },
        {
            key: "from_address",
            label: "From Address",
            sortable: true,
            render: (value: string) =>
                value ? `${value.slice(0, 6)}...${value.slice(-5)}` : "-"
        },
        {
            key: "to_address",
            label: "To Address",
            sortable: true,
            render: (value: string) =>
                value ? `${value.slice(0, 6)}...${value.slice(-5)}` : "-"
        },
        {
            key: "txn_hash_id",
            label: "Txn Hash",
            sortable: true,
            render: (value: string, row: any) => {
                if (!value) return "-";

                const isCopied = copiedRows[value]; // use txn_hash_id as unique key

                return (
                    <span className="flex items-center ">
                        {`${value.slice(0, 6)}...${value.slice(-5)}`}
                        <span
                            className="ml-2 cursor-pointer"
                            onClick={() => handleCopy(value, value)}
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

        { key: "asset", label: "Asset", sortable: true },
        { key: "network", label: "Network", sortable: true },
        {
            key: "available_amount",
            label: "Available Amount",
            sortable: true,
            render: (value: number | string) => {
                if (value === null || value === undefined) return "-";
                const num = Number(value);
                if (isNaN(num)) return value;
                return num.toFixed(12).replace(/(\.\d*?[1-9])0+$/, "$1");
            },
        },
        {
            key: "credit_amount", label: "Credit Amount", sortable: true, render: (value: number | string) => {
                if (value === null || value === undefined) return "-";
                const num = Number(value);
                if (isNaN(num)) return value;
                return num.toFixed(12).replace(/(\.\d*?[1-9])0+$/, "$1");
            },
        },
        {
            key: "debit_amount", label: "Debit Amount", sortable: true, render: (value: number | string) => {
                if (value === null || value === undefined) return "-";
                const num = Number(value);
                if (isNaN(num)) return value;
                return num.toFixed(12).replace(/(\.\d*?[1-9])0+$/, "$1");
            },
        },
        {
            key: "transfer_percentage", label: "Transfer %", sortable: true, render: (value: number | string) => {
                if (value === null || value === undefined) return "-";
                const num = Number(value);
                if (isNaN(num)) return value;
                return num.toFixed(12).replace(/(\.\d*?[1-9])0+$/, "$1");
            },
        },
        {
            key: "transfer_fee", label: "Transfer Fee", sortable: true, render: (value: number | string) => {
                if (value === null || value === undefined) return "-";
                const num = Number(value);
                if (isNaN(num)) return value;
                return num.toFixed(12).replace(/(\.\d*?[1-9])0+$/, "$1");
            },
        },
        {
            key: "paid_amount", label: "Paid Amount", sortable: true, render: (value: number | string) => {
                if (value === null || value === undefined) return "-";
                const num = Number(value);
                if (isNaN(num)) return value;
                return num.toFixed(12).replace(/(\.\d*?[1-9])0+$/, "$1");
            },
        },
        {
            key: "remaining_amount", label: "Remaining Amount", sortable: true, render: (value: number | string) => {
                if (value === null || value === undefined) return "-";
                const num = Number(value);
                if (isNaN(num)) return value;
                return num.toFixed(12).replace(/(\.\d*?[1-9])0+$/, "$1");
            },
        },
        { key: "method", label: "Method", sortable: true },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (value: string) => (
                <span
                    className={`px-2 py-1 rounded-full text-white ${value === "success"
                        ? "bg-green-500"
                        : value === "pending"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                >
                    {value}
                </span>
            ),
        },
        { key: "remark", label: "Remark", sortable: true },
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
                    Trade Transactions
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
                    Filter Transactions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={filters.user_id}
                        onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <select
                        value={filters.txn_type}
                        onChange={(e) => setFilters({ ...filters, txn_type: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Txn Type</option>
                        <option value="internal">Internal</option>
                        <option value="external">External</option>
                    </select>
                    <select
                        value={filters.asset}
                        onChange={(e) => setFilters({ ...filters, asset: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Asset</option>
                        <option value="usdt">USDT</option>
                        <option value="bnb">BNB</option>
                        <option value="eth">ETH</option>
                        <option value="btc">BTC</option>
                    </select>
                    <select
                        value={filters.network}
                        onChange={(e) => setFilters({ ...filters, network: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Network</option>
                        <option value="erc20">ERC20</option>
                        <option value="bep20">BEP20</option>
                        <option value="trc20">TRC20</option>
                    </select>
                    <select
                        value={filters.method}
                        onChange={(e) => setFilters({ ...filters, method: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Method</option>
                        <option value="send">Send</option>
                        <option value="receive">Receive</option>
                    </select>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Status</option>
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Txn Hash"
                        value={filters.txn_hash}
                        onChange={(e) => setFilters({ ...filters, txn_hash: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                        type="date"
                        placeholder="Start Date"
                        value={filters.start_date}
                        onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <input
                        type="date"
                        placeholder="End Date"
                        value={filters.end_date}
                        onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 w-full bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => {
                            // Reset filters
                            setFilters({
                                user_id: "",
                                txn_hash: "",
                                txn_type: "",
                                asset: "",
                                network: "",
                                method: "",
                                status: "",
                                start_date: "",
                                end_date: "",
                            });

                            setQueryString("");
                            setCurrentPage(1);
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
                data={tradeData}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                loading={loading}
                totalItems={tradeData.length}
            />

            <UpdateUPIStatusModel
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedData={selectedData}
                onSuccess={fetchData}
            />
        </div>
    );
};

export default TransactionsDetails;
