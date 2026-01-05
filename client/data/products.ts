export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: "saree" | "lehenga" | "custom";
  description: string;
};

export const products: Product[] = [
  {
    id: "indo-western-saree",
    name: "Indo-Western Saree",
    price: 5000,
    images: ["/images/p1-1.jpg", "/images/p1-2.jpg", "/images/p1-3.jpg", "/images/p1-4.jpg"],
    category: "saree",
    description: "Elegant indo-western saree tailored to your measurements",
  },
  {
    id: "dazzling-shimmery-lehenga",
    name: "Dazzling Shimmery Lehenga",
    price: 8000,
    images: ["/images/p2-1.jpg", "/images/p2-2.jpg"],
    category: "lehenga",
    description: "Perfect for weddings and festive occasions",
  },
  {
    id: "customised-saree",
    name: "Customised Saree",
    price: 5000,
    images: ["/images/p4-1.jpeg", "/images/p4-2.jpg"],
    category: "custom",
    description: "Fully customised saree from fabric to fit",
  },
  {
    id: "sequence-blouse-with-lehenga",
    name: "Sequence Blouse with Lehenga",
    price: 4000,
    images: ["/images/p3-1.jpg", "/images/p3-2.jpg"],
    category: "lehenga",
    description: "Fully customised lehenga from fabric to fit",
  },
  {
    id: "golden-blouse-with-black-saree",
    name: "Golden Blouse with Black Saree",
    price: 5500,
    images: ["/images/p5-1.jpg", "/images/p5-2.jpg"],
    category: "lehenga",
    description: "Fully customised lehenga from fabric to fit",
  },
  {
    id: "draped-saree",
    name: "Draped Saree",
    price: 6000,
    images: ["/images/p6-1.jpg", "/images/p6-2.jpg"],
    category: "saree",
    description: "Drape Saree Custom Fit",
  },
];
