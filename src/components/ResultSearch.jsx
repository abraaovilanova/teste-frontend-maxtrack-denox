import React from 'react'
import './ResultSearch.css'
import Item from './Item'

export default ({searchResults, fetchQueryInputData}) => {
    return (
        <div className="result">
            <ul>
                {searchResults.filter(result => result.poster_path || result.profile_path).map(item => { 
                    return (
                        <Item item={item} mediaType={item.media_type} fetchQueryInputData={fetchQueryInputData} />

                    )
                })}
            </ul>
      </div>
    )
}