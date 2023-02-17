from pydantic import BaseModel

class Movie(BaseModel):
    id: int | None = None
    name: str
    rating: float 
    date: str
    movieId: int

    class Config:
        orm_mode = True