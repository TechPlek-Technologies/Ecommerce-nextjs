import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileMenus from '~/components/navbar/MobileMenus';
import { fetchData } from '~/lib/clientFunctions';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { ArrowRepeat, Search } from '@styled-icons/bootstrap';
import ImageLoader from '../Image';
import OutsideClickHandler from '../ClickOutside';

const category_data = [
  {
    id: 1,
    img: '/assets/img/catagory/category-1.jpg',
    name: 'Vegetables',
    slug: 'vegetables',
    parent: 'Vegetables',
    children: ['Onion', 'Lemon', 'Kiwi', 'Ginger', 'Apricots', 'Cauliflower', 'Cranberries'],
    product_id: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 2,
    img: '/assets/img/catagory/category-2.jpg',
    name: 'Fresh Fruits',
    slug: 'fresh-fruits',
    parent: 'Fresh Fruits',
    children: ['Chicken Tenders', 'Lemon', 'Common Grape', 'Plum', 'Mangosteen', 'Banana'],
    product_id: [8, 9, 10, 11, 12, 13]
  },
  {
    id: 3,
    img: '/assets/img/catagory/category-3.jpg',
    name: 'Fruit Drink',
    slug: 'fruit-drink',
    parent: 'Fruit Drink',
    children: ['Milk', 'Soda Sparkling'],
    product_id: [14, 15, 16]
  },
  {
    id: 4,
    img: '/assets/img/catagory/category-4.jpg',
    name: 'Fresh Bakery',
    slug: 'fresh-bakery',
    parent: 'Fresh Bakery',
    children: ['Strawberry', 'Dragon Fruit', 'Lime Fruit', 'Apricot Fruit'],
    product_id: [17, 18, 19, 20]
  },
  {
    id: 5,
    img: '/assets/img/catagory/category-5.jpg',
    name: 'Biscuits Snack',
    slug: 'biscuits-snack',
    parent: 'Biscuits Snack',
    children: ['Rice Crisps', 'Laffy Taffy'],
    product_id: [21, 22]
  },
  {
    id: 6,
    img: '/assets/img/catagory/category-6.jpg',
    name: 'Fresh Meat',
    slug: 'fresh-meat',
    parent: 'Fresh Meat',
    children: ['Beef', 'Chicken', 'Meat'],
    product_id: [23, 24, 25]
  },
  {
    id: 7,
    img: '/assets/img/catagory/category-7.jpg',
    name: 'Fresh Milk',
    slug: 'fresh-milk',
    parent: 'Fresh Milk',
    children: ['Milk'],
    product_id: [26]
  },
  {
    id: 8,
    img: '/assets/img/catagory/category-8.jpg',
    name: 'Sea Foods',
    slug: 'sea-foods',
    parent: 'Sea Foods',
    children: [],
    product_id: []
  }
];

const MobileSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  // const categories = [...category_data];
  const [categories, setCategories] = useState([]);
  const { session } = useSelector((state) => state.localSession);
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef('');
  const settings = useSelector((state) => state.settings);

  const hideSearchBar = () => {
    searchRef.current.value = '';
    setSearchData([]);
  };

  // Fetch and filter search results
  const searchItem = async () => {
    setSearching(true);
    try {
      const options = {
        threshold: 0.3,
        keys: ['name']
      };
      const product = await fetchData(`/api/home/product_search`);
      const Fuse = (await import('fuse.js')).default;
      const fuse = new Fuse(product.product, options);
      setSearchData(fuse.search(searchRef.current.value));
    } catch (err) {
      console.log(err);
    }
    setSearching(false);
  };

  // Fetch categories data
  useEffect(() => {
    const getCategories = async () => {
      const url = '/api/home/categories?only_category=true';
      const data = await fetchData(url);
      if (data.success) {
        setCategories(data.category);
      } else {
        setCategories([]);
      }
    };

    getCategories();
  }, []);

  const goToWishList = () => {
    if (session) {
      router.push('/profile?tab=1');
    } else {
      toast.warning('You need to login to create a Wishlist');
    }
  };

  const router = useRouter();
  return (
    <>
      <div className={`tpsideinfo ${isSidebarOpen ? 'tp-sidebar-opened' : ''}`}>
        <button className="tpsideinfo__close" onClick={() => setIsSidebarOpen(false)}>
          Close<i className="fal fa-times ml-10"></i>
        </button>
        <div className="tpsideinfo__search text-center pt-35">
          <span className="tpsideinfo__search-title mb-20">What Are You Looking For?</span>
          {/* Search */}
          <div
            className="tpsearchbar__form"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '5px',
              width: 'auto'
            }}
          >
            <input type="text" ref={searchRef} placeholder="Search Product..." onInput={searchItem} />
            {searching && <ArrowRepeat width={17} height={17} className="spinner-icon" />}
            <span className="tpsearchbar__search-btn">
              <Search width={15} height={15} />
            </span>
          </div>
          <OutsideClickHandler show={searchData.length > 0} onClickOutside={hideSearchBar}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                background: 'white',
                padding: '6px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                maxHeight: '300px',
                overflowY: 'auto',
                width: '100%'
              }}
            >
              {searchData.map((product, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px',
                    borderRadius: '6px',
                    transition: 'background 0.3s ease',
                    cursor: 'pointer',
                    justifyContent: 'start',
                    width: '100%',
                    maxWidth: '100%',
                    border: '1px solid rgb(226 226 226)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8f8f8')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Link
                    href={`/product/${product.item.slug}`}
                    onClick={hideSearchBar}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%'
                    }}
                  >
                    <div>
                      <ImageLoader
                        src={product.item.image[0]?.url}
                        alt={product.item.name}
                        width={40}
                        height={40}
                        style={{
                          borderRadius: '6px',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: '2px',
                        flex: 1
                      }}
                    >
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          marginBottom: '0px', // Reduced margin to remove extra spacing
                          whiteSpace: 'wrap', // Prevents wrapping
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {product.item.name}
                      </p>
                      <div
                        style={{
                          fontSize: '11px', // Slightly smaller for better compactness
                          color: 'gray',
                          marginBottom: '2px' // Small margin to separate from price
                        }}
                      >
                        {`${product.item.unitValue} ${product.item.unit}`}
                      </div>
                      <span
                        style={{
                          fontSize: '13px', // Slightly smaller font size for price
                          fontWeight: 'bold',
                          color: '#27ae60'
                        }}
                      >
                        {settings.settingsData.currency.symbol + product.item.discount}
                        {product.item.discount < product.item.price && (
                          <del
                            style={{
                              fontSize: '11px', // Reduced size for the original price
                              color: 'gray',
                              marginLeft: '3px' // Keeps it close to discount price
                            }}
                          >
                            {settings.settingsData.currency.symbol + product.item.price}
                          </del>
                        )}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </OutsideClickHandler>
        </div>
        <div className="tpsideinfo__nabtab">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                tabIndex={-1}
              >
                Menu
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                tabIndex={-1}
              >
                Categories
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
              <div className="mobile-menu mean-container">
                <div className="mean-bar">
                  <nav className="mean-nav">
                    {/* Mobile Menus */}
                    <MobileMenus />
                    {/* Mobile Menus */}
                  </nav>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
              <div className="tpsidebar-categories">
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a className="text-white pointer" onClick={() => router.push(`/shop?category=${category.slug}`)}>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="tpsideinfo__account-link">
          <Link href="/signin">
            <i className="icon-user icons"></i> Login
          </Link>
        </div>
        <div className="tpsideinfo__account-link">
          <Link href="/signup">
            <i className="icon-user icons"></i> Register
          </Link>
        </div> */}
        <div className="tpsideinfo__account-links">
          <span className="tpsideinfo__account-link">
            <Link href="/signin">
              <i className="icon-user icons"></i> Login
            </Link>
          </span>
          <span className="mx-2">|</span> {/* Separator */}
          <span className="tpsideinfo__account-link">
            <Link href="/signup">
              <i className="icon-user icons"></i> Register
            </Link>
          </span>
        </div>
        <div className="tpsideinfo__wishlist-link">
          <a onClick={goToWishList} className="pointer">
            <i className="icon-heart"></i> Wishlist
          </a>
        </div>
      </div>

      {/* overlay start  */}
      <div onClick={() => setIsSidebarOpen(false)} className={'body-overlay ' + (isSidebarOpen ? 'opened' : '')}></div>
      {/* overlay end  */}
    </>
  );
};

export default MobileSidebar;
