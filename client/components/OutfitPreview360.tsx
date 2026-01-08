"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";

type Pose = {
  key: string;
  label: string;
};

export default function OutfitPreview360({
  products,
  activeIndex,
  fabricName,
  fabricTexture,
  aiImage,
}: {
  products: Product[];
  activeIndex: number;
  fabricName?: string | null;
  fabricTexture?: string | null;
  aiImage?: string | null;
}) {
  const POSES: Pose[] = [
    { key: "front", label: "Front" },
    { key: "angle", label: "Angle" },
    { key: "side", label: "Side" },
    { key: "back", label: "Back" },
  ];

  const FRAMES_PER_POSE = 6;

  const [pose, setPose] = useState<Pose>(POSES[0]);
  const [frame, setFrame] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  const product = products?.[activeIndex];

  useEffect(() => {
    setFrame(0);
  }, [activeIndex, pose.key]);

  if (!product && !aiImage) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a style to preview
      </div>
    );
  }

  const poseIndex = POSES.findIndex((p) => p.key === pose.key);
  const imageIndex = poseIndex * FRAMES_PER_POSE + frame;

  const imageSrc =
    aiImage ||
    product?.images?.[imageIndex] ||
    product?.images?.[0] ||
    "/placeholder.png";

  return (
    <div className="flex flex-col items-center">
      {/* POSE SWITCHER */}
      {!aiImage && (
        <div className="flex gap-2 mb-4">
          {POSES.map((p) => (
            <button
              key={p.key}
              onClick={() => setPose(p)}
              className={`px-4 py-1 rounded-full text-sm border ${
                pose.key === p.key
                  ? "border-[#e26a4f] text-[#e26a4f]"
                  : "border-gray-300"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* IMAGE */}
      <div
        className="relative w-[380px] h-[560px] rounded-[28px] overflow-hidden bg-white shadow-xl select-none"
        onMouseDown={(e) => {
          dragging.current = true;
          startX.current = e.clientX;
        }}
        onMouseMove={(e) => {
          if (!dragging.current) return;
          const delta = e.clientX - startX.current;
          const steps = Math.floor(delta / 20);
          if (steps !== 0) {
            setFrame((f) => (f + steps + FRAMES_PER_POSE) % FRAMES_PER_POSE);
            startX.current = e.clientX;
          }
        }}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
      >
        <Image
          src={imageSrc}
          alt="Outfit Preview"
          fill
          className="object-cover"
          priority
        />

        {/* FABRIC OVERLAY */}
        {fabricTexture && !aiImage && (
          <div
            className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url(${fabricTexture})`,
              backgroundSize: "cover",
            }}
          />
        )}

        {/* CONTROLS */}
        {!aiImage && (
          <>
            <button
              onClick={() =>
                setFrame((f) => (f - 1 + FRAMES_PER_POSE) % FRAMES_PER_POSE)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() =>
                setFrame((f) => (f + 1) % FRAMES_PER_POSE)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {fabricName && (
          <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm">
            Fabric: {fabricName}
          </div>
        )}
      </div>

      <p className="mt-4 font-serif text-2xl font-semibold">
        {product?.name || "AI Reference"}
      </p>
    </div>
  );
}
