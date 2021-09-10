import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/notes/NotesState';
import Login from './components/Login';
import Signup from './components/Signup';
// import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      {/* <Alert type={"success"} msg={"this is alert message"}/> */}
      <div className="container">
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
        </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
