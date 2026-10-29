'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '@/lib/data';
import { Product, ProductVariant, CartItem, Order } from '@/lib/types';
import { Header } from '@/components/Header';
import { CategoryNav } from '@/components/CategoryNav';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutDrawer } from '@/components/CheckoutDrawer';
import { OrderSuccessModal } from '@/components/OrderSuccessModal';
import { OrderTrackingModal } from '@/components/OrderTrackingModal';
import { StoreAdminModal } from '@/components/StoreAdminModal';
import { TrustAndGuarantee } from '@/components/TrustAndGuarantee';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { Check, ShieldCheck, Flame, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('ghorerbazar_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Quick feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Seed sample orders in localStorage on mount
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('ghorerbazar_orders');
      if (!storedOrders) {
        const seedOrders: Order[] = [
          {
            id: 'GB-914280',
            date: '২৮ অক্টোবর, ২০২৬',
            customerName: 'তানভীর আহমেদ',
            phone: '01711223344',
            address: 'ফ্ল্যাট ৪বি, বাড়ি ১২, রোড ৭, ধানমন্ডি, ঢাকা',
            district: 'ঢাকা',
            deliveryArea: 'dhaka',
            shippingCost: 70,
            paymentMethod: 'cod',
            subtotal: 1850,
            discount: 0,
            total: 1920,
            status: 'Shipped',
            items: [
              {
                productId: 'gawa-ghee-cow-milk',
                title: 'Traditional Pure Cow Milk Gawa Ghee',
                titleBn: 'গাভী দুধের খাঁটি দানাদার গাওয়া ঘি',
                image: '/images/product_gawa_ghee_1793261887843.jpg',
                variantId: 'gg-900g',
                variantName: '900 gm',
                variantNameBn: '৯০০ গ্রাম',
                price: 1850,
                quantity: 1,
              },
            ],
          },
          {
            id: 'GB-837190',
            date: '২৭ অক্টোবর, ২০২৬',
            customerName: 'সাদিয়া জাহান',
            phone: '01899887766',
            address: 'নাসিরাবাদ হাউজিং সোসাইটি, চট্টগ্রাম',
            district: 'চট্টগ্রাম',
            deliveryArea: 'outside-dhaka',
            shippingCost: 130,
            paymentMethod: 'bkash',
            trxId: '8KJ92MA6X',
            subtotal: 1300,
            discount: 100,
            total: 1330,
            status: 'Delivered',
            items: [
              {
                productId: 'sundarban-wild-honey',
                title: 'Sundarban Raw Natural Honey',
                titleBn: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু',
                image: '/images/product_sundarban_honey_1793261887430.jpg',
                variantId: 'sb-500g',
                variantName: '500 gm',
                variantNameBn: '৫০০ গ্রাম',
                price: 650,
                quantity: 2,
              },
            ],
          },
        ];
        localStorage.setItem('ghorerbazar_orders', JSON.stringify(seedOrders));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('ghorerbazar_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, variant: ProductVariant, qty: number = 1) => {
    const existingIndex = cartItems.findIndex(
      i => i.productId === product.id && i.variantId === variant.id
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cartItems];
      updated[existingIndex].quantity += qty;
    } else {
      updated = [
        ...cartItems,
        {
          productId: product.id,
          title: product.title,
          titleBn: product.titleBn,
          image: product.image,
          variantId: variant.id,
          variantName: variant.name,
          variantNameBn: variant.nameBn,
          price: variant.price,
          quantity: qty,
        },
      ];
    }
    saveCart(updated);
    showToast(
      lang === 'bn'
        ? `✓ ${product.titleBn} (${variant.nameBn}) কার্টে যোগ হয়েছে`
        : `✓ ${product.title} added to cart`
    );
  };

  const handleQuickOrder = (product: Product, variant: ProductVariant, qty: number = 1) => {
    // Add to cart if not present, then immediately trigger checkout drawer
    const existingIndex = cartItems.findIndex(
      i => i.productId === product.id && i.variantId === variant.id
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cartItems];
      updated[existingIndex].quantity = Math.max(updated[existingIndex].quantity, qty);
    } else {
      updated = [
        ...cartItems,
        {
          productId: product.id,
          title: product.title,
          titleBn: product.titleBn,
          image: product.image,
          variantId: variant.id,
          variantName: variant.name,
          variantNameBn: variant.nameBn,
          price: variant.price,
          quantity: qty,
        },
      ];
    }
    saveCart(updated);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQty = (productId: string, variantId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, variantId);
      return;
    }
    const updated = cartItems.map(i =>
      i.productId === productId && i.variantId === variantId ? { ...i, quantity: newQty } : i
    );
    saveCart(updated);
  };

  const handleRemoveCartItem = (productId: string, variantId: string) => {
    const updated = cartItems.filter(
      i => !(i.productId === productId && i.variantId === variantId)
    );
    saveCart(updated);
  };

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    showToast(lang === 'bn' ? `✓ কুপন "${code}" সফলভাবে প্রয়োগ করা হয়েছে` : `✓ Coupon "${code}" applied`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    // Clear cart after successful order
    saveCart([]);
    setAppliedCoupon(null);
  };

  const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Filter products by category & search
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0b5c3b] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-emerald-400/40 animate-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={PRODUCTS}
        onSelectProduct={p => setSelectedProduct(p)}
        onQuickOrderProduct={p => handleQuickOrder(p, p.variants[0])}
        lang={lang}
        onToggleLang={() => setLang(prev => (prev === 'bn' ? 'en' : 'bn'))}
      />

      {/* Category Navigation Bar */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        lang={lang}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner
          onExploreClick={() => {
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickOrderHero={() => {
            const combo = PRODUCTS.find(p => p.id === 'super-healthy-family-combo');
            if (combo) {
              handleQuickOrder(combo, combo.variants[0]);
            }
          }}
          lang={lang}
        />

        {/* Product Catalog Section */}
        <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0b5c3b] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {activeCategory === 'all'
                    ? (lang === 'bn' ? 'আমাদের সকল খাঁটি পণ্য' : 'All Organic Essentials')
                    : (lang === 'bn' ? 'ক্যাটাগরি পণ্যসমূহ' : 'Category Products')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif tracking-tight mt-1">
                {activeCategory === 'all'
                  ? (lang === 'bn' ? 'জনপ্রিয় ও বিশুদ্ধ খাদ্য সামগ্রী' : 'Featured Pure Grocery Selection')
                  : (lang === 'bn'
                      ? `${PRODUCTS.find(p => p.category === activeCategory)?.categoryBn || 'পণ্য'} কালেকশন`
                      : 'Special Collection')}
              </h2>
            </div>

            <div className="text-xs text-stone-500 font-medium">
              {lang === 'bn'
                ? `মোট ${filteredProducts.length}টি পণ্য প্রদর্শিত হচ্ছে`
                : `Showing ${filteredProducts.length} items`}
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
              <p className="text-base font-bold text-stone-700">
                {lang === 'bn' ? 'কোনো পণ্য খুঁজে পাওয়া যায়নি' : 'No products found'}
              </p>
              <p className="text-xs text-stone-400">
                {lang === 'bn' ? 'অন্য কোনো নাম লিখে অনুসন্ধান করুন অথবা সকল ক্যাটাগরিতে ফিরে যান' : 'Try searching another keyword'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-2 px-4 py-2 bg-[#0b5c3b] text-white text-xs font-bold rounded-lg"
              >
                {lang === 'bn' ? 'সকল পণ্য দেখুন' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickOrder={handleQuickOrder}
                  onViewDetails={p => setSelectedProduct(p)}
                  lang={lang}
                />
              ))}
            </div>
          )}
        </section>

        {/* Trust & Guarantee Section */}
        <TrustAndGuarantee lang={lang} />

        {/* Customer FAQs */}
        <FaqSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Sticky Mobile Order Bar */}
      <MobileStickyBar
        items={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        lang={lang}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectOrder={handleQuickOrder}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        lang={lang}
      />

      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderComplete={handleOrderComplete}
        lang={lang}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        lang={lang}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        lang={lang}
      />

      <StoreAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />
    </div>
  );
}
