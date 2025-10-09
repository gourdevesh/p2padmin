import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CurrencyWisePaymentForm = () => {
  const [currency, setCurrency] = useState("USD");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white ">
          Currency Wise Payment
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

      <div className="max-w-xxl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mt-7">
        {/* Select Currency */}
        <label className="block mb-2 text-gray-700 dark:text-gray-300">
          Select Currency
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="USD">USD (America)</option>
          <option value="EUR">EUR (Europe)</option>
          <option value="INR">INR (India)</option>
        </select>

        {/* Dynamic Form Fields Based on Currency */}
        {currency === "INR" && (
          <div>
            <label className="block mb-2">Bank Name*</label>
            <input
              type="text"
              placeholder="Enter Bank Name"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">Account Holder Name*</label>
            <input
              type="text"
              placeholder="Enter Account Holder Name"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">Account Number*</label>
            <input
              type="text"
              placeholder="Enter Account Number"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">IFSC Code*</label>
            <input
              type="text"
              placeholder="Enter IFSC Code"
              className="w-full mb-4 p-2 border rounded-md"
            />

            {/* Percent Charge */}
            <label className="block mb-2">Transaction Charge (%)</label>
            <input
              type="number"
              placeholder="Enter percent charge"
              className="w-full mb-4 p-2 border rounded-md"
            />
          </div>
        )}

        {currency === "USD" && (
          <div>
            <label className="block mb-2">Bank Name*</label>
            <input
              type="text"
              placeholder="Enter Bank Name"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">Account Holder Name*</label>
            <input
              type="text"
              placeholder="Enter Account Holder Name"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">Account Number*</label>
            <input
              type="text"
              placeholder="Enter Account Number"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">Routing Number*</label>
            <input
              type="text"
              placeholder="Enter Routing Number (ABA)"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">SWIFT Code (Optional)</label>
            <input
              type="text"
              placeholder="Enter SWIFT Code"
              className="w-full mb-4 p-2 border rounded-md"
            />

            {/* Percent Charge */}
            <label className="block mb-2">Transaction Charge (%)</label>
            <input
              type="number"
              placeholder="Enter percent charge"
              className="w-full mb-4 p-2 border rounded-md"
            />
          </div>
        )}

        {currency === "EUR" && (
          <div>
            <label className="block mb-2">Bank Name*</label>
            <input
              type="text"
              placeholder="Enter Bank Name"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">Account Holder Name*</label>
            <input
              type="text"
              placeholder="Enter Account Holder Name"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">IBAN*</label>
            <input
              type="text"
              placeholder="Enter IBAN"
              className="w-full mb-4 p-2 border rounded-md"
            />

            <label className="block mb-2">SWIFT / BIC Code*</label>
            <input
              type="text"
              placeholder="Enter SWIFT / BIC Code"
              className="w-full mb-4 p-2 border rounded-md"
            />

            {/* Percent Charge */}
            <label className="block mb-2">Transaction Charge (%)</label>
            <input
              type="number"
              placeholder="Enter percent charge"
              className="w-full mb-4 p-2 border rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Submit
        </button>
      </div>
    </>
  );
};

export default CurrencyWisePaymentForm;
