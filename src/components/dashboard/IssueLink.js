import React from 'react'
import {Link} from 'react-router-dom';

const IssueLink = ({issue}) => {
    console.log(issue.status);
    return ( 
        <div className="issue-list__link-box"> 
            <Link className="issue-list__link" to={`/issue/${issue._id}`}>{issue.summary}</Link>
            <span className={`issue-list__status issue-list__status--${issue.status}`}></span>
            <span>{issue.deadline.split("T")[0]}</span>
        </div>
    )
}

export default IssueLink;
