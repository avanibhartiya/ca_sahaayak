from pydantic import BaseModel
from typing import Optional, List

class AdvanceTaxRequest(BaseModel):
    # Business Income
    sales_turnover: float
    profit_percentage: float
    
    # Other Incomes
    fdr_interest: float
    savings_interest: float
    dividend_income: float
    other_income: float
    salary_income: float
    
    # House Property
    home_loan_interest: float
    rent_received: float
    
    # Deductions
    deduction_80c: float
    deduction_80d: float
    deduction_80tta: float
    
    # Additional Taxes
    tax_mf_shares: float
    
    # TDS
    tds_194c: float
    tds_194a: float
    tds_194: float
    
    # Paid Tax
    paid_june: float
    paid_sept: float
    paid_dec: float
    paid_march: float

class AdvanceTaxResponse(BaseModel):
    net_profit: float
    house_property_income: float
    total_income: float
    taxable_income: float
    tax_slabs: dict  # 5%, 10%, 15%, 20%, 25%, 30%
    tax_rebate: float
    surcharge: float
    cess: float
    total_tax_payable: float
    effective_tax_rate: float
    total_tds: float
    advance_tax_payable: float
    installments: dict  # june, sept, dec, march
    total_paid: float
    balance_tax: float

class CapitalGainsRequest(BaseModel):
    purchase_cost: float
    purchase_year: str
    sale_value: float
    stamp_duty_value: float
    sale_year: str
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
