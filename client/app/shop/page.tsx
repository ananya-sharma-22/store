export default function Shop() {
  const products = [
    {
      name: "Indo-Western Saree",
      price: "₹5,000",
      img1: "/images/p1-1.jpg",
      img2: "/images/p1-2.jpg",
    },
    {
      name: "Dazzling Shimmery Lehenga",
      price: "₹8,000",
      img1: "/images/p2-1.jpg",
      img2: "/images/p2-2.jpg",
    },
    {
      name: "Sequence Blouse with Lehenga",
      price: "₹4,000",
      img1: "/images/p3-1.jpg",
      img2: "/images/p3-2.jpg",
    },
    {
      name: "Customised Saree",
      price: "₹5,000",
      img1: "/images/p4-1.jpeg",
      img2: "/images/p4-2.jpg",
    },
  ];

  return (
    <main className="shop-page max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        Home / <span className="text-gray-500">All Products</span>
      </p>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-2">All Products</h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        This is your category description. It’s a great place to tell customers
        what this category is about.
      </p>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* FILTER SIDEBAR */}
        <aside className="md:col-span-1 space-y-8">
          <div>
            <h3 className="font-medium mb-3">Browse by</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-[#8b3f1d] cursor-pointer">All Products</li>
              <li className="cursor-pointer">Lehengas</li>
              <li className="cursor-pointer">Sarees</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Product type</h3>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Sarees
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Lehengas
            </label>
          </div>

          <div>
            <h3 className="font-medium mb-3">Price</h3>
            <p className="text-sm text-gray-500">Coming soon</p>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <section className="md:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <div key={i} className="product-card">
                <div className="product-image-wrapper">
                  <img
                    src={p.img1}
                    alt={p.name}
                    className="product-img primary-img"
                  />
                  <img
                    src={p.img2}
                    alt={p.name}
                    className="product-img secondary-img"
                  />
                </div>

                <h4 className="text-sm mt-3">{p.name}</h4>
                <p className="text-sm text-gray-600">{p.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
