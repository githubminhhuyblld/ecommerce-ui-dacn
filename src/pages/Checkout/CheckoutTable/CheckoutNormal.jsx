import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Checkbox, IconButton } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
} from "~/store/reducers/cartsSlice";
import LanguageContext from "~/context/languageContext";
import { AiOutlineArrowLeft } from "react-icons/ai";

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
  } = languageData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedItems = useSelector(selectedProducts);
  const [checkedItems, setCheckedItems] = useState(
    carts?.data?.map((cart) =>
      selectedItems.some(
        (selectedItem) => selectedItem.productId === cart.cartItem.productId
      )
    ) || []
  );
  const handleRemoveSelectedItems = () => {
    const productsToDelete = selectedItems.filter(
      (item, index) => checkedItems[index]
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

  const handleConfirmOrder = () => {
    const hasCheckedItems = checkedItems.some((item) => item === true);
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

  const handleChange = (index) => (event) => {
    const currentCart = carts?.data[index];
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

    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = event.target.checked;
    setCheckedItems(updatedCheckedItems);

    if (event.target.checked) {
      dispatch(addSelectedItem(currentCart.cartItem));
    } else {
      dispatch(removeSelectedItem(currentCart.cartItem));
    }
  };

  const totalCheckedPrice = carts?.data?.reduce((acc, cart, index) => {
    if (checkedItems[index]) {
      return acc + cart.cartItem.newPrice * cart.cartItem.amount;
    }
    return acc;
  }, 0);

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
              <BsTrash />
            </IconButton>
            <IconButton
              aria-label="update"
              className={""}
              // onClick={() => handleClickOpen(item.productId)}
            >
              <FiEdit2 />
            </IconButton>
          </div>
          {carts?.data?.map((item, index) => {
            return (
              <div key={item.cartItem.productId} className="py-3 shadow-md">
                <div className="flex items-center my-3">
                  <span className="text-lg p-2 mr-2 bg-orange-400 text-white">
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
                    checked={checkedItems[index]}
                    onChange={handleChange(index)}
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
              </div>
            );
          })}
          <div className="mt-12 flex items-center justify-between flex-row-reverse">
            <div className="flex items-center justify-start">
              <div className="bg-sky-500 hover:bg-sky-700 p-4">
                <span
                  className="text-white cursor-pointer"
                  onClick={handleConfirmOrder}
                >
                  {order_confirmation}
                </span>
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
