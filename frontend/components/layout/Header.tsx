"use client";

import { Bell, Search, User } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools or clients"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">Admin</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 border border-gray-300">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
