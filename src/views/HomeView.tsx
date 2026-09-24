import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Heart,
  ChevronRight,
  Truck,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ShirtCategory, GenerationStyle } from '../types';

export const HomeView: React.FC = () => {
  const { products, navigateTo, bannerSettings, blogs } = useStore();

  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  const styleCategories: {
    name: string;
    cat: ShirtCategory;
    desc: string;
    image: string;
    count: string;
  }[] = [
    {
      name: 'Casual Shirts',
      cat: 'casual',
      desc: 'Washed Oxford & Cuban cuts for off-duty days and weekend getaways.',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80',
      count: '14 Styles'
    },
    {
      name: 'Formal Shirts',
      cat: 'formal',
      desc: '100s Egyptian two-ply cotton for executive presence and black-tie galas.',
      image: 'https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=700&q=80',
      count: '18 Styles'
    },
    {
      name: 'Printed Shirts',
      cat: 'printed',
      desc: 'Japanese botanicals, geo-prints, and resort camp collars.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
      count: '12 Styles'
    },
    {
      name: 'Checked Shirts',
      cat: 'checked',
      desc: 'Heavyweight brushed flannel and crisp tattersall poplins.',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80',
      count: '16 Styles'
    },
    {
      name: 'Denim Shirts',
      cat: 'denim',
      desc: 'Selvedge vintage Western yokes, rinsed denim, and breathable chambray.',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80',
      count: '9 Styles'
    },
    {
      name: 'Linen Shirts',
      cat: 'linen',
      desc: 'Pure Normandy flax linen pre-washed for effortless Mediterranean comfort.',
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80',
      count: '11 Styles'
    },
    {
      name: 'Basic Shirts',
      cat: 'basic',
      desc: '100% American Supima cotton essentials engineered for daily wear.',
      image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=700&q=80',
      count: '15 Styles'
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section
        id="homepage-hero-section"
        className="relative bg-neutral-900 text-white min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden"
      >
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerSettings.heroImage}
            alt="ATTRXNWEAR Men's Shirts"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bannerSettings.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-display text-white">
              {bannerSettings.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal max-w-xl">
              {bannerSettings.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-shop-shirts-btn"
                onClick={() => navigateTo('shop', { category: 'all' })}
                className="px-8 py-4 bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Shop Shirts</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-collection-btn"
                onClick={() => navigateTo('shop', { category: 'new-arrivals' })}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg text-xs text-neutral-400">
              <div>
                <p className="text-lg font-bold text-white font-display">100%</p>
                <p className="text-[11px] mt-0.5">Combed Egyptian & Supima Yarns</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white font-display">S to XXL</p>
                <p className="text-[11px] mt-0.5">Custom Tailored Silhouettes</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white font-display">15-Day</p>
                <p className="text-[11px] mt-0.5">Guaranteed Free Fit Exchange</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY STYLE */}
      <section id="shop-by-style-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Curated Profiles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
              Shop by Style
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="text-xs font-bold text-neutral-900 hover:text-neutral-600 flex items-center gap-1 mt-2 md:mt-0 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {styleCategories.map((cat) => (
            <div
              key={cat.cat}
              onClick={() => navigateTo('shop', { category: cat.cat })}
              className="group relative bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur text-[11px] font-semibold text-neutral-900 rounded-md shadow-sm">
                  {cat.count}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-950 group-hover:text-neutral-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-950 group-hover:text-neutral-600">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING NOW */}
      <section id="trending-now-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                High Demand Right Now
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
              Trending Now
            </h2>
          </div>
          <button
            id="view-all-trending-btn"
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="text-xs font-bold text-neutral-900 hover:text-neutral-600 flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>Explore All Trending</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. SHIRTS FOR EVERY GENERATION */}
      <section
        id="shirts-for-every-generation-section"
        className="bg-neutral-100 py-16 sm:py-20 border-y border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Inclusive Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
              Shirts for Every Generation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Tailored aesthetics thoughtfully developed for men across each phase of lifestyle, career, and personal expression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Generation 1: Young & Stylish */}
            <div
              onClick={() => navigateTo('shop', { generation: 'young-stylish' })}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
                    alt="Young & Stylish"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="inline-block px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded uppercase tracking-wider mb-2">
                  Age 18 – 30
                </div>
                <h3 className="text-lg font-bold text-neutral-950 group-hover:text-neutral-700">
                  Young & Stylish
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Modern relaxed designs, statement prints, washed vintage denim, and camp-collar silhouettes made for nightlife, travel, and bold personal expression.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900">
                <span>View 18–30 Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Generation 2: Smart & Modern */}
            <div
              onClick={() => navigateTo('shop', { generation: 'smart-modern' })}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=600&q=80"
                    alt="Smart & Modern"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="inline-block px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded uppercase tracking-wider mb-2">
                  Age 30 – 45
                </div>
                <h3 className="text-lg font-bold text-neutral-950 group-hover:text-neutral-700">
                  Smart & Modern
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Tailored versatility designed for corporate leadership, client dinners, and weekend social engagements. Egyptian cotton and crisp poplin weaves.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900">
                <span>View 30–45 Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Generation 3: Classic & Comfortable */}
            <div
              onClick={() => navigateTo('shop', { generation: 'classic-comfortable' })}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
                    alt="Classic & Comfortable"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="inline-block px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded uppercase tracking-wider mb-2">
                  Age 45+
                </div>
                <h3 className="text-lg font-bold text-neutral-950 group-hover:text-neutral-700">
                  Classic & Comfortable
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Traditional regular cuts featuring breathable dobby fabrics, double-brushed flannel checks, and roomier chest and shoulder proportions for effortless daily dignity.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900">
                <span>View 45+ Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Generation 4: Basic & Essential */}
            <div
              onClick={() => navigateTo('shop', { generation: 'basic-essential' })}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=600&q=80"
                    alt="Basic & Essential"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="inline-block px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded uppercase tracking-wider mb-2">
                  Universal
                </div>
                <h3 className="text-lg font-bold text-neutral-950 group-hover:text-neutral-700">
                  Basic & Essential
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Everyday foundational pieces crafted from 100% Pima and Supima cottons in timeless solids: crisp white, pitch black, navy, and heather grey.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900">
                <span>View Essentials</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section id="new-arrivals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Fresh Off the Loom
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
              New Arrivals
            </h2>
          </div>
          <button
            id="view-all-new-arrivals-btn"
            onClick={() => navigateTo('shop', { category: 'new-arrivals' })}
            className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer mt-3 sm:mt-0 flex items-center gap-1.5 shadow-sm"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED EDITORIAL COLLECTION */}
      <section id="featured-collection-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Limited Edition Series
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              The French Linen & Selvedge Western Capsule
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Meticulously harvested flax from Normandy combined with Japanese-woven 7.5 oz denim with vintage pearl snap buttons. Crafted for the man who refuses to compromise between comfort and distinction.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('shop', { category: 'linen' })}
                className="px-6 py-3 bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Shop Pure Linen
              </button>
              <button
                onClick={() => navigateTo('shop', { category: 'denim' })}
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer border border-neutral-700"
              >
                Shop Selvedge Denim
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80"
                alt="Linen Shirt"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-800 mt-6">
              <img
                src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80"
                alt="Denim Shirt"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY ATTRXNWEAR? */}
      <section id="why-attrxnwear-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Our Tailoring Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
            Why ATTRXNWEAR?
          </h2>
          <p className="text-xs text-neutral-600 mt-1.5">
            Every shirt is engineered from the yarn up to exceed conventional retail benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950 mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950">Quality-Focused Designs</h4>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Reinforced bar-tacking at stress points, stay-flat fused collar bands, and mother-of-pearl buttons.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950 mx-auto mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950">Comfortable Fabrics</h4>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Pre-washed to eliminate shrinkage. Silky Giza, American Supima, and organic enzyme-washed linen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950 mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950">Styles for Every Gen</h4>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              From twenties trendsetters to dignified mature gentlemen, our fits respect your unique posture.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950 mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950">Versatile Fashion</h4>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Seamlessly transition from 9:00 AM executive boardroom presentations to 8:00 PM rooftop lounges.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950 mx-auto mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950">Easy Online Shopping</h4>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Instant live parcel tracking, complimentary delivery above ₹1,499, and 15-day home try-on guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* 8. STYLE JOURNAL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Men's Sartorial Knowledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
              The Style Journal
            </h2>
          </div>
          <button
            onClick={() => navigateTo('blog')}
            className="text-xs font-bold text-neutral-900 hover:text-neutral-600 flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigateTo('blog-post', { blogId: blog.id })}
              className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-2">
                    <span className="font-semibold text-neutral-600">{blog.category}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-950 group-hover:text-neutral-700 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 text-xs font-bold text-neutral-950 flex items-center gap-1 group-hover:text-neutral-600">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
