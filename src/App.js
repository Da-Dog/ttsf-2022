import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import GameCanvas from './components/GameCanvas';
import InfoPage from './components/InfoPage';
import HomePage from './components/HomePage'
import RulePage from './components/RulePage';


function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className='navbar'>
          <Link to="/">Home</Link>
          <Link to="/info">Info</Link>
          <Link to="/game">Game</Link>
          <Link to="/rule">Rule</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/info' element={<InfoPage/>}/>
        <Route path='/game' element={<GameCanvas/>} />
        <Route path='/rule' element={<RulePage/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
