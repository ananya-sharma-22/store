"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useCart } from "@/app/providers/CartProvider";
import { Facebook, Instagram, Linkedin, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: "saree" | "lehenga" | "custom";
  description: string;
};

export default function ProductUI({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const imgRef = useRef<HTMLDivElement>(null);
  const { addToCart, openCart } = useCart();
  const router = useRouter();

  /* ---------------- ZOOM TRACKING ---------------- */
  const handleMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  const handleAddToCart = () => {
    // add product qty times (CartProvider handles quantity internally)
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,          // ✅ using slug as id
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }
    openCart();
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-[80px_420px_1fr] gap-10 items-start">

        {/* THUMBNAILS */}
        <div className="flex flex-col gap-3">
          {product.images.map((img, i) => (
            <button
              key={img}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`border ${
                active === i ? "border-red-600" : "border-gray-300"
              }`}
            >
              <Image src={img} alt={product.name} width={60} height={80} />
            </button>
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div
          ref={imgRef}
          className="relative w-105 h-140 border bg-white overflow-hidden"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMove}
          onClick={() => setZoom(!zoom)}
        >
          <Image
            src={product.images[active]}
            alt={product.name}
            fill
            className="object-contain"
            priority
          />

          {zoom && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${product.images[active]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "200%",
                backgroundPosition: `${pos.x}% ${pos.y}%`,
              }}
            />
          )}
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-2xl font-medium mb-2">{product.name}</h1>
          <p className="text-lg mb-6">₹{product.price}</p>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm mb-1">Quantity *</p>
            <div className="inline-flex border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3"
              >
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-red-600 text-white py-3 rounded-full"
            >
              Book Now
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full border border-red-600 text-red-600 py-3 rounded-full"
            >
              Customize Design
            </button>
          </div>

          {/* Share */}
          <div className="flex gap-4 mt-6 text-gray-600">
            <Facebook size={18} />
            <Instagram size={18} />
            <Linkedin size={18} />
            <Share2 size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}
