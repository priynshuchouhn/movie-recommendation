'use client'
import { useState } from "react";
import MovieRecommendations from "./components/MovieRecommendations";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [userId, setUserId] = useState('Priyanshu');
  return (
    <div>
      <div className="flex justify-center mb-5 gap-4">
        <Button onClick={()=> setUserId('Priyanshu')}>Priyanshu</Button>
        <Button onClick={()=> setUserId('Deepak')}>Deepak</Button>
        <Button onClick={()=> setUserId('Aman')}>Aman</Button>
      </div>
      <div className="items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
        <MovieRecommendations userId={userId} />
      </div>
    </div>
  );
}
