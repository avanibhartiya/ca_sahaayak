from app.schemas.tax_schemas import CapitalGainsRequest, CapitalGainsResponse

# CII Table
CII = { 
    "2001-02": 100, "2002-03": 105, "2003-04": 109, "2004-05": 113, "2005-06": 117,
    "2006-07": 122, "2007-08": 129, "2008-09": 137, "2009-10": 148, "2010-11": 167,
    "2011-12": 184, "2012-13": 200, "2013-14": 220, "2014-15": 240, "2015-16": 254,
    "2016-17": 264, "2017-18": 272, "2018-19": 280, "2019-20": 289, "2020-21": 301,
    "2021-22": 317, "2022-23": 331, "2023-24": 348, "2024-25": 363, "2025-26": 376,
    "2026-27": 376
}

def calculate_capital_gains(data: CapitalGainsRequest) -> CapitalGainsResponse:
    # SECTION 50C (Higher value)
    effective_sale_value = max(data.sale_value, data.stamp_duty_value)
    
    # Fetching of the CII
    cii_purchase = CII.get(data.purchase_year, 100) # Fallback to 100 if not found
    cii_sale = CII.get(data.sale_year, 376) # Fallback to current if not found
    
    indexed_purchase = round(data.purchase_cost * (cii_sale / cii_purchase), 2)

    cii_improvement = 0
    indexed_improvement = 0
    
    if data.improvement_cost > 0 and data.improvement_year:
        cii_improvement = CII.get(data.improvement_year, 0)
        if cii_improvement > 0:
            indexed_improvement = round(data.improvement_cost * (cii_sale / cii_improvement), 2)

    # Old method calculation with indexation
    ltcg_old = round(effective_sale_value - indexed_purchase - indexed_improvement - data.expenses, 2)
    tax_old = round(ltcg_old * 0.20, 2)
    
    # New Method calculation without indexation
    ltcg_new = round(effective_sale_value - data.purchase_cost - data.improvement_cost - data.expenses, 2)
    tax_new = round(ltcg_new * 0.125, 2)

    # Best option
    if tax_old < tax_new:
        better_option = "Old Method (20% with Indexation)"
    else:
        better_option = "New Method (12.5% without Indexation)"

    return CapitalGainsResponse(
        effective_sale_value=effective_sale_value,
        indexed_purchase=indexed_purchase,
        indexed_improvement=indexed_improvement,
        cii_purchase=cii_purchase,
        cii_sale=cii_sale,
        cii_improvement=cii_improvement,
        ltcg_old=ltcg_old,
        tax_old=tax_old,
        ltcg_new=ltcg_new,
        tax_new=tax_new,
        better_option=better_option
    )
