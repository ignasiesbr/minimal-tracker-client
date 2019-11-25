import React, {useState} from 'react'

const DialogButton = ({children, buttonName}) => {

    const [isOpen, setOpen] = useState(false);

    const handleClick = e => {
        setOpen(!isOpen);
    }

    return (
        !isOpen ? (
            <div>
                <button onClick={e => handleClick(e)}>{buttonName}</button>
            </div>) : 
        ( <div>
            <button onClick={e => handleClick(e)}>{buttonName}</button>
            <div>
                {children}
            </div>
        </div>)
    )
}

export default DialogButton
