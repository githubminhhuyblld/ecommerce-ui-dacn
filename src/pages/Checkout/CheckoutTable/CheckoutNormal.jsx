import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Checkbox, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Product from "~/assets/product/product1.jpg";
import { convertCurrency } from "~/untils/convertCurrency";
import config from "~/config";
import { addSelectedItem, removeSelectedItem, selectCartItems, selectedProducts } from "~/store/reducers/cartsSlice";

CheckoutNormal.propTypes = {
  carts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

function CheckoutNormal(props) {
  const { carts } = props;
  const dispatch = useDispatch();
   const selectedItems = useSelector(selectedProducts);
  const [checkedItems, setCheckedItems] = useState(
    carts?.data?.map(cart => 
      selectedItems.some(selectedItem => selectedItem.productId === cart.cartItem.productId)
    ) || []
  );
  const cartItem = useSelector(selectedProducts)
  console.log(carts);

  const handleChange = (index) => (event) => {
    const currentCart = carts?.data[index];
    if (event.target.checked) {
        if (selectedItems.length > 0) {
            const isSameShop = selectedItems.every(item => item.shop.id === currentCart.cartItem.shop.id);
            if (!isSameShop) {
                alert("Bạn chỉ có thể chọn các sản phẩm từ cùng một cửa hàng để thanh toán trước.");
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

  console.log(cartItem);

  const totalCheckedPrice = carts?.data?.reduce((acc, cart, index) => {
    if (checkedItems[index]) {
      return acc + cart.cartItem.newPrice * cart.cartItem.amount;
    }
    return acc;
  }, 0);
  console.log(carts);
  return (
    <div>
      <div>
        <IconButton
          aria-label="delete"
          // onClick={() => handleRemoveCartItem(item.productId)}
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
      <div className="">
        <div className="flex items-center justify-end mt-4">
          <div className="bg-orange-400 p-4 flex items-center">
            <p className="text-white">Tổng tiền:</p>
            <p className="text-white">{convertCurrency(totalCheckedPrice)}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <Link to={config.routes.order}>Xác nhận đơn hàng</Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutNormal;
