import React, { useState } from 'react';
import { X, ShieldCheck, User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerUser
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authModalMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please provide your email and password.');
        return;
      }
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
      loginUser(email, role);
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      registerUser(name, email, phone);
    }
  };

  const handleDemoCustomerLogin = () => {
    loginUser('customer@attrxnwear.com', 'customer');
  };

  const handleDemoAdminLogin = () => {
    loginUser('admin@attrxnwear.com', 'admin');
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        id="auth-modal-content"
        className="relative bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-auth-modal-btn"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="text-2xl font-extrabold tracking-tight text-neutral-950 font-display">
            ATTRXN<span className="font-light text-neutral-500">WEAR</span>
          </span>
          <p className="text-xs text-neutral-500 mt-1">
            {authModalMode === 'login'
              ? 'Sign in to access your wardrobe, orders, and saved addresses.'
              : 'Create your ATTRXNWEAR profile for an elevated shopping experience.'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="grid grid-cols-2 bg-neutral-100 p-1 rounded-xl mb-6 text-xs font-bold">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setError('');
            }}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              authModalMode === 'login'
                ? 'bg-white shadow text-neutral-950'
                : 'text-neutral-500 hover:text-neutral-950'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthModalMode('register');
              setError('');
            }}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              authModalMode === 'register'
                ? 'bg-white shadow text-neutral-950'
                : 'text-neutral-500 hover:text-neutral-950'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Logins for Instant Testing */}
        <div className="mb-6 p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block text-center">
            Instant Demo Sign-In
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDemoCustomerLogin}
              className="px-3 py-2 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-neutral-600" />
              <span>Customer Demo</span>
            </button>
            <button
              onClick={handleDemoAdminLogin}
              className="px-3 py-2 bg-amber-50 border border-amber-200 hover:border-amber-400 text-amber-900 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Vance"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-neutral-800 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-neutral-800 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
          >
            <span>{authModalMode === 'login' ? 'Sign In to Wardrobe' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
