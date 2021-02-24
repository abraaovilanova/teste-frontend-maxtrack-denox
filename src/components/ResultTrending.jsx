import React from 'react'
import './ResultTrending.css'

export default ({ trending, fetchTrendingData })=>{
    return (
        <>
            <ul className="result-trending">
                    {trending.filter(result => result.poster_path || result.profile_path).map(item => { 
                            return (
                                <span onClick={(e) => fetchTrendingData(e, item.title || item.name)} key={item.id}>
                                    <img src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} />
                                </span>
                            )
                        })}
            </ul>
        </>

    )
}