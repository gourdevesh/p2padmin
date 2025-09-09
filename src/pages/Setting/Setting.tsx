import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../../services/decryptService";
import { getSettingData } from "../../services/SettingService";
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
  console.log("data",data)
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
    key: "updatedBy", 
    label: "Updated By", 
    sortable: true, 
    render: (_value: any, row: TableRow) => row.updatedBy || "-" 
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Setting
        </h1>
      <div className="flex items-center space-x-3">

</div>

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
