import React from 'react';
import PropTypes from 'prop-types';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import ShopAllProduct from './ShopAllProduct';
import Header from '~/pages/Seller/Header/Header';

ManageLayoutAllProduct.propTypes = {
    products:PropTypes.array,
};

function ManageLayoutAllProduct({products}) {
    return (
        <div>
            <ManageLayout  children={<ShopAllProduct data={products}/>}/>
        </div>
    );
}

export default ManageLayoutAllProduct;