import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Login from './Login'
import CreateUser from './CreateUser'
import Authenticated from './Authenticated'

function App() {
    const [{ user }, dispatch] = useStateValue(); 

    useEffect(() => {
      auth.onAuthStateChanged(authUser => {
        console.log('User is', authUser);
  
        if (authUser) {
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        } else {
          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
      })
    }, []);
  
  return (
        <div className='app'>
          <Router>
            <Route exact path='/'><Login /></Route>
            <Route exact path='/createUser'><CreateUser /></Route>
            <Route exact path='/authenticated'><Authenticated /></Route>
          </Router>

        </div>

  );
}
export default App;
