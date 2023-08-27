import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";

import OrdersTable from "~/layouts/components/OdersTable/OrdersTable";
import {
  fetchOrdersByShopId,
  resetData,
  selectOrderSuccess,
  selectOrdersByShopId,
  selectOrdersLoading,
} from "~/store/reducers/orderSlice";
import { fetchInfoShop } from "~/store/reducers/shopSlice";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";

AllOrder.propTypes = {};

const PAGE_SIZE = 2;

function AllOrder(props) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const shopOrders = useSelector(selectOrdersByShopId);
  const success = useSelector(selectOrderSuccess);
  const user = useSelector(selectUser);
  const loading = useSelector(selectOrdersLoading);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  useEffect(() => {
    if (user !== null) {
      dispatch(fetchInfoShop({ shopId: user.shopId, userId: user.id }));
      dispatch(
        fetchOrdersByShopId({
          userId: user.id,
          shopId: user.shopId,
          page: 0,
          size: PAGE_SIZE,
        })
      ).then((response) => {
        if (response.payload === 404) {
          dispatch(resetData());
        }
      });
    }
  }, [user, success]);
  const totalItems = shopOrders?.totalElements;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    dispatch(
      fetchOrdersByShopId({
        userId: user.id,
        shopId: user.shopId,
        page: newPage,
        size: PAGE_SIZE,
      })
    );
  };
  console.log(shopOrders?.content);


  return (
    <div className="w-full bg-background h-[100vh] p-4">
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <OrdersTable title="Tất cả đơn hàng" orders={shopOrders?.content} />
      )}
       {shopOrders?.content?.length === undefined && (
        <div className="px-8">
          <span className="text-3xl text-purple-500">
            Chưa có đơn hàng nào !!!!!
          </span>
        </div>
      )}
      {!loading && shopOrders?.content?.length > 0 && (
        <div>
          <Pagination
            count={totalPages || 0}
            page={currentPage + 1}
            onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
            size="large"
            color="primary"
          />
        </div>
      )}
    </div>
  );
}

export default AllOrder;
