import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import config from '~/config';

SidebarLeft.propTypes = {
    
};

function SidebarLeft(props) {
    const sidebarLeft = [
        {
          id: 1,
          title: "Quản lý tài khoản",
          children: [
            { id: 1, name: "Thông tin cá nhân", to: config.routes.account },
            { id: 2, name: "Số địa chỉ", to: "" },
            { id: 3, name: "  Tùy chọn thanh toán", to: "" },
          ],
        },
        {
          id: 2,
          title: "Đơn hàng của tôi",
          children: [
            { id: 1, name: "Đơn hàng đổi trả", to: "" },
            { id: 2, name: "Đona hàng hủy", to: "" },
          ],
        },
        {
          id: 2,
          title: "Nhận xét của tôi",
          children: [],
        },
        {
          id: 2,
          title: "Sản phẩm yêu thích & Gian hang đang theo dõi",
          children: [],
        },
      ];
    return (
        <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            {sidebarLeft.map((item, index) => {
              return (
                <div key={index}>
                  <h3 className="md:text-2xl lg:text-3xl">{item.title}</h3>
                  <ul className="px-6 py-6 flex flex-col">
                    {item.children.map((child, index) => {
                      return (
                        <Link
                          to={child.to}
                          key={index}
                          className="text-gray-500 text-2xl py-2"
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
    );
}

export default SidebarLeft;