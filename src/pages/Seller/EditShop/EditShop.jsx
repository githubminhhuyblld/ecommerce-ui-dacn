import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {  Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";

import UploadSingleImage from "~/layouts/components/UploadSingleImage/UploadSingleImage";
import { checkShopNameDebounced } from "~/services/workspacesService";
import { storage } from "~/firebase";
import {
  fetchInfoShop,
  selectInfoShop,
  updateShop,
} from "~/store/reducers/shopSlice";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";

const EditShop = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [open, setOpen] = useState(true);
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const user = useSelector(selectUser);
  const shopInfo = useSelector(selectInfoShop);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  useEffect(() => {
    if (user !== null) {
      dispatch(fetchInfoShop({ shopId: user.shopId, userId: user.id }));
    }
  }, [user]);

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
  const handleUpdateShop = async (values) => {
    setIsLoading(true);
    const storageRef = ref(storage, `shop/${images[0]?.file.name}`);
    const snapshot = await uploadBytes(storageRef, images[0]?.file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const body = {
      address: values.address,
      description: values.description,
      name: values.name,
      image: isChangeImage ? downloadURL : shopInfo.image,
    };
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      dispatch(
        updateShop({ userId: token.userId, shopId: user.shopId, body: body })
      ).then((response) => {
        if (response.payload.id !== null) {
          setIsLoading(false);
          toast.success("Cập nhật Shop thành công!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };
  return (
    <div className="w-full px-20 bg-slate-200 py-12">
      <div className="mb-12">{isLoading && <LinearProgress color="secondary" />}</div>
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item lg={7} md={12} sm={12}>
          <div className="w-full bg-white  p-12 rounded-xl ">
            <h3 className="text-5xl mb-12 text-primary">
              Chỉnh sửa thông tin shop
            </h3>

            <div className=" w-[150px] h-[150px] object-cover mb-8">
              <UploadSingleImage
                imageProduct={shopInfo.image}
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
                name: shopInfo.name,
                description: shopInfo.description,
                address: shopInfo.address,
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleUpdateShop(values);
                setSubmitting(false);
              }}
            >
              <Form>
                <div className="flex flex-col mb-4">
                  <label className="label-item">
                    Tên Shop<span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="Tên Shop"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="error"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="label-item">
                    Mô tả<span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="description"
                    className="input-field"
                    placeholder="Mô tả"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="error"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="label-item">
                    Địa chỉ<span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="input-field"
                    placeholder="Địa chỉ"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="address"
                    component="span"
                    className="error"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-sky-700 text-3xl mt-8 p-6 rounded-2xl text-white"
                >
                  Lưu
                </button>
              </Form>
            </Formik>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

EditShop.propTypes = {};

export default EditShop;
