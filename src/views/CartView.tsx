import React, { useState } from 'react';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
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

  const freeShippingThreshold = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-display">
          Your Wardrobe Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 mb-8">
          Explore our collection of tailored men's shirts across all styles and generational fits.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Explore Shirts Collection
        </button>
      </div>
    );
  }

  return (
    <div id="cart-full-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-neutral-500 hover:text-neutral-950 flex items-center gap-1.5 mb-2 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
            Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 underline font-semibold cursor-pointer"
        >
          Empty Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
          {cart.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex gap-4 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover object-top rounded-xl bg-neutral-100 shrink-0 cursor-pointer"
                  onClick={() => navigateTo('product-detail', { productId: item.productId })}
                />
                <div>
                  <h3
                    className="text-sm font-bold text-neutral-950 hover:text-neutral-700 cursor-pointer"
                    onClick={() => navigateTo('product-detail', { productId: item.productId })}
                  >
                    {item.product.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-neutral-300"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      {item.selectedColor.name}
                    </span>
                    <span>•</span>
                    <span>Size: <strong className="text-neutral-900">{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span>{item.product.fit}</span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-900 mt-2">
                    {formatPrice(item.unitPrice)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-950 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-neutral-950">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-950 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-extrabold text-neutral-950 w-24 text-right">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-neutral-400 hover:text-red-600 p-1.5 cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 sticky top-28">
          <h2 className="text-base font-bold text-neutral-950 font-display">
            Order Summary
          </h2>

          {/* Coupon */}
          <div>
            {activeCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>{activeCoupon.code} applied (-{activeCoupon.discountPercent}%)</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 underline font-bold cursor-pointer"
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
                  placeholder="Discount Coupon"
                  className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs uppercase focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
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

          {/* Breakdown */}
          <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-950">{formatPrice(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({activeCoupon?.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  formatPrice(shippingCost)
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-3 border-t border-neutral-200">
              <span>Estimated Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('checkout')}
            className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 text-[11px] text-neutral-500 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-neutral-700" />
              <span>Free delivery on orders over ₹1,499</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
              <span>15-day complimentary exchange guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
