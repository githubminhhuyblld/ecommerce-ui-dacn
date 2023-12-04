import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputBase,
  Tooltip,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Product from "~/assets/product/product1.jpg";
import { convertCurrency } from "~/untils/convertCurrency";
import config from "~/config";
import {
  addSelectedItem,
  removeCartItem,
  removeSelectedItem,
  selectCartItems,
  selectedProducts,
  updateQuantityCartItem,
} from "~/store/reducers/cartsSlice";
import LanguageContext from "~/context/languageContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useFormik } from "formik";

CheckoutNormal.propTypes = {
  carts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

function CheckoutNormal(props) {
  const { carts } = props;
  const { languageData } = useContext(LanguageContext);
  const {
    td_order_total_price,
    order_confirmation,
    continue_to_buy,
    cart_title_no_product,
    edit_product_quantity,
    button_cancel,
    button_confirm,
  } = languageData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(null);
  const [cartItem, setCartItem] = useState({});
  const [open, setOpen] = useState(false);
  const selectedItems = useSelector(selectedProducts);
  const initialCheckedItems = JSON.parse(
    localStorage.getItem("checkedItems") || "{}"
  );
  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);

  const handleRemoveSelectedItems = () => {
    const idsToDelete = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );
    const token = JSON.parse(localStorage.getItem("token"));

    idsToDelete.forEach((id) => {
      const itemToRemove = carts?.data?.find((cart) => cart.id === id);
      if (itemToRemove) {
        dispatch(removeSelectedItem(itemToRemove.cartItem));
      }
      dispatch(removeCartItem({ userId: token.userId, itemId: id }));
    });

    const updatedCheckedItems = { ...checkedItems };
    idsToDelete.forEach((id) => delete updatedCheckedItems[id]);
    setCheckedItems(updatedCheckedItems);
  };

  const handleChange = (index) => (event) => {
    const currentCart = carts?.data?.find((cart) => cart.id === index);
    if (!currentCart) return;

    if (event.target.checked) {
      if (selectedItems.length > 0) {
        const isSameShop = selectedItems.every(
          (item) => item.shop.id === currentCart.cartItem.shop.id
        );
        if (!isSameShop) {
          alert(
            "Bạn chỉ có thể chọn các sản phẩm từ cùng một cửa hàng để thanh toán trước."
          );
          return;
        }
      }
    }

    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[currentCart.id] = event.target.checked;
    setCheckedItems(updatedCheckedItems);
    localStorage.setItem("checkedItems", JSON.stringify(updatedCheckedItems));

    if (event.target.checked) {
      dispatch(addSelectedItem(currentCart.cartItem));
    } else {
      dispatch(removeSelectedItem(currentCart.cartItem));
    }
  };
  const totalCheckedPrice = carts?.data?.reduce((acc, cart) => {
    const cartId = cart.id;
    if (checkedItems && checkedItems[cartId]) {
      return acc + cart.cartItem.newPrice * cart.cartItem.amount;
    }
    return acc;
  }, 0);
  const handleConfirmOrder = () => {
    const hasCheckedItems = Object.values(checkedItems).some(
      (value) => value === true
    );

    if (!hasCheckedItems) {
      toast.warning("Vui lòng chọn đơn hàng để đăt hàng!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      navigate(config.routes.order);
    }
  };

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .min(1, "Số lượng không được nhỏ hơn 1")
      .max(20, "Số lượng không quá 20")
      .required("Số lượng cập nhật là bắt buộc"),
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    const cart = carts?.data?.find((item) => item.cartItem.productId === id);
    if (cart) {
      setProductId(id);
      setCartItem(cart);
      setQuantity(cart.amount);
      setOpen(true);
    }
  };
  const handleRemoveCartItem = () => {
    const productsToDelete = selectedItems.filter(
      (item) => checkedItems[item.id]
    );
    const user = JSON.parse(localStorage.getItem("token"));
    productsToDelete.forEach((product) => {
      dispatch(
        removeCartItem({
          userId: user.userId,
          itemId: product.productId,
        })
      );
    });
  };

  const handleAgree = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    dispatch(
      updateQuantityCartItem({
        productId: productId,
        amount: formik.values.quantity,
        userId: user.userId,
      })
    ).then((response) => {
      console.log(response);
      if (response.payload === 200) {
        setOpen(false);
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      quantity: quantity,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleAgree,
  });

  return (
    <div>
      {carts?.data?.length > 0 ? (
        <div>
          <div>
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveSelectedItems()}
              className={""}
            >
              <Tooltip title="Xóa sản phẩm khỏi giỏ hàng">
                <BsTrash />
              </Tooltip>
            </IconButton>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{edit_product_quantity}</DialogTitle>
            <DialogContent>
              <DialogContentText>{cartItem?.cartItem?.name}</DialogContentText>
              <InputBase
                autoFocus
                className="input-update"
                margin="dense"
                style={{ fontSize: "16px" }}
                name="quantity"
                inputProps={{
                  min: 1,
                  max: 10,
                  step: 1,
                }}
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                fullWidth
                variant="standard"
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <span className="text-red-300">{formik.errors.quantity}</span>
              ) : null}
            </DialogContent>
            <DialogActions style={{ paddingRight: "12px" }}>
              <button
                className="bg-red-400 p-2 text-white hover:bg-red-700 rounded-lg"
                onClick={handleClose}
              >
                {button_cancel}
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 p-2 rounded-lg text-white"
                onClick={handleAgree}
              >
                {button_confirm}
              </button>
            </DialogActions>
          </Dialog>
          {carts?.data?.map((item, index) => {
            return (
              <div
                key={item.cartItem.productId}
                className="py-3 shadow-md relative"
              >
                <div className="flex items-center my-3">
                  <span className="text-lg p-2 mx-3 mr-2 bg-orange-400 text-white">
                    Yêu thích
                  </span>
                  <Avatar
                    alt={item.cartItem.shop.name}
                    src={item.cartItem.shop.image}
                  />
                  <h3 className="ml-3">{item.cartItem.shop.name}</h3>
                </div>
                <div className="flex ">
                  <Checkbox
                    checked={checkedItems[item.id] || false}
                    onChange={handleChange(item.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className="w-40 h-40">
                    <img src={item.cartItem.mainImage} />
                  </div>
                  <div className="px-3 flex flex-col">
                    <h3>{item.cartItem.name}</h3>
                    <span>{convertCurrency(item.cartItem.newPrice)}</span>
                    <span>x {item.cartItem.amount}</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <IconButton
                    aria-label="update"
                    className={""}
                    onClick={() => handleClickOpen(item.cartItem.productId)}
                  >
                    <Tooltip title="Sửa thông tin sản phẩm">
                      <FiEdit2 />
                    </Tooltip>
                  </IconButton>
                </div>
              </div>
            );
          })}
          <div className="mt-12 flex items-center justify-between flex-row-reverse">
            <div className="flex items-center justify-start">
              <div
                onClick={handleConfirmOrder}
                className="bg-sky-500 hover:bg-sky-700 p-4 cursor-pointer"
              >
                <span className="text-white">{order_confirmation}</span>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="bg-orange-400 p-4 flex items-center">
                <p className="text-white">{td_order_total_price}:</p>
                <p className="text-white">
                  {convertCurrency(totalCheckedPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-20 h-[440px]">
          <Link
            to={config.routes.home}
            className="p-5 mb-12 flex items-center text-[16px] bg-sky-400 opacity-100 rounded-2xl text-white hover:opacity-80"
          >
            <AiOutlineArrowLeft className="text-3xl" /> {continue_to_buy}
          </Link>
          <h3 className="text-4xl text-red-500">{cart_title_no_product}</h3>
        </div>
      )}
    </div>
  );
}

export default CheckoutNormal;
