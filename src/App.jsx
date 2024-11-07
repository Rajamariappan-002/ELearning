import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login.jsx';
import Signup from './Pages/Signup/Signup.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';


const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path = '/register' element={<Signup/>}/>
    </Routes>
  );
};

export default App;