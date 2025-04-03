import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductBannerAreaFive = ({ data }) => {
  const { t } = useTranslation();
  if (!data || data.banner) return null;
  return (
    <section className="banner-area pb-55">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            {data.scopeA.image[0] && (
              <div className="tpbanner__wraper mb-20">
                <div className="tpbanner__thumb">
                  <div className="tpbanner__big-text tpbanner__big-bg" style={{ backgroundImage: `url(${data.scopeA.image[0]?.url})` }}>
                    <div className="tpbanner__big-bg-content">
                      <span className="tpbanner__sub-title mb-20">Top offers</span>
                      <h4 className="tpbanner__title mb-15">{data.scopeA.title}</h4>
                      <p>Natural, Rich in Nutrition</p>
                      <div className="tpbanner__btn">
                        <Link href="/shop" className="whight-btn">
                          {t('shop_now')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <div className="col-lg-12 col-md-12">
              {data.scopeB.image[0] && (
                <div className="tpbanner__thumb mb-10">
                  <div className="tpbanner__text tpbanner__bg3" style={{ backgroundImage: `url(${data.scopeB.image[0]?.url})` }}>
                    <div className="tpbanner__bg__second-content">
                      <span className="tpbanner__sub-title mb-20">Top offers</span>
                      <h4 className="tpbanner__title mb-15">{data.scopeB.title}</h4>
                      <p>Everything You Need</p>
                      {/* <Link href={data.scopeB.url} className="whight-btn">
                          {t('shop_now')}
                        </Link> */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="row gx-3">
              <div className="col-lg-6 col-md-6">
                {data.scopeC.image[0] && (
                  <div className="tpbanner__thumb mb-10">
                    <div className="tpbanner__text tpbanner__bg4" style={{ backgroundImage: `url(${data.scopeC.image[0]?.url})` }}>
                      <h4 className="tpbanner__title mb-20">{data.scopeC.title}</h4>
                      <p>Express Delivery</p>
                      {/* <Link href={data.scopeC.url} className="whight-btn">
                        {t('shop_now')}
                      </Link> */}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6">
                {data.scopeD.image[0] && (
                  <div className="tpbanner__thumb mb-10">
                    <div className="tpbanner__text tpbanner__bg4" style={{ backgroundImage: `url(${data.scopeD.image[0]?.url})` }}>
                      <h4 className="tpbanner__title mb-20">{data.scopeD.title}</h4>
                      <p>Only Sell Online</p>
                      {/* <Link href={data.scopeD.url} className="whight-btn">
                        {t('shop_now')}
                        <ArrowRight width={15} height={15} />
                      </Link> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBannerAreaFive;
