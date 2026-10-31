import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, COMPANY_INFO } from '../utils/helpers';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    cartTotalItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    promoCode,
    discountPercent,
    discountAmount,
    subtotalAfterDiscount,
    applyPromoCode,
    removePromoCode,
    freeShippingDelta,
    isFreeShipping,
    setIsCheckoutOpen,
    setSelectedProductModal,
    setActiveTab
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleStartShopping = () => {
    setIsCartOpen(false);
    setActiveTab('shop');
  };

  const shippingCost = isFreeShipping ? 0 : 4.99;
  const estimatedTax = subtotalAfterDiscount * 0.06; // Maryland standard 6%
  const grandTotal = subtotalAfterDiscount + shippingCost + estimatedTax;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotalAfterDiscount / COMPANY_INFO.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      {/* Drawer Panel */}
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-slate-900 text-base font-serif-title">
              Your Shopping Bag ({cartTotalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-4 bg-amber-50/60 border-b border-amber-100 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-600" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-bold">You unlocked FREE Standard Shipping!</span>
              ) : (
                <span>Add {formatCurrency(freeShippingDelta)} more for <strong>FREE Shipping</strong></span>
              )}
            </span>
            <span className="font-bold text-amber-700">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Your bag is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Looks like you haven't added any artisan pantry essentials or protein snacks yet.
                </p>
              </div>
              <button
                onClick={handleStartShopping}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Browse 50+ Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-3 group">
                {/* Item Thumbnail */}
                <img
                  src={item.product.primaryImage}
                  onError={(e) => {
                    if (item.product.primaryCdnImage) e.target.src = item.product.primaryCdnImage;
                    else e.target.src = '/placeholder-product.svg';
                  }}
                  alt={item.product.title}
                  onClick={() => {
                    setSelectedProductModal(item.product);
                    setIsCartOpen(false);
                  }}
                  className="w-18 h-18 object-contain rounded-xl bg-slate-50 border p-1 cursor-pointer flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold text-amber-600 uppercase">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        setSelectedProductModal(item.product);
                        setIsCartOpen(false);
                      }}
                      className="text-xs font-bold text-slate-900 truncate cursor-pointer hover:text-amber-600"
                    >
                      {item.product.title}
                    </h4>

                    <span className="text-xs font-bold text-slate-800">
                      {formatCurrency(item.product.price)} each
                    </span>
                  </div>

                  {/* Quantity Changer & Line Total */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 px-2 text-slate-500 hover:text-slate-900 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2 text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 px-2 text-slate-500 hover:text-slate-900 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-slate-900 font-serif-title">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Financial Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon "{promoCode}" applied ({discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 hover:text-emerald-900 font-bold underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. RAIHPRIME)"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <strong className="text-emerald-600 uppercase font-bold">FREE</strong>
                  ) : (
                    formatCurrency(shippingCost)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Estimated Sales Tax (6% MD)</span>
                <span>{formatCurrency(estimatedTax)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200 font-serif-title">
                <span>Estimated Total</span>
                <span className="text-xl text-amber-700">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Guaranteed safe & secure 256-bit SSL checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
