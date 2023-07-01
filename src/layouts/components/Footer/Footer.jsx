import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";

import styles from "./Footer.module.scss";
import { colors } from "@mui/material";

import voucher1 from "~/assets/footer/voucher1.png";
import voucher2 from "~/assets/footer/voucher2.png";
import voucher3 from "~/assets/footer/voucher3.png";
import ahamove from "~/assets/footer/ahamove.png";
import appgallery from "~/assets/footer/appgallery.png";
import appstore from "~/assets/footer/AppStore.png";
import bsi from "~/assets/footer/bsi.png";
import best from "~/assets/footer/best.png";
import cashondelivery from "~/assets/footer/cashondelivery.jpg";
import da_dang_ky from "~/assets/footer/da_dang_ky.png";
import da_thong_bao from "~/assets/footer/da_thong_bao.png";
import facebook from "~/assets/footer/facebook.png";
import ggPlay from "~/assets/footer/ggPlay.png";
import ghn from "~/assets/footer/ghn.png";
import heodat from "~/assets/footer/heodat.png";
import in1 from "~/assets/footer/in.png";
import indonesia from "~/assets/footer/indonesia.jpg";
import insta from "~/assets/footer/insta.png";
import jandt from "~/assets/footer/j&t.png";
import jcb from "~/assets/footer/jcb.png";
import lazada from "~/assets/footer/lazada.png";
import logo from "~/assets/footer/logo.png";
import malaysia from "~/assets/footer/malaysia.png";
import mastercard from "~/assets/footer/mastercard.jpg";
import momo from "~/assets/footer/momo.png";
import napas from "~/assets/footer/napas.jpg";
import ninja from "~/assets/footer/ninja.png";
import noi_khong_hang_gia from "~/assets/footer/noi_khong_hang_gia.png";
import pcidsss from "~/assets/footer/pcidsss.png";
import philippines from "~/assets/footer/philippines.png";
import ship60 from "~/assets/footer/ship60.png";
import singapore from "~/assets/footer/singapore.png";
import thailan from "~/assets/footer/thailan.png";
import tiktok from "~/assets/footer/tiktok.png";
import vietnam from "~/assets/footer/vietnam.png";
import visa from "~/assets/footer/visa.jpg";
import zalopay from "~/assets/footer/zalopay.png";
import ytb from "~/assets/footer/ytb.png";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

function Footer(props) {
  const { languageData } = useContext(LanguageContext);
  const {
    contact_us,
    hepl_center,
    how_to_buy,
    shipping_delivery,
    international_product_policy,
    how_to_return,
    lazada_VN,
    all_category,
    about_lazada,
    sell_on,
    affiliate_program,
    careers,
    terms_condition,
    privacy_policy,
    press_media,
    intellectual_property_protection,
    operating_regulations,
    Procedure_of_claim_and_dispute_handling,
    download_app,
    footer_method_payment,
    footer_delivery_service,
    footer_certification,
  } = languageData;
  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("voucher")}>
          <img className={cx("voucher-img")} src={voucher1} alt="" />
          <img className={cx("voucher-img")} src={voucher2} alt="" />
          <img className={cx("voucher-img")} src={voucher3} alt="" />
        </div>
        <div className={cx("footer-information")}>
          <div className={cx("contact")}>
            <h3 className={cx("title-contact")}>{contact_us}</h3>
            <ul className={cx("list-contact")}>
              <li className={cx("item-contact")}>
                <a href="#">{hepl_center}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{how_to_buy}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{shipping_delivery}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{international_product_policy}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{how_to_return}</a>
              </li>
            </ul>
          </div>
          <div className={cx("information")}>
            <h3 className={cx("title-contact")}>{lazada_VN}</h3>
            <ul className={cx("list-information")}>
              <li className={cx("item-contact")}>
                <a href="#">{all_category}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{about_lazada}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{sell_on}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{affiliate_program}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{careers}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{terms_condition}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{privacy_policy}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{press_media}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{intellectual_property_protection}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{operating_regulations}</a>
              </li>
              <li className={cx("item-contact")}>
                <a href="#">{Procedure_of_claim_and_dispute_handling}</a>
              </li>
            </ul>
          </div>
          <div className={cx("info-app")}>
            <div className={cx("web-app")}>
              <div className={cx("web-app-left")}>
                <div className={cx("web-app-left-logo")}>
                  <img src={logo} alt="" />
                </div>
                <div className={cx("web-app-left-content")}>
                  <h3>Go where your heart beats</h3>
                  <p>{download_app}</p>
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
                  src={appstore}
                  alt=""
                  href="https://bit.ly/lazada-ios-app"
                />
                <img
                  style={{ flexGrow: "6", width: "150px", height: "50px" }}
                  src={ggPlay}
                  alt=""
                />
                <img
                  style={{ width: "150px", height: "50px", marginLeft: "30px" }}
                  src={appgallery}
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
            <h3 className={cx("lzd-footer-h3")}>{footer_method_payment}</h3>
            <div className={cx("logo-payment")}>
              <span className={cx("lzd-footer-sprit")}>
                <img src={visa} alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src={mastercard} alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src={jcb} alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src={cashondelivery} alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src={napas} alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src={heodat} alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src={zalopay} alt="" />
              </span>
              <span className={cx("lzd-footer-sprit")}>
                <img src={momo} alt="" />
              </span>
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <h3 className={cx("lzd-footer-h3")}>{footer_delivery_service}</h3>
            <div className={cx("logo-delivery")}>
              <img
                className={cx("lzd-icon-delivery")}
                src={lazada}
                alt=""
              ></img>
              <img className={cx("lzd-icon-delivery")} src={ghn} alt=""></img>
              <img className={cx("lzd-icon-delivery")} src={ninja} alt=""></img>
              <img
                className={cx("lzd-icon-delivery")}
                src={ship60}
                alt=""
              ></img>
              <img className={cx("lzd-icon-delivery")} src={best} alt=""></img>
              <img
                className={cx("lzd-icon-delivery")}
                src={ahamove}
                alt=""
              ></img>
              <img className={cx("lzd-icon-delivery")} src={jandt} alt=""></img>
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <h3 className={cx("lzd-footer-h3")}>{footer_certification}</h3>
            <div className={cx("logo-certification")}>
              <div className={cx("logo-certification-left")}>
                <img
                  className={cx("lzd-icon-certification")}
                  src={pcidsss}
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("lzd-icon-certification")}
                  src={noi_khong_hang_gia}
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("lzd-icon-certification")}
                  src={bsi}
                  style={{ width: "100px" }}
                  alt=""
                ></img>
              </div>
              <div className={cx("logo-certification-right")}>
                <img
                  className={cx("icon-certification-right")}
                  src={da_dang_ky}
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("icon-certification-right")}
                  src={da_thong_bao}
                  style={{ width: "130px" }}
                  alt=""
                ></img>
                <img
                  className={cx("icon-certification-right")}
                  src={da_dang_ky}
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
          <div className={cx("lzd-footer-width-50")}>
            <div className={cx("lzd-footer-about")}>
              <h1>LAZADA - NỀN TẢNG MUA SẮM TRỰC TUYẾN HÀNG ĐẦU VIỆT NAM</h1>
              <p style={{ marginBottom: "12px" }}>
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
              <p style={{ marginBottom: "12px" }}>
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
              <p>
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
              <h1>SẢN PHẨM CHÍNH HÃNG</h1>
              <p
                style={{
                  color: "rgb(136, 136, 136)",
                  backgroundColor: "rgb(244,244,246)",
                  fontSize: "12px",
                }}
              >
                Samsung , Apple , Xiaomi , Bluestone ,L’oreal , Maybeline , Enfa
                , Bobby ,Huggies , Adidas , Casio , Mediamart ,Juno , Gumac
              </p>
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <h3>SẢN PHẨM NỔI BẬT</h3>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>SMARTPHONE</h4>
                <p>
                  iPhone , Samsung , Xiaomi , Vivo , Vsmart , Oppo , Huawei ,
                  iPhone 12 , iPhone 11 , Redmi Note 8 , Galaxy Note , Galaxy
                  A51 , Galaxy S21 Ultra , Vsmart Live 4 , Vsmart Joy 3
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>MÁY TÍNH BẢNG</h4>
                <p>
                  iPad , Samsung , Huawei , Lenovo , Kindle , iPad Pro , iPad
                  mini , Masstel , iPad Air 2 , iPad Mini 5 , LAPTOPS , Dell ,
                  Asus , Macbook , HP , Lenovo , Acer , MSI , Microsoft Surface
                  , Macbook Pro , Macbook Air 2018
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>TIVI</h4>
                <p>
                  Sony , LG , Vsmart , Xiaomi , Toshiba , Samsung , Panasonic ,
                  Sharp , Asanzo , Asano , TCL
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>ÂM THANH</h4>
                <p>
                  Loa Bluetooth , Loa Karaoke , JBL , Sony , Harman Kardon ,
                  Bose , Tronsmart , Kiomic , Zealot , LG , Temeisheng , Hoco ,
                  Kimiso
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>TỦ LẠNH</h4>
                <p>
                  Tủ lạnh mini , Sanyo , Electrolux , Panasonic , Toshiba ,
                  Samsung
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>MỸ PHẨM & LÀM ĐẸP</h4>
                <p>
                  La Roche Posay , MAC , Maybelline , Laneige , Innisfree ,
                  Vichy , Hadalabo , Senka , Anessa , The Face Shop , Son Black
                  Rouge , Kiehl’s , Kem Chống Nắng , Sữa Rửa Mặt , Nước Tẩy
                  Trang
                </p>
              </div>
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>MÁY ẢNH</h4>
                <p>
                  Fujifilm , Nikon , Canon , Sony , Camcorder , GoPro , Flycam ,
                  Xiaomi
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>MÁY GIẶT</h4>
                <p>
                  Electrolux , Sanyo , Toshiba , Aqua , Hitachi , Panasonic ,
                  Samsung , LG , Bosch , Midea
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>LÒ VI SÓNG</h4>
                <p>
                  Sharp , Electrolux , Bluestone , Samsung , Xiaomi , Beko ,
                  Panasonic
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>Ô TÔ XE MÁY</h4>
                <p>
                  Honda , Xe máy Yamaha , Taya Motor , Suzuki , Piaggio , Xe Máy
                  Điện
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>TRUYỆN TRANH HAY NHẤT NĂM 2021</h4>
                <p>
                  Thám tử lừng danh Conan , Thanh Gươm Diệt Quỷ Kimetsu Yaiba ,
                  One Piece , Đảo Hải Tặc
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>BÁCH HÓA ONLINE</h4>
                <p>
                  Thức Uống Có Cồn , Strongbow , Heineken , Tiger , Bia 333 ,
                  Budweiser , Corona , Hoegaarden , Thức Uống Có Ga , Coca-cola
                  , 7Up , Pepsi , La Vie , Star Kombucha
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>XU HƯỚNG TÌM KIẾM NỔI BẬT 2021</h4>
                <p>
                  Sản phẩm mùa dịch Covid-19 , Khẩu trang 3M , Khẩu trang
                  Unicharm , Khẩu trang y tế , Nước Rửa Tay Khô , Cà Phê , Nồi
                  Cơm Điện , Giường Ngủ , Đồng Hồ Nữ , Đồng Hồ Nam , Máy Chạy Bộ
                  Điện , Đàn Guitar , Đàn Piano , Ghế Mát Xa , Dép Crocs , Cờ
                  Vua , Nón Sơn , Xe Cẩu , Xe Cẩu , Hoa , Bảng Chữ Cái , Đá Bóng
                  , Áo Bóng Đá , Bikini , Elsa , BKAV , Ivy Moda , MLB , Dirty
                  Coin , Quần Ống Rộng , Vascara
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>MUA SẮM TRÊN TOÀN THẾ GIỚI VỚI ALIEXPRESS</h4>
                <p>
                  Nga , Tây Ban Nha , Pháp , Đức , Ba Lan , Brazil , Ả Rập Xê-út
                </p>
              </div>
            </div>
            <div className={cx("footer-outstanding")}>
              <div>
                <h4>MUA SẮM TRÊN TOÀN THẾ GIỚI VỚI DARAZ</h4>
                <p>Pakistan , Bangladesh , Sri Lanka , Myanmar , Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* footer fourth */}
      <div className={cx("footer-fourth")}>
        <div className={cx("lzd-footer-inner")}>
          <div className={cx("lzd-footer-width-50")}>
            <h3 className={cx("lzd-footer-title")}>Lazada Southeast Asia</h3>
            <div className={cx("logo-country")}>
              <img src={indonesia} alt="" />
              <img src={malaysia} alt="" />
              <img src={philippines} alt="" />
              <img src={singapore} alt="" />
              <img src={thailan} alt="" />
              <img src={vietnam} alt="" />
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <h3 className={cx("lzd-footer-title")}>Kết nối với chúng tôi</h3>
            <div className={cx("logo-connect")}>
              <img src={facebook} alt="" />
              <img src={in1} alt="" />
              <img src={ytb} alt="" />
              <img src={insta} alt="" />
              <img src={tiktok} alt="" />
            </div>
          </div>
          <div className={cx("lzd-footer-width-25")}>
            <div className={cx("lzd-footer-copyright")}>© Lazada 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
