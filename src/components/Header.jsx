import React from 'react'
import './Header.css'


import Search from './Search'
export default ( { fetchQueryInputData }) => {
    
function refreshPage() {
    window.location.reload(false);
    }

    return (
        <div className="header" >
            <div className="logo" onClick={refreshPage}>
                <i className="fas fa-film"></i>
                <i className="fas fa-film"></i>
                <i className="fas fa-film"></i>
            </div>
            <div className="title-site" onClick={refreshPage}>
                <h1>Moviebox</h1>
            </div>
            <div>
                <Search fetchQueryInputData={ fetchQueryInputData }/>
            </div>
        </div>
    )
}