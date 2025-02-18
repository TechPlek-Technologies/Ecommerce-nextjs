'use client';
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useSelector } from "react-redux";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
    const [cartData, setCartData] = useState(cart);
  // const { cart_products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  useEffect(() => {
    const cart = cartData.items.reduce(
      (cartTotal, cartItem) => {
        const { price, orderQuantity,sale_price } = cartItem;
        if (typeof orderQuantity !== "undefined") {
          const itemTotal = sale_price ? sale_price * orderQuantity : price * orderQuantity;
          cartTotal.quantity += orderQuantity;
          cartTotal.total += itemTotal;
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
    setQuantity(cart.quantity);
    setTotal(cart.total);
  }, [cart]);
  
  return {
    quantity,
    total,
    setTotal,
  };
};

export default useCartInfo;
