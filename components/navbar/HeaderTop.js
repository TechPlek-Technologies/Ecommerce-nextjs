import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NiceSelect from '../Ui/nice-select';
import { useSelector } from 'react-redux';
import { BoxArrowInRight, GeoAlt, Person, PersonPlus, Telephone } from '@styled-icons/bootstrap';
import { useTranslation } from 'react-i18next';
import { signOut } from 'next-auth/react';

const HeaderTop = () => {
  const { settingsData } = useSelector((state) => state.settings);
  const { session } = useSelector((state) => state.localSession);
  const [std, setStd] = useState(settingsData);
  const { t } = useTranslation();

  useEffect(() => {
    setStd(settingsData);
  }, [settingsData]);

  const handleCurrency = (item) => {};
  return (
    <div className="header__top theme-bg-1 d-none d-md-block">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="header__top-left">
              <span style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <GeoAlt width={15} height={15} />
                  {std.shortAddress}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Telephone width={15} height={15} />
                  {std.phoneHeader}
                </div>
              </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="header__top-right d-flex align-items-center">
              <div className="header__top-link" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="auth-links" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* <LanguageSwitcher /> */}
                  {!session && (
                    <Link href="/signup">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff' }}>
                        <PersonPlus width={16} height={16} />
                        {t('register')}
                      </div>
                    </Link>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff' }}>
                    {!session ? (
                      <Link href="/signin" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Person width={16} height={16} />
                        <span>{t('signin')}</span>
                      </Link>
                    ) : (
                      <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Person width={16} height={16} />
                        <span>{session.user.name}</span>
                      </Link>
                    )}
                  </div>
                  {session && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px',color:"#fff", fontSize: '13px' }}>
                      <span
                        onClick={() => signOut({ callbackUrl: '/' })}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onMouseEnter={(e) => (e.target.style.color = '#96AE00')} // Change color on hover
                        onMouseLeave={(e) => (e.target.style.color = '#fff')}
                      >
                        <BoxArrowInRight width={16} height={16} />
                        {t('signout')}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Link href="/order-track" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GeoAlt width={18} height={18} />
                    {t('track_order')}
                  </Link>
                </div>
              </div>

              <div className="header__lang">
                <span className="header__lang-select">
                  English <i className="far fa-angle-down"></i>
                </span>
                <ul className="header__lang-submenu">
                  <li>
                    <a href="#">Australia</a>
                  </li>
                  <li>
                    <a href="#">Spain</a>
                  </li>
                  <li>
                    <a href="#">Brazil</a>
                  </li>
                  <li>
                    <a href="#">English</a>
                  </li>
                  <li>
                    <a href="#">France</a>
                  </li>
                  <li>
                    <a href="#">United States</a>
                  </li>
                </ul>
              </div>
              <div className="header__top-price">
                <NiceSelect
                  options={[
                    { value: 'usd', label: 'USD' },
                    { value: 'ars', label: 'ARS' },
                    { value: 'aud', label: 'AUD' },
                    { value: 'brl', label: 'BRL' },
                    { value: 'gbp', label: 'GBP' },
                    { value: 'dkk', label: 'DKK' },
                    { value: 'eur', label: 'EUR' }
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleCurrency(item)}
                  name="Currency"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
