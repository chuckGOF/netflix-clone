import React, { useState, useEffect } from 'react'
import instance from '../axios'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import './Row.css'

const img_baseurl = 'https://image.tmdb.org/t/p/original/'

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')
    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        // if [] run once when the row loads, and dont run again
        const fetchData = async function () {
            const request = await instance.get(fetchUrl)
            setMovies(request.data.results)
            return request.data.results
        }
        fetchData()
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    }

    // console.log(movies)
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.original_title || '')
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='row'>
            <h1>{title}</h1>

            <div className='row_posters'>
                {movies.map(movie => {
                    return (
                        <img
                            onClick={() => handleClick(movie)}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`} key={movie.id}
                            src={`${img_baseurl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    )
                })}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    ) 
    
}

export default Row;