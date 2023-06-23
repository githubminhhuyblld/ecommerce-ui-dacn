import React from 'react';
import PropTypes from 'prop-types';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import EditProduct from './EditProduct';

ManageLayoutEditProduct.propTypes = {
    
};

function ManageLayoutEditProduct(props) {
    return (
        <div>
            <ManageLayout children={<EditProduct/>}/>
        </div>
    );
}

export default ManageLayoutEditProduct;