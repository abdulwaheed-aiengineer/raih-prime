import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Search, 
  Check, 
  Grid3X3, 
  LayoutGrid 
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function ProductGrid() {
  const {
    filteredProducts,
    totalCatalogCount,
    allCategories,
    selectedCategory,
    setSelectedCategory,
    allBrands,
    selectedBrands,
    setSelectedBrands,
    allTags,
    selectedTags,
    setSelectedTags,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    onlyInStock,
    setOnlyInStock,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState(4); // 3 or 4 columns on large screens

  // Toggle Brand
  const handleToggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Toggle Tag
  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setSelectedTags([]);
    setPriceRange([0, 50]);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBrands.length > 0 ||
    selectedTags.length > 0 ||
    onlyInStock ||
    searchQuery.trim() !== '' ||
    priceRange[0] > 0 ||
    priceRange[1] < 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Catalog Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-title tracking-tight">
            {selectedCategory === 'All' ? 'All Gourmet & Pantry Essentials' : selectedCategory}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> of{' '}
            {totalCatalogCount} authentic products
          </p>
        </div>

        {/* Controls: Filter Button on Mobile, Sort By, Grid Toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200"
          >
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
          </div>

          {/* Desktop Column Toggle */}
          <div className="hidden xl:flex items-center gap-1 border border-slate-200 p-1 rounded-xl bg-slate-50">
            <button
              onClick={() => setColumns(3)}
              className={`p-1.5 rounded-lg transition-colors ${columns === 3 ? 'bg-white shadow-xs text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-1.5 rounded-lg transition-colors ${columns === 4 ? 'bg-white shadow-xs text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
          <span className="text-xs font-semibold text-slate-400">Active:</span>

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-full">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              Query: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {selectedBrands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200"
            >
              Brand: {b}
              <button onClick={() => handleToggleBrand(b)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {selectedTags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              Tag: {t}
              <button onClick={() => handleToggleTag(t)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {onlyInStock && (
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 text-xs font-semibold px-2.5 py-1 rounded-full">
              In Stock Only
              <button onClick={() => setOnlyInStock(false)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 ml-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset all
          </button>
        </div>
      )}

      {/* Main Content Area: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" /> Filter Catalog
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-slate-400 hover:text-rose-600 font-medium transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Categories
              </h4>
              <div className="space-y-1">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedCategory === cat
                        ? 'bg-amber-50 text-amber-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="text-xs font-bold text-amber-700">
                  {formatCurrency(priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="1"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$4</span>
                <span>$40</span>
              </div>
            </div>

            {/* Dietary & Lifestyle Tags */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Dietary & Features
              </h4>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                {allTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                        active
                          ? 'bg-amber-500 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Popular Brands
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {allBrands.slice(0, 15).map((brand) => {
                  const checked = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleBrand(brand)}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                      />
                      <span className="truncate">{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>In Stock Products Only</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                No matching products found
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                Try loosening your filters or search keywords to explore our 50+ pantry goods.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                columns === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-3 2xl:grid-cols-4'
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/60 backdrop-blur-xs lg:hidden animate-fadeIn">
          <div className="w-full max-w-xs bg-white h-full ml-auto flex flex-col shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-base">Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="space-y-1">
                  {allCategories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCategory(c);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left text-xs p-2 rounded-lg ${
                        selectedCategory === c ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Dietary & Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleToggleTag(t)}
                      className={`text-xs px-2.5 py-1 rounded-md ${
                        selectedTags.includes(t)
                          ? 'bg-amber-500 text-white font-bold'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="w-1/2 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
