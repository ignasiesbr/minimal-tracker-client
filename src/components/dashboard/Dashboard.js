import React, {useEffect} from "react";
import TodoContainer from './TodoContainer';
import {loadProjects} from '../../actions/projects';

import SelectProject from "./SelectProject";
import ProjectContainer from "./ProjectContainer";
import IssuesContainer from "./IssuesContainer";
import { connect } from 'react-redux';


const Dashboard = ({loadProjects}) => {

  useEffect(() => {
    document.title = "Dashboard | Minimal Tracker";
    loadProjects();
  }, [loadProjects])

  return (
    <section className="dashboard">
      <div className="select-container">
        <SelectProject />
      </div>
      <div className="dashboard-container">
        <TodoContainer />
        <ProjectContainer />
        <IssuesContainer />
      </div>
    </section>
  );
};

export default connect(null, {loadProjects})(Dashboard);
