"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// mobile menus 
 const mobile_menus = [
    {
      id:1,
      name:'Home',
      link:'/',
      has_dropdown:true,
      home_menus:[
        {title:'Home Page V1',img:'/assets/img/header/home1-1.jpg',link:'/'},
        {title:'Home Page V2',img:'/assets/img/header/home2-1.jpg',link:'/home-2'},
        {title:'Home Page V3',img:'/assets/img/header/home3-1.jpg',link:'/home-3'},
        {title:'Home Page V4',img:'/assets/img/header/home4-1.jpg',link:'/home-4'},
        {title:'Home Page V5',img:'/assets/img/header/home5-1.jpg',link:'/home-5'},
        {title:'Home Page V6',img:'/assets/img/header/home6-1.jpg',link:'/home-6'},
      ]
    },
    {
      id:2,
      name:'Shop',
      link:'/shop',
      has_dropdown:true,
      dropdown_menus:[
        {title:'Shop Left sidebar',link:'/shop'},
        {title:'Shop Without Banner',link:'/shop-2'},
        {title:'Shop Version',link:'/shop-3'},
        {title:'Shop Right sidebar',link:'/shop-right'},
        {title:'Shop List view',link:'/shop-list'},
      ]
    },
    {
      id:3,
      name:'Shop Details',
      link:'/shop-details',
      has_dropdown:true,
      dropdown_menus:[
        {title:'Image scroll',link:'/shop-details'},
        {title:'Product grid',link:'/shop-details-2'},
        {title:'Top Thumb Product',link:'/shop-details-3'},
        {title:'Simple Product',link:'/shop-details'},
      ]
    },
    {
      id:4,
      name:'Blog',
      link:'/blog',
      has_dropdown:true,
      dropdown_menus:[
        {title:'Big image',link:'/blog'},
        {title:'Right sidebar',link:'/blog-right-sidebar'},
        {title:'Left sidebar',link:'/blog-left-sidebar'},
        {title:'Single Post',link:'/blog-details'},
      ]
    },
    {
      id:5,
      name:'Pages',
      link:'/about',
      has_dropdown:true,
      dropdown_menus:[
        {title:'Shop Location One',link:'/shop-location'},
        {title:'Shop Location Two',link:'/shop-location-2'},
        {title:'FAQs',link:'/faq'},
        {title:'Checkout',link:'/checkout'},
        {title:'Cart Page',link:'/cart'},
        {title:'Compare Page',link:'/compare'},
        {title:'Wishlist',link:'/wishlist'},
        {title:'Sign In',link:'/login'},
        {title:'Coming soon',link:'/coming-soon'},
        {title:'Page 404',link:'/404'},
      ]
    },
    {
      id:6,
      name:'About Us',
      link:'/about',
    },
    {
      id:7,
      name:'Contact Us',
      link:'/contact',
    },
  ]

const MobileMenus = () => {
  const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  return (
    <ul>
      {mobile_menus.map((menu) => (
        <li
          key={menu.id}
          className={`${menu.has_dropdown ? "has-dropdown" : ""} ${
            menu.home_menus ? "has-homemenu" : ""
          }`}
        >
          <Link href={menu.link}>{menu.name}</Link>
          {menu.home_menus ? (
            <>
              <ul
                className="sub-menu home-menu-style"
                style={{
                  display: navTitle === menu.name ? "block" : "none",
                }}
              >
                {menu.home_menus.map((home_menu, i) => (
                  <li key={i}>
                    <Link href={home_menu.link}>
                      <Image
                        src={home_menu.img}
                        alt="home-img"
                        width={208}
                        height={219}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      {home_menu.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                className={`mean-expand ${
                  navTitle === menu.name ? "mean-clicked" : ""
                }`}
                onClick={() => openMobileMenu(menu.name)}
                style={{ fontSize: "18px", cursor: "pointer" }}
              >
                <i className="fal fa-plus"></i>
              </a>
            </>
          ) : menu.dropdown_menus ? (
            <>
              <ul
                className="sub-menu"
                style={{
                  display: navTitle === menu.name ? "block" : "none",
                }}
              >
                {menu.dropdown_menus.map((dropdown_menu, i) => (
                  <li key={i}>
                    <Link href={dropdown_menu.link}>{dropdown_menu.title}</Link>
                  </li>
                ))}
              </ul>
              <a
                className={`mean-expand ${
                  navTitle === menu.name ? "mean-clicked" : ""
                }`}
                onClick={() => openMobileMenu(menu.name)}
                style={{ fontSize: "18px", cursor: "pointer" }}
              >
                <i className="fal fa-plus"></i>
              </a>
            </>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default MobileMenus;
