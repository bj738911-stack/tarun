import React, { useState } from 'react';
import { X, Star, Heart, Check, ShoppingBag, ShieldCheck, ArrowRight, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShirtSize, ProductColor } from '../types';
import { formatPrice } from '../utils/currency';

export const QuickViewModal: React.FC = () => {
  const {
    isQuickViewOpen,
    setIsQuickViewOpen,
    quickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setIsSizeGuideOpen
  } = useStore();

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(quickViewProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ShirtSize>(quickViewProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsQuickViewOpen(false);
    }, 1000);
  };

  return (
    <div
      id="quick-view-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={() => setIsQuickViewOpen(false)}
    >
      <div
        id="quick-view-modal-content"
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="close-quickview-btn"
          onClick={() => setIsQuickViewOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Section */}
          <div className="bg-neutral-100 p-6 flex flex-col justify-between">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-sm mb-4">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-neutral-950 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Stock */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span className="uppercase tracking-wider font-semibold text-neutral-600">
                  {quickViewProduct.category} shirt • {quickViewProduct.fit}
                </span>
                {quickViewProduct.inStock ? (
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> In Stock ({quickViewProduct.stockCount} left)
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-neutral-950 leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(quickViewProduct.rating)
                          ? 'fill-current'
                          : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-700">
                  {quickViewProduct.rating}
                </span>
                <span className="text-xs text-neutral-400">
                  ({quickViewProduct.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-extrabold text-neutral-950">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                {quickViewProduct.discountPercentage > 0 && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    Save {quickViewProduct.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs text-neutral-600 mt-3 line-clamp-2 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Color Selection */}
              <div className="mt-5">
                <label className="text-xs font-semibold text-neutral-900 block mb-2">
                  Color: <span className="font-normal text-neutral-600">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
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

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-900">
                    Select Size: <span className="font-normal text-neutral-600">{selectedSize}</span>
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] text-neutral-600 hover:text-neutral-950 underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-9 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-900">Quantity:</span>
                <div className="flex items-center border border-neutral-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-100 space-y-2">
              <div className="flex gap-2">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 text-white hover:bg-neutral-800'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart • ${(quickViewProduct.price * quantity).toFixed(2)}
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    inWishlist
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
                  }`}
                  title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  navigateTo('product-detail', { productId: quickViewProduct.id });
                  setIsQuickViewOpen(false);
                }}
                className="w-full text-center text-xs font-semibold text-neutral-600 hover:text-neutral-950 py-2 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Full Product Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
