"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border-b pb-6"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={130}
                  className="rounded object-cover"
                />

                <div className="flex-1">
                  <Link
                    href={`/shop/${item.id}`}
                    className="font-medium"
                  >
                    {item.name}
                  </Link>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <p>₹{item.price * item.quantity}</p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-10">
            <h2 className="text-xl font-semibold">
              Total: ₹{total}
            </h2>

            <Link href="/checkout">
              <button className="bg-black text-white px-8 py-3 rounded-lg">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
