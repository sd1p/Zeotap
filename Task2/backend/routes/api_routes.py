from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from config.DB import get_db
from sqlalchemy import desc
from models.DailyWeatherSummary import DailyWeatherSummary
from models.UserAlert import UserAlert
from models.Alert import Alert
from models.WeatherData import WeatherData
from lib.calculate_daily_summary import calculate_today_summary_wrapper
from pydantic import BaseModel
from models.CityEnum import CityEnum

class AlertRequest(BaseModel):
    user_email: str
    city: CityEnum
    temperature_above: bool
    temperature_threshold: float


api_router = APIRouter()


@api_router.get("/weather/current/{city}")
def get_current_weather(city: CityEnum, db: Session = Depends(get_db)):
    latest_weather = (
        db.query(WeatherData)
        .filter_by(city=city.title())
        .order_by(desc(WeatherData.dt))
        .first()
    )

    if not latest_weather:
        raise HTTPException(status_code=404, detail="Weather data not found")

    return latest_weather


@api_router.get("/weather/daily_summary/{city}")
def get_daily_summary(city: CityEnum, db: Session = Depends(get_db)):
    summaries = (
        db.query(DailyWeatherSummary)
        .filter_by(city=city.title())
        .order_by(desc(DailyWeatherSummary.date))
        .all()
    )
    if not summaries:
        raise HTTPException(status_code=404, detail="Daily summaries not found")
    return summaries


@api_router.post("/alerts")
def create_alert(alert_request: AlertRequest, db: Session = Depends(get_db)):
    new_alert = UserAlert(
        user_email=alert_request.user_email,
        city=alert_request.city.title(),
        temperature_above=alert_request.temperature_above,
        temperature_threshold=alert_request.temperature_threshold,
        active=True,
    )
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)
    return new_alert


@api_router.get("/alerts/{city}")
def get_alerts(city: CityEnum, db: Session = Depends(get_db)):
    city_title_case = city.title()
    alerts = (
        db.query(Alert)
        .filter_by(city=city_title_case)
        .order_by(desc(Alert.timestamp))
        .all()
    )
    if not alerts:
        raise HTTPException(status_code=404, detail="Alerts not found")
    return alerts


@api_router.get("/weather/fetch")
def get_weather_data():
    """Endpoint to trigger weather data fetch and store operation."""
    calculate_today_summary_wrapper()
    return {"message": "Weather data fetched and stored successfully."}


@api_router.get("/weather/calculate_summary")
def calculate_summary():
    """Endpoint to trigger calculation of today's weather summary."""
    calculate_today_summary_wrapper()
    return {"message": "Today's weather summary calculated successfully."}
