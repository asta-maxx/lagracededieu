import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>La grâce de Dieu</h1>
        <div align='center'>
          <Link className='l1' to="/signin">
            <button class="button-64"><span class='text'>Proceed</span></button>
          </Link>
        </div>


      </div>
    </div>
  );
}

export default LandingPage;

