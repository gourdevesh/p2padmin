import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { register } from "../../services/RegisterService";
import { showToast } from "../../utils/toast";

interface AdminFormValues {
  name: string;
  email: string;
  phone_number: string;
  role: "admin" | "sub_admin" | "";
  password: string;
  permissions: string[];
}

// ✔ Clean permission list
const permissionOptions = [
  { id: "payment", label: "Manage Payment" },
  { id: "users", label: "Manage Users" },
  { id: "support", label: "Support Tickets" },
  { id: "support", label: "Disputes" },
  { id: "offer", label: "Offer Management" },
  { id: "wallet_detail", label: "Wallet Detail" },
  { id: "feedback", label: "Feedback" },
  { id: "wallet", label: "Wallet" },
  { id: "admin", label: "Admin Access" },
  { id: "settings", label: "Settings Control" },
  { id: "trade", label: "Trade History" },
];

const AddAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    role: Yup.string()
      .oneOf(["admin", "sub_admin"], "Invalid role")
      .required("Role is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    permissions: Yup.array()
      .of(Yup.string())
      .test("permissions-required", "Select at least one permission", function (val) {
        return this.parent.role === "sub_admin" ? val && val.length > 0 : true;
      }),
  });

  // Submit Logic
  const handleSubmit = async (
    values: AdminFormValues,
    { setSubmitting }: FormikHelpers<AdminFormValues>
  ) => {
    try {
      const response = await register(values);

      if (response.status) {
        showToast("success", "Admin Created Successfully");
        navigate("/admin");
      } else {
        showToast("error", response.message || "Failed to create admin");
      }
    } catch (err) {
      const error = err as Error;
      showToast("error", error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Admin</h1>

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

      {/* Form Section */}
      <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center mt-8">
        <ToastContainer />
        <div className="w-full max-w-xxl bg-white rounded-lg shadow dark:bg-gray-800 dark:border">
          <div className="p-6 md:p-8">
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone_number: "",
                role: "",
                password: "",
                permissions: [],
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, isSubmitting }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number
                    </label>
                    <Field
                      name="phone_number"
                      type="text"
                      placeholder="10 Digit Number"
                      className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <ErrorMessage
                      name="phone_number"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Role
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full p-2.5 mt-1 rounded-lg border bg-gray-50 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select role</option>
                      <option value="admin">Admin</option>
                      <option value="sub_admin">Sub-Admin</option>
                    </Field>
                    <ErrorMessage name="role" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Password */}
                  <div className="md:col-span-2 relative">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full p-2.5 mt-1 pr-10 rounded-lg border bg-gray-50 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-500"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Permissions */}
                  {values.role === "sub_admin" && (
                    <div className="md:col-span-2 mt-4">
                      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Permissions
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {permissionOptions.map((p) => (
                          <label
                            key={p.id}
                            className="flex items-center justify-between gap-2 p-3 border 
                            rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 
                            hover:border-blue-400 hover:shadow-md transition"
                          >
                            <span className="text-gray-700 dark:text-gray-200">{p.label}</span>
                            <Field type="checkbox" name="permissions" value={p.id} className="w-5 h-5" />
                          </label>
                        ))}
                      </div>

                      <ErrorMessage
                        name="permissions"
                        component="p"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                  )}

                  {/* Submit */}
                  <div className="md:col-span-2 mt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white rounded-lg px-5 py-2.5 
                      hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Create Admin"}
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

export default AddAdmin;
