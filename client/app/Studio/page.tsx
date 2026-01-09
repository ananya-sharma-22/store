"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Heart, X } from "lucide-react";


/* ---------------- OPTIONS ---------------- */
const occasions = [
  { id: "wedding", label: "Wedding", emoji: "💍" },
  { id: "festival", label: "Festival", emoji: "🎉" },
  { id: "party", label: "Party", emoji: "🥳" },
  { id: "casual", label: "Casual", emoji: "👗" },
  { id: "reception", label: "Reception", emoji: "🥂" },
  { id: "sangeet", label: "Sangeet", emoji: "🎶" },
  { id: "mehndi", label: "Mehndi", emoji: "🌿" },
  { id: "puja", label: "Puja", emoji: "🕉️" },
  { id: "cocktail", label: "Cocktail", emoji: "🍸" },
];

const styles = [
  { id: "traditional", label: "Traditional", emoji: "🪔" },
  { id: "modern", label: "Modern", emoji: "✨" },
  { id: "fusion", label: "Fusion", emoji: "🎨" },
  { id: "minimal", label: "Minimalist", emoji: "⚪" },
  { id: "luxury", label: "Luxury", emoji: "💎" },
];

const colors = [
  { id: "red", hex: "#E53935" },
  { id: "orange", hex: "#FF6B35" },
  { id: "yellow", hex: "#FBC02D" },
  { id: "green", hex: "#43A047" },
  { id: "blue", hex: "#1E88E5" },
  { id: "purple", hex: "#8E24AA" },
  { id: "pink", hex: "#EC407A" },
  { id: "black", hex: "#000000" },
  { id: "white", hex: "#FFFFFF" },
  { id: "gold", hex: "#D4AF37" },
];

const budgets = [
  { id: "budget", label: "Budget Friendly", range: "₹1,000 - ₹5,000" },
  { id: "mid", label: "Mid Range", range: "₹5,000 - ₹15,000" },
  { id: "premium", label: "Premium", range: "₹15,000 - ₹25,000" },
  { id: "luxury", label: "Luxury", range: "₹25,000+" },
];

export default function StudioPage() {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<string[]>([]);
  const [style, setStyle] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<OutfitItem | null>(null);
  const [toggleWishlist, isWishlisted] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const toggleOccasion = (id: string) => {
    setOccasion((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  /* ---------- STEP 2: BUILD SEARCH QUERY ---------- */
  const buildSearchQuery = () => {
    return `Indian ${occasion.join(" ")} ${style ?? ""} ${
      color ?? ""
    } ${budget ?? ""} outfit`;
  };

  /* ---------- STEP 2: FETCH RECOMMENDATIONS ---------- */
  const fetchRecommendations = async () => {
    setLoading(true);
    setShowResults(true);

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: buildSearchQuery(),
        }),
      });

      const data = await res.json();
      setResults(data.images || []);
    } catch (err) {
      console.error("Recommendation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED] py-16 px-4">
      {/* HEADER */}
      <div className="text-center mb-10">
        <span className="inline-block bg-[#FFE5D9] text-[#FF6B35] px-4 py-1 rounded-full text-sm mb-4">
          ✨ Personalized Recommendations
        </span>
        <h1 className="text-3xl font-serif font-semibold">
          Find Your Perfect Outfit
        </h1>
      </div>

      {activeItem && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
    <div className="bg-white max-w-md w-full rounded-2xl overflow-hidden relative">
      {/* Close */}
      <button
        onClick={() => setActiveItem(null)}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
      >
        <X size={18} />
      </button>

      {/* Image */}
      <img
        src={activeItem.image}
        alt={activeItem.title}
        className="w-full h-96 object-cover"
      />

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">
          {activeItem.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Inspired by Pinterest & Indian festive wear
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => toggleWishlist(activeItem)}
            className="flex items-center gap-2 text-sm"
          >
            <Heart
              size={18}
              className={
                isWishlisted(activeItem.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }
            />
            Save to Wishlist
          </button>

          <a
            href={activeItem.link || "#"}
            target="_blank"
            className="btn-primary"
          >
            View Source
          </a>
        </div>
      </div>
    </div>
  </div>
)}


      {/* STEPS */}
      {!showResults && (
        <div className="flex justify-center gap-4 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === s
                  ? "bg-[#FF6B35] text-white"
                  : "border text-gray-400"
              }`}
            >
              {step > s ? <Check size={14} /> : s}
            </div>
          ))}
        </div>
      )}

{showResults && (
  <div className="max-w-6xl w-full">
    <h2 className="text-xl font-semibold mb-6">
      Recommended for You
    </h2>

    {/* Masonry */}
    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
      {results.map((item) => (
        <div
          key={item.id}
          className="break-inside-avoid bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition relative cursor-pointer"
        >

          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full object-cover"
            onClick={() => setActiveItem(item)}
          />

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-sm line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Pinterest inspired
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      {/* FORM */}
      {!showResults && (
        <div className="bg-white max-w-xl mx-auto rounded-2xl p-8">
          {step === 1 && (
            <>
              <h2 className="title">Occasion</h2>
              <Grid>
                {occasions.map((o) => (
                  <Option
                    key={o.id}
                    active={occasion.includes(o.id)}
                    onClick={() => toggleOccasion(o.id)}
                  >
                    {o.emoji} {o.label}
                  </Option>
                ))}
              </Grid>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="title">Style</h2>
              <Grid>
                {styles.map((s) => (
                  <Option
                    key={s.id}
                    active={style === s.id}
                    onClick={() => setStyle(s.id)}
                  >
                    {s.emoji} {s.label}
                  </Option>
                ))}
              </Grid>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="title">Color</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      color === c.id ? "border-[#FF6B35]" : "border-gray-300"
                    }`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="title">Budget</h2>
              <Grid cols={2}>
                {budgets.map((b) => (
                  <Option
                    key={b.id}
                    active={budget === b.id}
                    onClick={() => setBudget(b.id)}
                  >
                    {b.label}
                  </Option>
                ))}
              </Grid>
            </>
          )}

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(step - 1)} className="btn-outline">
              Back
            </button>

            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} className="btn-primary">
                Next
              </button>
            ) : (
              <button onClick={fetchRecommendations} className="btn-primary">
                Get Recommendations
              </button>
            )}
          </div>
        </div>
      )}

      {/* RESULTS — PINTEREST STYLE */}
      {showResults && (
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-serif mb-6">
            Recommended for You
          </h2>

          {loading ? (
            <p className="text-center">Loading inspiration…</p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {results.map((item, i) => (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .title {
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .btn-primary {
          background: #ff6b35;
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
        }
        .btn-outline {
          border: 1px solid #ff6b35;
          color: #ff6b35;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}

/* ---------- REUSABLE ---------- */
function Grid({ children, cols = 3 }: any) {
  return <div className={`grid grid-cols-${cols} gap-4 mb-6`}>{children}</div>;
}

function Option({ children, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-center ${
        active
          ? "border-[#FF6B35] bg-[#FFF1EB]"
          : "border-gray-200 hover:border-[#FF6B35]"
      }`}
    >
      {children}
    </button>

    
  );
}
