import React, { useEffect, useRef, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputBase,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./CheckoutTable.module.scss";
import { useTableStyles } from "~/layouts/components/CustomerMaterial";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { convertCurrency } from "~/untils/convertCurrency";
import {
  removeCartItem,
  updateQuantityCartItem,
} from "~/store/reducers/cartsSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import config from "~/config";

const cx = classNames.bind(styles);

const CheckoutTable = (props) => {
  const { carts } = props;
  const dispatch = useDispatch();
  const classes = useTableStyles();
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(null);
  const [cartItem, setCartItem] = useState({});
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    let newValue = event.target.value;
    if (newValue < 1) {
      setError("Số lượng không được dưới 1");
    }
    setQuantity(newValue);
  };

  useEffect(() => {
    if (quantity) {
      setError("");
    }
  }, [quantity]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    const cart = carts?.data?.[0]?.cartItems.find(
      (item) => item.productId === id
    );
    if (cart) {
      setProductId(id);
      setCartItem(cart);
      setQuantity(cart.amount);
      setOpen(true);
    }
  };

  const handleRemoveCartItem = (productId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      dispatch(removeCartItem({ userId: token.userId, itemId: productId }));
    }
  };
  const handleAgree = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    dispatch(
      updateQuantityCartItem({
        productId: productId,
        amount: quantity,
        userId: user.userId,
      })
    );
    setOpen(false);
  };

  return carts?.data?.[0]?.cartItems?.length > 0 ? (
    <div className={cx("checkout")}>
      <Link
        to={config.routes.home}
        className="p-5 mb-12 flex w-1/6 justify-center items-center text-[16px] bg-sky-400 opacity-100 rounded-2xl text-white hover:opacity-80"
      >
        <AiOutlineArrowLeft className="text-3xl mr-4" /> Tiếp tục mua hàng
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sửa số lượng sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>{cartItem.name}</DialogContentText>
          <InputBase
            autoFocus
            className={cx("input-update")}
            margin="dense"
            style={{ fontSize: "16px" }}
            defaultValue={cartItem.quantity}
            inputProps={{
              min: 1,
              max: 10,
              step: 1,
            }}
            value={quantity}
            onChange={handleInputChange}
            type="number"
            fullWidth
            variant="standard"
          />
          <span className={cx("error")}>{error}</span>
        </DialogContent>
        <DialogActions style={{ paddingRight: "12px" }}>
          <button className={cx("btn-cancel")} onClick={handleClose}>
            Hủy bỏ
          </button>
          <button className={cx("btn-Agree")} onClick={handleAgree}>
            Đồng ý
          </button>
        </DialogActions>
      </Dialog>
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
              {carts?.data?.[0]?.cartItems?.map((item, index) => {
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
                        src={item.mainImage}
                        alt={item.name}
                        className={classes.image}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {convertCurrency(item.newPrice)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {item.amount}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <div className={cx("function")}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleRemoveCartItem(item.productId)}
                          className={classes.iconButton}
                        >
                          <BsTrash className={cx("icon-remove")} />
                        </IconButton>
                        <IconButton
                          aria-label="update"
                          className={classes.iconButton}
                          onClick={() => handleClickOpen(item.productId)}
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
            <p className={cx("price")}>
              {convertCurrency(carts?.data?.[0]?.totalPrice)}
            </p>
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
  ) : (
    <div className={cx("empty-cart")}>
      <Link
        to={config.routes.home}
        className="p-5 mb-12 flex items-center text-[16px] bg-sky-400 opacity-100 rounded-2xl text-white hover:opacity-80"
      >
        <AiOutlineArrowLeft className="text-3xl" /> Tiếp tục mua hàng
      </Link>
      <h3 className={cx("empty-title")}>Chưa có sản phẩm trong giỏ hàng</h3>
    </div>
  );
};
CheckoutTable.propTypes = {
  carts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default CheckoutTable;