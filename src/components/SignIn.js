import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        // Store user data in local storage
        localStorage.setItem('userToken', data.token); // Store user token for authentication
        localStorage.setItem('user', JSON.stringify(data.user)); // Optionally store user data

        // Get the user's selected instrument from user data
        const userInstrument = data.user.instrument; // Assuming the response contains the user's instrument

        // Redirect to the learning page for the selected instrument
        navigate(`/${userInstrument}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Sign In</h2>
        <div align='center'>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className='inp1'
          />
          <br />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className='inp2'
          />
        </div>
        <br />
        <div align='center'>
          <button type="submit" className="button-29">Sign In</button>
        </div>
        <div align='center'><br />
          New here!?<br /><br />
          <Link to="/signup">
            <button className="button-29">Signup</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
