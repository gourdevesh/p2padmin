import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../utils/toast";
import { updateAdmin } from "../../services/AdminService";

const permissionOptions = [
    { id: "payment", label: "Manage Payment" },
    { id: "users", label: "Manage Users" },
    { id: "support", label: "Support Tickets" },
    { id: "disputes", label: "Disputes" },
    { id: "offer", label: "Offer Management" },
    { id: "wallet_detail", label: "Wallet Detail" },
    { id: "feedback", label: "Feedback" },
    { id: "wallet", label: "Wallet" },
    { id: "admin", label: "Admin Access" },
    { id: "settings", label: "Settings Control" },
    { id: "trade", label: "Trade History" },
];
interface AdminFormValues {
    name: string;
    email: string;
    phone_number: string;
    role: "admin" | "sub_admin" | "";
    permissions: string[];
}

const UpdateAdmin: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation(); // GET DATA FROM TABLE (row)
    const adminData = state?.rowData;

    const [loading, setLoading] = useState(false);

    // If no data found → redirect
    useEffect(() => {
        if (!adminData) navigate("/admin");
    }, [adminData]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone_number: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        role: Yup.string()
            .oneOf(["admin", "sub_admin"], "Invalid role")
            .required("Role is required"),
        permissions: Yup.array().of(Yup.string()),
    });

    const handleSubmit = async (values: AdminFormValues) => {
        try {
            const payload = {
                ...values,
                admin_id: adminData?.admin_id, // use adminData from state
            };

            const res = await updateAdmin(payload.admin_id, payload);

            if (res.status) {
                showToast("success", "Admin Updated Successfully");
                navigate("/admin");
            } else {
                showToast("error", res.message);
            }
        } catch (err: any) {
            showToast("error", err.message || "Something went wrong");
        }
    };



    return (
        <>
            <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Update Admin
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 
          text-gray-800 dark:text-gray-200 font-medium rounded-md shadow-sm
          border border-gray-300 dark:border-gray-600 hover:bg-gray-200 
          dark:hover:bg-gray-600 transition-colors text-sm"
                >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </button>
            </div>

            <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center mt-8">
                <ToastContainer />
                <div className="w-full max-w-xxl bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6 md:p-8">
                        <Formik
                            initialValues={{
                                name: adminData?.name || "",
                                email: adminData?.email || "",
                                phone_number: adminData?.phone_number || "",
                                role: adminData?.role || "",
                                permissions: adminData?.permissions || [],
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, isSubmitting }) => (
                                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div>
                                        <label className="text-sm font-medium">Name</label>
                                        <Field
                                            name="name"
                                            type="text"
                                            className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 dark:bg-gray-700"
                                        />
                                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 dark:bg-gray-700"
                                        />
                                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Phone Number</label>
                                        <Field
                                            name="phone_number"
                                            type="text"
                                            className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 dark:bg-gray-700"
                                        />
                                        <ErrorMessage name="phone_number" component="p" className="text-red-500 text-sm" />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Role</label>
                                        <Field
                                            as="select"
                                            name="role"
                                            className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 dark:bg-gray-700"
                                        >
                                            <option value="">Select role</option>
                                            <option value="admin">Admin</option>
                                            <option value="sub_admin">Sub-Admin</option>
                                        </Field>
                                    </div>

                                    {/* Permissions */}
                                    {values.role === "sub_admin" && (
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-semibold mb-2 block">
                                                Permissions
                                            </label>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {permissionOptions.map((p) => (
                                                    <label
                                                        key={p.id}
                                                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer"
                                                    >
                                                        <span>{p.label}</span>
                                                        <Field
                                                            type="checkbox"
                                                            name="permissions"
                                                            value={p.id}
                                                            className="w-5 h-5"
                                                        />
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="md:col-span-2 mt-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || loading}
                                            className="w-full bg-blue-600 text-white rounded-lg px-5 py-2.5 hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {loading ? "Updating..." : "Update Admin"}
                                        </button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UpdateAdmin;
