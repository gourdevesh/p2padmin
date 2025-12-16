import React, { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";
import { disputeOpened, getSupportTicket } from "../services/SupportTicketService";
import { Table } from "../components/Table";
import { SidebarStatusCard } from "../components/UserStatusCard";

export const Disputes
    : React.FC = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
        const [pendingTickets, setPendingTickets] = useState<any[]>([]);
        const [loading, setLoading] = useState(true);
        const [totalPages, setTotalPages] = useState(1);
        const [totalItems, setTotalItems] = useState(0);
        const navigate = useNavigate()
        const [statusFilter, setStatusFilter] = useState("");
        const [analytics, setAnalytics] = useState<any>(null);
const [loadingRowId, setLoadingRowId] = useState(null);
 
     const fetchData = async (query: string = "", page: number = 1) => {
    try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found");

        let finalQuery = `page=${page}`;

        // Search input logic:
        if (query) {
            if (/^\d+$/.test(query)) {
                finalQuery += `&trade_id=${query}`;
            } else {
                finalQuery += `&ticket_number=${query}`;
            }
        }

        // Status filter
        if (statusFilter) {
            finalQuery += `&status=${statusFilter}`;
        }

        const data = await getSupportTicket(token, finalQuery);
        console.log("get-tickets", data);

        // 🛑 If no results → Empty table
        if (!data.status || !data.data || data.data.length === 0) {
            setPendingTickets([]);          // CLEAR TABLE
            setTotalPages(1);
            setTotalItems(0);
            setAnalytics(data);
            return;
        }

        // 🟢 If results found
        setPendingTickets(data.data);
        setCurrentPage(data.pagination?.current_page || 1);
        setTotalPages(data.pagination?.last_page || 1);
        setTotalItems(data.pagination?.total || 0);
        setAnalytics(data);

    } catch (err: any) {
        setPendingTickets([]); // ERROR par bhi table clear
    } finally {
        setLoading(false);
    }
};

        useEffect(() => {
            fetchData(searchTerm, currentPage);
        }, [currentPage, statusFilter]);

        const handleSearch = () => {
            setCurrentPage(1);
            fetchData(searchTerm, 1);
        };

        // ✅ Accept the row as argument
        const handleDisputeAction = async (row: any) => {
            try {
        setLoadingRowId(row.ticket_number);
                console.log("Selected ticket/trade:", row);

                const token = localStorage.getItem("authToken") || "";

                // Prepare payload
                const payload = {
                    trade_id: row?.trade_details?.trade_id,
                    user_name: row?.reporter_details?.username,
                    side: row?.reporter_details?.role === "seller" ? "Seller" : "Buyer",
                    counterparty_name: row?.reported_details?.username,
                    dispute_reason: row?.subject || "Not provided",
                    email: row?.reporter_details?.email,
                };

                // Call API through service
                const response = await disputeOpened(payload, token);

                console.log("Email sent!", response);

                // Navigate after email sent
                navigate('/dispute-details', { state: { row } });

            } catch (err: any) {
                console.error("Error:", err.message);
            }
            finally{
        setLoadingRowId(null);
            }
        };

        console.log("analytics", analytics)

        const columns = [

            {
                key: "name",
                label: "dispute",
                sortable: true,
                render: (value: string, row: any) => (
                    <div className="flex items-center">

                        <div className="ml-3">
                            <p className="font-medium text-gray-900 dark:text-white">
                                {row?.ticket_number}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {row?.subject || "N/A"}
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                key: "user",
                label: "Submitted By",
                sortable: true,
                render: (value: any, row: any) => row?.reporter_details?.username ?? "N/A",
            },
              {
                key: "tradeId",
                label: "tradeId",
                sortable: true,
                render: (value: any, row: any) => row?.trade_details?.trade_id ?? "N/A",
            },
            {
                key: "status",
                label: "Status",
                sortable: true,
                render: (value: string) => {
                    const status = (value || "unknown").toLowerCase();
                    let bgColor = "";
                    let textColor = "text-white";

                    switch (status) {
                        case "open":
                            bgColor = "bg-blue-500";
                            break;
                        case "pending":
                            bgColor = "bg-yellow-500";
                            break;
                        case "in-progress":
                            bgColor = "bg-purple-500";
                            break;
                        case "resolved":
                            bgColor = "bg-green-500";
                            break;
                        case "closed":
                            bgColor = "bg-red-500";
                            break;
                        default:
                            bgColor = "bg-gray-500";
                    }

                    const displayText = status.charAt(0).toUpperCase() + status.slice(1);

                    return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                            {displayText}
                        </span>
                    );
                },
            },

            {
                key: "priority",
                label: "Priority",
            },
            {
                key: "updated_at",
                label: "Last Reply",
            },
            {
                key: "actions",
                label: "Actions",
                render: (value: any, row: any) => (
                    <button
  disabled={loadingRowId === row?.ticket_number}
                        type="button"
                        className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none"
                        onClick={() => handleDisputeAction(row)} // pass the row
                    >
  {loadingRowId === row?.ticket_number ? "Loading..." : "Details"}
                    </button>
                ),
            }

        ];

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <SidebarStatusCard
                        label="Pending Dispute"
                        count={analytics?.analytics?.total_pending_tickets}
                        icon={Users}
                        color="purple"
                        path=""
                    />

                    <SidebarStatusCard
                        label="Total Dispute"
                        count={analytics?.analytics?.total_tickets}
                        icon={Users}
                        color="blue"
                        path=""
                    />




                </div>
                {/* Page Header */}
                <div className="flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dispute
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
                        {/* Status Dropdown */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}

                            className="p-2 w-full md:w-48 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="">Status</option>
                            <option value="pending">pending</option>
                            <option value="in_progress">in-progress</option>
                            <option value="resolved">resolved</option>
                            <option value="closed">closed</option>

                        </select>

                        {/* Search Input + Button */}
                        <div className="flex flex-1">
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={handleSearch}
                                className="px-4 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600 focus:outline-none flex items-center justify-center border border-primary-500"
                            >
                                <Search size={16} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Users Table */}

                <Table
                    columns={columns}
                    data={pendingTickets}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    loading={loading}
                    totalItems={totalItems}
                />


            </div>
        );
    };
