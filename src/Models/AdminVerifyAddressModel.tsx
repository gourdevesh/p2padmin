import React, { useState, useEffect } from "react";
import { updatePaymentStatus, updateUpitStatus } from "../services/ManagePayment";
import { showToast } from "../utils/toast";
import { updatEverifyAddress } from "../services/AdminVerificationDetails";

interface BankDetailsModalProps {
  isOpen: boolean;
  selectedData: any;
  onClose: () => void;
  onSuccess?: () => void;
  fetchData?: () => void; // ✅ add this line

}

const AdminVerifyAddressModel: React.FC<BankDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedData,
  onSuccess,
  fetchData
}) => {
  const [id, setId] = useState<number>(0);
  const [status, setStatus] = useState<string>("pending");
  const [remark, setRemark] = useState<string>("");
  const [loading, setLoading] = useState(false);

  console.log("selectedData", selectedData)

  useEffect(() => {
    if (isOpen && selectedData) {
      setId(selectedData.addVer_id || 0);
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

      // 👉 Prepare payload
      const payload: any = { id, status };

      // 👉 ONLY send remark if status is NOT verified or pending
      if (status !== "verified" && status !== "pending") {
        payload.remark = remark;
      }
      if (!remark) {
        showToast("error", "Remark is required when rejecting");
        return;
      }


      await updatEverifyAddress(token, payload);

      showToast("success", "Status updated successfully!");
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

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 text-left transform transition-all">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Address Verification
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
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Remark
            </label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Add optional remark"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
            />
          </div> */}

          {status === "reject" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Remark <span className="text-red-500">*</span>
              </label>
              <select
                required
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

export default AdminVerifyAddressModel;
