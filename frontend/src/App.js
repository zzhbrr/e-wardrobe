import './App.css';
import UserCenter from './components/UserCenter/index';
import Login from './components/login/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={
        <div className="App">
          <Login />
        </div>
        } />
      <Route exact path="/usercenter" element={
        <div className="App">
          <UserCenter/>
        </div>
      }/>
      <Route exact path="/" element={<Navigate to="/usercenter"></Navigate>} />
      {/* <Router exact path="/wardorbe" element={}/> */}
      {/* <Router exact path="/diary" element={}/> */}
    </Routes>
  );
}

export default App;
