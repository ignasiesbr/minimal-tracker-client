import React from 'react'
import { connect } from 'react-redux';
import {addUserToProject} from '../../actions/projects';
import {deleteNotification, markAsRead} from '../../actions/notifications';

//Notification to accept the invitation to a project
const InvitationNotification = ({markAsRead, readed, id, text, project, addUserToProject, deleteNotification}) => {

    const handleDelete = async e => {
        await deleteNotification(id);
    }

    const handleOk = async (e) => {
        await addUserToProject(project);
        await deleteNotification(id);
    };

    const handleRead =() => {
        markAsRead(id);
    }

    return (
        <div  className={`notification ${readed ? "notification--readed" : "notification--unreaded"}` }>
            <p className="text">
                {text}
            </p>
            <button className="notification__button"
                onClick={e => handleOk(e)}><span role="img" aria-label="ok">✅</span></button>
            <button  className="notification__button" onClick={e => handleDelete(e)}><span role="img" aria-label="no-ok">❌</span></button>
            <svg className="notification__close" onClick={handleRead}>
                <use xlinkHref="/sprite.svg#icon-assignment_turned_in"></use>
            </svg>
        </div>
    );
};

export default connect(null, {addUserToProject,markAsRead ,deleteNotification} )(InvitationNotification);