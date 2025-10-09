import React, { useState } from "react";

const GlobalPaymentForm = () => {
  const [method, setMethod] = useState("paypal");

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Global Payment Form
      </h2>

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
  );
};

export default GlobalPaymentForm;
