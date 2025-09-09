import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table"; // assuming you have a Table component
import { Search } from "lucide-react";
import { getPaymentDetail, getUpiDetail } from "../../services/ManagePayment";
import { showToast } from "../../utils/toast";
import { decryptData } from "../../services/decryptService";
import PaymentUpdateStatusModel from "../../Models/PayemtUpdateStatusModel";
import UpdateUPIStatusModel from "../../Models/UpdateUPIStatusModel";

interface PaymentType {
    pd_id: number;
    user_id: number;
    account_type: string;
    bank_account_country: string;
    currency: string;
    bank_name: string;
    account_holder_name: string;
    custom_bank_details: string;
    ifsc_code: string;
    account_number: string;
    status: string;
    created_at: string;
}

const UPIDetails: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [PaymentDetails, setPaymentDetail] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({
        id: "",
        user_id: "",
        account_type: "",
        status: "",
    });


    const fetchData = async (query: string = "", page: number = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const finalQuery = `page=${page}${query ? `&${query}` : ""}`;

            const data = await getUpiDetail(token, finalQuery);

            if (data?.upi_details) {
                const decrypted = await decryptData(data?.upi_details, token);
                setPaymentDetail(decrypted?.data || {});
            }
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
        fetchData(searchTerm, currentPage);
    }, [currentPage]);

    const handleFilter = async () => {
        let queryParams = new URLSearchParams();
        if (filters.id) queryParams.append("id", filters.id);
        if (filters.user_id) queryParams.append("user_id", filters.user_id);
        if (filters.account_type) queryParams.append("account_type", filters.account_type);
        if (filters.status) queryParams.append("status", filters.status);
        fetchData(queryParams.toString(), 1);
    };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<number | null>(null);

  // 🔹 Click handler to open modal with ID
  const handleUpdateClick = (row: any) => {
    setSelectedData(row);
    setIsModalOpen(true);
  };


const columns = [
    {
        key: "upi_name",
        label: "UPI Name",
        sortable: true,
    },
    {
        key: "upi_id",
        label: "UPI ID",
        sortable: true,
    },
    {
        key: "qr_code_url",
        label: "QR Code",
        render: (value: string) => (
            <img src={value} alt="QR Code" className="h-12 w-12 object-contain" />
        ),
    },
    {
        key: "caption",
        label: "Caption",
        sortable: true,
    },
    {
        key: "is_primary",
        label: "Primary",
        render: (value: number) => (
            <span className={`px-2 py-1 rounded-full text-white ${value === 1 ? "bg-green-500" : "bg-gray-500"}`}>
                {value === 1 ? "Yes" : "No"}
            </span>
        ),
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        render: (value: string) => (
            <span className={`px-2 py-1 rounded-full text-white ${
                value === "pending"
                    ? "bg-yellow-500"
                    : value === "verified"
                    ? "bg-green-500"
                    : "bg-red-500"
            }`}>
                {value}
            </span>
        ),
    },
    {
        key: "created_at",
        label: "Created At",
        sortable: true,
        render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
        key: "actions",
        label: "Actions",
        render: (value: any, row: PaymentType) => (
            <button
                type="button"
                className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none"
                onClick={() => handleUpdateClick(row)}
            >
                Update
            </button>
        ),
    },
];


    return (
        <div className="space-y-6">
            <h2 className="font-bold text-lg mt-2"> Upi Details</h2>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Filter Upi Details
                </h2>

                {/* Filters in one row full width */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    {/* ID */}
                    <input
                        type="text"
                        placeholder="ID"
                        value={filters.id}
                        onChange={(e) => setFilters({ ...filters, id: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    {/* User ID */}
                    <input
                        type="text"
                        placeholder="User ID"
                        value={filters.user_id}
                        onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    {/* Account Type */}
                    <select
                        value={filters.account_type}
                        onChange={(e) => setFilters({ ...filters, account_type: e.target.value })}
                        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Account Type</option>
                        <option value="personal">Personal</option>
                        <option value="business">Business</option>
                        <option value="saving">Saving</option>
                    </select>

                    {/* Status */}
                 <select
  value={filters.status}
  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
  className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
>
  <option value="">Status</option>
  <option value="pending"> Pending</option>
  <option value="verified"> Verified</option>
  <option value="reject">Rejected</option>
</select>


                    {/* Apply Button */}
                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 w-full bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                        Apply
                    </button>

                    {/* Reset Button */}
                    <button
                        onClick={() => {
                            setFilters({ id: "", user_id: "", account_type: "", status: "" });
                            fetchData("", 1); // reset पर default data reload
                        }}
                        className="px-4 py-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 
               dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>

            </div>



            {/* Payment Table */}
            <Table
                columns={columns}
                data={PaymentDetails}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                loading={loading}
                totalItems={PaymentDetails.length}
            />
             <UpdateUPIStatusModel
        isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)} 
  selectedData ={selectedData}
  onSuccess ={fetchData}
      />
        </div>
    );
};

export default UPIDetails;
