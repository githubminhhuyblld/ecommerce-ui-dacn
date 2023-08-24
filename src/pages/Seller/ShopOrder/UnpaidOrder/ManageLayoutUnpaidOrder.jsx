import React from "react";
import PropTypes from "prop-types";
import ManageLayout from "~/layouts/ManageLayout/ManageLayout";
import UnpaidOrder from "./UnpaidOrder";

ManageLayoutUnpaidOrder.propTypes = {};

function ManageLayoutUnpaidOrder(props) {
  return (
    <div>
      <ManageLayout children={<UnpaidOrder/>} />
    </div>
  );
}

export default ManageLayoutUnpaidOrder;
