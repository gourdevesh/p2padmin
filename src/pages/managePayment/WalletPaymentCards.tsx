import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, DollarSign, CreditCard, Usb } from "lucide-react";

const countries = ["USA", "UK", "India", "Canada", "Europe"];

const walletCards = [
  {
    title: "Global Payment",
    icon: Globe,
    gradient: "linear-gradient(135deg, #7e5bef, #4f46e5)",
    route: "/global-payment",
    options: ["PayPal", "Stripe", "Other"],
  },
  {
    title: "Currency Wise Payment",
    icon: DollarSign,
    gradient: "linear-gradient(135deg, #34d399, #3b82f6)",
    route: "/currency-payment",
    options: ["USD", "EUR", "INR"],
  },
  {
    title: "International Payment",
    icon: CreditCard,
    gradient: "linear-gradient(135deg, #ec4899, #ef4444)",
    route: "/international-payment",
    options: ["MasterCard", "Visa", "Amex"],
  },
  {
    title: "UPI Payment",
    icon: Usb,
    gradient: "linear-gradient(135deg, #facc15, #f97316)",
    route: "/upi-payment",
    options: ["PhonePe", "GPay", "Paytm"],
  },
];

const WalletPaymentCards = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Track edit state for each option individually
  const [editingOptions, setEditingOptions] = useState<{ [key: string]: { [option: string]: boolean } }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});

  const handleCheckboxChange = (cardTitle: string, option: string) => {
    setSelectedOptions((prev) => {
      const prevOptions = prev[cardTitle] || [];
      if (prevOptions.includes(option)) {
        return { ...prev, [cardTitle]: prevOptions.filter((o) => o !== option) };
      } else {
        return { ...prev, [cardTitle]: [...prevOptions, option] };
      }
    });
  };

  const toggleEdit = (cardTitle: string, option: string) => {
    setEditingOptions((prev) => ({
      ...prev,
      [cardTitle]: { ...prev[cardTitle], [option]: !prev[cardTitle]?.[option] },
    }));
  };

  const handleSave = (cardTitle: string, option: string) => {
    console.log(`✅ Saved ${option} for ${cardTitle}:`, selectedOptions[cardTitle]?.includes(option));
    toggleEdit(cardTitle, option);
    alert(`Saved ${option} for ${cardTitle}`);
  };

  return (
    <div className="max-w-xxl mx-auto  space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
        Wallet Payment
      </h1>

      {/* Country Dropdown */}
      <div className="mb-5 w-full">
        <label
          htmlFor="country"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          Select Country
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="rounded-md p-2 text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Wallet Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {walletCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl text-white shadow-lg w-60 cursor-pointer hover:scale-105 transition-transform`}
              style={{ background: card.gradient }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon size={36} />
                <h2 className="text-lg font-semibold">{card.title}</h2>
              </div>

              {/* Checkbox Options */}
              <div className="flex flex-col space-y-2 text-sm w-full">
                {card.options.map((option) => {
                  const isEditing = editingOptions[card.title]?.[option] || false;
                  return (
                    <div key={option} className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          disabled={!isEditing}
                          checked={selectedOptions[card.title]?.includes(option) || false}
                          onChange={() => handleCheckboxChange(card.title, option)}
                          className="w-4 h-4 accent-white"
                        />
                        <span>{option}</span>
                      </label>

                      {/* Edit/Save Button per checkbox */}
                      <button
                        onClick={() => (isEditing ? handleSave(card.title, option) : toggleEdit(card.title, option))}
                        className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700 transition"
                      >
                        {isEditing ? "Save" : "Edit"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Navigate Button */}
              <button
                onClick={() => navigate(card.route, { state: { country: selectedCountry } })}
                className="mt-4 px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition"
              >
                Go
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletPaymentCards;
