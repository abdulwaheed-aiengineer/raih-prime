import React from 'react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO } from '../utils/helpers';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Award,
  CreditCard,
  Heart
} from 'lucide-react';

export default function Footer({ onOpenPolicy }) {
  const { setActiveTab, setSelectedCategory, setIsOrderTrackingOpen } = useStore();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Top Value Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Free US Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Authentic Brands</h4>
              <p className="text-xs text-slate-400 mt-0.5">Directly sourced & verified</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">30-Day Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free refunds & returns</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Veteran & Quality Curated</h4>
              <p className="text-xs text-slate-400 mt-0.5">Top-rated pantry nutrition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Company Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 p-2 border border-slate-700 flex items-center justify-center">
                <img src="/logo-icon.svg" alt="Rai H Prime" className="w-full h-full" />
              </div>
              <span className="font-serif-title font-bold text-2xl text-white tracking-tight">
                RAI H PRIME <span className="text-amber-400 text-sm font-sans uppercase">LLC</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Your trusted destination for gourmet kitchen essentials, artisan roasted coffees, 
              high-protein fitness snacks, and authentic Italian sauces. Hand-inspected and dispatched 
              with care.
            </p>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">RAI H PRIME LLC</strong><br />
                  {COMPANY_INFO.address}, {COMPANY_INFO.city}, {COMPANY_INFO.state} {COMPANY_INFO.zip}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h5 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
              Categories
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => handleCategoryClick('Coffee & Beverages')} className="hover:text-amber-400 transition-colors">
                  Coffee & Beverages
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('High-Protein & Fitness')} className="hover:text-amber-400 transition-colors">
                  High-Protein & Fitness
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Pastas & Gourmet Sauces')} className="hover:text-amber-400 transition-colors">
                  Pastas & Sauces
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Pantry & Quick Meals')} className="hover:text-amber-400 transition-colors">
                  Pantry & Meals
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Seasonings & Gourmet Pantry')} className="hover:text-amber-400 transition-colors">
                  Seasonings & Spices
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Snacks & Sweet Treats')} className="hover:text-amber-400 transition-colors">
                  Snacks & Sweets
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Navigation */}
          <div>
            <h5 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors">
                  About Our Company
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => setIsOrderTrackingOpen(true)} className="hover:text-amber-400 transition-colors">
                  Track Your Shipment
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('shipping')} className="hover:text-amber-400 transition-colors">
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('returns')} className="hover:text-amber-400 transition-colors">
                  Returns & Replacements
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('privacy')} className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('terms')} className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Promo */}
          <div>
            <h5 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
              Stay In The Loop
            </h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe to receive new pantry arrivals, flash sales, and exclusive coupons.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! You are subscribed. Use coupon RAIHPRIME for 15% OFF.'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                Get 15% Off Code
              </button>
            </form>
            <div className="mt-4 pt-4 border-t border-slate-900 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Encrypted & Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} <strong>{COMPANY_INFO.legalName}</strong>. All rights reserved. 
          Registered business entity in Maryland, USA.
        </p>
        <div className="flex items-center gap-3 text-slate-400">
          <span>We accept:</span>
          <span className="px-2 py-0.5 bg-slate-900 rounded text-[10px] font-semibold text-slate-300 border border-slate-800">VISA</span>
          <span className="px-2 py-0.5 bg-slate-900 rounded text-[10px] font-semibold text-slate-300 border border-slate-800">MASTERCARD</span>
          <span className="px-2 py-0.5 bg-slate-900 rounded text-[10px] font-semibold text-slate-300 border border-slate-800">AMEX</span>
          <span className="px-2 py-0.5 bg-slate-900 rounded text-[10px] font-semibold text-slate-300 border border-slate-800">APPLE PAY</span>
        </div>
      </div>
    </footer>
  );
}
