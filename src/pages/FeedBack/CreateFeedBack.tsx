import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFeedBack } from "../../services/feedbackService";
import { showToast } from "../../utils/toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateFeedBack = () => {
    const navigate = useNavigate()
  const initialValues = {
    user_id: "",
    likeDislike: "",
    review: "",
  };

  const validationSchema = Yup.object({
    user_id: Yup.number().required("User ID is required"),
    likeDislike: Yup.string().oneOf(["like", "dislike"]).required("Select like or dislike"),
    review: Yup.string().required("Review is required"),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const token = localStorage.getItem("authToken") || "";
      await createFeedBack(token, values);
      showToast("success", "Feedback submitted successfully!");
      resetForm();
    } catch (error: any) {
      showToast("error", error.message || "Failed to submit feedback");
    }
  };


  return (

    <>
     <div className="flex flex-row items-center justify-between flex-wrap ">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create  FeedBack
                </h1>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-md shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 justify-center text-sm"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </button>
              </div>

      <div className="w-full max-w-xxl bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 p-6 mt-4 ">
    
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">

              {/* User ID */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User ID
                </label>
                <Field
                  name="user_id"
                  type="number"
                  placeholder="Enter User ID"
                  className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="user_id"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Like / Dislike */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Like / Dislike
                </label>
                <Field
                  as="select"
                  name="likeDislike"
                  className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value="like">Like</option>
                  <option value="dislike">Dislike</option>
                </Field>
                <ErrorMessage
                  name="likeDislike"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Review */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Review
                </label>
                <Field
                  as="textarea"
                  name="review"
                  placeholder="Write your review..."
                  className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  rows={4}
                />
                <ErrorMessage
                  name="review"
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
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    
    </>
  );
};

export default CreateFeedBack;
