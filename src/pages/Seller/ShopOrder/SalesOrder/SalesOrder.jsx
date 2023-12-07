import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersBySixMonths,
  fetchOrdersMonth,
  fetchOrdersWeek,
  selectOrderByMonth,
  selectOrderBySixMonth,
  selectOrderByWeek,
} from "~/store/reducers/orderSlice";
import { MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  select: {
    fontSize: "1.5rem",
  },
  menuItem: {
    fontSize: "1.2rem",
  },
}));
function SalesOrder(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [timePeriod, setTimePeriod] = useState("SIX_MONTH");
  const user = useSelector(selectUser);
  const ordersSixMonth = useSelector(selectOrderBySixMonth);
  const ordersWeek = useSelector(selectOrderByWeek);
  const ordersMonth = useSelector(selectOrderByMonth);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user != null) {
      if (timePeriod === "WEEK") {
        dispatch(fetchOrdersWeek({ shopId: user.shopId, userId: user.id }));
      } else if (timePeriod === "MONTH") {
        dispatch(fetchOrdersMonth({ shopId: user.shopId, userId: user.id }));
      } else if (timePeriod === "SIX_MONTH") {
        dispatch(
          fetchOrdersBySixMonths({ shopId: user.shopId, userId: user.id })
        );
      }
    }
  }, [dispatch, user, timePeriod]);
  const selectedOrders =
    timePeriod === "WEEK"
      ? ordersWeek
      : timePeriod === "MONTH"
      ? ordersMonth
      : ordersSixMonth;

  const data = selectedOrders.map((item, index) => {
    return {
      name: item.fromTo,
      TotalSale: item.totalSale,
    };
  });

  const formatTotalSale = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };
  return (
    <div className="w-full bg-background h-[100vh] ">
      <div className="flex item-center justify-end mb-10 p-4 mr-10">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel style={{ fontSize: 16 }} id="time-period-select-label">
            Khoảng Thời Gian
          </InputLabel>
          <Select
            labelId="time-period-select-label"
            id="time-period-select"
            value={timePeriod}
            onChange={handleChange}
            label="Khoảng Thời Gian"
            className={classes.select}
          >
            <MenuItem value="WEEK" className={classes.menuItem}>
              1 Tuần
            </MenuItem>
            <MenuItem value="MONTH" className={classes.menuItem}>
              1 Tháng
            </MenuItem>
            <MenuItem value="SIX_MONTH" className={classes.menuItem}>
              6 Tháng
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={formatTotalSale} />
          <Legend />
          <Bar dataKey="TotalSale" fill="#82ca9d" width={20} barSpacing={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesOrder;
