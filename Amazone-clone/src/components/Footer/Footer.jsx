import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="amazon-footer">
      <div className="footer-back-to-top" onClick={scrollToTop}>
        Back to top
      </div>
      
      <div className="footer-content">
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press">Press Releases</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Make Money with Us</h3>
          <ul>
            <li><Link to="/sell">Sell products</Link></li>
            <li><Link to="/affiliate">Become an Affiliate</Link></li>
            <li><Link to="/advertise">Advertise Your Products</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Payment Products</h3>
          <ul>
            <li><Link to="/business">Amazon Business Card</Link></li>
            <li><Link to="/shop">Shop with Points</Link></li>
            <li><Link to="/reload">Reload Your Balance</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Let Us Help You</h3>
          <ul>
            <li><Link to="/covid">COVID-19 and Amazon</Link></li>
            <li><Link to="/account">Your Account</Link></li>
            <li><Link to="/shipping">Shipping Rates & Policies</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-locale">
        <select>
          <option value="en">English</option>
          <option value="es">Hindi</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <Link to="/">Amazon Clone By Nitesh Kumar</Link>
        </div>
        <div className="footer-copyright">
          &copy; 2023-{new Date().getFullYear()}, Amazon Clone, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default Footer;
