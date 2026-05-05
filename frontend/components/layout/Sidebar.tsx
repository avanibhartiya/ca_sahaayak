"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Calculator,
  FileText,
  History,
  User,
  Settings,
  LogOut,
  ChevronRight,
  CalculatorIcon
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

const menuItems = [
  { name: "Dashboard Home", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Capital Gains Calculator", icon: TrendingUp, href: "/dashboard/capital-gains" },
  { name: "Advance Tax Calculator", icon: Calculator, href: "/dashboard/advance-tax" },
  { name: "Basic Calculator", icon: CalculatorIcon, href: "/dashboard/basic-calculator" },
];

const preferencesItems = [
  { name: "Profile", icon: User, href: "/dashboard/profile" },
  { name: "Settings", icon: Settings, href: "#" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 text-blue-600">
          <img src="/assets/logo.jpg" alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-lg text-gray-900">CA Sahaayak</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="mb-8">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Main Menu
          </h3>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Preferences
          </h3>
          <div className="space-y-1">
            {preferencesItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">More tools coming soon</p>
          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
