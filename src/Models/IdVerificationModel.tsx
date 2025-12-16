import React, { useState, useEffect } from "react";
import { updatePaymentStatus, updateUpitStatus } from "../services/ManagePayment";
import { showToast } from "../utils/toast";
import { idVerificationDetails, updatEverifyAddress } from "../services/AdminVerificationDetails";

interface BankDetailsModalProps {
  isOpen: boolean;
  selectedData: any;
  onClose: () => void;
  onSuccess?: () => void;
  fetchData?: () => void;
}

const IdVerificationModel: React.FC<BankDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedData,
  onSuccess,
  fetchData
}) => {
  const [id, setId] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [loading, setLoading] = useState(false);

  console.log("selectedData", selectedData)

  useEffect(() => {
    if (isOpen && selectedData) {
      setId(selectedData.address_id || 0);
      setStatus(selectedData.status || "pending");
      setRemark(selectedData.remark || "");
    }
  }, [isOpen, selectedData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      // Prepare payload
      const payload: any = { id, status };

      // ❌ Do NOT send remark if status = pending or verified
      if (status !== "pending" && status !== "verified") {
        payload.remark = remark;  // only for rejected or others
      }

      await idVerificationDetails(token, payload);

      showToast("success", "updated successfully!");
      onSuccess?.();
      onClose();
      fetchData?.();

    } 
 catch (err: any) {
   const backendError =
     err.response?.data?.errors?.status?.[0] || // nested error
     err.response?.data?.message ||             // main backend message
     err.message ||                             // JS error
     "Failed to update status";
 
   showToast("error", backendError);
 
   }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 text-left transform transition-all">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Id Verification  <span className="text-red-500">*</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ID */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Bank Detail ID
            </label>
            <input
              type="number"
              value={id}
              readOnly
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending" disabled>Pending</option>
              <option value="verified">Verified</option>
              <option value="reject">Reject</option>
            </select>
          </div>

          {/* Remark */}
          {status === "reject" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Remark
              </label>
              <select
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select reason for rejection</option>
                <option value="Incomplete details">Incomplete details</option>
                <option value="Invalid document">Invalid document</option>
                <option value="Blurred image">Blurred image</option>
                <option value="Wrong category selected">Wrong category selected</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}


          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdVerificationModel;
