import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../../services/decryptService";
import { getSettingData } from "../../services/SettingService";
import { ArrowLeft } from "lucide-react";
import { Button } from "@headlessui/react";
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
              setData(Array.isArray(res?.data) ? res.data : res?.data ? [res.data] : []);

      // if (res?.data) {
      //   const decrypted = await decryptData(res.data, token);
      //   setData(Array.isArray(decrypted?.data) ? decrypted.data : decrypted?.data ? [decrypted.data] : []);
      // }
      // else {
      //   setData([]);
      // }
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
    { key: "depositStatus", label: "depositStatus", sortable: true },
    { key: "max_withdraw", label: "maxWithdraw", sortable: true },
        { key: "min_withdraw", label: "min withdraw", sortable: true },

    {
      key: "user_registration",
      label: "user_registration",
      sortable: true,
    },
    {
      key: "withdrawType",
      label: "withdrawType",
      sortable: true,
    },

    {
      key: "trade_fee_type",
      label: "trade_fee_type",
      sortable: true,
    },
    {
      key: "withdrawStatus",
      label: "withdrawStatus",
      sortable: true,
    },
    {
      key: "trade_fee",
      label: "trade_fee",
      sortable: false,
    },

    {
      key: "action",
      label: "Action",
      sortable: false,
      render: (_value: any, row: TableRow) => (
        <button
          type="button"
          className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none"
          onClick={() => navigate("/update-setting", { state: { rowData: row } })}
        >
          Update
        </button>
      ),
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
