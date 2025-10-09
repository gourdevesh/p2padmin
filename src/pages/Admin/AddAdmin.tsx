import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { register } from "../../services/RegisterService";
import { showToast } from "../../utils/toast";

const permissionOptions = [
  { id: "payment", label: "Manage Payment" },
  { id: "users", label: "Manage Users" },
  { id: "support", label: "Support Tickets" },
  { id: "disputes", label: "Disputes" },
  { id: "admin", label: "Admin Access" },
  { id: "settings", label: "Settings" },
  { id: "trade", label: "Trade History" },
];

const AddAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    .test(
      "permissions-required",
      "Select at least one permission",
      function (value) {
        const { role } = this.parent;
        if (role === "sub_admin") {
          return value && value.length > 0;
        }
        return true;
      }
    ),
});


  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await register(values);
      if (res.status) {
        showToast("success", res.message || "Admin added successfully");
        navigate("/admin");
      } else {
        showToast("error", res.message || "Registration failed");
      }
    } catch (err: any) {
      showToast("error", err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add Admin Details
        </h1>
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

      <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center mt-8 ">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-full max-w-xxl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 md:p-8 space-y-6">
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
              {({ isSubmitting, values }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Admin Name"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phone_number"
                      placeholder="10-digit number"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="phone_number"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Role
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select role</option>
                      <option value="admin">Admin</option>
                      <option value="sub_admin">Sub-Admin</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="md:col-span-2 relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="w-full p-2.5 pr-10 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Permissions (Only for Sub-Admin) */}
            {values.role === "sub_admin" && (
  <div className="md:col-span-2">
    <label className="block mb-3 text-sm font-semibold text-gray-900 dark:text-white">
      Permissions
    </label>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {permissionOptions.map((perm) => (
        <label
          key={perm.id}
          className="flex items-center justify-between gap-2 p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-blue-400 
          bg-gray-50 dark:bg-gray-800"
        >
          <span className="text-gray-700 dark:text-gray-200">{perm.label}</span>
          <Field
            type="checkbox"
            name="permissions"
            value={perm.id}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
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
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white rounded-lg px-5 py-2.5 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Registering...</span>
                        </div>
                      ) : (
                        "Add Admin"
                      )}
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
