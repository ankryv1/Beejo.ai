"use client";

import { useState } from "react";

import {
  ShoppingCart,
  Zap,
  Sun,
  Droplets,
  PawPrint,
  Heart,
  Share2,
  Shield,
  Truck,
  Package,
  Check,
  Tag,
  Leaf,
  MapPin,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

function StarRow({
  rating = 4.3,
  count = 128,
  small = false,
}) {
  return (
    <div
      className={`flex items-center ${
        small ? "gap-1" : "gap-2"
      }`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width={small ? 12 : 16}
          height={small ? 12 : 16}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z"
            fill={
              s <= Math.round(rating)
                ? "#F59E0B"
                : "#E5E7EB"
            }
          />
        </svg>
      ))}

      {!small && (
        <span className="ml-1 text-sm text-gray-500">
          <strong className="text-[#1A2E21]">
            {rating}
          </strong>{" "}
          ({count} reviews)
        </span>
      )}
    </div>
  );
}

const letsAddToCart = async () => {
  await fetch("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: plant.id,
      variantId: selectedVariant.id,
      quantity: qty,
    }),
  });
};

function TrustBadge({
  icon: Icon,
  title,
  sub,
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[#E8EDE2] bg-[#F9F9F7] p-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1A2E21]/8">
        <Icon
          size={16}
          className="text-[#8A9A5B]"
        />
      </div>

      <div>
        <p className="text-xs font-bold text-[#1A2E21]">
          {title}
        </p>

        <p className="text-[11px] text-gray-400">
          {sub}
        </p>
      </div>
    </div>
  );
}

function PincodeChecker() {
  const [pin, setPin] = useState("");
  const [status, setStatus] =
    useState(null);

  const check = () => {
    if (pin.length === 6) {
      setStatus(
        pin.startsWith("3")
          ? "ok"
          : "err"
      );
    }
  };

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
        Check Delivery
      </p>

      <div className="flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 transition-colors focus-within:border-[#8A9A5B]">
          <MapPin
            size={14}
            className="flex-shrink-0 text-gray-400"
          />

          <input
            type="text"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              setPin(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              );

              setStatus(null);
            }}
            placeholder="Enter pincode"
            className="flex-1 bg-transparent text-sm text-[#1A2E21] outline-none"
          />
        </div>

        <button
          onClick={check}
          className="rounded-xl bg-[#1A2E21] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#264230]"
        >
          Check
        </button>
      </div>

      {status === "ok" && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-green-600">
          <Check size={12} />
          Delivery available · Arrives
          in 3–5 days
        </p>
      )}

      {status === "err" && (
        <p className="mt-1.5 text-xs text-red-500">
          Sorry, we don't deliver to
          this pincode yet.
        </p>
      )}
    </div>
  );
}

const TABS = [
  "Description",
  "Care Guide",
  "Reviews",
];

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function ProductInfo({
  plant,
}) {
  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] =
    useState(
      plant?.variants?.[0]?.size || ""
    );

  const [wishlisted, setWishlisted] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("Description");

  const selectedVariant =
    plant?.variants?.find(
      (variant) =>
        variant.size === selectedSize
    );

  const isOutOfStock =
    selectedVariant?.stock === 0;

  const savings =
    (selectedVariant?.originalPrice ||
      0) -
    (selectedVariant?.discountedPrice ||
      0);

  const discountPct =
    selectedVariant?.originalPrice
      ? Math.round(
          (savings /
            selectedVariant.originalPrice) *
            100
        )
      : 0;

  const potSizes =
    plant?.variants || [];

  const handleShare = async () => {
    const url =
      window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "Check out this plant!",
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(
        url
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col space-y-5">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#8A9A5B]">
            <Leaf size={11} />
            {plant?.category}
          </span>

          <h1 className="mt-1 text-3xl font-serif capitalize leading-tight text-[#1A2E21]">
            {plant?.plantName}
          </h1>

          <div className="mt-2 flex items-center gap-3">
            <StarRow
              rating={4.3}
              count={128}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-shrink-0 items-center gap-2 pt-1">

          <button
            onClick={() =>
              setWishlisted(
                !wishlisted
              )
            }
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
              wishlisted
                ? "border-red-400 bg-red-50 text-red-500"
                : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
            }`}
          >
            <Heart
              size={16}
              fill={
                wishlisted
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          <button
            onClick={handleShare}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#8A9A5B] hover:text-[#8A9A5B]"
          >
            {copied ? (
              <Check
                size={16}
                className="text-green-500"
              />
            ) : (
              <Share2 size={16} />
            )}
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex flex-wrap items-center gap-3">

        <p className="text-3xl font-bold text-[#1A2E21]">
          ₹
          {
            selectedVariant?.discountedPrice
          }
        </p>

        {savings > 0 && (
          <>
            <p className="text-lg text-gray-400 line-through">
              ₹
              {
                selectedVariant?.originalPrice
              }
            </p>

            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-bold text-green-700">
              {discountPct}% OFF
            </span>

            <span className="text-sm font-medium text-green-600">
              You save ₹
              {savings}
            </span>
          </>
        )}
      </div>

      {/* STOCK */}
      <div className="flex items-center gap-2">

        <span
          className={`h-2 w-2 rounded-full ${
            isOutOfStock
              ? "bg-red-500"
              : "bg-orange-400 animate-pulse"
          }`}
        />

        <p
          className={`text-sm font-medium ${
            isOutOfStock
              ? "text-red-500"
              : "text-orange-600"
          }`}
        >
          {isOutOfStock
            ? "Out of stock"
            : `Only ${selectedVariant?.stock} left in stock`}
        </p>
      </div>

      {/* SIZE */}
      <div>

        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          Pot Size —
          <span className="normal-case font-semibold text-[#1A2E21]">
            {" "}
            {selectedSize}
          </span>
        </p>

        <div className="flex gap-2">

          {potSizes.map(
            (variant) => (
              <button
                key={variant.size}
                onClick={() =>
                  setSelectedSize(
                    variant.size
                  )
                }
                className={`rounded-xl border-2 px-3 py-2 text-sm font-medium transition-all ${
                  selectedSize ===
                  variant.size
                    ? "border-[#1A2E21] bg-[#1A2E21] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#8A9A5B]"
                }`}
              >
                {variant.size}
              </button>
            )
          )}
        </div>
      </div>

      {/* TABS */}
      <div>

        <div className="flex border-b border-gray-100">

          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-bold transition-all ${
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

          {activeTab ===
            "Description" && (
            <p className="text-sm leading-relaxed text-gray-600">
              {
                plant?.description
              }
            </p>
          )}

          {activeTab ===
            "Care Guide" && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

              {[
                {
                  icon: Sun,
                  label: "Light",
                  value:
                    plant?.lightRequirements?.replaceAll(
                      "_",
                      " "
                    ),
                },

                {
                  icon: Droplets,
                  label: "Water",
                  value:
                    plant?.wateringRequirements,
                },

                {
                  icon: PawPrint,
                  label:
                    "Pet Safe",

                  value:
                    plant?.petFriendly
                      ? "Non-toxic ✓"
                      : "Keep away ⚠",
                },
              ].map(
                ({
                  icon: Icon,
                  label,
                  value,
                }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-[#E8EDE2] bg-[#F9F9F7] p-3.5"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#E8EDE2] bg-white">
                      <Icon
                        size={16}
                        className="text-[#8A9A5B]"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {label}
                      </p>

                      <p className="text-sm font-semibold capitalize text-[#1A2E21]">
                        {value}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* PINCODE */}
      {/* <PincodeChecker /> */}

      {/* TRUST */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">

        <TrustBadge
          icon={Truck}
          title="Free Shipping"
          sub="Orders above ₹599"
        />

        <TrustBadge
          icon={Shield}
          title="Secure Pay"
          sub="100% safe checkout"
        />

        <TrustBadge
          icon={Package}
          title="Safe Packing"
          sub="Damage-proof box"
        />
      </div>

      {/* DESKTOP CTA */}
      <div className="hidden items-center gap-4 pt-2 md:flex">

        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">

          <button
            onClick={() =>
              setQty(
                Math.max(
                  1,
                  qty - 1
                )
              )
            }
            className="bg-gray-50 px-4 py-3 text-lg font-bold transition-colors hover:bg-gray-100"
          >
            −
          </button>

          <span className="px-6 font-bold text-[#1A2E21]">
            {qty}
          </span>

          <button
            onClick={() => {
              if (
                qty <
                selectedVariant?.stock
              ) {
                setQty(
                  qty + 1
                );
              }
            }}
            className="bg-gray-50 px-4 py-3 text-lg font-bold transition-colors hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          disabled={isOutOfStock}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all shadow-lg shadow-green-900/10 ${
            isOutOfStock
              ? "cursor-not-allowed bg-gray-400 text-white"
              : "bg-[#1A2E21] text-white hover:bg-[#264230]"
          }`}
        >
          <ShoppingCart size={18} />

          {isOutOfStock
            ? "Out of Stock"
            : "Add to Cart"}
        </button>
      </div>

      {/* MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-gray-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm md:hidden">

        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">

          <button
            onClick={() =>
              setQty(
                Math.max(
                  1,
                  qty - 1
                )
              )
            }
            className="bg-gray-50 px-3 py-2.5 text-lg hover:bg-gray-100"
          >
            −
          </button>

          <span className="min-w-[28px] px-3 text-center text-sm font-bold">
            {qty}
          </span>

          <button
            onClick={() => {
              if (
                qty <
                selectedVariant?.stock
              ) {
                setQty(
                  qty + 1
                );
              }
            }}
            className="bg-gray-50 px-3 py-2.5 text-lg hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          disabled={isOutOfStock} onClick={letsAddToCart}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-bold transition-transform ${
            isOutOfStock
              ? "cursor-not-allowed bg-gray-400 text-white"
              : "border-2 border-[#1A2E21] bg-white text-[#1A2E21] active:scale-95"
          }`}
        >
          <ShoppingCart size={16} />

          {isOutOfStock
            ? "Out of Stock"
            : "Add to Cart"}
        </button>

        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1A2E21] py-3 text-sm font-bold text-white transition-transform active:scale-95">
          <Zap
            size={16}
            fill="currentColor"
          />
          Buy Now
        </button>
      </div>

      <div className="h-20 md:hidden" />
    </div>
  );
}