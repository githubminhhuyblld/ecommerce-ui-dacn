import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import config from '~/config';
import LanguageContext from "~/context/languageContext";

SidebarLeft.propTypes = {
    
};

function SidebarLeft(props) {

  const { languageData } = useContext(LanguageContext);
  const { sidebar_account_management, 
          sidebar_my_order,
          sidebar_my_review,
          favorite_products_and_Stores_are_watching,
          personal_information,
          info_address,
          sidebar_order_cancel,
          sidebar_return_order,
          order_method_payment,
  } = languageData;

    const sidebarLeft = [
        {
          id: 1,
          title: `${sidebar_account_management}`,
          children: [
            { id: 1, name: `${personal_information}`, to: config.routes.account },
            { id: 2, name: `${info_address}`, to: "" },
            { id: 3, name: `${order_method_payment}`, to: "" },
          ],
        },
        {
          id: 2,
          title: `${sidebar_my_order}`,
          children: [
            { id: 1, name: `${sidebar_return_order}`, to: "" },
            { id: 2, name: `${sidebar_order_cancel}`, to: "" },
          ],
        },
        {
          id: 2,
          title: `${sidebar_my_review}`,
          children: [],
        },
        {
          id: 2,
          title: `${favorite_products_and_Stores_are_watching}`,
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