import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import AddIssue from '../issues/AddIssue';
import DialogButton from '../layout/DialogButton';
import IssueLink from './IssueLink';
import Spinner from '../layout/Spinner';


const IssuesContainer = ({projects, loading}) => {

  
  const selectedProject = projects.selectedProject;
  
  const generateIssueItems = issues => {
    if (!issues) {
      return null;
    }
    return issues.map(issue => {
      return (
        <li className="issue-list__item" key={issue._id}>
          <IssueLink issue={issue}/>
        </li>
      ) 
    });
  };

    return (
      loading ? (<Spinner/>) : 
      !selectedProject ? (<h1>No project selected</h1>) :
        <div className="issues-container">
          <h2 className="heading-secondary u-margin-bottom-small u-border-bottom-medium">Issues</h2>
          <ul className="issue-list">
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
