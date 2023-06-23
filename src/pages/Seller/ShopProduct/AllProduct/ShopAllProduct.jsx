import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
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
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./ShopAllProduct.module.scss";
import { useTableStyles } from "~/layouts/components/CustomerMaterial";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { convertCurrency } from "~/untils/convertCurrency";
import { selectProductsByShopIdLoading } from "~/store/reducers/shopSlice";

const cx = classNames.bind(styles);

ShopAllProduct.propTypes = {
  data: PropTypes.array.isRequired,
};

function ShopAllProduct(props) {
  const { data } = props;
  const classes = useTableStyles();
  const dispatch = useDispatch();
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: 16,
    },
  }));
  const loading = useSelector(selectProductsByShopIdLoading);
  console.log(data);

  return (
    <div className={cx("wrapper")}>
      <h3 className="relative">Tất cả sản phẩm</h3>

      {loading ? (
        <div className="absolute top-40 left-1/2">
          <div className="">
            <CircularProgress />
          </div>
        </div>
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
                  {data.map((item, index) => {
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
                                //   onClick={() => handleRemove(item.id)}
                                aria-label="remove"
                              >
                                <BsTrash className={cx("icon-remove")} />
                              </IconButton>
                            </LightTooltip>
                            <Link to={``}>
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
            {/* <TablePagination
                    sx={{
                        fontWeight: 'bold',
                        mx: 0.5,
                        fontSize: 16,
                    }}
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={products?.length || 0}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage="Lựa chọn số lượng sản phẩm"
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
          </Paper>
        </div>
      )}
    </div>
  );
}

export default ShopAllProduct;
