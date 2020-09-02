import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login'
import Index from './components/Index';
import AccountPage from './components/Account';
import Register from './components/Register';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <div className="App">
          <Route exact path='/login' component={Login} />
          <Route exact path='/account' component={AccountPage} />
          <Route exact path='/' component={Index} />
          <Route exact path='/register' component={Register} />
        </div>
      </Router>
  );
}

export default App;
