import React from "react";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <h1 className="title">[Project Name] DROPDOWN ▼</h1>
      <div className="dashboard-container">
        <div className="todo-container">
          <h2 className="subtitle">Personal Tasks</h2>
          <ul className="todos">
            <li className="todo-item">Do the laundry</li>
            <li className="todo-item">Homework</li>
            <li className="todo-item">Listen the new album!</li>
            <li className="todo-item">Smoke pot!</li>
          </ul>
          <div className="active-filter">
            <ul className="filter">
              <li className="filter-item">All</li>
              <li className="filter-item">Completed</li>
              <li className="filter-item">Active</li>
            </ul>
          </div>
        </div>

        <div className="project-container">
          <h2 className="subtitle">[Project name]</h2>
          <ul className="members">
            <li>
              <a className="link" href="#">
                Member number 1
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Member number 2
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Member number 3
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Member number 4
              </a>
            </li>
          </ul>
        </div>

        <div className="project-issues-container">
          <h2 className="subtitle">Issues</h2>
          <ul className="project-issues">
            <li className="issue-item">
              <a className="link" href="#">
                Issue n1
              </a>
            </li>
            <li className="issue-item">
              <a className="link" href="#">
                Issue n2
              </a>
            </li>
            <li className="issue-item">
              <a className="link" href="#">
                Issue n3
              </a>
            </li>
            <li className="issue-item">
              <a className="link" href="#">
                Issue n4
              </a>
            </li>
            <li className="issue-item">
              <a className="link" href="#">
                Issue n5
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
