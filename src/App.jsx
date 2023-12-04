import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Registration from './components/Registration';
import GroupChat from './components/GroupChat';

function App() {
  let [email, setEmail] = useState("");
  let [memberList, setMemberList] = useState("");
  let [profileImage, setProfileImage] = useState("");
  let [message, setMessage] = useState("Hello");
  let [profileName, setProfileName] = useState('');

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login setEmail={(email)=>setEmail(email)} setMemberList={(list)=>setMemberList(list)} /> } />
          <Route path="/Profile" element={<Profile getEmail={()=>email} profileImage={profileImage} setProfileImage={setProfileImage} message={message} setMessage={setMessage}/>} />
          <Route path="/Registration" element={<Registration getMemberList={()=>memberList} />} />
          <Route path="/group-chat/:course" element={<GroupChat />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
