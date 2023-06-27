import React from 'react';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import ProcessingOrder from './ProcessingOrder';

function ManageLayoutProcessingOrders(props) {
    return (
        <div>
            <ManageLayout children={<ProcessingOrder/>}/> 
        </div>
    );
}

export default ManageLayoutProcessingOrders;