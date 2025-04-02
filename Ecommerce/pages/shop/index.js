import Breadcrumb from '~/components/shopList/breadcrumb/Breadcrumb';
import ShopArea from '~/components/shopList/shop/ShopArea';
import { setSettingsData } from '~/lib/clientFunctions';
import galleryPageData from '~/lib/dataLoader/gallery';
import { wrapper } from '~/redux/store';

function ShopPage({ data, error }) {
  console.log("data-shop",data);
  
  return (
    <>
      {/* breadcrumb-area-start */}
      <Breadcrumb title="Shop" bgClr="grey-bg" />
      {/* breadcrumb-area-end */}

      {/* shop area start */}
      <ShopArea data={data} error={error}/>
      {/* shop area end */}
    </>
  );
}

export default ShopPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const { category: Qc, brand: Qb } = query;
      let type = null;
      let _query = null;
      if ((Qc && Qc.length > 0) || (Qb && Qb.length > 0)) {
        type = true;
        _query = true;
      }
      const _data = await galleryPageData(type, _query);
      
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



