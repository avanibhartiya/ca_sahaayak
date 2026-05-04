const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface CapitalGainsRequest {
  purchase_cost: number;
  purchase_year: string;
  sale_value: number;
  stamp_duty_value: number;
  sale_year: string;
  improvement_cost: number;
  improvement_year?: string;
  expenses: number;
}

export interface CapitalGainsResponse {
  effective_sale_value: number;
  indexed_purchase: number;
  indexed_improvement: number;
  cii_purchase: number;
  cii_sale: number;
  cii_improvement: number;
  ltcg_old: number;
  tax_old: number;
  ltcg_new: number;
  tax_new: number;
  better_option: string;
}

export async function calculateCapitalGains(data: CapitalGainsRequest): Promise<CapitalGainsResponse> {
  const response = await fetch(`${BASE_URL}/capital-gains`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate capital gains");
  }

  return response.json();
}
