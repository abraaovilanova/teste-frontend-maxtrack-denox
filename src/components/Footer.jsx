import React from 'react'
import './Footer.css'

export default () => {
    return (
        <div className="footer">
            <p className="text">feito com <i className="fas fa-heart"></i> por <strong>Abraão Vila Nova</strong> em Recife, Pernambuco.</p>
            <div className="social-media-icons">
                <div className="icon">
                    <a href="https://github.com/abraaovilanova"><i className="fab fa-github"></i></a>
                </div>
                <div className="icon">
                    <a href="https://www.linkedin.com/in/abraao-vila-nova-ab3333a4/"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    )
}