from fastapi import APIRouter
from app.schemas.tax_schemas import CapitalGainsRequest, CapitalGainsResponse
from app.calculators.capital_gains import calculate_capital_gains

router = APIRouter()

@router.post("/capital-gains", response_model=CapitalGainsResponse)
async def capital_gains_route(data: CapitalGainsRequest):
    return calculate_capital_gains(data)
