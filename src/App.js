import React, {Fragment,useEffect} from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from './components/layout/Footer';
import Landing from "./components/pages/Landing";
import Routes from './components/routing/Routes';
import {loadProjects} from './actions/projects';
import {loadUser} from './actions/auth';
import store from './store';
import setAuthToken from './utils/setAuthToken'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadProfile } from "./actions/profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(() => {
    store.dispatch(loadProjects());
    store.dispatch(loadUser());
    store.dispatch(loadProfile());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route component={Routes}/>
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}


export default App;
