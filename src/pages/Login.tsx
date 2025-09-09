import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { showToast } from "../utils/toast";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ✅ Submit Handler
  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      const res = await login(values.email, values.password);

      if (res.status) {
        showToast("success", res.message || "Login successful");
        navigate("/");
      } else {
        showToast("error", res.message || "Login failed"); // 👈 backend का message
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
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
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
            Sign in to your account
          </h1>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 md:space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                               focus:ring-primary-600 focus:border-primary-600 
                               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                               dark:placeholder-gray-400 dark:text-white 
                               dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                                 focus:ring-primary-600 focus:border-primary-600 
                                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                 dark:placeholder-gray-400 dark:text-white 
                                 dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 
                                   focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 
                                   dark:border-gray-600 dark:focus:ring-primary-600 
                                   dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 
                             focus:ring-4 focus:outline-none focus:ring-primary-300 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                             dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>

                {/* Sign up link */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                  Don’t have an account yet?{" "}
                  <a
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
