import React, { useState } from 'react';

export const PrivacyTermsView: React.FC = () => {
  const [tab, setTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div id="legal-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex justify-center border-b border-neutral-200">
        <button
          onClick={() => setTab('privacy')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            tab === 'privacy'
              ? 'border-b-2 border-neutral-950 text-neutral-950 font-bold -mb-px'
              : 'text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setTab('terms')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            tab === 'terms'
              ? 'border-b-2 border-neutral-950 text-neutral-950 font-bold -mb-px'
              : 'text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Terms of Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 space-y-6 text-xs text-neutral-700 leading-relaxed">
        {tab === 'privacy' ? (
          <>
            <h1 className="text-xl font-bold text-neutral-950 font-display">
              ATTRXNWEAR Privacy Commitment
            </h1>
            <p className="text-[11px] text-neutral-400">Effective Date: January 1, 2026</p>

            <section className="space-y-2">
              <h2 className="font-bold text-neutral-950 text-sm">1. Information We Collect</h2>
              <p>
                When you browse or purchase from ATTRXNWEAR, we collect customer information necessary to fulfill orders, tailor size recommendations, and provide concierge service. This includes name, delivery address, email, telephone number, and fit preference selections.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-neutral-950 text-sm">2. Protection of Financial Data</h2>
              <p>
                All payment transactions are encrypted using TLS 1.3 and 256-bit encryption. ATTRXNWEAR does not store raw credit card numbers or banking passwords on internal servers. Transactions are securely passed to Level-1 PCI-DSS compliant payment gateways.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-neutral-950 text-sm">3. We Never Sell Your Data</h2>
              <p>
                Your personal preferences, wardrobe history, and contact coordinates will never be sold or rented to third-party data brokers.
              </p>
            </section>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-neutral-950 font-display">
              Terms & Conditions of Service
            </h1>
            <p className="text-[11px] text-neutral-400">Effective Date: January 1, 2026</p>

            <section className="space-y-2">
              <h2 className="font-bold text-neutral-950 text-sm">1. Commercial Agreement</h2>
              <p>
                By placing an order on ATTRXNWEAR, you acknowledge that you are purchasing tailored menswear subject to our manufacturing tolerances, sizing charts, and 15-day exchange policies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-neutral-950 text-sm">2. Pricing & Currency</h2>
              <p>
                All displayed prices are listed in Indian Rupees (INR, ₹). We reserve the right to modify pricing, promotional discount codes, and seasonal catalogs without prior notice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-neutral-950 text-sm">3. Intellectual Property</h2>
              <p>
                The ATTRXNWEAR trademark, photographic imagery, logo, and generational fit sizing classifications are protected under international copyright and trademark laws.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
