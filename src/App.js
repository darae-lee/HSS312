import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import whiteProfile from './images/white/white_profile.png';
import bischofProfile from './images/bischof/profile.jpg';
import DetailWhite from './white.js'
import DetailBischof from './bischof.js'


const Home = () => {
  const navigate = useNavigate();

  const handleWhiteProfileClick = () => {
    navigate('/detail/white');
  };
  const handleBischofProfileClick = () => {
    navigate('/detail/bischof');
  };

  return (
    <div className="wrap">
      <div className="title">Korean War</div>
      <div className="subtitle">Photo Journalist</div>
      <div className="image-wrapper">
        <img
          src={whiteProfile}
          className="main-image"
          alt="White Profile"
          onClick={handleWhiteProfileClick}
        />
        <div className="main-image-gap"></div>
        <img
          src={bischofProfile}
          className="main-image"
          alt="Bischof Profile"
          onClick={handleBischofProfileClick}
        />
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
          <Route path="/detail/bischof" element={<DetailBischof />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
