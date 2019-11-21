import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {loadProjects, addIssue} from '../../actions/projects';

function AddIssue({projects, loadProjects, addIssue}) {

  const [issueData, setIssue] = useState({
    type:"Bug",
    summary:"",
    description: "",
    project_id: ""  
  });
  
  const {type, summary, description, project_id} = issueData;
  
  const getOptions = projects => {
    return projects.map(project => <option key={project._id} value={project._id}> {project.title}</option>);
  }

  //Get the default project_id option, the first one
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

    
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
        addIssue(type, summary, description, project_id)
      }
      catch(err) {
        console.error('Something went wrong');
      }
    }
    addIssue(type, summary, description, project_id);
  }
  
  return (
    <div id="wrapper">
      <section className="add-issue">
        <form onSubmit={e => handleSubmit(e)}>
          <label>Project</label>
          <select value={project_id} name="project_id" onChange={e => handleChange(e)}>
            {getOptions(projects)}
          </select>
          <label>Issue Type</label>
          <select value={type} name="type" onChange={e => handleChange(e)}>
            <option value="Bug">Bug</option>
            <option value="Task">Task</option>
            <option value="New Feature">New Feature</option>
          </select>
          <hr />
          <label>Summary *</label>
          <input type="text" placeholder="Title of the issue" value={summary} name="summary" onChange={e => handleChange(e)} />
          <span id="separator"></span>
          <label>Description</label>
          <textarea  value={description} name="description" onChange={e => handleChange(e)}></textarea>
          <input type="submit" />
        </form>
      </section>
    </div>
  );
}
AddIssue.propTypes = {
  projects: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  projects : state.projects.projects
});

export default connect(mapStateToProps, {loadProjects, addIssue} )(AddIssue);
