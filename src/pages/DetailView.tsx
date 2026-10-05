import type { Movie } from '../types'
import {useParams, useNavigate } from 'react-router-dom'

interface DetailViewItem {
    movies: Movie[]
    genres: Record<number, string>
}

function DetailView({movies, genres}: DetailViewItem) {
    const {id} = useParams()
    const nav = useNavigate()
    const movie = movies.find(movie => movie.id === Number(id))
    if (!movie) {
        return <p>Still fetching from API. Please try again later.</p>
    }
    const ind = movies.findIndex(currMovie => currMovie.id === movie.id)
    const prevMovie = movies[ind - 1]
    const nextMovie = movies[ind + 1]


    return (
        <div>
            <h1>{movie.title}</h1>
            <div className="detail-content">
                <img className="detail-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                <div className="detail-info">
                    <p><strong>Rating:</strong> {movie.vote_average}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Genre(s):</strong> {movie.genre_ids.map(id => genres[id]).join(", ")}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                </div>
            </div>
            <div className="detail-nav">
                <button disabled={!prevMovie} onClick={prevMovie && (() => nav(`/movie/${prevMovie.id}`))}>
                    Previous
                </button>
                <button disabled={!nextMovie} onClick={nextMovie && (() => nav(`/movie/${nextMovie.id}`))}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default DetailView