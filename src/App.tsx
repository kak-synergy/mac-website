import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopBanner from './components/layout/TopBanner';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NewsletterPopup from './components/layout/NewsletterPopup';
import CartDrawer from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import HomePage from './pages/HomePage';
import PLPPage from './pages/PLPPage';
import PDPPage from './pages/PDPPage';
import FindStorePage from './pages/FindStorePage';
import SearchPage from './pages/SearchPage';
import ProRegisterPage from './pages/ProRegisterPage';
import ProAccountPage from './pages/ProAccountPage';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountPage from './pages/AccountPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <TopBanner />
            <Header />
            <CartDrawer />
            <NewsletterPopup />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<PLPPage />} />
              <Route path="/products/:id" element={<PDPPage />} />
              <Route path="/stores" element={<FindStorePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/pro-register" element={<ProRegisterPage />} />
              <Route path="/pro-account" element={<ProAccountPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
