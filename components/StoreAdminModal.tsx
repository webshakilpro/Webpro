'use client';

import React, { useState, useEffect } from 'react';
import { X, Settings, ShoppingBag, DollarSign, Users, CheckCircle, Search, RefreshCw } from 'lucide-react';
import { Order } from '@/lib/types';

interface StoreAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const StoreAdminModal: React.FC<StoreAdminModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('ghorerbazar_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('ghorerbazar_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ghorerbazar_orders' && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!isOpen) return null;

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map(o => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    try {
      localStorage.setItem('ghorerbazar_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsCount = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold font-serif">
                {lang === 'bn' ? 'দোকানদার কন্ট্রোল প্যানেল (WooCommerce Manager)' : 'Store Admin Dashboard'}
              </h2>
              <p className="text-xs text-stone-400">
                {lang === 'bn' ? 'লাইভ অর্ডার ব্যবস্থাপনা ও সেলস হিসাব' : 'Live Order Management & Sales Metrics'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                {lang === 'bn' ? 'মোট বিক্রয় (Total Sales)' : 'Total Sales'}
              </span>
              <span className="text-2xl font-black text-[#0b5c3b] font-mono tabular-nums">
                ৳{totalSales.toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                {lang === 'bn' ? 'মোট প্রাপ্ত অর্ডার' : 'Total Orders'}
              </span>
              <span className="text-2xl font-black text-amber-900 font-mono tabular-nums">
                {orders.length}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                {lang === 'bn' ? 'বিক্রিত মোট পণ্য' : 'Total Units Sold'}
              </span>
              <span className="text-2xl font-black text-blue-900 font-mono tabular-nums">
                {totalItemsCount}
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={lang === 'bn' ? 'অর্ডার আইডি, নাম বা ফোন...' : 'Search ID, name or phone...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-800"
              >
                <option value="all">{lang === 'bn' ? 'সকল স্ট্যাটাস' : 'All Statuses'}</option>
                <option value="Pending">Pending</option>
                <option value="Packaging">Packaging</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              <button
                onClick={loadOrders}
                className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-600 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-400">
                        {lang === 'bn' ? 'এখনও কোনো অর্ডার আসেনি বা রেকর্ড খালি।' : 'No orders recorded yet.'}
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#0b5c3b]">
                          #{order.id}
                        </td>
                        <td className="p-3 font-semibold text-stone-900">
                          {order.customerName}
                          <div className="text-[10px] text-stone-400 truncate max-w-[150px]">{order.address}</div>
                        </td>
                        <td className="p-3 font-mono text-stone-700">{order.phone}</td>
                        <td className="p-3 text-stone-600">
                          {order.items.length} items
                        </td>
                        <td className="p-3 font-mono font-bold text-stone-900 tabular-nums">
                          ৳{order.total}
                        </td>
                        <td className="p-3 uppercase text-[10px] font-bold">
                          {order.paymentMethod}
                        </td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            onChange={e => handleUpdateStatus(order.id, e.target.value as Order['status'])}
                            className="text-[11px] font-bold px-2 py-1 rounded bg-stone-100 border border-stone-300 text-stone-800"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Packaging">Packaging</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
