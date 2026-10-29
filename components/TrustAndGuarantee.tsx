'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, FlaskConical, Users, Sparkles } from 'lucide-react';

interface TrustProps {
  lang: 'bn' | 'en';
}

export const TrustAndGuarantee: React.FC<TrustProps> = ({ lang }) => {
  return (
    <section className="py-12 bg-white border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <p className="text-xs font-bold text-[#0b5c3b] uppercase tracking-wider">
            {lang === 'bn' ? 'কেন আমরা অন্যদের চেয়ে আলাদা?' : 'Why Choose Ghorer Bazar?'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
            {lang === 'bn' ? 'খাঁটি ও প্রাকৃতিক খাবারের প্রতিশ্রুতি' : 'Commitment to Authenticity and Purity'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {lang === 'bn'
              ? 'আমরা মধ্যস্বত্বভোগী ছাড়া সরাসরি তৃণমূল কৃষক ও মৌয়ালদের কাছ থেকে খাবার সংগ্রহ করি।'
              : 'Direct from authentic beekeepers, traditional dairy farmers, and certified processors.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-[#0b5c3b] flex items-center justify-center">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              {lang === 'bn' ? 'ল্যাব টেস্ট ও বিএসটিআই মান' : 'Lab Tested & BSTI Standards'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'bn'
                ? 'আমাদের মধু, সরিষার তেল ও গাওয়া ঘির প্রতিটি ব্যাচ অনুমোদিত সায়েন্স ল্যাবে টেস্ট করা হয়। কোনো প্রকার চিনি, ভেজাল বা রাসায়নিক নেই।'
                : 'Each batch is independently tested to ensure zero adulteration, artificial flavors, or synthetic additives.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              {lang === 'bn' ? '১০০% মানিব্যাক গ্যারান্টি' : '100% Satisfaction Guarantee'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'bn'
                ? 'পণ্য হাতে পেয়ে দেখে ও খেয়ে যদি সামান্যতমও অসন্তুষ্ট হন, তবে কোনো কারণ দর্শানো ছাড়াই সম্পূর্ণ মূল্য ফেরত দেওয়া হবে।'
                : 'Inspect and taste upon receiving delivery. If you are not completely satisfied, we offer a hassle-free refund.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-800 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              {lang === 'bn' ? 'সরাসরি কৃষক ও মৌয়ালদের থেকে' : 'Ethically Direct Sourced'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'bn'
                ? 'সুন্দরবনের মৌয়াল এবং প্রান্তিক খামারিদের ন্যায্যমূল্য দিয়ে সরাসরি খাঁটি পণ্য সংগ্রহ করা হয়, যা স্বাস্থ্য ও স্বাদে অনন্য।'
                : 'Directly sourced from indigenous honey gatherers and village cooperatives ensuring fair prices and top quality.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
