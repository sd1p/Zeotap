from sqlalchemy import Column, Integer, String, Float
from config.DB import Base

class WeatherData(Base):
    __tablename__ = 'weather_data'
    id = Column(Integer, primary_key=True, autoincrement=True)
    city = Column(String, nullable=False)
    main = Column(String, nullable=False) 
    temp = Column(Float, nullable=False) 
    feels_like = Column(Float, nullable=False) 
    humidity = Column(Float, nullable=False)  
    dt = Column(Integer, nullable=False)  
