import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { TextField } from "@material-ui/core";
import { Container, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch ,useSelector} from "react-redux";
import { toast } from "react-toastify";

import styles from "./ShopRegister.module.scss";
import Background from "~/assets/seller/back-ground-seller.jpg";
import UploadSingleImage from "~/layouts/components/UploadSingleImage/UploadSingleImage";
import { checkShopNameDebounced } from "~/services/workspacesService";
import { storage } from "~/firebase";
import { registerShop } from "~/store/reducers/shopSlice";
import { useNavigate } from "react-router-dom";
import config from "~/config";


const cx = classNames.bind(styles);

const ShopRegister = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [open, setOpen] = useState(true);
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setShowButton(false);
    setOpen(false);
    setIsChangeImage(true);
    setImages(imageList);
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên shop")
      .test("check-name", "Tên shop đã tồn tại", async function (value) {
        const response = await checkShopNameDebounced(value);
        const data = response.data;
        return !data;
      }),
    description: Yup.string().required("Vui lòng nhập mô tả"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  });
  console.log(images);
  const handleRegisterShop = async (values) => {
    const storageRef = ref(storage, `shop/${images[0]?.file.name}`);
    const snapshot = await uploadBytes(storageRef, images[0]?.file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const body = {
      address: values.address,
      description: values.description,
      name: values.name,
      image: isChangeImage
        ? downloadURL
        : "https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg",
    };
    console.log(body);
    const token = JSON.parse(localStorage.getItem("token"));
    if(token){
      dispatch(registerShop({userId:token.userId,body:body})).then((response)=>{
        console.log(response);
        if (response.payload.id !== null) {
          toast.success("Đăng ký Shop thành công,Vui lòng chờ phê duyệt", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          navigate(config.routes.activeAddress);
        }
      })
    }
    
  };
  return (
    <div
      className="w-full py-20 px-20"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Grid container justifyContent="flex-end" spacing={8}>
        <Grid item lg={5} md={12} sm={12}>
          <div className="w-full bg-white my-24 p-12 rounded-xl ">
            <h3 className="text-5xl mb-12 text-primary">
              Đăng ký bán hàng cùng Lazada
            </h3>
            <div className=" w-[150px] h-[150px] object-cover mb-8">
              <UploadSingleImage
                imageProduct={
                  "https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg"
                }
                open={open}
                images={images}
                name={"User"}
                maxNumber={maxNumber}
                onChange={onChange}
                showButton={showButton}
              />
            </div>
            <Formik
              initialValues={{
                name: "",
                description: "",
                address: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleRegisterShop(values);
                setSubmitting(false);
              }}
            >
              <Form>
                <div className="flex flex-col mb-4">
                  <label className={cx("label-item")}>
                    Tên Shop<span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className={cx("input-field")}
                    placeholder="Tên Shop"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={cx("error")}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className={cx("label-item")}>
                    Mô tả<span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="description"
                    className={cx("input-field")}
                    placeholder="Mô tả"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className={cx("error")}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className={cx("label-item")}>
                    Địa chỉ<span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className={cx("input-field")}
                    placeholder="Địa chỉ"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="address"
                    component="span"
                    className={cx("error")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-sky-700 text-3xl mt-8 p-6 rounded-2xl text-white"
                >
                  Đăng ký
                </button>
              </Form>
            </Formik>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ShopRegister.propTypes = {};

export default ShopRegister;
