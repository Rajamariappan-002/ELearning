import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
};

export default App;