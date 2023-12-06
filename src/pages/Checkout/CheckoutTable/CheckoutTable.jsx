import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

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
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

const CheckoutTable = (props) => {
  const { languageData } = useContext(LanguageContext);
  const {
    continue_to_buy,
    add_product_name,
    edit_product_quantity,
    button_cancel,
    button_confirm,
    td_product_image,
    add_product_price,
    product_quantity,
    checkout_function,
    td_order_total_price,
    order_confirmation,
    cart_title_no_product,
  } = languageData;

  const { carts, isOrder } = props;
  const dispatch = useDispatch();
  const classes = useTableStyles();
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(null);
  const [cartItem, setCartItem] = useState({});
  const [open, setOpen] = useState(false);
  console.log(carts);

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .min(1, "Số lượng không được nhỏ hơn 1")
      .max(20, "Số lượng không quá 20")
      .required("Số lượng cập nhật là bắt buộc"),
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    const cart = carts?.data?.cartItems.find(
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
        amount: formik.values.quantity,
        userId: user.userId,
      })
    ).then((response) => {
      if (response.payload === 200) {
        setOpen(false);
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      quantity: quantity,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleAgree,
  });

  return carts.length > 0 ? (
    <div className={cx("checkout")}>
      {!isOrder && (
        <Link
          to={config.routes.home}
          className="p-5 mb-12 flex w-full md:w-2/6 justify-center items-center text-[16px] bg-sky-400 opacity-100 rounded-2xl text-white hover:opacity-80"
        >
          <AiOutlineArrowLeft className="text-3xl mr-4" /> {continue_to_buy}
        </Link>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{edit_product_quantity}</DialogTitle>
        <DialogContent>
          <DialogContentText>{cartItem.name}</DialogContentText>
          <InputBase
            autoFocus
            className={cx("input-update")}
            margin="dense"
            style={{ fontSize: "16px" }}
            name="quantity"
            inputProps={{
              min: 1,
              max: 10,
              step: 1,
            }}
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            fullWidth
            variant="standard"
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <span className={cx("error")}>{formik.errors.quantity}</span>
          ) : null}
        </DialogContent>
        <DialogActions style={{ paddingRight: "12px" }}>
          <button className={cx("btn-cancel")} onClick={handleClose}>
            {button_cancel}
          </button>
          <button className={cx("btn-Agree")} onClick={handleAgree}>
            {button_confirm}
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
                  {add_product_name}
                </TableCell>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                  className={classes.tableCell}
                >
                  {td_product_image}
                </TableCell>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                  className={classes.tableCell}
                >
                  {add_product_price}
                </TableCell>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                  className={classes.tableCell}
                >
                  {product_quantity}
                </TableCell>
                {!isOrder && (
                  <TableCell
                    style={{ whiteSpace: "nowrap" }}
                    className={classes.tableCell}
                  >
                    {checkout_function}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.map((item, index) => {
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
                        {!isOrder && (
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveCartItem(item.productId)}
                            className={classes.iconButton}
                          >
                            <BsTrash className={cx("icon-remove")} />
                          </IconButton>
                        )}
                        {!isOrder && (
                          <IconButton
                            aria-label="update"
                            className={classes.iconButton}
                            onClick={() => handleClickOpen(item.productId)}
                          >
                            <FiEdit2 className={cx("icon-edit")} />
                          </IconButton>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {!isOrder && (
        <Grid
          style={{ paddingTop: "150px" }}
          container
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item md={4}>
            <div className={cx("total-price")}>
              <p className={cx("title")}>{td_order_total_price}:</p>
              <p className={cx("price")}>
                {convertCurrency(carts?.data?.[0]?.totalPrice)}
              </p>
            </div>
          </Grid>
          <Grid container justifyContent={"flex-end"} item md={3}>
            <div className={cx("payment")}>
              <Link to={config.routes.order} className={cx("btn-payment")}>
                {order_confirmation}
              </Link>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  ) : (
    <div className={cx("empty-cart")}>
      <Link
        to={config.routes.home}
        className="p-5 mb-12 flex items-center text-[16px] bg-sky-400 opacity-100 rounded-2xl text-white hover:opacity-80"
      >
        <AiOutlineArrowLeft className="text-3xl" /> {continue_to_buy}
      </Link>
      <h3 className={cx("empty-title")}>{cart_title_no_product}</h3>
    </div>
  );
};
CheckoutTable.propTypes = {
  carts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  isOrder: PropTypes.bool.isRequired,
};

export default CheckoutTable;
