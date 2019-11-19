import Login from "../auth/Login";
import Register from "../auth/Register";
import About from "../layout/About";
import AddIssue from "../issues/AddIssue";
import UpdateProfile from "../profile/UpdateProfile";
import Dashboard from "../dashboard/Dashboard";
import { Route, Switch } from 'react-router-dom';

import React from 'react'
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/add-issue" component={AddIssue} />
        </Switch>
    )
}

export default Routes
