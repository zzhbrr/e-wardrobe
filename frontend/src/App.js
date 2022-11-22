import './App.css';
import MainPage from './components/UserCenter/main_page';
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
