import React from 'react';
import { RotateCcw, Truck, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReturnsView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div id="returns-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
          Risk-Free Sartorial Promise
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
          15-Day Free Returns & Exchanges
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
          We want your ATTRXNWEAR shirts to drape with tailored perfection. If the size, shoulder seam, or cuff length isn't ideal, we make exchanges effortless.
        </p>
      </div>

      {/* 3 Step Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neutral-950 text-white font-bold text-sm flex items-center justify-center mx-auto">
            1
          </div>
          <h3 className="text-sm font-bold text-neutral-950">Initiate Exchange</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Head to your Account Order History or contact concierge@attrxnwear.com with your Order ID and desired size.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neutral-950 text-white font-bold text-sm flex items-center justify-center mx-auto">
            2
          </div>
          <h3 className="text-sm font-bold text-neutral-950">Doorstep Pickup</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Our courier arrives at your location with a pre-printed shipping satchel. No printer or labeling required.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neutral-950 text-white font-bold text-sm flex items-center justify-center mx-auto">
            3
          </div>
          <h3 className="text-sm font-bold text-neutral-950">Instant Replacement</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Your newly sized shirt is dispatched via Express Air or your refund is issued directly to your original payment method.
          </p>
        </div>
      </div>

      {/* Eligible Condition Checklist */}
      <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-4">
        <h3 className="text-base font-bold text-neutral-950 font-display">
          Return Eligibility Criteria
        </h3>
        <ul className="space-y-2 text-xs text-neutral-700">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Garment must be unworn, unwashed, and without perfume scents.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Original woven brand tags, collar stays, and packaging must be included.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Request must be submitted within 15 calendar days from the tracked delivery date.</span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigateTo('contact')}
          className="px-6 py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
        >
          <span>Contact Concierge to Start Exchange</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
