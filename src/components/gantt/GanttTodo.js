import React, {useState} from 'react'
import axios from 'axios';

const GanttTodo = ({gridValue, id}) => {
    const [isOpen, setOpen] = useState(false);
    const [info, setInfo] = useState({
        from: "",
        deadline:"",
        status:"",
        text:"",
        loaded:false
    });

    const handleClick = async e => {
        if (!info.loaded) {
            const id = e.target.getAttribute('value');
            const res = await axios.get(`/api/todos/${id}`);
            setInfo({from: res.data.createdAt.split("T")[0],
                deadline:res.data.deadline.split("T")[0],
                status:res.data.status,
                text: res.data.text,
                loaded: true
            })
        }
        setOpen(!isOpen);
    }
    

    return (
        <div className="gantt-todo">
            <span style={{backgroundColor: gridValue === 1 ? 
                'mediumspringgreen' : gridValue === 2 ? 'crimson' : undefined}} 
                value={id}  
                onClick={e => handleClick(e)} 
                className="gantt-item">
            </span> 
            {isOpen ? 
                <div className="gantt-popup">
                    <span className="gantt-popup__close" onClick={() => setOpen(false)}>X</span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-title"></use>
                        </svg>
                        {info.text}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-assignment_turned_in"></use>
                        </svg>
                        {info.status}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-date_range"></use>
                        </svg>
                        {info.from}
                    </span>
                    <span className="gantt-popup__info">
                        <svg className="gantt-popup__icon">
                            <use xlinkHref="/sprite.svg#icon-date_range"></use>
                        </svg>
                        {info.deadline}
                    </span>
                </div>
                : "" }
        </div>
    )
}

export default GanttTodo;
