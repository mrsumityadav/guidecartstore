'use client';

import React, { useState } from 'react';
import { sendContactMessage } from '@/lib/api';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setLoading(true);
    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B1635] text-xs font-semibold card-shadow">
            <Mail className="w-4 h-4 text-[#FF8A00]" />
            <span>Customer Assistance</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#0B1635] tracking-tight">
            Contact Support
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base max-w-lg mx-auto">
            Have a question about your order, digital download, or a product? Send us a message or reach out directly at{' '}
            <strong className="text-[#0B1635]">support@guidecart.com</strong>.
          </p>
        </div>

        {/* CONTACT FORM CONTAINER */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 card-shadow">
          
          {status.type === 'success' && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">Message Received!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">{status.message}</p>
              </div>
            </div>
          )}

          {status.type === 'error' && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">Unable to Send</h4>
                <p className="text-xs text-rose-700 mt-0.5">{status.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* NAME */}
              <div>
                <label className="block text-xs font-bold text-[#0B1635] mb-1.5 uppercase tracking-wider">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#F1F5FB] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:bg-white text-[#0B1635]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold text-[#0B1635] mb-1.5 uppercase tracking-wider">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#F1F5FB] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:bg-white text-[#0B1635]"
                />
              </div>
            </div>

            {/* SUBJECT */}
            <div>
              <label className="block text-xs font-bold text-[#0B1635] mb-1.5 uppercase tracking-wider">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="Question regarding Job & Interview Prep Toolkit"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F1F5FB] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:bg-white text-[#0B1635]"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-xs font-bold text-[#0B1635] mb-1.5 uppercase tracking-wider">
                Message *
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Write your question or request here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F1F5FB] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:bg-white text-[#0B1635]"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#E87500] text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm text-sm active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* QUICK FAQ SHORTCUT */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
            Looking for quick answers about Payhip checkout or file formats?{' '}
            <Link href="/faq" className="text-[#FF8A00] font-bold hover:underline inline-flex items-center gap-1">
              <span>View our FAQ</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
