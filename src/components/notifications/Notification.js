import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import InfoNotification from './InfoNotification';
import ActionNotification from './ActionNotification';

// Separarem notifications per un tipus intern, informatives i d'acceptar. Depenen de com siguin retornaran un component o un altre.
// Les que siguin d'acceptar han de poder tirar una accio que faci p.ex que el que li arriba la notificació entri en un projecte,
// les altres han de tenir un boto per marcar com a leidas. ON PROGRESS
const Notification = ({notifications}) => {
    return (
        notifications !== null && notifications.length > 0 && notifications.map(notification => {
            if (notification.type === "INFORMATIVE") {
                return <InfoNotification key={notification.id} />
            }
            else if (notification.type === "ACTION") {
                return <ActionNotification key={notification.id} text={notification.text} />
            }
        })
    );
};
Notification.propTypes = {
    notifications: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
    notifications: state.auth.user.notifications
});
export default connect(mapStateToProps, null)(Notification)