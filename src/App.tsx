import { useState } from 'react'
import { useEffect } from 'react'
import { get_top_n_movies, get_genres } from './api/tmdb'
import { Routes, Route, Link } from 'react-router-dom'
import type { Movie } from './types.ts'
import ListView from './pages/ListView'
import DetailView from './pages/DetailView.tsx'
import GalleryView from './pages/GalleryView.tsx'
import './App.css'

function getPoster(suffix: string) {
  return `https://image.tmdb.org/t/p/w500${suffix}`
}

function App() {
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    async function get_all_movies() {
      const all_movies = await(get_top_n_movies(100))
      setMovies(all_movies);
    }

    async function get_genre_map() {
      const genre_map = await(get_genres())
      setGenres(genre_map)
    }

    get_all_movies()
    get_genre_map()
  }, [])
  return (
    <>
    <div className="main-nav">
      <Link to="/">List View</Link>
      <Link to="/gallery">Gallery View</Link>
    </div>

    <Routes>
      <Route path="/" element={<ListView movies={movies}/>} />
      <Route path="/movie/:id" element={<DetailView movies={movies} genres={genres}/>} />
      <Route path="/gallery" element={<GalleryView movies={movies} genres={genres }/>} />
    </Routes>
    </>
  )
}

export default App
