import Link from "next/link";
import { ShieldCheck, ArrowRight, Zap, Calculator, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-12 py-6 border-b border-gray-50">
        <div className="flex items-center gap-2 text-blue-600">
          <img src="/assets/logo.jpg" alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl text-gray-900 tracking-tight">CA Sahaayak</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-12 pt-24 pb-32 flex flex-col items-center text-center">
        <h1 className="text-7xl font-black text-gray-900 max-w-4xl leading-[1.1] mb-8">
          CA <span className="text-blue-600">Sahaayak</span>
        </h1>
        <h3 className="text-5xl font-black text-gray-900 max-w-4xl leading-[1.1] mb-8">
          Empowering Chartered Accountants with <span className="text-blue-600">Precision Tools</span>
        </h3>
        <p className="text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
          A unified workspace designed to simplify everyday professional operations, reduce repetitive work, improve accuracy, and keep essential tasks organized in one place.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2"
          >
            Login to Portal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-gray-50 px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Operational Suite</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our portal provides a streamlined digital workspace built to simplify everyday professional operations, helping firms work more efficiently, stay organized, and manage essential tasks from one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Capital Gains Calculator</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Simplify capital gains calculations under both the old and new tax methods and determine which option is more beneficial based on your transaction details.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advance Tax Calculator</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Estimate advance tax liability under the new tax regime using applicable income slabs, and get a clear view of payable tax based on your income details.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CA Utility Dashboard</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Centralized workspace for firm management. Track client filings, manage internal staff access, and audit calculation logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-blue-600 mb-6">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-bold text-lg text-gray-900">CA Portal</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Professional enterprise-grade tools for modern Chartered Accountants.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Calculators</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Capital Gains</li>
                <li>GST Utility</li>
                <li>Income Tax</li>
                <li>TDS Calculation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security Protocols</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>Request Access</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
          <p>© 2024 CA Operations Portal. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Twitter</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
