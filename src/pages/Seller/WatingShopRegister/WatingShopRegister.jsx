import React from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { ImLocation2 } from "react-icons/im";
import { selectInfoShop } from "~/store/reducers/shopSlice";
import { FaArrowRight } from "react-icons/fa";
import config from "~/config";

WatingShopRegister.propTypes = {};

function WatingShopRegister(props) {
  const dispatch = useDispatch();
  const shopInfo = useSelector(selectInfoShop);
  return (
    <div className="w-full h-[100vh] p-4 bg-background">
      <Container>
        <h3 className="text-3xl text-center md:text-5xl mb-12 md:text-left">
          Shop đang chờ phê duyệt
        </h3>
        <div className="bg-white shadow-sm rounded-md p-8">
          <Grid container>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <div className="flex items-center text-center justify-end ">
                <span className=" bg-primary p-3 rounded-3xl text-white text-2xl">
                  {shopInfo.activeStatus === "ACTIVE"
                    ? "Đã phê duyệt"
                    : "Đang phê duyệt"}
                </span>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <div className=" flex flex-col justify-center items-center md:flex-row  ">
                <div className="flex w-[120px] h-[120px] mb-3">
                  <img
                    className="object-cover rounded-full w-full h-full"
                    src={shopInfo.image}
                    alt=""
                  />
                </div>
                <div className="px-8 flex-1">
                  <div className="flex flex-col">
                    <p className="text-sky-500 text-5xl mb-4">
                      {shopInfo.name}
                    </p>
                    <p className="text-3xl mb-4">{shopInfo.description}</p>
                    <p className=" flex items-center text-3xl text-gray-500">
                      <ImLocation2 className="text-gray-500" />
                      {shopInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        {shopInfo.activeStatus === "ACTIVE" && (
          <div className="w-full flex-row mt-12">
            <Link
              to={config.routes.seller}
              className="p-4 justify-center md:p-20 flex md:justify-end cursor-pointer "
            >
              <span className="p-4 text-2xl md:text-3xl flex items-center bg-sky-400 rounded-lg text-white">
                Bán hàng cùng Lazadaz !!!
                <FaArrowRight className="ml-3" />
              </span>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}

export default WatingShopRegister;
