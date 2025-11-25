import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Table } from "../../components/Table";
import { getUserDetails } from "../../services/userService";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export const BannedUsers
    : React.FC = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
        const [users, setUsers] = useState<any[]>([]);
        const [loading, setLoading] = useState(true);
        const [totalPages, setTotalPages] = useState(1);
        const [totalItems, setTotalItems] = useState(0);
        const navigate = useNavigate()

        const fetchData = async (query: string = "", page: number = 1) => {
            try {
                setLoading(true);
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("No auth token found");

                // ✅ Page query ke andar hi bhejna
                const finalQuery = `status=banned_users&page=${page}${query ? `&search=${query}` : ""
                    }`;

                const data = await getUserDetails(token, finalQuery);

                const users = data?.data?.map((item: any) => item.user_details) || [];
                setUsers(users);

                setCurrentPage(data?.pagination?.current_page || 1);
                setTotalPages(data?.pagination?.last_page || 1);
                setTotalItems(data?.pagination?.total_items || 0);
            } catch (err: any) {
                showToast("error", err.message);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchData(searchTerm, currentPage); // ✅ always pass page with query
        }, [currentPage]);

        const handleSearch = () => {
            setCurrentPage(1); // search karte time page reset
            fetchData(searchTerm, 1);
        };

        const columns = [
            {
                key: "name",
                label: "User",
                sortable: true,
                render: (value: string, row: any) => (
                    <div className="flex items-center">

                        <div className="ml-3">
                            <p className="font-medium text-gray-900 dark:text-white">
                                {row?.name || row?.username}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {row?.email || "N/A"}
                            </p>
                        </div>
                    </div>
                ),
            },

            {
                key: "email",
                label: "Email",
                sortable: true,
            },
            { key: "user_status", label: "user status", sortable: true },

            {
                key: "country",
                label: "Country",
                sortable: true,
            },
            {
                key: "last_login",
                label: "Joined At",
                sortable: true,
                render: (value: string) =>
                    value ? new Date(value).toLocaleDateString() : "-",
            },
            {
                key: "actions",
                label: "Actions",
                render: (value: any, row: any) => (
                    <button
                        type="button"
                        className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none"
                        onClick={() =>
                            navigate(`/user-detail/${row.user_id}`, {
                                state: { data: row },
                            })
                        }                    >
                        Details
                    </button>
                ),
            },
        ];

        return (
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Banned Users
                    </h1>
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-1">
                            <input
                                type="text"
                                placeholder="Username / Email"
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

                <Table
                    columns={columns}
                    data={users}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    loading={loading}
                    totalItems={totalItems}
                />


                {/* Summary */}

            </div>
        );
    };
