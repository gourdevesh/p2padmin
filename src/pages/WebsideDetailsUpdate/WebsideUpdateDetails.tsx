// UpdateWebsiteForm.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import UpdateWebsiteLogoFavicon from "./UpdateWebsiteLogoFavicon";
import { updateNameTitle } from "../../services/WebsideUpdate";
import { showToast } from "../../utils/toast";

const WebsideUpdateDetails: React.FC = () => {
  const navigate = useNavigate()
  const [loading ,setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      title: "",
    },
 onSubmit: async (values) => {
  try {
    setLoading(true)
    const token = localStorage.getItem("authToken") || "";
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("url", values.url);
    formData.append("title", values.title);
    const res = await updateNameTitle(token, formData);
    showToast("success", "Website info updated successfully!");
    navigate("/system-setting")
  } catch (error: any) {
    const apiError = error.response?.data;

    if (apiError?.errors) {
      const formattedErrors: string[] = [];
      for (const key in apiError.errors) {
        formattedErrors.push(apiError.errors[key][0]);
      }
      showToast("error", formattedErrors.join("\n"));
    } else {
      showToast("error", apiError?.message || error.message || "Something went wrong");
    }
  }
  finally{
    setLoading(false)
  }
 }

  });

  return (
    <>
      <div className="flex flex-row items-center justify-between flex-wrap">
        {/* Left side */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Update Website Details
        </h1>

        {/* Right side */}
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

      <div className=" flex items-center justify-center mt-4 ">
        <div className="bg-white shadow-lg rounded-lg w-full p-6 max-w-xxl">

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter website name"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-gray-700 font-medium mb-1">
                URL
              </label>
              <input
                id="url"
                name="url"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.url}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter website URL"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter website title"
              />
            </div>

            <button
            disabled = {loading}
              type="submit"
          
              className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors ${
                loading ? "cursor-not-allowed opacity-70" :"hover:bg-blue-700"
              }`}
            >
         {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WebsideUpdateDetails;
