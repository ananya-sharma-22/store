"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import styles from "./HomeCatalogue.module.css";
import { useRef } from "react";

export default function HomeCatalogue() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <section className={styles.catalogue}>
      <h2 className={styles.title}>All Products</h2>

      <div className={styles.wrapper}>
        {/* LEFT ARROW */}
        <button className={styles.arrowLeft} onClick={scrollLeft}>
          &#8592;
        </button>

        {/* SCROLL AREA */}
        <div className={styles.scroll} ref={scrollRef}>
          {products.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className={`${styles.img} ${styles.imgFront}`}
                />
                <Image
                  src={p.images[1]}
                  alt={p.name}
                  fill
                  className={`${styles.img} ${styles.imgHover}`}
                />
              </div>

              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.price}>₹{p.price}</p>

              <button className={styles.btn}>Book Now</button>
            </Link>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button className={styles.arrowRight} onClick={scrollRight}>
          &#8594;
        </button>
      </div>
    </section>
  );
}
