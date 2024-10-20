from sqlalchemy import Column, Integer, String, Float, DateTime
from config.DB import Base

class Alert(Base):
    __tablename__ = 'alerts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    city = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    threshold = Column(Float, nullable=False)
    current_value = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    user_email = Column(String, nullable=True)