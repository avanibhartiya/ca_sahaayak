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
    purchase_cost: float
    purchase_year: str  # e.g. "2010-11"
    sale_value: float
    stamp_duty_value: float
    sale_year: str  # e.g. "2025-26"
    improvement_cost: float = 0.0
    improvement_year: Optional[str] = None
    expenses: float = 0.0

class CapitalGainsResponse(BaseModel):
    effective_sale_value: float
    indexed_purchase: float
    indexed_improvement: float
    cii_purchase: float
    cii_sale: float
    cii_improvement: float
    ltcg_old: float
    tax_old: float
    ltcg_new: float
    tax_new: float
    better_option: str
