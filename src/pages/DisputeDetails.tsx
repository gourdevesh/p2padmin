import React, { useEffect, useState } from "react";
import { User, CreditCard, ArrowLeft } from "lucide-react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { Dialog } from "@headlessui/react";
import { db } from "./Config/firebaseConfig";
import PredefinedMessageModal from "../Models/PredefinedMessageModal";
import { useCryptoOption } from "./Store/cryptoOption";
import { getTransactionDetails } from "../services/TransactionService";
import { decryptData } from "../services/decryptService";
import CancelTradeModal from "../Models/CandelTradeModel";
import NewTradeModal from "../Models/NewTradeModal";
import { cancelTrade } from "../services/TradeHistory";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useCryptoOptions } from "./Store/cryptoOption2";
import { cancelTradeByAdmin, closeDisputeByAdmin, resertNewTrade, sendEvidenceRequired, sendSystemMessageAPI } from "../services/SupportTicketService";
import ReleaseCryptoModal from "../Models/ReleaseCryptoModal";
import { showToast } from "../utils/toast";

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
  createdAt?: string;
  medias?: Media[];
  role?: string;
}

interface Dispute {
  reporter: string;
  reported: string;
  tradeId: string;
  crypto: string;
  amount: number;
  price: number;
  status: string;
  result: string; // 'reporter' or 'reported'
}

export const DisputeDetail: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();

  const row = location.state?.row;
  console.log("rowdeatils", row)
  const tradeId = `tradeId:${row?.trade_details?.trade_id}`;
  console.log("tradeId22", tradeId)
  const dispute = {
    // Reporter → ticket बनाने वाला
    reporter: row?.reporter_details?.username || "Unknown",

    // Reported → buyer या seller में से दूसरा user
    reported: row?.reported_details?.username,
    // Trade details
    tradeId: row?.trade_details?.trade_id || "N/A",
    crypto: row?.trade_details?.asset || "N/A",

    // Trade amount values (your schema → amount = crypto, buy_value = fiat)
    amount: row?.trade_details?.amount || 0,
    price: row?.trade_details?.buy_value || 0,

    // Ticket/Trade Status
    status: row?.status || "pending",
    result: row?.result || "pending"
  };



  useEffect(() => {
    if (!tradeId) return;

    const messagesRef = collection(db, "UserToUserChats", tradeId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Message)
      );
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [tradeId]);

  // ---------------- Admin Modals ----------------
  const predefinedMessages = [
    "We have received your dispute, please wait for review.",
    "Payment proof verified, please release crypto.",
    "Dispute resolved. Funds will be released shortly.",
  ];

  const [openPredefinedModal, setOpenPredefinedModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const [openReleaseModal, setOpenReleaseModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [result, setResult] = useState("buyer");
  const [openCancelModal, setOpenCancelModal] = React.useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);   // ✔ REQUIRED
  const [disloading, setDisLoading] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTradeId, setSelectedTradeId] = useState<number | null>(null);
  const [tradeInfo, setTradeInfo] = useState<{
    amount: string;
    assetValue: string;
    cryptocurrency: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrade = async (tradeData: any) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token") || "";

      const selectedTradeId = row?.trade_details?.trade_id;
      if (!selectedTradeId) {
        showToast("error", "❌ No trade selected to cancel.");
        return;
      }

      const confirmCancel = window.confirm(
        "⚠️ Are you sure you want to cancel the previous trade?"
      );
      if (!confirmCancel) return;

      // 🚫 --- CANCEL API  CALL ---
      const cancelRes = await cancelTradeByAdmin(selectedTradeId, token);

      // ❌ Agar cancel API FAIL ho → Aage ka code NA CHALE
      if (!cancelRes || cancelRes.status !== true) {
        showToast("error", cancelRes?.message || "❌ Trade cancellation failed!");
        return;
      }

      // ✅ Cancel success
      showToast("success", "Previous trade cancelled successfully.");

      // 🆕 Ask for new trade only after cancel success
      const confirmNewTrade = window.confirm(
        "🆕 Do you want to start a new trade with updated amount & crypto?"
      );
      if (!confirmNewTrade) return;

      showToast("info", "⏳ Creating new trade...");

      // 🚫 --- NEW TRADE CREATION ---
      const newTradeRes = await resertNewTrade(selectedTradeId, tradeData, token);

      // ❌ Agar new trade fail → Stop
      if (!newTradeRes || newTradeRes.status !== true) {
        showToast("error", newTradeRes?.message || "❌ Failed to create new trade!");
        return;
      }

      await sendSystemMessage("⚠️ Previous trade cancelled by admin.");
      await sendSystemMessage("🆕 Admin has started a new trade with updated amount & crypto.");

      setTradeInfo(tradeData);

      showToast("success", "✅ New trade created successfully!");
      navigate("/disputes")
      // Close modal AFTER both processes succeed
      setOpenCancelModal(false);

    } catch (error: any) {
      console.error("Error handling trade:", error);
      showToast("error", error?.message || "❌ Something went wrong while creating a new trade.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleCancelTrade = () => {
    setOpenCancelModal(true);

  }

  const handleSendPredefinedMessage = async () => {
    if (!selectedMessage || !selectedTradeId || !selectedUserId) return;

    try {
      setOpenPredefinedModal(false); // close modal immediately
      const token = localStorage.getItem("token") || ""; // or your auth token source

      const response = await sendSystemMessageAPI(
        selectedTradeId,
        selectedUserId,
        token,
        selectedMessage
      );

      console.log("Message sent successfully:", response);
      toast.success("Message sent successfully"); // optional notification
    } catch (error: any) {
      console.error("Failed to send message:", error);
      toast.error(error.message || "Failed to send message"); // optional error notification
    } finally {
      setSelectedMessage(""); // reset selected message
    }
  };

  const handleReleaseCrypto = () => {
    console.log("Crypto released to buyer ✅");
    setOpenReleaseModal(false);
    toast.success("Crypto released to buyer successfully!");
  };

  const handleSaveResult = () => {
    console.log("Dispute Result Marked:", result);
    // 🔹 TODO: API call to save result
    setOpenResultModal(false);
  };

  // ---------------- Component Render ----------------


  const cryptoOption = useCryptoOption(row?.reported_details?.user_id);
  const cryptoOptions = useCryptoOptions();


  console.log("cryptoOption", cryptoOption)
  const [tradeData, setTradeData] = useState<any>(null);

  const fetchData = async (query: string = "", page: number = 1) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const finalQuery = `page=${page}${query ? `&${query}` : ""}`;
      const data = await getTransactionDetails(token, finalQuery);

      if (data?.data) {
        const decrypted = await decryptData(data?.data, token);

        setTradeData(decrypted?.data || []);
      }
    } catch (err: any) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendSystemMessage = async (text: string) => {
    if (!tradeId) return;
    try {
      const messageRef = collection(db, "UserToUserChats", tradeId, "messages");
      const timestamp = new Date().toISOString();
      await addDoc(messageRef, {
        text,
        createdAt: timestamp,
        user: {
          firstName: "System",
          role: "admin",
        },
        type: "system",
      });
      console.log("System message sent ✅");
    } catch (error) {
      console.error("Error sending system message:", error);
    }
  };


  const requestEvidenceEmail = async () => {
    try {
      setLoading(true); // start loading
      const payload = {
        trade_id: dispute.tradeId,
        user_id: row?.reporter_details?.user_id, // or reported_details depending on who should receive email
        evidence_deadline_hours: 24, // deadline in hours
      };

      const data = await sendEvidenceRequired(payload); // axios call returns data directly
      console.log()
      if (data.status) {
        showToast("success", "Evidence request email sent successfully!")
        await sendSystemMessage(
          "⚠️ Admin requested additional evidence for this dispute."
        );
      } else {
        showToast("error", data.message);
      }
    } catch (error: any) {
      console.error("Error sending evidence email:", error);
      showToast("error", "Something went wrong");
    }
    finally {
      setLoading(false); // stop loading
    }
  };

  const handleOpenMessageModal = (userId: number, tradeId: number) => {
    setSelectedUserId(userId);
    setSelectedTradeId(tradeId);
    setOpenPredefinedModal(true);
  };


  return (
    <>
      <div className="flex flex-row items-center justify-between  flex-wrap mb-3">
        {/* Left side */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Dispute Details
        </h1>

        {/* Right side */}
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

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">

        {/* Users */}
        <div className=" p-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            {/* Reporter & Reported */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full md:w-auto">

              {/* Reporter */}
              <div className="flex items-center gap-2 min-w-0">
                <User size={24} className="text-white" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center">
                    <p className="text-sm text-white/70">Reporter</p>

                    <span className="ml-2 bg-gray-700/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {row?.reporter_details?.role === "seller" ? "Seller" : "Buyer"}
                    </span>
                    <button
                      className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-lg"
                      onClick={() =>
                        handleOpenMessageModal(row.reporter_details?.user_id, dispute.tradeId)
                      }                    >
                      Message
                    </button>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-lg font-semibold text-white truncate">{dispute.reporter}</p>
                    <p className="ml-3 text-xs text-white">
                      Total: ₹{dispute.price}
                    </p>

                    {dispute.result === "buyer" && (
                      <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">Win</span>
                    )}
                    {dispute.result === "seller" && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">Lose</span>
                    )}


                  </div>
                </div>
              </div>

              {/* Reported */}
              <div className="flex items-center gap-3 min-w-0">
                <User size={24} className="text-white" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center ">
                    <p className="text-sm text-white/70">Reported</p>


                    <span className="ml-2 bg-gray-700/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {row?.reported_details?.role === "seller" ? "Seller" : "Buyer"}
                    </span>
                    <button
                      className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg"
                      onClick={() =>
                        handleOpenMessageModal(row.reported_details?.user_id, dispute.tradeId)
                      }
                    >
                      Message
                    </button>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-lg font-semibold text-white truncate">{dispute.reported}</p>
                    <p className="ml-3 text-xs text-white font-medium">
                      Total: ₹{dispute.price}
                    </p>

                    {dispute.result === "seller" && (
                      <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">Win</span>
                    )}
                    {dispute.result === "buyer" && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">Lose</span>
                    )}

                  </div>
                </div>
              </div>

            </div>

            <ReleaseCryptoModal
              isOpen={openReleaseModal}
              onClose={() => setOpenReleaseModal(false)}
              trade_id={Number(dispute.tradeId)}
              buyerName={dispute.reporter}

            />
            <PredefinedMessageModal
              isOpen={openPredefinedModal}
              onClose={() => setOpenPredefinedModal(false)}
              userId={selectedUserId}
              tradeId={tradeId}
              trade_id={selectedTradeId ?? 0} />

            {/* Trade ID & Release Button */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-2 md:mt-0 md:justify-end">
              {/* Trade Info */}
              <div className="flex items-center gap-2">
                <CreditCard size={24} className="text-white/80" />
                <div>
                  <p className="text-sm text-white/70">Trade_ID</p>
                  <p className="text-lg font-semibold text-white truncate">
                    {dispute.tradeId}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex flex-wrap gap-2">
                <button
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                  onClick={() => setOpenReleaseModal(true)}
                >
                  Release Crypto
                </button>

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                  onClick={handleCancelTrade}
                >
                  close dispute
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                  onClick={() => setIsModalOpen(true)}
                >
                  New Trade
                </button>
                <button
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                  onClick={requestEvidenceEmail}
                >
                  {loading ? "Sending..." : "Request Evidence"}
                </button>

              </div>
            </div>
            <NewTradeModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onTrade={handleTrade}
              isLoading={isLoading}

            />
            <CancelTradeModal
              isOpen={openCancelModal}
              disloading={disloading}
              onClose={() => setOpenCancelModal(false)}
              onConfirm={async () => {
                if (!window.confirm("⚠️ Are you sure you want to cancel this trade?")) return;

                try {
                  setDisLoading(true)
                  const token = localStorage.getItem("authToken") || "";
                  // ===== CALL YOUR API =====
                  const response = await closeDisputeByAdmin(row.ticket_id, token || "");
                  toast.success("✅ dispute close successfully!");
                  navigate("/dispute")
                  // ===== OPTIONAL: SEND CHAT MESSAGE =====
                  await sendSystemMessage("⚠️ Admin has cancelled this trade due to dispute resolution.");


                  setTradeInfo(null);
                  setOpenCancelModal(false);

                } catch (err: any) {
                  toast.error(`❌ ${err.message || "Something went wrong"}`);
                }
                finally {
                  setDisLoading(false)
                }
              }}

            />

          </div>
        </div>

        {tradeInfo && (
          <div className="mt-8 max-full  dark:bg-gray-700 
                                     text-gray-800 dark:text-gray-200 bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              📊 Trade Summary
            </h3>

            <div className="space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span className="font-medium">💰 Amount (INR):</span>
                <span className="font-semibold text-gray-900">
                  ₹{tradeInfo.amount}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="font-medium">🪙 Cryptocurrency:</span>
                <span className="font-semibold text-gray-900 uppercase">
                  {tradeInfo.cryptocurrency}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="font-medium">📦 Asset Value:</span>
                <span className="font-semibold text-green-600">
                  {tradeInfo.assetValue}
                </span>
              </p>
            </div>

            <div className="mt-5 text-sm text-gray-500 border-t pt-3">
              Trade started successfully. View status in your dashboard 🚀
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
          {/* ✅ First Crypto Holdings Card */}
          <div className="bg-white p-5 rounded-xl shadow-md overflow-x-auto dark:bg-gray-700 dark:text-gray-200">
            <h2 className="font-semibold text-lg mb-3">
              Crypto Holdings —   <span className="text-indigo-600 dark:text-white">
                {row?.reporter_details?.username}</span>
            </h2>
            <table className="w-full text-sm border border-gray-200 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th className="p-2 text-left">Coin</th>
                  <th className="p-2 text-left">Symbol</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                {cryptoOptions.map((h, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-2">{h.shrotName}</td>
                    <td className="p-2">{h.name}</td>
                    <td className="p-2">{h.blc.toFixed(8)}</td>
                    <td className="p-2">₹ {h.pricePerCoin.toLocaleString("en-IN")}</td>
                    <td className="p-2">
                      ₹ {(h.currentPrice * h.blc).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Second Crypto Holdings Card */}
          <div className="bg-white p-5 rounded-xl shadow-md overflow-x-auto dark:bg-gray-700 dark:text-gray-200">
            <h2 className="font-semibold text-lg mb-3">
              Crypto Holdings —   <span className="text-indigo-600 dark:text-white">
                {row?.reported_details?.username}</span>
            </h2>
            <table className="w-full text-sm border border-gray-200 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th className="p-2 text-left">Coin</th>
                  <th className="p-2 text-left">Symbol</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                {cryptoOption.map((h, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-2">{h.shrotName}</td>
                    <td className="p-2">{h.shrotName}</td>
                    <td className="p-2">{Number(h.blc ?? 0).toFixed(8)}</td>
                    <td className="p-2">₹ {h.pricePerCoin}</td>
                    <td className="p-2">₹ {((h.currentPrice ?? 0) * (h.blc ?? 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>





        {/* Trade/Crypto Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700 p-4 rounded-xl bg-gradient-to-r from-teal-100 to-cyan-200 mt-4">
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
              const isCurrentUser = msg?.user?.role === "buyer"; // adjust later

              return (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg text-sm max-w-[70%] ${isCurrentUser
                    ? "bg-blue-50 text-blue-700 self-end"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 self-start"
                    }`}
                >
                  {/* User name */}
                  <div className="mb-1">
                    <span className="font-medium">
                      {msg.user?.firstName || "Unknown"}
                    </span>
                    <span className="text-xs  ml-2 ">
                      {msg?.user?.role}
                    </span>
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

                  {/* Timestamp */}
                  {msg?.createdAt && (
                    <div className="mt-1 text-right">
                      <span className="text-xs ">
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


        <Dialog
          open={openResultModal}
          onClose={() => setOpenResultModal(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm w-full">
              <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-white">
                Mark Dispute Result
              </Dialog.Title>

              <div className="space-y-3 mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="result"
                    value="buyer"
                    onChange={() => setResult("buyer")}
                    checked={result === "buyer"}
                  />
                  <span>Buyer Profited</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="result"
                    value="seller"
                    onChange={() => setResult("seller")}
                    checked={result === "seller"}
                  />
                  <span>Seller Profited</span>
                </label>
              </div>

              <div className="flex justify-end mt-6 space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setOpenResultModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                  onClick={handleSaveResult}
                >
                  Save
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </>
  );
};
