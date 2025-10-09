// UpdateWebsiteForm.tsx
import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const WebsideUpdateDetails: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      title: "",
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("url", values.url);
        formData.append("title", values.title);

        const response = await axios.post(
          "https://api.onnbit.com/api/admin/website/update-nameTitleUrl",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer 1250|9jfq1P96xS82rPesV2tTVUpoafQvw3AwM3M57ooWae1382f4",
              "X-CSRF-TOKEN": "", // Add token if needed
            },
          }
        );

        console.log("Success:", response.data);
        alert("Website info updated successfully!");
      } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        alert("Failed to update website info.");
      }
    },
  });

  return (
    <>    
       <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
          Update Website Details
        </h2>               
    <div className=" flex items-center justify-center ">
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
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Update
          </button>
        </form>
      </div>
    </div>
      </>
  );
};

export default WebsideUpdateDetails;
