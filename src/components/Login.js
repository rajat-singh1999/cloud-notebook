import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const [credentials, setcredentials] = useState({email:"", password:""});
    let history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            // save auth token and redirect
            localStorage.setItem('token', json.authToken);
            history.push("/");
        }
        else{
            alert("Invalid Credentials!")
        }
    }

    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div className="container" style={{width:"50%", marginTop:"10%"}}>
            <h2>Log In!</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} id="exampleInputEmail1" onChange={onChange} name="email" aria-describedby="emailHelp"/>
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control"  name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1"/>
            </div>
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <div className="my-2">Don't have an account yet? <strong style={{color:"blue"}}><Link type="text" to="/signup">Sign Up!</Link></strong>
            </div>
        </div>
    )
}

export default Login
