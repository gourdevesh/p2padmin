import React, { useState } from "react";
import { adminResolveDispute } from "../services/SupportTicketService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ReleaseCryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  trade_id: number;
  buyerName?: string;
}

const ReleaseCryptoModal: React.FC<ReleaseCryptoModalProps> = ({
  isOpen,
  onClose,
  
  trade_id,
  buyerName,
}) => {
  const [method, setMethod] = useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleConfirm = async () => {
    setLoading(true);

    try {
      const response = await adminResolveDispute({
        trade_id: trade_id, // camelCase
        decision: method,
      });

      if (response?.status === true) {
        toast.success("Crypto released successfully!");
        onClose();
        navigate("/disputes")
      } else {
        toast.error(response?.message || "Something went wrong!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Release Crypto
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-white">
            ✕
          </button>
        </div>

        <p className="mb-4 text-gray-600 dark:text-white">
          Are you sure you want to release crypto to  This action is irreversible.
        </p>

        <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-white">
          Decision (Winner):
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as "buyer" | "seller")}
          className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white mb-4"
        >
          <option value="buyer">Decision in favour of Buyer</option>
          <option value="seller">Decision in favour of Seller</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseCryptoModal;
