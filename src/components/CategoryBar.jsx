import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Coffee, 
  Flame, 
  UtensilsCrossed, 
  Boxes, 
  Sparkles, 
  Cookie, 
  LayoutGrid 
} from 'lucide-react';

const CATEGORY_META = {
  'All': { icon: LayoutGrid, label: 'All Catalog' },
  'Coffee & Beverages': { icon: Coffee, label: 'Coffee & Drinks' },
  'High-Protein & Fitness': { icon: Flame, label: 'Protein & Fitness' },
  'Pastas & Gourmet Sauces': { icon: UtensilsCrossed, label: 'Pastas & Sauces' },
  'Pantry & Quick Meals': { icon: Boxes, label: 'Pantry Meals' },
  'Seasonings & Gourmet Pantry': { icon: Sparkles, label: 'Seasonings & Spices' },
  'Snacks & Sweet Treats': { icon: Cookie, label: 'Snacks & Treats' },
};

export default function CategoryBar() {
  const { allCategories, selectedCategory, setSelectedCategory, setActiveTab, products } = useStore();

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setActiveTab('shop');
  };

  return (
    <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const meta = CATEGORY_META[cat] || { icon: LayoutGrid, label: cat };
            const Icon = meta.icon;
            const count = cat === 'All' 
              ? products.length 
              : products.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{meta.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-slate-800 text-amber-300' : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
