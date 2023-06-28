import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import {
  IconButton,
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
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { tooltipClasses } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";

import styles from "./ShopAllProduct.module.scss";
import { useTableStyles } from "~/layouts/components/CustomerMaterial";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { convertCurrency } from "~/untils/convertCurrency";
import {
  removeProduct,
  selectProductsByShopIdLoading,
} from "~/store/reducers/shopSlice";

const cx = classNames.bind(styles);

ShopAllProduct.propTypes = {
  data: PropTypes.array.isRequired,
};

function ShopAllProduct(props) {
  const { data } = props;
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
  const token = JSON.parse(localStorage.getItem("token"));
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: 16,
    },
  }));
  const loading = useSelector(selectProductsByShopIdLoading);
  const handleRemove = (id) => {
    dispatch(removeProduct({ productId: id, userId: token.userId })).then(
      (response) => {
        if (response.payload === 200) {
          toast.success("Xóa sản phẩm thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.warn("Có lỗi trong quá trình xóa!!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h3 className="relative p-4 bg-sky-200 rounded-lg text-4xl text-gray-700 mb-4">
        Tất cả sản phẩm
      </h3>

      {data.length !== 0 &&
        (loading ? (
          <LinearProgress />
        ) : (
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
                    {data
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
                            <TableCell className={classes.imageCell}>
                              <img
                                src={item.mainImage}
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
                                <LightTooltip title="remove">
                                  <IconButton
                                    className={classes.iconButton}
                                    onClick={() => handleRemove(item.id)}
                                    aria-label="remove"
                                  >
                                    <BsTrash className={cx("icon-remove")} />
                                  </IconButton>
                                </LightTooltip>
                                <Link to={`/shop/edit-product/${item.id}`}>
                                  <LightTooltip title="Edit">
                                    <IconButton
                                      className={classes.iconButton}
                                      aria-label="edit"
                                    >
                                      <FiEdit2 className={cx("icon-edit")} />
                                    </IconButton>
                                  </LightTooltip>
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {
                data.length !== 0 && (
                  <TablePagination
                  sx={{
                    fontWeight: "bold",
                    mx: 0.5,
                    fontSize: 22,
                  }}
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={data?.length || 0}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage="Lựa chọn số lượng sản phẩm"
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                )
              }
             
            </Paper>
          </div>
        ))}
      {data.length === 0 && (
        <div className="p-4 text-3xl">
          <p>Chưa có sản phẩm bán nào</p>
        </div>
      )}
    </div>
  );
}

export default ShopAllProduct;
