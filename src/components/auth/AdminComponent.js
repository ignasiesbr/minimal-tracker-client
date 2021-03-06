import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { loadUser } from '../../actions/auth';
import Spinner from '../layout/Spinner';

const AdminComponent = ({auth, children, loadUser}) => {

    const fetchUser = async () => {
        await loadUser();
    }

    useEffect(() => {
        fetchUser();
    }, [])

    // Checks if it's loading, and then if the user is an Admin to render the children.
    return (
        auth.loading ? <Spinner/> : (
            (auth.user && auth.user.isAdmin) ? 
            <div>
                {children} 
            </div>
            : <span></span>
        )
    )
}
AdminComponent.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {loadUser})(AdminComponent);
