import React from 'react';
import { User, CreditCard } from 'lucide-react';

interface Message {
  id?: string;
  from: string;
  message: string;
  time: string;
}

interface Dispute {
  reporter: string;
  reported: string;
  tradeId: string;
  crypto: string;
  amount: number;
  price: number;
  status: string;
  Category?: string;
}

export const DisputeDetail: React.FC = () => {
  // Static dispute data
  const dispute: Dispute = {
    reporter: 'Alice',
    reported: 'Bob',
    tradeId: '435',
    crypto: 'BTC',
    amount: 0.05,
    price: 2500,
    status: 'pending',
    Category: 'Exchange',
  };

  // Static messages data
  const messages: Message[] = [
    { id: '1', from: 'Reporter', message: 'Payment not received yet.', time: '09:32 AM' },
    { id: '2', from: 'Reported', message: 'I have sent the payment.', time: '09:35 AM' },
    { id: '3', from: 'Reporter', message: 'Still not reflected.', time: '09:40 AM' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
      {/* Top Header with Gradient */}
      <div style={{marginTop:"-24px"}} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl   md:mt-0 md:-mx-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Reporter & Reported */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 w-full">
            <div className="flex items-center space-x-2 mb-3 sm:mb-0">
              <User size={24} className="opacity-90" />
              <div>
                <p className="text-xs opacity-80">Reporter</p>
                <p className="text-lg font-bold">{dispute.reporter}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <User size={24} className="opacity-90" />
              <div>
                <p className="text-xs opacity-80">Reported</p>
                <p className="text-lg font-bold">{dispute.reported}</p>
              </div>
            </div>
          </div>

          {/* Trade ID */}
<div className="flex items-center space-x-2">
  <CreditCard size={24} className="opacity-90" />
  <div className="flex flex-col justify-center leading-tight">
    <p className="text-xs opacity-80">Trade_id</p>
    <p className="text-lg font-bold">{dispute.tradeId}</p>
  </div>
</div>


        </div>
      </div>

      {/* Trade Details */}
      <div
        className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 py-4 bg-gray-50 dark:bg-gray-800 text-sm rounded-lg"
        style={{ margin: window.innerWidth < 640 ? -16 : 0 }}
      >
        <div>
          <p className="font-medium text-gray-600 dark:text-gray-300">Crypto</p>
          <p className="text-gray-900 dark:text-white font-semibold">{dispute.crypto}</p>
        </div>
        <div>
          <p className="font-medium text-gray-600 dark:text-gray-300">Category</p>
          <p className="text-gray-900 dark:text-white font-semibold">{dispute.Category ?? '—'}</p>
        </div>
        <div>
          <p className="font-medium text-gray-600 dark:text-gray-300">Amount</p>
          <p className="text-gray-900 dark:text-white font-semibold">{dispute.amount} BTC</p>
        </div>
        <div>
          <p className="font-medium text-gray-600 dark:text-gray-300">Price</p>
          <p className="text-gray-900 dark:text-white font-semibold">${dispute.price}</p>
        </div>
        <div>
          <p className="font-medium text-gray-600 dark:text-gray-300">Status</p>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              dispute.status === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : dispute.status === 'resolved'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {dispute.status}
          </span>
        </div>
      </div>

      {/* Messages Section */}
      <div className="space-y-3">
        <p className="font-medium text-gray-700 dark:text-gray-300">Messages</p>
        <div className="flex flex-col space-y-3 max-h-80 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg text-sm max-w-[80%] ${
                msg.from === 'Reporter'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 self-start'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 self-end'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{msg.from}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
              </div>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
