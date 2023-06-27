import React from 'react';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import ReadyOrder from './ReadyOrder';

function ManageLayoutReadyOrders(props) {
    return (
        <div>
            <ManageLayout children={<ReadyOrder/>}/> 
        </div>
    );
}

export default ManageLayoutReadyOrders;