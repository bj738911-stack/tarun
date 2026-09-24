import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
          Customer Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display">
          We’re Here to Assist You
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Whether you need bespoke size advice, corporate ordering, or order status assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info (5 Cols) */}
        <div className="lg:col-span-5 bg-neutral-950 text-white rounded-2xl p-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold font-display text-white">Direct Atelier Channels</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Our tailoring specialists respond to all communications within 4 business hours.
            </p>
          </div>

          <div className="space-y-6 text-xs">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Telephone Concierge</p>
                <p className="text-neutral-400 mt-0.5">+1 (800) 849-ATTRXN (Toll Free)</p>
                <p className="text-neutral-400">+1 (212) 555-0199 (International)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Sartorial Email Desk</p>
                <p className="text-neutral-400 mt-0.5">concierge@attrxnwear.com</p>
                <p className="text-neutral-400">orders@attrxnwear.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Flagship Showroom & Atelier</p>
                <p className="text-neutral-400 mt-0.5">740 Fifth Avenue, Suite 1400</p>
                <p className="text-neutral-400">New York, NY 10019, United States</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Hours of Operation</p>
                <p className="text-neutral-400 mt-0.5">Monday – Friday: 9:00 AM – 7:00 PM EST</p>
                <p className="text-neutral-400">Saturday: 10:00 AM – 5:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-neutral-950 font-display">Inquiry Transmitted</h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Thank you, {name}. A dedicated styling consultant will review your note and respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold mt-2 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="text-base font-bold text-neutral-950 font-display">
                Transmit a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Sterling"
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Inquiry Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Sizing inquiry for Egyptian White Poplin"
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">How can we assist you?</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide any details regarding fit, measurements, or order numbers..."
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
