import './App.css';
import UserCenter from './components/UserCenter/index';
import Login from './components/login/login';
import Register from './components/register/register';
import OutfitDetail from './components/Outfit/Outfit';
import ArticleDetail from './components/article/article';
import ClothDetail from './components/Cloth/Cloth';
import io from 'socket.io-client'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Navigate
} from "react-router-dom";
import React from 'react';
import GroupDetail from './components/GroupDetail';
import Group from './components/Group';

const socket = io('ws://localhost:8000')

// var userName = "", isLogin = false;

function App() {
    // localStorage.clear();
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
    function handleLogout() {
        setIsLogIn(false);
    }
    return (
        <Routes>
        <Route exact path="/login" element={
            !isLogin ? 
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
            <UserCenter socket={socket} isLogin={isLogin} userName={userName} handleLogout={handleLogout} />
            </div>
        }/>
        <Route exact path='/group' element={
            <div className='App'>
                <Group uid={UserID} socket={socket} isLogin={isLogin}/>
            </div>
        }>
        </Route>
        <Route exact path="/group/:gid/:uid" element={
            <div className="App">
            <GroupDetail gid={0} uid={0} socket={socket} isLogin={isLogin}/>
            </div>
        }/>
        <Route exact path="/outfit/:oid" element={
            <div className="App">
                <OutfitDetail oid={0} uid={0} userName={userName} socket={socket}/>
            </div>
        }/>
        <Route exact path="/article/:eid/:uid" element={
            <div className="App">
                <ArticleDetail eid={0} uid={0} socket={socket}/>
            </div>
        }/>
        <Route exact path="/cloth/:pid/:uid" element={
            <div className="App">
                <ClothDetail pid={0} uid={0} handleDeleteClothes={0} socket={socket} userName={userName}/>
            </div>
        }/>
        <Route exact path="/" element={<Navigate to="/usercenter"></Navigate>} />
        {/* <Router exact path="/wardorbe" element={}/> */}
        {/* <Router exact path="/diary" element={}/> */}
        </Routes>
    );
}

export default App;
