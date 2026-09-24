import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Search,
  Grid3X3,
  LayoutGrid,
  Filter
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ShirtCategory, GenerationStyle, ShirtSize, ShirtFit } from '../types';

export const ShopView: React.FC = () => {
  const {
    products,
    currentCategoryFilter,
    setCurrentCategoryFilter,
    currentGenerationFilter,
    setCurrentGenerationFilter,
    searchQuery,
    setSearchQuery,
    navigateTo
  } = useStore();

  // Local Filter States
  const [selectedSize, setSelectedSize] = useState<ShirtSize | 'all'>('all');
  const [selectedFit, setSelectedFit] = useState<ShirtFit | 'all'>('all');
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [priceBracket, setPriceBracket] = useState<'all' | '700to799' | '800to899' | '900to1000'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category
      if (currentCategoryFilter !== 'all') {
        if (currentCategoryFilter === 'new-arrivals') {
          if (!item.isNewArrival) return false;
        } else if (currentCategoryFilter === 'offers') {
          if (item.discountPercentage < 25) return false;
        } else if (item.category !== currentCategoryFilter) {
          return false;
        }
      }

      // Generation
      if (currentGenerationFilter !== 'all' && item.generation !== currentGenerationFilter) {
        return false;
      }

      // Size
      if (selectedSize !== 'all' && !item.sizes.includes(selectedSize)) {
        return false;
      }

      // Fit
      if (selectedFit !== 'all' && item.fit !== selectedFit) {
        return false;
      }

      // Pattern
      if (selectedPattern !== 'all' && item.pattern !== selectedPattern) {
        return false;
      }

      // Price (Catalog range ₹700 - ₹1,000)
      if (priceBracket === '700to799' && (item.price < 700 || item.price > 799)) return false;
      if (priceBracket === '800to899' && (item.price < 800 || item.price > 899)) return false;
      if (priceBracket === '900to1000' && (item.price < 900 || item.price > 1000)) return false;

      // In Stock
      if (inStockOnly && !item.inStock) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.fabric.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products,
    currentCategoryFilter,
    currentGenerationFilter,
    selectedSize,
    selectedFit,
    selectedPattern,
    priceBracket,
    inStockOnly,
    searchQuery,
    sortBy
  ]);

  const resetAllFilters = () => {
    setCurrentCategoryFilter('all');
    setCurrentGenerationFilter('all');
    setSelectedSize('all');
    setSelectedFit('all');
    setSelectedPattern('all');
    setPriceBracket('all');
    setInStockOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    currentCategoryFilter !== 'all' ||
    currentGenerationFilter !== 'all' ||
    selectedSize !== 'all' ||
    selectedFit !== 'all' ||
    selectedPattern !== 'all' ||
    priceBracket !== 'all' ||
    inStockOnly ||
    searchQuery.trim() !== '';

  const categoriesList: { label: string; value: ShirtCategory | 'all' }[] = [
    { label: 'All Shirts', value: 'all' },
    { label: 'Casual Shirts', value: 'casual' },
    { label: 'Formal Shirts', value: 'formal' },
    { label: 'Printed Shirts', value: 'printed' },
    { label: 'Checked Shirts', value: 'checked' },
    { label: 'Denim Shirts', value: 'denim' },
    { label: 'Linen Shirts', value: 'linen' },
    { label: 'Basic Shirts', value: 'basic' },
    { label: 'New Arrivals', value: 'new-arrivals' },
    { label: 'Sale & Offers', value: 'offers' },
  ];

  const generationsList: { label: string; value: GenerationStyle | 'all'; desc: string }[] = [
    { label: 'All Ages', value: 'all', desc: 'Universal catalog' },
    { label: 'Young & Stylish', value: 'young-stylish', desc: '18–30 | Bold, relaxed, party' },
    { label: 'Smart & Modern', value: 'smart-modern', desc: '30–45 | Executive & versatile' },
    { label: 'Classic & Comfortable', value: 'classic-comfortable', desc: '45+ | Timeless & breathable' },
    { label: 'Basic & Essential', value: 'basic-essential', desc: 'Universal daily staples' },
  ];

  return (
    <div id="shop-catalog-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Header Banner & Title */}
      <div className="mb-8 pb-6 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <span className="cursor-pointer hover:underline" onClick={() => navigateTo('home')}>Home</span>
              <span>/</span>
              <span className="font-semibold text-neutral-900 capitalize">
                {currentCategoryFilter === 'all' ? 'All Shirts' : `${currentCategoryFilter} Shirts`}
              </span>
              {currentGenerationFilter !== 'all' && (
                <>
                  <span>/</span>
                  <span className="text-amber-700 capitalize">
                    {currentGenerationFilter.replace('-', ' & ')}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display capitalize">
              {currentCategoryFilter === 'all'
                ? 'The Complete Men’s Shirt Collection'
                : `${currentCategoryFilter} Shirts`}
            </h1>
            <p className="text-xs text-neutral-500 mt-1 max-w-xl">
              Engineered with Egyptian long-staple cotton, French linen, and tailored fits for every generation of men.
            </p>
          </div>

          {/* Search bar inside shop */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fabric, fit, pattern..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Active Filters:
            </span>

            {currentCategoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 text-xs text-neutral-800 font-medium">
                Category: <strong className="capitalize">{currentCategoryFilter}</strong>
                <button onClick={() => setCurrentCategoryFilter('all')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {currentGenerationFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 text-xs text-neutral-800 font-medium">
                Gen: <strong className="capitalize">{currentGenerationFilter.replace('-', ' ')}</strong>
                <button onClick={() => setCurrentGenerationFilter('all')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSize !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 text-xs text-neutral-800 font-medium">
                Size: <strong>{selectedSize}</strong>
                <button onClick={() => setSelectedSize('all')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedFit !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 text-xs text-neutral-800 font-medium">
                Fit: <strong>{selectedFit}</strong>
                <button onClick={() => setSelectedFit('all')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priceBracket !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 text-xs text-neutral-800 font-medium">
                Price: <strong>{priceBracket === '700to799' ? '₹700 - ₹799' : priceBracket === '800to899' ? '₹800 - ₹899' : '₹900 - ₹1,000'}</strong>
                <button onClick={() => setPriceBracket('all')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 text-xs text-neutral-800 font-medium">
                Query: <strong>"{searchQuery}"</strong>
                <button onClick={() => setSearchQuery('')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs text-red-600 hover:text-red-700 font-semibold underline ml-2 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* 2. Controls Bar: Sort, View Count, Grid Switch */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden px-3.5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
          <span className="text-xs text-neutral-500 font-medium">
            Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> styles
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Grid view switcher for desktop */}
          <div className="hidden sm:flex items-center border border-neutral-200 rounded-lg p-1 bg-white">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded cursor-pointer ${
                gridCols === 3 ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-400'
              }`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded cursor-pointer ${
                gridCols === 4 ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-400'
              }`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-950 cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Body: Filters Sidebar + Products Grid */}
      <div className="flex gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6 sticky top-28">
          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Categories
            </h3>
            <div className="space-y-1 text-xs">
              {categoriesList.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCurrentCategoryFilter(cat.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    currentCategoryFilter === cat.value
                      ? 'bg-neutral-950 text-white font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generation & Life Stage */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Target Generation
            </h3>
            <div className="space-y-1.5 text-xs">
              {generationsList.map((gen) => (
                <button
                  key={gen.value}
                  onClick={() => setCurrentGenerationFilter(gen.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    currentGenerationFilter === gen.value
                      ? 'bg-neutral-950 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{gen.label}</span>
                  </div>
                  <span className={`text-[10px] block ${currentGenerationFilter === gen.value ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {gen.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Size
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-9 h-8 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-white'
                  }`}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>
          </div>

          {/* Fit Silhouette */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Silhouette & Fit
            </h3>
            <div className="space-y-1 text-xs">
              {(['all', 'Slim Fit', 'Regular Fit', 'Relaxed Fit', 'Tailored Fit'] as const).map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit)}
                  className={`w-full text-left px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedFit === fit
                      ? 'text-neutral-950 font-bold bg-neutral-100'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {fit === 'all' ? 'All Fits' : fit}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Price Range (₹700 - ₹1,000)
            </h3>
            <div className="space-y-1.5 text-xs text-neutral-700">
              {[
                { label: 'All Prices (₹700 - ₹1,000)', value: 'all' },
                { label: '₹700 to ₹799 (Value Everyday)', value: '700to799' },
                { label: '₹800 to ₹899 (Smart Casuals)', value: '800to899' },
                { label: '₹900 to ₹1,000 (Premium & Linen)', value: '900to1000' },
              ].map((p) => (
                <label key={p.value} className="flex items-center gap-2 cursor-pointer hover:text-neutral-950">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceBracket === p.value}
                    onChange={() => setPriceBracket(p.value as any)}
                    className="accent-neutral-950"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In Stock toggle */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-900">In Stock Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-neutral-950 rounded w-4 h-4 cursor-pointer"
            />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center my-6">
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto mb-4">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-950">No shirts match your criteria</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto mb-6">
                Try widening your price range, selecting "All Fits", or searching for another term.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950">Filter Catalog</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">Category</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setCurrentCategoryFilter(cat.value);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs text-left ${
                      currentCategoryFilter === cat.value
                        ? 'bg-neutral-950 text-white font-bold'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">Generation</h4>
              <div className="space-y-1">
                {generationsList.map((gen) => (
                  <button
                    key={gen.value}
                    onClick={() => {
                      setCurrentGenerationFilter(gen.value);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs ${
                      currentGenerationFilter === gen.value
                        ? 'bg-neutral-950 text-white font-bold'
                        : 'bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    {gen.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">Price Range</h4>
              <div className="space-y-1">
                {[
                  { label: 'All Prices (₹700 - ₹1,000)', value: 'all' },
                  { label: '₹700 to ₹799 (Value Everyday)', value: '700to799' },
                  { label: '₹800 to ₹899 (Smart Casuals)', value: '800to899' },
                  { label: '₹900 to ₹1,000 (Premium & Linen)', value: '900to1000' },
                ].map((p) => (
                  <button
                    key={p.value}
                    onClick={() => {
                      setPriceBracket(p.value as any);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs ${
                      priceBracket === p.value
                        ? 'bg-neutral-950 text-white font-bold'
                        : 'bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
