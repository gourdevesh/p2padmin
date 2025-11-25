import React, { useEffect, useState } from "react";
import { Search, Settings, Image, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWebsideDetail } from "../../services/WebsideUpdate";
import { showToast } from "../../utils/toast";
import { Table } from "../../components/Table";

const SystemSettings: React.FC = () => {
  const navigate = useNavigate()

  const [websiteData, setWebsiteData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchWebsiteDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await getWebsideDetail(token);
      setWebsiteData(Array.isArray(response.data) ? response.data : response?.data ? [response.data] : []);
    } catch (error: any) {
      showToast("error", error.message || "Failed to load webside detail");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWebsiteDetails()
  }, [])
  console.log("websiteData", websiteData)
  const columns = [
    { key: "website_name", label: "Website Name", sortable: true },
    { key: "website_title", label: "Website Title", sortable: true },
{
  key: "website_url",
  label: "Website URL",
  sortable: true,
  render: (row:any) => (
    <a
      href={row}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {row}
    </a>
  ),
},

    {
      key: "logo_image",
      label: "Logo",
      render: (row: any) => (
        <img
          src={row}
          alt="Logo"
          className="h-12 w-12 object-contain" />
      ),
    },
    {
      key: "favicon_image",
      label: "favicon",
      render: (value: string) => (
        <img src={value} alt="favicon" className="h-12 w-12 object-contain" />
      ),
    },


  ];


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-row items-center justify-between flex-wrap">
        {/* Left side */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          System Settings
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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* General Setting Card */}
        <div className="flex items-center p-5 bg-purple-100 rounded-xl shadow hover:shadow-md transition" onClick={() => navigate('/WebsideUpdateDetails')}>
          <div className="p-3 bg-purple-600 text-white rounded-lg mr-4">

            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">General Setting</h3>
            <p className="text-sm text-gray-600">
              Configure the fundamental information of the site.
            </p>
          </div>
        </div>

        {/* Logo and Favicon Card */}
        <div className="flex items-center p-5 bg-blue-100 rounded-xl shadow hover:shadow-md transition" onClick={() => navigate('/UpdateWebsiteLogoFavicon')}>
          <div className="p-3 bg-blue-600 text-white rounded-lg mr-4">
            <Image className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Logo and Favicon</h3>
            <p className="text-sm text-gray-600">
              Upload your logo and favicon here.
            </p>
          </div>
        </div>
      </div>
      <Table columns={columns} data={websiteData} loading={loading} />
    </div>
  );
};

export default SystemSettings;
