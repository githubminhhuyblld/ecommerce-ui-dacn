import React from 'react';
import ManageLayout from '~/layouts/ManageLayout/ManageLayout';
import LastedOrder from './LastedOrder';

function ManageLayoutLastedOrder(props) {
    return (
        <div>
            <ManageLayout children={<LastedOrder/>}/> 
        </div>
    );
}

export default ManageLayoutLastedOrder;