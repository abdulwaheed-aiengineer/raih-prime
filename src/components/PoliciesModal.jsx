import React, { useState } from 'react';
import { COMPANY_INFO } from '../utils/helpers';
import { X, ShieldCheck, Truck, RefreshCw, FileText } from 'lucide-react';

export default function PoliciesModal({ initialTab = 'shipping', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!initialTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-scale">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-slate-900 text-base font-serif-title">
              Legal & Store Policies • {COMPANY_INFO.legalName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'shipping' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-500'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Shipping & Delivery</span>
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'returns' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-500'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Returns & Refunds</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'privacy' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-500'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'terms' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-500'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Policy Body */}
        <div className="p-6 sm:p-8 overflow-y-auto text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                Shipping & Fulfillment Policy
              </h3>
              <p>
                At <strong>{COMPANY_INFO.legalName}</strong>, we are committed to delivering your gourmet pantry and wellness essentials quickly, securely, and in pristine condition.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">1. Fulfillment Location</h4>
              <p>
                All orders are packaged and dispatched directly from our Parkville facility located at:
                <br />
                <span className="font-semibold text-slate-800">129 E Orange Ct, Parkville, MD 21234</span>.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">2. Processing Time</h4>
              <p>
                Orders placed before 2:00 PM EST Monday through Friday ship the same business day. Orders placed on weekends or federal holidays ship on the next business day.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">3. Shipping Rates & Delivery Times</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Standard Continental US Shipping:</strong> Free on orders $50+ ($4.99 on orders under $50). Delivery takes 3 to 5 business days via USPS Priority or UPS Ground.</li>
                <li><strong>Express 2-Day Air:</strong> $9.99 flat rate. Delivery in 2 business days.</li>
                <li><strong>Priority Overnight:</strong> $19.99 flat rate. Next business day delivery guaranteed.</li>
              </ul>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                30-Day Money-Back Guarantee & Return Policy
              </h3>
              <p>
                Your complete satisfaction is guaranteed. If you are not 100% delighted with any purchase from <strong>{COMPANY_INFO.legalName}</strong>, we are here to assist.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">1. Return Window</h4>
              <p>
                You may request a return or replacement within 30 days of receiving your package.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">2. Damaged or Defective Items</h4>
              <p>
                If an item arrives damaged in transit or defective, please take a quick photograph and contact our support team at <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-600 underline">{COMPANY_INFO.email}</a>. We will dispatch an immediate replacement or issue a full refund at no additional cost.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">3. Refund Processing</h4>
              <p>
                Approved refunds are credited back to your original payment method within 3 to 5 business days.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                Privacy Policy
              </h3>
              <p>
                This Privacy Policy explains how <strong>{COMPANY_INFO.legalName}</strong> collects, uses, and protects your personal information when you use our shopping services.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">1. Information We Collect</h4>
              <p>
                When you make a purchase, we collect necessary transaction details including your name, delivery address, email, phone number, and encrypted payment tokens. We do not store raw credit card numbers on our servers.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">2. Data Security</h4>
              <p>
                All data transmission is encrypted using industry-standard 256-bit Secure Socket Layer (SSL) technology. We never sell, rent, or lease your personal data to third parties.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-serif-title">
                Terms of Service
              </h3>
              <p>
                By accessing or placing an order with <strong>{COMPANY_INFO.legalName}</strong>, you agree to be bound by these Terms of Service.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">1. Legal Entity & Jurisdiction</h4>
              <p>
                This website is operated by {COMPANY_INFO.legalName}, located at {COMPANY_INFO.fullAddress}. Any disputes arising hereunder shall be governed by the laws of the State of Maryland, USA.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">2. Product Accuracy</h4>
              <p>
                We strive for absolute accuracy in descriptions, ingredients, and imagery. In the event of an inadvertent typographical error in pricing or product details, we reserve the right to correct the error prior to shipment.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
