// src/App.js

import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleInputSubmit = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="app-container">
      <Header onInputSubmit={handleInputSubmit} />
      <Content searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}

export default App;
