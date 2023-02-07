import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "../cartItem/CartItem";
import { useSelector } from "react-redux";
import { BsFillCartXFill } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosclient";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

function Cart({ onClose }) {
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.quantity * item.price));
  const cartEmpty = cart.length === 0;

  async function handleCheckout() {
    const response = await axiosClient.post("/orders", {
      products: cart,
    });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: response.data.strapiId,
    });
  }
  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose /> Close
          </div>
        </div>
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.key} cart={item} />
          ))}
        </div>
        {cartEmpty && (
          <div className="empty-cart-info">
            <div className="icon">
              <BsFillCartXFill />
            </div>
            <h4>Cart is Empty</h4>
          </div>
        )}
        {!cartEmpty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total:</h3>
              <h3 className="total-value">₹ {totalAmount}</h3>
            </div>
            <div className="checkout btn-primary" onClick={handleCheckout}>
              Checkout now
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
