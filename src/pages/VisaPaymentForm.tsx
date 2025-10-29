import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VisaPaymentForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Visa Payment
        </h1>
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

      {/* Card */}
      <div className="max-w-xxl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-all duration-300 mt-7">
        {/* Card Holder Name */}
        <div className="mb-4 flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Card Holder Name
          </label>
          <input
            type="text"
            placeholder="Enter name on card"
            className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Card Number */}
        <div className="mb-4 flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Card Number
          </label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength={16}
            className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Expiry + CVV */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              CVV
            </label>
            <input
              type="password"
              placeholder="XXX"
              maxLength={3}
              className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Billing Address */}
        <div className="mb-4 flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Billing Address
          </label>
          <input
            type="text"
            placeholder="Enter billing address"
            className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all">
            Add Card
          </button>
        </div>
      </div>
    </>
  );
};

export default VisaPaymentForm;
