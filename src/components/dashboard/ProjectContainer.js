import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const ProjectContainer = ({projects, auth}) => {


    const selectedProject = projects.selectedProject;

    return (
      projects.loading ? (<h1>Loading...</h1>) : 
        !selectedProject ? (
          <div>
            <h1 style={{fontSize: 10 + "px"}}>The current user is not a member of any project</h1>
          </div>
        ) : (
    
      (
        <div className="project-container">
          <h2 className="subtitle">
            {selectedProject.title};
          </h2>
          <h3 className="description" style={{fontStyle:"italic"}}>
            {selectedProject.description}
          </h3>
          <h4 className="creator">Project Manager: {selectedProject.creatorName} {auth.user.user_id === selectedProject.creatorId ? (<span>(you)</span>) : ""}  </h4>
          <ul className="members">
            Members: 
            {selectedProject.members.map(member => 
              (<li key={member._id}>
                <Link to="#" className="link" value={member._id}>
                  {member.name} {auth.user.user_id == member._id ? (<span>(you)</span>) : ""}
                </Link>
              </li>))}
          </ul>
        </div>
    )));
}
ProjectContainer.propTypes = {
    projects: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    projects: state.projects,
    auth: state.auth
})
export default connect(mapStateToProps, null)(ProjectContainer)
