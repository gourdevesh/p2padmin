import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalPaymentForm = () => {
  const [method, setMethod] = useState("paypal");
  const navigate = useNavigate()

  return (
       <>
      <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white ">
          Global Payment
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
   

      {/* Payment Method */}
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
        Select Payment Method
      </label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="paypal">PayPal</option>
        <option value="skrill">Skrill</option>
      </select>

      {/* PayPal Form */}
      {method === "paypal" && (
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            PayPal Email*
          </label>
          <input
            type="email"
            placeholder="Enter PayPal email"
            className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />

          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Currency*
          </label>
          <select className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>
      )}

      {/* Skrill Form */}
      {method === "skrill" && (
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Skrill Email*
          </label>
          <input
            type="email"
            placeholder="Enter Skrill email"
            className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />

          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Account ID (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter Skrill account ID"
            className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />

          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Currency*
          </label>
          <select className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white">
            <option>USD</option>
            <option>EUR</option>
            <option>INR</option>
          </select>
        </div>
      )}

      {/* Submit */}
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Submit
      </button>
    </div>
    </>
  );
};

export default GlobalPaymentForm;
