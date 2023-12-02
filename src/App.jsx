import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Registration from './components/Registration';
import GroupChat from './components/GroupChat';

function App() {
  let [email, setEmail] = useState("");
  let [memberList, setMemberList] = useState("");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login setEmail={(email)=>setEmail(email)} setMemberList={(list)=>setMemberList(list)} /> } />
          <Route path="/Profile" element={<Profile getEmail={()=>email} />} />
          <Route path="/Registration" element={<Registration getMemberList={()=>memberList} />} />
          <Route path="/GroupChat" element={<GroupChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
