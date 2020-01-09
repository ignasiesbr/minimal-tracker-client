import React, {useState} from 'react';
import axios from 'axios';

const GanttIssue = ({projectId, gridValue, id}) => {
    const [isOpen, setOpen] = useState(false);
    const [info, setInfo] = useState({
        summary:"",
        description: "",
        status:"",
        created: "",
        deadline:"",
        messages:[],
        type:"",
        loaded:false
    });

    const handleClick = async e => {
        if (!info.loaded) {
            const res = await axios.get(`/api/project/issue/${projectId}/${id}`);
            setInfo({summary: res.data.summary,
                description: res.data.description,
                type: res.data.type,
                status:res.data.status,
                messages: res.data.messages.map(msg => {
                    return {text:msg.text, autor:msg.name}
                }),
                created: res.data.creationDate.split("T")[0],
                deadline: res.data.deadline.split("T")[0],
                loaded: true
            });
            console.log(info.messages)
        }
            setOpen(!isOpen);
    }

    return (
        <div className="gantt-issue">
            <span className="gantt-item"
                style={{backgroundColor: gridValue ? 
                gridValue === 'BUG' ? 'coral' : gridValue ==='NEW' ? 'hotpink' : 'limegreen': undefined}}
                onClick={e => handleClick(e)}>
            </span>
            {isOpen ? 
                <div className="gantt-popup">
                <span className="gantt-popup__close" onClick={() => setOpen(false)}>X</span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-title"></use>
                        </svg>
                        {info.summary}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-ballot"></use>
                        </svg>
                        {info.description}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-code"></use>
                        </svg>
                        {info.type}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-date_range"></use>
                        </svg>
                        {info.created}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-date_range"></use>
                        </svg>
                        {info.deadline}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-assignment_turned_in"></use>
                        </svg>
                        {info.status}
                    </span>
                    <div className="messages-dropdown">
                        <span className="gantt-popup__info messages-dropdown-title">
                            <svg className="gantt-popup__icon">
                                <use xlinkHref="/sprite.svg#icon-message"></use>
                            </svg>
                            Messages
                        </span>
                            <ul className="messages-list">
                                {info.messages.length === 0 ? <li>There are no messages in the issue</li> : 
                                    info.messages.map((msg,idx) => <li key={idx} className="messages-list__item">{msg.autor} said {msg.text}</li>)}
                            </ul>
                        </div>
                </div>
            : "" }
        </div>
    )
}

export default GanttIssue
