"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import products, { Product } from "@/data/products";




/* ---------------- TYPES ---------------- */

type Category = {
  key: string;
  label: string;
  subtitle: string;
};

type Fabric = {
  name: string;
  price: number;
  image: string;
};

type AddOn = {
  name: string;
  price: number;
};

const TABS = ["Style", "Fabric", "Details"] as const;

/* ---------------- DATA ---------------- */

const CATEGORIES: Category[] = [
  { key: "lehenga", label: "Lehenga", subtitle: "Formal traditional" },
  { key: "gown", label: "Gown", subtitle: "Designer wear" },
  { key: "anarkali", label: "Anarkali", subtitle: "Fusion elegance" },
  { key: "saree", label: "Saree", subtitle: "Timeless drape" },
  { key: "suit", label: "Suit Stitching", subtitle: "Royal knee-length coat" },
  { key: "co-ord", label: "One-Piece", subtitle: "Contemporary classic" },
];

const FABRICS: Fabric[] = [
  { name: "Pure Silk", price: 5999, image: "/images/fabrics/puresilk.jpg" },
  { name: "Velvet", price: 7499, image: "/images/fabrics/velvet.jpg" },
  { name: "Silk Blend", price: 4999, image: "/images/fabrics/silkblend.jpg" },
  { name: "Cotton Silk", price: 3499, image: "/images/fabrics/cottensilk.jpg" },
  { name: "Brocade", price: 8999, image: "/images/fabrics/brocade.jpg" },
  { name: "Chanderi", price: 4499, image: "/images/fabrics/chanderi.jpg" },
];

const ADDONS: AddOn[] = [
  { name: "Premium Lining", price: 899 },
  { name: "Gold-Plated Buttons", price: 599 },
  { name: "Hand Embroidery", price: 2499 },
  { name: "Decorative Tassels", price: 399 },
  { name: "Contrast Collar", price: 799 },
];



/* ---------------- HELPERS ---------------- */

function getCategoryProducts(categoryKey: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === categoryKey
  );
}

const convert = (value: number, to: "in" | "cm") =>
  to === "cm" ? value * 2.54 : value / 2.54;

/* ---------------- AI PROMPT ---------------- */

function buildAIPrompt({
  style,
  fabric,
  addons,
}: {
  style: string;
  fabric?: string;
  addons: string[];
}) {
  return `
High-quality studio fashion photograph of a female model,
neutral standing pose, front-facing,
professional soft lighting,
plain light background,
realistic fabric texture,
luxury Indian fashion editorial.

Outfit: ${style}.
Fabric: ${fabric ?? "premium fabric"}.
Design details: ${addons.length ? addons.join(", ") : "minimal elegant design"}.
`;
}

/* ---------------- PAGE ---------------- */


export default function DesignPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("Style");

  const [activeCategory, setActiveCategory] =
  useState<Category>(CATEGORIES[0]);

  const [selectedFabric, setSelectedFabric] =
    useState<Fabric | null>(null);

  const [selectedAddOns, setSelectedAddOns] =
    useState<AddOn[]>([]);

  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [measurements, setMeasurements] =
    useState<Record<string, string>>({});

  const [uploadedFile, setUploadedFile] =
    useState<File | null>(null);

  const [previewIndex, setPreviewIndex] = useState(0);

  const [aiImage, setAiImage] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const categoryProducts = getCategoryProducts(activeCategory.key);
  const stylePrice = categoryProducts[0]?.price ?? 0;


  /* ---------------- IMAGE ROTATION ---------------- */

  useEffect(() => {
    if (categoryProducts.length <= 1) return;
    const i = setInterval(
      () => setPreviewIndex((p) => (p + 1) % categoryProducts.length),
      2200
    );
    return () => clearInterval(i);
  }, [activeCategory.key, categoryProducts.length]);

  /* ---------------- AI IMAGE GENERATION ---------------- */

  const generateImage = async () => {
    const finalPrompt = buildAIPrompt({
      style: activeCategory.label,
      fabric: selectedFabric?.name,
      addons: selectedAddOns.map((a) => a.name),
    });

    try {
      setLoadingAI(true);

      const res = await fetch("/api/GenerateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();
      setAiImage(data.imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  /* ---------------- UNIT CONVERSION ---------------- */

  useEffect(() => {
    setMeasurements((prev) => {
      const next: Record<string, string> = {};
      Object.entries(prev).forEach(([k, v]) => {
        const n = parseFloat(v);
        if (!isNaN(n)) next[k] = convert(n, unit).toFixed(1);
      });
      return next;
    });
  }, [unit]);

  /* ---------------- ADD-ONS ---------------- */

  const toggleAddon = (addon: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.name === addon.name)
        ? prev.filter((a) => a.name !== addon.name)
        : [...prev, addon]
    );
  };

  /* ---------------- PRICING ---------------- */

  const addOnsTotal = selectedAddOns.reduce(
    (s, a) => s + a.price,
    0
  );
  const fabricPrice = selectedFabric?.price ?? 0;
  const subtotal = stylePrice + fabricPrice + addOnsTotal;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#fff5f0] overflow-hidden">
      {/* ---------------- LEFT PANEL ---------------- */}
      <aside className="w-[320px] bg-white border-r overflow-y-auto p-4">
        <h1 className="text-3xl font-serif font-bold text-[#e2724f]">
          ✦ Design Studio
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Customize every detail
        </p>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "border-[#e26a4f] text-[#e26a4f]"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* STYLE */}
        {activeTab === "Style" && (
          <div className="space-y-4">
            {CATEGORIES.map((category) => (
              <StyleCategoryCard
                key={category.key}
                category={category}
                products={getCategoryProducts(category.key)}
                isActive={activeCategory.key === category.key}
                onClick={() => {
                  setActiveCategory(category);
                  setPreviewIndex(0);
                }}
              />
            ))}
          </div>
        )}

        {/* FABRIC */}
        {activeTab === "Fabric" && (
          <div className="grid grid-cols-2 gap-3">
            {FABRICS.map((fabric) => (
              <button
                key={fabric.name}
                onClick={() => setSelectedFabric(fabric)}
                className={`border rounded-xl overflow-hidden bg-white font-serif ${
                  selectedFabric?.name === fabric.name
                    ? "border-[#174c3c]"
                    : "border-gray-200"
                }`}
              >
                <div className="relative h-24 bg-gray-100">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-left">
                  <p className="font-medium text-sm">{fabric.name}</p>
                  <p className="text-xs text-gray-500">
                    ₹{fabric.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* DETAILS */}
        {activeTab === "Details" && (
          <div className="space-y-3">
            {ADDONS.map((item) => {
              const selected = selectedAddOns.some(
                (a) => a.name === item.name
              );
              return (
                <button
                  key={item.name}
                  onClick={() => toggleAddon(item)}
                  className={`w-full h-[92px] flex justify-between items-center px-4 border rounded-xl bg-white ${
                    selected ? "border-[#174c3c]" : "border-gray-200"
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Premium add-on
                    </p>
                  </div>
                  <span className="font-semibold text-[#174c3c]">
                    +₹{item.price}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </aside>

    
      {/* CENTER PREVIEW */}
      <main className="flex-1 flex items-center justify-center bg-[#fff8f4]">
        <div className="relative w-[320px]">
          {loadingAI && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              Generating…
            </div>
          )}

          <img
            src={aiImage ?? "/images/placeholder-mannequin.jpg"}
            className="rounded-xl shadow-lg"
            alt="AI Preview"
          />

          <button onClick={generateImage}
            className="mt-4 w-full bg-[#e26a4f] text-white py-2 rounded-lg"
          >
            Update Preview
          </button>
          </div>
          </main>

      

      {/* ---------------- RIGHT PANEL ---------------- */}
      <aside className="w-[360px] bg-[#fff5f0] border-l p-5 overflow-y-auto">
        <h2 className="text-2xl font-serif font-bold mb-4">
          ✂ Fit & Finalize
        </h2>

        {/* Units */}
        <div className="flex mb-6">
          {["in", "cm"].map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u as any)}
              className={`flex-1 border px-3 py-1 text-sm ${
                unit === u ? "bg-white" : ""
              }`}
            >
              {u === "in" ? "Inches" : "Centimeters"}
            </button>
          ))}
        </div>

        {/* Upload */}
        <div className="bg-[#e26a4f] p-4 rounded-lg mb-6">
          <p className="font-semibold mb-2">
            Upload a full-body photo for instant measurement estimation
          </p>

          <label className="flex items-center justify-center gap-2 border bg-white px-4 py-2 cursor-pointer">
            ⬆ Upload Photo for AI Estimation
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setUploadedFile(e.target.files?.[0] ?? null)
              }
            />
          </label>

          {uploadedFile && (
            <p className="text-xs mt-2">{uploadedFile.name}</p>
          )}
        </div>

        {/* Measurements */}
        <h3 className="font-serif text-xl font-bold mb-4">
          Manual Measurements
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[
            ["Chest", "Measure around the fullest part"],
            ["Waist", "Measure around natural waistline"],
            ["Shoulder", "Measure across shoulders"],
            ["Sleeve", "Measure from shoulder to wrist"],
            ["Length", "Measure from neck to desired length"],
            ["Neck", "Measure around the neck base"],
          ].map(([label, hint]) => (
            <div key={label}>
              <label className="font-medium">{label}</label>
              <div className="flex items-center border mt-1">
                <input
                  value={measurements[label] ?? ""}
                  onChange={(e) =>
                    setMeasurements({
                      ...measurements,
                      [label]: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 bg-transparent outline-none"
                />
                <span className="px-2 text-sm">{unit}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{hint}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 border-t pt-4">
          <p className="font-semibold mb-2">✦ Order Summary</p>

          <Row label={activeCategory.label} value={`₹${stylePrice}`} />

          {selectedFabric && (
            <Row
              label={selectedFabric.name}
              value={`₹${selectedFabric.price}`}
            />
          )}

          {selectedAddOns.length > 0 && (
            <>
              <p className="mt-2 font-semibold">
                ADD-ONS ({selectedAddOns.length})
              </p>
              {selectedAddOns.map((a) => (
                <Row key={a.name} label={a.name} value={`₹${a.price}`} />
              ))}
            </>
          )}

          <hr className="my-2" />
          <Row label="Subtotal" value={`₹${subtotal}`} />
          <Row label="GST (18%)" value={`₹${tax}`} />
          <Row label="Total" value={`₹${total}`} bold />

          <button className="mt-4 w-full bg-[#e26a4f] text-white py-2 rounded-lg">
            Add to Cart
          </button>

          <p className="text-xs text-center mt-3">
            Free alterations within 30 days • 100% satisfaction guaranteed
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ---------------- STYLE CARD ---------------- */

function StyleCategoryCard({
  category,
  products,
  isActive,
  onClick,
}: {
  category: Category;
  products: Product[];
  isActive: boolean;
  onClick: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;
    const i = setInterval(
      () => setIndex((p) => (p + 1) % products.length),
      1800
    );
    return () => clearInterval(i);
  }, [products.length]);

  return (
    <button
      onClick={onClick}
      className={`w-full flex gap-4 items-center p-4 rounded-2xl border ${
        isActive ? "border-[#174c3c]" : "border-gray-200"
      }`}
    >
      <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-gray-100">
        {products[0] && (
          <Image
            src={products[index].images[0]}
            alt={products[index].name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="text-left">
        <p className="font-semibold text-lg">{category.label}</p>
        <p className="text-sm text-gray-500">{category.subtitle}</p>
      </div>
    </button>
  );
}

/* ---------------- ROW ---------------- */

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm mb-1">
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
