import React from "react";

import { useLocation } from "react-router-dom";

function VNPayment(props) {
  const query = new URLSearchParams(useLocation().search);

  const vnp_Amount = query.get("vnp_Amount");
  const vnp_BankCode = query.get("vnp_BankCode");
  const vnp_ResponseCode = query.get("vnp_ResponseCode")

  console.log(vnp_ResponseCode);

  return (
    <div>
      <h3>Thanh toán VNPayment</h3>
    </div>
  );
}

export default VNPayment;
