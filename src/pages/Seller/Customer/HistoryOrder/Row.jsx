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

import { FaChevronDown,FaChevronUp } from "react-icons/fa";

Row.propTypes = {
  order: PropTypes.array.isRequired,
};
function Row(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell>{order.name}</TableCell>
        <TableCell>{order.email}</TableCell>
        <TableCell>{order.numberPhone}</TableCell>
        <TableCell>{order.totalPrice}</TableCell>
        <TableCell>{order.orderStatus}</TableCell>
        <TableCell>{order.paymentType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default Row;
