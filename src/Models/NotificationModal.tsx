import React, { useState } from "react";

interface NotificationModalProps {
    isOpen: boolean;
    selectedData:any;
    onClose: () => void;
    onSubmit: (formData: {
        title: string;
        message: string;
        type: string;
        user_id: string;
    }) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    selectedData,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "Admin_announcement",
        user_id: selectedData?.user_id
    });
          if (!isOpen) return null; 


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
                {/* Header */}
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Send Notification
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter notification title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Write your message..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="Admin_announcement">Admin Announcement</option>
                            <option value="System_alert">System Alert</option>
                            <option value="User_message">User Message</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">User ID</label>
                        <input
                        disabled
                            type="text"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotificationModal;
