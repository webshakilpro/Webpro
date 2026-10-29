'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/data';
import { Flame, Droplets, Sparkles, Nut, Utensils, Gift, LayoutGrid } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  lang: 'bn' | 'en';
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'honey':
      return <Droplets className="w-4 h-4 text-amber-500" />;
    case 'oil-ghee':
      return <Flame className="w-4 h-4 text-amber-600" />;
    case 'dates-nuts':
      return <Nut className="w-4 h-4 text-emerald-700" />;
    case 'spices-seeds':
      return <Sparkles className="w-4 h-4 text-emerald-600" />;
    case 'pickles':
      return <Utensils className="w-4 h-4 text-rose-500" />;
    case 'combos':
      return <Gift className="w-4 h-4 text-indigo-500" />;
    default:
      return <LayoutGrid className="w-4 h-4 text-stone-600" />;
  }
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  lang,
}) => {
  return (
    <div className="w-full bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0b5c3b] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:text-[#0b5c3b] hover:bg-emerald-50/60 border border-stone-200'
                }`}
              >
                <span>{getCategoryIcon(cat.id)}</span>
                <span>{lang === 'bn' ? cat.nameBn : cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
