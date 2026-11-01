import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, COMPANY_INFO } from '../utils/helpers';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Check, 
  ArrowRight, 
  Lock, 
  User, 
  MapPin, 
  Mail, 
  Phone,
  Building,
  Sparkles
} from 'lucide-react';

const US_STATES = [
  'MD', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 
  'KY', 'LA', 'ME', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 
  'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    subtotalAfterDiscount,
    isFreeShipping,
    placeOrder,
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Method & Payment
  const [shippingMethod, setShippingMethod] = useState(isFreeShipping ? 'standard-free' : 'standard-paid');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple-pay' | 'cod'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'MD',
    zip: '',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '849',
    cardName: '',
  });

  const handleFillDemo = () => {
    setFormData({
      firstName: 'Sarah',
      lastName: 'Miller',
      email: 'sarah.miller@example.com',
      phone: '(410) 555-0199',
      street: '129 E Orange Ct',
      city: 'Parkville',
      state: 'MD',
      zip: '21234',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '12/28',
      cardCvc: '849',
      cardName: 'Sarah Miller',
    });
  };

  if (!isCheckoutOpen) return null;

  // Determine shipping cost
  let shippingCost = 0;
  let shippingMethodTitle = 'Standard Continental US Shipping';
  if (shippingMethod === 'standard-paid') {
    shippingCost = 4.99;
    shippingMethodTitle = 'Standard US Shipping (3-5 days)';
  } else if (shippingMethod === 'standard-free') {
    shippingCost = 0;
    shippingMethodTitle = 'Standard Free Shipping (3-5 days)';
  } else if (shippingMethod === 'express') {
    shippingCost = 9.99;
    shippingMethodTitle = 'Express 2-Day Air (Fast Dispatch)';
  } else if (shippingMethod === 'overnight') {
    shippingCost = 19.99;
    shippingMethodTitle = 'Priority Overnight Guaranteed';
  }

  const tax = subtotalAfterDiscount * 0.06;
  const grandTotal = subtotalAfterDiscount + shippingCost + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`,
        },
        shippingCost,
        shippingMethod: shippingMethodTitle,
        tax,
        total: grandTotal,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-scale">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 p-1.5 flex items-center justify-center">
              <img src="/logo-icon.svg" alt="Rai H Prime" className="w-full h-full" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base sm:text-lg font-serif-title">
                Secure Express Checkout
              </h2>
              <p className="text-[11px] text-slate-500">
                Dispatched directly from RAI H PRIME LLC • Parkville, MD
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left Form + Right Summary */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 cols: Checkout Steps */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Stepper Header */}
              <div className="flex items-center gap-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                    step === 1 ? 'border-amber-600 text-amber-600' : 'border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center">
                    1
                  </span>
                  <span>Shipping Address</span>
                </button>

                <span className="text-slate-300">&rarr;</span>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                    step === 2 ? 'border-amber-600 text-amber-600' : 'border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center">
                    2
                  </span>
                  <span>Shipping Method & Payment</span>
                </button>
              </div>

              {/* Step 1: Contact & Shipping Address */}
              {step === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.street.trim() || !formData.city.trim() || !formData.zip.trim()) {
                      alert('Please complete all required shipping address fields.');
                      return;
                    }
                    setStep(2);
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>Customer & Delivery Details</span>
                    </h3>
                    <button
                      type="button"
                      onClick={handleFillDemo}
                      className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                      title="Quickly fill sample address for testing"
                    >
                      Fill Sample Address
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Jane"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Smith"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email for Tracking *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. customer@example.com"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. (410) 555-0199"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 129 E Orange Ct"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Parkville"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                      >
                        {US_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Zip Code *</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 21234"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-4"
                  >
                    <span>Continue to Shipping & Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Step 2: Shipping Method & Payment */}
              {step === 2 && (
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  
                  {/* Shipping Options */}
                  <div className="space-y-2.5">
                    <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span>Select Shipping Speed</span>
                    </h4>

                    {isFreeShipping ? (
                      <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        shippingMethod === 'standard-free' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:bg-slate-50'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === 'standard-free'}
                            onChange={() => setShippingMethod('standard-free')}
                            className="accent-amber-600"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">Free Standard Shipping</span>
                            <span className="text-slate-500 text-[11px]">3-5 Business Days • Tracking Included</span>
                          </div>
                        </div>
                        <span className="font-bold text-emerald-600 uppercase">FREE</span>
                      </label>
                    ) : (
                      <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        shippingMethod === 'standard-paid' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:bg-slate-50'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === 'standard-paid'}
                            onChange={() => setShippingMethod('standard-paid')}
                            className="accent-amber-600"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">Standard Ground Shipping</span>
                            <span className="text-slate-500 text-[11px]">3-5 Business Days</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">$4.99</span>
                      </label>
                    )}

                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                      shippingMethod === 'express' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-amber-600"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">Express 2-Day Air</span>
                          <span className="text-slate-500 text-[11px]">Dispatched Priority from MD</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">$9.99</span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                      shippingMethod === 'overnight' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'overnight'}
                          onChange={() => setShippingMethod('overnight')}
                          className="accent-amber-600"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">Priority Overnight</span>
                          <span className="text-slate-500 text-[11px]">Next business day guaranteed</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">$19.99</span>
                    </label>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-amber-600" />
                      <span>Payment Method</span>
                    </h4>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          paymentMethod === 'card' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple-pay')}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          paymentMethod === 'apple-pay' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Apple / Google Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          paymentMethod === 'cod' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Invoice / Pickup
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName || (formData.firstName ? `${formData.firstName} ${formData.lastName}`.trim() : '')}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Jane Smith"
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Expiration</label>
                            <input
                              type="text"
                              name="cardExp"
                              value={formData.cardExp}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">CVC Code</label>
                            <input
                              type="text"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'apple-pay' && (
                      <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-2">
                        <p className="text-sm font-bold">One-Touch Device Express</p>
                        <p className="text-xs text-slate-400">
                          Clicking "Place Order" will authenticate using Apple Pay or Google Pay token.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                        <p className="font-bold">Maryland Local Pick-up / Commercial Invoice</p>
                        <p className="text-[11px]">
                          Invoice terms payable upon pickup at 129 E Orange Ct, Parkville, MD 21234 or NET-15 terms for verified trade accounts.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span>Authorizing & Placing Order...</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Place Order • {formatCurrency(grandTotal)}</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Right 5 cols: Order Summary Box */}
            <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 self-start">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                Order Items ({cart.length})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-2 flex items-center gap-3">
                    <img
                      src={item.product.primaryImage}
                      onError={(e) => {
                        if (item.product.primaryCdnImage) e.target.src = item.product.primaryCdnImage;
                        else e.target.src = '/placeholder-product.svg';
                      }}
                      alt=""
                      className="w-12 h-12 object-contain bg-white rounded-lg border p-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.product.title}</p>
                      <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Sales Tax (MD 6%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200 font-serif-title">
                  <span>Total</span>
                  <span className="text-xl text-amber-700">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>30-Day Money-Back Satisfaction Guarantee</span>
                </p>
                <p>Delivered by USPS Priority or UPS Ground from Parkville, Maryland.</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
