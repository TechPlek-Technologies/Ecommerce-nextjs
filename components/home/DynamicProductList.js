
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchData } from '~/lib/clientFunctions';
import { toast } from 'react-toastify';
import Spinner from '../Ui/Spinner';
import { Navigation } from 'swiper';
import ProductSingle from '../shopList/shop/ProductSingle';
import { useTranslation } from 'react-i18next';

// Swiper slider settings
const sliderSetting = {
  slidesPerView: 5,
  spaceBetween: 10,
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: true
  },
  breakpoints: {
    1200: { slidesPerView: 5 },
    992: { slidesPerView: 4 },
    768: { slidesPerView: 3 },
    576: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
  },
  navigation: {
    nextEl: '.tpproduct-btn__nxt',
    prevEl: '.tpproduct-btn__prv'
  }
};

// Define category tabs with corresponding title and type
const categories = [
  { label: 'Best Selling', type: 'bestselling', title: 'best_selling' },
  { label: 'New Products', type: 'new', title: 'new_products' },
  { label: 'Trending Products', type: 'trending', title: 'trending_products' }
];

const DynamicProductList = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  // Fetch products dynamically
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const url = `/api/home/products?type=${activeCategory.type}`;
        const response = await fetchData(url);
        if (response.success) {
          setProducts(response.products || []);
        } else {
          toast.error('Failed to load products');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
      setLoading(false);
    };

    loadProducts();
  }, [activeCategory]);

  return (
    <section className="weekly-product-area grey-bg pb-70">
      <div className="container">
        {/* Section Header */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="tpsection mb-20">
              <h4 className="tpsection__sub-title">~ Special Products ~</h4>
              <h4 className="tpsection__title">{t(activeCategory.title)}</h4>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="row">
          <div className="col-lg-12">
            <div className="tpnavtab__area pb-40">
              <nav>
                <div className="nav nav-tabs" id="nav-tab">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`nav-link ${activeCategory.label === category.label ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Product Slider or No Products Message */}
              <div className="tpproduct__arrow p-relative">
                {loading ? (
                  <Spinner />
                ) : products.length > 0 ? (
                  <Swiper {...sliderSetting} modules={[Navigation]} className="swiper-container tpproduct-active tpslider-bottom p-relative">
                    {products.map((product, index) => (
                      <SwiperSlide key={index}>
                        <ProductSingle product={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="no-products text-center">
                    <p className="text-muted">{t('no_products_available', { category: t(activeCategory.title) })}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                {products.length > 0 && (
                  <div className="tpproduct-btn">
                    <div className="tpprduct-arrow tpproduct-btn__prv">
                      <a href="#">
                        <i className="icon-chevron-left"></i>
                      </a>
                    </div>
                    <div className="tpprduct-arrow tpproduct-btn__nxt">
                      <a href="#">
                        <i className="icon-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Shop All Button */}
        <div className="row">
          <div className="col-lg-12">
            <div className="tpproduct__all-item text-center">
              <span>
                Discover thousands of other quality products.{' '}
                <Link href="/shop">
                  Shop All Products <i className="icon-chevrons-right"></i>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicProductList;
