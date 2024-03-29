import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert('Account Creation successful!', 'success');
    } else {
      props.showAlert('Invalid Details!', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ width: '50%', marginTop: '10%' }}>
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" value={credentials.name} id="name" onChange={onChange} name="name" aria-describedby="emailHelp" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" value={credentials.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="password" minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            style={{ borderColor: credentials.cPassword !== credentials.password ? 'red' : '' }}
            name="cPassword"
            onChange={onChange}
            value={credentials.cPassword}
            id="cPassword"
            minLength={5}
            required
          />
          {credentials.cPassword !== credentials.password && (
            <div id="passwordHelp" className="form-text" style={{ color: 'red' }}>
              Password does not match!
            </div>
          )}
        </div>

        <button type="submit" className={`btn btn-primary`} disabled={credentials.cPassword !== credentials.password || credentials.password === ''}>
          Submit
        </button>
      </form>
      <div className="my-2">
        Already have an account?{' '}
        <strong style={{ color: 'blue' }}>
          <Link type="text" to="/login">
            Log In!
          </Link>
        </strong>
      </div>
    </div>
  );
}

export default Signup;
