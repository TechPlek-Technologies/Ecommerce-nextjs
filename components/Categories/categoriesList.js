import { A11y, Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Category from "./categories";
import c from "./category.module.css";
import { useTranslation } from "react-i18next";
import categoryPageData from "~/lib/dataLoader/category";
import { setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";

const breakpointNewArrival = {
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 3,
  },
  600: {
    slidesPerView: 4,
  },
  991: {
    slidesPerView: 5,
  },
  1200: {
    slidesPerView: 7,
  },
};

function CategoryList({ data, error }) {
  const { t } = useTranslation();

  console.log("data_props",data);

  return (
    <div className="content_container">
      <div className="custom_container">
        <h2 className="content_heading">{t("top_categories")}</h2>
        <div className={c.root_container}>
          <Swiper
            modules={[A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView="auto"
            breakpoints={breakpointNewArrival}
            className={`_feature_slider ${c.root_container}`}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            loop={false}
            centeredSlides={false}
            centerInsufficientSlides={true}
            speed={900}
          >
            {data &&
             data.category.map((category, index) => (
                <SwiperSlide key={category.categoryId}>
                  <Category
                    name={category.name}
                    slug={category.slug}
                    img={category.icon[0]?.url}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, locale, ...etc }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await categoryPageData();
      const data = JSON.parse(JSON.stringify(_data));
      if (data.success) {
        setSettingsData(store, data);
      }
      return {
        props: {
          data,
          error: !data.success,
        },
      };
    }
);
