import React, { useEffect, useState } from 'react';
import { User, CreditCard } from 'lucide-react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './Config/firebaseConfig';

interface Media {
  url: string;
  type: string;
  name?: string;
  uploadedDate?: string;
  customProperties?: any;
}

interface UserData {
  id: string;
  firstName?: string;
  role?: string; // 'buyer' or 'seller'
}

interface Message {
  id: string;
  user?: UserData;
  text?: string;
  createdAt?: string; // assuming string ISO format
  medias?: Media[];
  role?: string; // 'buyer' or 'seller'
}

interface Dispute {
  reporter: string;
  reported: string;
  tradeId: string;
  crypto: string;
  amount: number;
  price: number;
  status: string;
}

export const DisputeDetail: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const tradeId = "tradeId:455";

  // Example static dispute data
  const dispute: Dispute = {
    reporter: 'mukesh rai',
    reported: 'Devashish Rajbhar',
    tradeId: '445',
    crypto: 'BTC',
    amount: 0.25,
    price: 35000,
    status: 'pending',
  };

  useEffect(() => {
    if (!tradeId) return;

    const messagesRef = collection(db, "UserToUserChats", tradeId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Message));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [tradeId]);

  console.log("messawgwdedisput",messages)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">

      {/* Users */}
      <div className="flex justify-between items-center p-4 rounded-xl 
bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500      shadow-md">

        <div className="flex items-center space-x-6">
          {/* Reporter */}
          <div className="flex items-center space-x-2">
            <User size={24} className="text-white" />
            <div>
              <p className="text-sm text-white/70 ">Reporter</p>
              <p className="text-lg font-semibold text-white ">{dispute.reporter}</p>
            </div>
          </div>

          {/* Reported */}
          <div className="flex items-center space-x-2">
            <User size={24} className="text-white dark:text-blue-200" />
            <div>
              <p className="text-sm text-white/70 ">Reported</p>
              <p className="text-lg font-semibold text-white ">{dispute.reported}</p>
            </div>
          </div>
        </div>

        {/* Trade ID */}
        <div className="flex items-center space-x-4">
          <CreditCard size={24} className="text-white/80 dark:text-blue-200" />
          <div>
            <p className="text-sm text-white/70 ">Trade ID</p>
            <p className="text-lg font-semibold text-white ">{dispute.tradeId}</p>
          </div>
        </div>
      </div>

      {/* Trade/Crypto Details */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700  p-4 rounded-xl bg-gradient-to-r from-teal-100 to-cyan-200
  mt-4">
        <div>
          <p className="font-medium">Crypto</p>
          <p>{dispute.crypto}</p>
        </div>
        <div>
          <p className="font-medium">Amount</p>
          <p>{dispute.amount} BTC</p>
        </div>
        <div>
          <p className="font-medium">Price</p>
          <p>${dispute.price}</p>
        </div>
        <div>
          <p className="font-medium">Status</p>
          <p className="capitalize">{dispute.status}</p>
        </div>
      </div>


      {/* Messages */}
      <div className="space-y-3">
        <p className="font-medium text-gray-700 dark:text-gray-300">Messages</p>
        <div className="space-y-2 max-h-80 overflow-y-auto flex flex-col">
          {messages.map((msg) => {
            const isCurrentUser = msg?.user?.role === "buyer" // replace with your current user id

            return (
              <div
                key={msg.id}
                className={`p-3 rounded-lg text-sm max-w-[70%] ${isCurrentUser
                  ? "bg-blue-50 dark:bg-blue text-blue-700 dark:text-black self-end"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 self-start"
                  }`}
              >
                {/* User name */}
                <div className="mb-1">
                  <span className="font-medium">{msg.user?.firstName || "Unknown"}</span>
                  <span className="text-xs text-gray-500 ml-2">{ msg?.user?.role}</span>
                </div>

                {/* Text message */}
                {msg.text && <p>{msg.text}</p>}

                {/* Media files */}
                {msg.medias?.map((media: Media, idx: number) => {
                  if (media.type === "image") {
                    const src = media.url.startsWith("data:")
                      ? media.url
                      : `data:image/png;base64,${media.url}`;
                    return (
                      <img
                        key={idx}
                        src={src}
                        alt={media.name || "image"}
                        className="mt-2 rounded max-w-full max-h-60"
                      />
                    );
                  }
                  return null;
                })}

                {/* Timestamp at bottom */}
                {msg?.createdAt && (
                  <div className="mt-1 text-right">
                    <span className="text-xs text-black-500 ">
                      {new Date(msg.createdAt).toLocaleString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}


              </div>

            );
          })}
        </div>
      </div>
    </div>
  );
};
