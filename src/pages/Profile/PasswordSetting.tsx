import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showToast } from "../../utils/toast";
import { updatePassword } from "../../services/ProfileService";
import { Eye, EyeOff, Settings, User } from "lucide-react"; // 👈 import icons
import { useNavigate } from "react-router-dom";
import { profile } from "console";

export const PasswordSetting: React.FC = () => {
    const { admin } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("Current password is required"),
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
            .required("Confirm password is required"),
    });

    const handleSubmit = async (
        values: any,
        { setErrors, resetForm }: { setErrors: (errors: Record<string, string>) => void; resetForm: () => void }
    ) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await updatePassword(token, {
                current_password: values.currentPassword,
                new_password: values.newPassword,
            });

            showToast("success", data.message || "Password updated successfully");
            resetForm()
        } catch (err: any) {
            if (err.errors) {
                const formikErrors: Record<string, string> = {};
                const allMessages: string[] = [];

                for (const key in err.errors) {
                    const message = err.errors[key].join(", ");
                    allMessages.push(message);

                    formikErrors[
                        key === "current_password"
                            ? "currentPassword"
                            : key === "new_password"
                                ? "newPassword"
                                : key
                    ] = message;
                }

                showToast("error", allMessages.join(" | "));
                setErrors(formikErrors);
            } else {
                const errorMsg = err.message || "Failed to update password";
                showToast("error", errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Admin Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 w-full lg:w-1/3 h-[270px] overflow-hidden">
                <div className="flex items-center bg-blue-600 dark:bg-blue-700 p-4">
                    <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                        <img
                            src={admin?.profile_image}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"

                        />                      </div>
                    <div className="ml-4 text-white">
                        <h2 className="text-lg font-semibold">{admin?.role}</h2>
                        <p className="text-sm">{admin?.username}</p>
                    </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 px-4 py-2">
                        <span className="font-medium">Name</span>
                        <span className="font-semibold">{admin?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 px-4 py-2">
                        <span className="font-medium">role</span>
                        <span className="font-semibold">{admin?.role}</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                        <span className="font-medium">Email</span>
                        <span className="font-semibold">{admin?.email}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex-1">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"> Change Password</h1>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 text-white transition" onClick={() => navigate("/profile")}>
                            <User size={16} />
                            <span className="text-sm font-medium">profile Setting</span>
                        </button>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
                            {/* Current Password */}
                            <div className="flex flex-col relative">
                                <label className="font-medium text-gray-700 dark:text-gray-300">
                                    Current Password <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type={showCurrent ? "text" : "password"}
                                    name="currentPassword"
                                    className="mt-1 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-3 top-9 text-gray-500"
                                >
                                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <ErrorMessage
                                    name="currentPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* New Password */}
                            <div className="flex flex-col relative">
                                <label className="font-medium text-gray-700 dark:text-gray-300">
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type={showNew ? "text" : "password"}
                                    name="newPassword"
                                    className="mt-1 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-9 text-gray-500"
                                >
                                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <ErrorMessage
                                    name="newPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col relative">
                                <label className="font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    className="mt-1 px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-9 text-gray-500"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={loading}
                            >
                                 {loading && (
                                                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                                )}
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
