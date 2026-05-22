"use client";
import Link from "next/link";
import { ArrowRight, Leaf, Trees, Flower2 } from "lucide-react";

const categories = [
  {
    title: "Indoor Plants",
    icon: Leaf,
    image: "/images/indoor-plants.jpg",
    href: "/products?category=INDOOR",
    count: "20+ Varieties",
    num: "01",
  },
  {
    title: "Outdoor Plants",
    icon: Trees,
    image: "/images/outdoor-plants.jpg",
    href: "/products?category=OUTDOOR",
    count: "25+ Varieties",
    num: "02",
  },
  {
    title: "Artificial Plants",
    icon: Flower2,
    image: "/images/artificial-plants.jpg",
    href: "/products?category=ARTIFICIAL",
    count: "10+ Styles",
    num: "03",
  },
];

/* ── Botanical SVG leaf ── */
function LeafSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 60 90" fill="none" className={className} aria-hidden="true">
      <path d="M30 85 C30 85 3 60 3 33 C3 16 15 3 30 3 C45 3 57 16 57 33 C57 60 30 85 30 85Z" fill="#1A2E21" />
      <line x1="30" y1="85" x2="30" y2="3" stroke="#F7F5EF" strokeWidth="0.9" opacity="0.5" />
      <path d="M30 33 C30 33 12 26 15 10" stroke="#F7F5EF" strokeWidth="0.7" opacity="0.45" />
      <path d="M30 52 C30 52 47 43 44 24" stroke="#F7F5EF" strokeWidth="0.7" opacity="0.45" />
    </svg>
  );
}

/* ── Decorative corner-bracket frame on images ── */
function ImageFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4">
      {/* TL */}
      <span className="absolute top-0 left-0 block h-6 w-6 border-l-2 border-t-2 border-white/60" />
      {/* TR */}
      <span className="absolute top-0 right-0 block h-6 w-6 border-r-2 border-t-2 border-white/60" />
      {/* BL */}
      <span className="absolute bottom-0 left-0 block h-6 w-6 border-b-2 border-l-2 border-white/60" />
      {/* BR */}
      <span className="absolute bottom-0 right-0 block h-6 w-6 border-b-2 border-r-2 border-white/60" />
    </div>
  );
}

/* ── Dot-grid section background ── */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, #8A9A5B 1.2px, transparent 1.2px)",
        backgroundSize: "28px 28px",
        opacity: 0.35,
      }}
    />
  );
}

export default function CategoriesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F5EF] py-20 sm:py-24 lg:py-28">
      <DotGrid />

      {/* Ambient botanical leaves */}
      <LeafSvg className="absolute -top-5 right-10 w-20 h-[120px] rotate-[15deg] opacity-[0.4]" />
      <LeafSvg className="absolute bottom-20 -left-5 w-14 h-[84px] -rotate-[18deg] opacity-[0.4]" />
      <LeafSvg className="absolute top-1/2 -right-3 w-12 h-[72px] rotate-[8deg] opacity-[0.6]" />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="mb-14 sm:mb-16 lg:mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-9 bg-[#8A9A5B]" />
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-[#8A9A5B]">
              Browse Our Collection
            </p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] text-[#1A2E21]">
            Popular <em>Categories</em>
          </h2>

          <p className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-gray-500">
            Shop plants by category and discover the perfect greenery
            for your home and garden.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="block h-2 w-8 rounded-full bg-[#8A9A5B]" />
            <span className="block h-2 w-2 rounded-full bg-[#8A9A5B]/50" />
            <span className="block h-2 w-2 rounded-full bg-[#8A9A5B]/25" />
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-8">
          {categories.map(({ title, icon: Icon, image, href, count, num }, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <Link
                key={title}
                href={href}
                className="group relative grid overflow-hidden rounded-[20px] sm:rounded-[28px] bg-white shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-8px_rgba(26,46,33,0.18)] sm:grid-cols-[3fr_2fr]"
                style={isReversed ? { gridTemplateColumns: undefined } : {}}
              >
                {/* Reversed class via conditional wrapper for content order */}
                {/* IMAGE PANEL */}
                <div
                  className={`relative overflow-hidden ${isReversed ? "sm:order-2" : ""}`}
                >
                  <img
                    src={image}
                    alt={title}
                    className="h-[220px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[360px] lg:h-[400px]"
                  />

                  {/* Corner frame brackets */}
                  <ImageFrame />

                  {/* Number badge — bottom right of image */}
                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold tracking-wider text-[#1A2E21] shadow-sm backdrop-blur-sm sm:bottom-5 sm:right-5">
                    {num}
                  </span>
                </div>

                {/* CONTENT PANEL */}
                <div
                  className={`relative flex flex-col justify-center overflow-hidden p-6 sm:p-10 lg:p-14 ${isReversed ? "sm:order-1" : ""}`}
                >
                  {/* Left accent bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 bottom-0 w-1 rounded-r-full bg-gradient-to-b from-transparent via-[#8A9A5B]/30 to-transparent ${isReversed ? "right-0 rounded-l-full rounded-r-none" : "left-0"}`}
                  />

                  {/* Leaf watermark */}
                  <LeafSvg className="pointer-events-none absolute -bottom-8 -right-4 w-32 h-48 opacity-[0.2]" />

                  {/* Icon + variety count */}
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A2E21]/10 transition-colors duration-300 group-hover:bg-[#1A2E21]/15">
                      <Icon size={20} className="text-[#1A2E21]" />
                    </div>
                    <span className="rounded-full border border-[#8A9A5B]/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8A9A5B]">
                      {count}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[50px] leading-tight text-[#1A2E21]">
                    {title}
                  </h3>
                  <div className="my-2 h-px w-12 bg-[#1A2E21]/12 sm:my-3" />

                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#1A2E21] transition-all duration-300 group-hover:gap-3">
                    Explore Category
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Bottom botanical rule ── */}
        <div className="mt-14 flex items-center gap-4 sm:mt-16" aria-hidden="true">
          <span className="block h-px flex-1 bg-[#1A2E21]/10" />
          <LeafSvg className="w-4 h-6 opacity-20" />
          <span className="block h-px flex-1 bg-[#1A2E21]/10" />
        </div>

      </div>
    </section>
  );
}
