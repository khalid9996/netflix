import React, { useEffect, useState } from 'react'
import axios from './axios';
import './row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


const base_URL = "http://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [trailerUrl,setTrailerUrl] = useState('');
    const [movies, setMovies] = useState([]);
    
    // A snippet of code which runs based on a specific condition/variable
    useEffect(() => {
      // if [], run once when the Row loads, and dont run again
      // if [any] changes, it will run
      async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
        
      }
      fetchData();
    }, [fetchUrl]);
    
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    };

    const handleClick = (movie) => {
      if (trailerUrl) {
        setTrailerUrl('');
      } else {
        movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => {
          console.log(error);
          movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => {
          console.log(error);
          movieTrailer(movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
        });
        });
      }
    }

  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className="row__posters">
          {/* Several row_Posters */}

          {movies.map(movie => {
            return (
            <img 
              onClick={() => handleClick(movie)}
              key={movie.id} 
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
              src={`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
              alt={movie.name} />
              )
          })}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;