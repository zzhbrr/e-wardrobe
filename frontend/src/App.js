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

const socket = io('ws://localhost:8000')

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={
        <div className="App">
          <Login socket={socket}/>
        </div>
        } />
      <Route exact path="/register" element={
        <div className="App">
          <Register socket={socket}/>
        </div>
        } />
      <Route exact path="/usercenter" element={
        <div className="App">
          <UserCenter socket={socket}/>
        </div>
      }/>
      <Route exact path="/" element={<Navigate to="/usercenter"></Navigate>} />
      {/* <Router exact path="/wardorbe" element={}/> */}
      {/* <Router exact path="/diary" element={}/> */}
    </Routes>
  );
}

export default App;
