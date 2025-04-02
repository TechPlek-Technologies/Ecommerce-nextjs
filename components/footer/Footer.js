import React from 'react';
import Image from 'next/image';
import FeatureArea from './FeatureArea';
import { useSelector } from 'react-redux';
import { Facebook, Instagram, Pinterest, Twitter, Youtube } from '@styled-icons/bootstrap';
import ImageLoader from '../Image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = ({ style_2 = false }) => {
  const settings = useSelector((state) => state.settings);
  const { t } = useTranslation();
  const socialLinks = [
    { name: 'Facebook', link: settings.settingsData.social.facebook, icon: <Facebook width={20} height={20} /> },
    { name: 'Instagram', link: settings.settingsData.social.instagram, icon: <Instagram width={20} height={20} /> },
    { name: 'Twitter', link: settings.settingsData.social.twitter, icon: <Twitter width={20} height={20} /> },
    { name: 'Youtube', link: settings.settingsData.social.youtube, icon: <Youtube width={20} height={20} /> },
    { name: 'Pinterest', link: settings.settingsData.social.pinterest, icon: <Pinterest width={20} height={20} /> }
  ];
  const footer_link = {
    company: [
      {
        name: t('about_us'),
        link: '/about'
      }
    ],
    shop: [
      {
        name: t('faq'),
        link: '/faq'
      },
      {
        name: t('privacy_policy'),
        link: '/privacy'
      },
      {
        name: t('terms_and_conditions'),
        link: '/terms'
      },
      {
        name: t('return_policy'),
        link: '/return'
      }
    ],
    account: [
      {
        name: t('signin'),
        link: '/signin'
      },
      {
        name: t('profile'),
        link: '/profile'
      },
      {
        name: t('track_order'),
        link: '/order-track'
      }
    ]
  };

  return (
    <>
      {' '}
      <FeatureArea />
      <footer>
        <div className={`tpfooter__area theme-bg-2 ${style_2 ? 'pt-55 footer-border' : ''}`}>
          <div className="tpfooter__top pb-15">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div className="tpfooter__widget footer-col-1 mb-50">
                    <Link href="/">
                      <div>
                        {settings.settingsData.logo[0] && (
                          <ImageLoader src={settings.settingsData.logo[0]?.url} width={145} height={45} alt={settings.settingsData.name} />
                        )}
                      </div>
                    </Link>
                    <p>{settings.settingsData.description}</p>
                    <div className="tpfooter__widget-social mt-45">
                      <span className="tpfooter__widget-social-title mb-5">Social Media:</span>
                      {socialLinks.map((s, i) => (
                        <a href={s.link} target="_blank" key={i}>
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                  <div className="tpfooter__widget mb-50">
                    <h4 className="tpfooter__widget-title">Contact Info</h4>
                    <p>{settings.settingsData.address}</p>
                    <div className="tpfooter__widget-time-info mt-35">
                      <div className="tpfooter__widget-links">
                        <ul>
                          <li>
                            <span>
                              <b> Email: </b>
                            </span>
                            <a href={`mailto:${settings.settingsData.email}`}>{settings.settingsData.email}</a>
                          </li>
                          <li>
                            <span>
                              <b> Phone: </b>
                            </span>
                            <a href={`tel:${settings.settingsData.phoneFooter}`}>{settings.settingsData.phoneFooter}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-4 col-sm-5">
                  <div className="tpfooter__widget mb-50">
                    <h4 className="tpfooter__widget-title">Quick Links</h4>
                    <div className="tpfooter__widget-links">
                      <ul>
                        {footer_link.shop.map((item, index) => (
                          <li key={index}>
                            <a href={item.link}>{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-4 col-sm-5">
                  <div className="tpfooter__widget mb-50">
                    <h4 className="tpfooter__widget-title">My Account</h4>
                    <div className="tpfooter__widget-links">
                      <ul>
                        {footer_link.account.map((item, index) => (
                          <li key={index}>
                            <a href={item.link}>{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-8 col-sm-7">
                  <div className="tpfooter__widget mb-50">
                    <h4 className="tpfooter__widget-title">Our newsletter</h4>
                    <div className="tpfooter__widget-newsletter">
                      <p>
                        Subscribe to the Orfarm mailing list to receive updates <br /> on new arrivals & other information.
                      </p>
                      <form>
                        <span>
                          <i>
                            <Image src="/img/shape/message-1.svg" alt="icon" width={18} height={15} unoptimized/>
                          </i>
                        </span>
                        <input type="email" placeholder="Your email address..." />
                        <button className="tpfooter__widget-newsletter-submit tp-news-btn">Subscribe</button>
                      </form>
                      <div className="tpfooter__widget-newsletter-check mt-10">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            I accept terms & conditions & privacy policy.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tpfooter___bottom pt-40 pb-40">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-7 col-sm-12">
                  <div className="tpfooter__copyright">
                    <span className="tpfooter__copyright-text">{settings.settingsData.copyright}</span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-5 col-sm-12">
                  <div className="tpfooter__copyright-thumb text-end">
                    {settings.settingsData.gatewayImage[0] && (
                      <ImageLoader
                        src={settings.settingsData.gatewayImage[0]?.url}
                        alt={settings.settingsData.gatewayImage[0]?.name}
                        width={100}
                        height={35}
                        style={{
                          width: '250px',
                          height: '100%'
                        }}
                      />
                    )}
                  </div>
                </div>
                ;
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
