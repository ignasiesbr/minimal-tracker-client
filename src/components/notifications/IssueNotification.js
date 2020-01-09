import React from 'react'
import { connect } from 'react-redux';
import {deleteNotification, markAsRead} from '../../actions/notifications';
import {withRouter} from 'react-router-dom';

const IssueNotification = ({markAsRead, text, issue_id, id, deleteNotification, history, readed}) => {

    const handleClick = async () => {
        await deleteNotification(id);
    }
    const handleRedirection = () => {
        if(issue_id) {
            history.push(`/issue/${issue_id}`);
        }
    }

    const handleRead = () => {
        markAsRead(id);
    }
    

    return (
        <div className={`notification notification--info ${readed ? "notification--readed" : "notification--unreaded"}` }>
            <p className="text" onClick={handleRedirection}>{text}</p>
            <svg className="notification__close" onClick = {handleClick}>
                <use xlinkHref="/sprite.svg#icon-delete_outline"></use>
            </svg>
            <svg className="notification__close" onClick={handleRead}>
                <use xlinkHref="/sprite.svg#icon-assignment_turned_in"></use>
            </svg>
        </div>
    )
}

export default withRouter(connect(null, {deleteNotification, markAsRead})(IssueNotification))
