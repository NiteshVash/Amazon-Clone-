import React, { createContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('amazon-clone-cart');
        if (savedCart) setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  const saveCartToLocalStorage = (cartData) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem('amazon-clone-cart', JSON.stringify(cartData));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }, 300);
  };

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
      }

      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  }, []);

  const cartTotal = useMemo(() => cart.reduce((total, item) => {
    if (!item.price || !item.quantity) {
      console.warn('Invalid cart item:', item);
      return total;
    }
    return total + (Number(item.price) * Number(item.quantity));
  }, 0), [cart]);

  const contextValue = useMemo(() => ({ 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    cartTotal,
    searchTerm,
    setSearchTerm 
  }), [cart, addToCart, removeFromCart, updateQuantity, cartTotal, searchTerm]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
