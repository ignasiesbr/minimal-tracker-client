import React, {useEffect} from 'react'
import Notification from '../notifications/Notification';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { loadProfile } from '../../actions/profile';
import RedirectButton from '../layout/RedirectButton';
import {logout, deleteUser} from '../../actions/auth';
import Spinner from '../layout/Spinner';
import ConfirmationLink from '../layout/ConfirmationLink';

const OverviewProfile = ({deleteUser, profile, user, loadProfile, logout}) => {

    useEffect(() => {
        document.title = "Profile | Minimal Tracker";
        loadProfile();
    }, []);

    return (profile.loading || user.loading ? <Spinner/> : (
        <>
        <h1 className="heading-primary u-margin-bottom-medium u-center-text">Profile</h1>
        <div className="profile">
            <div className="profile__info">
                <h2 className="heading-secondary u-margin-bottom-small u-border-bottom-medium">Profile info</h2>
                <img className="profile__avatar" src={user.avatar} style={{width:'54px', height:'54px'}} alt="user-avatar" />
                <h3 className="heading-tertiary">
                    Name    
                </h3>
                <p className="text u-margin-bottom-small u-border-bottom-small">
                    {user.name}
                </p>
                <h3 className="heading-tertiary">Email</h3>
                <p className="text u-margin-bottom-small u-border-bottom-small">
                    {user.email}
                </p>
                <h3 className="heading-tertiary">Role</h3>
                <p className="text u-margin-bottom-small u-border-bottom-small">{profile.profile.role}</p>
                <h3 className="heading-tertiary">Bio</h3>
                <p className="text u-margin-bottom-small u-border-bottom-small">{profile.profile.bio}</p>
                <h3 className="heading-tertiary">Location</h3>
                <p className="text u-margin-bottom-small">{profile.profile.location}</p>
            </div>
            <div className="notifications">
                <h2 className="heading-secondary u-margin-bottom-small u-border-bottom-medium">Notifications</h2>
                <Notification />
            </div>
            <div className="profile__buttons">
                <RedirectButton name={"Update Profile"} url={'/update-profile'} />
                <button className="btn" onClick={logout}>
                    Logout
                </button>
                <ConfirmationLink action={deleteUser} buttonName="Delete User" route="/" args={[]}></ConfirmationLink>
            </div>
        </div>
        </>
    )
    )
}
OverviewProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    user: state.auth.user
})

export default connect(mapStateToProps, {loadProfile,  deleteUser,  logout})(OverviewProfile);