import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeadData from '~/components/Head';
import HeroBanner from '~/components/HeroBanner';
import CategoryDisplay from '~/components/home/CategoryDisplay';
import DynamicProductList from '~/components/home/DynamicProductList';
import OfferCountdownBanner from '~/components/OfferCountdownBanner';
import ProductBannerAreaFive from '~/components/ProductBannerAreaFive';
import { setSettingsData } from '~/lib/clientFunctions';
import homePageData from '~/lib/dataLoader/home';
import { wrapper } from '~/redux/store';

const Error500 = dynamic(() => import('~/components/error/500'));
const ProductDetails = dynamic(() => import('~/components/Shop/Product/productDetails'));
const GlobalModal = dynamic(() => import('~/components/Ui/Modal/modal'));

function HomePage({ data, error }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    router.push('/', undefined, { scroll: false });
    setIsOpen(false);
  };

  console.log('data', data);

  useEffect(() => {
    if (router.query.slug) {
      setIsOpen(true);
    }
  }, [router.query.slug]);

  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData />
          {/* old */}
          {/* <Header
            carousel={data.additional && data.additional.homePage.carousel}
          /> */}
          <HeroBanner carousel={data.additional && data.additional.homePage.carousel} />
          {/* <CategoryList categoryList={data.category} /> */}

          <section className="category-area grey-bg pb-40">
            <div className="container">
              <CategoryDisplay cls="category-active" />
            </div>
          </section>
          {/* new */}
          {/* <AllProducts categoryList={data.category} /> */}
          {/* deal offer start */}
          <DynamicProductList />
          <OfferCountdownBanner banner={data.additional && data.additional.homePage.banner} />
          {/* deal offer end */}

          {/* <ProductList title={t('new_products')} type="new" /> */}
          {/* old */}
          {/* <Banner banner={data.additional && data.additional.homePage.banner} /> */}
          {/* <ProductList title={t('trending_products')} type="trending" /> */}
          <div className="content_spacing" />
          {/* old */}
          {/* <Collection data={data.additional && data.additional.homePage.collection} /> */}
          <ProductBannerAreaFive data={data.additional && data.additional.homePage.collection} />
          {/* <ProductList title={t('best_selling')} type="bestselling" /> */}
          {/* <BrandCardList items={data.brand || []} /> */}
          {/* <div className="content_spacing" /> */}
        </>
      )}
      <GlobalModal small={false} isOpen={isOpen} handleCloseModal={handleCloseModal}>
        {router.query.slug && <ProductDetails productSlug={router.query.slug} />}
      </GlobalModal>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, locale, ...etc }) => {
  if (res) {
    res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');
  }
  const _data = await homePageData();
  const data = JSON.parse(JSON.stringify(_data));
  if (data.success) {
    setSettingsData(store, data);
  }
  return {
    props: {
      data,
      error: !data.success
    }
  };
});

export default HomePage;
