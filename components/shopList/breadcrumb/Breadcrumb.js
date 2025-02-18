import Link from "next/link";
import React from "react";

const Breadcrumb = ({ title, bgClr='' }) => {
  return (
    <div className={`breadcrumb__area ${bgClr} pt-5 pb-5`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-breadcrumb__content">
              <div className="tp-breadcrumb__list">
                <span className="tp-breadcrumb__active">
                  <Link href="/">Home{" "}</Link>
                </span>
                <span className="dvdr">/</span>
                <span>{" "}{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
