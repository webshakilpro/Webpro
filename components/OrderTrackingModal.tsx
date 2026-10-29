'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Order } from '@/lib/types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [query, setQuery] = useState('');
  const [recentOrders, setRecentOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('ghorerbazar_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('ghorerbazar_orders');
      if (stored) {
        const list: Order[] = JSON.parse(stored);
        return list[0] || null;
      }
    } catch {
      return null;
    }
    return null;
  });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ghorerbazar_orders' && e.newValue) {
        try {
          const list = JSON.parse(e.newValue);
          setRecentOrders(list);
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const q = query.trim().toUpperCase().replace('#', '');
    if (!q) return;

    try {
      const stored = localStorage.getItem('ghorerbazar_orders');
      const list: Order[] = stored ? JSON.parse(stored) : [];
      const found = list.find(o => o.id.toUpperCase() === q || o.phone.includes(q));

      if (found) {
        setSearchedOrder(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (e) {
      setNotFound(true);
    }
  };

  const getTimelineSteps = (status: Order['status']) => {
    const steps = [
      { id: 'Pending', labelBn: 'অর্ডার গৃহীত হয়েছে', descBn: 'অর্ডার নিশ্চিতকরণ সম্পন্ন' },
      { id: 'Packaging', labelBn: 'প্যাকেজিং চলছে', descBn: 'খাঁটি পণ্য বাছাই ও সিল্ড প্যাক' },
      { id: 'Shipped', labelBn: 'কুরিয়ারে হস্তান্তর', descBn: 'আপনার ঠিকানায় যাত্রা শুরু' },
      { id: 'Delivered', labelBn: 'ডেলিভারি সম্পন্ন', descBn: 'পণ্য সফলভাবে পৌঁছেছে' },
    ];

    let activeIndex = 0;
    if (status === 'Confirmed' || status === 'Pending') activeIndex = 0;
    if (status === 'Packaging') activeIndex = 1;
    if (status === 'Shipped') activeIndex = 2;
    if (status === 'Delivered') activeIndex = 3;

    return steps.map((s, idx) => ({
      ...s,
      completed: idx <= activeIndex,
      isCurrent: idx === activeIndex,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#0b5c3b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-base font-bold font-serif">
                {lang === 'bn' ? 'অর্ডার ট্র্যাকিং সিস্টেম' : 'Order Tracking System'}
              </h2>
              <p className="text-xs text-emerald-100">
                {lang === 'bn' ? 'আপনার অর্ডার নম্বর বা ফোন নম্বর দিয়ে ট্র্যাক করুন' : 'Track order with ID or Phone'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={lang === 'bn' ? 'অর্ডার আইডি (যেমন: GB-123456) বা ফোন নম্বর দিন' : 'Order ID or Phone number'}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#0b5c3b]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0b5c3b] hover:bg-[#08452c] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'অনুসন্ধান' : 'Track'}
            </button>
          </form>

          {notFound && (
            <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'উক্ত অর্ডার বা নম্বরের কোনো তথ্য পাওয়া যায়নি। অনুগ্রহ করে সঠিক নম্বর দিন।'
                  : 'No order found with this ID or phone number.'}
              </span>
            </div>
          )}

          {/* Searched / Selected Order Display */}
          {searchedOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
                    {lang === 'bn' ? 'অর্ডার ট্র্যাকিং আইডি' : 'Tracking ID'}
                  </span>
                  <span className="text-base font-black text-[#0b5c3b] font-mono">
                    #{searchedOrder.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
                    {lang === 'bn' ? 'বর্তমান স্ট্যাটাস' : 'Current Status'}
                  </span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    {searchedOrder.status}
                  </span>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-4">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  {lang === 'bn' ? 'ডেলিভারি অগ্রগতি' : 'Delivery Progress'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {getTimelineSteps(searchedOrder.status).map((step, idx) => (
                    <div
                      key={step.id}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        step.completed
                          ? 'border-[#0b5c3b] bg-emerald-50/70 text-[#0b5c3b]'
                          : 'border-stone-200 bg-stone-50 text-stone-400'
                      }`}
                    >
                      <div className="w-7 h-7 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-1.5 shadow-xs bg-white">
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <span className="text-stone-400">{idx + 1}</span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-stone-800">{step.labelBn}</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">{step.descBn}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info Summary */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">গ্রাহকের নাম:</span>
                  <span className="font-bold text-stone-800">{searchedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">মোবাইল:</span>
                  <span className="font-mono text-stone-800">{searchedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">ঠিকানা:</span>
                  <span className="text-stone-800 max-w-[280px] text-right truncate">{searchedOrder.address}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-200 font-bold">
                  <span>সর্বমোট বিল:</span>
                  <span className="font-mono text-[#0b5c3b]">৳{searchedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick List of Stored Recent Orders */}
          {recentOrders.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                {lang === 'bn' ? 'আপনার সাম্প্রতিক অর্ডারসমূহ' : 'Your Recent Orders'}
              </h4>
              <div className="space-y-2">
                {recentOrders.map(order => (
                  <div
                    key={order.id}
                    onClick={() => setSearchedOrder(order)}
                    className="p-3 rounded-lg border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-stone-900 font-mono">#{order.id}</p>
                      <p className="text-[11px] text-stone-500">{order.date} · {order.items.length}টি পণ্য</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-[#0b5c3b] font-mono">৳{order.total}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-bold">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
