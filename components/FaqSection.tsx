'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqProps {
  lang: 'bn' | 'en';
}

export const FaqSection: React.FC<FaqProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qBn: 'শীতকালে খাঁটি মধু জমে যাওয়া কি স্বাভাবিক?',
      qEn: 'Does pure raw honey naturally crystallize in winter?',
      aBn: 'হ্যাঁ, এটি সম্পূর্ণ বৈজ্ঞানিক ও প্রাকৃতিক বিষয়। খাঁটি অপরিশোধিত প্রাকৃতিক মধুতে গ্লুকোজ ও ফ্রুক্টোজের প্রাকৃতিক ভারসাম্যের কারণে ঠান্ডা আবহাওয়ায় বা ফ্রিজে রাখলে তা দানাদার বা ক্রিমি হতে পারে। এটি খাঁটি মধুর একটি বড় প্রমাণ। সামান্য কুসুম গরম পানিতে রাখলে তা পুনরায় তরল হয়ে যায়।',
      aEn: 'Yes! Natural raw honey contains natural glucose which crystallizes in cold weather. It is one of the distinct proofs that honey has not been pasteurized or adulterated with corn syrup.'
    },
    {
      qBn: 'আপনাদের সরিষার তেলের ঝাঁঝ কেমন এবং রান্নায় কেমন লাগবে?',
      qEn: 'How pungent is the cold-pressed mustard oil?',
      aBn: 'আমাদের সরিষার তেল কাঠের ঘানিতে কম তাপে ধীরে ধীরে নিষ্কাশিত। এতে দেশি মাঘি সরিষার আসল প্রাকৃতিকভাবে ঝাঁঝালো ঘ্রাণ পুরোপুরি বজায় থাকে। ভর্তা, ইলিশ মাছ রান্না বা যে কোনো দেশি তরকারিতে অল্প দিলেই চমৎকার সুবাস ও স্বাদ ছড়ায়।',
      aEn: 'Our mustard oil is wood-churned cold-pressed, retaining the authentic natural pungency and health-giving allyl isothiocyanate.'
    },
    {
      qBn: 'অর্ডার করার পর ঢাকার ভেতরে ও বাইরে ডেলিভারি পেতে কতদিন লাগে?',
      qEn: 'What is the delivery turnaround time?',
      aBn: 'ঢাকার ভেতরে সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। আর ঢাকার বাইরে জেলা শহরগুলোতে কুরিয়ারের মাধ্যমে ২ থেকে ৩ কার্যদিবসের মধ্যে আপনার দোরগোড়ায় পণ্য পৌঁছে দেওয়া হয়।',
      aEn: 'Orders within Dhaka are delivered within 24 to 48 hours. Nationwide delivery takes 2 to 3 business days via premier couriers.'
    },
    {
      qBn: 'ক্যাশ অন ডেলিভারিতে কি পণ্য দেখে নেওয়ার সুযোগ আছে?',
      qEn: 'Can I inspect the parcel upon cash on delivery?',
      aBn: 'অবশ্যই! ডেলিভারি ম্যানের উপস্থিতিতে বক্স খুলে পণ্যের সিল ও মান দেখে নিতে পারেন। যদি কোনো পণ্য ক্ষতিগ্রস্ত হয় বা পছন্দ না হয় তবে তাৎক্ষণিক রিটার্ন করার সুযোগ রয়েছে।',
      aEn: 'Yes, you can examine the parcel with the delivery rider. We offer full peace of mind with 100% money-back guarantee.'
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b5c3b] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
            {lang === 'bn' ? 'আপনার মনে থাকা প্রশ্নের উত্তর' : 'Common Customer Inquiries'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-800 hover:text-[#0b5c3b] transition-colors cursor-pointer"
                >
                  <span>{lang === 'bn' ? faq.qBn : faq.qEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0b5c3b]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-150">
                    {lang === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
