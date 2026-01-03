import Link from "next/link";
import Image from "next/image";
import HomeCatalogue from "@/components/HomeCatalogue";

const products = [
  {
    slug: "indo-western-saree",
    name: "Indo-Western Saree",
    price: 5000,
    image: "/images/p1-1.jpg",
  },
  {
    slug: "dazzling-shimmery-lehenga",
    name: "Dazzling Shimmery Lehenga",
    price: 8000,
    image: "/images/p2-1.jpg",
  },
  {
    slug: "sequence-blouse-lehenga",
    name: "Sequence Blouse with Lehenga",
    price: 4000,
    image: "/images/p3-1.jpg",
  },
  {
    slug: "customised-saree",
    name: "Customised Saree",
    price: 5000,
    image: "/images/p4-1.jpeg",
  },
];

export default function Home() {
  return (
    <main>

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-card">
          <h1 className="hero-title">WELCOME</h1>
          <p className="hero-text">
            Not stitched in bulk. Stitched in meaning.
          </p>
          <p className="hero-text">
            Not ordinary. Originated.
          </p>

          <Link href="/shop">
            <button className="hero-btn">Start Now</button>
          </Link>
        </div>
      </section>

      {/* ================= SCROLLABLE CATALOGUE ================= */}
      <HomeCatalogue />

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-left">
            <h2>Our<br />Story</h2>
          </div>

          <div className="about-right">
            <h3>ABOUT US</h3>
            <p>
              At Adhanya Creations, we believe that every outfit should tell a
              story. We are a boutique dedicated to creating beautiful,
              high-quality traditional clothing that is tailored specifically
              for you.
            </p>

            <h4>WHAT WORK WE PROVIDE</h4>
            <ul>
              <li>Custom-made ethnic wear</li>
              <li>Bespoke designing</li>
              <li>Personalized fashion consultation</li>
              <li>Quality craftsmanship</li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}
