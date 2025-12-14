import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  
  useEffect(() => {
    if (sessionId) {
            axios.post(`http://localhost:3000/payment-success`,{sessionId});

    }
  }, [sessionId]);

  return (
    <div>
      <h1>payment success</h1>
    </div>
  );
};

export default PaymentPage;
