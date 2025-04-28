import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Login from './pages/login';

import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {

  return (
    
    <BrowserRouter>

    <Routes>
      <Route path='/'element = {<Home />}></Route>
      <Route path='/signup'element = {<SignUp />}></Route>
      <Route path='/login'element = {<Login />}></Route>
    </Routes>

    </BrowserRouter>
  )
}

export default App
