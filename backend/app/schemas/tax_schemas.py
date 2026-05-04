from pydantic import BaseModel
from typing import Optional
from datetime import date

class AdvanceTaxRequest(BaseModel):
    total_income: float
    deductions: float
    tax_paid_till_date: float
    tds: float
    other_taxes_paid: float

class AdvanceTaxResponse(BaseModel):
    taxable_income: float
    tax_liability: float
    advance_tax_payable: float

class CapitalGainsRequest(BaseModel):
    purchase_price: float
    sale_price: float
    purchase_date: date
    sale_date: date
    improvement_cost: float = 0.0
    transfer_expenses: float = 0.0

class CapitalGainsResponse(BaseModel):
    asset_type: str  # Short Term / Long Term
    capital_gains_amount: float
