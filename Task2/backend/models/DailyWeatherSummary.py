from sqlalchemy import Column, Integer, String, Float, Date, UniqueConstraint
from config.DB import Base

class DailyWeatherSummary(Base):
    __tablename__ = 'daily_weather_summary'
    id = Column(Integer, primary_key=True, autoincrement=True)
    city = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    avg_temp = Column(Float, nullable=False)
    max_temp = Column(Float, nullable=False)
    min_temp = Column(Float, nullable=False)
    dominant_condition = Column(String, nullable=False)

    __table_args__ = (UniqueConstraint('city', 'date', name='_city_date_uc'),)