import React, { useState, useEffect } from 'react'
import './Item.css'

export default ({ item, mediaType, fetchQueryInputData }) => {
    const API_KEY = '396f9c8444e7ff20a696e93cc4ed6e46'

    if(mediaType == 'movie') {
        const [showInfo, setShowInfo] = useState(false)
        return (
            <li>
                <div className="poster" onClick={() => setShowInfo(!showInfo)}>
                    <img src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title + 'poster'}/>
                </div>
                <div className="detail-content">
                    <div className="film-title">
                        <p>{item.title}<small>{showInfo ? item.release_date.split('-')[0] : '' }</small></p>
                    </div>
                    {showInfo
                    ?
                    <div className="vote-average">
                        <p className="rating-title">RATING</p>
                        <p className="rating-content">
                            {item.vote_average}<small>/10</small>
                            <i class="fas fa-star"></i>
                        </p>
                    </div>
                    : null }

                    <div className="film-overview">
                        {item.overview}
                    </div>

                    <div className="more-info" onClick={() => setShowInfo(!showInfo)}>
                        {showInfo ? 'hide informations ': 'more information' }
                    </div>
                </div>
            </li>
        )
    } else if(mediaType == 'tv'){
        const [season, setSeason] = useState('')
        const [showInfo, setShowInfo] = useState(false)

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
            <li>
                <div className="poster" onClick={() => setShowInfo(!showInfo)}>
                    <img src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title + 'poster'} /> 
                </div>
                <div className="detail-content">
                    <div className="film-title">
                        <p>
                            {item.name}
                            <small>{showInfo ? item.first_air_date.split('-')[0] : '' }</small>
                            <small>{showInfo ? `(${season.number_of_seasons} seasons)` : '' }</small>
                        </p>
                    </div>
                    {showInfo
                    ?
                    <div className="vote-average">
                        <p className="rating-title">RATING</p>
                        <p className="rating-content">
                            {season.vote_average}<small>/10</small>
                            <i class="fas fa-star"></i>
                        </p>
                    </div>
                    : null }
                    <div className="film-overview">{item.overview}</div>
                    <div className="more-info" onClick={() => setShowInfo(!showInfo)}>
                        {showInfo ? 'hide informations ': 'more information' }
                    </div>
                </div>    
            </li>
        )
    }else if(mediaType == 'person') {
        const [person, setPerson] = useState([])
        const [movieCredits, setMovieCredits] = useState([])
        const [showInfo, setShowInfo] = useState(false)
        const date = new Date()



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
        const handleLastFilm = async (e) => {
            const url = `https://api.themoviedb.org/3/person/${item.id}/movie_credits?api_key=${API_KEY}&language=en-US`
            if (!item.id) return 
            try {
                const res = await fetch(url)
                const data = await res.json()
                setMovieCredits(data.cast)
             } catch(err){
                 console.log(err)
             }
        }

        useEffect(() => {
            handlePeopleInfo()
            handleLastFilm()
        },[])

        const sortObject = (data) => {
            let filtredData = data.filter(film => film.release_date)
             return filtredData.sort((a, b) => (a.release_date.split('-')[0] < b.release_date.split('-')[0]) ? 1 : -1)
          }

        const lastFilm = sortObject(movieCredits)[0] ? `${sortObject(movieCredits)[0].title} - ${sortObject(movieCredits)[0].release_date}  ` : ''

        return (
            <li>
                <div className="poster" onClick={() => setShowInfo(!showInfo)}>
                    <img src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2/${item.profile_path}`} alt={item.id + 'poster'} /> 
                </div>
                <div className="detail-content">
                    <div className="film-title">
                        <p>
                            {person.name}
                            <small>{showInfo & person.birthda ? `Age:  ${date.getFullYear() - parseInt(person.birthday.split('-')[0])}` : '' }</small>
                        </p>
                    </div>
                    {showInfo
                        ?       
                            <div className="lastfim">
                                Last film: 
                                <div className="more-info" onClick={(e) => fetchQueryInputData(e, lastFilm.split('-')[0])}>
                                    { lastFilm.split('-')[0] } 
                                </div>  
                            </div>
                        : ' '

                    } 

                    <div className="film-overview">
                        <p className="bio">
                            {person.biography ? person.biography : 'Without biography'}
                        </p>
                    </div>

                    <div 
                        className="more-info" 
                        onClick={() => {
                            setShowInfo(!showInfo)}}>
                        {showInfo ? 'hide informations ': 'more information' }
                    </div>  
                </div>   
            </li>
        )
    }
}