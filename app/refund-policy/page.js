import Head from 'next/head';

const doaSteps = [
  'Take clear photos or a short video of the plant in the original packaging immediately upon delivery.',
  'Email us at Officialplantx.store@gmail.com with Subject: "DOA Claim – [Your Order ID]"',
  'Our team will review within 24 hours and confirm the replacement or refund.',
  'DOA claim must be raised within 48 hours of delivery — claims raised after this window may not be accepted.',
];

const returnSteps = [
  'Email Officialplantx.store@gmail.com with Subject: "Return Request – [Your Order ID]"',
  'Include: Your name, order ID, issue description, and clear photos/videos as evidence.',
  'Our team will review and respond within 24–48 business hours.',
  'If approved, we\'ll arrange a reverse pickup (at no cost to you).',
  'Refund or replacement will be processed once the return is verified.',
];

const refundTimeline = [
  { method: 'Credit / Debit Card', timeline: '5–7 business days' },
  { method: 'UPI / Net Banking', timeline: '3–5 business days' },
  { method: 'Razorpay / PayU Wallet', timeline: '2–3 business days' },
  { method: 'PlantX Store Credit', timeline: 'Instant (upon approval)' },
  { method: 'Cash on Delivery (COD)', timeline: 'Bank transfer within 5–7 days' },
];

const tocLinks = [
  { id: 's1', label: '1. Cancellation Policy' },
  { id: 's2', label: '2. Return Eligibility' },
  { id: 's3', label: '3. Non-Returnable Items' },
  { id: 's4', label: '4. Dead on Arrival (DOA)' },
  { id: 's5', label: '5. Refund Process' },
  { id: 's6', label: '6. Refund Timeline' },
  { id: 's7', label: '7. Exchange Policy' },
  { id: 's8', label: '8. Damaged in Transit' },
  { id: 's9', label: '9. Contact Us' },
];

export default function RefundPolicy() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Refund Policy – PlantX</title>
        <meta name="description" content="PlantX Refund and Return Policy – understand cancellations, DOA claims, refund timelines and more." />
      </Head>


      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3a2a] to-[#2d5c3e] py-20 px-6 text-center ">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Refund & Return Policy</h1>
        <p className="text-[#b8d9c4] text-base font-light">Our commitment to making every order right for you</p>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex gap-10 items-start">

          {/* TOC */}
          <aside className="hidden md:block w-52 flex-shrink-0 sticky top-24">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-[#2d5c3e] font-medium mb-4">Contents</p>
              {tocLinks.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="block text-xs text-gray-500 hover:text-[#2d5c3e] py-1.5 border-b border-gray-100 last:border-0 leading-snug transition-colors">
                  {t.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#e8f4ee] border-l-4 border-[#2d5c3e] rounded-r-lg px-5 py-3.5 text-sm text-[#2d5c3e] mb-10">
              📅 Last updated: January 1, 2024 &nbsp;|&nbsp; Effective from: May 1, 2026
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              At <strong className="text-gray-800">PlantX India Pvt. Ltd.</strong>, we take pride in delivering healthy, well-packaged plants and products. We understand that sometimes things don&apos;t go as planned, and we&apos;re committed to making it right.
            </p>

            {/* Section 1 */}
            <section id="s1" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">1. Order Cancellation Policy</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                You may cancel your order within <strong className="text-gray-800">12 hours of placing it</strong>, provided the order has not yet been dispatched.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2 mb-4">
                <li>To cancel, contact us via WhatsApp (+91 7340065075) or email (Officialplantx.store@gmail.com) with your Order ID.</li>
                <li>If the order has already been shipped, cancellation is not possible. Please initiate a return after delivery.</li>
                <li>Prepaid orders cancelled within the window will receive a full refund within 5–7 business days.</li>
              </ul>
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3 text-sm text-amber-700">
                ⚠️ Orders placed during sales or with coupon codes may have restricted cancellation windows. Please check your order confirmation email.
              </div>
            </section>

            {/* Section 2 */}
            <section id="s2" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">2. Return Eligibility</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">We accept returns under the following circumstances:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Plant arrived dead, severely damaged, or completely wilted (Dead on Arrival)</li>
                <li>Wrong product delivered (different variety or size than ordered)</li>
                <li>Product is missing from the package</li>
                <li>Pot or planter arrived broken or cracked</li>
                <li>Significant quality defect clearly visible at the time of delivery</li>
              </ul>
              <p className="text-gray-700 text-sm font-medium mt-3">Return requests must be raised within 48 hours of delivery with photo/video evidence.</p>
            </section>

            {/* Section 3 */}
            <section id="s3" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">3. Non-Returnable Items</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Perishable plants showing natural wear after delivery (yellowing of 1–2 leaves is normal during transit)</li>
                <li>Seeds, bulbs, and saplings once opened</li>
                <li>Soil, compost, fertilizers, and pesticides</li>
                <li>Items damaged due to improper care after delivery</li>
                <li>Items returned without original packaging</li>
                <li>Sale or clearance items marked as "non-returnable"</li>
              </ul>
            </section>

            {/* Section 4 – DOA */}
            <section id="s4" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">4. Dead on Arrival (DOA) Policy</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">If your plant arrives dead or in unacceptable condition, we will replace it or issue a full refund — no questions asked.</p>
              <div className="space-y-3">
                {doaSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#2d5c3e] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">{i + 1}</div>
                    <p className="text-sm text-gray-500 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 – Return Steps */}
            <section id="s5" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">5. How to Initiate a Return / Refund</h2>
              <div className="space-y-3">
                {returnSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#2d5c3e] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">{i + 1}</div>
                    <p className="text-sm text-gray-500 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 – Timeline Table */}
            <section id="s6" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">6. Refund Timeline</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1a3a2a] text-white">
                      <th className="text-left px-5 py-3 font-medium">Payment Method</th>
                      <th className="text-left px-5 py-3 font-medium">Refund Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refundTimeline.map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-5 py-3 text-gray-700">{r.method}</td>
                        <td className="px-5 py-3 text-gray-500">{r.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-3">Refunds will be processed to the <strong className="text-gray-700">original payment method only</strong>.</p>
            </section>

            {/* Section 7 */}
            <section id="s7" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">7. Exchange Policy</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Contact us within 48 hours of delivery for an exchange request</li>
                <li>The original item must be in its delivered condition</li>
                <li>Exchange is subject to availability of the requested item</li>
                <li>Shipping charges for exchange may apply in non-fault cases</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="s8" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">8. Items Damaged in Transit</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Do not accept the package if visibly damaged at delivery — mark it as &quot;Refused – Damaged&quot; and inform us.</li>
                <li>If damage is noticed after opening, report within 48 hours with photographic evidence.</li>
                <li>We will arrange a full replacement or refund at no cost to you.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="s9" className="scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">9. Contact Us for Refunds</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li><strong className="text-gray-700">Email:</strong> Officialplantx.store@gmail.com</li>
                <li><strong className="text-gray-700">WhatsApp:</strong> +91 7340065075</li>
                <li><strong className="text-gray-700">Phone:</strong> +91 7023829288 (Mon–Sat, 9 AM – 6 PM)</li>
              </ul>
              <p className="text-sm text-gray-500 mt-3">Please always include your <strong className="text-gray-700">Order ID</strong> when reaching out for faster resolution.</p>
            </section>

          </div>
        </div>
      </main>

    
    </div>
  );
}