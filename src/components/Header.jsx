import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO, formatCurrency } from '../utils/helpers';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Truck, 
  Menu, 
  X, 
  Tag, 
  ChevronRight,
  ShieldCheck,
  Package
} from 'lucide-react';

export default function Header() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    cartTotalItems,
    cartSubtotal,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsOrderTrackingOpen,
    products,
    setSelectedProductModal,
    isFreeShipping,
    freeShippingDelta
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered preview for live search dropdown
  const liveResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (product) => {
    setSelectedProductModal(product);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 sm:py-2 px-3 sm:px-4 font-medium border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Announcement: Sleek, Single Line, No Wrapping */}
          <div className="flex sm:hidden items-center justify-center w-full gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 bg-amber-500/25 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 flex-shrink-0">
              <Tag className="w-3 h-3" /> RAIHPRIME
            </span>
            <span className="truncate text-slate-200 font-medium">15% OFF + Free US Shipping over $50</span>
          </div>

          {/* Desktop Announcement */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-amber-500/30">
              <Tag className="w-3 h-3" /> CODE: RAIHPRIME
            </span>
            <span>Get 15% OFF your order + Free US Shipping over $50</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Fulfilled from Parkville, MD 21234</span>
            </span>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => setIsOrderTrackingOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none min-w-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-1.5 sm:p-2 shadow-md border border-slate-700/50 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/logo-icon.svg" alt="Rai H Prime" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-slate-900 font-serif-title whitespace-nowrap">
                  RAI H PRIME
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-slate-900 text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  LLC
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 tracking-wider font-semibold uppercase truncate">
                Gourmet Pantry & Nutrition
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-lg relative mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search 50+ coffees, sauces, protein snacks, pasta..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-900 rounded-full border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && liveResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3">
                  Matching Products ({liveResults.length})
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {liveResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="p-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.primaryImage}
                        onError={(e) => { e.target.src = product.primaryCdnImage; }}
                        alt={product.title}
                        className="w-11 h-11 object-contain rounded-lg bg-slate-50 border p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-amber-600 font-semibold">{product.brand}</p>
                        <p className="text-sm font-medium text-slate-900 truncate">{product.title}</p>
                        <span className="text-xs font-bold text-slate-800">{formatCurrency(product.price)}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
                <div 
                  onClick={() => {
                    setActiveTab('shop');
                    setIsSearchFocused(false);
                  }}
                  className="p-2.5 bg-slate-50 text-center text-xs font-semibold text-amber-700 hover:bg-amber-50 cursor-pointer transition-colors"
                >
                  View all search results in catalog &rarr;
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-amber-600 transition-colors py-1 ${activeTab === 'home' ? 'text-amber-600 font-bold border-b-2 border-amber-600' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedCategory('All');
                handleNavClick('shop');
              }}
              className={`hover:text-amber-600 transition-colors py-1 flex items-center gap-1 ${activeTab === 'shop' ? 'text-amber-600 font-bold border-b-2 border-amber-600' : ''}`}
            >
              <span>Shop All</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">51</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-amber-600 transition-colors py-1 ${activeTab === 'about' ? 'text-amber-600 font-bold border-b-2 border-amber-600' : ''}`}
            >
              About Rai H Prime
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-amber-600 transition-colors py-1 ${activeTab === 'contact' ? 'text-amber-600 font-bold border-b-2 border-amber-600' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons: Wishlist & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 sm:p-2.5 text-slate-700 hover:text-amber-600 hover:bg-slate-100 rounded-full transition-all"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 bg-slate-900 hover:bg-slate-800 text-white p-2 sm:px-4 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartTotalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-300 font-medium leading-none">Bag</span>
                <span className="text-xs font-bold text-amber-300 leading-none mt-0.5">
                  {formatCurrency(cartSubtotal)}
                </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              placeholder="Search 50+ coffees, sauces, snacks..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100/90 text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-1.5 font-medium text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2.5 px-3 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-amber-50 text-amber-700 font-bold' : 'hover:bg-slate-100'}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedCategory('All');
                handleNavClick('shop');
              }}
              className={`text-left py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${activeTab === 'shop' ? 'bg-amber-50 text-amber-700 font-bold' : 'hover:bg-slate-100'}`}
            >
              <span>Shop All Products</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">51</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2.5 px-3 rounded-xl transition-colors ${activeTab === 'about' ? 'bg-amber-50 text-amber-700 font-bold' : 'hover:bg-slate-100'}`}
            >
              About Rai H Prime
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2.5 px-3 rounded-xl transition-colors ${activeTab === 'contact' ? 'bg-amber-50 text-amber-700 font-bold' : 'hover:bg-slate-100'}`}
            >
              Contact Us & Support
            </button>
            <button
              onClick={() => {
                setIsOrderTrackingOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 text-amber-700 font-semibold flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track My Order</span>
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <p className="font-semibold text-slate-800">{COMPANY_INFO.legalName}</p>
            <p>{COMPANY_INFO.fullAddress}</p>
            <p className="mt-1 text-amber-600 font-medium">{COMPANY_INFO.phone}</p>
          </div>
        </div>
      )}
    </header>
  );
}
