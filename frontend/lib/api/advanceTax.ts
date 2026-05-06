const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface AdvanceTaxRequest {
  sales_turnover: number;
  profit_percentage: number;
  fdr_interest: number;
  savings_interest: number;
  dividend_income: number;
  other_income: number;
  salary_income: number;
  home_loan_interest: number;
  rent_received: number;
  deduction_80c: number;
  deduction_80d: number;
  deduction_80tta: number;
  tax_mf_shares: number;
  tds_194c: number;
  tds_194a: number;
  tds_194: number;
  paid_june: number;
  paid_sept: number;
  paid_dec: number;
  paid_march: number;
}

export interface AdvanceTaxResponse {
  net_profit: number;
  house_property_income: number;
  total_income: number;
  taxable_income: number;
  tax_slabs: {
    tax_5: number;
    tax_10: number;
    tax_15: number;
    tax_20: number;
    tax_25: number;
    tax_30: number;
  };
  tax_rebate: number;
  surcharge: number;
  cess: number;
  total_tax_payable: number;
  effective_tax_rate: number;
  total_tds: number;
  advance_tax_payable: number;
  installments: {
    june: number;
    sept: number;
    dec: number;
    march: number;
  };
  total_paid: number;
  balance_tax: number;
}

export async function calculateAdvanceTax(data: AdvanceTaxRequest): Promise<AdvanceTaxResponse> {
  const response = await fetch(`${BASE_URL}/advance-tax`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate advance tax");
  }

  return response.json();
}
