import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Share2,
  Sparkles,
  ArrowRight,
  MessageSquarePlus,
  X,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShirtSize, ProductColor } from '../types';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/currency';

export const ProductDetailView: React.FC = () => {
  const {
    currentProductId,
    products,
    reviews,
    addReview,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    navigateTo
  } = useStore();

  const product = products.find((p) => p.id === currentProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ShirtSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping'>('details');
  const [added, setAdded] = useState(false);

  // Review Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewEmail, setNewReviewEmail] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const inWishlist = isInWishlist(product.id);

  // Reviews for this specific product
  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'approved');

  // Related products in the same category or generation
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.generation === product.generation))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewTitle.trim() || !newReviewComment.trim()) return;

    addReview({
      productId: product.id,
      userName: newReviewName,
      userEmail: newReviewEmail,
      rating: newReviewRating,
      title: newReviewTitle,
      comment: newReviewComment,
      verifiedPurchase: true
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsReviewModalOpen(false);
      setNewReviewName('');
      setNewReviewEmail('');
      setNewReviewTitle('');
      setNewReviewComment('');
    }, 1200);
  };

  return (
    <div id="product-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500">
        <button onClick={() => navigateTo('home')} className="hover:text-neutral-900 cursor-pointer">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', { category: product.category })}
          className="hover:text-neutral-900 capitalize cursor-pointer"
        >
          {product.category} Shirts
        </button>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Grid (Gallery + Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery: 7 Cols */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-neutral-950 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Image */}
          <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow-md">
                -{product.discountPercentage}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                inWishlist
                  ? 'bg-red-50 text-red-600 shadow-md'
                  : 'bg-white/80 text-neutral-700 hover:text-neutral-950 hover:bg-white shadow'
              }`}
              title="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Info: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                {product.generation.replace('-', ' & ')}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                {product.fit} • {product.sleeve}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-display leading-tight">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-900">{product.rating}</span>
              <span className="text-xs text-neutral-500">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-extrabold text-neutral-950">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Color Selector */}
          <div className="pt-4 border-t border-neutral-200">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2">
              Select Color: <span className="font-semibold text-neutral-600 normal-case">{selectedColor.name}</span>
            </label>
            <div className="flex items-center gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-neutral-950 ring-offset-2 scale-110'
                      : 'border-neutral-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Select Size: <span className="font-semibold text-neutral-600">{selectedSize}</span>
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-neutral-700 hover:text-neutral-950 underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Interactive Size Guide</span>
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                      : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Indicator */}
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-800 font-medium">
                In Stock: <strong className="text-neutral-950">{product.stockCount} units</strong> available at flagship hub
              </span>
            </div>
            <span className="text-[11px] text-neutral-500">Ships within 24 hrs</span>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-950 cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-neutral-950">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-950 cursor-pointer font-bold"
                >
                  +
                </button>
              </div>

              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Wardrobe!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart • {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200 text-center text-[11px] text-neutral-600">
            <div className="p-2.5 bg-neutral-50 rounded-lg">
              <Truck className="w-4 h-4 mx-auto mb-1 text-neutral-900" />
              <span>Complimentary Shipping &gt; ₹1,499</span>
            </div>
            <div className="p-2.5 bg-neutral-50 rounded-lg">
              <RotateCcw className="w-4 h-4 mx-auto mb-1 text-neutral-900" />
              <span>15-Day Free Exchange</span>
            </div>
            <div className="p-2.5 bg-neutral-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-neutral-900" />
              <span>100% Cotton Authenticity</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Specification Tabs */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="flex border-b border-neutral-200 bg-neutral-50/70">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'bg-white text-neutral-950 border-b-2 border-neutral-950 -mb-px'
                : 'text-neutral-500 hover:text-neutral-950'
            }`}
          >
            Design & Details
          </button>
          <button
            onClick={() => setActiveTab('fabric')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'fabric'
                ? 'bg-white text-neutral-950 border-b-2 border-neutral-950 -mb-px'
                : 'text-neutral-500 hover:text-neutral-950'
            }`}
          >
            Fabric & Care
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'shipping'
                ? 'bg-white text-neutral-950 border-b-2 border-neutral-950 -mb-px'
                : 'text-neutral-500 hover:text-neutral-950'
            }`}
          >
            Delivery & Returns
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <p>{product.description}</p>
              <div className="pt-4">
                <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-xs mb-3">
                  Tailoring & Construction Highlights:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-neutral-700">
              <div>
                <span className="font-bold text-neutral-950 block text-xs uppercase tracking-wider mb-1">
                  Yarn & Composition:
                </span>
                <p className="text-xs text-neutral-800">{product.fabric}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-neutral-950 block text-xs uppercase tracking-wider mb-2">
                  Laundering & Preservation Guidelines:
                </span>
                <ul className="space-y-1.5 text-xs">
                  {product.careInstructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-2xl text-xs text-neutral-700 leading-relaxed">
              <p>
                <strong>Domestic Express Dispatch:</strong> Orders placed before 2:00 PM EST ship same day via ATTRXN Air Express. Standard delivery arrives in 3 to 4 business days.
              </p>
              <p>
                <strong>15-Day Guaranteed Exchange:</strong> We want your shirt to fit with immaculate precision. Try it on in your home; if the neck, shoulders, or sleeve length require adjustment, we arrange a pickup and send the alternate size free of charge.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Customer Reviews & Ratings System */}
      <section id="customer-reviews-section" className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Verified Feedback
            </span>
            <h3 className="text-2xl font-bold text-neutral-950 font-display">
              Customer Reviews ({productReviews.length})
            </h3>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-neutral-200">
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-neutral-200 text-center">
            <span className="text-5xl font-extrabold text-neutral-950 font-display">
              {product.rating}
            </span>
            <div className="flex text-amber-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-neutral-500">Based on {product.reviewCount} reviews</span>
          </div>

          <div className="md:col-span-2 flex flex-col justify-center space-y-2">
            {[
              { stars: 5, pct: 85 },
              { stars: 4, pct: 12 },
              { stars: 3, pct: 3 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-medium text-neutral-600">{row.stars} Stars</span>
                <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
                <span className="w-10 text-right text-neutral-400">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="pt-8 divide-y divide-neutral-200">
          {productReviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-neutral-500 mb-3">No reviews submitted yet for this style.</p>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="text-xs font-bold text-neutral-950 underline"
              >
                Be the first to share your thoughts
              </button>
            </div>
          ) : (
            productReviews.map((rev) => (
              <div key={rev.id} className="py-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-950">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400">{rev.date}</span>
                </div>

                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-neutral-200'}`}
                    />
                  ))}
                </div>

                <h4 className="text-xs font-bold text-neutral-900">{rev.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. Related Shirts */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-950 font-display">
              You May Also Like
            </h3>
            <button
              onClick={() => navigateTo('shop', { category: product.category })}
              className="text-xs font-bold text-neutral-900 hover:text-neutral-600 flex items-center gap-1"
            >
              <span>View Category</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-950"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-neutral-950 font-display mb-1">
              Review: {product.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Share your fit, fabric, and styling experience with our gentlemen's community.
            </p>

            {reviewSubmitted ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl text-center">
                <Check className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                <h4 className="text-sm font-bold">Review Submitted!</h4>
                <p className="text-xs mt-1">Thank you for helping other men find their perfect fit.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                {/* Star rating picker */}
                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReviewRating ? 'fill-current' : 'text-neutral-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="e.g. Julian Vance"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Immaculate fit for broad shoulders"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Your Review</label>
                  <textarea
                    rows={4}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Comment on comfort, breathability, sizing accuracy..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-950 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
