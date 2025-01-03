/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { useState, useEffect } from "react";

const MovieRecommendations = ({ userId }:{userId: string}) => {
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/recommendations?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch recommendations");
        const data = await response.json();
        setMovies(data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="text-center">
      <h2>Recommended Movies for <span className="text-fuchsia-900 font-semibold text-lg italic">{userId}</span></h2>
      <ParallaxScroll movies={movies} />
    </div>
  );
};

export default MovieRecommendations;
