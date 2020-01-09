import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {changeSelectedProject} from '../../actions/projects';
import AdminComponent from '../auth/AdminComponent';
import RedirectButton from '../layout/RedirectButton';
import Spinner from '../layout/Spinner';

const SelectProject = ({projects, changeSelectedProject}) => {

    const projectOptions = projects.projects.map(project => {
      return (
        <option className="select-project__option" key={project._id} value={project._id}>{project.title}</option>
      )
    });
    
  
      const handleChange = e => {
        changeSelectedProject(e.target.value);
      }

    return projects.isLoading ? <Spinner/> : (
    (
      <div className="select-project-container">
        <select className="select-project" onChange={e => handleChange(e)} defaultValue={projects.selectedProject ? projects.selectedProject._id : null}>
          {projectOptions}
        </select>
        <AdminComponent children={<RedirectButton url={'/create-project'} name={'Create project'} />} />
        <RedirectButton url={'/gantt'} name={'Go to GANTT'} />
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