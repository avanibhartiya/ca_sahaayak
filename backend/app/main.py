from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import advance_tax, capital_gains

app = FastAPI(title="CA Utility Portal API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(advance_tax.router, prefix="/api", tags=["Calculators"])
app.include_router(capital_gains.router, prefix="/api", tags=["Calculators"])

@app.get("/")
async def root():
    return {"message": "Welcome to CA Utility Portal API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
