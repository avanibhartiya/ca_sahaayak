from app.schemas.tax_schemas import CapitalGainsRequest, CapitalGainsResponse
from datetime import date

def calculate_capital_gains(data: CapitalGainsRequest) -> CapitalGainsResponse:
    # Placeholder logic for Capital Gains
    # Difference between purchase and sale date
    duration = (data.sale_date - data.purchase_date).days
    
    # Typically 24-36 months for long term depending on asset
    is_long_term = duration > 730  # 2 years placeholder
    
    # Simple gain calculation: Sale - (Purchase + Improvement + Expenses)
    # Real logic would include Indexation for Long Term Gains
    total_cost = data.purchase_price + data.improvement_cost + data.transfer_expenses
    gains = data.sale_price - total_cost
    
    return CapitalGainsResponse(
        asset_type="Long Term" if is_long_term else "Short Term",
        capital_gains_amount=gains
    )
