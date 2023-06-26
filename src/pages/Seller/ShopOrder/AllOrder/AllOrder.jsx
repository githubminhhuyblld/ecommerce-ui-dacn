import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";

import OrdersTable from "~/layouts/components/OdersTable/OrdersTable";
import {
  fetchOrdersByShopId,
  selectOrderSuccess,
  selectOrdersByShopId,
} from "~/store/reducers/orderSlice";
import { fetchInfoShop, selectInfoShop } from "~/store/reducers/shopSlice";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";

AllOrder.propTypes = {};

function AllOrder(props) {
  const dispatch = useDispatch();
  const shopOrders = useSelector(selectOrdersByShopId);
  const success = useSelector(selectOrderSuccess);

  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  useEffect(() => {
    if (user !== null) {
      dispatch(fetchInfoShop({ shopId: user.shopId, userId: user.id }));
      dispatch(fetchOrdersByShopId({ userId: user.id, shopId: user.shopId }));
    }
  }, [user,success]);

  return (
    <div className="w-full bg-background h-[100vh] p-4">
      <OrdersTable
        title="Tất cả đơn hàng"
        orders={shopOrders}
      />
    </div>
  );
}

export default AllOrder;
