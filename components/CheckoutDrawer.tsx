'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CheckCircle2, AlertCircle, ShoppingBag, CreditCard, Banknote, HelpCircle } from 'lucide-react';
import { CartItem, Order } from '@/lib/types';
import { DELIVERY_AREAS, COUPONS } from '@/lib/data';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string | null;
  onOrderComplete: (order: Order) => void;
  lang: 'bn' | 'en';
}

const FREE_SHIPPING_THRESHOLD = 1500;

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderComplete,
  lang,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'sub-dhaka' | 'outside-dhaka'>('dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [trxId, setTrxId] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate Shipping Cost
  const selectedAreaObj = DELIVERY_AREAS.find(a => a.id === deliveryArea);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon === 'FREESHIP';
  const shippingCost = isFreeShipping ? 0 : (selectedAreaObj ? selectedAreaObj.cost : 70);

  // Calculate Discount
  let discount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const cp = COUPONS[appliedCoupon];
    if (cp.type === 'percent') {
      discount = Math.round((subtotal * cp.value) / 100);
    } else if (cp.type === 'flat') {
      discount = cp.value;
    }
  }

  const grandTotal = Math.max(0, subtotal + shippingCost - discount);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.name = lang === 'bn' ? 'দয়া করে আপনার পূর্ণ নাম লিখুন' : 'Please enter your full name';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      errs.phone = lang === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)' : 'Please enter a valid 11-digit phone number';
    }

    if (!address.trim() || address.trim().length < 8) {
      errs.address = lang === 'bn' ? 'দয়া করে আপনার সম্পূর্ণ ঠিকানা দিন (বাসা নং, রোড, থানা)' : 'Please provide full address with house & road';
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
      errs.trxId = lang === 'bn' ? 'পেমেন্ট সম্পন্ন করে Transaction ID (TrxID) লিখুন' : 'Please provide Transaction ID';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `GB-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        district: district.trim(),
        deliveryArea,
        shippingCost,
        paymentMethod,
        trxId: trxId.trim() || undefined,
        specialInstructions: notes.trim() || undefined,
        items,
        subtotal,
        discount,
        total: grandTotal,
        status: 'Pending',
        couponApplied: appliedCoupon || undefined,
      };

      // Save order to localStorage for tracking and store management
      try {
        const stored = localStorage.getItem('ghorerbazar_orders');
        const ordersList: Order[] = stored ? JSON.parse(stored) : [];
        ordersList.unshift(newOrder);
        localStorage.setItem('ghorerbazar_orders', JSON.stringify(ordersList));
      } catch (e) {
        console.error('Failed to save order to localStorage', e);
      }

      setIsSubmitting(false);
      onOrderComplete(newOrder);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[#0b5c3b] text-white flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <span>{lang === 'bn' ? 'অর্ডার সম্পূর্ণ করুন (Checkout)' : 'Complete Your Order'}</span>
              </h2>
              <p className="text-xs text-emerald-100">
                {lang === 'bn' ? 'ক্যাশ অন ডেলিভারিতে অর্ডার করতে নিচের তথ্যগুলো পূরণ করুন' : 'Fill details below for Cash on Delivery'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800/80 transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Step 1: Customer Contact */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3.5">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0b5c3b] text-white flex items-center justify-center text-[10px]">1</span>
                <span>{lang === 'bn' ? 'গ্রাহকের তথ্য ও যোগাযোগের বিবরণ' : 'Customer Contact Details'}</span>
              </h3>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ আরিফুল ইসলাম' : 'e.g. John Doe'}
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-white border rounded-lg focus:outline-hidden focus:border-[#0b5c3b] ${
                    errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {lang === 'bn' ? '১১ ডিজিটের মোবাইল নম্বর' : '11-Digit Mobile Number'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={lang === 'bn' ? '017XXXXXXXX বা 018XXXXXXXX' : '017XXXXXXXX'}
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-white border rounded-lg focus:outline-hidden focus:border-[#0b5c3b] font-mono ${
                    errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                <p className="text-[10px] text-stone-500 mt-0.5">
                  {lang === 'bn' ? 'ডেলিভারি রাইডার ও অর্ডার ভেরিফিকেশনের জন্য এই নম্বরে কল দেওয়া হবে।' : 'Rider will call this number before delivery.'}
                </p>
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {lang === 'bn' ? 'ডেলিভারির সম্পূর্ণ ঠিকানা' : 'Full Delivery Address'} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder={lang === 'bn' ? 'বাসা নং, রোড নং, এলাকা, থানা ও ল্যান্ডমার্ক...' : 'House, Road, Area, Thana...'}
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-white border rounded-lg focus:outline-hidden focus:border-[#0b5c3b] ${
                    errors.address ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Step 2: Delivery Area Selection */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0b5c3b] text-white flex items-center justify-center text-[10px]">2</span>
                  <span>{lang === 'bn' ? 'ডেলিভারি এরিয়া নির্বাচন' : 'Delivery Area'}</span>
                </h3>
                {isFreeShipping && (
                  <span className="text-[11px] font-bold text-[#0b5c3b] bg-emerald-100/80 px-2 py-0.5 rounded">
                    {lang === 'bn' ? 'ফ্রি ডেলিভারি প্রযোজ্য' : 'Free Delivery Applied'}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {DELIVERY_AREAS.map(area => {
                  const isSelected = deliveryArea === area.id;
                  const effectiveCost = isFreeShipping ? 0 : area.cost;
                  return (
                    <label
                      key={area.id}
                      onClick={() => setDeliveryArea(area.id as any)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#0b5c3b] bg-emerald-50/70 ring-1 ring-[#0b5c3b]'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryArea"
                          checked={isSelected}
                          onChange={() => setDeliveryArea(area.id as any)}
                          className="accent-[#0b5c3b] w-4 h-4"
                        />
                        <div>
                          <p className="text-xs font-bold text-stone-900">
                            {lang === 'bn' ? area.nameBn : area.nameEn}
                          </p>
                          <p className="text-[11px] text-stone-500">{area.timeBn}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black font-mono tabular-nums text-stone-800">
                        {isFreeShipping ? (
                          <span className="text-emerald-700 font-bold">
                            <span className="line-through text-stone-400 mr-1">৳{area.cost}</span>
                            ৳০ (ফ্রি)
                          </span>
                        ) : (
                          `৳${area.cost}`
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0b5c3b] text-white flex items-center justify-center text-[10px]">3</span>
                <span>{lang === 'bn' ? 'মূল্য পরিশোধ পদ্ধতি (Payment Method)' : 'Payment Method'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                    paymentMethod === 'cod'
                      ? 'border-[#0b5c3b] bg-emerald-50/70 ring-1 ring-[#0b5c3b]'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#0b5c3b] mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <Banknote className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {lang === 'bn' ? 'পণ্য হাতে পেয়ে চেক করে টাকা দিন' : 'Pay in cash upon delivery'}
                    </p>
                  </div>
                </label>

                {/* bKash */}
                <label
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                    paymentMethod === 'bkash'
                      ? 'border-[#0b5c3b] bg-emerald-50/70 ring-1 ring-[#0b5c3b]'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="accent-[#0b5c3b] mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-600" />
                      <span>{lang === 'bn' ? 'বিকাশ (bKash Payment)' : 'bKash'}</span>
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {lang === 'bn' ? 'মার্চেন্ট / পার্সোনাল সেন্ড মানি' : 'Instant mobile money'}
                    </p>
                  </div>
                </label>

                {/* Nagad */}
                <label
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                    paymentMethod === 'nagad'
                      ? 'border-[#0b5c3b] bg-emerald-50/70 ring-1 ring-[#0b5c3b]'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="accent-[#0b5c3b] mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-600" />
                      <span>{lang === 'bn' ? 'নগদ (Nagad Payment)' : 'Nagad'}</span>
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {lang === 'bn' ? 'নগদ ক্যাশ আউট / পেমেন্ট' : 'Direct Nagad transfer'}
                    </p>
                  </div>
                </label>

                {/* Card / Online */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                    paymentMethod === 'card'
                      ? 'border-[#0b5c3b] bg-emerald-50/70 ring-1 ring-[#0b5c3b]'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#0b5c3b] mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                      <span>{lang === 'bn' ? 'কার্ড / ইন্টারনেট ব্যাংকিং' : 'Card / Net Banking'}</span>
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {lang === 'bn' ? 'ভিসা, মাস্টারকার্ড ও অনলাইন' : 'SSLCommerz gateway'}
                    </p>
                  </div>
                </label>
              </div>

              {/* bKash / Nagad TrxID instructions */}
              {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                <div className="p-3 bg-white rounded-lg border border-amber-300 text-xs space-y-2 mt-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>
                      {paymentMethod === 'bkash' ? 'বিকাশ পেমেন্ট নির্দেশনা:' : 'নগদ পেমেন্ট নির্দেশনা:'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    অনুগ্রহ করে আমাদের অফিশিয়াল{' '}
                    <strong>{paymentMethod === 'bkash' ? '01712-002255' : '01912-002255'}</strong> নম্বরে মোট{' '}
                    <strong className="text-[#0b5c3b]">৳{grandTotal.toLocaleString()}</strong> টাকা সেন্ড মানি করুন। এরপর নিচে আপনার ট্রানজেকশন আইডি (TrxID) দিন।
                  </p>
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Transaction ID (TrxID) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={e => setTrxId(e.target.value)}
                      placeholder="e.g. 9J47K2L9PQ"
                      className={`w-full px-3 py-1.5 text-xs bg-stone-50 border rounded-lg uppercase font-mono ${
                        errors.trxId ? 'border-rose-400' : 'border-stone-300'
                      }`}
                    />
                    {errors.trxId && <p className="text-[10px] text-rose-600 mt-0.5">{errors.trxId}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Special Instructions Note */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {lang === 'bn' ? 'অতিরিক্ত নির্দেশনা (Optional Note)' : 'Special Delivery Note'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={lang === 'bn' ? 'যেমন: বিকেলে ডেলিভারি দিলে ভালো হয়' : 'e.g. Deliver in the afternoon'}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800"
              />
            </div>

            {/* Itemized Order Summary Box */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
                <span>{lang === 'bn' ? 'অর্ডারের পণ্যসমূহ' : 'Order Items'}</span>
                <span className="text-stone-500 font-mono">({items.length}টি আইটেম)</span>
              </h4>

              <div className="divide-y divide-stone-200 max-h-48 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={`${item.productId}-${item.variantId}`} className="py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.title} className="w-9 h-9 object-cover rounded border border-stone-200" />
                      <div>
                        <p className="font-semibold text-stone-900 truncate max-w-[190px]">
                          {lang === 'bn' ? item.titleBn : item.title}
                        </p>
                        <p className="text-[10px] text-stone-500">
                          {lang === 'bn' ? item.variantNameBn : item.variantName} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-stone-800 tabular-nums">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Calculation */}
              <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{lang === 'bn' ? 'পণ্য মূল্য (Subtotal):' : 'Subtotal:'}</span>
                  <span className="font-mono tabular-nums">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Shipping Cost:'}</span>
                  <span className="font-mono tabular-nums">
                    {shippingCost === 0 ? <strong className="text-emerald-700">৳০ (ফ্রি)</strong> : `৳${shippingCost}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{lang === 'bn' ? 'কুপন ছাড়:' : 'Discount:'}</span>
                    <span className="font-mono tabular-nums">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>{lang === 'bn' ? 'সর্বমোট প্রদেয় বিল:' : 'Total Bill:'}</span>
                  <span className="font-mono text-[#0b5c3b] tabular-nums text-lg">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Order Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0b5c3b] hover:bg-[#08452c] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-98"
              >
                {isSubmitting ? (
                  <span>{lang === 'bn' ? 'অর্ডার প্রক্রিয়াধীন...' : 'Processing Order...'}</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>
                      {lang === 'bn'
                        ? `অর্ডার কনফার্ম করুন — ৳${grandTotal.toLocaleString()}`
                        : `Confirm Order — ৳${grandTotal.toLocaleString()}`}
                    </span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-stone-500 mt-2">
                🔒 {lang === 'bn' ? 'নিরাপদ চেকআউট | কোনো অগ্রিম পেমেন্টের বাধ্যবাধকতা নেই' : '100% Safe Checkout | No advance payment required'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
