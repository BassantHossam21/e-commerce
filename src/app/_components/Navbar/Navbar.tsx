"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  // let { numberOfCartItems } = useContext(CartContext);
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Not Exist");
  }
  const { numberOfCartItems } = context;

  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-gray-100 shadow-sm shadow-green-500">
      <div className="container mx-auto w-[90%] p-4 flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/freshcart-logo.svg"
              alt="Freshcart Logo"
              width={120}
              height={40}
              priority
              className="h-auto w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-6 items-center font-medium">
            <li>
              <Link href="/" className="hover:text-green-500 transition">
                Home
              </Link>
            </li>

            {session && session.user.role === "user" && (
              <li className="relative inline-flex items-center">
                <Link
                  href="/cart"
                  className="hover:text-green-500 transition relative inline-flex items-center space-x-0.5"
                >
                  <i className="fas fa-shopping-cart text-lg"></i>
                  <span>Cart</span>
                  {numberOfCartItems > 0 && (
                    <span className="absolute -top-1.5 -left-1.5 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {numberOfCartItems}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {session && session.user.role === "user" && (
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-green-500 transition"
                >
                  Wishlist
                </Link>
              </li>
            )}

            <li>
              <Link
                href="/products"
                className="hover:text-green-500 transition"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-green-500 transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-green-500 transition">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <>
              {/* Social Media */}
              <div className="flex gap-4 text-lg">
                <i className="fa-brands fa-facebook hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
                <i className="fa-brands fa-instagram hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
                <i className="fa-brands fa-tiktok hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
                <i className="fa-brands fa-twitter hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
                <i className="fa-brands fa-linkedin hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
              </div>

              {/* Auth Links */}
              <Link
                href="/register"
                className="flex items-center gap-1 hover:text-green-500 transition"
              >
                <i className="fa-solid fa-user-plus"></i> Register
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-1 hover:text-green-500 transition"
              >
                <i className="fa-solid fa-right-to-bracket"></i> LogIn
              </Link>
            </>
          ) : (
            <>
              <span
                onClick={logout}
                className="cursor-pointer hover:text-green-500 flex items-center gap-1 transition"
              >
                <i className="fa-solid fa-right-from-bracket"></i> SignOut
              </span>
              <span>{session?.user.name}</span>
            </>
          )}
        </div>

        {/* Hamburger menu - Mobile */}
        <div className="md:hidden">
          <button
            className="cursor-pointer p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-100 px-6 py-4 space-y-3 transform transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "scale-y-100 opacity-100 max-h-screen"
            : "scale-y-0 opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-3 font-medium text-base leading-6">
          <li>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-500 transition active:text-green-500"
            >
              Home
            </Link>
          </li>

          {session && session.user.role === "user" && (
            <li className="relative inline-flex items-center">
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-500 transition relative inline-flex items-center space-x-1"
              >
                <i className="fas fa-shopping-cart text-base"></i>
                <span>Cart</span>
                {numberOfCartItems > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">
                    {numberOfCartItems}
                  </span>
                )}
              </Link>
            </li>
          )}

          {session && session.user.role === "user" && (
            <li>
              <Link
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-500 transition active:text-green-500"
              >
                Wishlist
              </Link>
            </li>
          )}

          <li>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-500 transition active:text-green-500"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-500 transition active:text-green-500"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/brands"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-500 transition active:text-green-500"
            >
              Brands
            </Link>
          </li>

          {!session ? (
            <>
              <li>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 hover:text-green-500 transition active:text-green-500"
                >
                  <i className="fa-solid fa-user-plus"></i> Register
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 hover:text-green-500 transition active:text-green-500"
                >
                  <i className="fa-solid fa-right-to-bracket"></i> LogIn
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <span
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer hover:text-green-500 flex items-center gap-1 transition active:text-green-500"
                >
                  <i className="fa-solid fa-right-from-bracket"></i> SignOut
                </span>
              </li>
              <li>{session?.user.name}</li>
            </>
          )}
        </ul>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4 text-lg flex-wrap">
          <i className="fa-brands fa-facebook hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
          <i className="fa-brands fa-instagram hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
          <i className="fa-brands fa-tiktok hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
          <i className="fa-brands fa-twitter hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
          <i className="fa-brands fa-linkedin hover:text-green-500 cursor-pointer transition-transform hover:scale-105"></i>
        </div>
      </div>
    </nav>
  );
}
