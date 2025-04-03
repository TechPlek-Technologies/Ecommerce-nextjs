"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper";
import { useTranslation } from "react-i18next";

// slider setting
const slider_setting = {
  slidesPerView: 1,
  effect: "fade",
  autoplay: {
    delay: 3500,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".tpslider__arrow-prv",
    prevEl: ".tpslider__arrow-nxt",
  },
  pagination: {
    el: ".slider-pagination",
    clickable: true,
  },
};

const HeroBanner = (props) => {
     const { t } = useTranslation();
      if (!props.carousel) return null;

      console.log(props)
  return (
    <>
      <section className="slider-area tpslider-delay">
        <Swiper
          {...slider_setting}
          modules={[Navigation, EffectFade]}
          className="swiper-container slider-active"
        >
          {props.carousel.carouselData &&
            props.carousel.carouselData.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="tpslider pb-0 grey-bg"
                style={{backgroundImage: `url(${props.carousel.background[0]?.url})`}}
              >
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-xxl-5 col-lg-6 col-md-6 col-12 col-sm-6">
                      <div className="tpslider__content pt-20">
                        <span className="tpslider__sub-title mb-35">
                        {item.subTitle}
                        </span>
                        <h2
                          className="tpslider__title mb-30"
                        >{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="tpslider__btn">
                          <Link className="tp-btn" href="/shop">
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-7 col-lg-6 col-md-6 col-12 col-sm-6">
                      <div className="tpslider__thumb p-relative pt-15">
                        <Image
                          className="tpslider__thumb-img"
                          src={item.image[0]?.url}
                          width={750}
                          height={750}
                          alt={item.title}
                          style={{
                            width: "auto",
                            height: "100%",
                          }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="tpslider__arrow d-none  d-xxl-block">
            <button className="tpsliderarrow tpslider__arrow-prv">
              <i className="icon-chevron-left"></i>
            </button>
            <button className="tpsliderarrow tpslider__arrow-nxt">
              <i className="icon-chevron-right"></i>
            </button>
          </div>
          <div className="slider-pagination d-xxl-none"></div>
        </Swiper>
      </section>
    </>
  );
};

export default HeroBanner;
