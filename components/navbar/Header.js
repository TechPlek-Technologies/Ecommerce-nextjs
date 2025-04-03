import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderTop from '~/components/navbar/HeaderTop';
import Menus from '~/components/navbar/Menus';
import SearchPopup from '~/components/navbar/SearchPopup';
import CartSidebar from '~/components/navbar/CartSidebar';
import MobileSidebar from '~/components/navbar/MobileSidebar';
import useSticky from '~/hooks/use-sticky';
import useCartInfo from '~/hooks/use-cart-info';
import ImageLoader from '../Image';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Header = () => {
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const { wishlist, compare } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState(cart);
  const { session } = useSelector((state) => state.localSession);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const { settingsData } = useSelector((state) => state.settings);
  const [std, setStd] = useState(settingsData);
  const router = useRouter();

  const decimalBalance = (num) => Math.round(num * 10) / 10;

  useEffect(() => {
    setStd(settingsData);
  }, [settingsData]);

  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  const goToWishList = () => {
    if (session) {
      router.push('/profile?tab=1');
    } else {
      toast.warning('You need to login to create a Wishlist');
    }
  };

  // Getting the count of items
  const getItemsCount = () => {
    const p = cartData.items.reduce((accumulator, item) => accumulator + item.qty, 0);
    return decimalBalance(p);
  };

  return (
    <>
      <header>
        {/* header top start */}
        <HeaderTop />
        {/* header top end */}
        <div id="header-sticky" className={`header__main-area d-none d-xl-block ${sticky ? 'header-sticky' : ''}`}>
          <div className="container">
            <div className="header__for-megamenu p-relative">
              <div className="row align-items-center">
                <div className="col-xl-3">
                  <div className="header__logo">
                    <Link href="/">{std.logo[0] && <ImageLoader src={std.logo[0]?.url} width={200} height={70} alt={std.name} />}</Link>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="header__menu main-menu text-center">
                    {/* menus start */}
                    <Menus />
                    {/* menus end */}
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="header__info d-flex align-items-center">
                    <div className="header__info-search tpcolor__purple ml-10">
                      <button onClick={() => setIsSearchOpen(true)} className="tp-search-toggle">
                        <i className="icon-search"></i>
                      </button>
                    </div>

                    <div className="header__info-cart tpcolor__yellow ml-10 tp-cart-toggle">
                      <Link href="/compare">
                        <i className="icon-repeat"></i>
                        <span>{compare.length || 0}</span>
                      </Link>
                    </div>
                    <div className="header__info-cart tpcolor__greenish ml-10 tp-cart-toggle">
                      <button onClick={goToWishList}>
                        <i className="icon-heart icons"></i>
                        <span>{wishlist || 0}</span>
                      </button>
                    </div>
                    <div className="header__info-cart tpcolor__oasis ml-10 tp-cart-toggle">
                      <button onClick={() => setIsCartOpen(true)}>
                        <i>
                          <Image
                            src="/img/icon/cart-1.svg"
                            alt="icon"
                            width={24} // Adjust as needed
                            height={24} // Adjust as needed
                            unoptimized
                          />
                        </i>
                        <span>{getItemsCount()}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile-menu-area */}
        <div id="header-sticky-2" className={`tpmobile-menu secondary-mobile-menu d-xl-none ${sticky ? 'header-sticky' : ''}`}>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4 col-3 col-sm-3">
                <div className="mobile-menu-icon">
                  <button onClick={() => setIsMobileSidebarOpen(true)} className="tp-menu-toggle">
                    <i className="icon-menu1"></i>
                  </button>
                </div>
              </div>
              {/* <div className="col-lg-4 col-md-4 col-6 col-sm-4">
                     <div className="header__logo text-center">
                        <Link href="/">
                           <Image src={"/img/logo/logo.png"} alt="logo" style={{height: 'auto'}}/>
                        </Link>
                     </div>
                  </div> */}
              <div className="col-lg-4 col-md-4 col-6 col-sm-4">
                <div className="header__logo text-center" style={{ position: 'relative', width: '150px', height: '50px' }}>
                  <Link href="/">
                    <Image src={std.logo[0]?.url} alt="logo" fill style={{ objectFit: 'contain' }} unoptimized />
                  </Link>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-3 col-sm-5">
                <div className="header__info d-flex align-items-center">
                  <div className="header__info-search tpcolor__purple ml-10 d-none d-sm-block">
                    <button onClick={() => setIsSearchOpen(true)} className="tp-search-toggle">
                      <i className="icon-search"></i>
                    </button>
                  </div>
                  <div className="header__info-user tpcolor__yellow ml-5 d-none d-sm-block">
                    <Link href="/login">
                      <i className="icon-user"></i>
                    </Link>
                  </div>
                  <div className="header__info-wishlist tpcolor__greenish ml-5 d-none d-sm-block">
                    <Link href="/wishlist">
                      <i className="icon-heart icons"></i>
                    </Link>
                  </div>
                  <div className="header__info-cart tpcolor__oasis ml-5 tp-cart-toggle">
                    <button onClick={() => setIsCartOpen(true)}>
                      <i>
                        <Image
                          src="/img/icon/cart-1.svg"
                          alt="icon"
                          width={24} // Adjust as needed
                          height={24} // Adjust as needed
                          unoptimized
                        />
                      </i>
                      <span>{quantity}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mobile-menu-area-end */}

        {/* search popup start */}
        <SearchPopup isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        {/* search popup end */}

        {/* cart sidebar start */}
        <CartSidebar isCartSidebarOpen={isCartOpen} setIsCartSidebarOpen={setIsCartOpen} />
        {/* cart sidebar end */}

        {/* mobile-menu start */}
        <MobileSidebar isSidebarOpen={isMobileSidebarOpen} setIsSidebarOpen={setIsMobileSidebarOpen} />
        {/* mobile-menu end */}
      </header>
    </>
  );
};

export default Header;
