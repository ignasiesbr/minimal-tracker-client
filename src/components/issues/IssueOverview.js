import React, {useState, useEffect} from 'react'
import {useForm} from '../../utils/useForm';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {postMessageIssue, updateIssue, removeIssue} from '../../actions/projects';
import axios from 'axios';
import PropTypes from 'prop-types'
import generateMessages from '../../utils/generateMessages';
import img from '../../assets/images/issues.svg';
import AdminComponent from '../auth/AdminComponent';
import ConfirmationLink from '../layout/ConfirmationLink';


const IssueOverview = ({projects, updateIssue, postMessageIssue, removeIssue, user}) => {


    const selectedProject = projects.selectedProject;
    const {id} = useParams();

    const [selectedIssue, setIssue] = useState(() => {
        if (!selectedProject) {
            return undefined;
        }
        else {
            return selectedProject.issues.filter(issue => issue._id === id)[0];
        }
    },);

    //update state each time the project changes.
    useEffect(() => {
        setIssue(selectedProject.issues.filter(issue => issue._id === id)[0]);
    }, [selectedProject, id])

    const [values, handleChange] = useForm({
        text: ""
    });

    const onSubmit = async e => {
        const noti =  JSON.stringify({
            text: `${user.name} has posted in the issue: ${selectedIssue.summary}`,
            type:'ISSUE',
            issue: selectedIssue._id
        });
        postNotification(noti);
        postMessageIssue(JSON.stringify(values), selectedProject._id, id);
        values.text = "";
    }

    const onUpdate = async () => {
        updateIssue(selectedProject._id, selectedIssue._id);
        const noti =  JSON.stringify({
            text: `${user.name} has updated the issue: ${selectedIssue.summary}`,
            type:'ISSUE',
            issue: selectedIssue._id
        });
        postNotification(noti);
    }

    const postNotification = async (newNotification) => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        await axios.put(`/api/users/notifications/project/${selectedProject._id}`, newNotification, config ); 
    }

    return (!selectedIssue ? <h1>No issue found</h1> : (
                <div className="issue-container">
                    <div className="issue-discussion">
                            <h2 className="heading-secondary u-margin-bottom-small">Discussion</h2>
                            <ul className="discussion-list">
                                {!selectedIssue.messages.length > 0 ? <li>No messages</li> : generateMessages(selectedIssue.messages)}                               
                            </ul>
                        <form className="form2 issue-discussion__form" onSubmit={e => onSubmit(e)}>
                            <textarea className="form2__textarea u-margin-bottom-small" name="text" onChange={handleChange} value={values.text} cols="30" rows="1"></textarea>
                            <input className="btn2 u-margin-bottom-medium" type="submit"/>
                        </form>
                    </div>

                    <div className="issue-info">
                        <h2 className="heading-secondary u-margin-bottom-small">
                            Issue info
                        </h2>
                        <h3 className="heading-tertiary u-margin-bottom-tiny">
                            Summary 
                        </h3>
                        <p className="issue-info__text">
                            {selectedIssue.summary}
                        </p>
                        <h3 className="heading-tertiary u-margin-bottom-tiny">
                            Description 
                        </h3>
                        <p className="issue-info__text">
                            {selectedIssue.description}
                        </p>
                        <h3 className="heading-tertiary u-margin-bottom-tiny">
                            Status 
                        </h3>
                        <p className="issue-info__text">
                            {selectedIssue.status === 'ON_PROGRESS' ? 'On Progress' : selectedIssue.status}
                        </p>
                        <h3 className="heading-tertiary u-margin-bottom-tiny">
                            Type
                        </h3>
                        <p className="issue-info__text">
                            {selectedIssue.type}
                        </p>
                        <h3 className="heading-tertiary u-margin-bottom-tiny">
                            Start date 
                        </h3>
                        <p className="issue-info__text">
                            {selectedIssue.creationDate.split("T")[0]}
                        </p>
                        <h3 className="heading-tertiary u-margin-bottom-tiny">
                            Deadline 
                        </h3>
                        <p className="issue-info__text">
                            {selectedIssue.deadline.split("T")[0]}
                        </p>
                        <h3 className="heading-tertiary u-margin-bottom-tiny">
                            Members 
                        </h3>
                        <p className="issue-info__text">
                            {selectedProject.members.map(member => <span key={member.user} className="issue-info__member">{member.name}</span>)}
                        </p>
                        {selectedIssue.status === 'ON_PROGRESS' ? 
                            <AdminComponent
                                children={<button 
                                    onClick={ () => onUpdate()} 
                                    className="btn2 issue-info__button">Update to completed</button>}/> 
                            :  <AdminComponent
                                children={<button 
                                    onClick={ () => onUpdate()} 
                                    className="btn2 issue-info__button">Back to on progress</button>}/> }
                    </div>
                    <div className="delete-issue">
                    <img className="issue-img" src={img} alt="issue-bg" />
                        <AdminComponent children={<ConfirmationLink args={[selectedProject._id, selectedIssue._id]} action={removeIssue} buttonName="DELETE ISSUE" route={"/"} />} />
                    </div>
                </div>
                )
)}
IssueOverview.propTypes = {
    projects: PropTypes.object.isRequired,
    postMessageIssue: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    updateIssue: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    projects: state.projects,
    user: state.auth.user,
});
export default connect(mapStateToProps, {postMessageIssue, updateIssue, removeIssue})(IssueOverview);