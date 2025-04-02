import { useTranslation } from "react-i18next";
import HeadData from "~/components/Head";
import { setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import dynamic from "next/dynamic";
import pageData from "~/lib/dataLoader/pageData";
import TermInner from "~/components/terms/TermInner";
import Breadcrumb from "~/components/shopList/breadcrumb/Breadcrumb";
const Error500 = dynamic(() => import("~/components/error/500"));

const TermsPage = ({ data, error }) => {
  const { t } = useTranslation();
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Terms & Conditions" />
          {/* <div className="layout_top">
            <h1 className={classes.heading}>{t("terms_and_conditions")}</h1>
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
           <Breadcrumb title="Terms & Conditions" />
          {/* breadcrumb-area-end */}

           {/* terms inner */}
           <TermInner />
          {/* terms inner */}
        </>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, locale, ...etc }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await pageData("terms");
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

export default TermsPage;
