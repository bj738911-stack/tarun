import React, { useState } from 'react';
import { Clock, User, ArrowRight, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BlogView: React.FC = () => {
  const { blogs, navigateTo } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Styling', 'Generations', 'Fabrics', 'Care'];

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedCategory !== 'All' && blog.category !== selectedCategory) return false;
    if (
      search &&
      !blog.title.toLowerCase().includes(search.toLowerCase()) &&
      !blog.excerpt.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const featuredBlog = blogs[0];

  return (
    <div id="blog-catalog-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
          The Style Journal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
          Sartorial Notes & Styling Guides
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Tailoring wisdom, generational styling philosophy, and fabric care from our master cutters.
        </p>
      </div>

      {/* Featured Hero Article */}
      {featuredBlog && selectedCategory === 'All' && !search && (
        <div
          onClick={() => navigateTo('blog-post', { blogId: featuredBlog.id })}
          className="bg-neutral-900 text-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-amber-400">
                <span className="font-bold uppercase tracking-wider">{featuredBlog.category}</span>
                <span>•</span>
                <span>{featuredBlog.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                {featuredBlog.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {featuredBlog.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold">
              <span>By {featuredBlog.author}</span>
              <span className="flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                Read Full Essay <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-950"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigateTo('blog-post', { blogId: blog.id })}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-2">
                  <span className="font-bold text-neutral-900 uppercase tracking-wider">{blog.category}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-neutral-950 group-hover:text-neutral-700 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>{blog.date}</span>
                <span className="font-bold text-neutral-950 flex items-center gap-1 group-hover:text-neutral-600">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
