import Link from "next/link";
import HomeCatalogue from "@/components/HomeCatalogue";

export default function Home() {
  return (
    <main>
      {/* ================= HERO ================= */}
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

      <HomeCatalogue />

      {/* ================= ABOUT ================= */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-left">
            <h2>
              Our <br /> Story
            </h2>
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
