import React from 'react';
import PropTypes from 'prop-types';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import CancelOrders from './CancelOrders';

ManageLayoutCanelOrders.propTypes = {
    
};

function ManageLayoutCanelOrders(props) {
    return (
        <div>
             <ManageLayout children={<CancelOrders/>}/> 
        </div>
    );
}

export default ManageLayoutCanelOrders;