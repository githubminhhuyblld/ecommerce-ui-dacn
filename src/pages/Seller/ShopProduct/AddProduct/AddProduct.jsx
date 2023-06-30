import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { TextField } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem } from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";

import styles from "./AddProduct.module.scss";
import OptionInput from "~/layouts/components/ColorInput/OptionInput ";
import UploadSingleImage from "~/layouts/components/UploadSingleImage/UploadSingleImage";
import UploadMoreImage from "~/layouts/components/UploadMoreImage/UploadMoreImage";
import { selectCategories } from "~/store/reducers/categoriesSlice";
import { fetchCategories } from "~/services/workspacesService";
import { storage } from "~/firebase";
import { addProduct } from "~/store/reducers/shopSlice";
import Empty from "~/assets/product/notify-empty.png"

const cx = classNames.bind(styles);

AddProduct.propTypes = {};

function AddProduct(props) {
  const [colors, setColors] = useState([]);
  const [siezes, setSizes] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    "646494a51b2dbc0fe7c33b2a"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [open, setOpen] = useState(true);
  const [imagesOriginal, setImagesOriginal] = useState([]);
  const [imagesThumail, setImagesThumail] = useState([]);
  const [thumails, setthumails] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setShowButton(false);
    setOpen(false);
    setIsChangeImage(true);
    setImagesOriginal(imageList);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
    newPrice: Yup.number().required("Vui lòng nhập giá mới"),
    oldPrice: Yup.number().required("Vui lòng nhập giá cũ"),
    quantity: Yup.number().required("Vui lòng nhập số lượng sản phẩm"),
  });
  const handleColorAdded = (color) => {
    setColors(color);
  };

  const handleSizeAdded = (size) => {
    setSizes(size);
  };
  const sizesData = {
    sizes: siezes.map((size) => ({ name: size })),
  };
  const colorsData = {
    colors: colors.map((color) => ({ colorName: color })),
  };
  const thumailsData = {
    thumails: thumails.map((item) => ({ imgUrl: item })),
  };
  const handleImageChange = (imageList) => {
    setImagesThumail(imageList);
    uploadImagesToFirebase(imageList);
  };
  const uploadImagesToFirebase = async (images) => {
    const storage = getStorage();

    const imageUrls = [];
    setIsLoading(true);

    for (const image of images) {
      const storageRef = ref(storage, `products/${image?.file.name}`);
      const snapshot = await uploadBytes(storageRef, image?.file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageUrls.push(downloadURL);
    }
    setthumails(imageUrls);
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      newPrice: "",
      oldPrice: "",
      quantity: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const storageRef = ref(
        storage,
        `products/${imagesOriginal[0]?.file.name}`
      );
      const snapshotOriginal = await uploadBytes(
        storageRef,
        imagesOriginal[0]?.file
      );
      const downloadURLOrginal = await getDownloadURL(snapshotOriginal.ref);

      const body = {
        categoryId: selectedCategoryId,
        name: values.name,
        description: values.description,
        mainImage: isChangeImage
          ? downloadURLOrginal
          : Empty,
        newPrice: values.newPrice,
        oldPrice: values.oldPrice,
        quantity: values.quantity,
        rating: "0",
        sizes: sizesData.sizes,
        colors: colorsData.colors,
        images: thumailsData.thumails,
      };
      if (thumailsData.thumails.length === 0) {
        toast.warning("Vui lòng chọn ảnh kèm theo !! ", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        
        });
        setIsLoading(false);
        return;
      }
      const token = JSON.parse(localStorage.getItem("token"));
      if (token && thumails.length > 0) {
        dispatch(addProduct({ userId: token.userId, body: body })).then(
          (response) => {
            if (response.payload.categoryId) {
              toast.success("Thêm sản phẩm  thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }
          }
        );
      }
  
    },
  });

  return (
    <div className="w-full py-8 ">
      <h3 className="relative p-4 bg-sky-200 rounded-lg text-4xl text-gray-700 mb-4">
        Thêm sản phẩm
      </h3>
      {isLoading && <LinearProgress color="secondary" />}
      <form className="px-8 py-4">
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} lg={2}>
            <div className="w-full flex flex-col mb-4">
              <label className="text-2xl">
                Chọn hình ảnh chính<span className="text-red-500">*</span>
              </label>
              <UploadSingleImage
                imageProduct={Empty}
                open={open}
                images={imagesOriginal}
                name={"User"}
                maxNumber={maxNumber}
                onChange={onChange}
                showButton={showButton}
              />
            </div>
          </Grid>
          <Grid item md={12} sm={12} lg={10}>
            <div className="w-full flex flex-col mb-6 pl-12">
              <label className="text-2xl">
                Chọn hình ảnh kèm theo<span className="text-red-500">*</span>
              </label>
              <UploadMoreImage onChange={handleImageChange} />
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className="flex flex-col">
              <label className="text-2xl">
                Tên sản phẩm<span className="text-red-500">*</span>
              </label>
              <TextField
                name="name"
                className={cx("input-field")}
                placeholder="Vui lòng nhập tên sản phẩm"
                fullWidth
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <span className={cx("error")}>{formik.errors.name}</span>
              )}
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className="flex flex-col">
              <label className="text-2xl">
                Mô tả sản phẩm<span className="text-red-500">*</span>
              </label>
              <TextField
                name="description"
                className={cx("input-field")}
                placeholder="Vui lòng nhập mô tên sản phẩm"
                fullWidth
                margin="normal"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <span className={cx("error")}>{formik.errors.description}</span>
              )}
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className="flex flex-col">
              <label className="text-2xl">
                Giá mới<span className="text-red-500">*</span>
              </label>
              <TextField
                name="newPrice"
                className={cx("input-field")}
                placeholder="Vui lòng nhập giá tiền sản phẩm"
                fullWidth
                margin="normal"
                value={formik.values.newPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPrice && formik.errors.newPrice && (
                <span className={cx("error")}>{formik.errors.newPrice}</span>
              )}
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className="flex flex-col">
              <label className="text-2xl">
                Giá cũ<span className="text-red-500">*</span>
              </label>
              <TextField
                name="oldPrice"
                className={cx("input-field")}
                placeholder="Vui lòng nhập giá tiền cũ sản phẩm"
                fullWidth
                margin="normal"
                value={formik.values.oldPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.oldPrice && formik.errors.oldPrice && (
                <span className={cx("error")}>{formik.errors.oldPrice}</span>
              )}
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className="flex flex-col">
              <label className="text-2xl">
                Số lượng<span className="text-red-500">*</span>
              </label>
              <TextField
                name="quantity"
                className={cx("input-field")}
                placeholder="Vui lòng nhập Số lượng sản phẩm"
                fullWidth
                margin="normal"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <span className={cx("error")}>{formik.errors.quantity}</span>
              )}
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="flex flex-col w-full lg:w-1/2">
              <label className="text-2xl">Thêm màu</label>
              <OptionInput
                defaultData={[]}
                title="Vui lòng chọn màu"
                onOptionAdded={handleColorAdded}
              />
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="flex flex-col w-full lg:w-1/2">
              <label className="text-2xl">Thêm Size</label>
              <OptionInput
                title="Vui lòng chọn Size"
                defaultData={[]}
                onOptionAdded={handleSizeAdded}
              />
            </div>
          </Grid>
          <Grid item lg={3}>
            <div className="flex flex-col w-full">
              <Select
                name="category"
                id="category"
                onChange={handleCategoryChange}
                value={selectedCategoryId}
              >
                {categories?.data?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </Grid>
        </Grid>
        <div>
          <button
            onClick={formik.handleSubmit}
            className="py-4 mt-8 px-12 rounded-xl text-white text-3xl bg-green-600"
            type="button"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
