import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import {useParams} from "react-router-dom";
import {Container, Grid, Skeleton} from "@mui/material";
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';


import styles from "./ProductDetail.module.scss";
import ButtonList from "~/layouts/components/ButtonList/ButtonList.jsx";
import {AiFillStar, AiOutlinePlus} from "react-icons/ai";
import {IoMdRemove} from "react-icons/io";
import {getProductById} from "~/services/workspacesService.jsx";
import {convertCurrency} from "~/untils/convertCurrency.js";


const cx = classNames.bind(styles);

ProductDetail.propTypes = {};

function ProductDetail(props) {
    const {id} = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [count, setCount] = useState(1);
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")

    const isLoading = !productDetail;
    useEffect(() => {
        getProductById(id).then((res) => setProductDetail(res?.data))
    }, [id])

    const colorOptions = productDetail?.colors?.map((item) => {
        return {id: item.id, label: item.colorName};
    });
    const imagesOptions = productDetail?.images?.map((item) => {
        return {id: item.id, original: item.imgUrl, thumbnail: item.imgUrl};
    });

    const sizeOptions = productDetail?.sizes?.map((item) => {
        return {id: item.id, label: item.name};
    });

    const handleColorSelect = (color) => {
        setColor(color)
    };

    const handleSizeSelect = (size) => {
        setSize(size)
    };
    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    const renderImageItem = (item) => {
        return (
            <div className={cx('main-image')}>
                <img src={item.original} alt=""/>
            </div>
        );
    };
    const renderThumbnailItem = (item) => {
        return (
            <div className={cx("image-gallery-thumbnail")}>
                <img
                    src={item.thumbnail}
                    alt=""
                />
            </div>
        );
    };


    return (
        <div className={cx('wrapper')}>
            <Container>
                <div className={cx("wrapper-content")}>
                    <Grid container spacing={2}>
                        <Grid container item sm={12} md={3} lg={4} justifyContent="center"
                              style={{marginBottom: "95px"}}>

                            {
                                isLoading ? (
                                    <div className={cx("main-image")}>
                                        <Skeleton variant="rect" width="100%" style={{marginTop: 10}} height={330}
                                                  animation="wave"/>
                                        <div className={cx("thumbnail-skeleton")}>
                                            <Skeleton variant="rect" width="86px"
                                                      style={{marginTop: 10, marginRight: 10}} height={80}
                                                      animation="wave"/>
                                            <Skeleton variant="rect" width="86px"
                                                      style={{marginTop: 10, marginRight: 10}} height={80}
                                                      animation="wave"/>
                                            <Skeleton variant="rect" width="86px"
                                                      style={{marginTop: 10, marginRight: 10}} height={80}
                                                      animation="wave"/>
                                            <Skeleton variant="rect" width="86px"
                                                      style={{marginTop: 10, marginRight: 10}} height={80}
                                                      animation="wave"/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx("main-image")}>
                                        {
                                            imagesOptions && imagesOptions.length > 0 && (
                                                <ReactImageGallery
                                                    items={imagesOptions}
                                                    renderItem={renderImageItem}
                                                    renderThumbInner={renderThumbnailItem}
                                                    showNav={false}
                                                    showFullscreenButton={false}
                                                    showPlayButton={false}
                                                />
                                            )
                                        }
                                    </div>
                                )
                            }


                        </Grid>
                        <Grid item sm={12} md={8} lg={8}>
                            <div className={cx("product-info")}>
                                {isLoading ? (
                                    <Skeleton animation="wave" height={50} width="100%" style={{marginBottom: 12}}/>
                                ) : (
                                    <h3 className={cx("product-name")}>{productDetail?.name}</h3>
                                )}

                                {
                                    isLoading ? (
                                        <div className={cx('vote')}>
                                            <Skeleton animation="wave" variant="circle" width={24} height={24}
                                                      style={{marginRight: 8}}/>
                                            <Skeleton animation="wave" variant="circle" width={24} height={24}
                                                      style={{marginRight: 8}}/>
                                            <Skeleton animation="wave" variant="circle" width={24} height={24}
                                                      style={{marginRight: 8}}/>
                                            <Skeleton animation="wave" variant="circle" width={24} height={24}
                                                      style={{marginRight: 8}}/>
                                            <Skeleton animation="wave" variant="circle" width={24} height={24}
                                                      style={{marginRight: 8}}/>
                                            <Skeleton animation="wave" variant="rounded" height={24} width={30}/>

                                        </div>
                                    ) : (
                                        <div className={cx("vote")}>
                                            <AiFillStar/>
                                            <AiFillStar/>
                                            <AiFillStar/>
                                            <AiFillStar/>
                                            <AiFillStar/>
                                            <span className={cx("rating")}>5</span>
                                        </div>
                                    )
                                }

                                <div className={cx('price-sale')}>
                                    {
                                        isLoading ? (
                                            <Skeleton animation="wave" height={40} width={80}
                                                      style={{marginBottom: 12}}/>
                                        ) : (
                                            <span
                                                className={cx("new-price")}>{convertCurrency(productDetail?.newPrice)}</span>

                                        )
                                    }


                                    {
                                        isLoading ? (
                                            <div className={cx('price')}>
                                                <span className={cx('old-price')}>
                                                    <Skeleton animation="wave" height={40} width={80}/>
                                                </span>
                                                <span className={cx('sale')}>
                                                    <Skeleton animation="wave" height={30} width={30}/>
                                                </span>
                                            </div>
                                        ) : (
                                            <div className={cx("price")}>
                                                <span
                                                    className={cx("old-price")}>{convertCurrency(productDetail?.oldPrice)}</span>
                                                <span className={cx('sale')}>-{productDetail?.sale}%</span>
                                            </div>
                                        )
                                    }
                                    {
                                        isLoading ? (
                                            <Skeleton animation="wave" height={40} width={"30%"}/>
                                        ) : (
                                            <h3 className={cx("title")}>Chọn màu:</h3>

                                        )
                                    }

                                    {
                                        isLoading ? (
                                            <div className={cx('options')}>
                                                <Skeleton animation="wave" height={60} width="80%"
                                                          style={{marginBottom: 12}}/>
                                            </div>
                                        ) : (
                                            <div className={cx('options')}>
                                                {colorOptions && colorOptions.length > 0 && (
                                                    <ButtonList options={colorOptions} onSelect={handleColorSelect}/>
                                                )}
                                            </div>
                                        )
                                    }

                                    {
                                        isLoading ? (
                                            <Skeleton animation="wave" height={40} width={"30%"}/>
                                        ) : (
                                            <h3 className={cx("title")}>Chọn size:</h3>

                                        )
                                    }
                                    {
                                        isLoading ? (
                                            <div className={cx('options')}>
                                                <Skeleton animation="wave" height={60} width="80%"
                                                          style={{marginBottom: 12}}/>
                                            </div>
                                        ) : (
                                            <div className={cx('options')}>
                                                {sizeOptions && sizeOptions.length > 0 && (
                                                    <ButtonList options={sizeOptions} onSelect={handleColorSelect}/>
                                                )}
                                            </div>
                                        )
                                    }

                                    {
                                        isLoading ? (
                                            <Skeleton animation="wave" height={40} width={"30%"}/>
                                        ) : (
                                            <h3 className={cx("title")}>Chọn sô lượng:</h3>

                                        )
                                    }
                                    {
                                        isLoading ? (
                                            <div className={cx('amount')}>
                                                <Skeleton animation="wave" height={40} width={40}
                                                          style={{marginRight: 8}}/>
                                                <Skeleton animation="wave" height={40} width={40}
                                                          style={{marginRight: 8}}/>
                                                <Skeleton animation="wave" height={40} width={40}
                                                          style={{marginRight: 8}}/>
                                            </div>
                                        ) : (
                                            <div className={cx('amount')}>
                                                <span
                                                    className={cx("amount-item")}
                                                    onClick={handleIncrement}
                                                >
                                                    <AiOutlinePlus/>
                                                 </span>
                                                <span className={cx("count")}>{count}</span>
                                                <span
                                                    className={cx('amount-item', {'amount-item-disabled': count <= 1})}
                                                    onClick={handleDecrement}
                                                >
                                                    <IoMdRemove/>
                                                </span>
                                            </div>
                                        )
                                    }
                                    {
                                        isLoading ? (
                                            <h3 className={cx('shop-name')}>
                                                <Skeleton animation="wave" height={40} width="80%"
                                                          style={{marginBottom: 8}}/>
                                            </h3>
                                        ) : (
                                            <div className={cx("shop")}>
                                                <h3 className={cx("shop-name")}>Tên cửa
                                                    hàng:{productDetail?.shop.name}</h3>
                                                <p className={cx("shop-address")}>Địa
                                                    chỉ:{productDetail?.shop.address}</p>
                                            </div>
                                        )
                                    }

                                    <div className={cx('function')}>
                                        {
                                            isLoading ? (
                                                <>
                                                    <Skeleton animation="wave" height={80} width="50%"
                                                              style={{marginRight: 8}}/>
                                                    <Skeleton animation="wave" height={80} width="50%"
                                                              style={{marginRight: 8}}/>
                                                </>
                                            ) : (
                                                <>
                                                    <button className={`btn ${cx('btn-buy-now')}`}>Mua ngay</button>
                                                    <button className={`btn ${cx('btn-add-cart')}`}>Thêm vào giỏ hàng
                                                    </button>
                                                </>
                                            )
                                        }


                                    </div>

                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default ProductDetail;