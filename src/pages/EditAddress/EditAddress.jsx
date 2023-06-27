import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";

import styles from "./EditAddress.module.scss";
import CreateAddress from "~/layouts/components/CreateAddress/CreateAddress";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";
import {
  fetchInfoAddressById,
  selectAddressById,
  selectSuccessAddress,
  updateAddressById,
} from "~/store/reducers/locationSlice";
import { selectUser } from "~/store/reducers/userSlice.js";

const cx = classNames.bind(styles);

EditAddress.propTypes = {};

function EditAddress(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [provinceDefault, setProvinceDefault] = useState("none");
  const [districIdDefault, setDistricIdDefault] = useState("none");
  const [wardIdDefault, setWardIdDefault] = useState("none");
  const addressInfo = useSelector(selectAddressById);
  const token = JSON.parse(localStorage.getItem("token"));
  const success = useSelector(selectSuccessAddress);

  useEffect(() => {
    if (id) {
      dispatch(fetchInfoAddressById(id));
    }
  }, [dispatch, success]);
  console.log(addressInfo);
  console.log(provinceDefault);
  useEffect(() => {
    if (provinceDefault === "none" && addressInfo) {
      setProvinceDefault(addressInfo.provinceId);
      setDistricIdDefault(addressInfo.districtId);
      setWardIdDefault(addressInfo.wardId);
    }
  }, [addressInfo]);

  //   useEffect(() => {
  //     if (addressInfo) {
  //       setProvinceDefault(addressInfo.provinceId);
  //       setDistricIdDefault(addressInfo.districtId);
  //       setWardIdDefault(addressInfo.wardId);
  //     }
  //   }, [addressInfo]);

  const provinceId = addressInfo ? addressInfo.provinceId : provinceDefault;
  const districtId = addressInfo ? addressInfo.districtId : districIdDefault;
  const wardId = addressInfo ? addressInfo.wardId : wardIdDefault;
  const fullName = addressInfo ? addressInfo.fullName : "";
  const address = addressInfo ? addressInfo.address : "";
  const numberPhone = addressInfo ? addressInfo.numberPhone : "";
  console.log(provinceId);

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
    dispatch(
      updateAddressById({ addressId: id, userId: token.userId, body: body })
    ).then((response) => {
      console.log(response);
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
        navigate("/account");
      }
    });
  };
  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            <SidebarLeft />
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
            <h3 className="text-4xl mb-8">Chỉnh sửa thông tin địa chỉ</h3>
            <CreateAddress
              handleSaveAddress={handleSaveAddress}
              provinceDefault={provinceId}
              districIdDefault={districtId}
              wardIdDefault={wardId}
              fullNameDefault={fullName}
              numberPhoneDefault={numberPhone}
              addressDefault={address}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EditAddress;
