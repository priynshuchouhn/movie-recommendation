/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Badge } from '@/components/ui/badge';
import React, { useEffect, useState } from 'react'

function Page() {
    const [genre, setGenre] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await fetch(`/api/genre`);
                if (!response.ok) throw new Error("Failed to fetch genre");
                const data = await response.json();
                setGenre(data);
                console.log(data);
            } catch (err: any) {
                console.log(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGenre();
    }, []);

    if (loading) return <p>Loading Genre...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(genre)
    return (
        <div className='p-8 flex justify-center'>
            <div className='flex flex-wrap gap-2'>
                {genre.map(({ id, name }: { id: number, name: string }, index:number) => <Badge variant={id%2 == 0 ? 'default': 'destructive'} key={`${id}-${index}`} className='text-lg font-medium cursor-pointer'>{name}</Badge>)}
            </div>
        </div>
    )
}

export default Page
