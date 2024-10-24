import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Piano from './components/PianoLearningPlatform';
import LandingPage from './components/LandingPage';
import Guitar from './components/GuitarLearningPlatform';
import Drums from './components/DrumLearningPlatform';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/piano" element={<Piano />} />
          <Route path="/guitar" element={<Guitar />} />
          <Route path="/drums" element={<Drums />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
