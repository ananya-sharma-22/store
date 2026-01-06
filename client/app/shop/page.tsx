"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/app/providers/CartProvider";

export default function ShopPage() {
  const { addToCart, openCart } = useCart();

  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("featured");
  const [quickView, setQuickView] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (availability !== "all") {
      list = list.filter((p) =>
        availability === "in" ? p.inStock : !p.inStock
      );
    }

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [category, availability, sort]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });

    openCart();
  };

  return (
    <main className="px-6 py-12">
      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex gap-3 flex-wrap">
          <select
            className="border rounded-full px-4 py-2 text-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Product type</option>
            <option value="saree">Saree</option>
            <option value="lehenga">Lehenga</option>
            <option value="gown">Gown</option>
            <option value="custom">Custom</option>
          </select>

          <select
            className="border rounded-full px-4 py-2 text-sm"
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="all">Availability</option>
            <option value="in">In stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>

        <select
          className="border rounded-full px-4 py-2 text-sm"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-xl bg-[#f7f7f7]">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={350}
                height={460}
                className="w-full h-[420px] object-cover transition-opacity duration-300 group-hover:opacity-0"
              />

              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  width={350}
                  height={460}
                  className="absolute inset-0 w-full h-[420px] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}

              {/* ADD TO CART */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className="absolute inset-x-4 bottom-16 bg-[#e2724f] text-white text-sm py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                Add to Cart
              </button>

              {/* QUICK VIEW */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuickView(product);
                  setActiveImage(0);
                }}
                className="absolute inset-x-4 bottom-4 bg-[#eda189] text-gray-800 text-sm py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                Quick View
              </button>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-[#faf7f4] rounded-2xl max-w-4xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={() => setQuickView(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {/* IMAGE GALLERY */}
              <div className="flex gap-4">
                {/* THUMBNAILS */}
                <div className="flex md:flex-col gap-3 overflow-auto max-h-[420px]">
                  {quickView.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`border rounded-lg overflow-hidden w-20 h-24 flex-shrink-0 ${
                        activeImage === idx
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={quickView.name}
                        width={80}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="flex-1">
                  <Image
                    src={quickView.images[activeImage]}
                    alt={quickView.name}
                    width={420}
                    height={540}
                    className="rounded-xl object-cover w-full h-[420px]"
                  />
                </div>
              </div>

              {/* INFO */}
              <div>
                <h2 className="text-xl font-semibold">{quickView.name}</h2>
                <p className="text-lg mt-2">₹{quickView.price}</p>
                <p className="text-sm text-gray-600 mt-4">
                  {quickView.description}
                </p>

                <button
                  onClick={() => handleAddToCart(quickView)}
                  className="mt-6 w-full bg-[#e2724f] text-white py-3 rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
