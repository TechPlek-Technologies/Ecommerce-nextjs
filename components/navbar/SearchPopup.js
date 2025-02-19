'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { ArrowRepeat, Search } from '@styled-icons/bootstrap';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import OutsideClickHandler from '~/components/ClickOutside';
import ImageLoader from '~/components/Image';
import { fetchData } from '~/lib/clientFunctions';
import { useTranslation } from 'react-i18next';

const SearchPopup = ({ isSearchOpen, setIsSearchOpen }) => {
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef('');
  const settings = useSelector((state) => state.settings);
  const { t } = useTranslation();
  const router = useRouter();

  const hideSearchBar = () => {
    searchRef.current.value = '';
    setSearchData([]);
  };

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

  return (
    <>
      <div className={`tpsearchbar tp-sidebar-area ${isSearchOpen ? 'tp-searchbar-opened' : ''}`}>
        <button className="tpsearchbar__close" onClick={() => setIsSearchOpen(false)}>
          <i className="icon-x"></i>
        </button>
        <div className="search-wrap text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6 pt-100 pb-100">
                <h2 className="tpsearchbar__title">What Are You Looking For?</h2>
                <div className="tpsearchbar__form">
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
                      padding: '10px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      maxHeight: '300px',
                      overflowY: 'auto'
                    }}
                  >
                    {searchData.map((product, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px', // Increased gap between image and text
                          padding: '12px',
                          borderRadius: '6px',
                          transition: 'background 0.3s ease',
                          cursor: 'pointer',
                          justifyContent: 'start'
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
                              width={90} // Slightly bigger image for better spacing
                              height={90}
                              style={{ borderRadius: '6px', objectFit: 'cover' }}
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center', // Centers the text vertically
                              marginLeft: "10px"
                            }}
                          >
                            <p
                              style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                textAlign: 'center', // Center text alignment
                                marginBottom:"0px !important"
                              }}
                            >
                              {product.item.name}
                            </p>
                            <div
                              style={{
                                fontSize: '12px',
                                color: 'gray',
                                textAlign: 'start' // Center text alignment
                              }}
                            >
                              {`${product.item.unitValue} ${product.item.unit}`}
                            </div>
                            <span
                              style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#27ae60',
                                textAlign: 'start'
                              }}
                            >
                              {settings.settingsData.currency.symbol + product.item.discount}
                              {product.item.discount < product.item.price && (
                                <del
                                  style={{
                                    fontSize: '12px',
                                    color: 'gray',
                                    marginLeft: '5px'
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
            </div>
          </div>
        </div>
      </div>
      <div className={`search-body-overlay ${isSearchOpen ? 'opened' : ''}`} onClick={() => setIsSearchOpen(false)}></div>
    </>
  );
};

export default SearchPopup;
