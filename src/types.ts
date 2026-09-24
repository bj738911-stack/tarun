export type ShirtCategory =
  | 'casual'
  | 'formal'
  | 'printed'
  | 'checked'
  | 'denim'
  | 'linen'
  | 'basic'
  | 'offers'
  | 'new-arrivals';

export type GenerationStyle =
  | 'young-stylish'
  | 'smart-modern'
  | 'classic-comfortable'
  | 'basic-essential';

export type ShirtSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ShirtFit = 'Slim Fit' | 'Regular Fit' | 'Relaxed Fit' | 'Tailored Fit';

export type SleeveType = 'Full Sleeve' | 'Half Sleeve' | 'Roll-up Sleeve';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userEmail?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ShirtCategory;
  generation: GenerationStyle;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: ShirtSize[];
  fit: ShirtFit;
  sleeve: SleeveType;
  fabric: string;
  careInstructions: string[];
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  pattern: 'Solid' | 'Checked' | 'Printed' | 'Striped' | 'Textured';
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ShirtSize;
  quantity: number;
  unitPrice: number;
}

export interface Coupon {
  id?: string;
  code: string;
  discountPercent: number;
  minOrderValue?: number;
  minSpend?: number;
  description?: string;
  isActive: boolean;
  expiryDate?: string;
  expiresAt?: string;
}

export interface OrderShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus =
  | 'Placed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id?: string;
  productId: string;
  productName: string;
  productImage: string;
  color: string;
  size: ShirtSize;
  quantity: number;
  price: number;
  unitPrice?: number;
  product?: {
    name: string;
    images: string[];
    price: number;
  };
  selectedColor?: {
    name: string;
  };
  selectedSize?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: OrderShippingAddress;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'UPI / QR' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  createdAt: string;
  statusHistory: {
    status: OrderStatus;
    date: string;
    description: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  savedAddresses: OrderShippingAddress[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface BannerSettings {
  announcementText: string;
  announcementLinkText: string;
  showAnnouncement: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  heroImage: string;
}
