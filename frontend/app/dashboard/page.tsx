"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Save,
  FileCheck,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Calculator,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const [currentDate, setCurrentDate] = useState("");
  const [assessmentYear, setAssessmentYear] = useState("");

  useEffect(() => {
    const today = new Date();

    // Format Date: MMM DD, YYYY
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));

    // Calculate Assessment Year
    // In India, AY starts from April 1st.
    // If today is May 2026, AY is 2026-27 (for FY 2025-26)
    // Actually, usually AY refers to the filing year.
    // Logic: If month is >= April (3 in JS), AY starts this year. Else, it started last year.
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed, April is 3

    if (month >= 3) {
      setAssessmentYear(`${year}-${(year + 1).toString().slice(-2)}`);
    } else {
      setAssessmentYear(`${year - 1}-${year.toString().slice(-2)}`);
    }
  }, []);

  const tools = [
    { name: "Capital Gains", desc: "Complex LTCG/STCG with indexing", icon: TrendingUp, href: "/dashboard/capital-gains" },
    { name: "Advance Tax", desc: "Quarterly tax liability estimations", icon: Clock, href: "/dashboard/advance-tax" },
    { name: "Basic Calculator", desc: "Performing simple mathematical calculations", icon: Calculator, href: "/dashboard/basic-calculator" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-blue-600 font-semibold text-sm mb-1 uppercase tracking-wider">Workspace</p>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Admin</h2>
        </div>
        <div className="absolute top-0 right-0 p-8 flex gap-8">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">Tax Year</p>
            <p className="text-xl font-bold text-gray-900">{assessmentYear || "Loading..."}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">Today's Date</p>
            <p className="text-xl font-bold text-gray-900">{currentDate || "Loading..."}</p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Quick Access Tools</h3>
          <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
            View All Tools <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-all group"
            >
              <div className="p-3 bg-gray-50 rounded-xl w-fit mb-4 group-hover:bg-blue-50 transition-colors">
                <tool.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{tool.name}</h4>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
