import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  User as UserIcon,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  LogOut,
  Package
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShirtCategory, GenerationStyle } from '../types';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    cartSubtotal,
    wishlist,
    currentUser,
    logoutUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    products,
    bannerSettings
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.pattern.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all duration-200">
      {/* 1. Announcement Bar */}
      {bannerSettings.showAnnouncement && (
        <div
          id="announcement-bar"
          className="bg-neutral-900 text-neutral-100 text-xs py-2 px-4 flex items-center justify-between tracking-wide"
        >
          <div className="flex-1 text-center font-medium truncate px-2">
            <span>{bannerSettings.announcementText}</span>
            <button
              id="announcement-link-btn"
              onClick={() => navigateTo('shop', { category: 'new-arrivals' })}
              className="ml-2.5 underline underline-offset-4 hover:text-amber-300 font-semibold cursor-pointer inline-flex items-center gap-1 transition-colors"
            >
              {bannerSettings.announcementLinkText}
              <ArrowRight className="w-3 h-3 inline" />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-neutral-400">
            <button
              id="topbar-track-order-btn"
              onClick={() => navigateTo('order-tracking')}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Truck className="w-3 h-3" />
              <span>Track Order</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button
              id="topbar-admin-toggle-btn"
              onClick={() => navigateTo('admin')}
              className="hover:text-amber-400 flex items-center gap-1 text-amber-300 cursor-pointer font-medium transition-colors"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-800 hover:text-neutral-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={() => navigateTo('home')}
              className="flex flex-col items-start cursor-pointer group text-left"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-display group-hover:text-neutral-700 transition-colors">
                ATTRXN<span className="font-light text-neutral-500">WEAR</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-semibold -mt-1 hidden sm:inline">
                Shirts for Every Man
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={`hover:text-neutral-950 transition-colors py-2 cursor-pointer ${
                currentView === 'home' ? 'text-neutral-950 font-semibold' : ''
              }`}
            >
              Home
            </button>

            <button
              id="nav-shop-btn"
              onClick={() => navigateTo('shop', { category: 'all', generation: 'all' })}
              className={`hover:text-neutral-950 transition-colors py-2 cursor-pointer ${
                currentView === 'shop' ? 'text-neutral-950 font-semibold' : ''
              }`}
            >
              Shop All
            </button>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              onMouseLeave={() => setIsCategoryMenuOpen(false)}
            >
              <button
                id="nav-categories-dropdown-btn"
                className="hover:text-neutral-950 transition-colors py-2 flex items-center gap-1 cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryMenuOpen && (
                <div
                  id="categories-mega-dropdown"
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-xl shadow-xl border border-neutral-100 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                      By Category
                    </span>
                    <div className="space-y-1">
                      {[
                        { name: 'Casual Shirts', cat: 'casual' as ShirtCategory },
                        { name: 'Formal Shirts', cat: 'formal' as ShirtCategory },
                        { name: 'Printed Shirts', cat: 'printed' as ShirtCategory },
                        { name: 'Checked Shirts', cat: 'checked' as ShirtCategory },
                        { name: 'Denim Shirts', cat: 'denim' as ShirtCategory },
                        { name: 'Linen Shirts', cat: 'linen' as ShirtCategory },
                        { name: 'Basic Shirts', cat: 'basic' as ShirtCategory },
                      ].map((item) => (
                        <button
                          key={item.cat}
                          onClick={() => {
                            navigateTo('shop', { category: item.cat });
                            setIsCategoryMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 rounded-md transition-colors block cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                      By Generation & Style
                    </span>
                    <div className="space-y-1">
                      {[
                        { label: 'Young & Stylish (18–30)', gen: 'young-stylish' as GenerationStyle, desc: 'Trendy, bold, relaxed' },
                        { label: 'Smart & Modern (30–45)', gen: 'smart-modern' as GenerationStyle, desc: 'Work, dinners, tailored' },
                        { label: 'Classic & Comfortable (45+)', gen: 'classic-comfortable' as GenerationStyle, desc: 'Timeless, regular fit' },
                        { label: 'Basic & Essential', gen: 'basic-essential' as GenerationStyle, desc: 'Everyday pima cotton' },
                      ].map((gen) => (
                        <button
                          key={gen.gen}
                          onClick={() => {
                            navigateTo('shop', { generation: gen.gen, category: 'all' });
                            setIsCategoryMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-50 transition-colors block cursor-pointer group"
                        >
                          <span className="font-medium text-neutral-800 group-hover:text-neutral-950 block">
                            {gen.label}
                          </span>
                          <span className="text-[11px] text-neutral-500 block">
                            {gen.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-new-arrivals-btn"
              onClick={() => navigateTo('shop', { category: 'new-arrivals' })}
              className="hover:text-neutral-950 transition-colors py-2 cursor-pointer flex items-center gap-1.5"
            >
              <span>New Arrivals</span>
              <span className="bg-neutral-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                New
              </span>
            </button>

            <button
              id="nav-offers-btn"
              onClick={() => navigateTo('shop', { category: 'offers' })}
              className="text-red-600 hover:text-red-700 transition-colors py-2 cursor-pointer font-medium"
            >
              Offers
            </button>

            <button
              id="nav-about-btn"
              onClick={() => navigateTo('about')}
              className="hover:text-neutral-950 transition-colors py-2 cursor-pointer"
            >
              About
            </button>

            <button
              id="nav-contact-btn"
              onClick={() => navigateTo('contact')}
              className="hover:text-neutral-950 transition-colors py-2 cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon / Bar Toggle */}
            <div className="relative" ref={searchDropdownRef}>
              <button
                id="header-search-toggle-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                title="Search shirts"
                aria-label="Search shirts"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search popup */}
              {isSearchOpen && (
                <div
                  id="header-search-popup"
                  className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search casual, linen, checked..."
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  </form>

                  {searchResults.length > 0 && (
                    <div className="mt-3 divide-y divide-neutral-100 max-h-64 overflow-y-auto">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 pb-1 block">
                        Quick Matches
                      </span>
                      {searchResults.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            navigateTo('product-detail', { productId: item.id });
                            setIsSearchOpen(false);
                          }}
                          className="w-full text-left p-2 hover:bg-neutral-50 rounded-lg flex items-center gap-3 transition-colors cursor-pointer"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-10 h-12 object-cover rounded bg-neutral-100"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-neutral-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-neutral-500">
                              ${item.price}{' '}
                              {item.originalPrice > item.price && (
                                <span className="line-through text-neutral-400 ml-1">
                                  ${item.originalPrice}
                                </span>
                              )}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span>Press Enter for full results</span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-neutral-900 font-semibold hover:underline"
                    >
                      View all ({products.length})
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account / User Menu */}
            <div className="relative">
              <button
                id="header-account-btn"
                onClick={() => {
                  if (currentUser) {
                    setIsUserMenuOpen(!isUserMenuOpen);
                  } else {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }
                }}
                className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                title={currentUser ? `Signed in as ${currentUser.name}` : 'Login / Register'}
                aria-label="User Account"
              >
                <UserIcon className="w-5 h-5" />
                {currentUser && (
                  <span className="hidden xl:inline text-xs font-medium max-w-[90px] truncate text-neutral-800">
                    {currentUser.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              {isUserMenuOpen && currentUser && (
                <div
                  id="user-account-dropdown"
                  className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-700">
                      {currentUser.role}
                    </span>
                  </div>

                  <button
                    id="dropdown-my-account-btn"
                    onClick={() => {
                      navigateTo('account');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4 text-neutral-500" />
                    My Profile & Addresses
                  </button>

                  <button
                    id="dropdown-my-orders-btn"
                    onClick={() => {
                      navigateTo('account');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-neutral-500" />
                    My Orders
                  </button>

                  <button
                    id="dropdown-track-order-btn"
                    onClick={() => {
                      navigateTo('order-tracking');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-neutral-500" />
                    Track an Order
                  </button>

                  {currentUser.role === 'admin' && (
                    <button
                      id="dropdown-admin-dashboard-btn"
                      onClick={() => {
                        navigateTo('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      Admin Dashboard
                    </button>
                  )}

                  <div className="border-t border-neutral-100 mt-1 pt-1">
                    <button
                      id="dropdown-logout-btn"
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              id="header-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors relative cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span
                  id="wishlist-badge-count"
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors relative cursor-pointer flex items-center gap-2"
              title="View Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    id="cart-badge-count"
                    className="absolute -top-1 -right-1.5 bg-neutral-950 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              {cartSubtotal > 0 && (
                <span className="hidden md:inline text-xs font-semibold text-neutral-900">
                  ${cartSubtotal.toFixed(2)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-neutral-200 bg-white px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-neutral-100">
            <button
              onClick={() => {
                navigateTo('shop', { category: 'all' });
                setIsMobileMenuOpen(false);
              }}
              className="p-2 text-center text-xs font-semibold bg-neutral-900 text-white rounded-lg"
            >
              Shop All Shirts
            </button>
            <button
              onClick={() => {
                navigateTo('shop', { category: 'new-arrivals' });
                setIsMobileMenuOpen(false);
              }}
              className="p-2 text-center text-xs font-semibold bg-neutral-100 text-neutral-900 rounded-lg"
            >
              New Arrivals
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Categories
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { name: 'Casual Shirts', cat: 'casual' as ShirtCategory },
                { name: 'Formal Shirts', cat: 'formal' as ShirtCategory },
                { name: 'Printed Shirts', cat: 'printed' as ShirtCategory },
                { name: 'Checked Shirts', cat: 'checked' as ShirtCategory },
                { name: 'Denim Shirts', cat: 'denim' as ShirtCategory },
                { name: 'Linen Shirts', cat: 'linen' as ShirtCategory },
                { name: 'Basic Shirts', cat: 'basic' as ShirtCategory },
                { name: 'Special Offers', cat: 'offers' as ShirtCategory },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigateTo('shop', { category: item.cat });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-1.5 text-xs text-neutral-700 hover:text-neutral-950 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Shop by Generation
            </span>
            <div className="space-y-1">
              {[
                { label: 'Young & Stylish (18–30)', gen: 'young-stylish' as GenerationStyle },
                { label: 'Smart & Modern (30–45)', gen: 'smart-modern' as GenerationStyle },
                { label: 'Classic & Comfortable (45+)', gen: 'classic-comfortable' as GenerationStyle },
                { label: 'Basic & Essential', gen: 'basic-essential' as GenerationStyle },
              ].map((g) => (
                <button
                  key={g.gen}
                  onClick={() => {
                    navigateTo('shop', { generation: g.gen });
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-1.5 text-xs font-medium text-neutral-800"
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('about');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-neutral-700 py-1"
            >
              About ATTRXNWEAR
            </button>
            <button
              onClick={() => {
                navigateTo('contact');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-neutral-700 py-1"
            >
              Contact Support
            </button>
            <button
              onClick={() => {
                navigateTo('order-tracking');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-neutral-700 py-1 flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-neutral-500" />
              Track Your Order
            </button>
            <button
              onClick={() => {
                navigateTo('admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-semibold text-amber-700 py-1 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Owner Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
