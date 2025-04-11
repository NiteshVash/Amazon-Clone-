import React from 'react';
import heroImage from '../../assets/hero_image.jpg';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <div className="hero-container">
      <img src={heroImage} alt="Amazon Hero" className="hero-image" />
      <div className="hero-content">
        <h1>Welcome to Amazon Clone</h1>
        <p>Shop the latest deals and products</p>
        <button 
          className="shop-now-btn"
          onClick={handleShopNow}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;