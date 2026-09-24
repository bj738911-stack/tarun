import React from 'react';
import { Shield, Sparkles, Heart, Award, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div id="about-brand-page" className="space-y-16 py-8 sm:py-12">
      {/* Brand Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
          The ATTRXNWEAR Manifesto
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 font-display leading-tight">
          "From Young & Stylish to Classic & Timeless — Shirts for Every Man."
        </h1>
        <p className="text-xs sm:text-base text-neutral-600 leading-relaxed pt-2">
          ATTRXNWEAR was founded with a clear sartorial mission: to reject fast-fashion compromises and build shirts of generational craftsmanship. We believe every man deserves a shirt that honors his personality, physical posture, and life stage.
        </p>
      </div>

      {/* Visual Storytelling Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-neutral-100 rounded-3xl p-8 sm:p-12">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Our Origin & Obsession
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-display">
              Tailoring Without Compromise
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Most modern shirts are mass-produced with synthetics that trap heat, lose collar shape after two washes, and cling uncomfortably to the torso. ATTRXNWEAR set out to change this paradigm by engineering shirts made solely from long-staple natural fibers: Egyptian Giza cotton, American Supima, and organic French flax.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Our patterns are drawn from bespoke British and Neapolitan tailoring traditions—incorporating split yokes, French seams, mother-of-pearl buttons, and German interlinings that keep collars structured for life.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80"
              alt="Shirt Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Pillars of Integrity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-neutral-950 font-display">
            The Four Pillars of ATTRXNWEAR
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Our uncompromising code of design and ethics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center space-y-2">
            <Award className="w-8 h-8 mx-auto text-amber-700 mb-2" />
            <h3 className="text-sm font-bold text-neutral-950">Ethical Provenance</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We partner directly with family-run Italian and Japanese mills holding OEKO-TEX and GOTS eco-certifications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center space-y-2">
            <Shield className="w-8 h-8 mx-auto text-amber-700 mb-2" />
            <h3 className="text-sm font-bold text-neutral-950">Micro-Batch Tailoring</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every shirt is hand-cut in small batches to ensure stitch tension, stripe alignment, and zero pattern warping.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center space-y-2">
            <Sparkles className="w-8 h-8 mx-auto text-amber-700 mb-2" />
            <h3 className="text-sm font-bold text-neutral-950">Generational Fits</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Silhouettes specifically calculated for different stages of life—from 20s nightlife to 50s dignified ease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center space-y-2">
            <Heart className="w-8 h-8 mx-auto text-amber-700 mb-2" />
            <h3 className="text-sm font-bold text-neutral-950">15-Day Free Fit Trial</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Experience the fabric at home. If the drape or sleeve is not immaculate, our concierge handles exchanges gratis.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
        >
          <span>Explore The Master Collection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
