import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import CategoryBar from './components/CategoryBar';
import ProductGrid from './components/ProductGrid';
import HomeSections from './components/HomeSections';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import PoliciesModal from './components/PoliciesModal';
import ToastContainer from './components/ToastContainer';
import { Home, Store, Heart, ShoppingBag } from 'lucide-react';

function MainApp() {
  const {
    activeTab,
    setActiveTab,
    cartTotalItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
  } = useStore();

  const [activePolicyModal, setActivePolicyModal] = useState(null); // 'shipping' | 'returns' | 'privacy' | 'terms' | null

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 pb-16 lg:pb-0">
      {/* Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroBanner />
            <CategoryBar />
            <HomeSections />
          </>
        )}

        {activeTab === 'shop' && (
          <>
            <CategoryBar />
            <ProductGrid />
          </>
        )}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer onOpenPolicy={(tab) => setActivePolicyModal(tab)} />

      {/* Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
      {activePolicyModal && (
        <PoliciesModal
          initialTab={activePolicyModal}
          onClose={() => setActivePolicyModal(null)}
        />
      )}

      {/* Notifications */}
      <ToastContainer />

      {/* Mobile Bottom Thumb Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2.5 flex items-center justify-between shadow-lg">
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'home' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'shop' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <Store className="w-5 h-5" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-amber-600 transition-colors relative"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span>Saved</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-amber-600 transition-colors relative"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartTotalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartTotalItems}
            </span>
          )}
          <span>Bag</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
