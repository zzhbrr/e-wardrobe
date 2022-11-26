import './App.css';
import UserCenter from './components/UserCenter/index';
import Login from './components/login/login';
import Register from './components/register/register';
import io from 'socket.io-client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import React from 'react';

const socket = io('ws://localhost:8000')

// var userName = "", isLogin = false;

function App() {
  localStorage.clear();
  const [isLogin, setIsLogIn] = React.useState(false);
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'));
  const [UserID, setUserID] = React.useState(localStorage.getItem('UserID'));

  function handleLogin(username, uid) {
    setUserName(username);
    // console.log('userName set to ', username);
    // alert('userName set to ', username);
    setIsLogIn(true);
    // userName = username;
    // isLogin = true;
    setUserID(uid);
  }

  // React.useEffect(()=>{
  //   console.log('!!userName: ', userName)
  //   console.log('!!isLogin: ', isLogin);
  // }, )

      
  return (
    <Routes>
      <Route exact path="/login" element={
        userName === null ? 
        <div className="App">
          <Login socket={socket} handleLogin={handleLogin}/>
        </div> : <Navigate to="/usercenter" />
        } /> 
      <Route exact path="/register" element={
        <div className="App">
          <Register socket={socket}/>
        </div>
        } />
      <Route exact path="/usercenter" element={
        <div className="App">
          <UserCenter socket={socket} isLogin={isLogin} userName={userName}/>
        </div>
      }/>
      <Route exact path="/" element={<Navigate to="/usercenter"></Navigate>} />
      {/* <Router exact path="/wardorbe" element={}/> */}
      {/* <Router exact path="/diary" element={}/> */}
    </Routes>
  );
}

export default App;
