import {Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import styles from "~/pages/EditProfile/EditProfile.module.scss"
import classNames from "classnames/bind";
import {Link} from "react-router-dom";
import {useState} from "react";
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {orange, purple} from '@mui/material/colors';
import config from "~/config/index.jsx";

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
    const sidebarLeft = [
        {
            id: 1,
            title: "Quản lý tài khoản",
            children: [
                {id: 1, name: "Thông tin cá nhân", to: config.routes.account},
                {id: 2, name: "Số địa chỉ", to: ""},
                {id: 3, name: "  Tùy chọn thanh toán", to: ""},
            ],
        },
        {
            id: 2,
            title: "Đơn hàng của tôi",
            children: [
                {id: 1, name: "Đơn hàng đổi trả", to: ""},
                {id: 2, name: "Đona hàng hủy", to: ""},
            ],
        },
        {
            id: 2,
            title: "Nhận xét của tôi",
            children: [],
        },
        {
            id: 2,
            title: "Sản phẩm yêu thích & Gian hang đang theo dõi",
            children: [],
        },
    ];

    return (
        <div className="w-full bg-gray-200 p-8">
            <Container>
                <div className="grid grid-cols-12 gap-4 py-12">
                    <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
                        {sidebarLeft.map((item, index) => {
                            return (
                                <div key={index}>
                                    <h3 className="md:text-2xl lg:text-3xl">{item.title}</h3>
                                    <ul className="px-6 py-6 flex flex-col">
                                        {item.children.map((child, index) => {
                                            return (
                                                <Link
                                                    to={child.to}
                                                    key={index}
                                                    className="text-gray-500 text-2xl py-2"
                                                >
                                                    {child.name}
                                                </Link>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
                        <h2 className={cx('title')}>
                            Chỉnh sửa
                        </h2>
                        <Grid className={cx("frame")} style={{margin: "0 auto"}} container item spacing={2} xs={12}>
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
                                    <p className={"text-lg text-zinc-600"}>Số điện thoại<span
                                        className={cx('hr')}>|</span><Link
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
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default EditProfile