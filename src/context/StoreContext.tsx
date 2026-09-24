import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ShirtCategory,
  GenerationStyle,
  ShirtSize,
  ProductColor,
  CartItem,
  Coupon,
  Order,
  OrderStatus,
  OrderShippingAddress,
  User,
  Review,
  BannerSettings,
  BlogPost
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/products';
import { INITIAL_BLOGS, INITIAL_COUPONS } from '../data/blogs';

interface StoreContextType {
  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  navigateTo: (
    view: string,
    payload?: {
      productId?: string;
      category?: ShirtCategory | 'all';
      generation?: GenerationStyle | 'all';
      blogId?: string;
      policy?: string;
      orderId?: string;
    }
  ) => void;
  currentProductId: string | null;
  currentBlogPostId: string | null;
  currentBlogId: string | null;
  currentOrderId: string | null;
  currentCategoryFilter: ShirtCategory | 'all';
  setCurrentCategoryFilter: (cat: ShirtCategory | 'all') => void;
  currentGenerationFilter: GenerationStyle | 'all';
  setCurrentGenerationFilter: (gen: GenerationStyle | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Products & Reviews
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (productOrId: Product | string, updates?: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (reviewId: string, status: 'approved' | 'rejected') => void;
  approveReview: (reviewId: string) => void;
  rejectReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, selectedSize: ShirtSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  shippingCost: number;
  cartTotal: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCouponStatus: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: OrderShippingAddress, paymentMethod: 'Credit Card' | 'Debit Card' | 'UPI / QR' | 'Cash on Delivery') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  lastCompletedOrder: Order | null;
  trackOrderSearch: (orderNumber: string, emailOrPhone?: string) => Order | null;

  // User & Auth
  currentUser: User | null;
  loginUser: (email: string, role?: 'customer' | 'admin') => void;
  registerUser: (name: string, email: string, phone?: string) => void;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  updateAddresses: (addresses: OrderShippingAddress[]) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isQuickViewOpen: boolean;
  setIsQuickViewOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Banner & Settings
  bannerSettings: BannerSettings;
  updateBannerSettings: (settings: Partial<BannerSettings>) => void;

  // Blogs
  blogs: BlogPost[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ATX-849201',
    customerName: 'Marcus Sterling',
    customerEmail: 'customer@attrxnwear.com',
    customerPhone: '+91 98201 44589',
    items: [
      {
        productId: 'prod-01',
        productName: 'Riviera Washed Oxford Shirt',
        productImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
        color: 'Sky Blue',
        size: 'L',
        quantity: 1,
        price: 799
      },
      {
        productId: 'prod-09',
        productName: 'Selvedge Heritage Western Denim Shirt',
        productImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
        color: 'Indigo Stonewash',
        size: 'L',
        quantity: 1,
        price: 999
      }
    ],
    subtotal: 1798,
    discount: 180,
    shippingFee: 0,
    tax: 90,
    total: 1708,
    status: 'Shipped',
    shippingAddress: {
      fullName: 'Marcus Sterling',
      email: 'customer@attrxnwear.com',
      phone: '+91 98201 44589',
      addressLine1: '42, Bandra West, Hill Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      country: 'India'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    trackingNumber: 'FX-889104820IN',
    carrier: 'Blue Dart Air Express',
    estimatedDelivery: 'Tomorrow by 7:00 PM',
    createdAt: '2026-09-17T14:30:00Z',
    statusHistory: [
      { status: 'Placed', date: '2026-09-17 14:30', description: 'Order confirmed and payment verified' },
      { status: 'Processing', date: '2026-09-17 18:00', description: 'Tailoring inspection and custom folding' },
      { status: 'Packed', date: '2026-09-18 09:15', description: 'Packed in signature ATTRXN box with cedar sachet' },
      { status: 'Shipped', date: '2026-09-18 16:45', description: 'In transit via Blue Dart Air Express' }
    ]
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentProductId, setCurrentProductId] = useState<string | null>('prod-01');
  const [currentBlogPostId, setCurrentBlogPostId] = useState<string | null>('blog-1');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>('ord-101');
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<ShirtCategory | 'all'>('all');
  const [currentGenerationFilter, setCurrentGenerationFilter] = useState<GenerationStyle | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('attrxn_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const allInRange = parsed.every((p: any) => typeof p.price === 'number' && p.price >= 700 && p.price <= 1000);
          if (allInRange) {
            return parsed;
          }
        }
        return INITIAL_PRODUCTS;
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('attrxn_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('attrxn_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const allInRange = parsed.every((item: any) => item.unitPrice >= 700 && item.unitPrice <= 1000);
          if (allInRange) return parsed;
        }
        return [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('attrxn_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['prod-01', 'prod-11'];
      }
    }
    return ['prod-01', 'prod-11'];
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('attrxn_coupons');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (parsed.some((c: any) => c.minOrderValue && c.minOrderValue > 3000)) {
            return INITIAL_COUPONS;
          }
          return parsed;
        }
        return INITIAL_COUPONS;
      } catch {
        return INITIAL_COUPONS;
      }
    }
    return INITIAL_COUPONS;
  });
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('attrxn_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (parsed.some((o: any) => o.items && o.items.some((i: any) => i.price > 1000 || i.price < 700))) {
            return SEED_ORDERS;
          }
          return parsed;
        }
        return SEED_ORDERS;
      } catch {
        return SEED_ORDERS;
      }
    }
    return SEED_ORDERS;
  });
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  // User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('attrxn_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return {
      id: 'usr-1',
      name: 'Marcus Sterling',
      email: 'customer@attrxnwear.com',
      phone: '+91 98201 44589',
      role: 'customer',
      savedAddresses: [
        {
          fullName: 'Marcus Sterling',
          email: 'customer@attrxnwear.com',
          phone: '+91 98201 44589',
          addressLine1: '42, Bandra West, Hill Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400050',
          country: 'India'
        }
      ]
    };
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Banners & Content
  const [bannerSettings, setBannerSettings] = useState<BannerSettings>(() => {
    const saved = localStorage.getItem('attrxn_banners');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.announcementText && (parsed.announcementText.includes('$') || parsed.announcementText.includes('999'))) {
          parsed.announcementText = 'Complimentary Express Shipping on Orders Over ₹1,499 | Code FIRST10 for 10% Off';
        }
        return parsed;
      } catch {
        // default
      }
    }
    return {
      announcementText: 'Complimentary Express Shipping on Orders Over ₹1,499 | Code FIRST10 for 10% Off',
      announcementLinkText: 'Shop New Arrivals',
      showAnnouncement: true,
      heroHeadline: 'Style That Fits Every Man.',
      heroSubheadline: "Discover ATTRXNWEAR's collection of men's shirts—from young and stylish designs to classic and timeless essentials.",
      heroBadge: 'The 2026 Collection',
      heroImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1600&q=85'
    };
  });

  const blogs = INITIAL_BLOGS;

  // Persist states to LocalStorage
  useEffect(() => {
    localStorage.setItem('attrxn_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('attrxn_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('attrxn_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('attrxn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('attrxn_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('attrxn_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('attrxn_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('attrxn_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('attrxn_banners', JSON.stringify(bannerSettings));
  }, [bannerSettings]);

  // View Navigation Helper
  const navigateTo = (
    view: string,
    payload?: {
      productId?: string;
      category?: ShirtCategory | 'all';
      generation?: GenerationStyle | 'all';
      blogId?: string;
      policy?: string;
      orderId?: string;
    }
  ) => {
    if (payload?.productId) setCurrentProductId(payload.productId);
    if (payload?.category !== undefined) setCurrentCategoryFilter(payload.category);
    if (payload?.generation !== undefined) setCurrentGenerationFilter(payload.generation);
    if (payload?.blogId) setCurrentBlogPostId(payload.blogId);
    if (payload?.orderId) setCurrentOrderId(payload.orderId);

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, selectedColor: ProductColor, selectedSize: ShirtSize, quantity: number = 1) => {
    const itemKey = `${product.id}-${selectedColor.name}-${selectedSize}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity,
          unitPrice: product.price
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const discountAmount = activeCoupon
    ? Number(((cartSubtotal * activeCoupon.discountPercent) / 100).toFixed(2))
    : 0;

  // Free shipping over ₹1,499
  const shippingCost = cartSubtotal === 0 || cartSubtotal >= 1499 ? 0 : 99;
  const cartTotal = Math.round(cartSubtotal - discountAmount + shippingCost);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Quick view
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === formatted && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (found.minOrderValue && cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of ₹${found.minOrderValue.toLocaleString('en-IN')}.`
      };
    }
    setActiveCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied: ${found.discountPercent}% OFF!` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  // Orders
  const placeOrder = (
    shippingAddress: OrderShippingAddress,
    paymentMethod: 'Credit Card' | 'Debit Card' | 'UPI / QR' | 'Cash on Delivery'
  ): Order => {
    const orderNum = `ATX-${Math.floor(100000 + Math.random() * 900000)}`;
    const tax = Math.round(cartSubtotal * 0.05); // 5% GST on apparel
    const finalTotal = Math.round(cartSubtotal - discountAmount + shippingCost + tax);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: shippingAddress.fullName,
      customerEmail: shippingAddress.email,
      customerPhone: shippingAddress.phone,
      items: cart.map((ci) => ({
        productId: ci.productId,
        productName: ci.product.name,
        productImage: ci.product.images[0],
        color: ci.selectedColor.name,
        size: ci.selectedSize,
        quantity: ci.quantity,
        price: ci.unitPrice
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee: shippingCost,
      tax,
      total: finalTotal,
      status: 'Placed',
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      trackingNumber: `TX-${Math.floor(100000000 + Math.random() * 900000000)}`,
      carrier: 'ATTRXN Express Air',
      estimatedDelivery: '3-4 Business Days',
      createdAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'Placed',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          description: 'Order placed and being routed to ATTRXN fulfillment center.'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nowStr = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          return {
            ...ord,
            status,
            statusHistory: [
              ...ord.statusHistory,
              {
                status,
                date: nowStr,
                description: `Status updated to ${status}`
              }
            ]
          };
        }
        return ord;
      })
    );
  };

  const trackOrderSearch = (orderNumber: string, emailOrPhone?: string) => {
    const cleaned = orderNumber.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === cleaned ||
        o.trackingNumber.toUpperCase() === cleaned ||
        (emailOrPhone &&
          (o.customerEmail.toLowerCase() === emailOrPhone.trim().toLowerCase() ||
            o.customerPhone.includes(emailOrPhone.trim())))
    );
    return found || null;
  };

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (productOrId: Product | string, updates?: Partial<Product>) => {
    if (typeof productOrId === 'string') {
      setProducts((prev) =>
        prev.map((p) => (p.id === productOrId ? { ...p, ...(updates || {}) } : p))
      );
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === productOrId.id ? productOrId : p))
      );
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Reviews CRUD
  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'status'>) => {
    const rev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'approved' // auto-approve in demo
    };
    setReviews((prev) => [rev, ...prev]);
    // update product rating & reviewCount
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === newRev.productId) {
          const newCount = p.reviewCount + 1;
          const newRating = Number(((p.rating * p.reviewCount + newRev.rating) / newCount).toFixed(1));
          return { ...p, reviewCount: newCount, rating: newRating };
        }
        return p;
      })
    );
  };

  const updateReviewStatus = (reviewId: string, status: 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
  };

  const approveReview = (reviewId: string) => updateReviewStatus(reviewId, 'approved');
  const rejectReview = (reviewId: string) => updateReviewStatus(reviewId, 'rejected');

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  // User Auth
  const loginUser = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const nameFromEmail = email.split('@')[0].replace('.', ' ');
    const formattedName = nameFromEmail
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const userObj: User = {
      id: `usr-${Date.now()}`,
      name: role === 'admin' ? 'Admin Director' : formattedName || 'Marcus Sterling',
      email,
      phone: '+1 (555) 019-2834',
      role,
      savedAddresses: [
        {
          fullName: formattedName || 'Marcus Sterling',
          email,
          phone: '+1 (555) 019-2834',
          addressLine1: '742 Evergreen Terrace',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'United States'
        }
      ]
    };
    setCurrentUser(userObj);
    setIsAuthModalOpen(false);
  };

  const registerUser = (name: string, email: string, phone: string = '+1 (555) 019-2834') => {
    const userObj: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      savedAddresses: [
        {
          fullName: name,
          email,
          phone,
          addressLine1: '124 Fashion Boulevard, Suite 400',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'United States'
        }
      ]
    };
    setCurrentUser(userObj);
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const updateAddresses = (addresses: OrderShippingAddress[]) => {
    if (currentUser) {
      updateUserProfile({ savedAddresses: addresses });
    }
  };

  const updateBannerSettings = (settings: Partial<BannerSettings>) => {
    setBannerSettings((prev) => ({ ...prev, ...settings }));
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        currentProductId,
        currentBlogPostId,
        currentBlogId: currentBlogPostId,
        currentOrderId,
        currentCategoryFilter,
        setCurrentCategoryFilter,
        currentGenerationFilter,
        setCurrentGenerationFilter,
        searchQuery,
        setSearchQuery,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        reviews,
        addReview,
        updateReviewStatus,
        approveReview,
        rejectReview,
        deleteReview,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingCost,
        cartTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        coupons,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,

        orders,
        placeOrder,
        updateOrderStatus,
        lastCompletedOrder,
        trackOrderSearch,

        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        updateAddresses,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,

        isCartOpen,
        setIsCartOpen,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        openQuickView,
        isSizeGuideOpen,
        setIsSizeGuideOpen,

        bannerSettings,
        updateBannerSettings,

        blogs
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
