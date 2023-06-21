import React from 'react';
import PropTypes from 'prop-types';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import ShopAllProduct from './ShopAllProduct';

ManageLayoutAllProduct.propTypes = {
    
};

function ManageLayoutAllProduct(props) {
    return (
        <div>
            <ManageLayout children={<ShopAllProduct/>}/>
        </div>
    );
}

export default ManageLayoutAllProduct;