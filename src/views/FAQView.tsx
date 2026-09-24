import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FAQView: React.FC = () => {
  const { navigateTo } = useStore();
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Sizing & Fits',
      q: 'How do I know which generational fit is right for my body type?',
      a: 'We offer four primary silhouettes: "Young & Stylish" (contemporary relaxed/tapered cuts with dropped or tailored shoulders), "Smart & Modern" (crisp slim and tailored fit through the chest and waist), "Classic & Comfortable" (regular generous room through the midsection, ideal for 45+ men), and "Basic & Essential" (straight universal cuts). Use our Interactive Size Guide on any product page for exact neck, chest, and sleeve measurements.'
    },
    {
      category: 'Sizing & Fits',
      q: 'Will ATTRXNWEAR shirts shrink after washing?',
      a: 'No. All our cotton, flannel, and linen fabrics undergo a proprietary pre-washing and sanforization process prior to tailoring. Residual shrinkage is strictly under 1%, which is factored into our pattern grading.'
    },
    {
      category: 'Shipping & Delivery',
      q: 'How long does domestic and international delivery take?',
      a: 'Orders placed before 2:00 PM EST ship same business day. Domestic standard delivery arrives in 3–5 business days. Express Air arrives in 1–2 business days. International deliveries arrive in 5–8 business days via DHL Express.'
    },
    {
      category: 'Shipping & Delivery',
      q: 'Is shipping free on all orders?',
      a: 'We provide complimentary Express shipping on all orders valued above ₹1,499. Orders under ₹1,499 carry a flat ₹99 shipping fee.'
    },
    {
      category: 'Returns & 15-Day Trial',
      q: 'What is your 15-day home try-on policy?',
      a: 'We believe you must try a shirt in natural light and with your existing wardrobe trousers. You have 15 days from delivery to request a complimentary size exchange or full refund. Garments must be unworn and unwashed with original tags attached.'
    },
    {
      category: 'Garment Care',
      q: 'What is the best way to launder 100% Egyptian Cotton shirts?',
      a: 'Machine wash cold on a gentle or delicates cycle with mild liquid detergent. Hang dry on a contoured wooden hanger. Iron with medium steam while the fabric is slightly damp for a razor-sharp finish.'
    },
    {
      category: 'Payments & Security',
      q: 'Which payment methods do you accept?',
      a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), digital wallets (Apple Pay, Google Pay), instant UPI / QR transfers, and Cash on Delivery (COD) for eligible regional zip codes.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="faq-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
          Help Desk & Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
          Clear answers regarding sizing, generational fits, delivery speeds, and fabric maintenance.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto pt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. shrink, returns, fits)..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-950 shadow-sm"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-7" />
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/50"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  {faq.category}
                </span>
                <h3 className="text-sm font-bold text-neutral-950">{faq.q}</h3>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform shrink-0 ${
                  openIndex === idx ? 'rotate-180 text-neutral-950' : ''
                }`}
              />
            </button>

            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div className="bg-neutral-100 rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-sm font-bold text-neutral-950">Could not find your answer?</h3>
        <p className="text-xs text-neutral-600 max-w-sm mx-auto">
          Our sartorial support team is ready to assist you with custom measurements or order questions.
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="px-5 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 cursor-pointer"
        >
          Contact Customer Care
        </button>
      </div>
    </div>
  );
};
