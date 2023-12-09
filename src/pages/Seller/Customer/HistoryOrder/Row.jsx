import React from "react";
import {
  TableCell,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTableStyles } from "~/layouts/components/CustomerMaterial";
import convertTimeStamp from "~/untils/convertTimeStamp";

Row.propTypes = {
  order: PropTypes.array.isRequired,
};
function Row(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useTableStyles();
  return (
    <React.Fragment>
      <TableRow style={{cursor:"pointer"}} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{ whiteSpace: "nowrap" }}
          className={classes.tableCell}
          component="th"
          scope="row"
        >
          {order.id}
        </TableCell>
        <TableCell
          style={{ whiteSpace: "nowrap" }}
          className={classes.tableCell}
        >
          {convertTimeStamp(order.createAt)}
        </TableCell>
        <TableCell
          style={{ whiteSpace: "nowrap" }}
          className={classes.tableCell}
        >
          {order.name}
        </TableCell>
        <TableCell
          style={{ whiteSpace: "nowrap" }}
          className={classes.tableCell}
        >
          {order.numberPhone}
        </TableCell>
        <TableCell
          style={{ whiteSpace: "nowrap" }}
          className={classes.tableCell}
        >
          {order.totalPrice}
        </TableCell>
        <TableCell
          style={{ whiteSpace: "nowrap" }}
          className={classes.tableCell}
        >
          {order.orderStatus}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết đơn hàng
              </Typography>
              {order !== undefined &&
                order?.cartItems?.map((item, index) => (
                  <Box key={index} margin={1}>
                    <Typography variant="body2" gutterBottom>
                      Tên sản phẩm: {item.name}
                    </Typography>
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                    <Typography variant="body2">
                      Màu sắc: {item.color} - Size: {item.size}
                    </Typography>
                    <Typography variant="body2">
                      Giá mới: {item.newPrice} - giá cũ: {item.oldPrice}
                    </Typography>
                    <Typography variant="body2">
                      Số lượng: {item.amount}
                    </Typography>
                    <Typography variant="body2">
                      Địa chỉ shop: {item.shop.name} - Address:{" "}
                      {item.shop.address}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default Row;
