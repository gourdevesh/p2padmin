import React, { useState, useRef, ChangeEvent } from "react";
import { CreditCard, Smartphone, DollarSign, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const walletIcons: { [key: string]: any } = {
  phonepe: Smartphone,
  gpay: DollarSign,
  paytm: CreditCard,
};

const UpiPaymentForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const triggerFileSelect = () => inputRef.current?.click();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (

   <>
      <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white ">
UPI Payment
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

    <div className="max-w-xxl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-all duration-300 mt-7">
   
      {/* Wallet Type */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Wallet Type
        </label>
        <select className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none">
          <option>UPI</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
        </select>
      </div>

      {/* Wallet Name */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Wallet Name
        </label>
        <select className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none">
          <option>PhonePe</option>
          <option>GPay</option>
          <option>Paytm</option>
          <option>Amazon Pay</option>
        </select>
      </div>

      {/* UPI ID */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          UPI ID
        </label>
        <input
          type="text"
          placeholder="Enter your UPI ID"
          className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Caption */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Caption
        </label>
        <input
          type="text"
          placeholder="Reference name"
          className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Primary Checkbox */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="primary"
          className="w-4 h-4 accent-indigo-600 dark:accent-indigo-500"
        />
        <label
          htmlFor="primary"
          className="text-sm text-gray-800 dark:text-gray-300"
        >
          Set as Primary
        </label>
      </div>

      {/* QR Upload */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button
          type="button"
          onClick={triggerFileSelect}
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all"
        >
          Upload QR
        </button>
        {image && (
          <img
            src={image}
            alt="QR Preview"
            className="mt-3 max-w-xs rounded-md mx-auto border dark:border-gray-700"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
          Cancel
        </button>
        <button className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all">
          Add
        </button>
      </div>
    </div>
    </>
  );
};

export default UpiPaymentForm;
