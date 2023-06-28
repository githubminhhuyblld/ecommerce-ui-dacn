import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";

import OrdersTable from "~/layouts/components/OdersTable/OrdersTable";
import {
  fetchLastedOrders,
  selectOrderSuccess,
  selectOrderlasted,
  selectOrdersLoading,
} from "~/store/reducers/orderSlice";
import { fetchInfoShop } from "~/store/reducers/shopSlice";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";

LastedOrder.propTypes = {};
const PAGE_SIZE = 2;
function LastedOrder(props) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const shopOrders = useSelector(selectOrderlasted);
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
        fetchLastedOrders({
          userId: user.id,
          shopId: user.shopId,
          page: 0,
          size: PAGE_SIZE,
        })
      );
    }
  }, [user, success]);
  const totalItems = shopOrders?.totalElements;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    dispatch(
      fetchLastedOrders({
        userId: user.id,
        shopId: user.shopId,
        page: newPage,
        size: PAGE_SIZE,
      })
    );
  };
  return (
    <div className="w-full bg-background h-[100vh] p-4">
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <OrdersTable title="Tất cả đơn hàng" orders={shopOrders?.content} />
      )}

      {!loading && (
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

export default LastedOrder;