// UpdateWebsiteLogoFavicon.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateWebsideLogo } from "../../services/WebsideUpdate";
import { showToast } from "../../utils/toast";

const UpdateWebsiteLogoFavicon: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      logo: null as File | null,
      favicon: null as File | null,
    },
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("authToken") || ""
        const formData = new FormData();
        if (values.logo) formData.append("logo", values.logo);
        if (values.favicon) formData.append("favicon", values.favicon);
        const res = await updateWebsideLogo(token, formData);
        showToast("success", "Website logo updated successfully!");
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
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "favicon") => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      formik.setFieldValue(type, file);
      if (type === "logo") setLogoPreview(URL.createObjectURL(file));
      if (type === "favicon") setFaviconPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between flex-wrap">
        {/* Left side */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Update Logo & Favicon
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
      <div>

        <div className="bg-white shadow-lg rounded-xl w-full max-w-xxl p-8 mt-4">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logo")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-3 h-24 w-auto object-contain border rounded"
                />
              )}
            </div>

            {/* Favicon Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Favicon</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "favicon")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {faviconPreview && (
                <img
                  src={faviconPreview}
                  alt="Favicon Preview"
                  className="mt-3 h-16 w-16 object-contain border rounded"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors text-lg"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>

  );
};

export default UpdateWebsiteLogoFavicon;
