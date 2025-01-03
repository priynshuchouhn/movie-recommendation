import axios from "axios";

export async function GET() {

    const genreMovieRes = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        },
        timeout: 5000,
    })
    const genreTvRes = await axios.get('https://api.themoviedb.org/3/genre/tv/list?language=en', {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        },
        timeout: 5000,
    })
    const genreMovieData = await genreMovieRes.data
    const genreTvData = await genreTvRes.data
    const genre = Array.from(
        new Set([...genreMovieData.genres, ...genreTvData.genres])
      );
    return new Response(JSON.stringify(genre), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}