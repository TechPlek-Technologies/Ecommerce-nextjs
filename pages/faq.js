import HeadData from '~/components/Head';
import { appUrl, fetchData, setSettingsData } from '~/lib/clientFunctions';
import { wrapper } from '~/redux/store';
import classes from '../styles/pages.module.css';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import pageData from '~/lib/dataLoader/pageData';
import BreadcrumbArea from '~/components/faq/BreadcrumbArea';
import FaqArea from '~/components/faq/FaqArea';

const Error500 = dynamic(() => import('~/components/error/500'));

const FaqPage = ({ data, error }) => {
  const { t } = useTranslation();
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Faq" />
          {/* <div className="layout_top">
            <h1 className={classes.heading}>{t("faq")}</h1>
            {data && (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: data.page && data.page.content,
                }}
              ></div>
            )}
          </div> */}

          {/* breadcrumb-area-start */}
          <BreadcrumbArea title="Faq" subtitle="Faq" />
          {/* breadcrumb-area-end */}

          {/* faq area start */}
          <FaqArea />
          {/* faq area end */}
        </>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, locale, ...etc }) => {
  if (res) {
    res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');
  }
  const _data = await pageData('faq');
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

export default FaqPage;
