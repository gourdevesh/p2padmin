import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const DeleteModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    return (
        <div
            className={`fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 transition-opacity  duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div
                className={`bg-white rounded-lg shadow-lg w-[90%]  bg-white dark:bg-gray-800  sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] mt-10 p-4 sm:p-6 transform transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b -mx-4 sm:-mx-6 pb-3">
                    <h2 className="text-[18px] sm:text-[20px] font-semibold mx-4 sm:mx-6">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700  dark:text-white mx-4 sm:mx-6 text-[16px]"
                    >
                        ✕
                    </button>
                </div>

                {/* Message */}
                <div className="mb-4 border-b pb-4 -mx-4 sm:-mx-6 dark:text-white"> 
                    <p className="text-gray-600 mx-4 sm:mx-6 text-[14px] sm:text-[15px] dark:text-white">
                        {message}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded hover:bg-gray-900 text-[13px] sm:text-[14px]"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 text-[13px] sm:text-[14px]"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
