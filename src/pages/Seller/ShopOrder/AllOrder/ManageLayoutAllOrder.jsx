import React from 'react';
import PropTypes from 'prop-types';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import AllOrder from './AllOrder';

ManageLayoutAllOrder.propTypes = {
    
};

function ManageLayoutAllOrder(props) {
    return (
        <div>
            <ManageLayout children={<AllOrder/>}/> 
        </div>
    );
}

export default ManageLayoutAllOrder;