import React, { useEffect, useState } from 'react'
import axios from './axios';
import './row.css'

const base_URL = "http://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl }) => {
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
    
  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className="row__posters">
          {/* Several row_Posters */}

          {movies.map(movie => {
            return (
            <img 
              key={movie.id} 
              className='row__poster' 
              src={`${base_URL}${movie.poster_path}`} 
              alt={movie.name} />
              )
          })}
        </div>
    </div>
  )
}

export default Row;