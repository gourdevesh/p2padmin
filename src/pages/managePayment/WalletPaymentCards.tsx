import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Select from "react-select";

interface PaymentMethod {
  id: number;
  country: string;
  countryName: string;
  text: string;
}

const WalletPaymentCards: React.FC = () => {
  const navigate = useNavigate();

  // ✅ react-select ke format me options
  const countries = [
    { value: "IN", label: "India" },
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
    { value: "CA", label: "Canada" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [paymentText, setPaymentText] = useState("");
  const [methods, setMethods] = useState<PaymentMethod[]>([]);

  const addMethod = () => {
    const trimmed = paymentText.trim();
    if (!trimmed) return;
    if (!selectedCountry) return;

    const newMethod: PaymentMethod = {
      id: Date.now(),
      country: selectedCountry.value,
      countryName: selectedCountry.label,
      text: trimmed,
    };

    setMethods((prev) => [newMethod, ...prev]);
    setPaymentText("");
  };

  const removeMethod = (id: number) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMethod();
    }
  };



  return (
    <div className="max-w-xxl mx-auto space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-row items-center justify-between flex-wrap">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Payment Method
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 
            text-gray-800 dark:text-gray-200 font-medium rounded-md shadow-sm 
            border border-gray-300 dark:border-gray-600 hover:bg-gray-200 
            dark:hover:bg-gray-600 transition-colors duration-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:ring-offset-1 justify-center text-sm"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </button>
      </div>

      {/* ✅ Dropdown + Input + Add Button */}
      <div className="flex gap-2 items-center">
        <Select
          value={selectedCountry}
          onChange={(value) => setSelectedCountry(value!)}
          options={countries}
          placeholder="Select a country..."
          isSearchable
          className="flex-1 basis-0 dark:text-black"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "42px",
              borderColor: "#d1d5db",
              boxShadow: "none",
              "&:hover": { borderColor: "#9ca3af" },
            }),
          }}
        />

        <input
          type="text"
          placeholder="Enter payment method (e.g., UPI, PayPal)"
          value={paymentText}
          onChange={(e) => setPaymentText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 basis-0 border rounded p-2  dark:text-black"
        />

        <button
          onClick={addMethod}
          aria-label="Add payment method"
          className="px-3 py-2 rounded bg-green-600 text-white font-medium hover:opacity-90"
        >
          +
        </button>
      </div>

      {/* ✅ List of added methods */}
      <div className="mt-4">
        {methods.length === 0 ? (
          <p className="text-sm text-gray-500">
            No payment methods added yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {methods.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between border rounded p-2 cursor-pointer hover:bg-gray-50"
              >
                <div

                  className="flex flex-col flex-1"
                >
                  <div className="text-sm font-medium">{m.text}</div>
                  <div className="text-xs text-gray-500">
                    {m.countryName} ({m.country})
                  </div>
                </div>

                <button
                  onClick={() => removeMethod(m.id)}
                  aria-label={`Remove ${m.text}`}
                  className="px-3 py-1 rounded bg-red-600 text-white font-medium hover:bg-red-700"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WalletPaymentCards;
