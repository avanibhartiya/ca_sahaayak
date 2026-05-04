"use client";

import { useState } from "react";
import { calculateAdvanceTax, AdvanceTaxResponse } from "@/lib/api/advanceTax";
import { formatCurrency } from "@/lib/utils/utils";
import { Calculator, Info, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdvanceTaxPage() {
  const [formData, setFormData] = useState({
    total_income: 0,
    deductions: 0,
    tax_paid_till_date: 0,
    tds: 0,
    other_taxes_paid: 0,
  });

  const [result, setResult] = useState<AdvanceTaxResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await calculateAdvanceTax(formData);
      setResult(data);
    } catch (err) {
      setError("Failed to calculate tax. Please check the backend connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Advance Tax Calculator</h1>
        <p className="text-gray-500">Calculate your quarterly tax liability based on projected annual income.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                Income & Tax Details
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Estimated Total Income</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="total_income"
                      value={formData.total_income || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Total Deductions (Sec 80C, etc.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="deductions"
                      value={formData.deductions || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Tax Paid till Date</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="tax_paid_till_date"
                      value={formData.tax_paid_till_date || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">TDS / TCS</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="tds"
                      value={formData.tds || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Other Taxes Paid</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="other_taxes_paid"
                      value={formData.other_taxes_paid || ""}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-70"
              >
                {loading ? "Calculating..." : "Calculate Tax Liability"}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              Calculation Summary
            </h3>
            {result ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Taxable Income</span>
                  <span className="font-bold text-gray-900">{formatCurrency(result.taxable_income)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Tax Liability</span>
                  <span className="font-bold text-gray-900">{formatCurrency(result.tax_liability)}</span>
                </div>
                <div className="pt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Advance Tax Payable</p>
                  <p className="text-3xl font-black text-blue-600">{formatCurrency(result.advance_tax_payable)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg flex gap-2 text-green-700 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Calculation verified with latest tax slabs.</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm text-gray-400">Fill in the details to see your tax projection.</p>
              </div>
            )}
          </div>

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
