import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { CartProvider } from './components/Cart/cartcontext';
import HeroSection from './components/HeroSection/HeroSection';
import ProductSection from './components/Productsection/ProductSection';
import CartSummary from './components/CartSummary/Cartsummary';
import ErrorBoundary from './components/errorboundry/ErrorBoundry';
import Footer from './components/Footer/Footer';
import './App-new.css';

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>
            <ErrorBoundary>
              <ProductSection />
            </ErrorBoundary>
          </>
        } />
        <Route path="/products" element={
          <ErrorBoundary>
            <ProductSection />
          </ErrorBoundary>
        } />
        <Route path="/cart" element={
          <ErrorBoundary>
            <CartSummary />
          </ErrorBoundary>
        } />
      </Routes>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </CartProvider>
  );
};

export default App;