import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, COMPANY_INFO } from '../utils/helpers';
import { 
  CheckCircle2, 
  X, 
  Printer, 
  Package, 
  Truck, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function OrderSuccessModal() {
  const {
    completedOrder,
    setCompletedOrder,
    setActiveTab,
    setIsOrderTrackingOpen
  } = useStore();

  if (!completedOrder) return null;

  const order = completedOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleTrack = () => {
    setCompletedOrder(null);
    setIsOrderTrackingOpen(true);
  };

  const handleDone = () => {
    setCompletedOrder(null);
    setActiveTab('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale">
        
        {/* Top Celebration Banner */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center relative">
          <button
            onClick={handleDone}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">
            Payment Verified & Order Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title mt-1">
            Thank you for your order!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
            Order <strong className="text-white font-mono">{order.id}</strong> is being carefully packed at our Parkville, Maryland facility.
          </p>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Tracking Progress Timeline */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
              </span>
              <span className="text-slate-500 font-mono text-[11px]">{order.shippingMethod}</span>
            </div>

            {/* Steps Visual */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px]">
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold">
                  ✓
                </div>
                <span className="font-bold text-slate-800 block">Placed</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto font-bold animate-pulse">
                  ●
                </div>
                <span className="font-bold text-amber-800 block">Parkville Hub</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                  3
                </div>
                <span className="text-slate-400 block">Shipped</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                  4
                </div>
                <span className="text-slate-400 block">Delivered</span>
              </div>
            </div>
          </div>

          {/* Delivery Details & Order Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                Shipping Destination
              </span>
              <p className="font-bold text-slate-900">{order.customer.name}</p>
              <p className="text-slate-600">{order.customer.address}</p>
              <p className="text-slate-500 text-[11px]">{order.customer.phone}</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                Fulfillment Facility
              </span>
              <p className="font-bold text-slate-900">{COMPANY_INFO.legalName}</p>
              <p className="text-slate-600">{COMPANY_INFO.fullAddress}</p>
              <p className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">✓ Verified Merchant Hub</p>
            </div>
          </div>

          {/* Items Purchased List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Items Purchased ({order.items.length})
            </h4>
            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center gap-3">
                  <img
                    src={item.product.primaryImage}
                    onError={(e) => {
                      if (item.product.primaryCdnImage) e.target.src = item.product.primaryCdnImage;
                      else e.target.src = '/placeholder-product.svg';
                    }}
                    alt=""
                    className="w-10 h-10 object-contain rounded-lg bg-slate-50 border p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.product.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {formatCurrency(item.product.price)} &times; {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="p-4 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({order.promoCode})</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping ({order.shippingMethod})</span>
              <span>{order.shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax (MD 6%)</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200 font-serif-title">
              <span>Total Paid</span>
              <span className="text-lg text-emerald-700">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Buttons: Print & Continue */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-1/2 py-3 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Receipt</span>
            </button>

            <button
              onClick={handleDone}
              className="w-full sm:w-1/2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Back to Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
