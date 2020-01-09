import React from 'react'
import { connect } from 'react-redux';
import {deleteNotification, markAsRead} from '../../actions/notifications';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'

const DiscussionNotification = ({markAsRead, text, id, deleteNotification, history, discussionWith, readed}) => {

    const handleClick = async () => {
        await deleteNotification(id);
    }
    const handleRedirection = () => {
        history.push(`/discussion/${discussionWith}`);
    }

    const handleRead = () =>{
        markAsRead(id);
    }
    

    return (
        <div className={`notification notification--info ${readed ? "notification--readed" : "notification--unreaded"}` }>
            <p className="text" onClick={handleRedirection}>{text}</p>
            <svg className="notification__close" onClick = {handleClick}>
                <use xlinkHref="/sprite.svg#icon-delete_outline"></use>
            </svg>
            <svg className="notification__close" onClick={ () => handleRead()}>
                <use xlinkHref="/sprite.svg#icon-assignment_turned_in"></use>
            </svg>
        </div>
    )
}
DiscussionNotification.propTypes = {
    deleteNotification: PropTypes.func.isRequired,
}

export default withRouter(connect(null, {markAsRead, deleteNotification})(DiscussionNotification))
