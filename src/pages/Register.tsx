import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { showToast } from "../utils/toast";
import { useAuth } from "../hooks/useAuth";
import { register } from "../services/RegisterService";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    role: Yup.string().oneOf(["Admin", "Sub-Admin"], "Invalid role").required("Role is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ✅ Submit Handler
  const handleSubmit = async (
    values: { name: string; email: string; phone_number: string; role: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      const res = await register(values);

      if (res.status) {
        showToast("success", res.message || "Registration successful");
        navigate("/login");
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
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
  <ToastContainer position="top-right" autoClose={3000} />
  <div className="w-full max-w-3xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <a
          href="#"
          className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          P2P Admin
        </a>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Register your account
      </h1>

      {/* Formik Form */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone_number: "",
          role: "Admin",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Admin Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-600 focus:border-primary-600"
              />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="email@onnbit.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-600 focus:border-primary-600"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <Field
                type="text"
                name="phone_number"
                id="phone_number"
                placeholder="1234567890"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-600 focus:border-primary-600"
              />
              <ErrorMessage name="phone_number" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Role
              </label>
              <Field
                as="select"
                name="role"
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-600 focus:border-primary-600"
              >
                <option value="Admin">Admin</option>
                <option value="Sub-Admin">Sub-Admin</option>
              </Field>
              <ErrorMessage name="role" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-600 focus:border-primary-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>

            {/* Login link */}
            <div className="md:col-span-2 text-center">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign in
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
</section>

  );
};

export default Register;
