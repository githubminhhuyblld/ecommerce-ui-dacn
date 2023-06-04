import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import styles from "./Login.module.scss";


const cx = classNames.bind(styles);

Login.propTypes = {

};

function Login(props) {
    return (
        <div className={cx('wrapper')}>
            <h1>Login page</h1>
        </div>
    );
}

export default Login;