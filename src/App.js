import React, { useState, useEffect } from 'react'

import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import SectionHeading from './components/SectionHeading'
import ResultTrending from './components/ResultTrending'
import ResultSearch from './components/ResultSearch'

function App() {
  const API_KEY = '396f9c8444e7ff20a696e93cc4ed6e46'

  // create the state for components
  const [searchResults, setSearchResults] = useState([])
  const [query, setQuery] = useState([])
  const [error, setError] = useState(false)
  const [trending, setTrending] = useState([])
  const [showTrending, setShowTrending] = useState(true)
  // main methods
  const fetchTrendingData = async (e, name) => {
    fetchQueryInputData(e, name )
  }

  const getTrending = async () => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    try {
      const res = await fetch(url)
      const data = await res.json()
      setTrending(data.results)
    }catch(err){
      console.log(err)
    }
  }

  const fetchQueryInputData = async (e, query) => {
    e.preventDefault()
    setSearchResults([])
    setShowTrending(false)
    setQuery(query)
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`
    
    try {
      const res = await fetch(url)
      const data = await res.json()
      data.results.length || query == '' ? setSearchResults(data.results) : setError(true)
      
    } catch(err){
      console.log(err)
    }
    
  }
  
  useEffect(() => {
    getTrending()
  },[])

  return (
    <div className="App">
        <Header fetchQueryInputData={fetchQueryInputData} />
        <div className="content">
          <div className="section">
            <SectionHeading error={error} query={query} searchResultsLength={searchResults.length} />

            {
              showTrending
              ? 
              <>
                <ResultTrending trending={ trending } fetchTrendingData={fetchTrendingData} />
              </>
              : ''
            }
            <ResultSearch searchResults={searchResults} fetchQueryInputData={fetchQueryInputData}/>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default App
