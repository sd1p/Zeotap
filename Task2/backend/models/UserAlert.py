from sqlalchemy import Column, Integer, String, Float, Boolean
from config.DB import Base

class UserAlert(Base):
    __tablename__ = 'user_alerts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_email = Column(String, nullable=True)
    city = Column(String, nullable=False)
    temperature_above = Column(Boolean, nullable=False)
    temperature_threshold = Column(Float, nullable=True)
    active = Column(Boolean, default=True)