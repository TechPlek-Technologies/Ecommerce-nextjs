import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const menu_data = [
  {
    id: 1,
    name: 'Home',
    link: '/'
  },
  // {
  //   id:2,
  //   name:'Shop',
  //   link:'/shop',
  //   has_dropdown:true,
  //   shop_menus:[
  //     {
  //       id:1,
  //       title:'Shop layout',
  //       menus:[
  //         {title:'Shop Left sidebar',link:'/shop'},
  //         {title:'Shop Without Banner',link:'/shop-2'},
  //         {title:'Shop Version',link:'/shop-3'},
  //         {title:'Shop Right sidebar',link:'/shop-right'},
  //         {title:'Shop List view',link:'/shop-list'},
  //       ]
  //     },
  //     {
  //       id:2,
  //       title:'Product layout',
  //       menus:[
  //         {title:'Image scroll',link:'/shop-details'},
  //         {title:'Product grid',link:'/shop-details-2'},
  //         {title:'Top Thumb Product',link:'/shop-details-3'},
  //         {title:'Simple Product',link:'/shop-details'},
  //       ]
  //     },
  //     {
  //       id:3,
  //       title:'Product type',
  //       menus:[
  //         {title:'Products Simple',link:'/shop-details'},
  //         {title:'Products Group',link:'/shop-details'},
  //         {title:'Products Variable',link:'/shop-details'},
  //         {title:'Special',link:'/shop-details'},
  //         {title:'Construction',link:'/shop-details'},
  //       ]
  //     },
  //     {
  //       id:4,
  //       title:'Product category',
  //       menus:[
  //         {title:'Fresh bakery',link:'/shop-details'},
  //         {title:'Fresh fruits',link:'/shop-details'},
  //         {title:'Fresh meat',link:'/shop-details'},
  //         {title:'Fruit drink',link:'/shop-details'},
  //         {title:'Fresh bakery',link:'/shop-details'},
  //       ]
  //     },
  //   ]
  // },
  {
    id: 2,
    name: 'About Us',
    link: '/about'
  },
  {
    id: 3,
    name: 'Contact Us',
    link: '/contact'
  },
  {
    id: 4,
    name: 'Shop',
    link: '/shop'
  },
  {
    id: 5,
    name: 'Faq',
    link: '/faq'
  },
];

const Menus = () => {
  const { session } = useSelector((state) => state.localSession);
  return (
    <nav id="mobile-menu">
      <ul>
        {menu_data.map((menu) => (
          <li
            key={menu.id}
            className={`${menu.has_dropdown ? 'has-dropdown' : ''} ${menu.home_menus ? 'has-homemenu' : ''} ${
              menu.shop_menus ? 'has-megamenu' : ''
            }`}
          >
            <Link href={menu.link}>{menu.name}</Link>
            {menu.home_menus ? (
              <ul className="sub-menu home-menu-style">
                {menu.home_menus.map((home_menu, i) => (
                  <li key={i}>
                    <Link href={home_menu.link}>
                      <Image src={home_menu.img} alt="home-img" width={208} height={219} style={{ width: '100%', height: '100%' }} />
                      {home_menu.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : menu.shop_menus ? (
              <ul className="sub-menu mega-menu" style={{ backgroundImage: 'url(/assets/img/banner/mega-menu-shop-1.jpg)' }}>
                {menu.shop_menus.map((shop_menu, i) => (
                  <li key={i}>
                    <a className="mega-menu-title">{shop_menu.title}</a>
                    <ul>
                      {shop_menu.menus.map((menu, i) => (
                        <li key={i}>
                          <Link href={menu.link}>{menu.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : menu.dropdown_menus ? (
              <ul className="sub-menu">
                {menu.dropdown_menus.map((dropdown_menu, i) => (
                  <li key={i}>
                    <Link href={dropdown_menu.link}>{dropdown_menu.title}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
        {session && (session.user.a || session.user.s.status) && (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menus;
