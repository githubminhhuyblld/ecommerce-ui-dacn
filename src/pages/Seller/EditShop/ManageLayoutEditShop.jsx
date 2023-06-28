import React from "react";
import ManageLayout from "~/layouts/ManageLayout/ManageLayout";
import EditShop from "./EditShop";

function ManageLayoutEditShop(props) {
  return (
    <div>
      <ManageLayout children={<EditShop />} />
    </div>
  );
}

export default ManageLayoutEditShop;
