import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Banknote
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderShippingAddress } from '../types';
import { formatPrice } from '../utils/currency';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    activeCoupon,
    placeOrder,
    currentUser,
    navigateTo
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address Form State
  const defaultAddress: OrderShippingAddress = currentUser?.savedAddresses[0] || {
    fullName: currentUser?.name || 'Marcus Sterling',
    email: currentUser?.email || 'customer@attrxnwear.com',
    phone: currentUser?.phone || '+1 (555) 234-8901',
    addressLine1: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States'
  };

  const [address, setAddress] = useState<OrderShippingAddress>(defaultAddress);

  // Shipping Speed
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'UPI / QR' | 'Cash on Delivery'>('Credit Card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('891');
  const [cardName, setCardName] = useState(address.fullName);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    navigateTo('cart');
    return null;
  }

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(address, paymentMethod);
      navigateTo('order-confirmation');
    }, 1200);
  };

  return (
    <div id="checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Checkout Steps Header */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              1
            </span>
            <span className={`text-xs font-bold ${step >= 1 ? 'text-neutral-950' : 'text-neutral-400'}`}>
              Shipping
            </span>
          </div>

          <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-neutral-950' : 'bg-neutral-200'}`} />

          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              2
            </span>
            <span className={`text-xs font-bold ${step >= 2 ? 'text-neutral-950' : 'text-neutral-400'}`}>
              Delivery
            </span>
          </div>

          <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-neutral-950' : 'bg-neutral-200'}`} />

          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 3 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              3
            </span>
            <span className={`text-xs font-bold ${step >= 3 ? 'text-neutral-950' : 'text-neutral-400'}`}>
              Payment
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Step Forms (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-lg font-bold text-neutral-950 font-display">
                  1. Shipping Information
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Where should we deliver your tailored ATTRXNWEAR garments?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-neutral-800 block mb-1">Full Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => {
                      setAddress({ ...address, fullName: e.target.value });
                      setCardName(e.target.value);
                    }}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-neutral-800 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">State / Prov</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-800 cursor-pointer"
                >
                  <span>Continue to Shipping Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery Speed */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-lg font-bold text-neutral-950 font-display">
                  2. Delivery Option
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Select your preferred transit speed.
                </p>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-neutral-950 bg-neutral-50/70 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingSpeed"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-neutral-950"
                    />
                    <div>
                      <p className="text-xs font-bold text-neutral-950">ATTRXN Standard Ground</p>
                      <p className="text-[11px] text-neutral-500">Delivered in 3–5 business days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">
                    {cartSubtotal >= 1499 ? 'FREE' : formatPrice(99)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-neutral-950 bg-neutral-50/70 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingSpeed"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-neutral-950"
                    />
                    <div>
                      <p className="text-xs font-bold text-neutral-950">Priority Air Express (Next Day Dispatch)</p>
                      <p className="text-[11px] text-neutral-500">Delivered in 1–2 business days via FedEx / Bluedart</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">{formatPrice(199)}</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-600 hover:text-neutral-950 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-800 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Gateway */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-lg font-bold text-neutral-950 font-display">
                  3. Secure Payment Gateway
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  End-to-end encrypted 256-Bit SSL transaction.
                </p>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit Card')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'Credit Card' ? 'bg-white shadow text-neutral-950' : 'text-neutral-500'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI / QR')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'UPI / QR' ? 'bg-white shadow text-neutral-950' : 'text-neutral-500'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'Cash on Delivery' ? 'bg-white shadow text-neutral-950' : 'text-neutral-500'
                  }`}
                >
                  <Banknote className="w-3.5 h-3.5" />
                  <span>COD</span>
                </button>
              </div>

              {/* Payment Card Simulation */}
              {paymentMethod === 'Credit Card' && (
                <div className="space-y-4">
                  {/* Visual Card Representation */}
                  <div className="p-5 rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-950 text-white shadow-xl space-y-4 max-w-sm mx-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                        ATTRXNWEAR Black Card
                      </span>
                      <CreditCard className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="font-mono text-base tracking-widest pt-2">
                      {cardNumber}
                    </p>
                    <div className="flex justify-between items-end text-[10px] uppercase font-semibold text-neutral-400 pt-1">
                      <div>
                        <span>Cardholder</span>
                        <p className="text-white text-xs tracking-wide">{cardName || 'Marcus Sterling'}</p>
                      </div>
                      <div>
                        <span>Expires</span>
                        <p className="text-white text-xs">{cardExpiry}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-neutral-800 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• 4242"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-neutral-800 block mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-800 block mb-1">CVC / CVV</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'UPI / QR' && (
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center space-y-3 text-xs">
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl shadow-inner border border-neutral-200 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-neutral-900" />
                  </div>
                  <p className="font-bold text-neutral-900">Scan via Any UPI / QR Payment App</p>
                  <p className="text-[11px] text-neutral-500">
                    GPay, Apple Pay, PhonePe, Paytm, BHIM instant transfer to <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800">attrxnwear@upi</code>
                  </p>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                  <p className="font-bold">Cash on Delivery Policy</p>
                  <p className="text-[11px] text-amber-800">
                    Pay upon receipt after inspecting the signature packaging. Please keep exact change ready.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-600 hover:text-neutral-950 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  id="checkout-complete-order-btn"
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Verifying with Merchant...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Complete Order • {formatPrice(cartTotal)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 sticky top-28">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-950 font-display">
            Order Review ({cart.length} items)
          </h3>

          <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-14 object-cover rounded-lg bg-neutral-100"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-bold text-neutral-950 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-neutral-500">
                    {item.selectedColor.name} • Size {item.selectedSize} • Qty {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-bold text-neutral-900">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-xs text-neutral-600 pt-3 border-t border-neutral-100">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-950">{formatPrice(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount ({activeCoupon?.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Transit Shipping</span>
              <span>{shippingCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>{formatPrice(Math.round(cartSubtotal * 0.05))}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
              <span>Total Due</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
