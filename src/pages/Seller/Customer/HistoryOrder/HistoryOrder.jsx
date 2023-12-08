import React, { useEffect } from "react";
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
} from "@material-ui/core";

import AuthService from "~/services/auth/AuthService";
import {
  fetchOrdersByShopAndEmail,
  selectOrderByEmail,
} from "~/store/reducers/orderSlice";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";
import Row from "./Row";

function HistoryOrder(props) {
  const { email } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrderByEmail);

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
  console.log(orders.data);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">History Page</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.data !== undefined &&
              orders?.data?.map((index, order) => (
                <Row key={order.id} order={order} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HistoryOrder;
