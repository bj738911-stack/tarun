import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h2 className="text-base font-bold text-neutral-950 font-display">Your Wardrobe Bag</h2>
            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full font-semibold">
              {cart.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-neutral-700 mb-1.5 font-medium">
              Add <strong className="text-neutral-950">{formatPrice(remainingForFreeShipping)}</strong> more to unlock <span className="text-amber-600 font-bold">FREE Express Delivery</span>
            </p>
          ) : (
            <p className="text-emerald-700 font-semibold mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked FREE Express Delivery.
            </p>
          )}
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                remainingForFreeShipping === 0 ? 'bg-emerald-500' : 'bg-neutral-900'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Your bag is empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mt-1 mb-6">
                Discover shirts for every generation—from young and stylish to classic and timeless.
              </p>
              <button
                id="empty-cart-shop-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover object-top rounded-lg bg-neutral-100 shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('product-detail', { productId: item.productId });
                  }}
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="text-xs font-bold text-neutral-900 line-clamp-1 cursor-pointer hover:text-neutral-700"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo('product-detail', { productId: item.productId });
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-neutral-700">Size: {item.selectedSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-neutral-200 rounded-lg">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-semibold text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-neutral-950">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-neutral-50/50 space-y-4">
            {/* Promo Code Input */}
            <div>
              {activeCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: {activeCoupon.code} (-{activeCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-emerald-700 hover:text-red-600 font-bold underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (e.g. FIRST10, ATTRXN20)"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMessage && (
                <p className={`text-[11px] mt-1.5 ${couponMessage.error ? 'text-red-600' : 'text-emerald-600 font-medium'}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({activeCoupon?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                id="cart-proceed-checkout-btn"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="view-full-cart-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('cart');
                }}
                className="w-full text-center text-xs font-semibold text-neutral-600 hover:text-neutral-950 py-1.5 cursor-pointer"
              >
                View Detailed Cart Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
