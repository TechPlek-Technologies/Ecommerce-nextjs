"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCartInfo from '~/hooks/use-cart-info';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { checkPercentage } from '~/lib/clientFunctions';
import { removeFromCart } from '~/redux/cart.slice';

export default function CartSidebar({ isCartSidebarOpen, setIsCartSidebarOpen }) {
  // const CartSidebar = ({ isCartSidebarOpen, setIsCartSidebarOpen }) => {
  // const cartItems = useAppSelector((state) => state.cart);
  // const dispatch = useAppDispatch();
  const { total } = useCartInfo();
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState(cart);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  const decimalBalance = (num) => Math.round(num * 10) / 10;

  // Getting the count of items
  const getItemsCount = () => {
    const p = cartData.items.reduce((accumulator, item) => accumulator + item.qty, 0);
    return decimalBalance(p);
  };
  // Getting the total price with vat and tax of all items
  const getTotalPrice = () => {
    const p = cartData.items.reduce((accumulator, item) => {
      const totalPrice = item.qty * item.price;
      return accumulator + totalPrice + checkPercentage(totalPrice, item.tax) + checkPercentage(totalPrice, item.vat);
    }, 0);
    return decimalBalance(p);
  };

  function gotoCheckout() {
    router.push('/checkout');
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setShowCart(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`tpcartinfo tp-cart-info-area p-relative ${isCartSidebarOpen ? 'tp-sidebar-opened' : ''}`}>
        <button className="tpcart__close" onClick={() => setIsCartSidebarOpen(false)}>
          <i className="icon-x"></i>
        </button>

        <div className="tpcart">
          <h4 className="tpcart__title">Your Cart</h4>
          {/* if no item in cart */}
          {cartData.items && cartData.items.length === 0 ? (
            <div className="cartmini__empty text-center pt-100">
              <Image
                src="/img/cart/empty-cart.png"
                alt="empty-cart-img"
                width={200} // Adjust as needed
                height={200} // Adjust as needed
              />
              <p>Your Cart is empty</p>
              <Link href="/shop" className="tp-btn-2 mt-10">
                Go to Shop
              </Link>
            </div>
          ) : (
            <div className="tpcart__product">
              <div className="tpcart__product-list">
                <ul>
                  {cartData.items.map((item) => (
                    <li key={item.id}>
                      <div className="tpcart__item">
                        <div className="tpcart__img">
                          <Image src={item.image[0]?.url} alt={item.name} width={70} height={70} />
                          <div className="tpcart__del">
                            <a className="pointer" onClick={() => dispatch(removeFromCart(item.uid))}>
                              <i className="icon-x-circle"></i>
                            </a>
                          </div>
                        </div>
                        <div className="tpcart__content">
                          <span className="tpcart__content-title">
                            <Link href={`/shop-details/${item.id}`}>{item.name}</Link>
                          </span>
                          <div className="tpcart__cart-price">
                            <span className="quantity">{item.qty} x </span>
                            <span className="new-price">{settings.settingsData.currency.symbol + item.price}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tpcart__checkout">
                <div className="tpcart__total-price d-flex justify-content-between align-items-center">
                  <span> Total (Incl. VAT & Tax)</span>
                  <span className="heilight-price">
                    {' '}
                    {settings.settingsData.currency.symbol}
                    {getTotalPrice()}
                  </span>
                </div>
                <div className="tpcart__checkout-btn">
                  <Link className="tpcart-btn mb-10" href="/cart">
                    View Cart
                  </Link>
                  <Link className="tpcheck-btn" href="/checkout">
                    Checkout
                  </Link>
                </div>
              </div>
              <div className="tpcart__free-shipping text-center">
                <span>
                  Free shipping for orders <b>under 10km</b>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div onClick={() => setIsCartSidebarOpen(false)} className={`cartbody-overlay ${isCartSidebarOpen ? 'opened' : ''}`}></div>
    </>
  );
}
