import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

const AdminRoute = ({auth, component: Component ,...rest}) => {
    return (
        <Route {...rest} render={props => !auth.isAuthenticated || !auth.user.isAdmin ? <Redirect to="/login" /> : (<Component {...props} />)} />
    );
};
AdminRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(AdminRoute)
