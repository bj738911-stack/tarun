import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const BlogPostView: React.FC = () => {
  const { currentBlogId, blogs, products, navigateTo } = useStore();

  const blog = blogs.find((b) => b.id === currentBlogId) || blogs[0];
  const featuredProduct = products[0];

  return (
    <div id="blog-post-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Back button */}
      <button
        onClick={() => navigateTo('blog')}
        className="text-xs text-neutral-500 hover:text-neutral-950 flex items-center gap-1.5 font-semibold cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Journal</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
          {blog.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 font-display leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 pt-2">
          <span>By {blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-100 shadow-md">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Body */}
      <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-6 pt-4">
        <p className="text-base sm:text-lg text-neutral-900 font-medium leading-relaxed">
          {blog.excerpt}
        </p>

        <p>
          Throughout fashion history, the collared shirt has represented more than mere daily attire. It is the architectural anchor of masculine presence. From the stiffness of Victorian high-standing bands to the relaxed Mediterranean camp collars of Riviera summers, each generation reinvents the garment to fit their contemporary rhythm.
        </p>

        <h3 className="text-lg sm:text-xl font-bold text-neutral-950 font-display pt-4">
          The Anatomy of Natural Fibers vs Synthetics
        </h3>
        <p>
          Synthetic polyester blends may resist wrinkles initially, but at an intolerable cost to breathability and longevity. When temperatures fluctuate, natural fibers breathe in harmony with your body. Egyptian Giza cotton features extra-long staple fibers measuring up to 38mm, delivering a silk-like touch, rich dye absorption, and unmatched tensile strength that softens with every wash.
        </p>

        <div className="p-6 bg-neutral-100 rounded-2xl border-l-4 border-neutral-950 italic text-neutral-800 my-6">
          "A truly great shirt does not demand constant fidgeting or adjustment. It drapes naturally from the shoulder line, preserves collar symmetry, and leaves you confident throughout an entire twelve-hour day."
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-neutral-950 font-display pt-4">
          Generational Styling Recommendations
        </h3>
        <p>
          For men in their twenties, embrace looser silhouettes, washed denims, and cuban collar botanicals layered open over rib-knit vests. For gentlemen in their thirties and forties, invest in Egyptian poplins and micro-ginghams that move smoothly between the boardroom and family dinners. For men forty-five and above, prioritize comfort: brushed flannels, pure linen weaves, and roomier chest proportions that flatter mature frames.
        </p>
      </div>

      {/* Editorial Featured Product Recommendation */}
      <div className="mt-12 p-6 sm:p-8 bg-neutral-50 rounded-2xl border border-neutral-200">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
          Editor’s Sartorial Choice
        </span>
        <h4 className="text-base font-bold text-neutral-950 font-display mb-4">
          Featured in this essay: {featuredProduct.name}
        </h4>
        <div className="max-w-xs">
          <ProductCard product={featuredProduct} />
        </div>
      </div>
    </div>
  );
};
