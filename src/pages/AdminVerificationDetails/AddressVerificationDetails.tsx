import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { getAddressVerificationDetails } from "../../services/AdminVerificationDetails";
import { showToast } from "../../utils/toast";
import AdminVerifyAddressModel from "../../Models/AdminVerifyAddressModel";

export const AddressVerificationDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(""); // ✅ status filter
  const [addressDetails, setAddressDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (status: string = "", page: number = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const finalQuery = `page=${page}${status ? `&status=${status}` : ""}`;
      const data = await getAddressVerificationDetails(token, finalQuery);

      setAddressDetails(data?.data || []);
      setCurrentPage(data?.pagination?.current_page || 1);
      setTotalPages(data?.pagination?.last_page || 1);
      setTotalItems(data?.pagination?.total || 0);
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(statusFilter, currentPage);
  }, [currentPage, statusFilter]);


  const handleUpdateClick = (row: any) => {
    setSelectedData(row);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };


  const columns = [
    { key: "doc_type", label: "Document Type", sortable: true },
    { key: "residence_country", label: "Country", sortable: true },
    { key: "residence_State", label: "State", sortable: true },
    { key: "address_line1", label: "Address Line 1" },
 {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium capitalize ${
          value === "verified"
            ? "bg-green-100 text-green-700"
            : value === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : value === "rejected"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {value}
      </span>
    ),
  },    { key: "remark", label: "Remark" },
    {
      key: "action",
      label: "Action",
      sortable: false,
      render: (value: any, row: any) => (
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
      {isModalOpen && (
        <AdminVerifyAddressModel
          isOpen={isModalOpen}
          selectedData={selectedData}
          onClose={handleCloseModal}
          fetchData={fetchData}
        />
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Address Verification Details
        </h1>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <label
            htmlFor="status"
            className="text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            Status:
          </label>
          <select
            id="status"
            className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => {
              setCurrentPage(1); // reset page on filter change
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="reject">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table + Pagination */}
      <Table
        columns={columns}
        data={addressDetails}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={loading}
        totalItems={totalItems}
      />
    </div>
  );
};
