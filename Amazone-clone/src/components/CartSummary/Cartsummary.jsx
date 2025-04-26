import React, { useContext } from 'react';
import { CartContext } from '../Cart/Cartcontext';
import './Cartsummary.css';

const CartSummary = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    cartTotal 
  } = useContext(CartContext);

  console.log('Cart items:', cart);
  console.log('Cart total:', cartTotal);

  return (
    <div className="cart-summary">
      <h2>Your Cart ({cart.length})</h2>
      
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={`/src/assets/${item.image}`} 
                  alt={item.title} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-totals">
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items):</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping:</span>
                <span>{cartTotal > 50 ? 'FREE' : '$5.99'}</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>${(cartTotal > 50 ? cartTotal : cartTotal + 5.99).toFixed(2)}</span>
              </div>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;