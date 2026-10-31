import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO, formatCurrency } from '../utils/helpers';
import { 
  X, 
  Package, 
  Search, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function OrderTrackingModal() {
  const {
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
    orders,
  } = useStore();

  const [searchId, setSearchId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOrderTrackingOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const clean = searchId.trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === clean);
    if (found) {
      setSelectedOrder(found);
    } else {
      setSelectedOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-scale">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-slate-900 text-base font-serif-title">
              Track Your Raih Prime Shipment
            </h2>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-6 bg-slate-900 text-white space-y-3">
          <p className="text-xs text-slate-300">
            Enter your order confirmation number (e.g., <strong>RHP-XXXXXX</strong>) to view real-time fulfillment status from Parkville, MD:
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. RHP-78421"
              className="flex-1 px-3.5 py-2 text-xs bg-slate-800 text-white rounded-xl border border-slate-700 outline-none uppercase font-mono font-bold placeholder-slate-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {selectedOrder ? (
            <div className="space-y-6">
              {/* Order Info Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    Active Order
                  </span>
                  <span className="font-mono font-black text-slate-900 text-base">
                    #{selectedOrder.id}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Est. Delivery: <strong className="text-slate-800">{selectedOrder.estimatedDelivery}</strong>
                  </p>
                </div>
                <span className="text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-full">
                  {selectedOrder.status}
                </span>
              </div>

              {/* Step Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Shipment Milestones
                </h4>

                <div className="space-y-4 pl-2 border-l-2 border-amber-400 ml-3">
                  <div className="relative pl-6">
                    <span className="absolute -left-[19px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[8px]">
                      ✓
                    </span>
                    <p className="text-xs font-bold text-slate-900">Order Placed & Verified</p>
                    <p className="text-[11px] text-slate-500">Payment captured via 256-bit SSL gateway</p>
                  </div>

                  <div className="relative pl-6">
                    <span className="absolute -left-[19px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white animate-pulse" />
                    <p className="text-xs font-bold text-slate-900">Fulfillment Center: Parkville, MD</p>
                    <p className="text-[11px] text-slate-500">
                      Items picked & packed at 129 E Orange Ct, Parkville, MD 21234
                    </p>
                  </div>

                  <div className="relative pl-6 opacity-60">
                    <span className="absolute -left-[19px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white" />
                    <p className="text-xs font-bold text-slate-700">Handed to Shipping Carrier</p>
                    <p className="text-[11px] text-slate-400">USPS Priority / UPS Ground tracking assignment</p>
                  </div>

                  <div className="relative pl-6 opacity-60">
                    <span className="absolute -left-[19px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white" />
                    <p className="text-xs font-bold text-slate-700">Out for Delivery</p>
                    <p className="text-[11px] text-slate-400">Arriving to your doorstep</p>
                  </div>
                </div>
              </div>

              {/* Items in Package */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Items in this Package ({selectedOrder.items.length})
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-xs py-1">
                      <span className="text-slate-800 truncate max-w-xs">
                        {item.product.title} &times; {item.quantity}
                      </span>
                      <span className="font-bold text-slate-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-8 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">No shipment found for "{searchId}"</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Please ensure you typed the order reference correctly. For support, email{' '}
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-600 underline">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <Package className="w-10 h-10 text-slate-300 mx-auto" />
              <p>You have no recent orders saved in this session.</p>
              <p className="text-[11px]">Enter your order confirmation code above to look up shipment details.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
