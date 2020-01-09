import Login from "../auth/Login";
import Register from "../auth/Register";
import About from "../pages/About";
import AddIssue from "../issues/AddIssue";
import IssueOverview from "../issues/IssueOverview";
import UpdateProfile from "../profile/UpdateProfile";
import OverviewProfile from '../profile/OverviewProfile';
import Dashboard from "../dashboard/Dashboard";
import PersonalDiscussion from '../discussion/PersonalDiscussion';

import { Route, Switch } from 'react-router-dom';

import React, {Fragment} from 'react'
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UnloggedRoute from "./UnloggedRoute";
import Alert from "../layout/Alert";

import CreateProject from "../project/CreateProject";
import Gantt from "../gantt/Gantt";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Terms from "../pages/Terms";


const Routes = () => {
    return (
        <Fragment>
            <Alert />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/about" component={About} />
                <Route exact path="/terms" component={Terms} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/add-issue" component={AddIssue} />
                <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                <PrivateRoute exact path="/overview" component={OverviewProfile} />
                <PrivateRoute exact path="/gantt" component={Gantt} />
                <AdminRoute exact path="/create-project" component={CreateProject} />
                <PrivateRoute exact path="/discussion/:id" component={PersonalDiscussion} />
                <PrivateRoute exact path="/issue/:id" component={IssueOverview} />
                <UnloggedRoute exact path="/forgot" component={ForgotPassword} />
                <UnloggedRoute exact path="/reset/:token" component={ResetPassword} />
            </Switch>
        </Fragment>
    );
};


export default Routes
