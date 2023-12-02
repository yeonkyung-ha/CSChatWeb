import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Registration from './components/Registration';
import GroupChat from './components/GroupChat';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/GroupChat" element={<GroupChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
