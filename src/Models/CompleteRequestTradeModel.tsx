import React, { useState } from "react";
import axios from "axios";
import { completeTrade } from "../services/TradeHistory";
import { showToast } from "../utils/toast";

interface CompleteTradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    selectedData?: any;
}

const CompleteTradeModal: React.FC<CompleteTradeModalProps> = ({
    isOpen,
    selectedData,
    onClose,
    onSuccess,
}) => {
    const tradeId = selectedData?.trade_id ;
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    console.log("selectedData", selectedData);

    const handleSubmit = async () => {
     
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const data = await completeTrade(token, tradeId, amount);
            showToast("success", "Trade completed successfully!");
            if (onSuccess) onSuccess();
            onClose(); 
        } catch (error: any) {
            showToast("error", error.message || "Failed to complete trade");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className={`fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] mt-10 p-4 sm:p-6 transform transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b -mx-4 sm:-mx-6 pb-3">
                    <h2 className="text-[18px] sm:text-[20px] font-semibold mx-4 sm:mx-6 text-gray-800 dark:text-white">
                        Complete Trade
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-white mx-4 sm:mx-6 text-[16px]"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Trade ID
                        </label>
                        <input
                            type="text"
                            value={tradeId}
                            disabled
                            placeholder="Enter trade ID"
                            className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 text-[14px]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-[14px] ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteTradeModal;
