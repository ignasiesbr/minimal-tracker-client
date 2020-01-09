import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import TodoGrid from './TodoGrid';
import IssuesGrid from './IssuesGrid';
import GanttHeader from './GanttHeader';
import { getDays, getFirstDayOfMonth,getLastDayOfMonth } from './helpers';

const Gantt = ({selectedProject, todos}) => {

    const projectId = selectedProject ? selectedProject._id : undefined;
    const issues = selectedProject ? selectedProject.issues : undefined;
    const timedTodos = todos.todos.filter(todo => todo.deadline);


    const start = selectedProject ? selectedProject.start : undefined;
    const end  = selectedProject ? selectedProject.end : undefined;
    const daysStart = selectedProject ? getFirstDayOfMonth(getDays(new Date(start))) + 1 : undefined;
    const daysEnd = selectedProject ? getLastDayOfMonth(getDays(new Date(end))) : undefined;
    
    useEffect(() => {
        document.title = "Gantt | Minimal Tracker";
    }, []);

    return (
        !selectedProject ? <h1>No project selected</h1> : (
        <div className="gantt-container">
            <h1 className="heading-primary u-margin-bottom-medium u-center-text">GANTT</h1>
            <div className="gantt-header-container">
                <GanttHeader start={daysStart} end={daysEnd}/>
            </div>
            <div className="gantt-grid-container">
                <TodoGrid start={daysStart} end={daysEnd} timedTodos={timedTodos}/>
            </div>
            <div className="gantt-grid-container">
                <IssuesGrid start={daysStart} end={daysEnd} issues={issues} projectId={projectId}/>
            </div>
            <div className="gantt-legend">
                <div className="legend__item">
                    <span className="legend__color legend__color--feature"></span>
                    <span className="legend__ref">New Feature</span>
                </div>
                <div className="legend__item">
                    <span className="legend__color legend__color--bug"></span>
                    <span className="legend__ref">Bug</span>
                </div>
                <div className="legend__item">
                    <span className="legend__color legend__color--task"></span>
                    <span className="legend__ref">Task</span>
                </div>
                <div className="legend__item">
                    <span className="legend__color legend__color--completed"></span>
                    <span className="legend__ref">Completed TODO</span>
                </div>
                <div className="legend__item">
                    <span className="legend__color legend__color--ongoing"></span>
                    <span className="legend__ref">Active TODO</span>
                </div>
            </div>
        </div>
    ))
}

const mapStateToProps = state => ({
    selectedProject: state.projects.selectedProject,
    todos: state.todos
})
export default connect(mapStateToProps, null)(Gantt)
