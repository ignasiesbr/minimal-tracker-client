import React, {useState} from 'react'

const DialogButton = ({children, buttonName}) => {

    const [isOpen, setOpen] = useState(false);

    const handleClick = e => {
        setOpen(!isOpen);
    }

    return (
        !isOpen ? (
            <div>
                <button className="btn2 u-margin-top-small" onClick={e => handleClick(e)}>{buttonName}</button>
            </div>) : 
        ( <div>
            <button className="btn2 u-margin-top-small" onClick={e => handleClick(e)}>{buttonName}</button>
            <div>
                {children}
            </div>
        </div>)
    )
}

export default DialogButton
