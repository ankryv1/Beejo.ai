"use client";

import { useState } from 'react';

const channels = [
  { icon: '📞', title: 'Phone', detail: '+91 98765 43210', badge: '9 AM – 6 PM', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
  { icon: '📧', title: 'Email', detail: 'Plantoclub@gmail.com', badge: '24–48 hr reply', color: 'bg-purple-50 text-purple-600', border: 'border-purple-100' },
  { icon: '💬', title: 'WhatsApp', detail: '+91 70238 29288', badge: 'Quick replies', color: 'bg-green-50 text-green-600', border: 'border-green-100' },
  { icon: '📍', title: 'Visit Us', detail: 'Mansarovar, Jaipur', badge: 'By appointment', color: 'bg-orange-50 text-orange-600', border: 'border-orange-100' },
];

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'We deliver within 3–7 business days across India. Express delivery (1–2 days) is available in select cities.',
  },
  {
    q: 'My plant arrived damaged. What should I do?',
    a: 'Email us at Plantoclub@gmail.com within 48 hours with your order ID and a photo of the damaged plant. We will send a replacement or issue a full refund.',
  },
  {
    q: 'Can I cancel my order?',
    a: 'Orders can be cancelled within 12 hours of placement by contacting us via WhatsApp or email.',
  },
  {
    q: 'Do you offer bulk / wholesale orders?',
    a: 'Yes! For orders of 20+ plants or ₹5,000+, write to us at 3daman2002@gmail.com for special pricing.',
  },
];

const businessInfo = [
  { icon: '🏢', label: 'Registered Name', value: 'PlantX India Pvt. Ltd.' },
  { icon: '📍', label: 'Address', value: '42, Green Valley Colony,\nMansarovar, Jaipur – 302021' },
  { icon: '🕐', label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed' },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Order Related Query', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    setError("Please fill in all required fields.");
    return;
  }

  setError("");

  try {
    const response = await fetch("/api/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      setSubmitted(true);
    } else {
      setError("Failed to send message.");
    }
  } catch (error) {
    setError("Something went wrong.");
  }
};

  return (
    <div className="min-h-screen bg-[#f6f9f7] font-sans">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0f2318] via-[#1a3a2a] to-[#2d5c3e] py-8 sm:py-12 px-6 text-center overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#a8d5b5] text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-6 backdrop-blur-sm">
            🌿 We&apos;re here to help
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
            Get In Touch<br />
            <span className="text-[#6dbf8a]">With Us</span>
          </h1>
          <p className="text-[#b8d9c4] text-lg font-light max-w-md mx-auto leading-relaxed">
            Questions about your order, plant care, or anything else? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 pb-20">

        {/* ── CHANNEL CARDS ────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 mt-10">
          {channels.map((c) => (
            <div
              key={c.title}
              className={`bg-white rounded-2xl p-5 text-center shadow-md border ${c.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-default`}
            >
              <div className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center text-xl mx-auto mb-3`}>
                {c.icon}
              </div>
              <h4 className="text-sm font-semibold text-gray-800 mb-1">{c.title}</h4>
              <p className="text-xs text-gray-400 mb-3 leading-snug">{c.detail}</p>
              <span className="inline-block bg-[#e8f4ee] text-[#2d5c3e] text-[11px] font-semibold px-3 py-1 rounded-full">
                {c.badge}
              </span>
            </div>
          ))}
        </div>

        {/* ── TWO COLUMN ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          {/* Business Info */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            {/* card header */}
            <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d5c3e] px-7 py-5">
              <h2 className="text-white font-semibold text-lg">Business Information</h2>
              <p className="text-[#a8d5b5] text-xs mt-0.5">Official contact & location details</p>
            </div>
            <div className="px-7 py-2">
              {businessInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4 py-4 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 bg-[#f0f9f4] rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-gray-700 whitespace-pre-line leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* response time badge */}
            <div className="mx-7 mb-6 mt-1 bg-[#f0f9f4] border border-[#c8e8d4] rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-xs font-semibold text-[#2d5c3e]">Average Response Time</p>
                <p className="text-xs text-gray-400">We reply within 24–48 hours on all channels</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d5c3e] px-7 py-5">
              <h2 className="text-white font-semibold text-lg">Send Us a Message</h2>
              <p className="text-[#a8d5b5] text-xs mt-0.5">We&apos;ll get back to you within 24–48 hours</p>
            </div>

            <div className="px-7 py-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-[#e8f4ee] rounded-full flex items-center justify-center text-3xl mb-4">✅</div>
                  <p className="text-base font-semibold text-gray-800 mb-1">Message Received!</p>
                  <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                    We&apos;ve received your message and will reply within 24–48 hours at your email address.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'Order Related Query', message: '' }); }}
                    className="mt-6 text-sm text-[#2d5c3e] font-medium underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg">
                      ⚠️ {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Name *</label>
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5c3e]/20 focus:border-[#2d5c3e] bg-gray-50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Email *</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5c3e]/20 focus:border-[#2d5c3e] bg-gray-50 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5c3e]/20 focus:border-[#2d5c3e] bg-gray-50 transition"
                    >
                      <option>Order Related Query</option>
                      <option>Plant Care Advice</option>
                      <option>Return / Refund Request</option>
                      <option>Delivery Issue</option>
                      <option>Wholesale / Bulk Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Message *</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your query in detail..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5c3e]/20 focus:border-[#2d5c3e] bg-gray-50 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2d5c3e] hover:bg-[#1a3a2a] active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#2d5c3e]/20"
                  >
                    Send Message
                    <span className="text-base">→</span>
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    We typically respond within <span className="text-[#2d5c3e] font-medium">24–48 hours</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d5c3e] px-7 py-5">
            <h2 className="text-white font-semibold text-lg">Frequently Asked Questions</h2>
            <p className="text-[#a8d5b5] text-xs mt-0.5">Quick answers to common queries</p>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-gray-50 last:border-0 ${openFaq === i ? 'bg-[#f6fbf8]' : ''}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-7 py-5 flex items-start justify-between gap-4 group"
                >
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-[#2d5c3e] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${openFaq === i ? 'bg-[#2d5c3e] text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed border-l-2 border-[#2d5c3e] pl-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}