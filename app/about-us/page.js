import Head from 'next/head';

const stats = [
  { num: '5,000+', label: 'Happy Customers' },
  { num: '300+', label: 'Plant Varieties' },
  { num: '25+', label: 'Cities Served' },
  { num: '98%', label: 'Delivery Success' },
];

const offerings = [
  { icon: '🌿', title: 'Indoor Plants', desc: 'Low-maintenance plants for homes & offices' },
  { icon: '🌺', title: 'Outdoor Plants', desc: 'Flowering & garden plants for terraces' },
  { icon: '🪴', title: 'Pots & Planters', desc: 'Ceramic, terracotta & designer pots' },
  { icon: '🌱', title: 'Seeds & Bulbs', desc: 'Vegetable, flower & herb seeds' },
  { icon: '🧪', title: 'Soil & Fertilizers', desc: 'Premium potting mix & organic nutrients' },
  { icon: '🛠️', title: 'Gardening Tools', desc: 'Spray bottles, watering cans & more' },
];

// const team = [
//   { avatar: '👩‍💼', name: 'Priya Sharma', role: 'Founder & CEO' },
//   { avatar: '👨‍🌾', name: 'Arjun Mehta', role: 'Head of Horticulture' },
//   { avatar: '👩‍💻', name: 'Neha Joshi', role: 'Operations Lead' },
// ];

export default function AboutUs() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>About Us – PlantX</title>
        <meta name="description" content="Learn about PlantX – India's trusted online plant store based in Jaipur." />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3a2a] via-[#2d5c3e] to-[#4a7c5e] py-24 px-6 text-center relative overflow-hidden">
        <span className="inline-block bg-white/10 text-[#a8d5b5] text-xs tracking-widest uppercase px-5 py-2 rounded-full border border-white/20 mb-5">
          🌿 Est. 2026 · Jaipur, India
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          We Bring Nature<br />To Your Doorstep
        </h1>
        <p className="text-[#b8d9c4] text-lg max-w-xl mx-auto leading-relaxed font-light">
          PlantX is India's trusted online destination for plants to buy online, pots, seeds & gardening essentials — delivered fresh, with love, straight to your home.
        </p>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16">

        {/* Our Story */}
        <section className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#2d5c3e] font-medium mb-2">Our Story</p>
          <h2 className="font-serif text-3xl font-semibold mb-4">From a Small Garden to Your Home</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-3">
            PlantX was founded in 2026 with a simple belief — every home deserves a touch of green. What started as a passion project by plant enthusiasts in Jaipur has grown into a full-fledged e-commerce platform serving customers across India.
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            We work directly with nurseries and growers across Rajasthan and beyond to ensure every plant that leaves our facility is healthy, well-rooted, and carefully packed for safe delivery.
          </p>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <span className="font-serif text-4xl font-bold text-[#2d5c3e] block">{s.num}</span>
              <span className="text-sm text-gray-400 mt-2 block">{s.label}</span>
            </div>
          ))}
        </div>

        <hr className="border-gray-200 mb-16" />

        {/* Offerings */}
        <section className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#2d5c3e] font-medium mb-2">What We Offer</p>
          <h2 className="font-serif text-3xl font-semibold mb-6">Everything For Your Green Space</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {offerings.map((o) => (
              <div key={o.title} className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
                <div className="text-3xl mb-3">{o.icon}</div>
                <h3 className="text-sm font-medium mb-1">{o.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-200 mb-16" />

        {/* Team */}
        {/* <section className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#2d5c3e] font-medium mb-2">Our Team</p>
          <h2 className="font-serif text-3xl font-semibold mb-6">The People Behind PlantX</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {team.map((m) => (
              <div key={m.name} className="bg-white border border-gray-200 rounded-xl p-7 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[#1a3a2a] flex items-center justify-center text-2xl mx-auto mb-3">
                  {m.avatar}
                </div>
                <h4 className="text-base font-medium mb-1">{m.name}</h4>
                <span className="text-sm text-[#2d5c3e] font-medium">{m.role}</span>
              </div>
            ))}
          </div>
        </section> */}

        <hr className="border-gray-200 mb-16" />

        {/* Mission */}
        <section className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#2d5c3e] font-medium mb-2">Our Mission</p>
          <h2 className="font-serif text-3xl font-semibold mb-4">Why We Do What We Do</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-3">
            We believe plants are not just decoration — they purify the air, reduce stress, and make spaces feel alive. Our mission is to make plant parenting accessible, affordable, and joyful for every Indian household.
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            We are committed to sustainable sourcing, eco-friendly packaging, and empowering local nurseries and small-scale growers.
          </p>
        </section>

        <hr className="border-gray-200 mb-16" />

        {/* Business Info */}
        <section>
          <p className="text-xs tracking-widest uppercase text-[#2d5c3e] font-medium mb-2">Business Information</p>
          <h2 className="font-serif text-3xl font-semibold mb-4">Registered Business Details</h2>
          <div className="bg-white border-l-4 border-[#2d5c3e] rounded-r-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 leading-9">
              <strong className="text-gray-800">Business Name:</strong> PlantX India Pvt. Ltd.<br />
              <strong className="text-gray-800">GSTIN:</strong> 08XXXXX1234X1ZX<br />
              <strong className="text-gray-800">Registration No.:</strong> CIN: U01100RJ2026PTC000XXX<br />
              <strong className="text-gray-800">Registered Address:</strong> Ward No. 44, Near Rose Public School, Chomu, Jaipur, Rajasthan – 303702<br />
              <strong className="text-gray-800">Email:</strong> Officialplantx.store@gmail.com &nbsp;|&nbsp;
              <strong className="text-gray-800">Phone:</strong> +91 7023829288<br />
              <strong className="text-gray-800">Business Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM IST
            </p>
          </div>
        </section>

      </main>

    </div>
  );
}