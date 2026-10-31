import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/helpers';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProductModal } = useStore();
  const [imgSrc, setImgSrc] = useState(product.primaryImage);
  const [isAdded, setIsAdded] = useState(false);

  const isSaved = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleImageError = () => {
    if (imgSrc !== product.primaryCdnImage && product.primaryCdnImage) {
      setImgSrc(product.primaryCdnImage);
    } else {
      setImgSrc('/placeholder-product.svg');
    }
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => setSelectedProductModal(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Media Area */}
      <div className="relative aspect-square w-full bg-slate-50 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
        
        {/* Brand Tag */}
        <span className="absolute top-3 left-3 z-10 text-[11px] font-bold text-slate-700 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md shadow-xs border border-slate-200/60 max-w-[130px] truncate">
          {product.brand}
        </span>

        {/* Discount Tag */}
        {discountPercent && (
          <span className="absolute bottom-3 left-3 z-10 text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
            SAVE {discountPercent}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-transform duration-200 hover:scale-110 ${
            isSaved
              ? 'bg-rose-50 text-rose-500 border border-rose-200'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 border border-slate-200/80 backdrop-blur'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={imgSrc}
          onError={handleImageError}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 filter drop-shadow-sm"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug mb-2">
            {product.title}
          </h3>

          {/* Feature Badges */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900 font-serif-title">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              In Stock ({product.inventory})
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`p-2.5 sm:px-3 sm:py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-amber-600 text-white'
            }`}
            title="Add to Bag"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
