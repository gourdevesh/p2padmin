import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../../services/decryptService";
import { getSettingData } from "../../services/SettingService";
import { ArrowLeft } from "lucide-react";
import { Button } from "@headlessui/react";
import { getFeedBack } from "../../services/feedbackService";

export const FeedBack: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const res = await getFeedBack(token) || "";

            setData(res.data);

        } catch (error: any) {
            const apiError = error.response?.data;

            if (apiError?.errors) {
                const formattedErrors: string[] = [];
                for (const key in apiError.errors) {
                    formattedErrors.push(apiError.errors[key][0]);
                }
                showToast("error", formattedErrors.join(""));
            } else {
                showToast("error", apiError?.message || error.message || "Something went wrong");
            }
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
        { key: "maxWithdraw", label: "maxWithdraw", sortable: true },
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

        // {
        //   key: "action",
        //   label: "Action",
        //   sortable: false,
        //   render: (_value: any, row: TableRow) => (
        //     <button
        //       type="button"
        //       className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none"
        //       onClick={() => navigate("/update-setting", { state: { rowData: row } })}
        //     >
        //       Update
        //     </button>
        //   ),
        // },

    ];


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-row items-center justify-between flex-wrap">
                {/* Left side */}
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    FeedBack
                </h1>

                {/* Right side */}
                <button
                    onClick={() => navigate("/create-feedback")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Create FeedBack
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
