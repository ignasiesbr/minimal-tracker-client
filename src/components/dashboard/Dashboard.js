import React, {useEffect} from "react";
import TodoContainer from './todos/TodoContainer';
import {loadProjects} from '../../actions/projects';

import SelectProject from "./SelectProject";
import ProjectContainer from "./ProjectContainer";
import IssuesContainer from "./IssuesContainer";
import { connect } from 'react-redux';


const Dashboard = ({loadProjects}) => {

  useEffect(() => {
    loadProjects();
  }, [])

  return (
    <section className="dashboard">
      <SelectProject />
      <div className="dashboard-container">
        <TodoContainer />
        <ProjectContainer />
        <IssuesContainer />
      </div>
    </section>
  );
};

export default connect(null, {loadProjects})(Dashboard);
