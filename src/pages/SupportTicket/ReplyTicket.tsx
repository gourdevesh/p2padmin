import React, { useState } from "react";
import { Paperclip, Trash2, ArrowLeft, CircleFadingPlus, X } from "lucide-react";
import { closeSupportTicket, replySupportTicket } from "../../services/ReplyTicketService";
import { showToast } from "../../utils/toast";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "../../Models/DeleteModel";

interface TicketReply {
  id: number;
  name: string;
  username: string;
  message: string;
  postedAt: string;
  attachments?: string[];
}

interface TicketProps {
  ticket_id: string;
  subject: string;
  status: "open" | "pending" | "in-progress" | "resolved" | "closed";
  replies: TicketReply[];
  onClose: () => void;
  onReply: (message: string) => void;
}
interface FileInput {
  id: number;
  file?: File;
}
const MAX_FILES = 5;
const MAX_TOTAL_SIZE = 128 * 1024 * 1024; // 128MB
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "pdf", "doc", "docx"];

export const ReplyTicket: React.FC<TicketProps> = ({
  ticket_id,
  subject,
  status,
  replies,
  onClose,
  onReply,
}) => {
  const [message, setMessage] = useState("");
  const [fileInputs, setFileInputs] = useState<FileInput[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { ticket_number } = location.state || {};
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const result = await closeSupportTicket({
        ticket_id: Number(ticket_id),
        token,
      });

      if (result.status) {
        showToast("success", result.message || "Ticket closed successfully!");
        setIsModalOpen(false);
      } else {
        showToast("error", result.errors || result.message || "Failed to close ticket");
      }
    } catch (err: any) {
      console.error("Failed to close ticket", err);
      if (err.response?.data) {
        const { message, errors } = err.response.data;
        showToast("error", errors || message || "Something went wrong");
      } else {
        showToast("error", err.message || "Something went wrong");
      }
    }
  };


  const addFileInput = () => {
    if (fileInputs.length >= MAX_FILES) return;
    setFileInputs([...fileInputs, { id: Date.now() }]);
  };

  const removeFileInput = (id: number) => {
    setFileInputs(fileInputs.filter((input) => input.id !== id));
  };

  const handleFileChange = (id: number, file?: File) => {
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      alert(`File type not allowed. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`);
      return;
    }

    const totalSize = fileInputs.reduce(
      (sum, input) => sum + (input.file?.size || 0),
      0
    ) + file.size;

    if (totalSize > MAX_TOTAL_SIZE) {
      alert("Total upload size exceeds 128MB.");
      return;
    }

    setFileInputs(
      fileInputs.map((input) =>
        input.id === id ? { ...input, file } : input
      )
    );
  };


  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReply = async () => {
    if (!message.trim()) {
      showToast("warning", "Please enter a message.");
      return;
    }
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");
    try {
      setLoading(true)
      const attachments = fileInputs.map((input) => input.file!).filter(Boolean);

      const response = await replySupportTicket({
        ticket_id: Number(ticket_id),
        message,
        attachments,
        token,
      });

      console.log("Reply sent:", response);
      showToast("success", response.message || "Reply sent successfully! ");
      setMessage("");
      setFileInputs([]);
      onReply(message);
    } catch (err) {
      console.error("Failed to send reply:", err);
      alert("Failed to send reply.");
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between p-4 gap-3 flex-wrap">
        {/* Left side */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Reply Ticket
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
      <div className="mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-3 md:space-y-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                status
              )}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <h2 className="font-semibold text-base sm:text-lg dark:text-white">
              [Ticket#{ticket_number}] {subject}
            </h2>
          </div>
          <div className="w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm flex items-center justify-center"
            >
              X Close Ticket
            </button>
            <DeleteModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirm}
              title="Close Support Ticket!"
              message="Are you want to close this support ticket?"
            />
          </div>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 text-sm sm:text-base"
          rows={4}
          placeholder="Enter reply here"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <div className="flex flex-col md:flex-row items-start md:items-start gap-4 w-full">
          {/* Left: Add Attachment + note */}
          <div className="flex-1 w-full">
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded mb-2 w-full sm:w-auto justify-center"
              onClick={addFileInput}
              disabled={fileInputs.length >= MAX_FILES}
            >
              <span>+ Add Attachment</span>
            </button>

            <p className="text-xs text-gray-500 mb-2">
              Max 5 files | Max size 128MB | Allowed: .jpg, .jpeg, .png, .pdf, .doc, .docx
            </p>

            {/* File Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
              {fileInputs.map((input) => (
                <div
                  key={input.id}
                  className="flex items-center border rounded-lg overflow-hidden bg-white dark:bg-gray-700"
                >
                  {/* File name display and Choose file button */}
                  <label className="flex-1 flex items-center px-3 py-2 cursor-pointer">
                    <span className="truncate text-sm text-gray-700 dark:text-gray-200">
                      {input.file ? input.file.name : "No file chosen"}
                    </span>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(input.id, e.target.files?.[0])}
                      className="hidden"
                    />
                  </label>

                  {/* Remove button */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 font-bold"
                    onClick={() => removeFileInput(input.id)}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Reply Button */}
          <div className="flex-shrink-0 self-stretch w-full sm:w-auto">
            <button
              onClick={handleReply}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded w-full sm:w-48 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Reply"
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="border border-blue-400 dark:border-blue-600 rounded p-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {reply.name} ({reply.username})
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {reply.postedAt}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{reply.message}</p>
              {reply.attachments && reply.attachments.length > 0 && (
                <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-2">
                  {reply.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={file}
                      target="_blank"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <Paperclip size={16} className="mr-1" />
                      Attachment {index + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>

  );
};
