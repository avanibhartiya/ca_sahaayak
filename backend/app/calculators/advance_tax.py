from app.schemas.tax_schemas import AdvanceTaxRequest, AdvanceTaxResponse

def calculate_advance_tax(data: AdvanceTaxRequest) -> AdvanceTaxResponse:
    # Business Income
    net_profit = round((data.sales_turnover * data.profit_percentage) / 100, 2)
    
    # House Property Income
    home_loan_int = min(data.home_loan_interest, 200000)
    std_deduction = round((30 * data.rent_received) / 100, 2)
    property_income = round(data.rent_received - std_deduction - home_loan_int, 2)
    
    # Total Income
    total_income = round(
        net_profit + 
        data.fdr_interest + 
        data.savings_interest + 
        data.dividend_income + 
        data.other_income + 
        data.salary_income + 
        property_income, 2
    )
    
    # Deductions
    total_deductions = data.deduction_80c + data.deduction_80d + data.deduction_80tta
    taxable_income = max(0.0, round(total_income - total_deductions, 2))
    
    # Tax Calculations via slabs (New Regime FY 2025-26)
    tax_5 = 0.0
    tax_10 = 0.0
    tax_15 = 0.0
    tax_20 = 0.0
    tax_25 = 0.0
    tax_30 = 0.0

    if taxable_income > 400000:
        tax_5 = (min(taxable_income, 800000) - 400000) * 0.05
    if taxable_income > 800000:
        tax_10 = (min(taxable_income, 1200000) - 800000) * 0.10
    if taxable_income > 1200000:
        tax_15 = (min(taxable_income, 1600000) - 1200000) * 0.15
    if taxable_income > 1600000:
        tax_20 = (min(taxable_income, 2000000) - 1600000) * 0.20
    if taxable_income > 2000000:
        tax_25 = (min(taxable_income, 2400000) - 2000000) * 0.25
    if taxable_income > 2400000:
        tax_30 = (taxable_income - 2400000) * 0.30

    tax = round(tax_5 + tax_10 + tax_15 + tax_20 + tax_25 + tax_30, 2)
    
    # Tax Rebate (New Regime 12L threshold)
    tax_rebate = 0.0
    if taxable_income <= 1200000:
        tax_rebate = tax
        tax = 0.0

    tax_before_surcharge = tax + data.tax_mf_shares
    
    # Surcharge
    surcharge = 0.0
    if 5000000 < taxable_income <= 10000000:
        surcharge = tax_before_surcharge * 0.10
    elif 10000000 < taxable_income <= 20000000:
        surcharge = tax_before_surcharge * 0.15
    elif 20000000 < taxable_income <= 50000000:
        surcharge = tax_before_surcharge * 0.25
    elif taxable_income > 50000000:
        surcharge = tax_before_surcharge * 0.37

    surcharge = round(surcharge, 2)
    cess = round((tax_before_surcharge + surcharge) * 0.04, 2)
    total_tax_payable = round(tax_before_surcharge + surcharge + cess, 2)
    
    effective_tax_rate = round((total_tax_payable / taxable_income * 100), 2) if taxable_income > 0 else 0.0
    
    # TDS
    total_tds = round(data.tds_194c + data.tds_194a + data.tds_194, 2)
    advance_tax_payable = max(0.0, round(total_tax_payable - total_tds, 2))
    
    # Installments
    june = round(advance_tax_payable * 0.15, 2)
    sept = round(advance_tax_payable * 0.30, 2)
    dec = round(advance_tax_payable * 0.30, 2)
    march = round(advance_tax_payable * 0.25, 2)
    
    total_paid = round(data.paid_june + data.paid_sept + data.paid_dec + data.paid_march, 2)
    balance_tax = max(0.0, round(advance_tax_payable - total_paid, 2))

    return AdvanceTaxResponse(
        net_profit=net_profit,
        house_property_income=property_income,
        total_income=total_income,
        taxable_income=taxable_income,
        tax_slabs={
            "tax_5": round(tax_5, 2),
            "tax_10": round(tax_10, 2),
            "tax_15": round(tax_15, 2),
            "tax_20": round(tax_20, 2),
            "tax_25": round(tax_25, 2),
            "tax_30": round(tax_30, 2),
        },
        tax_rebate=round(tax_rebate, 2),
        surcharge=surcharge,
        cess=cess,
        total_tax_payable=total_tax_payable,
        effective_tax_rate=effective_tax_rate,
        total_tds=total_tds,
        advance_tax_payable=advance_tax_payable,
        installments={
            "june": june,
            "sept": sept,
            "dec": dec,
            "march": march
        },
        total_paid=total_paid,
        balance_tax=balance_tax
    )
