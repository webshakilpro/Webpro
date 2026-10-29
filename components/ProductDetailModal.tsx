'use client';

import React, { useState } from 'react';
import { X, Star, ShieldCheck, CheckCircle2, Zap, ShoppingBag, PhoneCall, Plus, Minus } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, qty: number) => void;
  onDirectOrder: (product: Product, variant: ProductVariant, qty: number) => void;
  lang: 'bn' | 'en';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectOrder,
  lang,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  if (!product) return null;

  const currentVariant = selectedVariant && product.variants.some(v => v.id === selectedVariant.id)
    ? selectedVariant
    : product.variants[0];

  const handleQtyChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAdd = () => {
    onAddToCart(product, currentVariant, quantity);
    onClose();
  };

  const handleOrder = () => {
    onDirectOrder(product, currentVariant, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম, আমি ঘরের বাজার থেকে এই পণ্যটি অর্ডার করতে চাই:\n\nপণ্য: ${product.titleBn}\nপরিমাণ: ${currentVariant.nameBn} (${quantity}টি)\nমূল্য: ৳${(currentVariant.price * quantity).toLocaleString()}`
    );
    window.open(`https://wa.me/8801700000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col md:flex-row border border-stone-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 shadow-xs hover:bg-white transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & Guarantees */}
        <div className="md:w-1/2 p-6 bg-stone-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
          <div className="space-y-4">
            <div className="aspect-4/3 rounded-xl overflow-hidden border border-stone-200 bg-white shadow-xs">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-200/60 space-y-1.5 text-xs text-stone-700">
              <div className="flex items-center gap-2 font-bold text-[#0b5c3b]">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ঘরের বাজার কোয়ালিটি গ্যারান্টি' : 'Ghorer Bazar Quality Guarantee'}</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {lang === 'bn'
                  ? 'প্রতিটি ব্যাচ রাসায়নিক ও ক্ষতিকর উপাদানমুক্ত। পণ্য হাতে পেয়ে চেক করে নেওয়ার ১০০% সুবিধা।'
                  : 'Every batch is chemically tested. 100% money back guarantee if you are not fully satisfied.'}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-around text-center text-xs text-stone-500 border-t border-stone-200 mt-4">
            <div>
              <p className="font-bold text-stone-800">১০০% খাঁটি</p>
              <p className="text-[10px]">কেমিক্যাল মুক্ত</p>
            </div>
            <div className="h-6 w-px bg-stone-200" />
            <div>
              <p className="font-bold text-stone-800">ল্যাব টেস্টেড</p>
              <p className="text-[10px]">মান নিশ্চিতকরণ</p>
            </div>
            <div className="h-6 w-px bg-stone-200" />
            <div>
              <p className="font-bold text-stone-800">দ্রুত ডেলিভারি</p>
              <p className="text-[10px]">২৪-৭২ ঘণ্টা</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>{lang === 'bn' ? product.categoryBn : product.category}</span>
              <span>·</span>
              <span className="text-emerald-700 font-bold">ইন স্টক (In Stock)</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 leading-snug font-serif">
              {lang === 'bn' ? product.titleBn : product.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-700">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewCount} {lang === 'bn' ? 'রিভিউ' : 'reviews'})</span>
            </div>

            {/* Price Module */}
            <div className="mt-3 py-3 px-4 bg-stone-50 rounded-xl border border-stone-200/80 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-[#0b5c3b] tabular-nums font-mono">
                  ৳{(currentVariant.price * quantity).toLocaleString()}
                </span>
                {currentVariant.originalPrice && (
                  <span className="ml-2 text-sm text-stone-400 line-through tabular-nums font-mono">
                    ৳{(currentVariant.originalPrice * quantity).toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-stone-500">
                {quantity > 1 ? `(৳${currentVariant.price} × ${quantity})` : ''}
              </span>
            </div>

            {/* Variant selector */}
            <div className="mt-4">
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                {lang === 'bn' ? 'প্যাকেট বা বোতলের মাপ নির্বাচন করুন:' : 'Select Pack Size:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = currentVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0b5c3b] bg-emerald-50 text-[#0b5c3b] ring-1 ring-[#0b5c3b]'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{lang === 'bn' ? v.nameBn : v.name}</div>
                      <div className="text-xs font-mono font-semibold text-stone-600">৳{v.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-bold text-stone-700">{lang === 'bn' ? 'পরিমাণ:' : 'Quantity:'}</span>
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => handleQtyChange(-1)}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 py-1.5 text-xs font-bold tabular-nums min-w-[32px] text-center font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQtyChange(1)}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tabs for Details vs Reviews */}
            <div className="mt-5 border-b border-stone-200 flex gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'border-[#0b5c3b] text-[#0b5c3b]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {lang === 'bn' ? 'উপকারিতা ও বিবরণ' : 'Benefits & Info'}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 transition-colors border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-[#0b5c3b] text-[#0b5c3b]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {lang === 'bn' ? 'গ্রাহকদের মতামত' : 'Customer Reviews'} ({product.reviews.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-3 text-xs text-stone-600 leading-relaxed max-h-40 overflow-y-auto pr-1">
              {activeTab === 'details' ? (
                <div className="space-y-2.5">
                  <p>{lang === 'bn' ? product.fullDescBn : product.fullDesc}</p>
                  <div className="space-y-1 pt-1">
                    <p className="font-bold text-stone-800">{lang === 'bn' ? 'প্রধান উপকারিতাসমূহ:' : 'Key Benefits:'}</p>
                    <ul className="space-y-1">
                      {(lang === 'bn' ? product.benefitsBn : product.benefits).map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {product.usageInstructionsBn && (
                    <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 mt-2">
                      <span className="font-bold text-amber-900 block mb-0.5">
                        {lang === 'bn' ? 'খাওয়ার নিয়ম:' : 'How to use:'}
                      </span>
                      <span>{product.usageInstructionsBn}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {product.reviews.map(rev => (
                    <div key={rev.id} className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-stone-800">{rev.author}</span>
                        <span className="text-stone-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400 mb-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-stone-600">{rev.comment}</p>
                      {rev.location && <p className="text-[10px] text-stone-400 mt-1">📍 {rev.location}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-stone-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className="py-2.5 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 font-semibold text-stone-800 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-stone-600" />
                <span>{lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
              </button>

              <button
                type="button"
                onClick={handleOrder}
                className="py-2.5 px-3 rounded-lg bg-[#0b5c3b] hover:bg-[#08452c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 transition-all cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>{lang === 'bn' ? 'সরাসরি অর্ডার করুন' : 'Direct Order'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার করুন (WhatsApp Order)' : 'Order via WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
