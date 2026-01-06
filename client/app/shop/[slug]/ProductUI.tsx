"use client";

import Image from "next/image";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/app/providers/CartProvider";
import {
  Share2,
  Facebook,
  Copy,
  ChevronDown,
} from "lucide-react";

type Props = {
  product: any;
};

export default function ProductUI({ product }: Props) {
  const { addToCart, openCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>("description");

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      // slug: product.id,
    });
    openCart();
  };

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      {/* TOP */}
      <div className="grid md:grid-cols-2 gap-14">
        {/* IMAGES */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`border rounded-lg overflow-hidden w-20 h-24 ${
                  activeImage === idx
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={product.name}
                  width={80}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 border rounded-xl p-4 bg-white">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              width={520}
              height={680}
              className="object-contain mx-auto"
            />
          </div>
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-xl mt-2">₹{product.price}</p>

          {/* CTA */}
          <div className="mt-6 space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-red-600 text-white py-3 rounded-full text-sm"
            >
              Book Now
            </button>

            <button className="w-full border border-red-600 text-red-600 py-3 rounded-full text-sm">
              Customize Design
            </button>
          </div>

          {/* SHARE ICONS */}
          <div className="flex items-center gap-5 mt-6 text-gray-700">
            <Share2 size={18} />

            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              className="hover:text-green-600"
            >
              <Image
                src="/images/whatsapp.png"
                alt="WhatsApp"
                width={25}
                height={25}
              />
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              className="hover:text-blue-600"
            >
              <Facebook size={18} />
            </a>

            <button onClick={copyLink} className="hover:text-black">
              <Copy size={18} />
            </button>
          </div>

          {/* ACCORDION */}
          <div className="mt-10 border-t">
            <Accordion
              title="Read Description"
              open={openSection === "description"}
              onClick={() =>
                setOpenSection(
                  openSection === "description" ? null : "description"
                )
              }
            >
              {product.description}
            </Accordion>

            <Accordion
              title="Product Details"
              open={openSection === "details"}
              onClick={() =>
                setOpenSection(
                  openSection === "details" ? null : "details"
                )
              }
            >
              <ul className="list-disc pl-5">
                <li>Premium quality fabric</li>
                <li>Hand-finished detailing</li>
                <li>Dry clean recommended</li>
              </ul>
            </Accordion>

            <Accordion
              title="FAQs"
              open={openSection === "faq"}
              onClick={() =>
                setOpenSection(openSection === "faq" ? null : "faq")
              }
            >
              <p>
                <strong>Q:</strong> Can I customize this design?
                <br />
                <strong>A:</strong> Yes, customization is available.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold mb-6">
            You may also like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href={`/shop/${item.id}`}
                className="text-center"
              >
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={260}
                  height={340}
                  className="rounded-lg object-cover"
                />
                <p className="mt-2 text-sm">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.price}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

/* ---------- Accordion ---------- */

function Accordion({
  title,
  open,
  onClick,
  children,
}: {
  title: string;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-sm font-medium"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-4 text-sm text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
}
