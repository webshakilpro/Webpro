'use client';

import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: 'bn' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 text-xs border-t border-stone-800">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0b5c3b] flex items-center justify-center text-white font-bold">
                <span className="text-lg font-black text-amber-300">ঘ</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight font-serif">
                {lang === 'bn' ? 'ঘরের বাজার' : 'Ghorer Bazar'}
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              {lang === 'bn'
                ? 'ঘরের বাজার বাংলাদেশের অন্যতম শীর্ষস্থানীয় নিরাপদ ও খাঁটি অর্গানিক খাদ্য পণ্যের বিশ্বস্ত প্রতিষ্ঠান। সুস্থ থাকুন, নির্ভেজাল খান।'
                : 'Bangladesh’s premier destination for 100% natural, lab-tested, safe organic foods. Eat pure, live healthy.'}
            </p>
            <div className="pt-2 text-[11px] text-stone-400">
              <p>ট্রেড লাইসেন্স নং: TRAD/DNCC/042891/2023</p>
              <p>বিএসটিআই ও নিরাপদ খাদ্য কর্তৃপক্ষ মানসম্মত</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">সুন্দরবনের খাঁটি মধু</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">খাঁটি গাওয়া ঘি ও সরিষার তেল</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">মদিনার প্রিমিয়াম আজওয়া খেজুর</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">মিক্সড নাটস ও ড্রাই ফ্রুটস</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">হোমমেড স্পেশাল আচার</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'গ্রাহক সেবা ও নীতি' : 'Customer Service'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">রিটার্ন ও মানিব্যাক পলিসি</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">ডেলিভারি চার্জ ও সময়সীমা</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">গোপনীয়তা ও শর্তাবলী</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">ল্যাব টেস্ট রিপোর্ট ও সার্টিফিকেট</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">কর্পোরেট গিফট অর্ডার</a></li>
            </ul>
          </div>

          {/* Contact & Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'যোগাযোগের ঠিকানা' : 'Contact Us'}
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>বাড়ি #৪৫, রোড #১১, সেক্টর #৪, উত্তরা, ঢাকা-১২৩০</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-stone-200">09612-002255, 01712-002255</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">support@ghorerbazar.com</span>
              </div>
            </div>

            {/* Payment Badges */}
            <div className="pt-2">
              <p className="text-[11px] text-stone-400 font-semibold mb-1">
                {lang === 'bn' ? 'অনুমোদিত পেমেন্ট পার্টনার্স:' : 'Payment Partners:'}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-1 bg-stone-800 rounded text-pink-400 border border-stone-700">bKash</span>
                <span className="px-2 py-1 bg-stone-800 rounded text-orange-400 border border-stone-700">Nagad</span>
                <span className="px-2 py-1 bg-stone-800 rounded text-purple-400 border border-stone-700">Rocket</span>
                <span className="px-2 py-1 bg-stone-800 rounded text-emerald-400 border border-stone-700">Cash on Delivery</span>
                <span className="px-2 py-1 bg-stone-800 rounded text-blue-400 border border-stone-700">Visa / Master</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800 py-4 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} Ghorer Bazar (ঘরের বাজার) - সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for pure and safe living in Bangladesh</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
