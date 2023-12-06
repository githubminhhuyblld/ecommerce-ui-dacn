import React from 'react';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import SalesOrder from './SalesOrder';

function ManageLayoutSaleOrders(props) {
    return (
        <div>
            <ManageLayout children={<SalesOrder/>}/> 
         
        </div>
    );
}

export default ManageLayoutSaleOrders;