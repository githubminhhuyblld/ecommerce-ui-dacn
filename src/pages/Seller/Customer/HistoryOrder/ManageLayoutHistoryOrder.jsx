import React from "react";
import ManageLayout from "~/layouts/ManageLayout/ManageLayout";
import HistoryOrder from "./HistoryOrder";


function ManageLayoutHistoryOrder(props) {
  return (
    <div>
      <ManageLayout children={<HistoryOrder />} />
    </div>
  );
}

export default ManageLayoutHistoryOrder;
