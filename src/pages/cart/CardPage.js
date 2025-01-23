import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardHeader from "../header/cardHeader";  // Corrected import for CardHeader
import "./CardPage.css"

export const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []); // Load cart from localStorage

  console.log(cart)
  useEffect(() => {
    
    // Re-fetch cart data if needed or do additional actions
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <CardHeader />
      <div className="app-container">
        <h1 className="heading">Your Cart</h1>
        
        <div className="cart-items-container">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <h2>{item.title}</h2>
                <p>Price: ${item.amount}</p>
                <p>Quantity: {item.quantity}</p>
                <button className="remove-btn" onClick={() => handleRemoveFromCart(item._id)}>
                  Remove from Cart
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        
        <div className="cart-actions">
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
