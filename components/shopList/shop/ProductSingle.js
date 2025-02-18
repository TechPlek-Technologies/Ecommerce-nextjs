'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import { averageRating, discountPercentage, isHot } from '~/utils/utils';
import CountdownTimer from '~/components/common/countdown-timer';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { postData, stockInfo } from '~/lib/clientFunctions';
import { updateComparelist, updateWishlist } from '~/redux/cart.slice';
import { _simpleProductCart, _variableProductCart } from '~/lib/cartHandle';
// import { handleModalProduct, handleOpenModal } from "@/redux/features/utility";
// import { add_cart_product } from "@/redux/features/cart";
// import { add_to_compare } from "@/redux/features/compare";
// import { add_to_wishlist } from "@/redux/features/wishlist";

// image style
const imgStyle = {
  width: '100%',
  height: '100%'
};

const ProductSingle = ({ product, progress, cls, offer_style, price_space }) => {
  const { image, price, sale_price, title, updated_at, quantity, sold, category, offerDate, reviews } = product || {};

  let discount = 0;
  if (sale_price) {
    discount = discountPercentage(price, sale_price);
  }
  const [isItemAddToCart, setIsItemAddToCart] = useState(false);
  const [isCompareAdd, setIsCompareAdd] = useState(false);
  const [isWishlistAdd, setIsWishlistAdd] = useState(false);
  // const { cart_products } = useAppSelector((state) => state.cart);
  // const { wishlist } = useAppSelector((state) => state.wishlist);
  // const { compare_products } = useAppSelector((state) => state.compare);
  const dispatch = useAppDispatch();
  const { session } = useSelector((state) => state.localSession);
  const settings = useSelector((state) => state.settings);
  const { wishlist: wishlistState, compare: compareState } = useSelector((state) => state.cart);
  const discountInPercent = Math.round((100 - (product.discount * 100) / product.price) * 10) / 10;

  function updateWishlistCount() {
    const __data = wishlistState ? wishlistState + 1 : 1;
    dispatch(updateWishlist(__data));
  }

  // useEffect(() => {
  //   setIsItemAddToCart(cart_products.some((i) => i.id === product.id));
  //   setIsWishlistAdd(wishlist.some((i) => i.id === product.id));
  //   setIsCompareAdd(compare_products.some((i) => i.id === product.id));
  // }, [cart_products, compare_products, product.id, wishlist]);

  // const handleProductModal = (prd) => {
  //   dispatch(handleModalProduct({ product: prd }))
  //   dispatch(handleOpenModal())
  // }

  const addToWishList = async () => {
    try {
      if (!session) {
        return toast.warning('You need to login to create a Wishlist');
      }
      const data = {
        pid: product._id,
        id: session.user.id
      };
      const response = await postData(`/api/wishlist`, data);
      response.success
        ? (toast.success('Item has been added to wishlist'), updateWishlistCount())
        : response.exists
        ? toast.warning('This Item already exists on your wishlist')
        : toast.error('Something went wrong (500)');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const addToCompareList = () => {
    const pid = product._id;
    const exists = compareState.find((x) => x === pid);
    if (exists) {
      toast.warning('This Item already exists on your compare list');
    } else {
      const __data = [...compareState, product._id];
      dispatch(updateComparelist(__data));
      toast.success('Item has been added to compare list');
    }
  };

  const addItemToCart = () => {
    const qty = Number(quantityAmount.current.value);
    if (product.product.type === 'simple') {
      _simpleProductCart(qty);
    } else {
      _variableProductCart(qty);
    }
  };

  return (
    <div className={`tpproduct p-relative ${cls ? cls : ''} ${progress ? 'tpprogress__hover' : ''}`}>
      <div className="tpproduct__thumb p-relative text-center">
        <Link href={`/product/${product.slug}`}>
          <Image src={product.image[0]?.url} alt={product.name} width={217} height={217} style={imgStyle} />
        </Link>
        {image.thumbnail && (
          <Link href={`/product/${product.slug}`} className="tpproduct__thumb-img">
            <Image src={product.image[0]?.url} alt={product.name} width={217} height={217} style={imgStyle} />
          </Link>
        )}
        <div className="tpproduct__info bage">
          {product.discount < product.price && <span className="tpproduct__info-discount bage__discount">{discountInPercent}%</span>}
          {/* {isHot(updated_at) && <span className="tpproduct__info-hot bage__hot">HOT</span>} */}
        </div>
        <div className="tpproduct__shopping">
          <a className="tpproduct__shopping-wishlist pointer" onClick={addToWishList}>
            <i className={'icon-heart icons' + (isWishlistAdd ? ' active' : '')}></i>
          </a>
          <a className="tpproduct__shopping-wishlist pointer" onClick={addToCompareList}>
            <i className={'icon-layers' + (isCompareAdd ? ' active' : '')}></i>
          </a>
          <a
            className="tpproduct__shopping-cart pointer"
            href={`/product/${product.slug}`}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <i className="icon-eye"></i>
          </a>
        </div>
      </div>
      <div className="tpproduct__content">
        <span className={`tpproduct__content-weight ${offer_style ? 'mb-10' : ''}`}>
          {/* <Link href={`/shop-details/${product.id}`}>{category.parent}</Link>,
          <Link href={`/shop-details/${product.id}`}>{category.child}</Link> */}
        </span>
        <h4 className="tpproduct__title">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h4>
        <h4 className="deals-label">{`${product.unitValue} ${product.unit}`}</h4>
        <div className="tpproduct__rating mb-5">
          <Rating allowFraction size={16} initialValue={averageRating(product.review || [])} readonly={true} />
        </div>
        <div className="tpproduct__details" style={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', gap: '10px' }}>
          {/* Price Section */}
          <div className={`tpproduct__price ${offer_style ? 'tpproduct__big-price' : ''} ${price_space}`}>
            <span>₹{product.price} </span>
            {product.discount < product.price && <del>₹ {product.discount}</del>}
          </div>

          {/* Buy Now / Out of Stock Button */}
          {stockInfo(product) ? (
            <Link href={`/product/${product.slug}`} scroll={false} shallow={true} className="tp-btn-2 pointer" style={{padding:"1px 20px"}}>
              Buy Now
            </Link>
          ) : (
            <a className="tp-btn-2 pointer">Out of Stock</a>
          )}
        </div>
      </div>
      {/* <div className="tpproduct__hover-text">
        <div className="tpproduct__hover-btn d-flex justify-content-center mb-10">
          {isItemAddToCart ? (
            <Link href="/cart" className="tp-btn-2 pointer">
              View Cart
            </Link>
          ) : (
            <a
            onClick={() => addItemToCart()}
              className="tp-btn-2 pointer"
            >
              Add to Cart
            </a>
          )}
          {stockInfo(product) ? (
            <Link href={`/product/${product.slug}`} scroll={false} shallow={true} className="tp-btn-2 pointer">
              Buy Now
            </Link>
          ) : (
            <a className="tp-btn-2 pointer">Out of Stock</a>
          )}
        </div>
        <div className="tpproduct__descrip">
          <ul>
            <li>Category: Organic</li>
            <li>SubCategory: Organic</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default ProductSingle;
