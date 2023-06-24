import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";

import styles from "./Footer.module.scss";
import { colors } from "@mui/material";

const cx = classNames.bind(styles);

function Footer(props) {
  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("voucher")}>
          <img
            className={cx("voucher-img")}
            src="/src/assets/footer/voucher1.png"
            alt=""
          />
          <img
            className={cx("voucher-img")}
            src="/src/assets/footer/voucher2.png"
            alt=""
          />
          <img
            className={cx("voucher-img")}
            src="/src/assets/footer/voucher3.png"
            alt=""
          />
        </div>
        <div className={cx("footer-information")}>
          <div className={cx("contact")}>
            <h3 className={cx("title-contact")}>LIÊN HỆ VỚI LAZADA</h3>
            <ul className={cx("list-contact")}>
              <li className={cx("item-contact")}>
                <a href="#">Trung tâm trợ giúp</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Hướng dẫn đặt hàng</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Giao hàng & Nhận hàng</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Chính sách hàng nhập khẩu</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Hướng dẫn trả hàng</a>
              </li>
            </ul>
          </div>
          <div className={cx("information")}>
            <h3 className={cx("title-contact")}>LAZADA VIỆT NAM</h3>
            <ul className={cx("list-information")}>
              <li className={cx("item-contact")}>
                <a href="#">Tất cả danh mục</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Về Lazada Việt Nam</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Bán hàng cùng Lazada</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Chương trinh Lazada Afﬁliate</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Tuyển dụng</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Điều khoản sử dụng</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Chính sách bảo mật</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Báo chí</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Bảo vệ quyền sở hữu trí tuệ</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Quy chế hoạt động sàn Lazada</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">Quy trình giải quyết tranh chấp, khiếu nại</a>
              </li>
            </ul>
          </div>
          <div className={cx("info-app")}>
            <div className={cx("web-app")}>
              <div className={cx("web-app-left")}>
                <div className={cx("web-app-left-logo")}>
                  <img src="/src/assets/footer/logo.png" alt="" />
                </div>
                <div className={cx("web-app-left-content")}>
                  <h3>Go where your heart beats</h3>
                  <p>Tải App Lazada</p>
                </div>
              </div>

              <div className={cx("web-app-right")}>
                <img
                  style={{
                    flexGrow: "6",
                    width: "150px",
                    height: "50px",
                    marginRight: "30px",
                  }}
                  src="/src/assets/footer/AppStore.png"
                  alt=""
                  href="https://bit.ly/lazada-ios-app"
                />
                <img
                  style={{ flexGrow: "6", width: "150px", height: "50px" }}
                  src="/src/assets/footer/ggPlay.png"
                  alt=""
                />
                <img
                  style={{ width: "150px", height: "50px", marginLeft: "30px" }}
                  src="/src/assets/footer/appgallery.png"
                  alt=""
                />
              </div>
            </div>

            <div className={cx("info-company")}>
              <h4>CÔNG TY TNHH RECESS</h4>
              <p>
                Giấy CNĐKDN: 0308808576 – Ngày cấp: 06/5/2009, được sửa đổi lần
                thứ 19 ngày 15/8/2019.
              </p>
              <p>
                Cơ quan cấp: Phòng Đăng ký kinh doanh – Sở kế hoạch và Đầu tư
                TP.HCM
              </p>
              <p>
                Địa chỉ đăng ký kinh doanh: Tầng 19, Tòa nhà Saigon Centre –
                Tháp 2, 67 Lê Lợi, Phường Bến Nghé, Quận 1, Tp. Hồ Chí Minh,
                Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* footer second */}
      <div className={cx("footer-second")}>
        <div className={cx("lzd-footer-inner")}>
          <div className={cx("lzd-footer-width-50")}>
            <h3 className={cx("lzd-footer-h3")}>CÁCH THỨC THANH TOÁN</h3>
            <div className={cx("logo-payment")}>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/visa.jpg" alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/mastercard.jpg" alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/jcb.png" alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/cashondelivery.jpg" alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/napas.jpg" alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/heodat.png" alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/zalopay.png" alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src="/src/assets/footer/momo.png" alt="" />
              </span>
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <h3 className={cx("lzd-footer-h3")}>DỊCH VỤ GIAO HÀNG</h3>
            <div className={cx("logo-delivery")}>
              <img
                className={cx("lzd-icon-delivery")}
                src="/src/assets/footer/lazada.png"
                alt=""
              ></img>
              <img
                className={cx("lzd-icon-delivery")}
                src="/src/assets/footer/ghn.png"
                alt=""
              ></img>
              <img
                className={cx("lzd-icon-delivery")}
                src="/src/assets/footer/ninja.png"
                alt=""
              ></img>
              <img
                className={cx("lzd-icon-delivery")}
                src="/src/assets/footer/ship60.png"
                alt=""
              ></img>
              <img
                className={cx("lzd-icon-delivery")}
                src="/src/assets/footer/best.png"
                alt=""
              ></img>
              <img
                className={cx("lzd-icon-delivery")}
                src="/src/assets/footer/ahamove.png"
                alt=""
              ></img>
              <img
                className={cx("lzd-icon-delivery")}
                src="/src/assets/footer/j&t.png"
                alt=""
              ></img>
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <h3 className={cx("lzd-footer-h3")}>CHỨNG NHẬN</h3>
            <div className={cx("logo-certification")}>
              <div className={cx("logo-certification-left")}>
                <img
                  className={cx("lzd-icon-certification")}
                  src="/src/assets/footer/pcidsss.png"
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("lzd-icon-certification")}
                  src="/src/assets/footer/noi_khong_hang_gia.png"
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("lzd-icon-certification")}
                  src="/src/assets/footer/bsi.png"
                  style={{ width: "100px" }}
                  alt=""
                ></img>
              </div>
              <div className={cx("logo-certification-right")}>
                <img
                  className={cx("icon-certification-right")}
                  src="/src/assets/footer/da_dang_ky.png"
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("icon-certification-right")}
                  src="/src/assets/footer/da_thong_bao.png"
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("icon-certification-right")}
                  src="/src/assets/footer/da_dang_ky.png"
                  style={{ width: "130px" }}
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className={cx("footer-third")}>
          <div className={cx("lzd-footer-width-50 lzd-footer-left")}>
            <div className={cx("lzd-footer-about")}>
              <h1>LAZADA - NỀN TẢNG MUA SẮM TRỰC TUYẾN HÀNG ĐẦU VIỆT NAM</h1>
              <p style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    color: "rgb(136, 136, 136)",
                    backgroundColor: "rgb(244,244,246)",
                    fontSize: "12px",
                  }}
                >
                  Thành lập từ năm 2012, Lazada là nền tảng thương mại điện tử
                  hàng đầu Đông Nam Á, tiên phong thúc đẩy sự phát triển tại khu
                  vực thông qua Thương mại & Công nghệ. Hiện nay, với nền tảng
                  logistics và hệ thống thanh toán lớn nhất khu vực, Lazada trở
                  thành một phần trong đời sống của người tiêu dùng và hướng đến
                  mục tiêu phục vụ cho 300 triệu khách hàng trên toàn khu vực
                  Đông Nam Á vào năm 2030.
                </span>
              </p>
              <p style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    color: "rgb(136, 136, 136)",
                    backgroundColor: "rgb(244,244,246)",
                    fontSize: "12px",
                  }}
                >
                  Tại Việt Nam, Lazada là nền tảng Thương mại điện tử quen thuộc
                  của hàng triệu người tiêu dùng bởi sự đa dạng hàng đầu về
                  chủng loại sản phẩm, ứng dụng công nghệ mua sắm và giải trí
                  thông minh cùng khả năng logistics mạnh mẽ và dịch vụ chăm sóc
                  khách hàng tối ưu. Đáng chú ý, bên cạnh các chương trình ưu
                  đãi trực tuyến hấp dẫn hàng tháng hấp dẫn thường xuyên, Lazada
                  Việt Nam còn thu hút người dùng với các Lễ Hội Mua Sắm siêu
                  lớn trong năm, đây được xem là các thời điểm mua sắm không thể
                  bỏ lỡ của các tín đồ mua sắm trên toàn quốc.
                </span>
              </p>
              <p style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    color: "rgb(136, 136, 136)",
                    backgroundColor: "rgb(244,244,246)",
                    fontSize: "12px",
                  }}
                >
                  Hãy truy cập website hoặc tải ngay ứng dụng Lazada để gia tăng
                  thêm nhiều trải nghiệm độc đáo cho hành trình mua sắm – giải
                  trí tuyệt vời và siêu tiết kiệm ngay hôm nay!
                </span>
              </p>
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}></div>
          <div className={cx("lzd-footer-width-25")}></div>
        </div>
      </Container>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
