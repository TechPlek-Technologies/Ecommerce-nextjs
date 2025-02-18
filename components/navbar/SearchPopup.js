"use client";
import { useRouter } from "next/navigation";
import React,{useState} from "react";

const SearchPopup = ({ isSearchOpen, setIsSearchOpen }) => {
  const [searchText,setSearchText] = useState('');
  const router = useRouter();
  // handle search 
  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchText) return;
    router.push(`/search?searchText=${searchText}`)
  }
  return (
    <>
      <div
        className={`tpsearchbar tp-sidebar-area ${isSearchOpen ? "tp-searchbar-opened" : ""}`}
      >
        <button
          className="tpsearchbar__close"
          onClick={() => setIsSearchOpen(false)}
        >
          <i className="icon-x"></i>
        </button>
        <div className="search-wrap text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6 pt-100 pb-100">
                <h2 className="tpsearchbar__title">
                  What Are You Looking For?
                </h2>
                <div className="tpsearchbar__form">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="search"
                      placeholder="Search Product..."
                      onChange={handleSearchText}
                    />
                    <button className="tpsearchbar__search-btn">
                      <i className="icon-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`search-body-overlay ${isSearchOpen ? "opened" : ""}`}
        onClick={() => setIsSearchOpen(false)}
      ></div>
    </>
  );
};

export default SearchPopup;
