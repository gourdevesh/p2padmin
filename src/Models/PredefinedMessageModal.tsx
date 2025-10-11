import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

interface PredefinedMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  predefinedMessages?: string[];
}

const PredefinedMessageModal: React.FC<PredefinedMessageModalProps> = ({
  isOpen,
  onClose,
  onSend,
  predefinedMessages = [
    "Hello, your order is being processed.",
    "Please provide the required documents.",
    "Your dispute has been resolved.",
  ],
}) => {
  const [selectedMessage, setSelectedMessage] = useState("");

  const handleSend = () => {
    if (!selectedMessage) return;
    onSend(selectedMessage);
    setSelectedMessage(""); // reset
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 transition-opacity" />
        </Transition.Child>

        {/* Centered Panel */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-2 sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 -translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-6"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-xl transition-all text-left p-4 sm:p-6">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-white">
                    Send Message
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Dropdown with full-width border */}
                <div className="mb-3 border-b border-gray-200 dark:border-gray-700 pb-3 -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <label className="block text-gray-600 dark:text-white mb-1 font-medium text-sm">
                    Select Message
                  </label>
                  <select
                    value={selectedMessage}
                    onChange={(e) => setSelectedMessage(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="">-- Choose a message --</option>
                    {predefinedMessages.map((msg, idx) => (
                      <option key={idx} value={msg}>
                        {msg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="bg-gray-800 text-white px-3 py-1.5 rounded-lg hover:bg-gray-900 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Send
                  </button>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PredefinedMessageModal;
