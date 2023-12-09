import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@material-ui/core";

import AuthService from "~/services/auth/AuthService";
import {
  fetchOrdersByShopAndEmail,
  selectOrderByEmail,
} from "~/store/reducers/orderSlice";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";
import Row from "./Row";
import { useTableStyles } from "~/layouts/components/CustomerMaterial";

function HistoryOrder(props) {
  const { email } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrderByEmail);
  const classes = useTableStyles();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  useEffect(() => {
    if (AuthService.getCurrentUser != null && user != null) {
      dispatch(
        fetchOrdersByShopAndEmail({ shopId: user.shopId, email: email })
      );
    }
  }, [dispatch, user]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <h3 className="relative p-4 bg-sky-200 rounded-lg text-4xl text-gray-700 mb-4">
        Lịch sử đặt hàng
      </h3>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                style={{ whiteSpace: "nowrap" }}
                className={classes.tableCell}
              >
                Mã đơn hàng
              </TableCell>
              <TableCell
                style={{ whiteSpace: "nowrap" }}
                className={classes.tableCell}
              >
                Ngày đặt hàng
              </TableCell>
              <TableCell
                style={{ whiteSpace: "nowrap" }}
                className={classes.tableCell}
              >
                Tên
              </TableCell>
              <TableCell
                style={{ whiteSpace: "nowrap" }}
                className={classes.tableCell}
              >
                Số điện thoại
              </TableCell>
              <TableCell
                style={{ whiteSpace: "nowrap" }}
                className={classes.tableCell}
              >
                Tổng tiền
              </TableCell>
              <TableCell
                style={{ whiteSpace: "nowrap" }}
                className={classes.tableCell}
              >
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders !== undefined &&
              orders
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => <Row key={order.id} order={order} />)}
          </TableBody>
        </Table>
      </TableContainer>
      {orders.length !== 0 && (
        <TablePagination
          sx={{
            fontWeight: "bold",
            mx: 0.5,
            fontSize: 22,
          }}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={orders?.length || 0}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Lựa chọn số lượng đơn hàng"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}

export default HistoryOrder;
