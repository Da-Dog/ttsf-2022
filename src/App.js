import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Info from './pages/info';

function App() {
  
  return (
    <BrowserRouter><Routes>
      <Route path='/'>
        <Route index element={<Info />} /> {/** dev purposes, change to home later */}
        <Route path='info' element={<Info />} />
      </Route>
    </Routes></BrowserRouter>
  );
}

export default App;
