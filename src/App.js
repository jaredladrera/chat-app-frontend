/* eslint-disable no-restricted-globals */
import './App.css';
// import Chat from './Chat';
import Room from './Room';
import Login from './Login';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/room' element={<Room />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
