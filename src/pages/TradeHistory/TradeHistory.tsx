import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table"; // your Table component
import { showToast } from "../../utils/toast";
import { decryptData } from "../../services/decryptService";
import { getTradeHistory } from "../../services/TradeHistory";
import PaymentUpdateStatusModel from "../../Models/PayemtUpdateStatusModel"; // If needed for update
import UpdateUPIStatusModel from "../../Models/UpdateUPIStatusModel"; // Optional

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

const TradeHistory: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [tradeData, setTradeData] = useState<TradeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [queryString, setQueryString] = useState("");
    const [filters, setFilters] = useState({
        user_id: "",
        trade_id: "",
        trade_type: "",
        asset: "",
        trade_status: "",
    });

    const fetchData = async (query: string = "", page: number = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const finalQuery = `page=${page}${query ? `&${query}` : ""}`;
            const data = await getTradeHistory(token, finalQuery);

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
        if (filters.trade_id) queryParams.append("trade_id", filters.trade_id);
        if (filters.trade_type) queryParams.append("tradeType", filters.trade_type);
        if (filters.asset) queryParams.append("cryptocurrency", filters.asset);
        if (filters.trade_status) queryParams.append("tradeStatus", filters.trade_status);

        const query = queryParams.toString();
        setQueryString(query);   // store query in state
        setCurrentPage(1);       // reset to page 1
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<TradeType | null>(null);

    const handleUpdateClick = (row: TradeType) => {
        setSelectedData(row);
        setIsModalOpen(true);
    };

    const columns = [
        { key: "trade_id", label: "Trade ID", sortable: true },
        {
            key: "payment_user_id",
            label: "User ID",
            sortable: true,
            render: (value: any, row: TradeType) => row.payment?.payment_method?.payment_details?.user_id || "-"
        },
        { key: "trade_type", label: "Trade Type", sortable: true, render: (value: string | null) => value || "-" },
        { key: "asset", label: "Cryptocurrency", sortable: true },
        { key: "amount", label: "Amount", sortable: true },
        { key: "price", label: "Price", sortable: true },
        {
            key: "trade_status",
            label: "Status",
            sortable: true,
            render: (value: string) => (
                <span
                    className={`px-2 py-1 rounded-full text-white ${value === "pending"
                        ? "bg-yellow-500"
                        : value === "expired"
                            ? "bg-red-500"
                            : value === "success"
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
        {
            key: "actions",
            label: "Actions",
            render: (value: any, row: TradeType) => (
                <button
                    type="button"
                    className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none"
                >
                    Update
                </button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="font-bold text-lg mt-2">Trade History</h2>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Filter Trade History
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={filters.user_id}
                        onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Trade ID"
                        value={filters.trade_id}
                        onChange={(e) => setFilters({ ...filters, trade_id: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <select
                        value={filters.trade_type}
                        onChange={(e) => setFilters({ ...filters, trade_type: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Trade Type</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                    <select
                        value={filters.asset}
                        onChange={(e) => setFilters({ ...filters, asset: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Cryptocurrency</option>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="binance">Binance</option>
                        <option value="tether">Tether</option>
                    </select>

                    <select
                        value={filters.trade_status}
                        onChange={(e) => setFilters({ ...filters, trade_status: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Trade Status</option>
                        <option value="pending">Pending</option>
                        <option value="expired">Expired</option>
                        <option value="completed">Completed</option>
                        <option value="disputed">Disputed</option>
                    </select>
                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 w-full bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                        Apply
                    </button>
                    {/* <button
                        onClick={() => {
                            setFilters({ user_id: "", trade_id: "", trade_type: "", asset: "", trade_status: "" });
                            fetchData("", 1);
                        }}
                        className="px-4 py-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Reset
                    </button> */}
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

export default TradeHistory;
