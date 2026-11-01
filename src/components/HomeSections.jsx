import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { COMPANY_INFO, formatCurrency } from '../utils/helpers';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Coffee, 
  UtensilsCrossed, 
  Star, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export default function HomeSections() {
  const { products, setActiveTab, setSelectedCategory } = useStore();

  // Curated subsets
  const bestSellers = products.filter((p) => p.isFeatured).slice(0, 8);
  const proteinPicks = products.filter((p) => p.category === 'High-Protein & Fitness').slice(0, 4);
  const coffeePicks = products.filter((p) => p.category === 'Coffee & Beverages').slice(0, 4);
  const gourmetSauces = products.filter((p) => p.category === 'Pastas & Gourmet Sauces').slice(0, 4);

  const handleViewMore = (category = 'All') => {
    setSelectedCategory(category);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Section 1: Featured Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Handpicked by Rai H Prime</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-title">
              Top Trending & Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Customer favorites loved for premium taste, certified ingredients, and unbeatable freshness.
            </p>
          </div>

          <button
            onClick={() => handleViewMore('All')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All 51 Items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section 2: Promotional Banner Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
              Limited Time Promo
            </span>
            <h3 className="text-3xl sm:text-4xl font-black font-serif-title text-white leading-tight">
              Fuel Your Day With 15% Off Your Entire Order
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Stock up your kitchen with artisan roasts, keto pastries, zero-sugar teas, and 
              gourmet marinara. Apply voucher <strong className="text-amber-400 font-mono">RAIHPRIME</strong> at checkout.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => handleViewMore('All')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs transition-colors"
              >
                Shop Now with Code RAIHPRIME
              </button>
              <button
                onClick={() => handleViewMore('High-Protein & Fitness')}
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold text-xs border border-white/20 transition-colors"
              >
                Browse High-Protein Snacks
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: High-Protein & Fitness Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Nutrition & Clean Energy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-title">
              High-Protein Essentials
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Macro-friendly whey protein, keto pastries, plant-based shakes, and guilt-free treats.
            </p>
          </div>

          <button
            onClick={() => handleViewMore('High-Protein & Fitness')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-colors hidden sm:flex"
          >
            <span>See All ({products.filter(p => p.category === 'High-Protein & Fitness').length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {proteinPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section 4: Artisan Coffee & Beverages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full mb-2">
              <Coffee className="w-3.5 h-3.5 text-amber-600" />
              <span>Morning Fuel</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-title">
              Artisan Coffee & Craft Beverages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              From Fire Department Coffee's bold dark roasts to iced vanilla lattes and refreshing teas.
            </p>
          </div>

          <button
            onClick={() => handleViewMore('Coffee & Beverages')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-colors hidden sm:flex"
          >
            <span>See All ({products.filter(p => p.category === 'Coffee & Beverages').length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coffeePicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section 5: Brand Trust Showcase */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Featuring Iconic Gourmet & Wellness Brands
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80">
            <span className="font-serif-title text-lg sm:text-xl font-bold text-slate-700 hover:text-amber-600 transition-colors">
              Fire Dept Coffee
            </span>
            <span className="font-sans text-base sm:text-lg font-black tracking-tighter text-slate-800 hover:text-amber-600 transition-colors">
              LEGENDARY FOODS
            </span>
            <span className="font-serif-title text-lg sm:text-xl font-semibold italic text-slate-800 hover:text-amber-600 transition-colors">
              Rao's Homemade
            </span>
            <span className="font-sans text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 transition-colors">
              CARBONE
            </span>
            <span className="font-sans text-base sm:text-lg font-black text-slate-800 hover:text-amber-600 transition-colors">
              OWYN
            </span>
            <span className="font-sans text-base sm:text-lg font-extrabold text-slate-700 hover:text-amber-600 transition-colors">
              OPTIMUM NUTRITION
            </span>
          </div>
        </div>
      </section>

      {/* Section 6: Verified Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex justify-center text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif-title text-slate-900">
            Trusted by Thousands of Happy Kitchens
          </h2>
          <p className="text-xs text-slate-500">
            Real feedback from verified buyers shipped from Parkville, MD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The Skull Crushing Espresso from Fire Department Coffee is unmatched. Arrived in Maryland pristine and fresh in two days. Outstanding store!"
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Marcus T.</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Purchase
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Finding authentic Carbone Pizza Sauce and Legendary Foods protein rolls in one store has made meal prep a breeze. Super fast shipping!"
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Elena R.</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Purchase
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Customer service from Rai H Prime was top-notch when I needed to adjust my delivery address. The Rai H Prime fulfillment team runs an exemplary business."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Brian W.</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Purchase
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Warehouse Fulfillment & Company Pledge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-4 h-4" /> Parkville, Maryland Fulfillment Hub
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
              Inspected & Shipped With Integrity
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every package leaving <strong>{COMPANY_INFO.fullAddress}</strong> is temperature-monitored, 
              carefully cushioned, and sealed for optimum freshness.
            </p>
          </div>

          <button
            onClick={() => handleViewMore('All')}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-all flex-shrink-0"
          >
            Start Shopping Now
          </button>
        </div>
      </section>

    </div>
  );
}
