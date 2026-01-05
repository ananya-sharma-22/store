import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <main className="shop-page px-6 py-16">
      <h1 className="text-center text-3xl font-semibold mb-12">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="product-card"
          >
            <div className="product-image-wrapper">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={420}
                height={560}
                className="product-img primary-img"
              />
              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  width={420}
                  height={560}
                  className="product-img secondary-img"
                />
              )}
            </div>

            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
