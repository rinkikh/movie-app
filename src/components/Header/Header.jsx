import React, { useState } from 'react';
import "./Header.scss"
import { Link } from 'react-router-dom';
// import logo from "../../images/logo.png"
import user from "../../images/user.png"
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';

const Header = () => {

    const [term, setTerm] = useState("");
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault(term)
        if(term == "") return alert("enter search term")
        dispatch(fetchAsyncMovies(term))
        dispatch(fetchAsyncShows(term))

    }
    return (
        <div className='header'>

            <div className='logo' >

                <Link to="/">    Movie App   </Link>
            </div>

            <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input type="text" value={term}
                        placeholder='search Movies or Shows'
                        onChange={(e) => setTerm(e.target.value)} />
                    <button type='submit'>
                        <i className='fa fa-search'></i>
                    </button>
                </form>
            </div>

            <div className='user-image'>
                <img src={user} alt='user' />
            </div>

        </div>
    );
};

export default Header;