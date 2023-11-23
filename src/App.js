import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import whiteProfile from './images/white/white_profile.png';
import higginsProfile from './images/higgins/higgins_profile.jpg';
import DetailWhite from './white.js'


const Home = () => {
  const navigate = useNavigate();

  const handleWhiteProfileClick = () => {
    // Navigate to the "/white" route when whiteProfile is clicked
    navigate('/detail/white');
  };

  return (
    <div className="wrap">
      <div className="title">1950 Korea</div>
      <div className="subtitle">Guess Who?</div>
      <div className="image-wrapper">
        <img
          src={whiteProfile}
          className="main-image"
          alt="White Profile"
          onClick={handleWhiteProfileClick}
        />
        <div className="main-image-gap"></div>
        <img src={higginsProfile} className="main-image" alt="Higgins Profile" />
      </div>
      <footer>[HSS312] Darae Lee</footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/white" element={<DetailWhite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
