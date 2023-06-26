import React from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";

import CreateAddress from "~/layouts/components/CreateAddress/CreateAddress";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";

CreateAddressPage.propTypes = {};

function CreateAddressPage(props) {
  const handleSaveAddress = () => {};
  return (
    <div className="w-full bg-background">
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            <SidebarLeft />
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
            <h3 className="text-4xl mb-8">Chỉnh sửa thông tin địa chỉ</h3>
            <CreateAddress
              handleSaveAddress={handleSaveAddress}
              provinceDefault={"none"}
              districIdDefault={"none"}
              wardIdDefault={"none"}
              fullNameDefault={"none"}
              numberPhoneDefault={"none"}
              addressDefault={"none"}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CreateAddressPage;
