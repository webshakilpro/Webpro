'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { COUPONS } from '@/lib/data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, variantId: string, newQty: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  lang: 'bn' | 'en';
}

const FREE_SHIPPING_THRESHOLD = 1500;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  lang,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const cp = COUPONS[appliedCoupon];
    if (cp.type === 'percent') {
      discount = Math.round((subtotal * cp.value) / 100);
    } else if (cp.type === 'flat') {
      discount = cp.value;
    }
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      onApplyCoupon(code);
      setCouponInput('');
    } else {
      setCouponError(lang === 'bn' ? 'কুপন কোডটি সঠিক নয়' : 'Invalid coupon code');
    }
  };

  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0b5c3b]" />
              <h2 className="text-base font-bold text-stone-900 font-serif">
                {lang === 'bn' ? 'আপনার শপিং কার্ট' : 'Shopping Cart'}
              </h2>
              <span className="text-xs bg-[#0b5c3b] text-white px-2 py-0.5 rounded-full font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-emerald-50/70 p-3 border-b border-emerald-100 text-xs">
            <div className="flex items-center gap-1.5 text-stone-700 font-semibold mb-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              {remainingForFree > 0 ? (
                <span>
                  {lang === 'bn' ? 'আর মাত্র ' : 'Add '}
                  <strong className="text-[#0b5c3b]">৳{remainingForFree}</strong>
                  {lang === 'bn' ? ' টাকার পণ্য কিনলে ফ্রি ডেলিভারি!' : ' more for Free Shipping!'}
                </span>
              ) : (
                <span className="text-[#0b5c3b] font-bold">
                  {lang === 'bn' ? '🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পেয়েছেন!' : '🎉 Congratulations! You have Free Shipping!'}
                </span>
              )}
            </div>
            <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#0b5c3b] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-stone-600">
                  {lang === 'bn' ? 'আপনার কার্ট এখন খালি রয়েছে' : 'Your cart is empty'}
                </p>
                <p className="text-xs text-stone-400">
                  {lang === 'bn' ? 'খাঁটি ও প্রাকৃতিক পণ্য কিনতে পছন্দের আইটেম যোগ করুন' : 'Explore products and add items to your cart'}
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {lang === 'bn' ? item.titleBn : item.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {lang === 'bn' ? item.variantNameBn : item.variantName}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-[#0b5c3b] font-mono tabular-nums">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                        <button
                          onClick={() => onUpdateQty(item.productId, item.variantId, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-800 transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.productId, item.variantId, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-800 transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.productId, item.variantId)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              {/* Coupon input */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder={lang === 'bn' ? 'কুপন কোড (যেমন: GHORER10)' : 'Coupon code (e.g. GHORER10)'}
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-800 uppercase focus:outline-hidden focus:border-[#0b5c3b]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-bold bg-stone-800 hover:bg-stone-900 text-white rounded-lg transition-colors"
                    >
                      {lang === 'bn' ? 'প্রয়োগ' : 'Apply'}
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>{appliedCoupon} ({COUPONS[appliedCoupon]?.descBn})</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-stone-500 hover:text-rose-600 text-[11px] underline"
                    >
                      {lang === 'bn' ? 'মুছে ফেলুন' : 'Remove'}
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-stone-200/80">
                <div className="flex justify-between text-stone-600">
                  <span>{lang === 'bn' ? 'পণ্যের মোট মূল্য (Subtotal):' : 'Subtotal:'}</span>
                  <span className="font-mono font-bold tabular-nums">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{lang === 'bn' ? 'কুপন ডিসকাউন্ট:' : 'Coupon Discount:'}</span>
                    <span className="font-mono tabular-nums">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-200">
                  <span>{lang === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                  <span className="font-mono text-[#0b5c3b] tabular-nums text-base">
                    ৳{Math.max(0, subtotal - discount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 px-4 rounded-xl bg-[#0b5c3b] hover:bg-[#08452c] text-white font-bold text-sm shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                <span>{lang === 'bn' ? 'অর্ডার করতে এগিয়ে যান (Checkout)' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
