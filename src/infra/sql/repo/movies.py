from sqlalchemy import select, delete
from sqlalchemy.orm import Session
from infra.sql.models import models
from schemas import schema


class RepoMovies():

    def __init__(self, db:Session):
        self.db = db

    def create(self, movie: schema.Movie):
        db_movie = models.Movie(name=movie.name,
                                rating=movie.rating,
                                date=movie.date,
                                movieId=movie.movieId)

        self.db.add(db_movie)
        self.db.commit()
        self.db.refresh(db_movie)

        return db_movie

    def list_all(self):
        movies = self.db.query(models.Movie).all()
        return movies


    def get_by_id(self, id: int):
        statement = select(models.Movie).filter_by(id=id)
        movie = self.db.execute(statement).scalar_one()

        return movie

    def delete_by_id(self, id:int):
        statement = delete(models.Movie).where(models.Movie.id == id)
        
        self.db.execute(statement)
        self.db.commit()