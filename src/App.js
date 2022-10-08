import logo from './logo.svg';
import GameCanvas from './components/GameCanvas';
import { useEffect, useState } from 'react';
import './App.css'


function App() {

  const [temperature, setTemp] = useState(0)
  const [timer, setTime] = useState(0)
  const [speed, setSpeed] = useState(1)
  
  useEffect(()=> {
   let time =0
   let myTimer = setInterval(()=> {
      time += 0.1 * speed
      setTime(Math.round(time * 100)/100)

      setTemp(temperature < 120 ? Math.floor(time/20) + 75 : 120)
    }, 100)

    return function clearTime() {
      clearInterval(myTimer)
    }

  },[])



  return (
    <>
      <header>
        <h1>Save the Land</h1>
      </header>
      <div className="container">
        <GameCanvas temperature={temperature} timer={timer} /> 
      </div>
      <div className='info'>
        <h2>Time: {timer}</h2>
        <h2>Temperature: {temperature}</h2>
      </div>
    </>
  );
}

export default App;
