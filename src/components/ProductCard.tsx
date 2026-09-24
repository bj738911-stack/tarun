import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor, ShirtSize } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ShirtSize>(product.sizes[0]);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-xl border border-neutral-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => navigateTo('product-detail', { productId: product.id })}
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wide">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-neutral-900 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded shadow-sm tracking-wider">
              New
            </span>
          )}
          {product.isTrending && !product.isNewArrival && (
            <span className="bg-amber-600 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded shadow-sm tracking-wider">
              Trending
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            inWishlist
              ? 'bg-red-50 text-red-600 shadow-md scale-110'
              : 'bg-white/80 text-neutral-700 hover:text-neutral-950 hover:bg-white shadow-sm'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur text-neutral-900 hover:bg-neutral-950 hover:text-white text-xs font-semibold py-2.5 rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Generation & Category subtitle */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span className="capitalize font-medium">{product.category} Shirt</span>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{product.fit}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1 group-hover:text-neutral-700 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-neutral-600">
              {product.rating}
            </span>
            <span className="text-[11px] text-neutral-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-bold text-neutral-950">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-[11px] font-semibold text-emerald-600">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            )}
          </div>
        </div>

        {/* 3. Color Swatches & Add to Cart Controls */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">
              {product.colors.length > 3 ? `+${product.colors.length - 3}` : ''}
            </span>
          </div>

          {/* Add to Cart Quick Action */}
          <div className="relative">
            <button
              id={`card-add-cart-btn-${product.id}`}
              onClick={handleQuickAdd}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-950 text-white hover:bg-neutral-800'
              }`}
              title="Add to cart"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
