import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import {Select, MenuItem, FormControl} from '@material-ui/core';

import styles from "./Content.module.scss";

Content.propTypes = {};
const cx = classNames.bind(styles);

function Content(props) {
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("filter")}>
                <h3 className={cx("title")}>Quần áo thể thao nam</h3>
                <div className={cx("function-header")}>
                    <p className={cx("result")}>19 mặt hàng được tìm thấy theo Giày Thể Thao Vải Nam Nữ Độn Đế Mũi Viền
                        Kẻ Caro 2 Màu Siêu</p>
                    <div className={cx("filter-item")}>
                        <span className={cx('label')}>Sắp xếp theo:</span>
                        <FormControl className={cx("item")} variant="outlined">
                            <Select
                                labelId="select-label"
                                id="select"
                                variant="outlined"
                                value={selectedValue}
                                onChange={handleChange}
                                style={{fontSize: "14px", backgroundColor: "var(--white-color)"}}
                            >
                                <MenuItem style={{fontSize: "14px"}} value="option1">Phù hợp nhất</MenuItem>
                                <MenuItem style={{fontSize: "14px"}} value="option2">Giá từ thấp đến cao</MenuItem>
                                <MenuItem style={{fontSize: "14px"}} value="option3">Giá từ cao xuống thấp</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;