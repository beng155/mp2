import type { Movie } from '../types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ListViewItems {
    movies: Movie[]
}

function filter_movies(movies: Movie[], searchQuery: string): Movie[] {
    return movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
}

function sort_movies(movies: Movie[], sortParam: string, sortOrder: string): Movie[] {
    if (sortParam === "title") {
        if (sortOrder === "ascending")
            movies.sort((a, b) => a.title.localeCompare(b.title))
        else
            movies.sort((a, b) => b.title.localeCompare(a.title))
    }
    else {
        if (sortOrder === "ascending") 
            movies.sort((a, b) => a.vote_average - b.vote_average)
        else
            movies.sort((a, b) => b.vote_average - a.vote_average)
    }
    return movies
}

function ListView({ movies } : ListViewItems) {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortParam, setSortParam] = useState('title')
    const [sortOrder, setSortOrder] = useState('ascending')
    const searchedMovies = sort_movies(filter_movies(movies, searchQuery), sortParam, sortOrder)
    return (
        <div>
            <div className="list-filters">
                <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder='Search for Movies'/>
                <div>
                    <select name="Sort By" onChange={(event) => setSortParam(event.target.value)}>
                        <option value="title">Sort: Title</option>
                        <option value="rating">Sort: Rating</option>
                    </select>
                </div>
                <div>
                    <select name="Sort Order" onChange={(event) => setSortOrder(event.target.value)}>
                        <option value="ascending">Order: Ascending</option>
                        <option value="descending">Order: Descending</option>
                    </select>
                </div>
            </div>
            <h1>Top Rated Movies</h1>
            <div className="movie-list">
                {searchedMovies.map((movie: Movie) => 
                    (<div className="movie-list-item" key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <h3>{movie.title}</h3>
                        </Link>
                        <p>Rating: {movie.vote_average}</p>
                        <p>Release Date: {movie.release_date}</p>
                    </div>)
                )}
            </div>
        </div>
    )
}

export default ListView
