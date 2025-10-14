import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../../services/decryptService";
import { getSettingData } from "../../services/SettingService";
import { ArrowLeft } from "lucide-react";
interface TableRow {
  name: string;
  value: any;
  type: string;
  updatedBy?: string | null;
  status?: string;
}
export const Setting: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const res = await getSettingData(token);

      if (res?.data) {
        const decrypted = await decryptData(res.data, token);
        if (decrypted?.data) {
          const tableData = Object.keys(decrypted.data).map((key) => ({
            name: key,
            value: decrypted.data[key],
          }));
          setData(tableData);
        } else {
          setData([]);
        }
      } else {
        setData([]);
      }
    } catch (err: any) {
      showToast("error", err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);
  console.log("data", data)
  const columns = [
    { key: "name", label: "Setting", sortable: true },
    { key: "value", label: "Value", sortable: true },
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (_value: any, row: TableRow) => typeof row.value
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (_value: any, row: TableRow) => row.value === "enable" ? "Active" : "Inactive"
    },
    {
      key: "description",
      label: "Description",
      sortable: false,
      render: (_value: any, row: TableRow) => `Configuration for ${row.name}`
    },
  ];


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-row items-center justify-between flex-wrap">
        {/* Left side */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Settings
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

      {/* Table + Pagination */}
      <Table
        columns={columns}
        data={data}
        loading={loading}
      />
    </div>
  );
};
