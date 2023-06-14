import React, { useState } from "react";
import classNames from "classnames/bind";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";

import styles from "./CheckoutTable.module.scss";
import { useTableStyles } from "~/layouts/components/CustomerMaterial";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { convertCurrency } from "~/untils/convertCurrency";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const CheckoutTable = ({ items }) => {
  const classes = useTableStyles();

  return (
    <div className={cx("checkout")}>
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
                  Tên sản phẩm
                </TableCell>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                  className={classes.tableCell}
                >
                  Hình ảnh
                </TableCell>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                  className={classes.tableCell}
                >
                  Giá
                </TableCell>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                  className={classes.tableCell}
                >
                  Số lượng
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
              {items.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? classes.oddRow : classes.evenRow
                    }
                  >
                    <TableCell className={classes.tableCell}>
                      {item.name}
                    </TableCell>
                    <TableCell className={classes.imageCell}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={classes.image}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {convertCurrency(item.newPrice)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {item.quantity}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <div className={cx("function")}>
                        <IconButton
                          aria-label="delete"
                          className={classes.iconButton}
                        >
                          <BsTrash className={cx("icon-remove")} />
                        </IconButton>
                        <IconButton
                          aria-label="update"
                          className={classes.iconButton}
                        >
                          <FiEdit2 className={cx("icon-edit")} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid
        style={{ paddingTop: "150px" }}
        container
        spacing={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item md={4}>
          <div className={cx("total-price")}>
            <p className={cx("title")}>Tổng tiền:</p>
            <p className={cx("price")}>{convertCurrency(30000)}</p>
          </div>
        </Grid>
        <Grid container justifyContent={"flex-end"} item md={3}>
          <div className={cx("payment")}>
            <Link to={""} className={cx("btn-payment")}>
              Thanh toán
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutTable;
