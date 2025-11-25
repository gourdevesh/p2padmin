import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Table } from "../../components/Table";
import { getUserDetails } from "../../services/userService";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { getAssetsDetails } from "../../services/AssetsDetailsService";
import { decryptData } from "../../services/decryptService";
import { getAdmin } from "../../services/AdminService";

export const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [assetsDetails, setAssetsDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [role, setRole] = useState(""); // ✅ role state added
  const navigate = useNavigate();

  const fetchData = async (query: string = "", page: number = 1, selectedRole: string = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      // ✅ Build query with role
      const finalQuery = `page=${page}${query ? `&search=${query}` : ""
        }${selectedRole ? `&role=${selectedRole}` : ""}`;

      const data = await getAdmin(token, finalQuery);
              setAssetsDetails(data?.data || {});


      // if (data?.data) {
      //   const decrypted = await decryptData(data?.data, token);
      //   setAssetsDetails(decrypted?.data || {});
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
    fetchData(searchTerm, currentPage, role); // ✅ include role
  }, [currentPage, role]); // ✅ re-fetch on role change

  const columns = [
    {
      key: "name",
      label: "name",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">
              {row?.name}
            </p>
          </div>
        </div>
      ),
    },
    { key: "role", label: "role", sortable: true },
    { key: "email", label: "email", sortable: true },
    { key: "admin_status", label: "admin_status", sortable: true },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin
        </h1>
        <div className="flex items-center space-x-3">
          {/* Role Select */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="role"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Role:
            </label>
            <select
              id="role"
              className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => {
                setCurrentPage(1); 
                setRole(e.target.value);
              }}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="sub_admin">Sub Admin</option>
            </select>
          </div>

          {/* Add Admin Button */}
          <button
            onClick={() => navigate("/add-admin")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Admin
          </button>
        </div>

      </div>

      {/* Table + Pagination */}
      <Table
        columns={columns}
        data={assetsDetails}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={loading}
        totalItems={totalItems}
      />
    </div>
  );
};
