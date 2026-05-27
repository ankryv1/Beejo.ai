import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 
const sections = [
  {
    id: 's1',
    title: '1. Information We Collect',
    content: (
      <>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">We collect the following types of information:</p>
        <p className="text-gray-700 text-sm font-medium mb-1">Personal Identification Information:</p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 mb-3">
          <li>Full name, email address, phone number</li>
          <li>Billing and shipping address (including city, state, PIN code)</li>
          <li>Date of birth (optional, for personalised offers)</li>
        </ul>
        <p className="text-gray-700 text-sm font-medium mb-1">Order & Transaction Information:</p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 mb-3">
          <li>Products purchased, order history, and transaction amounts</li>
          <li>Payment method type (we do not store full card numbers)</li>
          <li>Delivery preferences and instructions</li>
        </ul>
        <p className="text-gray-700 text-sm font-medium mb-1">Technical & Usage Information:</p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
          <li>IP address, browser type, device type, and operating system</li>
          <li>Pages visited, time spent on site, and referring URLs</li>
          <li>Cookie data and session identifiers</li>
        </ul>
      </>
    ),
  },
  {
    id: 's2',
    title: '2. How We Use Your Information',
    content: (
      <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
        <li>To process and fulfil your orders and send order confirmations</li>
        <li>To communicate delivery updates, tracking information, and shipping alerts</li>
        <li>To process payments securely through our payment gateway partners (Razorpay / PayU)</li>
        <li>To respond to customer service requests, queries, and complaints</li>
        <li>To send promotional emails and newsletters (only if you have opted in)</li>
        <li>To analyse website usage and improve our products and services</li>
        <li>To comply with legal obligations and prevent fraud</li>
      </ul>
    ),
  },
  {
    id: 's3',
    title: '3. Sharing Your Information',
    content: (
      <>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">We do not sell, rent, or trade your personal information. We may share your data with trusted third parties only as necessary:</p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
          <li><strong className="text-gray-700">Payment Gateways:</strong> Razorpay, PayU to handle transactions securely</li>
          <li><strong className="text-gray-700">Delivery Partners:</strong> Courier services (Delhivery, Blue Dart, DTDC) to ship your orders</li>
          <li><strong className="text-gray-700">Email / SMS Providers:</strong> To send transactional and marketing communications</li>
          <li><strong className="text-gray-700">Analytics Providers:</strong> Google Analytics for website usage insights (anonymised)</li>
          <li><strong className="text-gray-700">Legal Authorities:</strong> When required by law, court order, or government regulation</li>
        </ul>
      </>
    ),
  },
  {
    id: 's4',
    title: '4. Cookies',
    content: (
      <>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">We use cookies to enhance your browsing experience. Cookies help us:</p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
          <li>Keep you logged in to your account</li>
          <li>Remember items in your shopping cart</li>
          <li>Understand which pages and products you interact with</li>
          <li>Deliver relevant advertisements (if applicable)</li>
        </ul>
        <p className="text-gray-500 text-sm leading-relaxed mt-3">You can control cookies through your browser settings. Disabling cookies may affect certain website functionality.</p>
      </>
    ),
  },
  {
    id: 's5',
    title: '5. Data Security',
    content: (
      <>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">We implement industry-standard security measures including:</p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
          <li>SSL/TLS encryption for all data transmitted on our website</li>
          <li>PCI-DSS compliant payment processing — we never store card details on our servers</li>
          <li>Access controls limiting who can view personal data within our organisation</li>
          <li>Regular security audits and vulnerability assessments</li>
        </ul>
      </>
    ),
  },
  {
    id: 's6',
    title: '6. Your Rights',
    content: (
      <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
        <li><strong className="text-gray-700">Access:</strong> Request a copy of the personal data we hold about you</li>
        <li><strong className="text-gray-700">Correction:</strong> Request correction of inaccurate or incomplete data</li>
        <li><strong className="text-gray-700">Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
        <li><strong className="text-gray-700">Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
        <li><strong className="text-gray-700">Data Portability:</strong> Request your data in a machine-readable format</li>
      </ul>
    ),
  },
  {
    id: 's7',
    title: '7. Third-Party Links',
    content: <p className="text-gray-500 text-sm leading-relaxed">Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies separately.</p>,
  },
  {
    id: 's8',
    title: "8. Children's Privacy",
    content: <p className="text-gray-500 text-sm leading-relaxed">Our services are not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us and we will delete it promptly.</p>,
  },
  {
    id: 's9',
    title: '9. Changes to This Policy',
    content: <p className="text-gray-500 text-sm leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page with a revised "Last Updated" date.</p>,
  },
  {
    id: 's10',
    title: '10. Contact Us',
    content: (
      <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
        <li><strong className="text-gray-700">Email:</strong> privacy@plantx.in</li>
        <li><strong className="text-gray-700">Phone:</strong> +91 98765 43210</li>
        <li><strong className="text-gray-700">Address:</strong> 42, Green Valley Colony, Vaishali Nagar, Jaipur, Rajasthan – 302021</li>
      </ul>
    ),
  },
];
 
export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy – PlantX</title>
        <meta name="description" content="Read PlantX's Privacy Policy to understand how we collect, use, and protect your data." />
      </Head>
 
      <Navbar />
 
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3a2a] to-[#2d5c3e] py-20 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-[#b8d9c4] text-base font-light">How we collect, use, and protect your personal information</p>
      </section>
 
      <main className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex gap-10 items-start">
 
          {/* Sticky TOC */}
          <aside className="hidden md:block w-52 flex-shrink-0 sticky top-24">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-[#2d5c3e] font-medium mb-4">Contents</p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-xs text-gray-500 hover:text-[#2d5c3e] py-1.5 border-b border-gray-100 last:border-0 leading-snug transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </aside>
 
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#e8f4ee] border-l-4 border-[#2d5c3e] rounded-r-lg px-5 py-3.5 text-sm text-[#2d5c3e] mb-10">
              📅 Last updated: January 1, 2024 &nbsp;|&nbsp; Effective from: January 1, 2024
            </div>
 
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              This Privacy Policy describes how <strong className="text-gray-800">PlantX India Pvt. Ltd.</strong> collects, uses, and shares information when you visit our website or place an order. By using our website, you agree to the terms of this Privacy Policy.
            </p>
 
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="mb-12 scroll-mt-24">
                <h2 className="font-serif text-xl font-semibold mb-4 pb-3 border-b-2 border-gray-200">{s.title}</h2>
                {s.content}
              </section>
            ))}
          </div>
        </div>
      </main>
 
      <Footer />
    </>
  );
}