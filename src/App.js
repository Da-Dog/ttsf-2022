import logo from './logo.svg';
import GameCanvas from './components/GameCanvas';
import { useEffect, useState } from 'react';
import './App.css'


function App() {
  return (
    <>
      <header>
        <h1>Save the Land</h1>
      </header>
      <GameCanvas /> 

     
    </>
  );
}

export default App;
