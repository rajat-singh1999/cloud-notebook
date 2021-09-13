import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/notes/NotesState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {
  const [alert, setalert] = useState(null);

  const showAlert = (message, type)=>{
    setalert({msg: message, type: type})
    setTimeout(()=>{
      setalert(null);
    }, 3000);
  }

  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      {alert && <Alert type={alert.type} msg={alert.msg}/>}
      <div className="container">
        <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>
        </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
