import React from 'react'
import {
    Link, useLocation, useHistory
} from "react-router-dom";

const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    
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
                    <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link className="nav-link" to="/">Pricing</Link>
                    </li> */}
                    
                </ul>
                </div>
                {localStorage.getItem('token')===""?<><Link className="btn btn-primary mx-2" to="/login" role="button" href="/">Log In</Link><Link className="btn btn-primary mx-2" to="/signup" role="button" href="/">Sign Up</Link></>:<button className="btn btn-danger" onClick={()=>{localStorage.setItem('token', '');history.push("/login")}}>Logout</button>}
            </div>
            </nav>
        </>
    )
}

export default Navbar
