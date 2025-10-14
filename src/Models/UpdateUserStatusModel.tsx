import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../utils/toast";
import { updateUpitStatus } from "../services/ManagePayment";
import { updateUserStatusDetail } from "../services/userService";

interface UpdateUserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedData?: any; // expects { user_id: number, currentStatus: string }
  fetchUser: () => void;
}

const UpdateUserStatusModal: React.FC<UpdateUserStatusModalProps> = ({
  isOpen,
  selectedData,
  onClose,
  onSuccess,
  fetchUser
}) => {
  const userId = selectedData?.user_id;
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (selectedData?.user_status) {
      setStatus(selectedData.user_status);
    } else {
      setStatus("");
    }
  }, [selectedData]); const [loading, setLoading] = useState(false);

  console.log("selectedData", selectedData)
  const handleSubmit = async () => {
    if (!userId || !status) {
      showToast("error", "Please select a valid status");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken") || ""; // your token
      const user_id = String(userId)
            await updateUserStatusDetail(token, { user_id, status });
      showToast("success", "User status updated successfully!");
      fetchUser()
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      showToast("error", error.response?.data?.message || error.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] mt-10 p-4 sm:p-6 transform transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b -mx-4 sm:-mx-6 pb-3">
          <h2 className="text-[18px] sm:text-[20px] font-semibold mx-4 sm:mx-6 text-gray-800 dark:text-white">
            Update User Status
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
              User ID
            </label>
            <input
              type="text"
              value={userId}
              disabled
              className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="block">Block</option>
              <option value="terminate">Terminate</option>

            </select>
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
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-[14px] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserStatusModal;
