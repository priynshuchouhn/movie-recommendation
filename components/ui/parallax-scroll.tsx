/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn, convertDate, truncateToOneDecimal } from "@/lib/utils";

export const ParallaxScroll = ({
    movies,
    className,
}: {
    movies: any[];
    className?: string;
}) => {
    const gridRef = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        container: gridRef, // remove this if your container is not fixed height
        offset: ["start start", "end start"], // remove this if your container is not fixed height
    });

    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const third = Math.ceil(movies.length / 3);

    const firstPart = movies.slice(0, third);
    const secondPart = movies.slice(third, 2 * third);
    const thirdPart = movies.slice(2 * third);

    return (
        <div className={cn("h-screen items-start overflow-y-auto w-full", className)} ref={gridRef}>
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-5xl mx-auto gap-10 py-5 px-10"
                ref={gridRef}
            >
                <div className="grid gap-10">
                    {firstPart.map((el, idx) => (
                        <motion.div
                            style={{ y: translateFirst }} // Apply the translateY motion value here
                            key={"grid-1" + idx}
                        >
                            <div className="">
                                <Image
                                    src={`http://image.tmdb.org/t/p/w500${el.poster_path}`}
                                    className="h-80 w-full object-cover object-left-top rounded-t-lg gap-10 !m-0 !p-0"
                                    height="400"
                                    width="400"
                                    alt="thumbnail"
                                />
                                <div className="text-start p-2 bg-blue-100 rounded-b-lg">
                                    <p className="font-semibold">{el.original_title}</p>
                                    <p>Releasing on {convertDate(el.release_date)}</p>
                                    <p className="text-lg font-semibold">{truncateToOneDecimal(el.vote_average)}⭐️</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-10">
                    {secondPart.map((el, idx) => (
                        <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                            <div className="">
                                <Image
                                    src={`http://image.tmdb.org/t/p/w500${el.poster_path}`}
                                    className="h-80 w-full object-cover object-left-top rounded-t-lg gap-10 !m-0 !p-0"
                                    height="400"
                                    width="400"
                                    alt="thumbnail"
                                />
                                <div className="text-start p-2 bg-pink-100 rounded-b-lg">
                                    <p className="font-semibold">{el.original_title}</p>
                                    <p>Releasing on {convertDate(el.release_date)}</p>
                                    <p className="text-lg font-semibold">{truncateToOneDecimal(el.vote_average)}⭐️</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-10">
                    {thirdPart.map((el, idx) => (
                        <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                            <div className="">
                                <Image
                                    src={`http://image.tmdb.org/t/p/w500${el.poster_path}`}
                                    className="h-80 w-full object-cover object-left-top rounded-t-lg gap-10 !m-0 !p-0"
                                    height="400"
                                    width="400"
                                    alt="thumbnail"
                                />
                                <div className="text-start p-2 bg-blue-100 rounded-b-lg">
                                    <p className="font-semibold">{el.original_title}</p>
                                    <p>Releasing on {convertDate(el.release_date)}</p>
                                    <p className="text-lg font-semibold">{truncateToOneDecimal(el.vote_average)}⭐️</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
