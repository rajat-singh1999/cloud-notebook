import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Logged in Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container" style={{ width: "50%", marginTop: "10%" }}>
      <h2>Log In!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="exampleInputEmail1" onChange={onChange} name="email" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="my-2">Don't have an account yet? <strong style={{ color: "blue" }}><Link to="/signup">Sign Up!</Link></strong></div>
    </div>
  );
}

export default Login;
