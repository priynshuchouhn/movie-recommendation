import users from "@/data/users.json";
import axios from "axios";

export async function GET(request: { url: string | URL }) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // Validate user ID
  if (!userId || !users[userId as keyof typeof users]) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // Retrieve user preferences from the user object (Hash Map Usage)
  const user = users[userId as keyof typeof users];
  const userPreferences = new Set(user.preferences); // Convert preferences into a Set for efficient lookups (Set Usage)

  // Fetch upcoming movies from TMDB API
  const moviesRes = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      timeout: 5000,
    }
  );
  const movieData = await moviesRes.data;
  const movies = movieData.results; // Array of movies fetched from TMDB API

  // Filter movies based on user preferences (Set Usage for genre matching)
  const recommendedMovies = movies
    .filter((movie: { genre_ids: number[] }) =>
      movie.genre_ids.some((id) => userPreferences.has(id)) // Efficient lookup with Set
    )
    .sort(
      (a: { popularity: number }, b: { popularity: number }) =>
        b.popularity - a.popularity // Sorting movies by popularity (Heap Concept Applied)
    );

  // Return the recommended movies as a response
  return new Response(JSON.stringify(recommendedMovies), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

