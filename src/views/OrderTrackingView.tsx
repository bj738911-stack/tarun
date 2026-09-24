import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';

export const OrderTrackingView: React.FC = () => {
  const { orders, currentOrderId, navigateTo } = useStore();

  const [searchId, setSearchId] = useState(currentOrderId || (orders[0]?.id ?? 'ORD-84920'));
  const [selectedOrder, setSelectedOrder] = useState(
    orders.find((o) => o.id === searchId) || orders[0]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrder(found);
    }
  };

  const steps = [
    {
      title: 'Order Confirmed',
      desc: 'Payment captured and tailoring work order assigned.',
      time: 'Sep 18, 10:24 AM',
      done: true
    },
    {
      title: 'Fabric Quality Inspection',
      desc: 'Hand-inspected seam alignment and custom collar stays.',
      time: 'Sep 18, 02:40 PM',
      done: true
    },
    {
      title: 'Dispatched via ATTRXN Air Express',
      desc: 'Carrier assigned. Tracking reference #ATX-98234-EXP.',
      time: 'Sep 19, 08:15 AM',
      done: selectedOrder?.status !== 'pending'
    },
    {
      title: 'Out for Local Delivery',
      desc: 'Assigned to regional courier dispatch hub.',
      time: 'Pending',
      done: selectedOrder?.status === 'delivered'
    },
    {
      title: 'Delivered to Doorstep',
      desc: 'Signed by recipient in signature gift package.',
      time: 'Pending',
      done: selectedOrder?.status === 'delivered'
    },
  ];

  return (
    <div id="order-tracking-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header & Search */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
          Live Logistics
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display">
          Track Your ATTRXNWEAR Order
        </h1>
        <p className="text-xs text-neutral-500">
          Enter your unique order reference code to track live transit updates.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 pt-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. ORD-84920"
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-neutral-950 shadow-sm"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Track Status
          </button>
        </form>
      </div>

      {selectedOrder ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
            <div>
              <span className="text-xs text-neutral-400 block font-semibold">Current State</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-lg font-bold text-neutral-950 capitalize font-display">
                  {selectedOrder.status === 'pending'
                    ? 'Tailoring in Progress'
                    : selectedOrder.status === 'processing'
                    ? 'In Transit'
                    : selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="text-xs sm:text-right">
              <span className="text-neutral-400 block font-semibold">Estimated Arrival</span>
              <span className="text-sm font-bold text-emerald-700">
                {selectedOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 font-display">
              Transit Log
            </h3>
            <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-neutral-200">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      step.done
                        ? 'bg-neutral-950 border-neutral-950 text-white'
                        : 'bg-white border-neutral-300 text-neutral-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4
                      className={`text-xs font-bold ${
                        step.done ? 'text-neutral-950' : 'text-neutral-400'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <span className="text-[11px] text-neutral-400 font-mono">{step.time}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Item Details */}
          <div className="pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-neutral-950">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span>Delivery Address</span>
              </div>
              <p className="text-neutral-800 font-medium">{selectedOrder.shippingAddress.fullName}</p>
              <p className="text-neutral-500">{selectedOrder.shippingAddress.addressLine1}</p>
              <p className="text-neutral-500">
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-neutral-950">
                <Package className="w-4 h-4 text-neutral-500" />
                <span>Package Contents</span>
              </div>
              <ul className="space-y-1 text-neutral-600">
                {selectedOrder.items.map((i, idx) => (
                  <li key={i.id || idx} className="flex justify-between">
                    <span>{i.productName || i.product?.name} (x{i.quantity})</span>
                    <span className="font-semibold text-neutral-900">{formatPrice((i.price || i.unitPrice || 0) * i.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200">
          <p className="text-xs text-neutral-500">No order found with code "{searchId}".</p>
        </div>
      )}

      {/* Need assistance */}
      <div className="p-4 bg-neutral-100 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-neutral-700">
          <HelpCircle className="w-4 h-4 text-neutral-500" />
          <span>Have an inquiry regarding your parcel transit?</span>
        </div>
        <button
          onClick={() => navigateTo('contact')}
          className="text-xs font-bold text-neutral-950 hover:underline cursor-pointer"
        >
          Contact Customer Care
        </button>
      </div>
    </div>
  );
};
