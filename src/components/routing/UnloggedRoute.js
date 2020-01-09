import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

const UnloggedRoute = ({component: Component, isAuthenticated, ...rest}) => {
    console.log(isAuthenticated);
    return (
        <Route {...rest} render={props => isAuthenticated ? (<Redirect to="/dashboard" />) : (<Component {...props} />)} />
    );
};
UnloggedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, null)(UnloggedRoute)
