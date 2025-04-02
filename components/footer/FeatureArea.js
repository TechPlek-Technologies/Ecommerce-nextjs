import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

// feature
export function FeatureItem({ img, title, subtitle, spacing = '30' }) {
  return (
    <div className="col">
      <div className={`mainfeature__item text-center mb-${spacing}`}>
        <div className="mainfeature__icon">
          <Image src={`/img/icon/feature-icon-${img}.svg`} alt="icon" width={25} height={25} unoptimized/>
        </div>
        <div className="mainfeature__content">
          <h4 className="mainfeature__title">{title}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

const FeatureArea = ({ style_2 = false, bg_img = true }) => {
  const settings = useSelector((state) => state.settings);

  return (
    <section
      className={`feature-area mainfeature__bg ${style_2 ? '' : 'grey-bg'} ${bg_img ? '' : 'theme-bg-2'} pt-50 pb-40`}
      style={{ backgroundImage: bg_img ? `url('/img/shape/footer-shape-1.svg')` : 'none' }}
    >
      <div className="container">
        <div className="mainfeature__border pb-15">
          <div className="row row-cols-lg-10 row-cols-md-3 row-cols-2">
            <FeatureItem img="2" title={settings.settingsData.footerBanner.security.title} subtitle={settings.settingsData.footerBanner.security.description} />
            <FeatureItem img="4" title={settings.settingsData.footerBanner.support.title} subtitle= {settings.settingsData.footerBanner.support.description} />
            <FeatureItem img="1" title={settings.settingsData.footerBanner.delivery.title} subtitle= {settings.settingsData.footerBanner.delivery.description} />
            {/* <FeatureItem img="4" title="Help Center" subtitle="Dedicated 24/7 Support" />
            <FeatureItem img="5" title="Curated items" subtitle="From Handpicked Sellers" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureArea;
