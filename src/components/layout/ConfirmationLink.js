import React, { useState } from 'react'
import {Link} from 'react-router-dom';

const ConfirmationLink = ({args, action, buttonName, route}) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="confirmation-container">
            <button className="btn2 u-margin-top-small" onClick={() => setOpen(!open)}>{buttonName}</button>
            {!open ?  ""  :  
            <div className="confirmation-dialog">
                <p className="confirmation-dialog__text">Are you sure?</p>
                <div className="confirmation-dialog__buttons">
                    <Link to={route} className="confirmation-dialog__item btn-dialog btn-dialog--yes" onClick={() => {
                        action(...args);
                        setOpen(false);
                    }}>YES</Link>
                    <button className="confirmation-dialog__item btn-dialog btn-dialog--no" onClick={() => setOpen(false)}>NO</button>
                </div>
            </div> }
        </div> 
    )
}

export default ConfirmationLink;
