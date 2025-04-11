import { useContext } from 'react';
import { CartContext } from '../components/Cart/Cartcontext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { 
    cart, 
    addToCart: contextAddToCart, 
    removeFromCart, 
    updateQuantity,
    cartTotal,
    searchTerm,
    setSearchTerm
  } = context;

  const addToCart = (product, quantity = 1) => {
    contextAddToCart(product, quantity);
    toast.success(`${product.title} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItem = (productId) => {
    return cart.find(item => item.id === productId);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    searchTerm,
    setSearchTerm,
    getCartItemCount,
    getCartItem
  };
};
