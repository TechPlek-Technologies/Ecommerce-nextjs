import HeadData from '~/components/Head';
import { appUrl, fetchData, setSettingsData } from '~/lib/clientFunctions';
import { wrapper } from '~/redux/store';
import classes from '../styles/pages.module.css';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import pageData from '~/lib/dataLoader/pageData';
import AboutAreaFour from '~/components/about/AboutAreaFour';
import Link from 'next/link';
import AboutArea from '~/components/about/AboutArea';
import AboutAreaThree from '~/components/about/AboutAreaThree';
import AboutVideoArea from '~/components/about/AboutVideoArea';
import ChooseArea from '~/components/about/ChooseArea';
import TestimonialAreaThree from '~/components/about/TestimonialAreaThree';
const Error500 = dynamic(() => import('~/components/error/500'));

const AboutPage = ({ data, error }) => {
  const { t } = useTranslation();
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="About Us" />
          {/* <div className="layout_top">
            <h1 className={classes.heading}>{t("about_us")}</h1>
            {data && (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: data.page && data.page.content,
                }}
              ></div>
            )}
          </div> */}
          {/* breadcrumb area start */}
          <section
            className="about-area tpabout__inner-bg pt-175 pb-170 mb-50"
            style={{ backgroundImage: `url(/img/banner/about-bg-1.png)` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tpabout__inner text-center">
                    <h5 className="tpabout__inner-sub mb-15">About for Orfarm</h5>
                    <h3 className="tpabout__inner-title mb-35">Unique People</h3>
                    <p>
                      Over 25 years of experience, we have crafted thousands of strategic discovery process that <br /> enables us to peel
                      back the layers which enable us to understand, connect.
                    </p>
                    <div className="tpabout__inner-btn">
                      <Link href="/about">About us</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* breadcrumb area end */}

          {/* about area start */}
          <AboutAreaFour />
          {/* about area end */}

          {/* about area start */}
          <AboutArea style_2={true} />
          {/* about area end */}

          {/* about area start */}
          <AboutAreaThree style_2={true} />
          {/* about area end */}

          {/* about video area start */}
          <AboutVideoArea />
          {/* about video area end */}

          {/* choose area start */}
          <ChooseArea style_2={true} />
          {/* choose area end */}

          {/* testimonial three start */}
          <TestimonialAreaThree />
          {/* testimonial three end */}
        </>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, locale, ...etc }) => {
  if (res) {
    res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');
  }
  const _data = await pageData('about');
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

export default AboutPage;
