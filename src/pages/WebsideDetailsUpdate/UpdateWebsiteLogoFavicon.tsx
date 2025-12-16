import React, { useState } from "react";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateWebsideLogo } from "../../services/WebsideUpdate";
import { showToast } from "../../utils/toast";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const UpdateWebsiteLogofavicon: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setfaviconPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      logo: null as File | null,
      favicon: null as File | null,
    },
    validate: (values) => {
      const errors: { logo?: string; favicon?: string } = {};

      if (values.logo) {
        if (!ALLOWED_TYPES.includes(values.logo.type)) {
          errors.logo = "Logo must be a jpeg, jpg, or png file.";
        } else if (values.logo.size > MAX_FILE_SIZE) {
          errors.logo = "Logo must be less than 2MB.";
        }
      }

      if (values.favicon) {
        if (!ALLOWED_TYPES.includes(values.favicon.type)) {
          errors.favicon = "favicon must be a jpeg, jpg, or png file.";
        } else if (values.favicon.size > MAX_FILE_SIZE) {
          errors.favicon = "favicon must be less than 2MB.";
        }
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        if (!values.logo && !values.favicon) {
          showToast("error", "Please select at least one image to update.");
          return;
        }

        setLoading(true);
        const token = localStorage.getItem("authToken") || "";
        const formData = new FormData();
        if (values.logo) formData.append("logo", values.logo);
        if (values.favicon) formData.append("favicon", values.favicon);

        await updateWebsideLogo(token, formData);
        showToast("success", "Website logo updated successfully!");
        navigate("/system-setting");
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
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "favicon") => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      formik.setFieldValue(type, file);
      if (type === "logo") setLogoPreview(URL.createObjectURL(file));
      if (type === "favicon") setfaviconPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between flex-wrap">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Update Logo & favicon
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

      <div className="bg-white shadow-lg rounded-xl w-full max-w-xxl p-8 mt-4 dark:bg-gray-700">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 dark:text-white ">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "logo")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.errors.logo && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.logo}</p>
            )}
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="mt-3 h-24 w-auto object-contain border rounded"
              />
            )}
          </div>

          {/* favicon Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 dark:text-white">favicon</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "favicon")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.errors.favicon && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.favicon}</p>
            )}
            {faviconPreview && (
              <img
                src={faviconPreview}
                alt="favicon Preview"
                className="mt-3 h-16 w-16 object-contain border rounded"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md text-lg 
              ${loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-700"}`}
          >
            {loading ? "Updating" : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateWebsiteLogofavicon;
