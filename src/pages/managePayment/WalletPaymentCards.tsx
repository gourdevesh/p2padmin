import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe, DollarSign, CreditCard, Usb } from "lucide-react";

const walletCards = [
  { title: "Global Payment", icon: Globe, gradient: "linear-gradient(135deg, #7e5bef, #4f46e5)", route: "/global-payment" },
  { title: "Currency Wise Payment", icon: DollarSign, gradient: "linear-gradient(135deg, #34d399, #3b82f6)", route: "/currency-payment" },
  { title: "International Payment", icon: CreditCard, gradient: "linear-gradient(135deg, #ec4899, #ef4444)", route: "/international-payment" },
  { title: "UPI Payment", icon: Usb, gradient: "linear-gradient(135deg, #facc15, #f97316)", route: "/upi-payment" },
];

const WalletPaymentCards = () => {
  const navigate = useNavigate();

  return (
    <>    
       <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5"> Wallet Payment</h1>
    
    <div className="flex flex-wrap gap-6 justify-center">
      {walletCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            onClick={() => navigate(card.route)}
            className="flex flex-col items-center justify-center p-5 rounded-2xl text-white shadow-lg w-64 h-44 cursor-pointer hover:scale-105 transition-transform"
            style={{ background: card.gradient }}
          >
            <Icon size={36} className="mb-3" />
            <h2 className="text-lg font-semibold text-center">{card.title}</h2>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default WalletPaymentCards;
