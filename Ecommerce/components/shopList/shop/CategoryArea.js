
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const category_data = [
    {
      id: 1,
      img: "/assets/img/catagory/category-1.jpg",
      name: "Vegetables",
      slug: "vegetables",
      parent: "Vegetables",
      children: [
        "Onion",
        "Lemon",
        "Kiwi",
        "Ginger",
        "Apricots",
        "Cauliflower",
        "Cranberries",
      ],
      product_id: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: 2,
      img: "/assets/img/catagory/category-2.jpg",
      name: "Fresh Fruits",
      slug: "fresh-fruits",
      parent: "Fresh Fruits",
      children: [
        "Chicken Tenders",
        "Lemon",
        "Common Grape",
        "Plum",
        "Mangosteen",
        "Banana",
      ],
      product_id: [8, 9, 10, 11, 12, 13],
    },
    {
      id: 3,
      img: "/assets/img/catagory/category-3.jpg",
      name: "Fruit Drink",
      slug: "fruit-drink",
      parent: "Fruit Drink",
      children: [
        "Milk",
        "Soda Sparkling"
      ],
      product_id: [14, 15, 16],
    },
    {
      id: 4,
      img: "/assets/img/catagory/category-4.jpg",
      name: "Fresh Bakery",
      slug: "fresh-bakery",
      parent: "Fresh Bakery",
      children: [
        "Strawberry",
        "Dragon Fruit",
        "Lime Fruit",
        "Apricot Fruit"
      ],
      product_id: [17, 18, 19, 20],
    },
    {
      id: 5,
      img: "/assets/img/catagory/category-5.jpg",
      name: "Biscuits Snack",
      slug: "biscuits-snack",
      parent: "Biscuits Snack",
      children: [
        "Rice Crisps",
        "Laffy Taffy"
      ],
      product_id: [21, 22],
    },
    {
      id: 6,
      img: "/assets/img/catagory/category-6.jpg",
      name: "Fresh Meat",
      slug: "fresh-meat",
      parent: "Fresh Meat",
      children: [
        "Beef",
        "Chicken",
        "Meat"
      ],
      product_id: [23, 24, 25],
    },
    {
      id: 7,
      img: "/assets/img/catagory/category-7.jpg",
      name: "Fresh Milk",
      slug: "fresh-milk",
      parent: "Fresh Milk",
      children: [
        "Milk",
      ],
      product_id: [26],
    },
    {
      id: 8,
      img: "/assets/img/catagory/category-8.jpg",
      name: "Sea Foods",
      slug: "sea-foods",
      parent: "Sea Foods",
      children: [
   
      ],
      product_id: [],
    }
  ];

const CategoryArea = ({cls,perView=8,showCount=true}) => {
  const router = useRouter();
  // slider setting
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

  // handle search 
  const handleCategorySearch = (title) => {
    router.push(`/search?category=${title.split(" ").join("-").toLowerCase()}`);
  }
  return (
    <>
      <Swiper {...slider_setting} className={`swiper-container ${cls}`}>
        {category_data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="category__item mb-30">
              <div className="category__thumb fix mb-15">
                <a onClick={() => handleCategorySearch(item.name)} className="pointer">
                  <Image
                    src={item.img}
                    width={80}
                    height={80}
                    alt="category-thumb"
                  />
                </a>
              </div>
              <div className="category__content">
                <h5 className="category__title">
                  <Link href="/shop">{item.name}</Link>
                </h5>
                {showCount && (
                  <span className="category__count">
                    {item.product_id.length <= 9 && item.product_id.length !== 0
                      ? `0${item.product_id.length}`
                      : `${item.product_id.length}`}{" "}
                    items
                  </span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CategoryArea;
