// src/pages/MyCart.jsx

import React from 'react';
import { useCart } from '../context/CartContext';
import './MyCart.css';

const MyCart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="cart-page-container">
      <div className="cart-items-section">
        <h2>Shopping cart</h2>
        <table className="cart-items-table">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td><button onClick={() => removeFromCart(item.id)} className="remove-item-button">×</button></td>
                <td className="product-info">
                  <img src={item.cover} alt={item.title} className="product-image" />
                  <span>{item.title}</span>
                </td>
                <td>${item.price !== 'N/A' ? Number(item.price).toFixed(2) : 'N/A'}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        updateQuantity(item.id, value);
                      }
                    }}
                    className="quantity-input"
                  />
                </td>
                <td>${item.price !== 'N/A' ? (Number(item.price) * item.quantity).toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="coupon-section">
          <input type="text" placeholder="Coupon code" className="coupon-input" />
          <button className="apply-coupon-button">Apply coupon</button>
        </div>
      </div>
      <div className="cart-totals-section">
        <h2>Cart totals</h2>
        <table className="cart-totals-table">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${isNaN(getTotalPrice()) ? 'N/A' : getTotalPrice().toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>
                <div className="shipping-options">
                  <label><input type="radio" name="shipping" /> Free shipping</label><br />
                  <label><input type="radio" name="shipping" /> Flat rate: $10.00</label><br />
                  <label><input type="radio" name="shipping" /> Pickup: Free</label><br />
                  <button className="calculate-shipping-button">Calculate shipping</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>${isNaN(getTotalPrice()) ? 'N/A' : getTotalPrice().toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button className="checkout-button">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default MyCart;
