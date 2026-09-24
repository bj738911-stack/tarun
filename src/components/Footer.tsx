import React, { useState } from 'react';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  Phone,
  MapPin
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShirtCategory } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      {/* 1. Value Props Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-neutral-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Complimentary Delivery</h4>
              <p className="text-xs text-neutral-400 mt-1">Free express shipping on all orders over ₹1,499.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">15-Day Guaranteed Exchange</h4>
              <p className="text-xs text-neutral-400 mt-1">Hassle-free size and fit exchanges at zero cost.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Master Tailored Fabrics</h4>
              <p className="text-xs text-neutral-400 mt-1">100% combed Egyptian & Supima cotton weaves.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Fits Every Generation</h4>
              <p className="text-xs text-neutral-400 mt-1">Curated cuts for young adults to mature gentlemen.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-display">
                ATTRXN<span className="font-light text-neutral-400">WEAR</span>
              </span>
              <p className="text-xs text-amber-400 font-semibold tracking-widest uppercase mt-1">
                "From Young & Stylish to Classic & Timeless — Shirts for Every Man."
              </p>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              ATTRXNWEAR crafts modern men’s shirts designed to bridge generational style. Whether you are seeking a relaxed camp-collar linen, a bold party print, or an executive 100s Egyptian cotton dress shirt, we tailor with meticulous precision.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Join the Gentlemen's Club
              </h5>
              <p className="text-xs text-neutral-400 mb-3">
                Subscribe for private drops, styling journals, and receive a 10% coupon code.
              </p>
              {subscribed ? (
                <div className="bg-neutral-900 border border-neutral-800 text-amber-300 text-xs p-3 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Welcome! Use code <strong className="text-white">FIRST10</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-3 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Shirt Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {[
                { name: 'Casual Shirts', cat: 'casual' as ShirtCategory },
                { name: 'Formal Dress Shirts', cat: 'formal' as ShirtCategory },
                { name: 'Printed & Resort Shirts', cat: 'printed' as ShirtCategory },
                { name: 'Checked Flannel & Poplin', cat: 'checked' as ShirtCategory },
                { name: 'Denim & Chambray Shirts', cat: 'denim' as ShirtCategory },
                { name: 'Pure Linen Shirts', cat: 'linen' as ShirtCategory },
                { name: 'Basic & Everyday Essentials', cat: 'basic' as ShirtCategory },
                { name: 'Special Offers & Clearance', cat: 'offers' as ShirtCategory },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateTo('shop', { category: item.cat })}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Support
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => navigateTo('order-tracking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policy-shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policy-returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns & Refunds Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Account & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Policies */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              The Brand
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About ATTRXNWEAR
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Style Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policy-privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policy-terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Control Center</span>
                </button>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-neutral-900 text-[11px] text-neutral-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-neutral-400" />
                <span>Flagship Studio, New York & London</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-neutral-400" />
                <span>Concierge: +1 (800) 555-ATTRXN</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Strip with Payment Badges & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} ATTRXNWEAR Inc. All Rights Reserved. Designed for Every Generation of Men.
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">Encrypted Payments:</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-semibold text-neutral-400">
              VISA
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-semibold text-neutral-400">
              Mastercard
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-semibold text-neutral-400">
              Apple Pay
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-semibold text-neutral-400">
              UPI
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-semibold text-neutral-400">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
