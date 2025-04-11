import React, { useState } from 'react';
import './LazyImage.css';

const LazyImage = ({ 
  src, 
  alt, 
  className,
  placeholderType = 'skeleton',
  placeholderColor = '#f3f3f3',
  fallbackSrc = '/src/assets/image-fallback.png'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => setError(true);

  const renderPlaceholder = () => {
    switch(placeholderType) {
      case 'skeleton':
        return <div className={`${className} image-placeholder skeleton`} />;
      case 'gradient':
        return (
          <div 
            className={`${className} image-placeholder`} 
            style={{ 
              background: `linear-gradient(90deg, ${placeholderColor} 25%, #e0e0e0 50%, ${placeholderColor} 75%)`,
              backgroundSize: '200% 100%'
            }} 
          />
        );
      default:
        return <div className={`${className} image-placeholder`} style={{ background: placeholderColor }} />;
    }
  };

  return (
    <>
      {(!loaded || error) && renderPlaceholder()}
      
      {!error && (
        <img
          src={error ? fallbackSrc : src}
          alt={alt}
          className={`${className} ${loaded ? 'image-loaded' : 'image-loading'}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          loading="lazy"
        />
      )}
    </>
  );
};

export default LazyImage;