import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, instrument })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate(`/${instrument}`); // Redirect to the learning page for the selected instrument
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container" align='center'>
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Sign Up</h2>
        
        <div className="group">
          <span className="icon">👤</span> {/* Placeholder icon for name */}
          <input 
            type="text" 
            className="inp3" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="group">
          <span className="icon">📧</span> {/* Placeholder icon for email */}
          <input 
            type="email" 
            className="inp3" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="group">
          <span className="icon">🔒</span> {/* Placeholder icon for password */}
          <input 
            type="password" 
            className="inp3" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <h3>Select an Instrument:</h3>
        <div className="instrument-selection">
          <button 
            type="button" 
            className={`button-30 ${instrument === 'Piano' ? 'selected' : ''}`} 
            onClick={() => setInstrument('Piano')}
          >
            Piano
          </button>
          <button 
            type="button" 
            className={`button-30 ${instrument === 'Guitar' ? 'selected' : ''}`} 
            onClick={() => setInstrument('Guitar')}
          >
            Guitar
          </button>
          <button 
            type="button" 
            className={`button-30 ${instrument === 'Drums' ? 'selected' : ''}`} 
            onClick={() => setInstrument('Drums')}
          >
            Drums
          </button>
        </div>
        
        {instrument && (
          <div>
            <h4>You selected: {instrument}</h4>
          </div>
        )}
        
        <button type="submit" className="button-29">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
