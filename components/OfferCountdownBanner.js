'use client';
import Link from "next/link";

const OfferCountdownBanner= (props) => {
    if (!props.banner) return null;
  return (
    <section
      className={`product-coundown-area tpcoundown__bg grey-bg pb-25 mb-35`}
      style={{ backgroundImage: `url(${props.banner.image[0]?.url})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="tpcoundown p-relative ml-175">
              <div className="section__content mb-35">
                <span className="section__sub-title mb-10">
                {props.banner.subTitle}
                </span>
                <h2 className="section__title mb-25">
                {props.banner.title}
                </h2>
                <p>
                {props.banner.description}
                </p>
              </div>
              <div className="tpcoundown__count">
                <div className="tpcoundown__btn mt-50">
                  <Link className="whight-btn" href="/shop" >
                    Shop Now
                  </Link>
                  {/* <Link
                    className="whight-btn border-btn ml-15"
                    href="/shop"
                  >
                    View Menu
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default OfferCountdownBanner;
