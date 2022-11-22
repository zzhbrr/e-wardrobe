import './App.css';
import MainPage from './components/UserCenter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"; 

function App() {
  return (
    <div className="App">
      <MainPage/>
    </div>
  );
}

export default App;
