import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '~/redux/hook';
import ProductListItem from '@/components/shopList/shop/ProductListItem';
import ProductSingle from '@/components/shopList/shop/ProductSingle';
// import { reset } from "@/redux/features/filter";

const ShopItems = ({ products, activeTab, currentItems }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      {/* if no item in product */}
      {products.length === 0 && (
        <div className="cartmini__empty text-center mt-80">
          <div className="mb-30">
            <Image src="/img/cart/empty-cart.png" alt="empty-cart-img" width={283} height={171} unoptimized />
          </div>
          <h4>Sorry! Could not find the product you were looking For!!!</h4>
          <p>Please check if you have misspelt something or try searching with other words.</p>
          <button className="tpslider__btn">
            {/* onClick={() => dispatch(reset())} */}
            <Link href="/shop" className="tp-btn">
              Continue Shopping
            </Link>
          </button>
        </div>
      )}
      {/* if no item in product */}

      <div
        className={`row ${
          activeTab === 'three-col'
            ? 'row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct__shop-item'
            : activeTab === 'four-col'
            ? 'row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct__shop-item'
            : ''
        }`}
      >
        {products.map((p, i) => (
          <div key={i} className={`${activeTab === 'list' ? 'col-lg-12' : 'col mb-20'}`}>
            {activeTab === 'list' ? <ProductListItem product={p} /> : <ProductSingle product={p} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopItems;
