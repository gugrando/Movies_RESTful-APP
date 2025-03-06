import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../../controllers/movieController';
import { Link } from 'react-router-dom';

interface Movie {
    _id: string;
    title: string;
    rating: number;
    description: string;
    director: string;
    stars?: string[];
    poster: string;
    banner?: string;
    createdAt: string;
    updatedAt: string;
}


const MovieList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['movies'],
        queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
        initialPageParam: 1,


        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.pagination.currentPage + 1;
            return nextPage <= lastPage.pagination.totalPages ? nextPage : undefined;
        },
    });

    // Referência do último item
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastMovieRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        });

        if (lastMovieRef.current) {
            observerRef.current.observe(lastMovieRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <>
        <span>Total de Filmes: {data?.pages[0].pagination.totalMovies}</span>
        <div className="flex flex-wrap justify-center gap-8 w-full max-h-[48rem] bg-gray-800 rounded-sm ">
            {data?.pages.map((page, pageIndex) =>
                page.movies.map((movie: Movie, index) => {
                    const isLastItem =
                        pageIndex === data.pages.length - 1 && index === page.movies.length - 1;
                    const id = movie._id;
                        return (
                        <Link className="flex flex-col items-center bg-gray-900 w-[18rem] h-[20rem] p-4" to={`/movie/${id}`}>
                            <div key={id} ref={isLastItem ? lastMovieRef : null} className='flex flex-col items-center w-full'>
                                <img className="w-[12rem] h-[12rem]" src={movie.poster} alt={movie.title} />
                                <h1 className="text-xl font-bold text-white mt-2 text-center">
                                    {movie.title}
                                </h1>
                            </div>
                        </Link>
                        
                    );
                })
            )}

            {isFetchingNextPage && (
                <div className="text-white text-center w-full mt-4">Carregando mais filmes...</div>
            )}
        </div>
        </>
        
    );
};

export default MovieList;
