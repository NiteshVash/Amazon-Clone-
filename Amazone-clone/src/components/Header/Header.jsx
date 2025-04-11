import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../Cart/cartcontext';
import {
  faLocationDot,
  faMagnifyingGlass,
  faCartShopping,
  faBars,
  faTrash,
  faUser,
  faChevronDown,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import amazon_logo from '../../assets/amazon_logo.png';
import './Header.css';

const Header = () => {
  const { cart, removeFromCart, setSearchTerm, updateQuantity } = useContext(CartContext);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = ['All', 'Electronics', 'Computers', 'Home', 'Books', 'Fashion'];
  const languages = ['EN', 'ES', 'FR', 'DE', 'IT'];

  // Mock search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      const mockSuggestions = [
        `${searchQuery} in ${searchCategory}`,
        `Best ${searchQuery} 2023`,
        `${searchQuery} deals`
      ];
      setSearchSuggestions(mockSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, searchCategory]);

  const getCartItemsCount = () => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const cartTotal = cart?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsPanelOpen(false);
    setIsSearchDropdownOpen(false);
  };

  return (
    <header className="amazon-header">
      <nav className="navbar">
        <div className="nav-logo border">
          <img src={amazon_logo} alt="Amazon Logo" className="logo" />
        </div>

        <div className="add-nav border">
          <p className="add-first">Deliver to</p>
          <div className="icon-bar">
            <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
            <p className="add-sec">India</p>
          </div>
        </div>

        <div className="nav-search">
          <select 
            className="search-select" 
            aria-label="Search category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="search-input-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search Amazon"
              aria-label="Search Amazon"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchTerm(e.target.value);
              }}
            />
            {searchSuggestions.length > 0 && (
              <div className="search-suggestions">
                {searchSuggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="suggestion-item"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setSearchTerm(suggestion);
                      setSearchSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button 
            className="search-icon" 
            aria-label="Search"
            onClick={() => {
              setSearchTerm(searchQuery);
              setSearchSuggestions([]);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <div className="nav-lang border">
          <FontAwesomeIcon icon={faGlobe} />
          <span>EN</span>
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        </div>

        <div className={`nav-signin border ${isAuthOpen ? 'active' : ''}`} onClick={() => setIsAuthOpen(!isAuthOpen)}>
          <div className="auth-container">
            <p><span>Hello, {isLoggedIn ? 'User' : 'sign in'}</span></p>
            <p className="nav-second">Account & Lists <FontAwesomeIcon icon={faChevronDown} size="xs" /></p>
          </div>
          
          {isAuthOpen && (
            <div className="auth-dropdown">
              {isLoggedIn ? (
                <>
                  <div className="auth-header">
                    <FontAwesomeIcon icon={faUser} />
                    <h4>Your Account</h4>
                  </div>
                  <div className="auth-links">
                    <a href="#">Account</a>
                    <a href="#">Orders</a>
                    <a href="#">Recommendations</a>
                    <a href="#">Prime</a>
                    <a href="#">Lists</a>
                    <button onClick={() => setIsLoggedIn(false)}>Sign Out</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="auth-header">
                    <h4>Welcome</h4>
                    <p>Sign in for personalized experience</p>
                  </div>
                  <button 
                    className="signin-btn"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Sign in
                  </button>
                  <div className="new-customer">
                    <span>New customer?</span>
                    <a href="#">Start here</a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="nav-orders border" onClick={() => setIsAuthOpen(false)}>
          <p><span>Returns</span></p>
          <p className="nav-second">& Orders</p>
          {isLoggedIn && (
            <div className="order-tracking">
              <div className="tracking-progress">
                <div className="progress-bar" style={{ width: '75%' }}></div>
              </div>
              <p className="tracking-text">1 order arriving tomorrow</p>
            </div>
          )}
        </div>

        <div className="nav-prime border">
          <div className="prime-container">
            <span className="prime-badge">Prime</span>
            <p className="nav-second">Try Prime</p>
          </div>
        </div>

        <div className="nav-cart border" onClick={toggleCart}>
          <div className="cart-icon-container">
            <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
            {getCartItemsCount() > 0 && (
              <span className="cart-count">{getCartItemsCount()}</span>
            )}
          </div>
          <span>Cart</span>
          
          {isCartOpen && (
            <div className="cart-dropdown">
              {cart?.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} className="cart-item-image" />
                        <div className="cart-item-details">
                          <h4>{item.title}</h4>
                          <p>${item.price} x {item.quantity}</p>
                          <div className="quantity-controls">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item.id, item.quantity - 1);
                              }}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                          className="remove-item"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <span>Subtotal ({getCartItemsCount()} items):</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-shipping">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>Delivery to India - FREE shipping on orders over $25</span>
                  </div>
                  <div className="cart-actions">
                    <button className="continue-btn">Continue with Cart</button>
                    <button className="checkout-btn">Proceed to Checkout</button>
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <p>Your Amazon Cart is empty</p>
                  <button className="shop-btn">Shop today's deals</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

     
    </header>
  );
};

export default Header;