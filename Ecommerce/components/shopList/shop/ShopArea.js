import React, { useEffect, useRef, useState } from 'react';
import usePagination from '~/hooks/usePagination';
import Pagination from './Pagination';
import NiceSelect from '~/components/Ui/nice-select';
import { useProductFilter } from '~/hooks/useFilter';
import { FourColDots, ListDots, ThreeColDots } from '~/components/svg';
import ShopSidebar from './ShopSidebar';
import CategoryArea from './CategoryArea';
import ShopItems from './ShopItems';
import { wrapper } from '~/redux/store';
import { compareData, fetchData } from '~/lib/clientFunctions';

// Tabs
const col_tabs = [
  { title: 'four-col', icon: <FourColDots /> },
  { title: 'three-col', icon: <ThreeColDots /> },
  { title: 'list', icon: <ListDots /> }
];

function ShopArea({ category_style = false, shop_right = false, data, error }) {
  const { products, setProducts, handleSorting } = useProductFilter();
  const [activeTab, setActiveTab] = useState(col_tabs[0].title);
  const pagination_per_page = activeTab === 'four-col' ? 12 : 9;
  const { currentItems, handlePageClick, pageCount } = usePagination(products, pagination_per_page);
  console.log('data', data);

  const _items = data?.product || [];
  const [_productList, _setProductList] = useState(_items);
  const [sortedItemList, setSortedItemList] = useState(_items);
  const [loading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState('db');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedChildCategory, setSelectedChildCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: data?.priceRange?.min || 0,
    max: data?.priceRange?.max || 1
  });
  const isInitialMount = useRef(true);

  function sortDataHandler(key) {
    setLoading(true);
    console.log('Sorting Data with Key:', key, _productList);
    const sortedData = compareData(_productList, key);
    console.log('Sorted Data:', sortedData);
    setSortedItemList([...sortedData]);
    setLoading(false);
  }

  // Sorting event handler
  const sortItems = (key) => {
    setSortKey(key);
    sortDataHandler(key);
  };

  // Sort data on _productList change
  useEffect(() => {
    sortDataHandler(sortKey);
  }, [_productList]);

  // Update product list on data change
  useEffect(() => {
    if (data?.product) {
      _setProductList(data.product);
    }
  }, [data]);

  async function updateFilteredProduct() {
    try {
      setLoading(true);
      let brandArr = '&';
      selectedBrand.forEach((el) => {
        brandArr = brandArr + `brands=${el}&`;
      });
      const cat = `category=${selectedCategory.length > 0 ? selectedCategory : ''}`;
      const sub = `&subcategory=${selectedSubCategory.length > 0 ? selectedSubCategory : ''}`;
      const child = `&childcategory=${selectedChildCategory.length > 0 ? selectedChildCategory : ''}`;
      const priceRange = `&price_min=${selectedPriceRange.min}&price_max=${selectedPriceRange.max}`;
      const prefix = `${cat}${sub}${child}${brandArr}${priceRange}`;
      const response = await fetchData(`/api/gallery?${prefix}`);
      _setProductList(response.product);
      setProductLength(response.product_length);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateFilteredProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSubCategory, selectedChildCategory, selectedBrand, selectedPriceRange]);

  // Handle active tab
  function handleActiveTab(tab) {
    setActiveTab(tab);
  }

  console.log('Data received in ShopArea:', data);
  console.log('Product list inside data:', data?.product);

  return (
    <section className="shop-area-start grey-bg pb-200">
      <div className="container">
        <div className={`row ${shop_right ? 'row-reverse' : ''}`}>
          <div className={`col-xl-2 col-lg-12 col-md-12 ${shop_right ? 'order-2' : ''}`}>
            <ShopSidebar
              shop_right={shop_right}
              category={data?.category}
              brand={data?.brand}
              sort={sortItems}
              updateCategory={setSelectedCategory}
              updateSubCategory={setSelectedSubCategory}
              updateChildCategory={setSelectedChildCategory}
              updateBrand={setSelectedBrand}
              updatePriceRange={setSelectedPriceRange}
              priceRange={data?.priceRange}
            />
          </div>
          <div className="col-xl-10 col-lg-12 col-md-12">
            <div className={`tpshop__top ${shop_right ? 'tpshop__sidebar-area mr-60' : 'ml-60'}`}>
              {!category_style && (
                <div className="tpshop__banner mb-30" style={{ backgroundImage: 'url(/img/banner/shop-bg-1.jpg)' }}>
                  <div className="tpshop__content text-center">
                    <span>The Salad</span>
                    <h4 className="tpshop__content-title mb-20">
                      Fresh & Natural <br />
                      Healthy Food Special Offer
                    </h4>
                    <p>Do not miss the current offers of us!</p>
                  </div>
                </div>
              )}
              {/* {category_style && (
                <div className="tpshop__category">
                  <CategoryArea cls="inner-category-active" perView={7} showCount={false} />
                </div>
              )} */}
              {/* <div className="product__filter-content mb-40">
                <div className="row align-items-center">
                  <div className="col-sm-4">
                    <div className="product__item-count">
                      <span>
                        Showing 1 - {currentItems.length} of {products.length} Products
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="tpproductnav tpnavbar product-filter-nav d-flex align-items-center justify-content-center">
                      <nav>
                        <div className="nav nav-tabs">
                          {col_tabs.map((tab, index) => (
                            <button
                              key={index}
                              className={`nav-link ${activeTab === tab.title ? 'active' : ''}`}
                              onClick={() => handleActiveTab(tab.title)}
                            >
                              <i>{tab.icon}</i>
                            </button>
                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product__navtabs d-flex justify-content-end align-items-center">
                      <div className="tp-shop-selector">
                        <NiceSelect
                          options={[
                            { value: '', label: 'Default sorting' },
                            { value: 'new', label: 'New Arrivals' },
                            { value: 'high', label: 'Price High To Low' },
                            { value: 'low', label: 'Price Low To High' }
                          ]}
                          defaultCurrent={0}
                          onChange={(item) => handleSorting(item)}
                          name="Sorting"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Shop items start */}
              <ShopItems products={sortedItemList} activeTab={activeTab} currentItems={currentItems} />
              {/* Shop items end */}

              {/* <div className="basic-pagination text-center mt-35">
                <nav>
                  <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopArea;
