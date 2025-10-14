import React from "react";
import { Search, Settings, Image, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SystemSettings: React.FC = () => {
const navigate = useNavigate()
  return (
    <div className="p-6 space-y-6">
      {/* Title */}
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
          

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Cards */}
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
    </div>
  );
};

export default SystemSettings;
