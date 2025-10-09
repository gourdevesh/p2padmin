import React, { useState, useRef, ChangeEvent } from "react";
import { CreditCard, Smartphone, DollarSign } from "lucide-react";

const walletIcons: { [key: string]: any } = {
    phonepe: Smartphone,
    gpay: DollarSign,
    paytm: CreditCard,
};

const UpiPaymentForm: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);

    const triggerFileSelect = () => inputRef.current?.click();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-lg">UPI Payment </span>
            </div>

            {/* Wallet Type */}
            <div className="mb-4 flex flex-col">
                <label className="mb-1 text-sm font-medium">Wallet Type</label>
                <select className="border rounded-md p-2">
                    <option>UPI</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                </select>
            </div>

            {/* Wallet Name */}
            <div className="mb-4 flex flex-col">
                <label className="mb-1 text-sm font-medium">Wallet Name</label>
                <select className="border rounded-md p-2">
                    <option>PhonePe</option>
                    <option>GPay</option>
                    <option>Paytm</option>
                    <option>Amazon Pay</option>
                </select>
            </div>

            {/* UPI ID */}
            <div className="mb-4 flex flex-col">
                <label className="mb-1 text-sm font-medium">UPI ID</label>
                <input
                    type="text"
                    placeholder="Enter your UPI ID"
                    className="border rounded-md p-2"
                />
            </div>

            {/* Caption */}
            <div className="mb-4 flex flex-col">
                <label className="mb-1 text-sm font-medium">Caption</label>
                <input
                    type="text"
                    placeholder="Reference name"
                    className="border rounded-md p-2"
                />
            </div>

            {/* Primary Checkbox */}
            <div className="mb-4 flex items-center gap-2">
                <input type="checkbox" id="primary" className="w-4 h-4" />
                <label htmlFor="primary" className="text-sm">
                    Set as Primary
                </label>
            </div>

            {/* QR Upload */}
            <div className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <button
                    type="button"
                    onClick={triggerFileSelect}
                    className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
                >
                    Upload QR
                </button>
                {image && (
                    <img
                        src={image}
                        alt="QR Preview"
                        className="mt-2 max-w-xs rounded-md mx-auto"
                    />
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button className="flex-1 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">
                    Add
                </button>
            </div>
        </div>
    );
};

export default UpiPaymentForm;
