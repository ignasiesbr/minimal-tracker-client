import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import InvitationNotification from './InvitationNotification';
import IssueNotification from './IssueNotification';
import DiscussionNotification from './DiscussionNotification';

// Separarem notifications per un tipus intern, informatives i d'acceptar. Depenen de com siguin retornaran un component o un altre.
// Les que siguin d'acceptar han de poder tirar una accio que faci p.ex que el que li arriba la notificació entri en un projecte,
// les altres han de tenir un boto per marcar com a leidas. ON PROGRESS
const Notification = ({notifications}) => {
    return (
        <div>
            {notifications !== null && notifications.length > 0 && notifications.map(notification => {
                if (notification.type === "ISSUE") {
                    return <IssueNotification readed={notification.readed} key={notification._id} text={notification.text} id={notification._id} issue_id={notification.issue} />
                }
                else if (notification.type === "ADD_TO_PROJECT") {
                    return <InvitationNotification readed={notification.readed} key={notification._id} id={notification._id} text={notification.text} project={notification.project} />
                }
                else if (notification.type === "CHAT") {
                    return <DiscussionNotification readed={notification.readed} key={notification._id} id={notification._id} text={notification.text} discussionWith={notification.discussionWith} />
                }
                else {
                    return ""
                }
            })}
        </div>
    );
};
Notification.propTypes = {
    notifications: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
    notifications: state.auth.user.notifications
});
export default connect(mapStateToProps, null)(Notification)