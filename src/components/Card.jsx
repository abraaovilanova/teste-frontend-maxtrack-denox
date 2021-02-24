import React, { useState, useEffect } from 'react'
import './Card.css'

export default ({ item, mediaType }) => {
    const API_KEY = '396f9c8444e7ff20a696e93cc4ed6e46'
    if(mediaType == 'movie') {
        return (
            <>
            </>
            // <div className="card" style={{backgroundColor: 'green'}}>
            //     <h3 className="card-title">{item.title}</h3>
            //     <img className="card--image" src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title + 'poster'} /> 
            //     <div className="card--content">
            //          <p><small>RELEASE DATE: {item.release_date}</small></p>
            //          <p><small>RATING: {item.vote_average}</small></p>
            //          <p className="card--desc">{item.title}</p>
            //     </div>    
            // </div>
        )
    }else if(mediaType == 'tv') {
         const [season, setSeason] = useState('')

         const handleSeasonNumber = async () => {
            if (!item.id) return 
             const url = `https://api.themoviedb.org/3/tv/${item.id}?api_key=${API_KEY}&language=en-US`
                try {
                    const res = await fetch(url)
                    const data = await res.json()
                    console.log(data)
                    setSeason(data)
                } catch(err){
                    console.log(err)
                    }
            }
        useEffect(() => {
            handleSeasonNumber()

         },[])

        return (
            <div className="card" style={{backgroundColor: 'yellow'}}>
                <img className="card--image" src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title + 'poster'} /> 
                <div className="card--content">
                    <h3 className="card-title">{item.title}</h3>
                    <p><small>RELEASE DATE: {item.first_air_date}</small></p>
                    <p><small>SEASON NUMBER: {season.number_of_seasons}</small></p>
                    <p className="card--desc">{item.overview}</p>
                </div>    
            </div>
        )
    }else if(mediaType == 'person'){

        const [person, setPerson] = useState([])

        const handlePeopleInfo = async (e) => {
            const url = `https://api.themoviedb.org/3/person/${item.id}?api_key=${API_KEY}&language=en-US`
            if (!item.id) return 
            try {
                const res = await fetch(url)
                const data = await res.json()
                setPerson(data)
             } catch(err){
                 console.log(err)
             }
        }

        // const handleLastFilm = async (e) => {
        //     const url = `https://api.themoviedb.org/3/person/${item.id}/movie_credits?api_key=${API_KEY}&language=en-US`
        //     if (!item.id) return 
        //     try {
        //         const res = await fetch(url)
        //         const data = await res.json()
        //         setPerson({...person, data})
        //         console.log(data)
        //      } catch(err){
        //          console.log(err)
        //      }
        // }
        useEffect(() => {
            handlePeopleInfo()
            // handleLastFilm()
        },[])
        return (
            <div className="card" style={{backgroundColor: 'blue'}}>
                <img className="card--image" src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2/${item.profile_path}`} alt={item.id + 'poster'} /> 
                <div className="card--content">
                    <h3 className="card-title">Name: {person.name}</h3>
                    <p><small>Birthday: {person.birthday}</small></p>
                    <p><small>Last film: {person.season_number}</small></p>
                    <p className="card--desc">{person.overview}</p>
                </div>    
            </div>

        )
    }


}