import axios from 'axios'
import type { Movie, Genre } from '../types.ts'
let api_key: string = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2UxZjA0OTg5NzFlYzI3NDMzNDljYTM1ODczOGI0NiIsIm5iZiI6MTc5MTE1MzYwMS4yOTUsInN1YiI6IjZhYzJkNWMxYjhjOGY5MmU0ODJmMjZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R790w1n_7MOy3Bo5-hSntVm-A28yM6Jqr92dFGYRdFA";

export async function get_top_rated_movies(page: number): Promise<Movie[]> {
    const url: string = `https://api.themoviedb.org/3/movie/top_rated`
    const response = await axios.get(url, 
        {headers: {Authorization: `Bearer ${api_key}`, accept: 'application/json'},
        params: {page}
    })
    console.log("returned page:", response.data.page)
    return response.data.results;
}

export async function get_top_n_movies(n: number): Promise<Movie[]> {
    let movies_cnt: number = 0
    let page_num: number = 1
    let res_list: Movie[] = []
    while (movies_cnt < n) {
        const movies = await get_top_rated_movies(page_num)
        page_num += 1
        res_list.push(...movies);
        movies_cnt += 20
    }
    const unique_movies = Array.from(
        new Map(res_list.map(movie => [movie.id, movie])).values()
    )
    return unique_movies
}

export async function get_genres(): Promise<Record<number, string>> {
    const url: string = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    const response = await axios.get(url,
        {headers: {Authorization: `Bearer ${api_key}`, accept: 'application/json'},
    })
    let genres = response.data.genres
    let genre_map: Record<number, string> = Object.fromEntries(genres.map((curr_genre: Genre) => [curr_genre.id, curr_genre.name]))
    return genre_map
}