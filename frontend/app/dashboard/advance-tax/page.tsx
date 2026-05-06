"use client";

import { useState } from "react";
import { calculateAdvanceTax, AdvanceTaxResponse } from "@/lib/api/advanceTax";
import { formatCurrency } from "@/lib/utils/utils";
import { Calculator, AlertCircle, Briefcase, Home, Wallet, Percent, Calendar } from "lucide-react";

const FormSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
    <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center gap-2">
      <Icon className="w-4 h-4 text-blue-600" />
      <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  prefix = "\u20b9",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
}) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        {prefix}
      </span>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="0"
        className="w-full pl-7 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
      />
    </div>
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────

export default function AdvanceTaxPage() {
  const [formData, setFormData] = useState({
    sales_turnover: "",
    profit_percentage: "",
    fdr_interest: "",
    savings_interest: "",
    dividend_income: "",
    other_income: "",
    salary_income: "",
    home_loan_interest: "",
    rent_received: "",
    deduction_80c: "",
    deduction_80d: "",
    deduction_80tta: "",
    tax_mf_shares: "",
    tds_194c: "",
    tds_194a: "",
    tds_194: "",
    paid_june: "",
    paid_sept: "",
    paid_dec: "",
    paid_march: "",
  });

  const [result, setResult] = useState<AdvanceTaxResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Convert string fields to numbers for the API; empty string → 0
      const numericPayload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v === "" ? 0 : parseFloat(v)])
      );
      const data = await calculateAdvanceTax(numericPayload as any);
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
    // Store raw string so the input stays empty until the user types
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Advance Tax Calculator</h1>
        <p className="text-lg font-medium text-gray-500 text-center">New Tax Regime FY 2025-26</p>
      </div>

      <form onSubmit={handleSubmit}>
        <FormSection title="Business & Profession" icon={Briefcase}>
          <InputField label="Sales Turnover" name="sales_turnover" value={formData.sales_turnover} onChange={handleChange} />
          <InputField label="Profit Percentage (%)" name="profit_percentage" value={formData.profit_percentage} onChange={handleChange} prefix="%" />
        </FormSection>

        <FormSection title="Other Income Sources" icon={Wallet}>
          <InputField label="Salary Income" name="salary_income" value={formData.salary_income} onChange={handleChange} />
          <InputField label="FDR Interest" name="fdr_interest" value={formData.fdr_interest} onChange={handleChange} />
          <InputField label="Savings Interest" name="savings_interest" value={formData.savings_interest} onChange={handleChange} />
          <InputField label="Dividend Income" name="dividend_income" value={formData.dividend_income} onChange={handleChange} />
          <InputField label="Other Income" name="other_income" value={formData.other_income} onChange={handleChange} />
        </FormSection>

        <FormSection title="House Property" icon={Home}>
          <InputField label="Rent Received" name="rent_received" value={formData.rent_received} onChange={handleChange} />
          <InputField label="Home Loan Interest (Self Occupied)" name="home_loan_interest" value={formData.home_loan_interest} onChange={handleChange} />
        </FormSection>

        <FormSection title="Deductions & Investments" icon={Percent}>
          <InputField label="Section 80C" name="deduction_80c" value={formData.deduction_80c} onChange={handleChange} />
          <InputField label="Section 80D" name="deduction_80d" value={formData.deduction_80d} onChange={handleChange} />
          <InputField label="Section 80TTA/TTAB" name="deduction_80tta" value={formData.deduction_80tta} onChange={handleChange} />
        </FormSection>

        <FormSection title="TDS & Other Taxes" icon={AlertCircle}>
          <InputField label="Tax on MF/Shares" name="tax_mf_shares" value={formData.tax_mf_shares} onChange={handleChange} />
          <InputField label="TDS u/s 194C" name="tds_194c" value={formData.tds_194c} onChange={handleChange} />
          <InputField label="TDS u/s 194A" name="tds_194a" value={formData.tds_194a} onChange={handleChange} />
          <InputField label="TDS u/s 194" name="tds_194" value={formData.tds_194} onChange={handleChange} />
        </FormSection>

        <FormSection title="Advance Tax Already Paid" icon={Calendar}>
          <InputField label="Paid by 15th June" name="paid_june" value={formData.paid_june} onChange={handleChange} />
          <InputField label="Paid by 15th Sept" name="paid_sept" value={formData.paid_sept} onChange={handleChange} />
          <InputField label="Paid by 15th Dec" name="paid_dec" value={formData.paid_dec} onChange={handleChange} />
          <InputField label="Paid by 15th March" name="paid_march" value={formData.paid_march} onChange={handleChange} />
        </FormSection>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2"
          >
            {loading ? "Computing..." : <><Calculator className="w-5 h-5" /> Calculate Advance Tax for New Regime</>}
          </button>
        </div>
      </form>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Main Highlights */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Taxable Income</p>
              <p className="text-2xl font-black">{formatCurrency(result.taxable_income)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Tax Payable</p>
              <p className="text-2xl font-black text-gray-900">{formatCurrency(result.total_tax_payable)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Advance Tax Due</p>
              <p className="text-2xl font-black text-blue-600">{formatCurrency(result.advance_tax_payable)}</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Balance Payable</p>
              <p className="text-2xl font-black text-green-700">{formatCurrency(result.balance_tax)}</p>
            </div>
          </div>

          {/* Tax Breakup */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-sm">Detailed Tax Breakup</div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Net Profit (Business)</span>
                  <span className="font-bold">{formatCurrency(result.net_profit)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">House Property Income</span>
                  <span className="font-bold">{formatCurrency(result.house_property_income)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Tax Slab @ 5%</span>
                  <span className="font-bold">{formatCurrency(result.tax_slabs.tax_5)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Tax Slab @ 10%</span>
                  <span className="font-bold">{formatCurrency(result.tax_slabs.tax_10)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Tax Slab @ 15%</span>
                  <span className="font-bold">{formatCurrency(result.tax_slabs.tax_15)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Tax Slab @ 20%</span>
                  <span className="font-bold">{formatCurrency(result.tax_slabs.tax_20)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Tax Slab @ 25%</span>
                  <span className="font-bold">{formatCurrency(result.tax_slabs.tax_25)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Tax Slab @ 30%</span>
                  <span className="font-bold">{formatCurrency(result.tax_slabs.tax_30)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Tax Rebate</span>
                  <span className="font-bold text-green-600">-{formatCurrency(result.tax_rebate)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Surcharge</span>
                  <span className="font-bold">{formatCurrency(result.surcharge)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Health & Edu Cess (4%)</span>
                  <span className="font-bold">{formatCurrency(result.cess)}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Effective Tax Rate</span>
                  <span className="font-bold text-blue-600">{result.effective_tax_rate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Installments */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h4 className="font-bold text-gray-900 text-sm mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Installment Schedule
              </h4>
              <div className="space-y-4">
                {[
                  { label: "15th June (15%)", value: result.installments.june },
                  { label: "15th Sept (30%)", value: result.installments.sept },
                  { label: "15th Dec (30%)", value: result.installments.dec },
                  { label: "15th March (25%)", value: result.installments.march },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-medium text-gray-500">{item.label}</span>
                    <span className="font-bold text-gray-900 text-sm">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="text-gray-900">{formatCurrency(result.total_paid)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-400">Balance Payable</span>
                  <span className="text-blue-600">{formatCurrency(result.balance_tax)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-700 text-sm mt-8">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
