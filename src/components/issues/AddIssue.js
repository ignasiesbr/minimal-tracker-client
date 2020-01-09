import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {loadProjects, addIssue} from '../../actions/projects';

function AddIssue({projects, loadProjects,selected, addIssue}) {

  const [issueData, setIssue] = useState({
    type:"Bug",
    summary:"",
    description: "",
    project_id:selected
  });

  
  const {type, summary, description, project_id} = issueData;
  
  const getOptions = projects => {
    return projects.map(project => <option key={project._id} value={project._id}> {project.title}</option>);
  }

  //Get the default project_id option, the first one
  useEffect(() => {
    loadProjects();
  }, [projects, loadProjects]);

    
  const handleChange = e => {
    setIssue({
      ...issueData, [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (project_id === "") {
      try {
        setIssue({...issueData, project_id: projects[0]._id})
      }
      catch(err) {
        return console.error('Something went wrong');
      }
    }
    await addIssue(issueData);
   }
  
  return (
      <section className="add-issue-container">
        <form className="form2" onSubmit={e => handleSubmit(e)}>
          <label className="form2__label">Project</label>
          <select className="form2__select u-margin-bottom-small" value={project_id} name="project_id" onChange={e => handleChange(e)}>
            {getOptions(projects)}
          </select>
          <label className="form2__label">Issue Type</label>
          <select  className="form2__select u-margin-bottom-small" value={type} name="type" onChange={e => handleChange(e)}>
            <option value="Bug">Bug</option>
            <option value="Task">Task</option>
            <option value="New Feature">New Feature</option>
          </select>
          
          <label className="form2__label">Summary *</label>
          <input className="form2__input u-margin-bottom-small " type="text" placeholder="Title of the issue" value={summary} name="summary" onChange={e => handleChange(e)} />
          <span id="separator"></span>
          <label className="form2__label">Description</label>
          <textarea className="form2__textarea u-margin-bottom-small "  value={description} name="description" onChange={e => handleChange(e)}></textarea>
          <label className="form2__label">Deadline of the issue</label>
          <input className="form2__input u-margin-bottom-small " type="date" name="deadline" onChange={e => handleChange(e)}/>
          <input className="btn2 u-margin-bottom-medium " type="submit" />
        </form>
      </section>
  );
}
AddIssue.propTypes = {
  loadProjects: PropTypes.func.isRequired,
  addIssue: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  projects : state.projects.projects
});

export default connect(mapStateToProps, {loadProjects, addIssue} )(AddIssue);
