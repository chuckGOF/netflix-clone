import React, { useState, useEffect } from 'react'
import instance from '../axios'
import requests from '../requests'
import './Banner.css'

const img_baseUrl = 'https://image.tmdb.org/t/p/original/'

const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const Banner = () => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        const fetchData = async function () {
            const req = await instance.get(requests.fetchNetflixOriginal)
            setMovie(req.data.results[Math.floor(Math.random() * req.data.results.length - 1)])
            // console.log(req)
            return req
        }
        fetchData()
    }, [])

    return (
        <header className='banner' style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${img_baseUrl}${movie?.backdrop_path})`,
            backgroundPosition: 'center center'
        }}>
            <div className='banner_contents'>
                <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>
                <h1 className='banner_description'>{truncate(movie?.overview, 150)}</h1>
                <div className='banner_fadeBottom'></div>
            </div>
        </header>
    )
}

export default Banner;