import Head from 'next/head';

const tocLinks = [
  { id: 's1', label: '1. Acceptance of Terms' },
  { id: 's2', label: '2. Eligibility' },
  { id: 's3', label: '3. Account Registration' },
  { id: 's4', label: '4. Products & Pricing' },
  { id: 's5', label: '5. Orders & Payment' },
  { id: 's6', label: '6. Shipping & Delivery' },
  { id: 's7', label: '7. Intellectual Property' },
  { id: 's8', label: '8. Prohibited Conduct' },
  { id: 's9', label: '9. Limitation of Liability' },
  { id: 's10', label: '10. Governing Law' },
  { id: 's11', label: '11. Changes to Terms' },
  { id: 's12', label: '12. Contact Us' },
];

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Terms & Conditions – PlantX</title>
        <meta name="description" content="Read PlantX Terms & Conditions governing the use of our website and purchase of products." />
      </Head>


      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3a2a] to-[#2d5c3e] py-20 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Terms & Conditions</h1>
        <p className="text-[#b8d9c4] text-base font-light">Please read these terms carefully before using PlantX</p>
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
              📅 Last updated: June 1, 2026 &nbsp;|&nbsp; Effective from: June 1, 2026
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              These Terms & Conditions govern your use of the PlantX website and purchase of products from{' '}
              <strong className="text-gray-800">PlantX India Pvt. Ltd.</strong> By accessing our website or placing an order, you agree to be bound by these Terms.
            </p>

            {/* S1 */}
            <section id="s1" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">1. Acceptance of Terms</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                By visiting, browsing, or making a purchase on plantx.in, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use our website or services.
              </p>
            </section>

            {/* S2 */}
            <section id="s2" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">2. Eligibility</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">To use our services and make purchases on PlantX, you must:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into a binding contract under the Indian Contract Act, 1872</li>
                <li>Have a valid email address and phone number in India</li>
                <li>Provide a valid delivery address within India</li>
              </ul>
            </section>

            {/* S3 */}
            <section id="s3" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">3. Account Registration</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">You may browse our website without registering. To place orders, you may be required to create an account. You agree to:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Keep your account credentials confidential and not share them with others</li>
                <li>Notify us immediately of any unauthorised access to your account</li>
                <li>Be responsible for all activity that occurs under your account</li>
              </ul>
              <p className="text-gray-500 text-sm mt-3">We reserve the right to suspend or terminate accounts that violate these Terms.</p>
            </section>

            {/* S4 */}
            <section id="s4" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">4. Products & Pricing</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Product images are representative — slight variations in plant size, colour, or pot shade may occur naturally.</li>
                <li>Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
                <li>We reserve the right to change prices at any time without prior notice.</li>
                <li>In the event of a pricing error, we reserve the right to cancel the order and issue a full refund.</li>
                <li>Availability of products is subject to stock and seasonal availability.</li>
              </ul>
            </section>

            {/* S5 */}
            <section id="s5" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">5. Orders & Payment</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>You are making an offer to purchase the selected product(s) at the listed price when you place an order.</li>
                <li>An order confirmation email does not constitute acceptance — acceptance occurs upon dispatch.</li>
                <li>We reserve the right to cancel or refuse any order at our discretion.</li>
                <li>Payments are processed securely via Razorpay / PayU. We do not store your card details.</li>
                <li>Accepted payment methods: Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD) in select areas.</li>
              </ul>
            </section>

            {/* S6 */}
            <section id="s6" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">6. Shipping & Delivery</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>We deliver across India. Delivery timelines are 3–7 business days depending on your location.</li>
                <li>Delivery timelines are estimates and may be affected by weather, strikes, or courier delays outside our control.</li>
                <li>PlantX is not liable for delays caused by third-party courier services.</li>
                <li>We are not responsible for non-delivery due to incorrect or incomplete addresses provided by the customer.</li>
                <li>Shipping charges, if any, will be clearly displayed at checkout before payment.</li>
              </ul>
            </section>

            {/* S7 */}
            <section id="s7" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">7. Intellectual Property</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                All content on the PlantX website — including logos, brand name, images, product descriptions, blog content, and design — is the exclusive intellectual property of PlantX India Pvt. Ltd. and is protected under Indian copyright and trademark laws.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>You may not copy, reproduce, or distribute our content without prior written permission.</li>
                <li>Using PlantX content for commercial purposes without authorisation is strictly prohibited.</li>
                <li>User-submitted content (reviews or photos) grants PlantX a non-exclusive licence to use it for marketing.</li>
              </ul>
            </section>

            {/* S8 */}
            <section id="s8" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">8. Prohibited Conduct</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">You agree not to:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Use the website for any unlawful, fraudulent, or harmful purpose</li>
                <li>Attempt to gain unauthorised access to our systems or data</li>
                <li>Submit false, misleading, or defamatory reviews or information</li>
                <li>Place bulk or speculative orders with intent to resell without prior authorisation</li>
                <li>Interfere with the functioning of the website through malware, spam, or denial-of-service attacks</li>
              </ul>
              <p className="text-gray-500 text-sm mt-3">We reserve the right to take legal action against violations of these terms.</p>
            </section>

            {/* S9 */}
            <section id="s9" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">9. Limitation of Liability</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">To the maximum extent permitted by law, PlantX India Pvt. Ltd. shall not be liable for:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li>Indirect, incidental, or consequential damages arising from use of our products or website</li>
                <li>Loss or damage to plants due to improper care by the customer after delivery</li>
                <li>Losses arising from courier delays, natural disasters, or force majeure events</li>
                <li>Any third-party services accessed via links on our website</li>
              </ul>
              <p className="text-gray-500 text-sm mt-3">Our total liability to any customer shall not exceed the value of the order placed by that customer.</p>
            </section>

            {/* S10 */}
            <section id="s10" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">10. Governing Law & Dispute Resolution</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of{' '}
                <strong className="text-gray-800">Jaipur, Rajasthan</strong>.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                In the event of a dispute, we encourage customers to first contact us at Officialplantx.store@gmail.com to seek an amicable resolution before initiating legal proceedings.
              </p>
            </section>

            {/* S11 */}
            <section id="s11" className="mb-12 scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">11. Changes to These Terms</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                We reserve the right to update or modify these Terms at any time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Your continued use of the website after changes are posted constitutes your acceptance of the revised Terms.
              </p>
            </section>

            {/* S12 */}
            <section id="s12" className="scroll-mt-24">
              <h2 className="font-serif text-xl text-black font-semibold mb-4 pb-3 border-b-2 border-gray-200">12. Contact Us</h2>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                <li><strong className="text-gray-700">Email:</strong> Officialplantx.store@gmail.com</li>
                <li><strong className="text-gray-700">Phone:</strong> +91 7023829288</li>
                <li><strong className="text-gray-700">Address:</strong>Ward No. 44,Near Rose Public School, Chomu, Jaipur, Rajasthan – 303702</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      
    </div>
  );
}