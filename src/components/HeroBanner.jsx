import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowRight, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Star, 
  Coffee, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';

export default function HeroBanner() {
  const { setActiveTab, setSelectedCategory, setSelectedProductModal, products } = useStore();

  const heroFeaturedProduct = products[0]; // Skull Crushing Espresso or first product

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct From Raih Prime LLC • Parkville, Maryland</span>
            </div>

            <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Curated Gourmet Pantry & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                High-Performance
              </span> Nutrition.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Elevate your daily routine with artisan-roasted coffees, zero-sugar beverages, 
              chef-crafted marinara sauces, and high-protein pastries. Handpicked for premium quality 
              and dispatched nationwide with care.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveTab('shop');
                }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group transition-all text-sm tracking-wide"
              >
                <span>Explore All 50+ Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('High-Protein & Fitness');
                  setActiveTab('shop');
                }}
                className="w-full sm:w-auto px-6 py-4 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2 transition-all text-sm"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Protein & Fitness Collection</span>
              </button>
            </div>

            {/* Quick Micro-Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>51 Verified Items</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Free Ship $50+</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Maryland Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>4.8/5 Customer Star</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Hero Product Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
              
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Featured Product
                </span>
                <span className="text-xs text-slate-400">
                  {heroFeaturedProduct?.brand}
                </span>
              </div>

              {/* Product Image Stage */}
              <div 
                onClick={() => heroFeaturedProduct && setSelectedProductModal(heroFeaturedProduct)}
                className="relative bg-slate-950/60 rounded-2xl p-6 flex items-center justify-center cursor-pointer group overflow-hidden border border-slate-800"
              >
                <img
                  src={heroFeaturedProduct?.primaryImage}
                  onError={(e) => { e.target.src = heroFeaturedProduct?.primaryCdnImage; }}
                  alt={heroFeaturedProduct?.title}
                  className="w-56 h-56 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[11px] px-2.5 py-1 rounded-lg backdrop-blur border border-slate-700">
                  Click to inspect &rarr;
                </span>
              </div>

              {/* Product Info & Quick Buy */}
              <div className="mt-5 space-y-3">
                <h3 className="font-bold text-lg text-white truncate">
                  {heroFeaturedProduct?.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {heroFeaturedProduct?.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-2xl font-black text-amber-400 font-serif-title">
                      ${heroFeaturedProduct?.price}
                    </span>
                    <span className="text-xs text-slate-500 line-through ml-2">
                      ${heroFeaturedProduct?.compareAtPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => heroFeaturedProduct && setSelectedProductModal(heroFeaturedProduct)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
