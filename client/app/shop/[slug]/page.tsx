import { products } from "@/data/products";
import ProductUI from "./ProductUI";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.id === slug);

  if (!product) {
    return (
      <div className="py-24 text-center text-lg">
        Product not found
      </div>
    );
  }

  return <ProductUI product={product} />;
}
