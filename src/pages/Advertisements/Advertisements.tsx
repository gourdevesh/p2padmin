import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Table } from "../../components/Table";
import { getUserDetails } from "../../services/userService";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { DisableAdvertisement, getAdvertisements } from "../../services/AdvertisementsService";
import { decryptData } from "../../services/decryptService";
import DeleteModal from "../../Models/DeleteModel";
import DetailsModal from "../../Models/DetailsModal";

export const Advertisements

    : React.FC = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
        const [users, setUsers] = useState<any[]>([]);
        const [loading, setLoading] = useState(true);
        const [totalPages, setTotalPages] = useState(1);
        const [totalItems, setTotalItems] = useState(0);
        const [selectedAdDetails, setSelectedAdDetails] = useState<any | null>(null);
        const [isDetailsOpen, setIsDetailsOpen] = useState(false);

        const navigate = useNavigate()
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedAd, setSelectedAd] = useState<{ ad_id: number; is_active: number } | null>(null);

        const fetchData = async (query: string = "", page: number = 1) => {
            try {
                setLoading(true);
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("No auth token found");

                // ✅ Page query ke andar hi bhejna
                const finalQuery = `page=${page}${query ? `&search=${query}` : ""
                    }`;

                const data = await getAdvertisements(token, finalQuery);
                    setUsers(data?.data || {});

                // if (data?.data) {
                //     const decrypted = await decryptData(data?.data, token);
                //     setUsers(decrypted?.data || {});
                // }

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
        const handleConfirm = async () => {
            if (!selectedAd) return;

            try {
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("No auth token found");

                const result = await DisableAdvertisement({
                    ad_id: selectedAd.ad_id,
                    is_active: selectedAd.is_active ? "false" : "true", // toggle status
                    token,
                });

                if (result.status) {
                    showToast("success", result.message || "Advertisement status updated!");
                    setIsModalOpen(false);
                    fetchData(searchTerm, currentPage); // ✅ refresh table
                } else {
                    showToast("error", result.errors || result.message || "Failed to update");
                }
            } catch (err: any) {
                console.error("Failed to update advertisement", err);
                if (err.response?.data) {
                    const { message, errors } = err.response.data;
                    showToast("error", errors || message || "Something went wrong");
                } else {
                    showToast("error", err.message || "Something went wrong");
                }
            }
        };


        const columns = [
            {
                key: "user",
                label: "User",
                sortable: true,
                render: (value: any, row: any) => (
                    <div className="flex items-center">

                        <div className="ml-3">
                            <p className="font-medium text-gray-900 dark:text-white">
                                {row?.user?.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                @{row?.user?.username}
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                key: "transaction_type",
                label: "Type",
                sortable: true,
                render: (value: string) => (
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${value === "buy"
                            ? "text-blue-600 border border-blue-600"
                            : "text-orange-600 border border-orange-600"
                            }`}
                    >
                        {value === "buy" ? "Buy" : "Sell"}
                    </span>
                ),
            },
            {
                key: "payment_type",
                label: "Payment Method",
                sortable: true,
                render: (value: string, row: any) => (
                    <div>
                        <p className="font-medium">{row?.payment_method?.payment_method}</p>
                        <p className="text-xs text-gray-500">
                            {row?.preferred_currency?.toUpperCase()}
                        </p>
                    </div>
                ),
            },
            {
                key: "offer_time_limit",
                label: "Payment Window | Margin",
                sortable: true,
                render: (value: number, row: any) => (
                    <div>
                        <p>{value} Minutes</p>
                        <p
                            className={`text-xs ${row?.pricing_type === "fixed_price"
                                ? "text-orange-500"
                                : "text-blue-500"
                                }`}
                        >
                            {row?.pricing_type === "fixed_price"
                                ? "Fixed"
                                : `Margin: ${row?.offer_margin || 0}%`}
                        </p>
                    </div>
                ),
            },
            {
                key: "price",
                label: "Rate",
                sortable: true,
                render: (value: string, row: any) => (
                    <p>
                        {value} {row?.price_currency?.toUpperCase()} /{" "}
                        {row?.cryptocurrency?.toUpperCase()}
                    </p>
                ),
            },
            {
                key: "is_accepted",
                label: "Published",
                sortable: true,
                render: (value: number) =>
                    value ? (
                        <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                        <span className="text-red-600 font-medium">No</span>
                    ),
            },
            {
                key: "is_active",
                label: "Status",
                sortable: true,
                render: (value: number) =>
                    value ? (
                        <span className="text-green-600 font-medium">Enabled</span>
                    ) : (
                        <span className="text-red-600 font-medium">Disabled</span>
                    ),
            },
            {
                key: "actions",
                label: "Actions",
                render: (value: any, row: any) => (
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                            onClick={() => {
                                setSelectedAdDetails(row); // pass full row details
                                setIsDetailsOpen(true);   // open modal
                            }}
                        >
                            Details
                        </button>

                        <button
                            type="button"
                            className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded-md hover:bg-red-50"
                            onClick={() => {
                                setSelectedAd({ ad_id: row.crypto_ad_id, is_active: row.is_active });
                                setIsModalOpen(true); // modal kholne ke liye
                            }}
                        >
                            {row.is_active ? "Disable" : "Enable"}
                        </button>


                    </div>
                ),
            },
        ];

        return (
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Advertisements
                    </h1>
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-1">
                            <input
                                type="text"
                                placeholder=""
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
                    <DeleteModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirm}
                        title="Confirmation Alert!"
                        message="Are you sure to disable this ad?"
                    />
                    <DetailsModal
                        isOpen={isDetailsOpen}
                        onClose={() => setIsDetailsOpen(false)}
                        data={selectedAdDetails}
                    />
                </div>

                {/* Users Table */}

                <Table
                    columns={columns}
                    data={users}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    loading={loading}
                    totalItems={totalItems}
                />



            </div>

        );
    };
