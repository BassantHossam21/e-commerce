"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50 text-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-[90%] max-w-lg border border-gray-100">
        {/* أيقونة */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <AlertTriangle className="text-green-600 w-10 h-10" />
          </div>
        </div>

        {/* عنوان */}
        <h1 className="text-3xl font-extrabold text-green-600 mb-4">
          Oops! Something went wrong
        </h1>

        {/* رسالة */}
        <p className="text-gray-600 mb-8 text-base leading-relaxed">
          {error?.message ||
            "It looks like something broke while shopping. Please try again or go back to the homepage."}
        </p>

        {/* أزرار */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition font-medium"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="flex-1 px-6 py-3 border border-gray-300 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
