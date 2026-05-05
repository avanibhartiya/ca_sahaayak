"use client";

import { useState } from "react";
import { calculateCapitalGains, CapitalGainsResponse } from "@/lib/api/capitalGains";
import { formatCurrency } from "@/lib/utils/utils";
import { TrendingUp, Info, AlertCircle, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

const CII_YEARS = [
  "2001-02", "2002-03", "2003-04", "2004-05", "2005-06",
  "2006-07", "2007-08", "2008-09", "2009-10", "2010-11",
  "2011-12", "2012-13", "2013-14", "2014-15", "2015-16",
  "2016-17", "2017-18", "2018-19", "2019-20", "2020-21",
  "2021-22", "2022-23", "2023-24", "2024-25", "2025-26", "2026-27"
];

export default function CapitalGainsPage() {
  const [formData, setFormData] = useState({
    purchase_cost: 0,
    purchase_year: "2001-02",
    sale_value: 0,
    stamp_duty_value: 0,
    sale_year: "2024-25",
    improvement_cost: 0,
    improvement_year: "2001-02",
    expenses: 0,
  });

  const [result, setResult] = useState<CapitalGainsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await calculateCapitalGains(formData);
      setResult(data);
    } catch (err) {
      setError("Failed to calculate gains. Please check the backend connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (parseFloat(value) || 0) : value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Capital Gains Calculator</h1>
        <p className="text-gray-500">Compare capital gains under both tax methods and identify the more beneficial option based on your transaction details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Transaction Details
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Purchase Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      name="purchase_cost"
                      value={formData.purchase_cost || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Purchase Year (CII)</label>
                  <select
                    name="purchase_year"
                    value={formData.purchase_year}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    {CII_YEARS.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Sale Value</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      name="sale_value"
                      value={formData.sale_value || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Stamp Duty Value (Sec 50C)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      name="stamp_duty_value"
                      value={formData.stamp_duty_value || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Sale Year (CII)</label>
                  <select
                    name="sale_year"
                    value={formData.sale_year}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    {CII_YEARS.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Transfer Expenses</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      name="expenses"
                      value={formData.expenses || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Improvement Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      name="improvement_cost"
                      value={formData.improvement_cost || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Improvement Year</label>
                  <select
                    name="improvement_year"
                    value={formData.improvement_year}
                    disabled={formData.improvement_cost === 0}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                  >
                    {CII_YEARS.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-2 border-t border-gray-100 bg-gray-50/30 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-1"
              >
                {loading ? "Calculating..." : "Run Comparison"}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <>
              <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-100">
                <h3 className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Recommended Option</h3>
                <p className="text-xl font-black mb-4">{result.better_option}</p>
                <div className="flex items-center gap-2 bg-blue-500/30 rounded-lg p-3 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified using current CII tables.</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Method Comparison</h4>
                </div>
                <div className="p-6 space-y-6">
                  {/* Old Method */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">Old Method</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">20% WITH INDEXATION</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">LTCG</p>
                        <p className="font-bold text-gray-900">{formatCurrency(result.ltcg_old)}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <p className="text-[10px] text-blue-400 font-bold uppercase">Tax Payable</p>
                        <p className="font-black text-blue-600">{formatCurrency(result.tax_old)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100"></div>

                  {/* New Method */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">New Method</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">12.5% NO INDEXATION</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">LTCG</p>
                        <p className="font-bold text-gray-900">{formatCurrency(result.ltcg_new)}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                        <p className="text-[10px] text-green-400 font-bold uppercase">Tax Payable</p>
                        <p className="font-black text-green-600">{formatCurrency(result.tax_new)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CII Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-bold text-gray-900 text-sm mb-4">Indexation Breakdown</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Indexed Purchase Cost</span>
                    <span className="font-semibold">{formatCurrency(result.indexed_purchase)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Indexed Improvement Cost</span>
                    <span className="font-semibold">{formatCurrency(result.indexed_improvement)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Effective Sale Value (Sec 50C)</span>
                    <span className="font-semibold">{formatCurrency(result.effective_sale_value)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50 text-[10px] font-bold text-gray-400 uppercase text-center">
                    <div>
                      <p>CII Purchase</p>
                      <p className="text-gray-900 text-xs">{result.cii_purchase.toFixed(2)}</p>
                    </div>
                    <div>
                      <p>CII Sale</p>
                      <p className="text-gray-900 text-xs">{result.cii_sale.toFixed(2)}</p>
                    </div>
                    <div>
                      <p>CII Improv.</p>
                      <p className="text-gray-900 text-xs">
                        {result.cii_improvement > 0 ? result.cii_improvement.toFixed(2) : "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-medium">
                Enter your transaction details to compare Old vs New tax regime benefits.
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
