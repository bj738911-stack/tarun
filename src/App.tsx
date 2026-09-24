import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './views/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { WishlistView } from './views/WishlistView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AccountView } from './views/AccountView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FAQView } from './views/FAQView';
import { ReturnsView } from './views/ReturnsView';
import { PrivacyTermsView } from './views/PrivacyTermsView';
import { BlogView } from './views/BlogView';
import { BlogPostView } from './views/BlogPostView';
import { AdminView } from './views/AdminView';

const MainAppContent: React.FC = () => {
  const { currentView } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/50 text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      <Header />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-confirmation' && <OrderConfirmationView />}
        {currentView === 'order-tracking' && <OrderTrackingView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'faq' && <FAQView />}
        {currentView === 'returns' && <ReturnsView />}
        {(currentView === 'privacy' || currentView === 'terms') && <PrivacyTermsView />}
        {currentView === 'blog' && <BlogView />}
        {currentView === 'blog-post' && <BlogPostView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <QuickViewModal />
      <SizeGuideModal />
      <CartDrawer />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
