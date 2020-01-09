import React, {useState} from 'react'
import MemberOverview from './MemberOverview';
import {withRouter} from 'react-router-dom';
const MemberLink = ({isSelf, name, id, history}) => {

    const [isOpen, setOpen] = useState(false);

    const handleClick = e => {
        setOpen(!isOpen);
    }

    const handleMessage = () => {
        history.push(`/discussion/${id}`);
    }

    return (
        <div className="member">
            <div className="member__item">
                <p className="text member__name">
                    {name} {isSelf ? <span style={{fontStyle:"italic"}}>(you)</span> : ""}
                </p>
                {isSelf ? "" : <>
                <svg className="member__message" onClick={handleMessage}>
                    <use xlinkHref="/sprite.svg#icon-message"></use>
                </svg>
                <svg onClick={e => handleClick(e)} className="member__info">
                    <use xlinkHref="/sprite.svg#icon-badge"></use>
                </svg> </>}
            </div>
            {isOpen ? (
                <div className="member-overview-container">
                    {isSelf ? <div></div> : <MemberOverview handleClose={handleClick} id={id}/>}
                </div>
            ) : "" }
        </div>
    )
}

export default withRouter(MemberLink);
