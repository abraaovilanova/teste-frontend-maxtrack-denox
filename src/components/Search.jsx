import React, { useState, useEffect } from 'react'
import Card from './Card'
import './Search.css'
// import './SearchMovies.css'

export default ({ fetchQueryInputData }) => {

    // states - input - query, movies
    const [query, setQuery] = useState('')

    return (
        <>
            <form className="form" onSubmit={ (e) => fetchQueryInputData(e, query) }>
                <div className="search">
                    <div className="search-input">
                        <input
                            className="input" 
                            type="text" 
                            name="query" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)} 
                            placeholder="i.e Harry Potter" />

                        <button className="button" type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </form>   
        </>

    )
}