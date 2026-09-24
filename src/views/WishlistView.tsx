import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';

export const WishlistView: React.FC = () => {
  const { wishlist, products, toggleWishlist, addToCart, navigateTo } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-display">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 mb-8">
          Save your favorite shirt silhouettes, linen weaves, and printed designs to review anytime.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Discover Collection
        </button>
      </div>
    );
  }

  return (
    <div id="wishlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Items saved across all devices for your personal wardrobe.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white text-red-600 shadow cursor-pointer hover:bg-red-50"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {product.category} • {product.fit}
                </span>
                <h3
                  onClick={() => navigateTo('product-detail', { productId: product.id })}
                  className="text-sm font-semibold text-neutral-950 hover:text-neutral-700 cursor-pointer mt-1"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-base font-bold text-neutral-950">{formatPrice(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex gap-2">
                <button
                  onClick={() => {
                    addToCart(product, product.colors[0], product.sizes[0], 1);
                  }}
                  className="flex-1 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
