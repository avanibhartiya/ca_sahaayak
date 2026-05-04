const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface CapitalGainsRequest {
  purchase_price: number;
  sale_price: number;
  purchase_date: string;
  sale_date: string;
  improvement_cost: number;
  transfer_expenses: number;
}

export interface CapitalGainsResponse {
  asset_type: string;
  capital_gains_amount: number;
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
