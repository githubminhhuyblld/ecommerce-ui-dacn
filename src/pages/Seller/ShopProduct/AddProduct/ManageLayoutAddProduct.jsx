import React from 'react';
import PropTypes from 'prop-types';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import AddProduct from './AddProduct';

ManageLayoutAddProduct.propTypes = {
    
};

function ManageLayoutAddProduct(props) {
    return (
        <div>
            <ManageLayout children={<AddProduct/>}/>
        </div>
    );
}

export default ManageLayoutAddProduct;