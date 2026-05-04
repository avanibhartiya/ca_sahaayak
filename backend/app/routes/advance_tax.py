from fastapi import APIRouter
from app.schemas.tax_schemas import AdvanceTaxRequest, AdvanceTaxResponse
from app.calculators.advance_tax import calculate_advance_tax

router = APIRouter()

@router.post("/advance-tax", response_model=AdvanceTaxResponse)
async def advance_tax_route(data: AdvanceTaxRequest):
    return calculate_advance_tax(data)
