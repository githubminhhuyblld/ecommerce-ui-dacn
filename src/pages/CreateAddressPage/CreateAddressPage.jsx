import React from "react";
import { Container } from "@mui/material";

import CreateAddress from "~/layouts/components/CreateAddress/CreateAddress";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";
import {
  addAddress,
  setSuccess,
} from "~/store/reducers/locationSlice.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "~/store/reducers/userSlice.js";
import { useNavigate } from "react-router-dom";
import config from "~/config";

CreateAddressPage.propTypes = {};

function CreateAddressPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = JSON.parse(localStorage.getItem("token"));

  const fullName = user ? user.lastName + " " + user.firstName : "";
  const numberPhone = user ? user.numberPhone : "";
  const handleSaveAddress = (
    provinceId,
    districtId,
    wardId,
    name,
    numberPhone,
    address,
    fullAddress
  ) => {
    const body = {
      address: address,
      districtId: districtId,
      fullName: name,
      numberPhone: numberPhone,
      provinceId: provinceId,
      wardId: wardId,
      fullAddress: fullAddress,
    };
    console.log(body);
    dispatch(addAddress({ userId: token.userId, body: body })).then(
      (response) => {
        dispatch(setSuccess((prev) => !prev));
        if (response.payload === 200) {
          toast.success("Lưu địa chỉ thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: "toast-message",
          });
          navigate(config.routes.account);
        }
      }
    );
  };
  return (
    <div className="w-full bg-background">
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            <SidebarLeft />
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
            <h3 className="text-4xl mb-8">Thêm địa chỉ của bạn</h3>
            <CreateAddress
              handleSaveAddress={handleSaveAddress}
              provinceDefault={"none"}
              districIdDefault={"none"}
              wardIdDefault={"none"}
              fullNameDefault={fullName}
              numberPhoneDefault={numberPhone}
              addressDefault={"none"}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CreateAddressPage;
