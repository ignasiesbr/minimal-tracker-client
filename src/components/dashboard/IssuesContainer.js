import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import AddIssue from '../issues/AddIssue';
import DialogButton from '../layout/DialogButton';


const IssuesContainer = ({projects, loading}) => {

  
  const selectedProject = projects.selectedProject;
  
  const generateIssueItems = issues => {
    if (!issues) {
      return null;
    }
    return issues.map(issue => 
      (<li className="issue-item" key={issue._id} >
        <Link className="link" to="#">
          {issue.summary}
        </Link>
      </li>))
  }

    return (
      loading ? (<h1>Loading . . .</h1>) : 
      !selectedProject ? (<h1>No project selected</h1>) :
        <div className="project-issues-container">
          <h2 className="subtitle">Issues</h2>
          <ul className="project-issues">
            {generateIssueItems(selectedProject.issues)}
          </ul>
          <DialogButton children={<AddIssue selected={selectedProject._id} />} buttonName={<span>Add Issue</span>} />
        </div>
    )
}
IssuesContainer.propTypes = {
  projects: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  projects: state.projects,
  loading: state.projects.loading,
});

export default connect(mapStateToProps, null)(IssuesContainer)
