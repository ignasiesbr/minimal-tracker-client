import React from 'react';

const generateMessages = messages => {
    let prev_name;
    const msgs = messages.map((msg, idx) => {
        if (idx > 0) {
            prev_name = messages[idx - 1].name;
        };
        return <li className="discussion-list__item" key={msg._id}>
                    <div className="discussion-list__sender-box">
                        {msg.name === prev_name ? <div></div> : <img className="discussion-list__avatar" src={msg.avatar}alt="avatar-user"/>}
                        <span className="discussion-list__remitent">
                            {msg.name === prev_name ? "" : msg.name + " said..."} 
                        </span>
                    </div>
                    <span className="discussion-list__text">
                        {msg.text}
                    </span>
                </li>
    });
    return msgs;
}

export default generateMessages;