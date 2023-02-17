from sqlalchemy import Column, Integer, String, Double
from infra.sql.config.database import Base

class Movie(Base):
    __tablename__ = 'movie'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    rating = Column(Double)
    date = Column(String)
    movieId = Column(Integer, unique=True)