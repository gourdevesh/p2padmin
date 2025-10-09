// InternationalPaymentForm.tsx
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const countries = ["United States", "United Kingdom", "India", "Canada", "Australia"];
const currencies = ["USD", "EUR", "INR", "GBP", "AUD"];
const accountTypes = ["BUSINESS", "PERSONAL"];

const InternationalPaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    currency: "",
    accountType: "BUSINESS",
    bankName: "",
    accountHolder: "",
    customDetails: "",
    ifsc: "",
    accountNumber: "",
    swift: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    const requiredFields = ["country", "currency", "bankName", "accountHolder", "ifsc", "accountNumber"];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill ${field}`);
        return;
      }
    }
    console.log("Form Submitted:", formData);
    // TODO: send data to API
  };

  return (
       <>
      <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white ">
International Payment
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

    <div className="max-w-xxl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-7">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Bank Account Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Currency*</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Currency</option>
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>

        {/* Account Type */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Account Type*</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accountTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Bank Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Bank Name*</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Enter bank name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Account Holder's Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Account Holder's Name*</label>
          <input
            type="text"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleChange}
            placeholder="Enter account holder's name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Custom Bank Details (Optional) */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Custom Bank Details (Optional)</label>
          <textarea
            name="customDetails"
            value={formData.customDetails}
            onChange={handleChange}
            placeholder="Add any other bank details if needed"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* IFSC */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">IFSC*</label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            placeholder="Enter IFSC code"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Account Number*</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Enter account number"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* SWIFT / BIC Code (Optional) */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">SWIFT / BIC Code (Optional)</label>
          <input
            type="text"
            name="swift"
            value={formData.swift}
            onChange={handleChange}
            placeholder="Enter SWIFT / BIC code"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Payment
        </button>
      </form>
    </div>
    </>
  );
};

export default InternationalPaymentForm;
