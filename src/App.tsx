import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ListPage from './pages/List/ListPage';

function App() {
  const [isLoggedIn] = useState(true);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/list" component={ListPage} />
          <Route exact path="/">
            <>
              {!isLoggedIn && <Redirect to={"/login"} />}
            </>
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
