import React from 'react'
import {withRouter} from 'react-router-dom';

const RedirectButton = ({history, url, name}) => {

    const handleClick = () => {
        history.push(url);
    }

    return (
        <div>
            <button className="btn u-margin-bottom-medium"onClick={handleClick}>
                {name}
            </button>
        </div>
    )
}

export default withRouter(RedirectButton)
