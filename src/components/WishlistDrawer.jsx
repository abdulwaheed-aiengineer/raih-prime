import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/helpers';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setSelectedProductModal,
    setActiveTab,
    addToast
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => addToCart(p, 1));
    wishlistProducts.forEach((p) => toggleWishlist(p));
    addToast('Moved all wishlist items to bag!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="font-bold text-slate-900 text-base font-serif-title">
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Tap the heart icon on any product to save it for later.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveTab('shop');
                }}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-3 group">
                <img
                  src={product.primaryImage}
                  onError={(e) => {
                    if (product.primaryCdnImage) e.target.src = product.primaryCdnImage;
                    else e.target.src = '/placeholder-product.svg';
                  }}
                  alt={product.title}
                  onClick={() => {
                    setSelectedProductModal(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-18 h-18 object-contain rounded-xl bg-slate-50 border p-1 cursor-pointer flex-shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-bold text-amber-600 uppercase">
                        {product.brand}
                      </span>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="text-slate-400 hover:text-rose-500 p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        setSelectedProductModal(product);
                        setIsWishlistOpen(false);
                      }}
                      className="text-xs font-bold text-slate-900 truncate cursor-pointer hover:text-amber-600"
                    >
                      {product.title}
                    </h4>

                    <span className="text-xs font-black text-slate-900 font-serif-title mt-0.5 block">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="w-full py-1.5 px-3 bg-slate-900 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Wishlist Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <button
              onClick={handleMoveAllToBag}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Move All to Bag ({wishlistProducts.length})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
