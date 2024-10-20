import os
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv('DB_URL')
OPEN_WEATHER_API_KEY = os.getenv('OPEN_WEATHER_API_KEY')
