import HeadData from "~/components/Head";
import { setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import pageData from "~/lib/dataLoader/pageData";
import Breadcrumb from "~/components/shopList/breadcrumb/Breadcrumb";
import ReturnInner from "~/components/return/ReturnInner";
const Error500 = dynamic(() => import("~/components/error/500"));

const ReturnPage = ({ data, error }) => {
  const { t } = useTranslation();
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Return Policy" />
          {/* <div className="layout_top">
            <h1 className={classes.heading}>{t("return_policy")}</h1>
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
           <Breadcrumb title="Return Policy" />
          {/* breadcrumb-area-end */}

           {/* return inner */}
           <ReturnInner />
          {/* return inner */}
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
      const _data = await pageData("return");
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

export default ReturnPage;
