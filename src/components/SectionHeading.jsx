import React from 'react'
import './SectionHeading.css'

export default ({error, query, searchResultsLength  }) => {
    return (
        <div className="section-heading">
            {
             error || query == ''
                ? <h2>Error, search again...</h2> 
                : searchResultsLength 
                    ? <h2>FOUND AT LEAST {searchResultsLength} MATCHES FOR “{ query }”</h2> 
                    : <h2><i className="fas fa-chart-line"></i> Trending</h2>
            }
        </div>
    )
}