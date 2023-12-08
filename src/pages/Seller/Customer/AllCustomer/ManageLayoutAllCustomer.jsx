import React from "react";
import ManageLayout from "~/layouts/ManageLayout/ManageLayout";
import AllCustomer from "./AllCustomer";


function ManageLayoutAllCustomer(props) {
  return (
    <div>
      <ManageLayout children={<AllCustomer />} />
    </div>
  );
}

export default ManageLayoutAllCustomer;
