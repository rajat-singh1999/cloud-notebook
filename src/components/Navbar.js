import React, {useEffect} from 'react'
import {
    Link, useLocation
} from "react-router-dom";

const Navbar = () => {
    let location = useLocation();
    useEffect(()=>{
    }, [location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">cloudNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/"?"":"active"}`} to="/about">About</Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link className="nav-link" to="/">Pricing</Link>
                    </li> */}
                    
                </ul>
                </div>
            </div>
            </nav>
        </>
    )
}

export default Navbar
