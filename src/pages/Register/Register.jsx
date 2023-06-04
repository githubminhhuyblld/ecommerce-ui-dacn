import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

Register.propTypes = {

};

function Register(props) {
    return (
        <div className={cx('wrapper')}>
            <h1>Register page</h1>
        </div>
    );
}

export default Register;