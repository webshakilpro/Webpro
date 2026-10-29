'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Phone, Truck, ShieldCheck, X, FileText, Settings, Heart } from 'lucide-react';
import { Product } from '@/lib/types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onQuickOrderProduct: (p: Product) => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenTracking,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
  products,
  onSelectProduct,
  onQuickOrderProduct,
  lang,
  onToggleLang,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.titleBn.toLowerCase().includes(q) ||
          p.categoryBn.toLowerCase().includes(q) ||
          p.shortDescBn.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery, products]);

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200">
      {/* Top Announcement Bar */}
      <div className="bg-[#0b5c3b] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'bn' ? 'হটলাইন:' : 'Hotline:'} 09612-002255</span>
            </span>
            <span className="hidden sm:inline-block text-emerald-300">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-100">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'bn' ? 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি' : 'Cash on Delivery Nationwide'}</span>
            </span>
            <span className="hidden lg:inline-block text-emerald-300">|</span>
            <span className="hidden lg:flex items-center gap-1.5 text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'bn' ? '১০০% খাঁটি ও নির্ভেজাল খাবার' : '100% Pure & Lab Tested'}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-emerald-100">
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-xs"
              title="Track your order"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span className="underline decoration-emerald-300/40 underline-offset-2">
                {lang === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}
              </span>
            </button>
            <span className="text-emerald-400">·</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-xs text-amber-200"
              title="Store Order Manager"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'bn' ? 'অর্ডার প্যানেল' : 'Orders'}</span>
            </button>
            <span className="text-emerald-400">·</span>
            <button
              onClick={onToggleLang}
              className="px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-900 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header (Top Bar Contract: Zone 1 Wordmark, Zone 2 Nav, Zone 3 Primary Action/Cart) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 text-left group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0b5c3b] to-[#08452c] flex items-center justify-center text-white font-bold shadow-sm shadow-emerald-950/20 ring-1 ring-emerald-700/30">
              <span className="text-xl font-black text-amber-300">ঘ</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b5c3b] block leading-none font-serif">
                {lang === 'bn' ? 'ঘরের বাজার' : 'Ghorer Bazar'}
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-wide uppercase block mt-1">
                {lang === 'bn' ? 'খাঁটি খাদ্যের বিশ্বস্ত ঠিকানা' : 'Pure & Organic Grocery'}
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Search Input & Category shortcuts */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder={lang === 'bn' ? 'মধু, ঘি, সরিষার তেল বা খেজুর খুঁজুন...' : 'Search honey, ghee, mustard oil, dates...'}
              className="w-full pl-10 pr-10 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#0b5c3b] focus:ring-1 focus:ring-[#0b5c3b] transition-all text-stone-800 placeholder-stone-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Live Search Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-50 divide-y divide-stone-100">
              <div className="px-3 py-1.5 bg-stone-50 text-[11px] font-medium text-stone-500">
                {lang === 'bn' ? 'অনুসন্ধানের ফলাফল' : 'Search Results'} ({searchResults.length})
              </div>
              {searchResults.map(p => (
                <div
                  key={p.id}
                  className="p-3 hover:bg-emerald-50/50 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  onClick={() => {
                    onSelectProduct(p);
                    onSearchChange('');
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-12 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">
                        {lang === 'bn' ? p.titleBn : p.title}
                      </p>
                      <p className="text-xs text-[#0b5c3b] font-medium">
                        ৳{p.variants[0]?.price.toLocaleString()} ({lang === 'bn' ? p.variants[0]?.nameBn : p.variants[0]?.name})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickOrderProduct(p);
                      onSearchChange('');
                    }}
                    className="px-3 py-1 text-xs font-semibold bg-[#0b5c3b] text-white rounded-md hover:bg-[#08452c] transition-colors shrink-0"
                  >
                    {lang === 'bn' ? 'অর্ডার করুন' : 'Order Now'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zone 3: Fast Actions & Cart Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile search toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Hotline Call Button */}
          <a
            href="tel:09612002255"
            className="hidden lg:flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#0b5c3b] bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200/60"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap font-semibold">09612-002255</span>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#0b5c3b] hover:bg-[#08452c] text-white shadow-sm transition-all hover:shadow-md cursor-pointer group active:scale-95"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 text-stone-950 font-black text-[11px] rounded-full flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-emerald-200 font-medium leading-none">
                {lang === 'bn' ? 'শপিং কার্ট' : 'Cart'}
              </div>
              <div className="text-xs font-bold text-white tabular-nums leading-tight">
                ৳{cartTotal.toLocaleString()}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-stone-100 pt-2 bg-stone-50">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder={lang === 'bn' ? 'মধু, ঘি, সরিষার তেল খুঁজুন...' : 'Search products...'}
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-800"
              autoFocus
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-lg border border-stone-200 divide-y divide-stone-100 max-h-60 overflow-y-auto">
              {searchResults.map(p => (
                <div
                  key={p.id}
                  className="p-2.5 flex items-center justify-between gap-2"
                  onClick={() => {
                    onSelectProduct(p);
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded" />
                    <p className="text-xs font-medium text-stone-900 truncate max-w-[170px]">
                      {lang === 'bn' ? p.titleBn : p.title}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#0b5c3b]">
                    ৳{p.variants[0]?.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
