import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileMenus from "~/components/navbar/MobileMenus";

const category_data = [
    {
      id: 1,
      img: "/assets/img/catagory/category-1.jpg",
      name: "Vegetables",
      slug: "vegetables",
      parent: "Vegetables",
      children: [
        "Onion",
        "Lemon",
        "Kiwi",
        "Ginger",
        "Apricots",
        "Cauliflower",
        "Cranberries",
      ],
      product_id: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: 2,
      img: "/assets/img/catagory/category-2.jpg",
      name: "Fresh Fruits",
      slug: "fresh-fruits",
      parent: "Fresh Fruits",
      children: [
        "Chicken Tenders",
        "Lemon",
        "Common Grape",
        "Plum",
        "Mangosteen",
        "Banana",
      ],
      product_id: [8, 9, 10, 11, 12, 13],
    },
    {
      id: 3,
      img: "/assets/img/catagory/category-3.jpg",
      name: "Fruit Drink",
      slug: "fruit-drink",
      parent: "Fruit Drink",
      children: [
        "Milk",
        "Soda Sparkling"
      ],
      product_id: [14, 15, 16],
    },
    {
      id: 4,
      img: "/assets/img/catagory/category-4.jpg",
      name: "Fresh Bakery",
      slug: "fresh-bakery",
      parent: "Fresh Bakery",
      children: [
        "Strawberry",
        "Dragon Fruit",
        "Lime Fruit",
        "Apricot Fruit"
      ],
      product_id: [17, 18, 19, 20],
    },
    {
      id: 5,
      img: "/assets/img/catagory/category-5.jpg",
      name: "Biscuits Snack",
      slug: "biscuits-snack",
      parent: "Biscuits Snack",
      children: [
        "Rice Crisps",
        "Laffy Taffy"
      ],
      product_id: [21, 22],
    },
    {
      id: 6,
      img: "/assets/img/catagory/category-6.jpg",
      name: "Fresh Meat",
      slug: "fresh-meat",
      parent: "Fresh Meat",
      children: [
        "Beef",
        "Chicken",
        "Meat"
      ],
      product_id: [23, 24, 25],
    },
    {
      id: 7,
      img: "/assets/img/catagory/category-7.jpg",
      name: "Fresh Milk",
      slug: "fresh-milk",
      parent: "Fresh Milk",
      children: [
        "Milk",
      ],
      product_id: [26],
    },
    {
      id: 8,
      img: "/assets/img/catagory/category-8.jpg",
      name: "Sea Foods",
      slug: "sea-foods",
      parent: "Sea Foods",
      children: [
   
      ],
      product_id: [],
    }
  ];

const MobileSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const categories = [...category_data];
  const router = useRouter();
  return (
    <>
      <div className={`tpsideinfo ${isSidebarOpen ? "tp-sidebar-opened" : ""}`}>
        <button
          className="tpsideinfo__close"
          onClick={() => setIsSidebarOpen(false)}
        >
          Close<i className="fal fa-times ml-10"></i>
        </button>
        <div className="tpsideinfo__search text-center pt-35">
          <span className="tpsideinfo__search-title mb-20">
            What Are You Looking For?
          </span>
          <form action="#">
            <input type="text" placeholder="Search Products..." />
            <button>
              <i className="icon-search"></i>
            </button>
          </form>
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
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex={0}
            >
              <div className="mobile-menu mean-container">
                <div className="mean-bar">
                  <nav className="mean-nav">
                    {/* Mobile Menus */}
                    <MobileMenus/>
                    {/* Mobile Menus */}
                  </nav>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex={0}
            >
              <div className="tpsidebar-categories">
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a className="text-white pointer" 
                        onClick={() => router.push(`/search?category=${category.name.split(" ").join("-").toLowerCase()}`) }>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="tpsideinfo__account-link">
          <Link href="/login">
            <i className="icon-user icons"></i> Login / Register
          </Link>
        </div>
        <div className="tpsideinfo__wishlist-link">
          <Link href="/wishlist">
            <i className="icon-heart"></i> Wishlist
          </Link>
        </div>
      </div>

      {/* overlay start  */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={"body-overlay " + (isSidebarOpen ? "opened" : "")}
      ></div>
      {/* overlay end  */}
    </>
  );
};

export default MobileSidebar;
