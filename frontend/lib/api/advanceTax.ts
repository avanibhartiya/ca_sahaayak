const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface AdvanceTaxRequest {
  total_income: number;
  deductions: number;
  tax_paid_till_date: number;
  tds: number;
  other_taxes_paid: number;
}

export interface AdvanceTaxResponse {
  taxable_income: number;
  tax_liability: number;
  advance_tax_payable: number;
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
