import React, {Fragment,useEffect} from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from './components/routing/Routes';
import Login from './components/auth/Login';

import store from './store';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
