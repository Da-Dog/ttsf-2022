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
        <nav>
          <div className='navItem'><Link to="/">Home</Link></div>
          <div className='navItem'><Link to="/info">Info</Link></div>
          <div className='navItem'><Link to="/rule">Rule</Link></div>
          <div className='navItem'><Link to="/game">Game</Link></div>
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
