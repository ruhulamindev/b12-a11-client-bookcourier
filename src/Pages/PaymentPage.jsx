import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios.post(`https://b12-a11-client-bookcourier.vercel.app/payment-success`, { sessionId });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আপনার অর্ডারটি এখন প্রসেসিং এ
          আছে।
        </p>

        <button
          onClick={() => navigate("/dashboard/my-orders")}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
