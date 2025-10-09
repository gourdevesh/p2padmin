import React from "react";

interface DetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any | null;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;
    console.log("data", data);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto p-2 sm:p-4:dark:bg-black dark:bg-opacity-70">
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 font-sans p-4 sm:p-6">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2 mb-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Advertisement Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Details Grid */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Add color for Type */}
                    <DetailRow
                        label="Type"
                        value={
                            <span
                                className={`px-2 py-1 font-semibold rounded ${data.transaction_type === "Buy"
                                        ? "bg-green-100 text-green-700"
                                        : data.transaction_type === "Sell"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {data.transaction_type}
                            </span>
                        }
                    />
                    <DetailRow label="Crypto Currency" value={data.cryptocurrency} />
                    <DetailRow label="Fiat Currency" value={data.price_currency} />
                    <DetailRow label="Payment Methods" value={data.payment_method?.payment_method} />
                    <DetailRow label="Payment Window" value={`${data.offer_time_limit} Minutes`} />

                    {/* Add color for Margin */}
                    <DetailRow
                        label="Margin"
                        value={
                            <span
                                className={`px-2 py-1 font-semibold rounded ${data.offer_margin && data.offer_margin > 0
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {data.offer_margin ? `Margin: ${data.offer_margin}%` : "Fixed"}
                            </span>
                        }
                    />

                    <DetailRow label="Minimum Limit" value={data.min_trade_limit} />
                    <DetailRow label="Maximum Limit" value={data.max_trade_limit} />
                    <DetailRow label="Rate" value={`${data.price} ${data.price_currency?.toUpperCase()} / ${data.cryptocurrency?.toUpperCase()}`} />
                    <DetailRow
                        label="Status"
                        value={
                            <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${data.is_active
                                    ? "bg-green-100 text-green-700 border border-green-300"
                                    : "bg-red-100 text-red-700 border border-red-300"
                                    }`}
                            >
                                {data.is_active ? "Enabled" : "Disabled"}
                            </span>
                        }
                    />
                    <DetailRow label="Payment Details" value={data?.payment_method?.payment_details?.upi_name || "-"} />
                    <DetailRow label="Terms Of Trades" value={data.offer_terms || "-"} />
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;

// 🔹 Reusable row component
const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-center py-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{label}</span>
        <span className="text-gray-900 dark:text-white text-sm text-right">{value}</span>
    </div>
);
