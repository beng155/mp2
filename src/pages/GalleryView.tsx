import type { Movie } from '../types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface GalleryViewItem {
    movies: Movie[]
    genres: Record<number, string>
}



function GalleryView({ movies, genres }: GalleryViewItem) {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])

    function toggleGenre(genre_id: number) {
        if (selectedGenres.includes(genre_id)) {
            setSelectedGenres(selectedGenres.filter(genre => genre !== genre_id))
        }
        else {
            setSelectedGenres([...selectedGenres, genre_id])
        }
    }

    const filtered_movies = selectedGenres.length === 0 ? movies : movies.filter(movie => selectedGenres.some(genre_id => movie.genre_ids.includes(genre_id)))
    return (
            <div>
                <h1>Movie Gallery</h1>

                <div className="genre-filters">
                    {Object.entries(genres).map(([id, name]) => (
                        <button key={id} className={selectedGenres.includes(Number(id)) ? "genre-button active" : "genre-button"} onClick={() => toggleGenre(Number(id))}>
                            {name}
                        </button>
                    ))}
                </div>

                <div className="gallery">
                    {filtered_movies.map((movie: Movie) => (
                        <div className="gallery-card" key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

export default GalleryView