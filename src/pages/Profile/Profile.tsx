import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, Settings } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProfile } from "../../services/ProfileService";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export const Profile: React.FC = () => {
    const { admin } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const initialValues = {
        name: "",
        email: "",

    };

    useEffect(() => {
        if (admin) {
            initialValues.name = admin.name || "";
            initialValues.email = admin.email || "";

        }
    }, [admin]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };
    const handleClick = () => {
        fileInputRef.current?.click(); // hidden input को click कराएगा
    };

    const handleSubmit = async (values: { name: string; email: string }) => {
        try {
            setLoading(true)
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await updateProfile(token, {
                name: values.name,
                email: values.email,
                profileImage,
            });

            showToast("success", data.message || "Profile updated successfully");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (err: any) {
            let errorMsg = "Update failed";
            if (err.errors) {
                errorMsg = Object.values(err.errors).flat().join(", ");
            } else if (err.message) {
                errorMsg = err.message;
            }

            showToast("error", errorMsg);
            console.error("Update failed:", errorMsg);
        }
        finally {
            setLoading(false)
        }
    };



    return (
        <div className="">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile</h1>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 text-white transition" onClick={() => navigate("/password-setting")}>
                        <Settings size={16} />
                        <span className="text-sm font-medium">Password Setting</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Card */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 w-full lg:w-1/3 h-auto overflow-hidden">
                    <div className="flex items-center bg-blue-600 dark:bg-blue-700 p-4">
                        <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                            <img
                                src={admin?.profile_image}
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                                loading="lazy"

                            />
                        </div>
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
                            <span className="font-medium">Role</span>
                            <span className="font-semibold">{admin?.role}</span>
                        </div>
                        <div className="flex justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-700 ">
                            <span className="font-medium">Email</span>
                            <span className="font-semibold">{admin?.email}</span>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>

                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: admin?.name || "",
                            email: admin?.email || "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="space-y-6">
                                <div className="flex flex-col sm:flex-row gap-6 items-start">

                                    <div className="relative w-40 h-40 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {profileImage ? (
                                            <img
                                                src={URL.createObjectURL(profileImage)}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : admin?.profile_image ? (
                                            <img
                                                src={admin.profile_image}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="lazy"

                                            />
                                        ) : (
                                            <div className="text-gray-400 dark:text-gray-500">
                                                <UploadCloud size={48} />
                                            </div>
                                        )}

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept=".png,.jpg,.jpeg"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />

                                        <div
                                            onClick={handleClick}
                                            className="absolute bottom-[-8px] right-[-8px] bg-blue-600 p-3 rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition"
                                        >
                                            <UploadCloud size={20} className="text-white" />
                                        </div>
                                    </div>





                                    {/* Name & Email */}
                                    <div className="flex-1 grid grid-cols-12 gap-4 w-full">
                                        <div className="flex flex-col col-span-12">
                                            <label className="font-medium text-gray-700 dark:text-gray-300">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="flex flex-col col-span-12">
                                            <label className="font-medium text-gray-700 dark:text-gray-300">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                className="mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div>

                                    <div>
                                        <div>
                                            <button
                                                type="submit"
                                                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                                disabled={loading}
                                            >
                                                {loading && (
                                                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                                )}
                                                {loading ? "Updating..." : "Update Profile"}
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </div>
    );
};
