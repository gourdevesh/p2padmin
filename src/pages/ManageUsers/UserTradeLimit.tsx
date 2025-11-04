import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTradeLimit: React.FC = () => {
    const [unverifiedLimit, setUnverifiedLimit] = useState<number>(60000);
    const navigate = useNavigate();
    const handleSave = () => {

        alert(`✅ Settings Saved:
Unverified User Limit: ₹${unverifiedLimit}`);

        // TODO: send API call to backend (PUT /api/admin/trade-limit)
    };

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
                User Limit

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
            <div className="max-w-xxl mx-auto mt-5 bg-white rounded-2xl shadow-lg p-8">

                {/* Unverified User Limit */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Unverified User Limit
                    </label>
                    <input
                        type="number"
                        value={unverifiedLimit === 0 ? "" : unverifiedLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUnverifiedLimit(Number(e.target.value))
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Maximum trade  for users without ID verification:{" "}
                        <span className="font-semibold text-indigo-600">
                            ₹{unverifiedLimit.toLocaleString("en-IN")}
                        </span>
                    </p>
                </div>

                {/* Verified User Limit */}
                <div className="mb-6">


                    <p className="text-sm text-gray-500 mt-1">
                        Verified user limit:{" "}
                        <span className="font-semibold text-indigo-600">
                            Unlimited

                        </span>
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
                >
                    💾 Save
                </button>
            </div>
        </>
    );
};

export default UserTradeLimit;
