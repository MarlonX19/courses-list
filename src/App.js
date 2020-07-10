import React, { useEffect, useState } from 'react';

import api from './services/api';

import Home from './pages/home';
import './App.css';


function App() {

  useEffect(() => {
    api.get('/courses')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  })

  return (
    <Home />
  );
}

export default App;
