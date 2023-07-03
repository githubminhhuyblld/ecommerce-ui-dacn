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
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import styles from "~/pages/Seller/ShopProduct/AddProduct/AddProduct.module.scss";
import OptionInput from "~/layouts/components/ColorInput/OptionInput ";
import UploadSingleImage from "~/layouts/components/UploadSingleImage/UploadSingleImage";
import UploadMoreImage from "~/layouts/components/UploadMoreImage/UploadMoreImage";
import { selectCategories } from "~/store/reducers/categoriesSlice";
import { fetchCategories, getProductById } from "~/services/workspacesService";
import { storage } from "~/firebase";
import { updateProduct } from "~/store/reducers/shopSlice";

const cx = classNames.bind(styles);

EditProduct.propTypes = {};

function EditProduct(props) {
  const { id } = useParams();
  const [colors, setColors] = useState([]);
  const [siezes, setSizes] = useState([]);
  const [productsDetail, setProductDetail] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [isImagesThumailChange, setIsImagesThumailChange] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [open, setOpen] = useState(true);
  const [imagesOriginal, setImagesOriginal] = useState([]);
  const [thumails, setthumails] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setIsLoading(true);
    setShowButton(false);
    setOpen(false);
    setIsChangeImage(true);
    setImagesOriginal(imageList);
    setIsLoading(false);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };
  useEffect(() => {
    getProductById(id).then((response) => {
      setProductDetail(response.data);
      if (response) {
        setSelectedCategoryId(response.data.categoryId);
      }
    });
  }, [id]);

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
    sizes: siezes.map((size) => ({ name: size.name })),
  };
  const colorsData = {
    colors: colors.map((color) => ({
      colorName: color.colorName ? color.colorName : color,
    })),
  };
  const thumailsData = {
    thumails: thumails.map((item) => ({ imgUrl: item })),
  };

  const handleImageChange = (imageList) => {
    setIsImagesThumailChange(true);
    uploadImagesToFirebase(imageList);
  };
  const uploadImagesToFirebase = async (images) => {
    const storage = getStorage();
    const imageUrls = [];

    setIsLoading(true);

    for (const image of images) {
      if (image.file) {
        const storageRef = ref(storage, `products/${image.file.name}`);
        const uploadTask = uploadBytes(storageRef, image.file);

        await uploadTask.then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadURL);
        });
      } else {
        imageUrls.push(image.imgUrl);
      }
    }

    setthumails(imageUrls);
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: productsDetail?.name,
      description: productsDetail?.description,
      newPrice: parseInt(productsDetail?.newPrice),
      oldPrice: parseInt(productsDetail?.oldPrice),
      quantity: parseInt(productsDetail?.quantity),
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);

      let downloadURL = productsDetail?.mainImage;

      if (imagesOriginal.length > 0) {
        const storageRef = ref(
          storage,
          `products/${imagesOriginal[0]?.file.name}`
        );
        const snapshot = await uploadBytes(storageRef, imagesOriginal[0].file);
        downloadURL = await getDownloadURL(snapshot.ref);
      }

      const body = {
        categoryId: selectedCategoryId,
        name: values.name,
        description: values.description,
        mainImage: downloadURL,
        newPrice: values.newPrice,
        oldPrice: values.oldPrice,
        quantity: values.quantity,
        rating: "0",
        sizes: sizesData.sizes,
        colors: colorsData.colors,
        images: isImagesThumailChange
          ? thumailsData.thumails
          : productsDetail?.images,
      };
      if (isImagesThumailChange && thumailsData.thumails.length === 0) {
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

      if (token) {
        dispatch(
          updateProduct({ productId: id, userId: token.userId, body: body })
        ).then((response) => {
          if (response.payload === 200) {
            toast.success("Cập nhật sản phẩm thành công", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setIsImagesThumailChange(false);
            setIsLoading(false);
          }
        });
      }
    },
  });

  return (
    <div className="w-full py-8 ">
      <h3 className="relative p-4 bg-sky-200 rounded-lg text-4xl text-gray-700 mb-4">
        Cập nhật sản phẩm
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
                imageProduct={
                  productsDetail?.mainImage !== undefined
                    ? productsDetail?.mainImage
                    : ""
                }
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
            <div className="w-full flex flex-col mb-6 pl-4">
              <label className="text-2xl">
                Chọn hình ảnh kèm theo (Tối đa 8 ảnh)
                <span className="text-red-500">*</span>
              </label>
              <UploadMoreImage
                thumails={productsDetail && productsDetail?.images}
                isLoading={isLoading}
                onChange={handleImageChange}
              />
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
                defaultData={productsDetail && productsDetail?.colors}
                title="Vui lòng thêm màu vd:Đen"
                onOptionAdded={handleColorAdded}
              />
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="flex flex-col w-full lg:w-1/2">
              <label className="text-2xl">Thêm Size</label>
              <OptionInput
                title="Vui lòng thêm size vd:XL"
                defaultData={productsDetail && productsDetail?.sizes}
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

export default EditProduct;
