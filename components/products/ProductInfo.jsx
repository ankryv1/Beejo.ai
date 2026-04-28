"use client";
import { useState } from "react";
import {
  ShoppingCart, Zap, Sun, Droplets, PawPrint,
  Heart, Share2, Shield, Truck, RotateCcw,
  Star, ChevronDown, ChevronUp, MapPin,
  Package, Check, Copy, Tag, Leaf
} from "lucide-react";

// ─── Mini helpers ────────────────────────────────────────────────────────────

function StarRow({ rating = 4.3, count = 128, small = false }) {
  return (
    <div className={`flex items-center gap-${small ? 1 : 2}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={small ? 12 : 16} height={small ? 12 : 16} viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z"
            fill={s <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}
          />
        </svg>
      ))}
      {!small && (
        <span className="text-sm text-gray-500 ml-1">
          <strong className="text-[#1A2E21]">{rating}</strong> ({count} reviews)
        </span>
      )}
    </div>
  );
}

function TrustBadge({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F9F7] border border-[#E8EDE2]">
      <div className="w-8 h-8 rounded-lg bg-[#1A2E21]/8 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-[#8A9A5B]" />
      </div>
      <div>
        <p className="text-xs font-bold text-[#1A2E21]">{title}</p>
        <p className="text-[11px] text-gray-400">{sub}</p>
      </div>
    </div>
  );
}

function PincodeChecker() {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState(null); // null | "ok" | "err"

  const check = () => {
    if (pin.length === 6) setStatus(pin.startsWith("3") ? "ok" : "err");
  };

  return (
    <div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        Check Delivery
      </p>
      <div className="flex gap-2">
        <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#8A9A5B] transition-colors">
          <MapPin size={14} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            maxLength={6}
            value={pin}
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setStatus(null); }}
            placeholder="Enter pincode"
            className="flex-1 outline-none text-sm bg-transparent text-[#1A2E21]"
          />
        </div>
        <button
          onClick={check}
          className="px-4 py-2.5 bg-[#1A2E21] text-white rounded-xl text-sm font-bold hover:bg-[#264230] transition-colors"
        >
          Check
        </button>
      </div>
      {status === "ok" && (
        <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1">
          <Check size={12} /> Delivery available · Arrives in 3–5 days
        </p>
      )}
      {status === "err" && (
        <p className="text-red-500 text-xs mt-1.5">Sorry, we don't deliver to this pincode yet.</p>
      )}
    </div>
  );
}

const TABS = ["Description", "Care Guide", "Reviews"];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductInfo({ plant }) {
  const [qty, setQty] = useState(1);
  const [potSize, setPotSize] = useState("Medium (6\")");
  const [wishlisted, setWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const [showAllOffers, setShowAllOffers] = useState(false);

  const savings = (plant?.originalPrice || 0) - (plant?.discountedPrice || 0);
  const discountPct = plant?.originalPrice
    ? Math.round((savings / plant.originalPrice) * 100)
    : 0;

  const potSizes = ["Small (4\")", "Medium (6\")", "Large (8\")"];

  const offers = [
    { icon: Tag, text: "Use code PLANT10 – flat 10% off on your first order" },
    { icon: Truck, text: "Free shipping on orders above ₹599" },
    { icon: RotateCcw, text: "Easy 7-day return if plant arrives damaged" },
  ];

  const handleShare = async () => {
    const url = window.location.href;

    try{
      if(navigator.share){
        await navigator.share({
          title:"Check out this plant on Bijjo!",
          url: url
        })
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setTimeout(false)
      }, 2000);
    }

    catch (err) {
      alert("Sharing failed. Please copy the URL manually.");
      console.error("Shared failed:", err);
    }
  };

  return (
    <div className="flex flex-col space-y-5">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8A9A5B] tracking-widest uppercase">
            <Leaf size={11} /> {plant?.category}
          </span>
          <h1 className="text-3xl font-serif text-[#1A2E21] mt-1 capitalize leading-tight">
            {plant?.plantName}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <StarRow rating={4.3} count={128} />
          </div>
        </div>
        {/* Action icons */}
        <div className="flex items-center gap-2 flex-shrink-0 pt-1">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              wishlisted
                ? "border-red-400 bg-red-50 text-red-500"
                : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
            }`}
          >
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-all"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
          </button>
        </div>
      </div>

      {/* ── Price Block ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-3xl font-bold text-[#1A2E21]">₹{plant?.discountedPrice}</p>
        {savings > 0 && (
          <>
            <p className="text-lg text-gray-400 line-through">₹{plant?.originalPrice}</p>
            <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-sm font-bold">
              {discountPct}% OFF
            </span>
            <span className="text-green-600 text-sm font-medium">You save ₹{savings}</span>
          </>
        )}
      </div>

      {/* ── Stock Indicator ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
        <p className="text-sm text-orange-600 font-medium">Only 7 left in stock — order soon</p>
      </div>

      {/* ── Pot Size Selector ───────────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Pot Size — <span className="text-[#1A2E21] normal-case font-semibold">{potSize}</span>
        </p>
        <div className="flex gap-2">
          {potSizes.map((size) => (
            <button
              key={size}
              onClick={() => setPotSize(size)}
              className={`px-3 py-2 rounded-xl text-sm border-2 font-medium transition-all ${
                potSize === size
                  ? "border-[#1A2E21] bg-[#1A2E21] text-white"
                  : "border-gray-200 text-gray-600 hover:border-[#8A9A5B]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ── Available Offers ────────────────────────────────────────── */}
      {/* <div className="rounded-2xl border border-[#E8EDE2] overflow-hidden">
        <div className="px-4 py-3 bg-[#F9F9F7] flex items-center justify-between">
          <p className="text-sm font-bold text-[#1A2E21]">Available Offers</p>
          <button
            onClick={() => setShowAllOffers(!showAllOffers)}
            className="text-[#8A9A5B] text-xs font-bold flex items-center gap-1"
          >
            {showAllOffers ? "Less" : "More"}
            {showAllOffers ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {(showAllOffers ? offers : offers.slice(0, 1)).map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <Icon size={14} className="text-[#8A9A5B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* ── Tab Section ─────────────────────────────────────────────── */}
      <div>
        <div className="flex border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-bold transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#1A2E21] text-[#1A2E21]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="pt-4">
          {activeTab === "Description" && (
            <p className="text-gray-600 leading-relaxed text-sm">
              {plant?.description ||
                "A stunning addition to any space, this plant brings life and calm energy wherever it grows. Hardy, low-maintenance, and beautiful year-round."}
            </p>
          )}

          {activeTab === "Care Guide" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  icon: Sun,
                  label: "Light",
                  value:
                    plant?.lightRequirements?.replace("_", " ").toLowerCase() ||
                    "Partial Shade",
                },
                {
                  icon: Droplets,
                  label: "Water",
                  value: plant?.wateringRequirements || "Once a week",
                },
                {
                  icon: PawPrint,
                  label: "Pet Safe",
                  value: plant?.petFrendly ? "Non-toxic ✓" : "Keep away ⚠",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3.5 bg-[#F9F9F7] rounded-xl border border-[#E8EDE2]"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E8EDE2] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#8A9A5B]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm text-[#1A2E21] font-semibold capitalize">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-4">
              {/* Aggregate */}
              <div className="flex items-center gap-6 p-4 bg-[#F9F9F7] rounded-xl border border-[#E8EDE2]">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#1A2E21]">4.3</p>
                  <StarRow rating={4.3} small />
                  <p className="text-xs text-gray-400 mt-0.5">128 reviews</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const pct = [52, 28, 12, 5, 3][5 - s];
                    return (
                      <div key={s} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-3">{s}</span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#F59E0B] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Sample reviews */}
              {[
                { name: "Priya S.", rating: 5, text: "Beautiful healthy plant! Arrived well-packed and is already growing new leaves.", date: "2 days ago" },
                { name: "Rahul M.", rating: 4, text: "Great quality, slightly smaller than expected but very lush. Will order again!", date: "1 week ago" },
              ].map((r, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-[#1A2E21]">{r.name}</p>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <StarRow rating={r.rating} small />
                  <p className="text-sm text-gray-600 mt-1.5">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Pincode Checker ─────────────────────────────────────────── */}
      <PincodeChecker />

      {/* ── Trust Badges ────────────────────────────────────────────── */}
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <TrustBadge icon={Truck} title="Free Shipping" sub="Orders above ₹599" />
        <TrustBadge icon={Shield} title="Secure Pay" sub="100% safe checkout" />
        <TrustBadge icon={Package} title="Safe Packing" sub="Damage-proof box" />
      </div>

      {/* ── Desktop Qty + CTA ───────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-4 pt-2">
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-lg font-bold"
          >
            −
          </button>
          <span className="px-6 font-bold text-[#1A2E21]">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-lg font-bold"
          >
            +
          </button>
        </div>
        <button className="flex-1 bg-[#1A2E21] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#264230] active:scale-[0.98] transition-all shadow-lg shadow-green-900/10">
          <ShoppingCart size={18} /> Add to Cart
        </button>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            wishlisted
              ? "border-red-400 bg-red-50 text-red-500"
              : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
          }`}
        >
          <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* ── Mobile Sticky Bar ────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 border-t border-gray-200 flex items-center gap-2 md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2.5 text-lg bg-gray-50 hover:bg-gray-100"
          >
            −
          </button>
          <span className="px-3 font-bold text-sm min-w-[28px] text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-2.5 text-lg bg-gray-50 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <button className="flex-1 bg-white border-2 border-[#1A2E21] text-[#1A2E21] py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
          <ShoppingCart size={16} /> Add to Cart
        </button>
        <button className="flex-1 bg-[#1A2E21] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
          <Zap size={16} fill="currentColor" /> Buy Now
        </button>
      </div>

      <div className="h-20 md:hidden" />
    </div>
  );
}
