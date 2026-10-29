export interface ProductVariant {
  id: string;
  name: string; // e.g. "500 gm", "1 kg", "1 Liter", "5 Liter"
  nameBn: string; // e.g. "৫০০ গ্রাম", "১ কেজি", "১ লিটার"
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  location?: string;
}

export interface Product {
  id: string;
  title: string;
  titleBn: string;
  category: 'honey' | 'oil-ghee' | 'dates-nuts' | 'spices-seeds' | 'pickles' | 'combos';
  categoryBn: string;
  image: string;
  shortDesc: string;
  shortDescBn: string;
  fullDesc: string;
  fullDescBn: string;
  benefits: string[];
  benefitsBn: string[];
  usageInstructionsBn: string;
  labTested: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  reviews: ProductReview[];
}

export interface CartItem {
  productId: string;
  title: string;
  titleBn: string;
  image: string;
  variantId: string;
  variantName: string;
  variantNameBn: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  district: string;
  deliveryArea: 'dhaka' | 'sub-dhaka' | 'outside-dhaka';
  shippingCost: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  trxId?: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Packaging' | 'Shipped' | 'Delivered' | 'Cancelled';
  couponApplied?: string;
}
