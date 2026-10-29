'use client';

import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Zap, Check } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
  onQuickOrder: (product: Product, variant: ProductVariant) => void;
  onViewDetails: (product: Product) => void;
  lang: 'bn' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickOrder,
  onViewDetails,
  lang,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { id: 'default', name: 'Standard', nameBn: 'স্ট্যান্ডার্ড', price: 0, inStock: true }
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickOrder(product, selectedVariant);
  };

  const discountPercent =
    selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price
      ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
      : null;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-xl border border-stone-200 hover:border-emerald-700/40 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quick View Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-white/90 backdrop-blur-xs text-stone-700 hover:text-[#0b5c3b] hover:bg-white shadow-xs transition-colors opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Discount Tag */}
        {discountPercent && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-stone-950 shadow-xs">
            {discountPercent}% {lang === 'bn' ? 'ছাড়' : 'OFF'}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-emerald-800">
              {lang === 'bn' ? product.categoryBn : product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
              <span className="font-bold text-stone-800 text-[11px]">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#0b5c3b] transition-colors line-clamp-2 leading-snug">
            {lang === 'bn' ? product.titleBn : product.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {lang === 'bn' ? product.shortDescBn : product.shortDesc}
          </p>
        </div>

        <div>
          {/* Weight / Variant Selector */}
          {product.variants.length > 1 && (
            <div className="pt-1 pb-2">
              <label className="text-[11px] font-medium text-stone-500 block mb-1">
                {lang === 'bn' ? 'পরিমাণ নির্বাচন করুন:' : 'Select Size:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariant(v);
                      }}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all ${
                        isSelected
                          ? 'border-[#0b5c3b] bg-emerald-50 text-[#0b5c3b]'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {lang === 'bn' ? v.nameBn : v.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 pb-2.5">
            <span className="text-lg font-black text-[#0b5c3b] tabular-nums font-mono">
              ৳{selectedVariant.price.toLocaleString()}
            </span>
            {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
              <span className="text-xs text-stone-400 line-through tabular-nums font-mono">
                ৳{selectedVariant.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-[11px] text-stone-500">
              / {lang === 'bn' ? selectedVariant.nameBn : selectedVariant.name}
            </span>
          </div>

          {/* Dual Action Buttons: Add to Cart & Fast Order (WooCommerce style) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAdd}
              className={`py-2 px-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'যোগ হয়েছে' : 'Added'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-stone-600" />
                  <span className="truncate">{lang === 'bn' ? 'কার্টে রাখুন' : 'Add to Cart'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleOrder}
              className="py-2 px-2 rounded-lg bg-[#0b5c3b] hover:bg-[#08452c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span className="truncate">{lang === 'bn' ? 'অর্ডার করুন' : 'Buy Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
