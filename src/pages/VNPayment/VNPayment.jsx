import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { confirmPayment } from "~/store/reducers/paymentSlice";
import config from "~/config";
import { clearSelectedItems } from "~/store/reducers/cartsSlice";

function VNPayment(props) {
  const query = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();

  const vnp_Amount = query.get("vnp_Amount");
  const vnp_BankCode = query.get("vnp_BankCode");
  const vnp_ResponseCode = query.get("vnp_ResponseCode");
  const vnp_OrderInfo = query.get("vnp_OrderInfo");

  const [isPaid, setIsPaid] = useState(false);
  useEffect(() => {
    dispatch(
      confirmPayment({
        vnp_Amount,
        vnp_BankCode,
        vnp_ResponseCode,
        vnp_OrderInfo,
      })
    ).then((resultAction) => {
      console.log(resultAction);
      if(resultAction.payload.status === "oke"){
        dispatch(clearSelectedItems());
        setIsPaid(true)
      }
      else{
        setIsPaid(false)
      }
    });
  }, []);

  return (
    <div>
      <Container>
        {vnp_ResponseCode === "00" ? (
          <div className=" h-screen">
            <div className=" p-6  md:mx-auto">
              <svg
                viewBox="0 0 24 24"
                className="text-green-600 w-16 h-16 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Đơn hàng đã được thanh toán thành công
                </h3>
                <p className="text-gray-600 my-2">
                  Cảm ơn bạn đã hoàn tất thanh toán trực tuyến an toàn của mình.{" "}
                </p>
                <p> Chúc bạn có một ngày vui vẻ! </p>
                <div className="py-10 text-center">
                  <Link
                    to={config.routes.infoOrder}
                    className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                  >
                    Quay lại
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" h-screen">
            <div className=" p-6  md:mx-auto">
              <TiDeleteOutline className="text-red-500 w-16 h-16 mx-auto my-6" />
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-red-500 font-semibold text-center">
                  Đơn hàng thanh toán thất bại
                </h3>

                <div className="py-10 text-center">
                  <Link
                    to={config.routes.infoOrder}
                    className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                  >
                    Quay lại
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default VNPayment;
