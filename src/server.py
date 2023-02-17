from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from infra.sql.config.database import create_db, get_db
from schemas import schema
from sqlalchemy.orm import Session
from infra.sql.repo.movies import RepoMovies

create_db()

app = FastAPI()

origins = ['http://127.0.0.1:5500']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Add a new movie to watched list
@app.post('/movies')
def save_movie(movie: schema.Movie, db: Session = Depends(get_db)):
    movie_created = RepoMovies(db).create(movie)
    return movie_created


#Call all watched movies
@app.get('/movies')
def get_movies(db: Session = Depends(get_db)):
    return RepoMovies(db).list_all()


#Call a specific movie 
@app.get('/movies/{id}')
def get_movie_by_id(id: int, db : Session = Depends(get_db)):
    return RepoMovies(db).get_by_id(id)


#Delete from watched list
@app.delete('/movies/{id}')
def delete_movie_by_id(id: int, db: Session = Depends(get_db)):
    return RepoMovies(db).delete_by_id(id)