import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopBanner from './components/layout/TopBanner';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NewsletterPopup from './components/layout/NewsletterPopup';
import HomePage from './pages/HomePage';
import PLPPage from './pages/PLPPage';
import PDPPage from './pages/PDPPage';
import FindStorePage from './pages/FindStorePage';
import SearchPage from './pages/SearchPage';
import ProRegisterPage from './pages/ProRegisterPage';
import ProAccountPage from './pages/ProAccountPage';
import MakeupBookingPage from './pages/MakeupBookingPage';
import GiftCardPage from './pages/GiftCardPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/mac-website">
      <ScrollToTop />
      <TopBanner />
      <Header />
      <NewsletterPopup />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<PLPPage />} />
        <Route path="/products/:id" element={<PDPPage />} />
        <Route path="/stores" element={<FindStorePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pro-register" element={<ProRegisterPage />} />
        <Route path="/pro-account" element={<ProAccountPage />} />
        <Route path="/makeup-booking" element={<MakeupBookingPage />} />
        <Route path="/gift-cards" element={<GiftCardPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
