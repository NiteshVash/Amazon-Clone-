import React from 'react';
import './Skeleton.css';

const ProductSkeleton = () => {
    return (
      <div className="product-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-rating"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    );
  };
  export default ProductSkeleton;