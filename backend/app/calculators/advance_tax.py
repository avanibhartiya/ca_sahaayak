from app.schemas.tax_schemas import AdvanceTaxRequest, AdvanceTaxResponse

def calculate_advance_tax(data: AdvanceTaxRequest) -> AdvanceTaxResponse:
    # Placeholder tax calculation logic
    # In reality, this would involve complex slab-based calculations
    taxable_income = max(0, data.total_income - data.deductions)
    
    # Simple 20% flat tax for demonstration
    base_tax = taxable_income * 0.20
    
    total_tax_paid = data.tax_paid_till_date + data.tds + data.other_taxes_paid
    advance_tax_payable = max(0, base_tax - total_tax_paid)
    
    return AdvanceTaxResponse(
        taxable_income=taxable_income,
        tax_liability=base_tax,
        advance_tax_payable=advance_tax_payable
    )
