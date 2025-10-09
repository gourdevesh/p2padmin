// UpdateWebsiteLogoFavicon.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

const UpdateWebsiteLogoFavicon: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      logo: null as File | null,
      favicon: null as File | null,
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        if (values.logo) formData.append("logo", values.logo);
        if (values.favicon) formData.append("favicon", values.favicon);

        const response = await axios.post(
          "https://api.onnbit.com/api/admin/website/update-logoAndFavicon",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer 1250|9jfq1P96xS82rPesV2tTVUpoafQvw3AwM3M57ooWae1382f4",
              "X-CSRF-TOKEN": "", // Add token if needed
            },
          }
        );

        console.log("Success:", response.data);
        alert("Logo and favicon updated successfully!");
      } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        alert("Failed to update logo and favicon.");
      }
    },
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
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white">
      Update Logo & Favicon
    </h2>

    <div className="bg-white shadow-lg rounded-xl w-full max-w-xxl p-8">
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
