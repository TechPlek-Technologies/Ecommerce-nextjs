"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { fetchData } from "~/lib/clientFunctions"; // Assuming you have a fetchData function to fetch categories

const CategoryDisplay = ({ cls, perView = 4, showCount = true }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  
  // Fetch categories data
  useEffect(() => {
    const getCategories = async () => {
      const url = "/api/home/categories?only_category=true";
      const data = await fetchData(url);
      if (data.success) {
        setCategories(data.category);
      } else {
        setCategories([]);
      }
    };

    getCategories();
  }, []);

  // Slider settings
  const slider_setting = {
    slidesPerView: perView,
    spaceBetween: 20,
    autoplay: {
      delay: 3500,
      disableOnInteraction: true,
    },
    breakpoints: {
      "1400": {
        slidesPerView: perView,
      },
      "1200": {
        slidesPerView: 6,
      },
      "992": {
        slidesPerView: 5,
      },
      "768": {
        slidesPerView: 4,
      },
      "576": {
        slidesPerView: 3,
      },
      "0": {
        slidesPerView: 2,
      },
    },
  };

  return (
    <>
      <Swiper {...slider_setting} className={`swiper-container ${cls}`}>
        {categories.length > 0 ? (
          categories.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="category__item mb-30">
                <div className="category__thumb fix mb-15">
                  <a href={`/shop?category=${item.slug}`} className="pointer">
                    <Image src={item.icon[0]?.url} width={100} height={80} alt="category-thumb" />
                  </a>
                </div>
                <div className="category__content">
                  <h5 className="category__title">
                    <Link href={`/shop?category=${item.slug}`}>{item.name}</Link>
                  </h5>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </Swiper>
    </>
  );
};

export default CategoryDisplay;
