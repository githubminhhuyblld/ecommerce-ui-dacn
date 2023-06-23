import {Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import styles from "~/pages/EditProfile/EditProfile.module.scss"
import classNames from "classnames/bind";
import {Link} from "react-router-dom";
import {useState} from "react";
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {orange, purple} from '@mui/material/colors';

const cx = classNames.bind(styles);

function EditProfile() {

    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [year, setYear] = useState("")
    const [sex, setSex] = useState("")

    const handleChangeMonth = (e) => {
        setMonth(e.target.value)
    }

    const handleChangeDay = (e) => {
        setDay(e.target.value)
    }

    const handleChangeYear = (e) => {
        setYear(e.target.value)
    }

    const handleChangeSex = (e) => {
        setSex(e.target.value)
    }

    const listMonth = [
        "Tháng Một",
        "Tháng Hai",
        "Tháng Ba",
        "Tháng Tư",
        "Tháng Năm",
        "Tháng Sáu",
        "Tháng Bảy",
        "Tháng Tám",
        "Tháng Chín",
        "Tháng Mười",
        "Tháng Mười Một",
        "Tháng Mười Hai"
    ]

    const listDay = createDay()

    function createDay() {
        const result = []
        for (let i = 1; i <= 31; i++) {
            result[i - 1] = i
        }
        return result
    }

    const listYear = createYear()

    function createYear() {
        const result = []
        let date = new Date()
        let index = 0;
        for (let i = date.getFullYear(); i >= 1900; i--) {
            result[index] = i
            index++
        }
        return result
    }

    const listSex = [
        "Nam",
        "Nữ"
    ]
    const ColorButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: orange[700],
        width: "170%",
        fontSize: "70%",
        '&:hover': {
            backgroundColor: orange[800],
        },
    }));

    return (
        <div className={cx('wrapper')}>
            <Container>
                <h2 className={cx('title')}>
                    Chỉnh sửa
                </h2>
                <Grid className={cx("frame")} style={{margin: "0 auto"}} container spacing={2} xs={8}>
                    <Grid container item xs={12}>
                        <Grid item
                              xl={5}
                              lg={5}
                              md={12}
                              sm={12}
                              xs={12}>
                            <p className={"text-lg text-zinc-600"}>Họ tên</p>
                            <FormControl sx={{m: 1, minWidth: 220}} size="small">
                                <TextField
                                    placeholder={"Họ Tên"}
                                    size="small"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xl={4}
                              lg={4}
                              md={6}
                              sm={6}
                              xs={12}>
                            <p className="flex items-center text-lg text-zinc-600">Địa chỉ email<span
                                className={cx('hr')}>|</span><Link
                                className={cx('link')}
                                to={""}>Thay đổi</Link></p>
                            <div className={"text-xl"}>abc@gmail.com</div>
                        </Grid>
                        <Grid item xl={3}
                              lg={3}
                              md={6}
                              sm={6}
                              xs={12}>
                            <p className={"text-lg text-zinc-600"}>Số điện thoại<span className={cx('hr')}>|</span><Link
                                className={cx('link')}
                                to={""}>Thêm</Link></p>
                            <div className={"text-xl"}>
                                0123456789
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xl={5}
                              lg={5}
                              md={12}
                              sm={12}
                              xs={12}>
                            <p className={"text-lg text-zinc-600"}>Ngày sinh</p>
                            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                                <InputLabel id="month">Month</InputLabel>
                                <Select
                                    labelId="month"
                                    value={month}
                                    label="Month"
                                    onChange={handleChangeMonth}
                                >
                                    {listMonth.map((month, index) => (
                                        <MenuItem key={index} value={month}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{m: 1, minWidth: 60}} size="small">
                                <InputLabel id="day">Day</InputLabel>
                                <Select
                                    labelId="day"
                                    value={day}
                                    label="Day"
                                    onChange={handleChangeDay}
                                >
                                    {listDay.map((day, index) => (
                                        <MenuItem key={index} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{m: 1, minWidth: 80}} size="small">
                                <InputLabel id="year">Year</InputLabel>
                                <Select
                                    labelId="year"
                                    value={year}
                                    label="Year"
                                    onChange={handleChangeYear}
                                >
                                    {listYear.map((year, index) => (
                                        <MenuItem key={index} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xl={4}
                              lg={4}
                              md={6}
                              sm={6}
                              xs={12}>
                            <p className={"text-lg text-zinc-600"}>Giới tính</p>
                            <FormControl sx={{m: 1, minWidth: 100}} size="small">
                                <Select
                                    value={sex}
                                    onChange={handleChangeSex}
                                >
                                    {listSex.map((year, index) => (
                                        <MenuItem key={index} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xl={3}
                              lg={3}
                              md={6}
                              sm={6}
                              xs={12}>
                            <p className={"text-lg text-zinc-600"}>Mã số thuế</p>
                            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                                <TextField
                                    size="small"
                                    placeholder={"Nhập mã số thuế của bạn"}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item>
                            <ColorButton variant="contained">Lưu thay đổi</ColorButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default EditProfile