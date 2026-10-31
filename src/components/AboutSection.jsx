import React from 'react';
import { COMPANY_INFO } from '../utils/helpers';
import { useStore } from '../context/StoreContext';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Truck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function AboutSection() {
  const { setActiveTab, setSelectedCategory } = useStore();

  return (
    <div className="bg-white py-12 lg:py-20 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Company Profile</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif-title tracking-tight">
            About Raih Prime
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Founded with a passion for exceptional quality, <strong>RAIH PRIME LLC</strong> is a premier 
            direct-to-consumer distributor of curated gourmet pantry staples, specialty roast coffees, 
            and high-performance nutrition essentials.
          </p>
        </div>

        {/* Company Registration Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Business Information
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                Dedicated to Pantry Excellence
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Operating out of our Parkville, Maryland headquarters, our dedicated team 
                meticulously inspects, packages, and ships each item to ensure that you receive 
                only authentic, fresh, and pristine grocery and wellness products.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span><strong>Headquarters:</strong> {COMPANY_INFO.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span><strong>Entity:</strong> Limited Liability Company (LLC) registered in Maryland</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span><strong>Founder & Principal:</strong> {COMPANY_INFO.founder || 'Tassawar Hussain'}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4">
              <h3 className="text-base font-bold text-amber-400">Our Quality Standards</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>100% Authentic Products:</strong> Direct relationship with top brands like Fire Department Coffee, Rao's, Legendary Foods, and Optimum Nutrition.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Climate-Controlled Storage:</strong> All pantry items, coffees, and nutrition bars are preserved in temperature-regulated facilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Fast Dispatch from Maryland:</strong> Central East Coast location enables rapid 2-3 business day delivery across the continental USA.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Curated Excellence</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We don't stock thousands of generic items. We carefully hand-select each coffee blend, 
              low-carb pasta, and protein snack for superior flavor, ingredients, and nutritional profile.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Supporting Great Causes</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We proudly champion mission-driven brands like veteran-owned Fire Department Coffee, 
              which donates a portion of all proceeds to support sick and injured first responders.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Customer-First Service</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every shipment is backed by our 30-day no-questions-asked satisfaction guarantee. 
              If you aren't completely delighted with your order, we will make it right.
            </p>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="text-center py-8">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <span>Explore The Raih Prime Catalog</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
