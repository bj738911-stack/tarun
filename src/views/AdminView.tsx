import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Settings,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  IndianRupee,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ShirtCategory, GenerationStyle, ShirtSize, ShirtFit } from '../types';
import { formatPrice } from '../utils/currency';

export const AdminView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    reviews,
    approveReview,
    rejectReview,
    bannerSettings,
    updateBannerSettings,
    currentUser,
    navigateTo
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'coupons' | 'reviews' | 'banners'
  >('overview');

  // Product Filter & Modal
  const [productSearch, setProductSearch] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const initialNewProduct: Omit<Product, 'id' | 'createdAt'> = {
    name: '',
    slug: '',
    category: 'casual',
    generation: 'young-stylish',
    price: 849,
    originalPrice: 1249,
    discountPercentage: 32,
    rating: 4.8,
    reviewCount: 1,
    inStock: true,
    stockCount: 20,
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'],
    colors: [{ name: 'Navy', hex: '#1e293b' }, { name: 'White', hex: '#ffffff' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Regular Fit',
    sleeve: 'Full Sleeve',
    fabric: '100% Combed Cotton',
    pattern: 'Solid',
    description: 'Masterfully crafted tailored shirt engineered for everyday versatility and all-day comfort.',
    features: ['Split back yoke for shoulder mobility', 'Single-needle side seam construction'],
    careInstructions: ['Machine wash cold', 'Warm iron while damp'],
    isTrending: false,
    isNewArrival: true,
    isFeatured: false,
  };

  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt'>>(initialNewProduct);

  // Banner Form State
  const [heroHeadline, setHeroHeadline] = useState(bannerSettings.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(bannerSettings.heroSubheadline);
  const [heroBadge, setHeroBadge] = useState(bannerSettings.heroBadge);
  const [heroImage, setHeroImage] = useState(bannerSettings.heroImage);
  const [bannerSaved, setBannerSaved] = useState(false);

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMinSpend, setNewCouponMinSpend] = useState(999);

  // Overview Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const lowStockCount = products.filter((p) => p.stockCount < 15).length;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-')
      });
      setEditingProduct(null);
    } else {
      addProduct(formData);
    }

    setIsAddProductModalOpen(false);
    setFormData(initialNewProduct);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      category: p.category,
      generation: p.generation,
      price: p.price,
      originalPrice: p.originalPrice,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inStock: p.inStock,
      stockCount: p.stockCount,
      images: p.images,
      colors: p.colors,
      sizes: p.sizes,
      fit: p.fit,
      sleeve: p.sleeve,
      fabric: p.fabric,
      pattern: p.pattern,
      description: p.description,
      features: p.features,
      careInstructions: p.careInstructions,
      isTrending: p.isTrending,
      isNewArrival: p.isNewArrival,
      isFeatured: p.isFeatured
    });
    setIsAddProductModalOpen(true);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minSpend: Number(newCouponMinSpend),
      expiresAt: '2026-12-31',
      isActive: true
    });
    setNewCouponCode('');
  };

  const handleSaveBanners = (e: React.FormEvent) => {
    e.preventDefault();
    updateBannerSettings({
      heroHeadline,
      heroSubheadline,
      heroBadge,
      heroImage
    });
    setBannerSaved(true);
    setTimeout(() => setBannerSaved(false), 2000);
  };

  return (
    <div id="admin-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              Admin Access
            </span>
            <span className="text-xs text-neutral-500">ATTRXNWEAR HQ Master Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display mt-1">
            Store Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer flex items-center gap-1.5"
          >
            <span>Live Store Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 bg-neutral-100 p-1.5 rounded-2xl text-xs font-bold scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-white shadow text-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Executive Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products' ? 'bg-white shadow text-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-white shadow text-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'coupons' ? 'bg-white shadow text-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Coupons ({coupons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'reviews' ? 'bg-white shadow text-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Customer Reviews ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'banners' ? 'bg-white shadow text-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Homepage Banners</span>
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
                <IndianRupee className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-extrabold text-neutral-950 font-display">
                {formatPrice(totalRevenue)}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                +18.4% vs last period
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-neutral-800" />
              </div>
              <p className="text-2xl font-extrabold text-neutral-950 font-display">
                {totalOrders}
              </p>
              <span className="text-[11px] text-neutral-500 mt-1 inline-block">
                All domestic & export orders
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Live Shirt SKUs</span>
                <Package className="w-4 h-4 text-neutral-800" />
              </div>
              <p className="text-2xl font-extrabold text-neutral-950 font-display">
                {products.length}
              </p>
              <span className="text-[11px] text-neutral-500 mt-1 inline-block">
                Across 7 styling categories
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Low Stock SKUs</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-extrabold text-neutral-950 font-display">
                {lowStockCount}
              </p>
              <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-block">
                Under 15 units remaining
              </span>
            </div>
          </div>

          {/* Recent Orders in Overview */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Recent Orders Stream
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-neutral-900 hover:underline cursor-pointer"
              >
                View All Orders
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Items</th>
                    <th className="pb-3 font-semibold">Payment</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/50">
                      <td className="py-3 font-mono font-bold text-neutral-950">{order.id}</td>
                      <td className="py-3">{order.shippingAddress.fullName}</td>
                      <td className="py-3 text-neutral-500">{order.items.length} items</td>
                      <td className="py-3">{order.paymentMethod}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold text-neutral-950">
                        {formatPrice(order.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS CATALOG TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title, category..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-950 shadow-sm"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData(initialNewProduct);
                setIsAddProductModalOpen(true);
              }}
              className="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Shirt</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/50 text-neutral-500 uppercase text-[10px] tracking-wider">
                    <th className="p-4 font-semibold">Product</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Target Gen</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Stock</th>
                    <th className="p-4 font-semibold">Badges</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50/40">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-12 object-cover rounded-lg bg-neutral-100 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-neutral-950 line-clamp-1">{product.name}</p>
                            <p className="text-[11px] text-neutral-400">{product.fabric} • {product.fit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize font-medium text-neutral-700">{product.category}</td>
                      <td className="p-4 text-[11px] text-neutral-600 font-semibold">{product.generation}</td>
                      <td className="p-4 font-bold text-neutral-950">{formatPrice(product.price)}</td>
                      <td className="p-4">
                        <span
                          className={`font-semibold ${
                            product.stockCount < 15 ? 'text-amber-600 font-bold' : 'text-neutral-700'
                          }`}
                        >
                          {product.stockCount} units
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {product.isTrending && (
                            <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                              Trending
                            </span>
                          )}
                          {product.isNewArrival && (
                            <span className="text-[9px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(product)}
                            className="p-1 text-neutral-500 hover:text-neutral-950 cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/50 text-neutral-500 uppercase text-[10px] tracking-wider">
                    <th className="p-4 font-semibold">Order ID</th>
                    <th className="p-4 font-semibold">Customer Details</th>
                    <th className="p-4 font-semibold">Destination</th>
                    <th className="p-4 font-semibold">Payment</th>
                    <th className="p-4 font-semibold">Status Action</th>
                    <th className="p-4 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/40">
                      <td className="p-4 font-mono font-bold text-neutral-950">{order.id}</td>
                      <td className="p-4">
                        <p className="font-bold text-neutral-950">{order.shippingAddress.fullName}</p>
                        <p className="text-[11px] text-neutral-400">{order.shippingAddress.email}</p>
                      </td>
                      <td className="p-4 text-neutral-600">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-neutral-800">{order.paymentMethod}</span>
                        <p className="text-[10px] text-emerald-600 uppercase font-bold">{order.paymentStatus}</p>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Tailoring / Processing</option>
                          <option value="shipped">Dispatched / Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right font-extrabold text-neutral-950">
                        {formatPrice(order.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. COUPONS TAB */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-150">
          {/* Create Coupon Form */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-950 font-display">
              Create Promotional Code
            </h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="e.g. SUMMER25"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Discount %</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Min Spend (₹)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={newCouponMinSpend}
                    onChange={(e) => setNewCouponMinSpend(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Create Promo Code
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-950">Active Promo Codes ({coupons.length})</h3>
            </div>
            <div className="divide-y divide-neutral-100">
              {coupons.map((coupon) => (
                <div key={coupon.code} className="p-4 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm bg-neutral-100 px-2 py-0.5 rounded text-neutral-950">
                        {coupon.code}
                      </span>
                      <span className="text-emerald-700 font-bold">-{coupon.discountPercent}% OFF</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Min spend: {formatPrice(coupon.minOrderValue ?? coupon.minSpend ?? 0)} • Expires: {coupon.expiryDate || coupon.expiresAt || 'Active'}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCoupon(coupon.code)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 cursor-pointer"
                    title="Delete coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. REVIEWS MANAGEMENT TAB */}
      {activeTab === 'reviews' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-950">Customer Reviews Moderate Queue</h3>
            </div>
            <div className="divide-y divide-neutral-100">
              {reviews.map((rev) => {
                const product = products.find((p) => p.id === rev.productId);
                return (
                  <div key={rev.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-950">{rev.userName}</span>
                        <span className="text-neutral-400">• {product?.name}</span>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900">{rev.title}</h4>
                      <p className="text-neutral-600 max-w-xl">{rev.comment}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          rev.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rev.status}
                      </span>
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => approveReview(rev.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => rejectReview(rev.id)}
                        className="px-3 py-1 bg-neutral-200 hover:bg-red-600 hover:text-white text-neutral-700 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. HOMEPAGE BANNERS TAB */}
      {activeTab === 'banners' && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-base font-bold text-neutral-950 font-display">
              Homepage Hero & Spotlight Settings
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Instantly customize the marquee branding seen by all storefront visitors.
            </p>
          </div>

          <form onSubmit={handleSaveBanners} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-800 block mb-1">Badge Tagline</label>
              <input
                type="text"
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">Hero Main Headline</label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">Hero Sub-Headline</label>
              <textarea
                rows={3}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">Hero Background Image URL</label>
              <input
                type="url"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl font-mono text-[11px]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {bannerSaved ? 'Updated Live on Storefront!' : 'Save & Publish Changes'}
            </button>
          </form>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddProductModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsAddProductModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h3 className="text-lg font-bold text-neutral-950 font-display">
                {editingProduct ? 'Edit Shirt Profile' : 'Add New Shirt to Collection'}
              </h3>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-950 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-neutral-800 block mb-1">Shirt Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Normandy Pure French Linen Shirt"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Style Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ShirtCategory })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl cursor-pointer"
                  >
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="printed">Printed</option>
                    <option value="checked">Checked</option>
                    <option value="denim">Denim</option>
                    <option value="linen">Linen</option>
                    <option value="basic">Basic</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Target Generation</label>
                  <select
                    value={formData.generation}
                    onChange={(e) => setFormData({ ...formData, generation: e.target.value as GenerationStyle })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl cursor-pointer"
                  >
                    <option value="young-stylish">Young & Stylish (18-30)</option>
                    <option value="smart-modern">Smart & Modern (30-45)</option>
                    <option value="classic-comfortable">Classic & Comfortable (45+)</option>
                    <option value="basic-essential">Basic & Essential</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Retail Price (₹700 - ₹1,000)</label>
                  <input
                    type="number"
                    required
                    min={700}
                    max={1000}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Inventory Stock Count</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Fabric & Yarn</label>
                  <input
                    type="text"
                    required
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="e.g. 100% Normandy Flax Linen"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Silhouette / Fit</label>
                  <select
                    value={formData.fit}
                    onChange={(e) => setFormData({ ...formData, fit: e.target.value as ShirtFit })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl cursor-pointer"
                  >
                    <option value="Slim Fit">Slim Fit</option>
                    <option value="Regular Fit">Regular Fit</option>
                    <option value="Relaxed Fit">Relaxed Fit</option>
                    <option value="Tailored Fit">Tailored Fit</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Primary Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.images[0]}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-neutral-800 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-neutral-950 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-800"
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
