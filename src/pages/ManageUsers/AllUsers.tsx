import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Table } from "../../components/Table";
import { getUserDetails } from "../../services/userService";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { SidebarStatusCard } from "../../components/UserStatusCard";
import { Users } from "lucide-react";

export const AllUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate()

  console.log("users23", users)

  const fetchData = async (query: string = "", status: string = "", page: number = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      // ✅ Page query ke andar hi bhejna

      const finalQuery =
        `page=${page}` +
        `${query ? `&search=${query}` : ""}` +
        `${status ? `&status=${status}` : ""}`;

      const data = await getUserDetails(token, finalQuery);

      const analytics = data?.analytics;
      setAnalytics(analytics);

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
    fetchData(searchTerm, statusFilter, currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(searchTerm, statusFilter, 1);
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
    { key: "country", label: "Country", sortable: true },
    { key: "user_status", label: "user_status", sortable: true },
    {
      key: "email_verified",
      label: "Email Verified",
      sortable: true,
      render: (value: boolean) =>
        value ? (
          <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
            Verified
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded bg-red-500 text-white">
            Not Verified
          </span>
        )
    },
    {
      key: "phone_verified",
      label: "Phone Verified",
      sortable: true,
      render: (value: boolean) =>
        value ? (
          <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
            Verified
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded bg-red-500 text-white">
            Not Verified
          </span>
        )
    },
    {
      key: "id_verified",
      label: "ID Verified",
      sortable: true,
      render: (value: boolean) =>
        value ? (
          <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
            Verified
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded bg-red-500 text-white">
            Not Verified
          </span>
        )
    },
    {
      key: "address_verified",
      label: "Address Verified",
      sortable: true,
      render: (value: boolean) =>
        value ? (
          <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
            Verified
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded bg-red-500 text-white">
            Not Verified
          </span>
        )
    },

    {
      key: "twoFactorAuth",
      label: "twoFactorAuth",
      sortable: true,
      render: (value: boolean) =>
        value ? (
          <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
            Verified
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded bg-red-500 text-white">
            Not Verified
          </span>
        )
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
          }
        >
          Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SidebarStatusCard
          label="Email Unverified"
          count={analytics.total_email_unverifiedUsers}
          icon={Users}
          color="purple"
          path="/email-unverified"
        />

        <SidebarStatusCard
          label="Mobile Unverified"
          count={analytics.total_number_unverifiedUsers}

          icon={Users}
          color="blue"
          path="/mobile-unverified"
        />

        <SidebarStatusCard
          label="KYC Unverified"
          count={analytics.totalUnverifiedKycUsers}
          icon={Users}
          color="red"
          path="/kyc-unverified"
        />

        <SidebarStatusCard
          label="KYC Pending"
          count={analytics.totalPendingKyc}
          icon={Users}
          color="yellow"
          path="/kyc-pending"
        />
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Users
        </h1>
        <div className="flex items-center space-x-3">

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                const value = e.target.value;
                setStatusFilter(value);
                setCurrentPage(1);
                fetchData(searchTerm, value, 1);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>

              <option value="active_users">Active</option>
              <option value="banned_users">Blocked</option>

              <option value="unverified_email_users">Unverified Email</option>
              <option value="unverified_number_users">Unverified Number</option>

              <option value="unverified_kyc_users">Unverified KYC</option>
              <option value="pending_kyc_users">Pending KYC</option>
            </select>
          </div>

          {/* Search Box */}
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

      {/* Table + Pagination */}

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
