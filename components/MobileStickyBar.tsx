'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface MobileStickyBarProps {
  items: CartItem[];
  onOpenCart: () => void;
  onOpenCheckout: () => void;
  lang: 'bn' | 'en';
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  items,
  onOpenCart,
  onOpenCheckout,
  lang,
}) => {
  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  if (count === 0) return null;

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2.5 text-left cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-[#0b5c3b] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-stone-950 font-black text-[10px] rounded-full flex items-center justify-center ring-2 ring-white">
              {count}
            </span>
          </div>
          <div>
            <div className="text-[10px] text-stone-500 font-medium">
              {lang === 'bn' ? 'মোট কার্ট মূল্য' : 'Cart Total'}
            </div>
            <div className="text-sm font-black text-[#0b5c3b] font-mono tabular-nums leading-none">
              ৳{total.toLocaleString()}
            </div>
          </div>
        </button>

        <button
          onClick={onOpenCheckout}
          className="px-5 py-2.5 rounded-xl bg-[#0b5c3b] hover:bg-[#08452c] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/20 cursor-pointer active:scale-95"
        >
          <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Order Now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
