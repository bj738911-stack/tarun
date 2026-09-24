import React, { useState } from 'react';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ShieldCheck,
  Ruler,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderShippingAddress } from '../types';
import { formatPrice } from '../utils/currency';

export const AccountView: React.FC = () => {
  const { currentUser, orders, logoutUser, updateAddresses, navigateTo } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'sizes'>('orders');

  // New Address Form Modal
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddr, setNewAddr] = useState<OrderShippingAddress>({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  // Fit Preferences
  const [preferredFit, setPreferredFit] = useState('Slim Fit');
  const [preferredSize, setPreferredSize] = useState('M');
  const [neckCircumference, setNeckCircumference] = useState('15.5"');
  const [fitSaved, setFitSaved] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-neutral-950">Please sign in</h2>
        <p className="text-xs text-neutral-500 mt-1 mb-6">
          Access your past orders, delivery addresses, and custom shirt profile.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.addressLine1 || !newAddr.city) return;
    const updated = [...currentUser.savedAddresses, newAddr];
    updateAddresses(updated);
    setIsAddAddressOpen(false);
    setNewAddr({
      fullName: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '',
      addressLine1: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States'
    });
  };

  const handleDeleteAddress = (index: number) => {
    const updated = currentUser.savedAddresses.filter((_, i) => i !== index);
    updateAddresses(updated);
  };

  return (
    <div id="account-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Account Hero Banner */}
      <div className="bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center text-xl font-bold font-display text-amber-400">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display">{currentUser.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Gold Gentleman Tier
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' && (
            <button
              onClick={() => navigateTo('admin')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management</span>
            </button>
          )}
          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200 p-4 space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery Addresses ({currentUser.savedAddresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sizes')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'sizes'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>Sartorial Fit Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          {/* TAB 1: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-neutral-950 font-display">
                Past Wardrobe Purchases
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="text-xs text-neutral-500 mb-4">You have not placed any orders yet.</p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-neutral-200 rounded-2xl p-5 space-y-4 hover:border-neutral-300 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold font-mono text-neutral-950">{order.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                              {order.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400">Placed on {order.createdAt}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-neutral-950">
                            {formatPrice(order.total)}
                          </span>
                          <button
                            onClick={() => navigateTo('order-tracking', { orderId: order.id })}
                            className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Track
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {order.items.map((item, idx) => (
                          <div key={item.id || idx} className="flex items-center gap-3">
                            <img
                              src={item.productImage || item.product?.images[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80'}
                              alt={item.productName || item.product?.name || 'Shirt'}
                              className="w-12 h-14 object-cover rounded-lg bg-neutral-100"
                            />
                            <div className="text-xs">
                              <p className="font-bold text-neutral-900 line-clamp-1">
                                {item.productName || item.product?.name}
                              </p>
                              <p className="text-[11px] text-neutral-500">
                                {item.color || item.selectedColor?.name} • {item.size || item.selectedSize} • Qty {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Delivery Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-neutral-950 font-display">
                    Saved Addresses
                  </h2>
                  <p className="text-xs text-neutral-500">Manage destination hubs for fast 1-click checkout.</p>
                </div>
                <button
                  onClick={() => setIsAddAddressOpen(true)}
                  className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser.savedAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-neutral-200 rounded-xl relative group flex flex-col justify-between"
                  >
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-neutral-950">{addr.fullName}</p>
                      <p className="text-neutral-600">{addr.addressLine1}</p>
                      <p className="text-neutral-600">{addr.city}, {addr.state} {addr.postalCode}</p>
                      <p className="text-neutral-500">{addr.phone}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 mt-4 flex justify-between items-center text-xs">
                      <span className="text-[11px] font-bold text-emerald-700">
                        {idx === 0 ? 'Default Address' : 'Secondary'}
                      </span>
                      <button
                        onClick={() => handleDeleteAddress(idx)}
                        className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Delete address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {isAddAddressOpen && (
                <div
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                  onClick={() => setIsAddAddressOpen(false)}
                >
                  <div
                    className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-base font-bold text-neutral-950">Add Shipping Address</h3>
                    <form onSubmit={handleAddAddress} className="space-y-3">
                      <div>
                        <label className="font-semibold text-neutral-800 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newAddr.fullName}
                          onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-800 block mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={newAddr.addressLine1}
                          onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-semibold text-neutral-800 block mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={newAddr.city}
                            onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-neutral-800 block mb-1">Postal Code</label>
                          <input
                            type="text"
                            required
                            value={newAddr.postalCode}
                            onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddAddressOpen(false)}
                          className="px-4 py-2 border rounded-lg font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-neutral-950 text-white rounded-lg font-bold"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Fit Profile */}
          {activeTab === 'sizes' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-lg font-bold text-neutral-950 font-display">
                  Sartorial Fit Profile
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Save your body proportions to auto-recommend optimal sizing across every category.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-900 block mb-2">Preferred Silhouette</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Slim Fit', 'Regular Fit', 'Relaxed Fit'].map((fit) => (
                      <button
                        key={fit}
                        type="button"
                        onClick={() => setPreferredFit(fit)}
                        className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                          preferredFit === fit
                            ? 'bg-neutral-950 text-white border-neutral-950'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {fit}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-900 block mb-2">Standard Shirt Size</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setPreferredSize(sz)}
                        className={`w-10 h-10 rounded-xl border text-xs font-bold cursor-pointer ${
                          preferredSize === sz
                            ? 'bg-neutral-950 text-white border-neutral-950'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Neck Circumference</label>
                  <input
                    type="text"
                    value={neckCircumference}
                    onChange={(e) => setNeckCircumference(e.target.value)}
                    placeholder="e.g. 15.5 inches"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFitSaved(true);
                    setTimeout(() => setFitSaved(false), 2000);
                  }}
                  className="px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {fitSaved ? 'Fit Profile Saved!' : 'Update Fit Profile'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Profile Details */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-lg font-bold text-neutral-950 font-display">
                  Profile & Credentials
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">Manage your personal identification.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={currentUser.email}
                    className="w-full px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={currentUser.phone}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-900 block mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
