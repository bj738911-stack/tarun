import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';

export const OrderConfirmationView: React.FC = () => {
  const { orders, navigateTo } = useStore();

  const latestOrder = orders[0];

  if (!latestOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-sm text-neutral-500 mb-4">No recent order found.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-bold rounded-xl"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="order-confirmation-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Success Banner */}
      <div className="text-center space-y-3 mb-10">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Payment & Order Confirmed
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-950 font-display">
          Thank you for choosing ATTRXNWEAR
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
          We have received your order. Our tailors will prepare your garments with signature tissue packaging and garment protection sleeves.
        </p>
      </div>

      {/* Order Info Summary Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm p-6 sm:p-8 space-y-8 print:border-none print:shadow-none">
        {/* Top bar with ID and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-xs text-neutral-500 block">Order Reference Number</span>
            <span className="text-lg font-bold font-mono text-neutral-950">{latestOrder.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('order-tracking', { orderId: latestOrder.id })}
              className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-neutral-800 cursor-pointer shadow-sm"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Parcel Live</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-50 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-600">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-neutral-950 mb-1">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span>Estimated Delivery</span>
            </div>
            <p className="font-semibold text-emerald-700">{latestOrder.estimatedDelivery}</p>
            <p className="text-[11px] text-neutral-400">ATTRXN Priority Express</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-neutral-950 mb-1">
              <MapPin className="w-4 h-4 text-neutral-500" />
              <span>Shipping Destination</span>
            </div>
            <p className="text-neutral-900 font-medium">{latestOrder.shippingAddress.fullName}</p>
            <p>{latestOrder.shippingAddress.addressLine1}</p>
            <p>{latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} {latestOrder.shippingAddress.postalCode}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-neutral-950 mb-1">
              <CreditCard className="w-4 h-4 text-neutral-500" />
              <span>Payment Details</span>
            </div>
            <p className="text-neutral-900 font-medium">{latestOrder.paymentMethod}</p>
            <p className="text-emerald-600 font-semibold uppercase">{latestOrder.paymentStatus}</p>
            <p className="text-[11px] text-neutral-400">{latestOrder.createdAt}</p>
          </div>
        </div>

        {/* Items List */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-4 font-display">
            Ordered Garments
          </h3>
          <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
            {latestOrder.items.map((item, idx) => (
              <div key={item.id || idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.productImage || item.product?.images[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80'}
                    alt={item.productName || item.product?.name || 'Shirt'}
                    className="w-14 h-16 object-cover object-top rounded-lg bg-neutral-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-950">
                      {item.productName || item.product?.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Color: {item.color || item.selectedColor?.name} • Size: {item.size || item.selectedSize} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-neutral-950">
                  {formatPrice((item.price || item.unitPrice || 0) * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Financial Breakdown */}
        <div className="flex justify-end pt-2">
          <div className="w-64 space-y-1.5 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-950">{formatPrice(latestOrder.subtotal)}</span>
            </div>
            {latestOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>-{formatPrice(latestOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{latestOrder.shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPrice(latestOrder.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-3 border-t border-neutral-200">
              <span>Total Paid</span>
              <span>{formatPrice(latestOrder.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Return to Shop CTA */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-900 hover:text-neutral-600 uppercase tracking-wider"
        >
          <span>Continue Exploring Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
