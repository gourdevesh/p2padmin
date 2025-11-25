import React, { useState } from "react";
import { Search } from "lucide-react";
import { Table } from "../../components/Table";
import { useNavigate } from "react-router-dom";

export const NewUserRegistration: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const [totalPages] = useState(1);
  const [totalItems] = useState(3);

  const navigate = useNavigate();

  // Static Dummy Data
  const users = [
    {
      user_id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      country: "India",
      last_login: "2024-10-01T10:30:00Z",
    },
    {
      user_id: 2,
      name: "Neha Verma",
      email: "neha.verma@example.com",
      country: "India",
      last_login: "2024-09-28T15:20:00Z",
    },
    {
      user_id: 3,
      name: "John Doe",
      email: "john.doe@example.com",
      country: "USA",
      last_login: "2024-09-20T09:45:00Z",
    },
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  // Navigate to Registration Data Page
  const handleNavigateToRegistrationForm = (row: any) => {
    navigate("/app/users/registration-data", {
      state: { selectedUser: row },
    });
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
              {row?.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {row?.email || "N/A"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "country",
      label: "Country",
      sortable: true,
    },
    {
      key: "last_login",
      label: "Verified On",
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
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          New User Registration
        </h1>
        <div className="flex items-center space-x-3">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Search by name or email"
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
