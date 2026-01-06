"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";

export default function CartDrawer() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    closeCart,
  } = useCart();

  if (!isCartOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
      />

      <div className="absolute right-0 top-0 h-full w-96 bg-white p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Cart</h2>
          <button onClick={closeCart}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={70}
                height={90}
                className="rounded object-cover"
              />

              <div className="flex-1">
                <Link
                  href={`/shop/${item.id}`}
                  className="font-medium"
                >
                  {item.name}
                </Link>

                <div className="flex items-center gap-3 mt-2">
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

              <div className="flex flex-col items-end gap-2">
                <p>₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link href="/checkout" onClick={closeCart}>
            <button className="w-full bg-black text-white py-3 rounded-lg">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
