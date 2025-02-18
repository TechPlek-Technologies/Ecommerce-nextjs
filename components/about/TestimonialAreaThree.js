"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// slider setting
const slider_setting = {
    slidesPerView: 3,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: true,
    },
    breakpoints: {
      "1400": {
        slidesPerView: 3,
      },
      "1200": {
        slidesPerView: 3,
      },
      "992": {
        slidesPerView: 1,
      },
      "768": {
        slidesPerView: 1,
      },
      "576": {
        slidesPerView: 1,
      },
      "0": {
        slidesPerView: 1,
      },
    },
    navigation: {
      nextEl: ".tptestimonial__nxt",
      prevEl: ".tptestimonial__prv",
    },
  };

// testimonial data
const testimonial_data = [
    {
      id: 1,
      user: "/assets/img/testimonial/test-avata-1.png",
      desc: `"Also like the fact that I can pick my staples in the brown <br>
      paper packs and glass containers at the zero waste section, with an <br>
      idea to reduce plastic and also more convenient."`,
      name: "Algistino Lionel",
      position: "Web Designer at Blueskytechco",
    },
    {
      id: 2,
      user: "/assets/img/testimonial/test-avata-2.png",
      desc: `"Also like the fact that I can pick my staples in the brown <br>
      paper packs and glass containers at the zero waste section, with an <br>
      idea to reduce plastic and also more convenient."`,
      name: "Jackson Roben",
      position: "Web Developer at Blueskytechco",
    },
    {
      id: 3,
      user: "/assets/img/testimonial/test-avata-3.png",
      desc: `"Also like the fact that I can pick my staples in the brown <br>
      paper packs and glass containers at the zero waste section, with an <br>
      idea to reduce plastic and also more convenient."`,
      name: "Lionel",
      position: "UI/UX Designer at Blueskytechco",
    },
    {
      id: 4,
      user: "/assets/img/testimonial/test-avata-2.png",
      desc: `"Also like the fact that I can pick my staples in the brown <br>
      paper packs and glass containers at the zero waste section, with an <br>
      idea to reduce plastic and also more convenient."`,
      name: "Mark Roben",
      position: "App Developer at Blueskytechco",
    },
  ];
  

const TestimonialAreaThree = () => {
  return (
    <section className="testimonial-area tptestimonial__bg pt-80 pb-55 p-relative">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="tpsection mb-35">
            <h4 className="tpsection__sub-title">~ Happy Customer ~</h4>
            <h4 className="tpsection__title">What Client Says</h4>
            <p>
              The liber tempor cum soluta nobis eleifend option congue doming
              quod mazim.
            </p>
          </div>
        </div>
      </div>
      <Swiper
        {...slider_setting}
        spaceBetween={30}
        className="swiper-container tptestimonial-active3 p-relative"
      >
        {testimonial_data.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className="row justify-content-center p-relative">
              <div className="col-md-12">
                <div className="tptestimonial__item text-center ">
                  <div className="tptestimonial__avata mb-25">
                    <Image
                      src={item.user}
                      width={70}
                      height={70}
                      alt="user"
                    />
                  </div>
                  <div className="tptestimonial__content tptestimonial__content2">
                    <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                    <div className="tptestimonial__rating mb-5">
                      <a href="#">
                        <i className="icon-star_outline1"></i>
                      </a>
                      <a href="#">
                        <i className="icon-star_outline1"></i>
                      </a>
                      <a href="#">
                        <i className="icon-star_outline1"></i>
                      </a>
                      <a href="#">
                        <i className="icon-star_outline1"></i>
                      </a>
                      <a href="#">
                        <i className="icon-star_outline1"></i>
                      </a>
                    </div>
                    <h4 className="tptestimonial__title">{item.name}</h4>
                    <span className="tptestimonial__avata-position">
                      {item.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
  );
};

export default TestimonialAreaThree;
