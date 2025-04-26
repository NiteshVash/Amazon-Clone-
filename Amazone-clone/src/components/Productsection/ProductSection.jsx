import React, { lazy, Suspense, useMemo, useCallback } from 'react';
import './ProductSection.css';
import { useContext } from 'react';
import { CartContext } from '../Cart/Cartcontext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { products } from '../../data/products';
import Skeleton from '../Skeleton/skeleton';

// Lazy load product images
const LazyImage = lazy(() => import('../LazyImage/LazyImage'));

const renderRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="star">★</span>);
  }

  if (hasHalfStar) {
    stars.push(<span key="half" className="star">☆</span>);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="star">☆</span>);
  }

  return stars;
};

const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div key={product.id} className="product-card">
      <div className="product-image-container">
        <Suspense fallback={<Skeleton width="100%" height="200px" />}>
          <LazyImage 
            src={`/src/assets/${product.image}`} 
            alt={product.title} 
            className="product-image"
          />
        </Suspense>
        {product.isLimitedDeal && <div className="product-badge">Limited Deal</div>}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          {renderRatingStars(product.rating)}
          <span className="rating-count">({product.ratingCount || 0})</span>
        </div>
        <div className="product-price">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="product-savings">
          {product.originalPrice && (
            <span>Save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round((1 - product.price/product.originalPrice)*100)}%)</span>
          )}
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

const ProductSection = () => {
  const { addToCart, searchTerm } = useContext(CartContext);

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, [addToCart]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => 
        searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(product => ({
        ...product,
        isLimitedDeal: product.price < (product.originalPrice || product.price),
        ratingCount: product.ratingCount || Math.floor(Math.random() * 1000)
      }));
  }, [searchTerm]);

  return (
    <div className="product-section">
      <h2>Today's Deals</h2>
      <p>Shop these limited-time offers</p>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
