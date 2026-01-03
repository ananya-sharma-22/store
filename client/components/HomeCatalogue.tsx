"use client";

import Image from "next/image";
import { useCart } from "@/app/lib/cart-context";

const products = [
  {
    name: "Indo-Western Saree",
    price: 5000,
    slug: "indo-western-saree",
    img1: "/images/p1-1.jpg",
    img2: "/images/p1-2.jpg",
  },
  {
    name: "Dazzling Shimmery Lehenga",
    price: 8000,
    slug: "dazzling-shimmery-lehenga",
    img1: "/images/p2-1.jpg",
    img2: "/images/p2-2.jpg",
  },
  {
    name: "Sequence Blouse with Lehenga",
    price: 4000,
    slug: "sequence-blouse-lehenga",
    img1: "/images/p3-1.jpg",
    img2: "/images/p3-2.jpg",
  },
  {
    name: "Customised Saree",
    price: 5000,
    slug: "customised-saree",
    img1: "/images/p4-1.jpeg",
    img2: "/images/p4-2.jpg",
  },
];

export default function HomeCatalogue() {
  const { addToCart } = useCart();

  return (
    <section className="home-catalogue">
      <h2 className="catalogue-title">All Products</h2>

      <div className="catalogue-scroll">
        {products.map((p) => (
          <div key={p.slug} className="product-card">
            <div className="product-image">
              <Image src={p.img1} alt={p.name} fill className="img-front" />
              <Image src={p.img2} alt={p.name} fill className="img-hover" />
            </div>

            <h3>{p.name}</h3>
            <p className="price">₹{p.price.toLocaleString()}</p>

            <button
              onClick={() =>
                addToCart({
                  slug: p.slug,
                  name: p.name,
                  price: p.price,
                  image: p.img1,
                  quantity: 1,
                })
              }
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
