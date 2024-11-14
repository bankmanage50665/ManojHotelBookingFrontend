import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";

const labelClasses = "block text-gray-700 font-bold mb-2";
const inputClasses =
  "w-full px-4 py-3 rounded-lg bg-gray-200 border-transparent focus:border-yellow-400 focus:bg-white focus:ring-0 text-gray-800";

function OtpSignupForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Register
          </h2>
          <Form method="POST">
            {data && data.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-md"
              >
                {data.message}
              </motion.div>
            )}
            <div className="mb-6">
              <label htmlFor="phone" className={labelClasses}>
                Phone Number
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                id="phone"
                inputMode="numeric"
                name="phone"
                required
                minLength={10}
                maxLength={10}
                className={inputClasses}
                placeholder="Enter your phone number"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
            >
              {isSubmitting ? <PulseLoader /> : "Register"}
            </motion.button>
          </Form>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-600 font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default OtpSignupForm;

export async function signupAction({ request, params }) {
  const formData = await request.formData();
  const userData = {
    phoneNumber: formData.get("phone"),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/otp/register`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 500 || response.status === 404) {
      return response;
    }

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Field to Register user.");
    }
  } catch (err) {
    throw json(
      { message: "Field to register,   please try again later." },
      { status: 500 }
    );
  }
  return redirect("/login");
}
