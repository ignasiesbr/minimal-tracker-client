import Login from "../auth/Login";
import Register from "../auth/Register";
import About from "../layout/About";
import AddIssue from "../issues/AddIssue";
import UpdateProfile from "../profile/UpdateProfile";
import Dashboard from "../dashboard/Dashboard";
import { Route, Switch } from 'react-router-dom';

import React, {Fragment} from 'react'
import PrivateRoute from "./PrivateRoute";
import Alert from "../layout/Alert";

const Routes = () => {
    return (
        <Fragment>
            <Alert />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/about" component={About} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/add-issue" component={AddIssue} />
                <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
            </Switch>
        </Fragment>
    );
};


export default Routes
