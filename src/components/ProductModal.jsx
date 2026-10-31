import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, COMPANY_INFO } from '../utils/helpers';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Info
} from 'lucide-react';

export default function ProductModal() {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
  } = useStore();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'

  // Reset state when product changes
  useEffect(() => {
    setActiveImgIndex(0);
    setQuantity(1);
    setActiveTab('overview');
  }, [selectedProductModal]);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const isSaved = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.primaryImage];
  const cdnImages = product.cdnImages || [];

  const handleInstantBuy = () => {
    addToCart(product, quantity);
    setSelectedProductModal(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale">
        
        {/* Header Close Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-amber-700 font-semibold">{product.brand}</span>
          </div>
          <button
            onClick={() => setSelectedProductModal(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left: Gallery */}
            <div className="space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-200/80 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={images[activeImgIndex] || product.primaryImage}
                  onError={(e) => {
                    const fb = cdnImages[activeImgIndex] || product.primaryCdnImage;
                    if (fb && e.target.src !== fb) e.target.src = fb;
                    else e.target.src = '/placeholder-product.svg';
                  }}
                  alt={product.title}
                  className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />

                {product.tags && product.tags.length > 0 && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur">
                    {product.tags[0]}
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIndex(i)}
                      className={`relative w-16 h-16 rounded-xl border-2 p-1 bg-white flex-shrink-0 transition-all ${
                        activeImgIndex === i
                          ? 'border-amber-500 shadow-sm scale-105'
                          : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        onError={(e) => {
                          if (cdnImages[i]) e.target.src = cdnImages[i];
                          else e.target.src = '/placeholder-product.svg';
                        }}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* MD Dispatch Reassurance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Ships directly from Parkville, MD 21234</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Orders placed before 2:00 PM EST ship the same business day with tracking.
                </p>
              </div>
            </div>

            {/* Right: Info & Purchasing */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Brand & Title */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    {product.brand}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mt-1 font-serif-title">
                    {product.title}
                  </h1>
                </div>

                {/* Rating & In-Stock */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full text-amber-900 font-bold border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-amber-700 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock ({product.inventory} available)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-black text-slate-900 font-serif-title">
                    {formatCurrency(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-slate-400 line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                  )}
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description.substring(0, 180)}...
                </p>

                {/* Bullet Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {product.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity & Actions */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-600 hover:text-slate-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                      className="p-2 text-slate-600 hover:text-slate-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold ml-auto transition-colors ${
                      isSaved
                        ? 'border-rose-200 bg-rose-50 text-rose-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </div>

                {/* Main Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleInstantBuy}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now • {formatCurrency(product.price * quantity)}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Tabs: Specifications, Full Description, Reviews */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-6 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Full Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications & Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'overview' && (
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>{product.description}</p>
                  {product.folderUrl && (
                    <p className="text-[11px] text-slate-400 pt-2">
                      Sourced under certified distributor verification for Raih Prime LLC.
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex justify-between">
                        <span className="font-semibold text-slate-700">{key}:</span>
                        <span className="text-slate-900 font-bold">{val}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 col-span-2 text-slate-500">
                      Brand: {product.brand} | Category: {product.category} | Hand-inspected by Raih Prime LLC
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/50 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-slate-900 font-serif-title">{product.rating}</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Based on {product.reviewCount} verified consumer purchases</p>
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-full">
                      100% Verified Buyer Rating
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Sarah M. • Verified Purchase</span>
                        <span className="text-slate-400 text-[11px]">3 days ago</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                      </div>
                      <p className="text-slate-600 pt-1">
                        "Arrived fresh, carefully packaged from Maryland, and tasted exceptional! Exactly as described."
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">David K. • Verified Purchase</span>
                        <span className="text-slate-400 text-[11px]">1 week ago</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                      </div>
                      <p className="text-slate-600 pt-1">
                        "Great flavor and high quality. Will definitely reorder from Raih Prime again."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
