import React, { useEffect } from 'react';
import MovieListing from "../MovieListing/MovieListing"
import movieapi from '../../common/apis/movieapi'
import { APIKey } from '../../common/apis/moviesapikey'
import { useDispatch } from 'react-redux';
import { addMovies } from '../../features/movies/movieSlice';

const Home = () => {
    const movieTitle = 'Harry Potter';
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchMovies = async () => {
            try {
                const response = await movieapi
                    .get(`?apikey=${APIKey}&s=${movieTitle}&type=movie`)
                    dispatch(addMovies(response.data)) //dispatch an action
                }

            catch (err) {
                console.log("Err:", err)
            }

        }
        fetchMovies()
    }, [dispatch])


    return (
        <div>
            <div className="banner-img"></div>
            <MovieListing />
        </div>
    );
};

export default Home;