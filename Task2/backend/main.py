from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager
from lib.fetch_and_store_weather import fetch_and_store_weather
from lib.calculate_daily_summary import (
    calculate_daily_summary_wrapper,
)
from routes.api_routes import api_router


scheduler = BackgroundScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.add_job(
        fetch_and_store_weather, "cron", minute="*/5", timezone="Asia/Kolkata"
    )
    scheduler.add_job(
        calculate_daily_summary_wrapper,
        "cron",
        hour=0,
        minute=1, # Run at 12:01 AM
        timezone="Asia/Kolkata",
    )
    scheduler.start()
    yield
    scheduler.shutdown()
    



app = FastAPI(lifespan=lifespan)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix="/api")
