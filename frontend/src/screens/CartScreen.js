import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../features/cart/cartSlice'

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartDetails = useSelector((state) => state.cart);
  // const { cart } = cartDetails;

  const params = useParams();

  useEffect(() => {
    dispatch(addToCart(params.id))
  }, [dispatch, params.id])

  return (
    <div>
        CartScreen
    </div>
  )
}

export default CartScreen