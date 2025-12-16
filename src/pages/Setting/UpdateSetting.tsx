import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateSettingData } from "../../services/SettingService";
import { showToast } from "../../utils/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const UpdateSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {};
    console.log("rowData",rowData) 

  const initialFormValues = {
    withdraw_status: rowData.withdraw_status || "",
    deposit_status: rowData.deposit_status || "",
    withdraw_type: rowData.withdraw_type || "",
    min_withdraw: rowData.min_withdraw || "",
    max_withdraw: rowData.max_withdraw || "",
    user_registration: rowData.user_registration || "",
  };


  return (
    <>
      <div className="flex flex-row items-center justify-between flex-wrap mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Update Settings
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-md shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 justify-center text-sm"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </button>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center mt-8">

        <div className="w-full max-w-xxl bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 p-6 md:p-8">
          <Formik
            initialValues={initialFormValues}

          onSubmit={async (values, { setSubmitting }) => {
  try {
    const token = localStorage.getItem("authToken") || "";
    const formData = new FormData();

    const changedFields: Record<string, any> = {};

    const keys = Object.keys(values) as (keyof typeof values)[];

    keys.forEach((key) => {
      if (values[key] !== initialFormValues[key]) {
        changedFields[key] = values[key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      showToast("info", "No changes made.");
      setSubmitting(false);
      return;
    }

    Object.entries(changedFields).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

  const res = await updateSettingData(token, formData);
if (res?.status) {
  showToast("success", res.message || "Updated successfully");
}
  
setTimeout(() => {
  navigate("/setting");
}, 500);
  } catch (error: any) {
    const apiError = error.response?.data;
    if (apiError?.errors) {
      const allErrors: string[] = [];
      for (const key in apiError.errors) {
        allErrors.push(apiError.errors[key][0]);
      }
      showToast("error", allErrors.join("\n"));
    } else {
      showToast("error", apiError?.message || error.message);
    }
  } finally {
    setSubmitting(false);
  }
}}

          >
            {({ isSubmitting }) => (
              <>

                <Form className="space-y-6">

                  {/* Withdraw Status */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Withdraw Status
                    </label>
                    <Field
                      as="select"
                      name="withdraw_status"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </Field>
                    <ErrorMessage
                      name="withdraw_status"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Deposit Status */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Deposit Status
                    </label>
                    <Field
                      as="select"
                      name="deposit_status"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </Field>
                    <ErrorMessage
                      name="deposit_status"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Withdraw Type */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Withdraw Type
                    </label>
                    <Field
                      as="select"
                      name="withdraw_type"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="manual">Manual</option>
                      <option value="auto">Auto</option>
                    </Field>
                    <ErrorMessage
                      name="withdraw_type"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Min Withdraw */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Min Withdraw
                    </label>
                    <Field
                      type="number"
                      name="min_withdraw"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="min_withdraw"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Max Withdraw */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Max Withdraw
                    </label>
                    <Field
                      type="number"
                      name="max_withdraw"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="max_withdraw"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* User Registration */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      User Registration
                    </label>
                    <Field
                      as="select"
                      name="user_registration"
                      className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </Field>
                    <ErrorMessage
                      name="user_registration"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white rounded-lg px-5 py-2.5 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Updating..." : "Update Settings"}
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default UpdateSetting;
