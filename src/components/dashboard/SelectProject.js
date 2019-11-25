import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {changeSelectedProject} from '../../actions/projects';
import AdminComponent from '../auth/AdminComponent';

const SelectProject = ({projects, changeSelectedProject}) => {

    const projectOptions = projects.projects.map(project => (
        <option key={project._id} value={project._id}>{project.title}</option>
      ));
  
      const handleChange = e => {
        changeSelectedProject(e.target.value);
      }

    return projects.isLoading ? <h1>Loading . . . </h1> : (
    (
      <div>
        <select onChange={e => handleChange(e)}>
          {projectOptions}
        </select>
        <AdminComponent children={<h2>Create project</h2>} />
      </div>

    ) )
}
SelectProject.propTypes = {
    projects: PropTypes.object.isRequired,
    changeSelectedProject: PropTypes.func.isRequired,
  }

const mapStateToProps = state => ({
  projects:state.projects,
});
export default connect(mapStateToProps,{changeSelectedProject})(SelectProject);