import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import styled from "@emotion/styled";
import { tooltipClasses } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";

import styles from "~/pages/Seller/ShopProduct/AllProduct/ShopAllProduct.module.scss";
import { useTableStyles } from "~/layouts/components/CustomerMaterial";
import {
  fetchCustomers,
  selectCustomers,
  selectCustomersLoading,
} from "~/store/reducers/customerSlice";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";
import AuthService from "~/services/auth/AuthService";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AllCustomer(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useTableStyles();
  const dispatch = useDispatch();
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: 16,
    },
  }));

  const loading = useSelector(selectCustomersLoading);
  const user = useSelector(selectUser);
  const customers = useSelector(selectCustomers);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  useEffect(() => {
    if (AuthService.getCurrentUser != null && user != null) {
      dispatch(fetchCustomers({ shopId: user.shopId }));
    }
  }, [dispatch, user]);
  return (
    <div className={cx("wrapper")}>
      <h3 className="relative p-4 bg-sky-200 rounded-lg text-4xl text-gray-700 mb-4">
        Tất cả sản phẩm
      </h3>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        customers.length !== 0 && (
          <div className={cx("manage")}>
            <Paper sx={{ width: "100%" }}>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
                sx={{ maxHeight: 440 }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ whiteSpace: "nowrap" }}
                        className={classes.tableCell}
                      >
                        Tên khách hàng
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
                        Email
                      </TableCell>
                      <TableCell
                        style={{ whiteSpace: "nowrap" }}
                        className={classes.tableCell}
                      >
                        Địa chỉ
                      </TableCell>
                      <TableCell
                        style={{ whiteSpace: "nowrap" }}
                        className={classes.tableCell}
                      >
                        Chức năng
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        return (
                          <TableRow key={item.id} className={classes.evenRow}>
                            <TableCell className={classes.tableCell}>
                              {item.name}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {item.numberPhone}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {item.email}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {item.address}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Link
                                style={{
                                  textDecoration: "underline",
                                  color: "blue",
                                }}
                                to={`/orders/history/${item.email}`}
                              >
                                Xem lịch sử
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {customers.length !== 0 && (
                <TablePagination
                  sx={{
                    fontWeight: "bold",
                    mx: 0.5,
                    fontSize: 22,
                  }}
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={customers?.length || 0}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage="Lựa chọn số lượng khách hàng"
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </Paper>
          </div>
        )
      )}

      {customers.length === 0 && (
        <div className="p-4 text-3xl">
          <p>Chưa có sản phẩm bán nào</p>
        </div>
      )}
    </div>
  );
}

export default AllCustomer;
