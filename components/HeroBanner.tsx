'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onQuickOrderHero: () => void;
  lang: 'bn' | 'en';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onQuickOrderHero,
  lang,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0b5c3b] tracking-wide uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? '১০০% প্রাকৃতিক ও নিরাপদ খাবারের নিশ্চয়তা' : '100% Pure & Natural Food Guarantee'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-[1.2] tracking-tight font-serif text-balance">
              {lang === 'bn'
                ? 'সুস্থ ও দীর্ঘায়ু জীবনের জন্য খাঁটি ও নির্ভেজাল খাবার'
                : 'Pure & Organic Superfoods for a Healthier Family'}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              {lang === 'bn'
                ? 'সুন্দরবনের গভীর জঙ্গলের চাকের মধু, খাঁটি গাভী দুধের গাওয়া ঘি, কাঠের ঘানি ভাঙা সরিষার তেল ও প্রিমিয়াম মদিনার খেজুর। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।'
                : 'Directly sourced raw Sundarban honey, artisanal bilona cow ghee, cold-pressed wood-churned mustard oil, and premium dates. Fast cash on delivery nationwide.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onQuickOrderHero}
                className="px-6 py-3 rounded-lg bg-[#0b5c3b] hover:bg-[#08452c] text-white font-bold text-sm shadow-md shadow-emerald-950/15 flex items-center gap-2.5 transition-all hover:gap-3 cursor-pointer group active:scale-95"
              >
                <span>{lang === 'bn' ? 'ফ্যামিলি কম্বো অর্ডার করুন' : 'Order Family Mega Pack'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-5 py-3 rounded-lg bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-semibold text-sm transition-all hover:bg-stone-50 cursor-pointer"
              >
                {lang === 'bn' ? 'সকল পণ্য দেখুন' : 'Explore All Products'}
              </button>
            </div>

            {/* Quick Proof Metatags */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-3 border-t border-stone-200/80">
              <span className="font-semibold text-stone-700">✓ ৫০,০০০+ সন্তুষ্ট পরিবার</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="font-semibold text-stone-700">✓ ফ্রি ডেলিভারি (৳১৫০০+ অর্ডারে)</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="font-semibold text-stone-700">✓ মানিব্যাক গ্যারান্টি</span>
            </div>
          </div>

          {/* Right Column: High-Res Commercial Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group">
              <img
                src="/images/hero_organic_groceries_1793261887114.jpg"
                alt="Ghorer Bazar Organic Products"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  {lang === 'bn' ? 'স্পেশাল হট ডিল' : 'Special Hot Deal'}
                </p>
                <p className="text-sm font-bold truncate">
                  {lang === 'bn' ? 'ফ্যামিলি ইমিউনিটি মেগা প্যাক - ৪০০ টাকা ছাড়!' : 'Family Immunity Mega Combo - ৳400 Off!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-Column KPI Trust Strip */}
      <div className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0b5c3b] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">
                  {lang === 'bn' ? 'সারা দেশে ডেলিভারি' : 'Nationwide Delivery'}
                </p>
                <p className="text-[11px] text-stone-500">
                  {lang === 'bn' ? '২৪-৭২ ঘণ্টায় বাসায় পৌঁছাবে' : 'Within 24-72 hours'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">
                  {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
                </p>
                <p className="text-[11px] text-stone-500">
                  {lang === 'bn' ? 'পণ্য হাতে পেয়ে টাকা দিন' : 'Pay after receiving'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0b5c3b] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">
                  {lang === 'bn' ? '১০০% খাঁটি খাদ্য' : '100% Pure Food'}
                </p>
                <p className="text-[11px] text-stone-500">
                  {lang === 'bn' ? 'ল্যাব টেস্ট ও বিএসটিআই মান' : 'Lab Tested & BSTI Standard'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">
                  {lang === 'bn' ? 'মানিব্যাক গ্যারান্টি' : 'Money-Back Guarantee'}
                </p>
                <p className="text-[11px] text-stone-500">
                  {lang === 'bn' ? 'সন্তুষ্ট না হলে ১০০% ফেরত' : 'Full refund if not satisfied'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
