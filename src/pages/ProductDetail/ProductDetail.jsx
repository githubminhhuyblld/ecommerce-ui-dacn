import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Skeleton, Rating } from "@mui/material";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./ProductDetail.module.scss";
import ButtonList from "~/layouts/components/ButtonList/ButtonList.jsx";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdRemove } from "react-icons/io";
import {
  fetchProductsByCategoryId,
  getProductById,
} from "~/services/workspacesService.jsx";
import { convertCurrency } from "~/untils/convertCurrency.js";
import { selectUser } from "~/store/reducers/userSlice";
import config from "~/config";
import { addToCart, setSuccess } from "~/store/reducers/cartsSlice";
import { selectProductsCategory } from "~/store/reducers/ProductsCategorySlice";
import ProductItem from "../Product/ProductItem/ProductItem";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

ProductDetail.propTypes = {};

function ProductDetail(props) {

  const { languageData } = useContext(LanguageContext);
  const { buy_now, 
          add_to_cart,
          product_detail_size,
          product_detail_color,
          product_detail_quantity,
          from_the_same_shop,
          name_shop,
          address_shop,
  } = languageData;


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [value, setValue] = useState(2);
  const products = useSelector(selectProductsCategory);

  const isLoading = !productDetail;
  useEffect(() => {
    getProductById(id).then((res) => setProductDetail(res?.data));
  }, [id]);

  const fetchData = useCallback(() => {
    if (!isLoading && productDetail) {
      dispatch(
        fetchProductsByCategoryId({
          categoryId: productDetail.categoryId,
          page: 0,
          size: 10,
        })
      );
    }
  }, [isLoading, productDetail, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const colorOptions = productDetail?.colors?.map((item) => {
    return { id: item.id, label: item.colorName };
  });
  const imagesOptions = productDetail?.images?.map((item) => {
    return { id: item.id, original: item.imgUrl, thumbnail: item.imgUrl };
  });

  const sizeOptions = productDetail?.sizes?.map((item) => {
    return { id: item.id, label: item.name };
  });

  const handleColorSelect = (color) => {
    setColor(color);
  };

  const handleSizeSelect = (size) => {
    setSize(size);
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (null === user) {
      navigate(config.routes.login);
    }
    const userId = user.id;
    const cartItem = {
      amount: count,
      categoryId: productDetail?.categoryId,
      color:
        color.length > 0
          ? color
          : productDetail?.colors && productDetail?.colors.length > 0
          ? productDetail?.colors[0]?.colorName
          : undefined,
      description: productDetail?.description,
      mainImage: productDetail?.mainImage,
      name: productDetail?.name,
      newPrice: productDetail?.newPrice,
      oldPrice: productDetail?.oldPrice,
      productId: productDetail?.id,
      sale: productDetail?.sale,
      size:
        size.length > 0
          ? size
          : productDetail?.sizes && productDetail.sizes.length > 0
          ? productDetail.sizes[0]?.name
          : undefined,
      shop: {
        address: productDetail?.shop.address,
        description: productDetail?.shop.description,
        id: productDetail?.shop.id,
        name: productDetail?.shop.name,
        image: productDetail?.shop.image,
      },
    };

    dispatch(addToCart({ userId: userId, cartItem: cartItem }))
      .then((response) => {
        if (response.payload === 200) {
          dispatch(setSuccess((prev) => !prev));
          toast.success("Đã thêm vào giỏ hàng", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.warning(" Thêm sản phẩm vào giỏ hàng thất bại", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const renderImageItem = (item) => {
    return (
      <div className={cx("main-image")}>
        <img src={item.original} alt="" />
      </div>
    );
  };
  const renderThumbnailItem = (item) => {
    return (
      <div className={cx("image-gallery-thumbnail")}>
        <img src={item.thumbnail} alt="" />
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("wrapper-content")}>
          <Grid container spacing={2}>
            <Grid
              container
              item
              sm={12}
              md={3}
              lg={4}
              justifyContent="center"
              style={{ marginBottom: "95px" }}
            >
              {isLoading ? (
                <div className={cx("main-image")}>
                  <Skeleton
                    variant="rect"
                    width="100%"
                    style={{ marginTop: 10 }}
                    height={330}
                    animation="wave"
                  />
                  <div className={cx("thumbnail-skeleton")}>
                    <Skeleton
                      variant="rect"
                      width="86px"
                      style={{ marginTop: 10, marginRight: 10 }}
                      height={80}
                      animation="wave"
                    />
                    <Skeleton
                      variant="rect"
                      width="86px"
                      style={{ marginTop: 10, marginRight: 10 }}
                      height={80}
                      animation="wave"
                    />
                    <Skeleton
                      variant="rect"
                      width="86px"
                      style={{ marginTop: 10, marginRight: 10 }}
                      height={80}
                      animation="wave"
                    />
                    <Skeleton
                      variant="rect"
                      width="86px"
                      style={{ marginTop: 10, marginRight: 10 }}
                      height={80}
                      animation="wave"
                    />
                  </div>
                </div>
              ) : (
                <div className={cx("main-image")}>
                  {imagesOptions && imagesOptions.length > 0 && (
                    <ReactImageGallery
                      items={imagesOptions}
                      renderItem={renderImageItem}
                      renderThumbInner={renderThumbnailItem}
                      showNav={true}
                      showFullscreenButton={false}
                      showPlayButton={false}
                    />
                  )}
                </div>
              )}
            </Grid>
            <Grid item sm={12} md={8} lg={8}>
              <div className={cx("product-info")}>
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    height={50}
                    width="100%"
                    style={{ marginBottom: 12 }}
                  />
                ) : (
                  <h3 className={cx("product-name")}>{productDetail?.name}</h3>
                )}

                {isLoading ? (
                  <div className={cx("vote")}>
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={24}
                      width={30}
                    />
                  </div>
                ) : (
                  <div className={cx("vote")}>
                    <Rating
                      name="half-rating-read"
                      className={cx("star")}
                      defaultValue={parseInt(productDetail?.rating)}
                      readOnly
                    />
                  </div>
                )}

                <div className={cx("price-sale")}>
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      height={40}
                      width={80}
                      style={{ marginBottom: 12 }}
                    />
                  ) : (
                    <span className={cx("new-price")}>
                      {convertCurrency(productDetail?.newPrice)}
                    </span>
                  )}

                  {isLoading ? (
                    <div className={cx("price")}>
                      <span className={cx("old-price")}>
                        <Skeleton animation="wave" height={40} width={80} />
                      </span>
                      <span className={cx("sale")}>
                        <Skeleton animation="wave" height={30} width={30} />
                      </span>
                    </div>
                  ) : (
                    <div className={cx("price")}>
                      <span className={cx("old-price")}>
                        {convertCurrency(productDetail?.oldPrice)}
                      </span>
                      <span className={cx("sale")}>
                        -{productDetail?.sale}%
                      </span>
                    </div>
                  )}
                  {isLoading ? (
                    <Skeleton animation="wave" height={40} width={"30%"} />
                  ) : (
                    <h3 className={cx("title")}>{product_detail_color}</h3>
                  )}

                  {isLoading ? (
                    <div className={cx("options")}>
                      <Skeleton
                        animation="wave"
                        height={60}
                        width="80%"
                        style={{ marginBottom: 12 }}
                      />
                    </div>
                  ) : (
                    <div className={cx("options")}>
                      {colorOptions && colorOptions.length > 0 && (
                        <ButtonList
                          options={colorOptions}
                          onSelect={handleColorSelect}
                        />
                      )}
                    </div>
                  )}

                  {isLoading ? (
                    <Skeleton animation="wave" height={40} width={"30%"} />
                  ) : (
                    <h3 className={cx("title")}>{product_detail_size}</h3>
                  )}
                  {isLoading ? (
                    <div className={cx("options")}>
                      <Skeleton
                        animation="wave"
                        height={60}
                        width="80%"
                        style={{ marginBottom: 12 }}
                      />
                    </div>
                  ) : (
                    <div className={cx("options")}>
                      {sizeOptions && sizeOptions.length > 0 && (
                        <ButtonList
                          options={sizeOptions}
                          onSelect={handleColorSelect}
                        />
                      )}
                    </div>
                  )}

                  {isLoading ? (
                    <Skeleton animation="wave" height={40} width={"30%"} />
                  ) : (
                    <h3 className={cx("title")}>{product_detail_quantity}</h3>
                  )}
                  {isLoading ? (
                    <div className={cx("amount")}>
                      <Skeleton
                        animation="wave"
                        height={40}
                        width={40}
                        style={{ marginRight: 8 }}
                      />
                      <Skeleton
                        animation="wave"
                        height={40}
                        width={40}
                        style={{ marginRight: 8 }}
                      />
                      <Skeleton
                        animation="wave"
                        height={40}
                        width={40}
                        style={{ marginRight: 8 }}
                      />
                    </div>
                  ) : (
                    <div className={cx("amount")}>
                      <span
                        className={cx("amount-item")}
                        onClick={handleIncrement}
                      >
                        <AiOutlinePlus />
                      </span>
                      <span className={cx("count")}>{count}</span>
                      <span
                        className={cx("amount-item", {
                          "amount-item-disabled": count <= 1,
                        })}
                        onClick={handleDecrement}
                      >
                        <IoMdRemove />
                      </span>
                    </div>
                  )}
                  {isLoading ? (
                    <h3 className={cx("shop-name")}>
                      <Skeleton
                        animation="wave"
                        height={40}
                        width="80%"
                        style={{ marginBottom: 8 }}
                      />
                    </h3>
                  ) : (
                    <div className={cx("shop")}>
                      <h3 className={cx("shop-name")}>
                        {name_shop}{productDetail?.shop.name}
                      </h3>
                      <p className={cx("shop-address")}>
                        {address_shop}{productDetail?.shop.address}
                      </p>
                    </div>
                  )}

                  <div className={cx("function")}>
                    {isLoading ? (
                      <>
                        <Skeleton
                          animation="wave"
                          height={80}
                          width="50%"
                          style={{ marginRight: 8 }}
                        />
                        <Skeleton
                          animation="wave"
                          height={80}
                          width="50%"
                          style={{ marginRight: 8 }}
                        />
                      </>
                    ) : (
                      <>
                        <button className={`btn ${cx("btn-buy-now")}`}>
                          {buy_now}
                        </button>
                        <button
                          onClick={handleAddToCart}
                          className={`btn ${cx("btn-add-cart")}`}
                        >
                          {add_to_cart}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="w-full mt-20  bg-gray-200">
            <h3 className="text-3xl p-8">
              Mô tả sản phẩm {productDetail?.name}
            </h3>
            <p className="px-8">
              Máy pha cà phê tự động là một thiết bị tiện dụng và đa chức năng
              được thiết kế để tạo ra những tách cà phê chất lượng cao ngay tại
              nhà hoặc văn phòng. Với công nghệ tiên tiến và tính năng đa dạng,
              máy pha cà phê tự động mang lại trải nghiệm pha cà phê chuyên
              nghiệp và thỏa mãn như ở các quán cà phê hàng đầu. Máy pha cà phê
              tự động có một loạt các chức năng và điều khiển thông minh, cho
              phép người dùng tùy chỉnh và lựa chọn theo sở thích cá nhân. Máy
              được trang bị một hệ thống pha cà phê tự động với một nắp chứa cà
              phê, một bình chứa nước, và một bộ lọc. Người dùng chỉ cần đổ cà
              phê và nước vào máy, lựa chọn các thiết lập và một nút nhấn, máy
              sẽ tự động xử lý quá trình pha cà phê từ việc xay cà phê, nén cà
              phê, đổ nước nóng và thu hoạch cà phê tươi ngon trong thời gian
              ngắn. Máy pha cà phê tự động cung cấp một loạt các loại cà phê
              khác nhau để đáp ứng nhu cầu đa dạng của người dùng. Người dùng có
              thể lựa chọn từ cà phê đen, cà phê sữa, espresso, cappuccino và
              nhiều hơn nữa. Ngoài ra, máy còn cho phép điều chỉnh độ mịn của cà
              phê xay, nhiệt độ nước, và tỷ lệ cà phê-nước để tạo ra ly cà phê
              hoàn hảo theo sở thích cá nhân.
            </p>
          </div>
          <div className="px-8 mt-20 bg-gray-200 p-8">
            <h3 className="text-4xl text-black mb-10">
              {from_the_same_shop}
            </h3>
            <Grid container spacing={2}>
              {products?.content?.map((item) => (
                <Grid key={item.id} item lg={12 / 5} md={4} sm={6} xs={12}>
                  <ProductItem product={item} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductDetail;
