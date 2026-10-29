'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Printer, MessageCircle, ArrowRight, ShieldCheck, Truck, PackageCheck } from 'lucide-react';
import { Order } from '@/lib/types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  lang,
}) => {
  useEffect(() => {
    if (order) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [order]);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম, আমি ঘরের বাজারে একটি নতুন অর্ডার করেছি।\nঅর্ডার আইডি: #${order.id}\nমোট টাকা: ৳${order.total}\nনাম: ${order.customerName}\nমোবাইল: ${order.phone}\nদয়া করে অর্ডারটি দ্রুত প্রসেস করুন। ধন্যবাদ!`
    );
    window.open(`https://wa.me/8801700000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-[#0b5c3b] text-white p-6 text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-700/60 border-2 border-amber-300 flex items-center justify-center shadow-inner">
            <CheckCircle className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-serif">
            {lang === 'bn' ? 'আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!' : 'Order Placed Successfully!'}
          </h2>
          <p className="text-xs text-emerald-100 max-w-md mx-auto">
            {lang === 'bn'
              ? 'ঘরের বাজারের সাথে থাকার জন্য ধন্যবাদ। শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে ফোনে যোগাযোগ করবেন।'
              : 'Thank you for choosing Ghorer Bazar. Our representative will contact you shortly to verify.'}
          </p>
        </div>

        {/* Invoice Summary */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Order ID & Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                {lang === 'bn' ? 'অর্ডার নাম্বার' : 'Order ID'}
              </p>
              <p className="text-base font-black text-[#0b5c3b] font-mono">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                {lang === 'bn' ? 'তারিখ ও সময়' : 'Date & Time'}
              </p>
              <p className="text-xs font-medium text-stone-700">{order.date}</p>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <p className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#0b5c3b]" />
                <span>{lang === 'bn' ? 'ডেলিভারি ঠিকানা:' : 'Delivery Address:'}</span>
              </p>
              <p className="text-stone-700 font-semibold">{order.customerName}</p>
              <p className="text-stone-600 font-mono">{order.phone}</p>
              <p className="text-stone-600 mt-0.5">{order.address}</p>
            </div>

            <div>
              <p className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0b5c3b]" />
                <span>{lang === 'bn' ? 'পেমেন্ট ও স্ট্যাটাস:' : 'Payment & Status:'}</span>
              </p>
              <p className="text-stone-700">
                {order.paymentMethod === 'cod'
                  ? (lang === 'bn' ? '💵 ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা)' : '💵 Cash on Delivery')
                  : order.paymentMethod === 'bkash'
                  ? `📱 বিকাশ পেমেন্ট (TrxID: ${order.trxId || 'N/A'})`
                  : order.paymentMethod === 'nagad'
                  ? `📱 নগদ পেমেন্ট (TrxID: ${order.trxId || 'N/A'})`
                  : '💳 কার্ড পেমেন্ট'}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                <PackageCheck className="w-3 h-3 text-amber-700" />
                <span>{lang === 'bn' ? 'অর্ডার কনফার্মড (প্রসেসিং চলছে)' : 'Confirmed & Processing'}</span>
              </div>
            </div>
          </div>

          {/* Items breakdown */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-100 px-3.5 py-2 font-bold text-stone-800 flex justify-between">
              <span>{lang === 'bn' ? 'পণ্য বিবরণ' : 'Product Details'}</span>
              <span>{lang === 'bn' ? 'মূল্য' : 'Amount'}</span>
            </div>
            <div className="divide-y divide-stone-100 p-2">
              {order.items.map(item => (
                <div key={`${item.productId}-${item.variantId}`} className="py-2 px-1.5 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-stone-900">
                      {lang === 'bn' ? item.titleBn : item.title}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {lang === 'bn' ? item.variantNameBn : item.variantName} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-stone-800 tabular-nums">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="bg-stone-50 p-3 border-t border-stone-200 space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                <span className="font-mono tabular-nums">৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                <span className="font-mono tabular-nums">
                  {order.shippingCost === 0 ? '৳০ (ফ্রি)' : `৳${order.shippingCost}`}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>{lang === 'bn' ? 'কুপন ডিসকাউন্ট:' : 'Discount:'}</span>
                  <span className="font-mono tabular-nums">-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-200">
                <span>{lang === 'bn' ? 'সর্বমোট বিল:' : 'Total Payable:'}</span>
                <span className="font-mono text-[#0b5c3b] tabular-nums text-base">
                  ৳{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'রসিদ প্রিন্ট' : 'Print Invoice'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ মেসেজ' : 'WhatsApp'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0b5c3b] hover:bg-[#08452c] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
          >
            <span>{lang === 'bn' ? 'আরও কেনাকাটা করুন' : 'Continue Shopping'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
