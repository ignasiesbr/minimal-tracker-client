import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import MemberLink from './MemberLink';
import AdminComponent from '../auth/AdminComponent';
import AddMember from '../project/AddMember';
import Spinner from '../layout/Spinner';
import ConfirmationLink from '../layout/ConfirmationLink';
import { removeProject } from '../../actions/projects';

const ProjectContainer = ({projects, auth, removeProject}) => {
    
    const selectedProject = projects.selectedProject;

    return (
      projects.loading ? (<Spinner/>) : 
        !selectedProject ? (
          <div>
            <h1 style={{fontSize: 10 + "px"}}>The current user is not a member of any project</h1>
          </div>
        ) : (
    
      (
        <div className="project-container">
          <h2 className="heading-secondary u-margin-bottom-small u-border-bottom-medium">
            {selectedProject.title}
          </h2>
          <h3 className="heading-tertiary u-margin-bottom-tiny">
            Description of the project:
          </h3>
          <p className="text u-margin-bottom-small">
            {selectedProject.description} <br></br><br></br>
            Start: {selectedProject.start.split("T")[0]} <br></br><br></br>
            End: {selectedProject.end.split("T")[0]}
          </p>
          <h3 className="heading-tertiary u-margin-bottom-tiny">Project Manager: {selectedProject.creatorName} {auth.user._id === selectedProject.creatorId ? (<span>(you)</span>) : ""}  </h3>
          <h3 className="heading-tertiary u-margin-bottom-tiny u-border-bottom-small">Members:</h3> 
          <ul className="members">
            {selectedProject.members.map(member => (
              <MemberLink key={member._id} isSelf={auth.user._id === member.user} id={member.user} name={member.name} />
            ))}
          </ul>
          <AdminComponent children={<h3 className="heading-tertiary u-margin-bottom-tiny u-border-bottom-small">Add a member to the project</h3>} />
          <AdminComponent children={<AddMember />} />
          {/* <AdminComponent children={<button className="btn" onClick={() => removeProject(selectedProject._id)}>Delete</button>} /> */}
          <AdminComponent children={<ConfirmationLink args={[selectedProject._id]} action={removeProject} buttonName="DELETE PROJECT" route={"/dashboard"} />} />

        </div>
    )));
}
ProjectContainer.propTypes = {
    projects: PropTypes.object.isRequired,
    removeProject: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    projects: state.projects,
    auth: state.auth
})
export default connect(mapStateToProps, {removeProject})(ProjectContainer)
