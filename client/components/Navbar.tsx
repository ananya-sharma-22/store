"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@/app/lib/cart-context";

export default function Navbar() {
  const { cart, openCart } = useCart();

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="Logo" width={120} height={40} />
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="nav-btn">Home</Link>
          <Link href="/shop" className="nav-btn">Shop</Link>
          <Link href="/Design" className="nav-btn">Design</Link>
          <Link href="/Studio" className="nav-btn">Studio</Link>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-6">
          
          {/* CART ICON */}
          <button
            onClick={openCart}
            className="relative"
            aria-label="Open cart"
            color="#e2724f"
          >
            <ShoppingBag size={24} color="#e2724f"/>

            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>

          {/* USER */}
          <Link href="/sign-in">
            <User size={24} color="#e2724f"/>
          </Link>
        </div>
      </div>
    </nav>
  );
}
