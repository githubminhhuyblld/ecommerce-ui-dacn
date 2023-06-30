import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

function SliderSlick(props) {
  const baseUrl = window.location.origin + "/images/";
  const slider = useRef();
  const gotoNext = () => {
    slider.current.slickNext();
  };
  const gotoPrev = () => {
    slider.current.slickPrev();
  };
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };
  return (
    <SliderContainer>
      <SliderContent>
        <Slider {...settings} ref={slider}>
          <div className="l">
            <a href="">
              <img
                className="slider__item-image"
                src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/37/46/31/8f195cbe5d1fabd18dfb38ea62a88c27.png.webp"
              />
            </a>
          </div>
          <div>
            <a href="">
              <img
                className="slider__item-image"
                src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/e9/b0/89/be7e84d4871f83c906491122c605fa01.png.webp"
              />
            </a>
          </div>
          <div>
            <a href="">
              <img
                className="slider__item-image"
                src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/24/ce/ab/e46a7ea1530053945d566dfc558f7f32.png.webp"
              />
            </a>
          </div>
        </Slider>
        <span
          className="btn__slider-left animate__animated animate__fadeInRight"
          onClick={gotoPrev}
        >
          <MdOutlineKeyboardArrowLeft />
        </span>
        <span
          className="btn__slider-right animate__animated animate__fadeInRight"
          onClick={gotoNext}
        >
          <MdKeyboardArrowRight />
        </span>
      </SliderContent>
    </SliderContainer>
  );
}

const SliderContent = styled.div`
  width: 100%;
  position: relative;

  &:hover .btn__slider-left {
    display: block;
  }

  &:hover .btn__slider-right {
    display: block;
  }

  div {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius:12px;
    }

    .slider__title {
      max-width: 400px;
      width: 100%;
      position: absolute;
      top: 80%;
      left: 40px;
      @media only screen and (min-width: 992px) {
        top: 68%;
      }
      @media only screen and (max-width: 992px) {
        max-width: 300px;
        left: 20px;
        top: 70%;
      }
      @media only screen and (max-width: 768px) {
        max-width: 250px;
        left: 20px;
        top: 60%;
      }
      @media only screen and (max-width: 600px) {
        display: none;
      }
      @media only screen and (max-width: 418px) {
        display: none;
      }

      h3 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.4rem;
        padding: 12px 4px;
        color: var(--while-color);
        background-color: rgba(0 0 0 / 50%);
        margin-bottom: 0;
        @media only screen and (max-width: 768px) {
          font-size: 1.8rem;
        }
      }
    }
  }

  .btn__slider-left {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    left: 40px;
    display: none;
    @media only screen and (max-width: 768px) {
      top: 40%;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }

    svg {
      font-size: 6rem;
      color: var(--white-color);
      font-weight: bold;
      @media only screen and (max-width: 768px) {
        font-size: 4rem;
      }
    }
  }

  .btn__slider-right {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    right: 40px;
    display: none;
    @media only screen and (max-width: 768px) {
      top: 40%;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }

    svg {
      font-size: 6rem;
      color: var(--white-color);
      font-weight: bold;
      @media only screen and (max-width: 768px) {
        font-size: 4rem;
      }
    }
  }

  .animate__animated.animate__fadeInRight {
    animation-duration: 0.3s;
  }
`;

const SliderContainer = styled.div`
  width: 100%;

  .slick-dots {
    text-align: center;
    bottom: 20px;
    right: 20px;
  }

`;

export default SliderSlick;
