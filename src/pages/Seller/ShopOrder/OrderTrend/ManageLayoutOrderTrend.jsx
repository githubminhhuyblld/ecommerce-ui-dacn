import React from "react";
import ManageLayout from "~/layouts/ManageLayout/ManageLayout";
import OrderTrend from "./OrderTrend";
import PropTypes from "prop-types";

ManageLayoutOrderTrend.propTypes = {
  children: PropTypes.element.isRequired,
};
function ManageLayoutOrderTrend(props) {
  return (
    <div>
      <ManageLayout children={<OrderTrend />} />
    </div>
  );
}

export default ManageLayoutOrderTrend;
